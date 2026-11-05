// Minimal EXIF reader for the photo composer: shooting time and GPS position
// from a JPEG, nothing else. No dependency on purpose: the composer only needs
// four tags, and a full EXIF library would double the chunk.
//
// Privacy: the coordinates read here are used in the browser only, to suggest
// a place name and to look up the temperature. The uploaded file is re-encoded
// through a canvas (photoPrep.ts), which drops every EXIF tag, so the exact
// position never leaves the device.

export interface PhotoMeta {
  /** Local wall-clock time from DateTimeOriginal, "YYYY-MM-DDTHH:MM:SS". */
  takenLocal?: string;
  /** OffsetTimeOriginal, e.g. "+03:00", when the camera wrote one. */
  offset?: string;
  lat?: number;
  lng?: number;
}

const TAG_EXIF_IFD = 0x8769;
const TAG_GPS_IFD = 0x8825;
const TAG_DATETIME_ORIGINAL = 0x9003;
const TAG_OFFSET_ORIGINAL = 0x9011;

function readAscii(view: DataView, offset: number, length: number): string {
  let s = '';
  for (let i = 0; i < length; i++) {
    const c = view.getUint8(offset + i);
    if (c === 0) break;
    s += String.fromCharCode(c);
  }
  return s;
}

/** Read one IFD into a map tag -> { type, count, valueOffset } (offsets relative to TIFF start). */
function readIfd(view: DataView, tiff: number, ifdOffset: number, le: boolean) {
  const entries = new Map<number, { type: number; count: number; valueOffset: number }>();
  const start = tiff + ifdOffset;
  if (start + 2 > view.byteLength) return entries;
  const n = view.getUint16(start, le);
  for (let i = 0; i < n; i++) {
    const e = start + 2 + i * 12;
    if (e + 12 > view.byteLength) break;
    const tag = view.getUint16(e, le);
    const type = view.getUint16(e + 2, le);
    const count = view.getUint32(e + 4, le);
    const size = ({ 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 } as Record<number, number>)[type] ?? 1;
    // Values of 4 bytes or less sit inside the entry itself.
    const valueOffset = size * count <= 4 ? e + 8 - tiff : view.getUint32(e + 8, le);
    entries.set(tag, { type, count, valueOffset });
  }
  return entries;
}

function readRationals(view: DataView, tiff: number, offset: number, count: number, le: boolean): number[] {
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const p = tiff + offset + i * 8;
    if (p + 8 > view.byteLength) break;
    const num = view.getUint32(p, le);
    const den = view.getUint32(p + 4, le);
    out.push(den ? num / den : 0);
  }
  return out;
}

export async function readPhotoMeta(file: Blob): Promise<PhotoMeta> {
  try {
    // EXIF lives in the first segments; 256 kB is plenty and avoids reading a 10 MB file.
    const buf = await file.slice(0, 262144).arrayBuffer();
    const view = new DataView(buf);
    if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) return {};
    let p = 2;
    while (p + 4 < view.byteLength) {
      const marker = view.getUint16(p);
      const len = view.getUint16(p + 2);
      if (marker === 0xffe1 && readAscii(view, p + 4, 4) === 'Exif') {
        const tiff = p + 10;
        const le = view.getUint16(tiff) === 0x4949;
        const ifd0 = readIfd(view, tiff, view.getUint32(tiff + 4, le), le);
        const meta: PhotoMeta = {};

        const exifPtr = ifd0.get(TAG_EXIF_IFD);
        if (exifPtr) {
          const ifd = readIfd(view, tiff, view.getUint32(tiff + exifPtr.valueOffset, le), le);
          const dt = ifd.get(TAG_DATETIME_ORIGINAL);
          if (dt) {
            const raw = readAscii(view, tiff + dt.valueOffset, dt.count);
            const m = raw.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
            if (m) meta.takenLocal = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`;
          }
          const off = ifd.get(TAG_OFFSET_ORIGINAL);
          if (off) {
            const raw = readAscii(view, tiff + off.valueOffset, off.count);
            if (/^[+-]\d{2}:\d{2}$/.test(raw)) meta.offset = raw;
          }
        }

        const gpsPtr = ifd0.get(TAG_GPS_IFD);
        if (gpsPtr) {
          const gps = readIfd(view, tiff, view.getUint32(tiff + gpsPtr.valueOffset, le), le);
          const latRef = gps.get(1);
          const lat = gps.get(2);
          const lngRef = gps.get(3);
          const lng = gps.get(4);
          if (lat && lng && lat.count === 3 && lng.count === 3) {
            const [ld, lm, ls] = readRationals(view, tiff, lat.valueOffset, 3, le);
            const [gd, gm, gs] = readRationals(view, tiff, lng.valueOffset, 3, le);
            let la = ld + lm / 60 + ls / 3600;
            let lo = gd + gm / 60 + gs / 3600;
            if (latRef && readAscii(view, tiff + latRef.valueOffset, 1) === 'S') la = -la;
            if (lngRef && readAscii(view, tiff + lngRef.valueOffset, 1) === 'W') lo = -lo;
            if (la !== 0 || lo !== 0) {
              meta.lat = la;
              meta.lng = lo;
            }
          }
        }
        return meta;
      }
      if (marker === 0xffda) break; // start of scan: no EXIF after this
      p += 2 + len;
    }
  } catch {
    /* unreadable file: no metadata, the composer asks the user instead */
  }
  return {};
}

/**
 * Convert the camera's local wall-clock time to a UTC Date. Uses the camera's
 * own offset when present, otherwise assumes Finnish time (Europe/Helsinki),
 * which is where these photos are taken.
 */
export function takenToUtc(meta: PhotoMeta): Date | null {
  if (!meta.takenLocal) return null;
  if (meta.offset) {
    const d = new Date(`${meta.takenLocal}${meta.offset}`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const asUtc = new Date(`${meta.takenLocal}Z`);
  if (Number.isNaN(asUtc.getTime())) return null;
  // Offset of Helsinki at that moment, read back through Intl.
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Helsinki',
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(asUtc);
  const get = (t: string) => Number(parts.find((x) => x.type === t)?.value);
  const helsinkiAsUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
  const offsetMs = helsinkiAsUtc - asUtc.getTime();
  return new Date(asUtc.getTime() - offsetMs);
}
