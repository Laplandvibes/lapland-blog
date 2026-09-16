// src/lib/crossSiteLinks.ts
//
// Picks the LaplandVibes network sites suggested at the end of a post
// ("Explore more from the LaplandVibes network").
//
// 🔴🔴 Detection reads the post's STRUCTURED fields — `category` and `tags` —
// and never the article text. Free-text matching is what this file used to do,
// and it was measured wrong in every language on 2026-09-16:
//
//   - 66 patterns, of which 4 were Finnish, so a fi/sv article matched far less
//     than the same article in English: only 2/11 (fi) and 3/11 (sv) posts got
//     the same set of cards as their own English original.
//   - /eat/i matched "weather" ×4 in an aurora forecast article, which made
//     "Discover restaurants" a card on it.
//   - /ski/i matched "skin", /elf/i matched "itself", /fell/i matches the verb.
//   - /night.*out/i is unanchored and matched a 2 000-character span of a
//     polar-night essay, which put a "bars & nightlife" card under it.
//   - The text includes the article's own markdown links, so the affiliate URL
//     …/go/hotels?sid=blog_kaamos_cta triggered the accommodation card, and a
//     ruokavirasto.fi source link (Finnish Food Authority, cited for vitamin D)
//     made "restaurants" the TOP card on an essay about the polar night.
//
// Category and tags are written by the author, exist on every post, and mean
// the same thing in every language — the article text does not.
//
// 🔴 Labels and descriptions are NOT here. They live in the 12 locale files
// (`COPY[lang].post.networkCards`), because this list renders under articles
// read in 12 interface languages. Keep this module copy-free.

import type { CategorySlug } from '../data/categories';

export type CrossSiteKey =
  | 'stays'
  | 'activities'
  | 'dining'
  | 'bars'
  | 'gifts'
  | 'nature'
  | 'kids';

export interface CrossSiteLink {
  /** Stable key — the locale files carry the label + description for it. */
  key: CrossSiteKey;
  url: string;
  /** lucide icon name hint — consumer maps to the actual icon */
  icon: string;
}

/**
 * The seven network sites this list can point at. URLs match the ecosystem
 * grid in the shared footer, and the footer's own localized site names are the
 * vocabulary the locale files reuse — so a site reads the same in both places.
 */
export const NETWORK_SITES: Record<CrossSiteKey, CrossSiteLink> = {
  stays: { key: 'stays', url: 'https://laplandstays.com', icon: 'bed' },
  activities: { key: 'activities', url: 'https://laplandactivities.fi', icon: 'mountain-snow' },
  dining: { key: 'dining', url: 'https://laplanddining.com', icon: 'utensils' },
  bars: { key: 'bars', url: 'https://laplandbars.com', icon: 'wine' },
  gifts: { key: 'gifts', url: 'https://laplandgifts.com', icon: 'gift' },
  nature: { key: 'nature', url: 'https://laplandnature.com', icon: 'trees' },
  kids: { key: 'kids', url: 'https://laplandkids.com', icon: 'baby' },
};

/** Fixed order for ties, so the same post always renders the same cards. */
const SITE_ORDER = Object.keys(NETWORK_SITES) as CrossSiteKey[];

/**
 * Every post has exactly one category out of these seven (the adapter falls
 * back to 'stories'), so the category alone always yields two cards — no post
 * is left with an empty section, and none needs a text match to fill one.
 * First entry is the primary suggestion, second the supporting one.
 */
const CATEGORY_SITES: Record<CategorySlug, CrossSiteKey[]> = {
  aurora: ['activities', 'stays'],
  cabins: ['stays', 'nature'],
  food: ['dining', 'bars'],
  seasons: ['nature', 'activities'],
  people: ['activities', 'dining'],
  gear: ['gifts', 'nature'],
  stories: ['nature', 'activities'],
};

/**
 * Tag → site. Tags are normalised (lower case, accents stripped, separators
 * unified) before lookup, so 'Mökki', 'mokki' and 'MÖKKI' are one key.
 *
 * 🔴 Tags are NOT guaranteed to be language-independent: measured 2026-09-16,
 * 10 of the 11 published posts carry identical tags in fi/sv/en, but
 * `wilderness-hut-firewood-ends-2026` is tagged 'autiotuvat, retkeily,
 * metsahallitus' (fi), 'wilderness-huts, hiking, metsahallitus' (en) and
 * 'odestugor, vandring, forststyrelsen' (sv). That post is why this map carries
 * the Finnish and Swedish forms beside the English ones: all three have to
 * resolve to the same site, or one article recommends different things
 * depending on the language it is read in.
 *
 * Place names, seasons and craft-of-writing tags (rovaniemi, winter,
 * photography, essay…) are deliberately absent: they say nothing about which
 * site helps the reader.
 */
const TAG_SITES: Record<string, CrossSiteKey> = {
  // ── Accommodation ─────────────────────────────────────────────────────────
  hotel: 'stays', hotels: 'stays', hotelli: 'stays', hotellit: 'stays', hotell: 'stays',
  cabin: 'stays', cabins: 'stays', mokki: 'stays', mokit: 'stays',
  stuga: 'stays', stugor: 'stays',
  igloo: 'stays', igloos: 'stays', iglu: 'stays', iglut: 'stays',
  accommodation: 'stays', majoitus: 'stays', boende: 'stays',
  lodge: 'stays', lodges: 'stays', resort: 'stays', resorts: 'stays',
  glamping: 'stays', hostel: 'stays', apartment: 'stays',

  // ── Activities & guided experiences ───────────────────────────────────────
  safari: 'activities', safaris: 'activities', safarit: 'activities',
  husky: 'activities', huskies: 'activities', huskysafari: 'activities',
  koiravaljakko: 'activities', hundspann: 'activities', 'dog-sledding': 'activities',
  snowmobile: 'activities', moottorikelkka: 'activities', snoskoter: 'activities', skoter: 'activities',
  ski: 'activities', skiing: 'activities', hiihto: 'activities', laskettelu: 'activities',
  skidor: 'activities', 'cross-country-skiing': 'activities',
  snowshoe: 'activities', lumikenkailu: 'activities', snoskor: 'activities',
  'ice-fishing': 'activities', pilkki: 'activities', isfiske: 'activities',
  reindeer: 'activities', poro: 'activities', ren: 'activities',
  tour: 'activities', tours: 'activities', retket: 'activities', turer: 'activities',
  activity: 'activities', activities: 'activities', aktiviteter: 'activities', elamykset: 'activities',
  excursion: 'activities', rafting: 'activities', kayaking: 'activities', melonta: 'activities',

  // ── Eating out ────────────────────────────────────────────────────────────
  food: 'dining', ruoka: 'dining', mat: 'dining',
  restaurant: 'dining', restaurants: 'dining', ravintola: 'dining', ravintolat: 'dining',
  restaurang: 'dining', restauranger: 'dining',
  dining: 'dining', cafe: 'dining', kahvila: 'dining', fika: 'dining',
  salmon: 'dining', lohi: 'dining', lax: 'dining',
  'reindeer-meat': 'dining', poronliha: 'dining', renkott: 'dining',
  soup: 'dining', keitto: 'dining', soppa: 'dining',
  market: 'dining', tori: 'dining', torg: 'dining',
  strawberries: 'dining', mansikat: 'dining', jordgubbar: 'dining',
  berries: 'dining', marjat: 'dining',
  marjastus: 'dining', foraging: 'dining', sienestys: 'dining',
  'local-food': 'dining', lahiruoka: 'dining',

  // ── Bars & nightlife ──────────────────────────────────────────────────────
  bar: 'bars', bars: 'bars', baari: 'bars', baarit: 'bars', barer: 'bars',
  pub: 'bars', pubs: 'bars', pubi: 'bars', pubit: 'bars', pubar: 'bars',
  nightlife: 'bars', yoelama: 'bars', nattliv: 'bars',
  beer: 'bars', olut: 'bars', ol: 'bars', brewery: 'bars', panimo: 'bars', bryggeri: 'bars',
  wine: 'bars', viini: 'bars', vin: 'bars',
  cocktail: 'bars', cocktails: 'bars', drinks: 'bars', juomat: 'bars', drycker: 'bars',

  // ── Shopping, gear & gifts ────────────────────────────────────────────────
  gift: 'gifts', gifts: 'gifts', lahja: 'gifts', lahjat: 'gifts', present: 'gifts', presenter: 'gifts',
  souvenir: 'gifts', souvenirs: 'gifts', matkamuisto: 'gifts', matkamuistot: 'gifts', souvenirer: 'gifts',
  shopping: 'gifts', ostokset: 'gifts', shop: 'gifts', kauppa: 'gifts', butik: 'gifts',
  handicraft: 'gifts', kasityo: 'gifts', hantverk: 'gifts', duodji: 'gifts',
  puukko: 'gifts', kuksa: 'gifts',
  gear: 'gifts', varusteet: 'gifts', utrustning: 'gifts', equipment: 'gifts',
  packing: 'gifts', pakkaaminen: 'gifts', packning: 'gifts', packlista: 'gifts', pakkauslista: 'gifts',
  clothing: 'gifts', vaatteet: 'gifts', klader: 'gifts', boots: 'gifts', kengat: 'gifts',

  // ── Nature, trails & wilderness ───────────────────────────────────────────
  nature: 'nature', luonto: 'nature', natur: 'nature',
  forest: 'nature', metsa: 'nature', skog: 'nature',
  'national-park': 'nature', kansallispuisto: 'nature', nationalpark: 'nature',
  'urho-kekkonen-national-park': 'nature', 'pallas-yllastunturi': 'nature',
  wilderness: 'nature', eramaa: 'nature', vildmark: 'nature',
  'wilderness-huts': 'nature', 'wilderness-hut': 'nature',
  autiotuvat: 'nature', autiotupa: 'nature', odestugor: 'nature', odestuga: 'nature',
  metsahallitus: 'nature', forststyrelsen: 'nature',
  hiking: 'nature', hike: 'nature', vaellus: 'nature', retkeily: 'nature',
  vandring: 'nature', trekking: 'nature',
  trail: 'nature', trails: 'nature', polku: 'nature', polut: 'nature', led: 'nature', leder: 'nature',
  fell: 'nature', fells: 'nature', tunturi: 'nature', tunturit: 'nature', fjall: 'nature',
  wildlife: 'nature', elaimet: 'nature', djurliv: 'nature',
  birdwatching: 'nature', lintubongaus: 'nature',
  lake: 'nature', jarvi: 'nature', sjo: 'nature', river: 'nature', joki: 'nature', alv: 'nature',
  camping: 'nature', leiriytyminen: 'nature', talting: 'nature',

  // ── Families & Christmas ──────────────────────────────────────────────────
  kids: 'kids', lapset: 'kids', barn: 'kids', children: 'kids',
  family: 'kids', perhe: 'kids', familj: 'kids',
  'family-travel': 'kids', 'family-friendly': 'kids',
  lapsiystavallinen: 'kids', perhematka: 'kids',
  santa: 'kids', 'santa-claus': 'kids', joulupukki: 'kids', jultomten: 'kids',
  'santa-claus-village': 'kids', joulupukinpajakyla: 'kids',
  christmas: 'kids', joulu: 'kids', jul: 'kids', elf: 'kids', tonttu: 'kids',
};

const CATEGORY_PRIMARY_WEIGHT = 3;
const CATEGORY_SUPPORT_WEIGHT = 2;
const TAG_WEIGHT = 2;

/**
 * Lower case, strip accents, unify separators. 'Mökki' and 'mokki' are the same
 * tag; so are 'national park', 'national_park' and 'national-park'.
 */
export function normalizeTag(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export interface CrossSiteInput {
  category: CategorySlug;
  tags: string[];
}

/**
 * Suggest up to `maxLinks` network sites for a post. Deterministic: the same
 * category + tags always give the same cards in the same order, whatever
 * language the article or the interface is in.
 */
export function detectCrossSiteLinks(
  post: CrossSiteInput,
  maxLinks = 3,
): CrossSiteLink[] {
  const scores = new Map<CrossSiteKey, number>();
  const add = (key: CrossSiteKey, weight: number) =>
    scores.set(key, (scores.get(key) ?? 0) + weight);

  const fromCategory = CATEGORY_SITES[post.category] ?? CATEGORY_SITES.stories;
  fromCategory.forEach((key, i) =>
    add(key, i === 0 ? CATEGORY_PRIMARY_WEIGHT : CATEGORY_SUPPORT_WEIGHT),
  );

  // One tag votes once, so a post tagged 'hiking, trail, trails' does not
  // outrank its own category three times over.
  const counted = new Set<string>();
  for (const tag of post.tags ?? []) {
    const key = normalizeTag(tag);
    if (!key || counted.has(key)) continue;
    counted.add(key);
    const site = TAG_SITES[key];
    if (site) add(site, TAG_WEIGHT);
  }

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || SITE_ORDER.indexOf(a[0]) - SITE_ORDER.indexOf(b[0]))
    .slice(0, maxLinks)
    .map(([key]) => NETWORK_SITES[key]);
}
