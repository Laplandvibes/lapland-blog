// Air temperature at the time and place a photo was taken, from the Finnish
// Meteorological Institute's open data (opendata.fmi.fi, CC BY 4.0, no key,
// CORS open). Shown on the post and printed on the story card with the source
// named: "Ilmatieteen laitos".
//
// Query: observations (t2m = 2 m air temperature, 10-minute values) inside a
// box around the point, ±20 min around the shooting time. The nearest station
// within MAX_STATION_KM wins; no station that close = no temperature. A wrong
// number on a shared photo is worse than none.

import { haversineKm } from './geo';

const ENDPOINT = 'https://opendata.fmi.fi/wfs';
const MAX_STATION_KM = 40;

export interface Observation {
  tempC: number;
  stationKm: number;
}

function iso(d: Date): string {
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export async function temperatureAt(lat: number, lng: number, when: Date): Promise<Observation | null> {
  // FMI keeps observations; the future has none, and a photo "taken" in the
  // future means a wrong camera clock.
  if (when.getTime() > Date.now() + 10 * 60 * 1000) return null;
  const start = new Date(when.getTime() - 20 * 60 * 1000);
  const end = new Date(when.getTime() + 20 * 60 * 1000);
  const bbox = [lng - 1.1, lat - 0.45, lng + 1.1, lat + 0.45].map((v) => v.toFixed(3)).join(',');
  const url =
    `${ENDPOINT}?service=WFS&version=2.0.0&request=getFeature` +
    `&storedquery_id=fmi::observations::weather::simple&parameters=t2m` +
    `&bbox=${bbox}&starttime=${iso(start)}&endtime=${iso(end)}`;
  try {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    window.clearTimeout(timer);
    if (!res.ok) return null;
    const xml = await res.text();
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const elements = Array.from(doc.getElementsByTagNameNS('http://xml.fmi.fi/schema/wfs/2.0', 'BsWfsElement'));
    let best: { km: number; dt: number; t: number } | null = null;
    for (const el of elements) {
      const pos = el.getElementsByTagNameNS('http://www.opengis.net/gml/3.2', 'pos')[0]?.textContent?.trim();
      const time = el.getElementsByTagNameNS('http://xml.fmi.fi/schema/wfs/2.0', 'Time')[0]?.textContent;
      const value = el.getElementsByTagNameNS('http://xml.fmi.fi/schema/wfs/2.0', 'ParameterValue')[0]?.textContent;
      if (!pos || !time || !value) continue;
      const t = Number(value);
      if (!Number.isFinite(t)) continue; // "NaN" = missing value
      const [sLat, sLng] = pos.split(/\s+/).map(Number);
      const km = haversineKm(lat, lng, sLat, sLng);
      const dt = Math.abs(new Date(time).getTime() - when.getTime());
      if (!best || km < best.km - 0.5 || (Math.abs(km - best.km) <= 0.5 && dt < best.dt)) best = { km, dt, t };
    }
    if (!best || best.km > MAX_STATION_KM) return null;
    return { tempC: Math.round(best.t), stationKm: Math.round(best.km) };
  } catch {
    return null;
  }
}

/** "−2 °C" with a real minus sign and a no-break space. */
export function formatTemp(c: number): string {
  const sign = c < 0 ? '−' : c > 0 ? '+' : '';
  return `${sign}${Math.abs(c)} °C`;
}
