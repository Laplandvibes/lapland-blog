// Rakenteisen datan (JSON-LD) sisäiset osoitteet samaan muotoon kuin kanoninen, hreflang ja sivukartta:
// sivun OMA kieliversio ja loppukauttaviiva.
//
// Miksi (12.–13.11.2026): sivujen schema-oliot kirjoittivat englannin kauttaviivattomat osoitteet
// (`https://lapland.blog/start-here`, joka ohjautuu 308) joka kielellä. Laplandchristmasissa (sama vika) 33 %
// Googlebotin sivupyynnöistä meni kauttaviivattomiin osoitteisiin. Mittari: lv-ops `scripts/audit_jsonld_osoitteet.mjs`.
//
// - polullinen osoite → sivun kieliversio + kauttaviiva (`/fi/start-here/`)
// - reitti, jolla on canonicalLocale (englanniksi kirjoitetut jutut, `canonicalLocale.gen.ts`) → sen kielen osoite,
//   sama kuin esirenderöity `<link rel="canonical">`
// - juuri → `https://lapland.blog/`; murupolun `item` saisi kielijuuren (`/fi/`)
// - tiedostot (.svg, .jpg), ankkurit, kyselyt ja ulkoiset osoitteet jäävät ennalleen
import type { Lang } from '../i18n/useLang';
import { CANONICAL_LOCALE } from './canonicalLocale.gen';

const SITE = 'https://lapland.blog';
const URL_PREFIX_OF: Record<Lang, string> = {
  en: '', fi: '/fi', de: '/de', ja: '/ja', es: '/es',
  'pt-BR': '/br', 'zh-CN': '/cn', ko: '/kr', fr: '/fr', it: '/it', nl: '/nl', sv: '/sv',
};
const INTERNAL_URL = /^https:\/\/lapland\.blog((?:\/[A-Za-z0-9_-]+)*)\/?$/;
const LOCALE_SEGMENT = /^\/(fi|de|ja|es|br|cn|kr|fr|it|nl|sv)(?=\/|$)/;

export function localizeJsonLd<T>(node: T, lang: Lang, key = ''): T {
  if (typeof node === 'string') {
    const m = INTERNAL_URL.exec(node);
    if (!m) return node;
    const raw = m[1] || '/';
    if (raw === '/' && key !== 'item') return `${SITE}/` as T;
    const path = raw.replace(LOCALE_SEGMENT, '') || '/';
    const l = (path !== '/' && CANONICAL_LOCALE[path]) || lang;
    return `${SITE}${URL_PREFIX_OF[l]}${path === '/' ? '' : path}/` as T;
  }
  if (Array.isArray(node)) return node.map((n) => localizeJsonLd(n, lang, key)) as T;
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) out[k] = localizeJsonLd(v, lang, k);
    return out as T;
  }
  return node;
}

/** Sivun oma BreadcrumbList ei tulostu: esirenderöijä kirjoittaa jokaiselle sivulle murupolun sivun kielellä ja
 *  oikeilla osoitteilla, kun taas sivujen omat oliot sanoivat "Home" ja englannin osoitteen joka kielellä
 *  (sama ratkaisu kuin laplandcarrental 25.9. ja laplandwellness 12.11.2026). */
export const isBreadcrumbList = (x: unknown) =>
  Boolean(x && typeof x === 'object' && (x as { '@type'?: unknown })['@type'] === 'BreadcrumbList');
