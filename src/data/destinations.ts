import type { Lang } from '../i18n/useLang';

// Kahdeksan kohdetta, joista blogissa kirjoitetaan.
//
// Siirretty tänne Destinations.tsx:stä 2026-09-16, kun kohteet saivat omat
// sivunsa (/destinations/:slug): sama lista tarvitaan nyt kahdessa paikassa,
// eikä kovakoodattu taulukko yhden sivun sisällä kestä sitä.
//
// `slug` on myös jutun tagi (pienellä) ja avain sekä käännöksiin
// (COPY[lang].destinations.places) että verkostolinkkeihin
// (data/destinationLinks.ts). Kolme taulukkoa, yksi avain.

export interface Destination {
  slug: string;            // matches the lower-case tag
  name: string;           // Latin form: also the hotel-search term (stayUrl), never translated there
  /** Display name where the language writes it in its own script (ja katakana canon, GLOSSARY 31.8.2026). */
  localName?: Partial<Record<Lang, string>>;
  region: string;          // e.g. "South Lapland", "Far North"
  blurb: string;
  hero: string;            // local /images/* webp
}

// 8 destinations — match the LV ecosystem geography. Empty ones become
// "be the first to write" prompts.
export const DESTINATIONS: Destination[] = [
  {
    slug: 'rovaniemi',
    name: 'Rovaniemi',
    localName: { ja: 'ロヴァニエミ' },
    region: 'On the Arctic Circle',
    blurb: "Lapland's capital. Where most flights land. The base camp for everything north of here.",
    hero: '/images/trip-solo-trek-1200.webp',
  },
  {
    slug: 'saariselka',
    name: 'Saariselkä',
    localName: { ja: 'サーリセルカ' },
    region: 'Far north, fells country',
    blurb: 'Treeless tundra, glass igloos, the Urho Kekkonen national park out the back door.',
    hero: '/images/trip-silence-1200.webp',
  },
  {
    slug: 'levi',
    name: 'Levi',
    localName: { ja: 'レヴィ' },
    region: 'West Lapland, fell country',
    blurb: "Finland's biggest ski resort. Direct flights from Helsinki in winter. Family-friendly basecamp.",
    hero: '/images/category-cabins-1200.webp',
  },
  {
    slug: 'kemi',
    name: 'Kemi',
    localName: { ja: 'ケミ' },
    region: 'Bay of Bothnia coast',
    blurb: 'Snow castle, ice-breaker tours, and the southernmost Lapland coast. Flatter ground, salt air, sea aurora.',
    hero: '/images/trip-aurora-chase-1200.webp',
  },
  {
    slug: 'inari',
    name: 'Inari',
    localName: { ja: 'イナリ' },
    region: 'Sámi heartland',
    blurb: "Finland's third-largest lake. The Sámi cultural centre Siida. Where Lapland feels furthest from Europe.",
    hero: '/images/trip-night-forest-1200.webp',
  },
  {
    slug: 'muonio',
    name: 'Muonio',
    localName: { ja: 'ムオニオ' },
    region: 'West Lapland, northern lights belt',
    blurb: 'Pallas-Yllästunturi national park edge. Among the highest aurora-visibility readings in Europe.',
    hero: '/images/pillar-cold-1200.webp',
  },
  {
    slug: 'yllas',
    name: 'Ylläs',
    localName: { ja: 'ユッラス' },
    region: 'West Lapland, fell country',
    blurb: 'Quieter sister to Levi. Wider trails, slower pace, the fell that owns its own seasons.',
    hero: '/images/pillar-shelter-1200.webp',
  },
  {
    slug: 'kemijarvi',
    name: 'Kemijärvi',
    localName: { ja: 'ケミヤルヴィ' },
    region: 'East Lapland, lake country',
    blurb: "Finland's northernmost city. A big lake and a dozen cabins within walking distance. Quiet.",
    hero: '/images/dest-kemijarvi-1200.webp',
  },
];

/** Name to show on the page in `lang`; search and URL parameters keep `name`. */
export const placeName = (d: Destination, lang: Lang): string => d.localName?.[lang] ?? d.name;

export const destinationBySlug = (slug: string): Destination | undefined =>
  DESTINATIONS.find((d) => d.slug === slug);

/**
 * Majoituslinkki Workerin kautta.
 *
 * 🔴 `locale` ei ole koriste: Worker reitittää `fi_FI`:n **Sembolle**
 * (Adtraction) ja kaiken muun Trip.comiin. Jos parametri putoaa, suomalainen
 * lukija menee väärälle kumppanille ja provisio jää saamatta — siksi tämä on
 * yksi funktio kahden sivun sijaan.
 *
 * Kielikartta on sama kuin ennen tätä tiedostoa (fi/de/muut): sitä ei laajennettu
 * tässä muutoksessa, koska rahaa tekevän linkin käytöstä ei muuteta ohimennen.
 *
 * Ylläksen hakusana on Äkäslompolo — verkoston kaanon, ks. CLAUDE.md kartat.
 */
export function stayUrl(d: Destination, sid: string, lang: string): string {
  const haku = d.name === 'Ylläs' ? 'Äkäslompolo' : d.name;
  const locale = lang === 'fi' ? 'fi_FI' : lang === 'de' ? 'de_DE' : 'en_US';
  return `https://go.laplandvibes.com/go/hotels?sid=${sid}&ss=${encodeURIComponent(haku)}%2C+Finland&locale=${locale}`;
}
