// Place-name suggestion for a photo's GPS position. Used only as an editable
// default in the photo composer: the writer can always type another name.
//
// Coordinates: village or town centres, read from OpenStreetMap Nominatim on
// 2026-11-05 (one-off build query), with four corrected by hand where the
// search returned a municipality centroid or a same-named fell elsewhere:
// Inari (village, not municipality centroid), Kittilä (village), Saariselkä
// (the resort, not the Enontekiö fell), Pelkosenniemi (village).
// This is NOT the network's DEST_COORDS map table and drives no map pin.

import { haversineKm } from './geo';

export const PLACE_RADIUS_KM = 25;

export const PLACES: { name: string; lat: number; lng: number }[] = [
  { name: 'Rovaniemi', lat: 66.5026, lng: 25.7304 },
  { name: 'Napapiiri', lat: 66.5434, lng: 25.8413 },
  { name: 'Kemi', lat: 65.7333, lng: 24.5666 },
  { name: 'Tornio', lat: 65.8458, lng: 24.1464 },
  { name: 'Keminmaa', lat: 65.803, lng: 24.5209 },
  { name: 'Simo', lat: 65.6623, lng: 25.0638 },
  { name: 'Tervola', lat: 66.0823, lng: 24.8059 },
  { name: 'Ylitornio', lat: 66.3164, lng: 23.6713 },
  { name: 'Pello', lat: 66.7747, lng: 23.9677 },
  { name: 'Kemijärvi', lat: 66.7161, lng: 27.4334 },
  { name: 'Ranua', lat: 65.9277, lng: 26.5131 },
  { name: 'Posio', lat: 66.1093, lng: 28.1651 },
  { name: 'Salla', lat: 66.8319, lng: 28.6669 },
  { name: 'Savukoski', lat: 67.2923, lng: 28.1639 },
  { name: 'Pelkosenniemi', lat: 67.1092, lng: 27.5106 },
  { name: 'Pyhä', lat: 67.027, lng: 27.2222 },
  { name: 'Luosto', lat: 67.1583, lng: 26.9183 },
  { name: 'Sodankylä', lat: 67.419, lng: 26.5902 },
  { name: 'Vuotso', lat: 68.1009, lng: 27.1247 },
  { name: 'Tankavaara', lat: 68.181, lng: 27.0985 },
  { name: 'Saariselkä', lat: 68.4214, lng: 27.4178 },
  { name: 'Ivalo', lat: 68.6588, lng: 27.5348 },
  { name: 'Inari', lat: 68.9056, lng: 27.0289 },
  { name: 'Kaamanen', lat: 69.1047, lng: 27.1978 },
  { name: 'Angeli', lat: 68.9109, lng: 25.6682 },
  { name: 'Karigasniemi', lat: 69.3991, lng: 25.8494 },
  { name: 'Utsjoki', lat: 69.9076, lng: 27.0252 },
  { name: 'Nuorgam', lat: 70.0814, lng: 27.8727 },
  { name: 'Sevettijärvi', lat: 69.5086, lng: 28.5937 },
  { name: 'Kittilä', lat: 67.6597, lng: 24.9117 },
  { name: 'Levi', lat: 67.8044, lng: 24.8086 },
  { name: 'Kolari', lat: 67.3303, lng: 23.7815 },
  { name: 'Äkäslompolo', lat: 67.6029, lng: 24.1516 },
  { name: 'Ylläsjärvi', lat: 67.5245, lng: 24.3063 },
  { name: 'Raattama', lat: 68.1395, lng: 24.22 },
  { name: 'Pallas', lat: 68.046, lng: 24.0625 },
  { name: 'Muonio', lat: 67.9593, lng: 23.6774 },
  { name: 'Olos', lat: 67.924, lng: 23.8088 },
  { name: 'Hetta', lat: 68.3857, lng: 23.615 },
  { name: 'Kilpisjärvi', lat: 69.0166, lng: 20.8732 },
  { name: 'Kuusamo', lat: 65.9646, lng: 29.1883 },
  { name: 'Ruka', lat: 66.1656, lng: 29.1515 },
  { name: 'Taivalkoski', lat: 65.5753, lng: 28.2426 },
  { name: 'Syöte', lat: 65.6257, lng: 27.6053 },
  { name: 'Oulu', lat: 65.0118, lng: 25.4702 },
];

/** Nearest named place within PLACE_RADIUS_KM, or null. */
export function nearestPlace(lat: number, lng: number): string | null {
  let best: { name: string; km: number } | null = null;
  for (const p of PLACES) {
    const km = haversineKm(lat, lng, p.lat, p.lng);
    if (!best || km < best.km) best = { name: p.name, km };
  }
  return best && best.km <= PLACE_RADIUS_KM ? best.name : null;
}

export function placeCoords(name: string): { lat: number; lng: number } | null {
  const n = name.trim().toLowerCase();
  const hit = PLACES.find((p) => p.name.toLowerCase() === n);
  return hit ? { lat: hit.lat, lng: hit.lng } : null;
}
