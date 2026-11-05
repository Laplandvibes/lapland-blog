// Prepare a phone photo for upload: decode (orientation applied by the
// browser), scale the long side to MAX_SIDE, re-encode as JPEG. Re-encoding
// through a canvas drops all EXIF, including the GPS position.

const MAX_SIDE = 2048;
const QUALITY = 0.86;
const CARD_SIDE = 1200;

export interface PreparedPhoto {
  blob: Blob;
  /** 1200 px long side: cards, link previews and the story card. */
  card: Blob;
  width: number;
  height: number;
  /** Object URL for previews; revoke when done. */
  previewUrl: string;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('decode'));
    img.src = url;
  });
}

export async function preparePhoto(file: File): Promise<PreparedPhoto> {
  const srcUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(srcUrl);
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);
    const encode = (c: HTMLCanvasElement, q: number) =>
      new Promise<Blob>((resolve, reject) =>
        c.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), 'image/jpeg', q),
      );
    const blob = await encode(canvas, QUALITY);
    const cardScale = Math.min(1, CARD_SIDE / Math.max(width, height));
    const small = document.createElement('canvas');
    small.width = Math.round(width * cardScale);
    small.height = Math.round(height * cardScale);
    const sctx = small.getContext('2d');
    if (!sctx) throw new Error('canvas');
    sctx.imageSmoothingQuality = 'high';
    sctx.drawImage(canvas, 0, 0, small.width, small.height);
    const card = await encode(small, 0.82);
    return { blob, card, width, height, previewUrl: URL.createObjectURL(card) };
  } finally {
    URL.revokeObjectURL(srcUrl);
  }
}
