// Lapland Fan League (/fan-league): data shape, capital coordinates for the map and the country
// list for the join form. The table itself is generated weekly into fanLeague.gen.ts by
// scripts/fan-league-update.mjs; this file holds what does not change from week to week.

export interface FanLeagueRow {
  /** ISO 3166-1 alpha-2 country code, as Umami reports it. */
  c: string;
  /** Index, the leader = 100. Raw reader counts are deliberately not published. */
  i: number;
  /** Position at the previous update of the same month; missing in a month's first table. */
  p?: number;
}

export interface FanLeagueData {
  /** "2026-10" */
  month: string;
  /** First and last covered day, YYYY-MM-DD in Helsinki time. */
  from: string;
  to: string;
  updated: string;
  /** The month is over and this is its final table. */
  final: boolean;
  /** Number of tracked network sites (hosts in _analytics/umami-sites.json). */
  sites: number;
  rows: FanLeagueRow[];
}

/**
 * Capital (lat, lon) per country, the end point of each line on the map. Lapland's own point is
 * Rovaniemi, so Finland's star sits where every line ends. Every code in JOIN_COUNTRIES has a row
 * here, so a country that climbs into the top ten can always be drawn.
 */
export const LAPLAND: [number, number] = [66.5, 25.73];

export const CAPITALS: Record<string, [number, number]> = {
  FI: LAPLAND,
  AR: [-34.6, -58.38], AT: [48.21, 16.37], AU: [-35.28, 149.13], BE: [50.85, 4.35], BG: [42.7, 23.32],
  BR: [-15.79, -47.88], CA: [45.42, -75.7], CH: [46.95, 7.45], CL: [-33.45, -70.67], CN: [39.9, 116.4],
  CY: [35.17, 33.36], CZ: [50.08, 14.44], DE: [52.52, 13.4], DK: [55.68, 12.57], EE: [59.44, 24.75],
  EG: [30.04, 31.24], ES: [40.42, -3.7], FR: [48.86, 2.35], GB: [51.51, -0.13], GR: [37.98, 23.73],
  HK: [22.32, 114.17], HR: [45.81, 15.98], HU: [47.5, 19.04], ID: [-6.21, 106.85], IE: [53.35, -6.26],
  IL: [31.77, 35.21], IN: [28.61, 77.21], IS: [64.15, -21.94], IT: [41.9, 12.5], JP: [35.68, 139.69],
  KR: [37.57, 126.98], LT: [54.69, 25.28], LU: [49.61, 6.13], LV: [56.95, 24.11], MT: [35.9, 14.51],
  MX: [19.43, -99.13], MY: [3.14, 101.69], NL: [52.37, 4.9], NO: [59.91, 10.75], NZ: [-41.29, 174.78],
  PH: [14.6, 120.98], PL: [52.23, 21.01], PT: [38.72, -9.14], RO: [44.43, 26.1], RS: [44.79, 20.45],
  SA: [24.71, 46.68], SE: [59.33, 18.07], SG: [1.35, 103.82], SI: [46.06, 14.51], SK: [48.15, 17.11],
  TH: [13.76, 100.5], TR: [39.93, 32.86], TW: [25.03, 121.57], UA: [50.45, 30.52], AE: [24.45, 54.38],
  US: [38.9, -77.04], VN: [21.03, 105.85], ZA: [-25.75, 28.19],
};

/** Countries offered in the join form; sorted by their localized name at render time. */
export const JOIN_COUNTRIES = Object.keys(CAPITALS);
