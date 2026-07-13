// 2026-05-21: locale-aware — hreflang × 11 + og:locale + JSON-LD inLanguage.
import { useEffect } from 'react';
import { useLang, type Lang } from '../i18n/useLang';

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  /** Path-only canonical (no locale prefix). When omitted, no canonical/hreflang is emitted. */
  canonical?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  tags?: string[];
  jsonLd?: object | object[];
}

const SITE = 'https://lapland.blog';
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`;

const SUPPORTED: Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];
const URL_PREFIX_OF: Record<Lang, string> = {
  en: '', fi: '/fi', de: '/de', ja: '/ja', es: '/es',
  'pt-BR': '/br', 'zh-CN': '/cn', ko: '/kr', fr: '/fr', it: '/it', nl: '/nl', sv: '/sv',
};
const BCP47: Record<Lang, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};
const OG_LOCALE: Record<Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN', ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};

function stripLocalePrefix(path: string): string {
  const m = path.match(/^\/(fi|de|ja|es|br|cn|kr|fr|it|nl|sv)(?=\/|$)/);
  if (m) return path.replace(m[0], '') || '/';
  return path;
}

function injectInLanguage(node: unknown, bcp47: string): unknown {
  if (Array.isArray(node)) return node.map((n) => injectInLanguage(n, bcp47));
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (o['@type'] && o.inLanguage === undefined) o.inLanguage = bcp47;
    if (Array.isArray(o['@graph'])) o['@graph'] = (o['@graph'] as unknown[]).map((n) => injectInLanguage(n, bcp47));
    return o;
  }
  return node;
}

export function useSeo(opts: SeoOptions) {
  const lang = useLang();
  const {
    title,
    description,
    image = DEFAULT_IMAGE,
    canonical,
    type = 'website',
    publishedAt,
    modifiedAt,
    author,
    tags,
    jsonLd,
  } = opts;

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = BCP47[lang];

    // Trailing-slash form matches the prerendered static HTML (Cloudflare Pages
    // serves /path/index.html at /path/ with 200; the no-slash form 308-redirects).
    const cleanPath = canonical
      ? stripLocalePrefix(canonical.startsWith('/') ? canonical : `/${canonical}`)
      : undefined;
    const currentUrl = cleanPath
      ? (SITE + URL_PREFIX_OF[lang] + (cleanPath === '/' ? '' : cleanPath)).replace(/\/?$/, '/')
      : undefined;

    setMeta('name', 'description', description);

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Lapland.blog');
    setMeta('property', 'og:locale', OG_LOCALE[lang]);
    if (currentUrl) setMeta('property', 'og:url', currentUrl);

    // og:locale:alternate × 10 others
    document.head.querySelectorAll('meta[property="og:locale:alternate"][data-seo-alt]').forEach((el) => el.remove());
    SUPPORTED.filter((l) => l !== lang).forEach((l) => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:locale:alternate');
      m.setAttribute('content', OG_LOCALE[l]);
      m.setAttribute('data-seo-alt', 'true');
      document.head.appendChild(m);
    });

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    if (type === 'article') {
      if (publishedAt) setMeta('property', 'article:published_time', publishedAt);
      if (modifiedAt) setMeta('property', 'article:modified_time', modifiedAt);
      if (author) setMeta('property', 'article:author', author);
      if (tags) {
        document.querySelectorAll('meta[property="article:tag"]').forEach((el) => el.remove());
        tags.forEach((tag) => {
          const el = document.createElement('meta');
          el.setAttribute('property', 'article:tag');
          el.setAttribute('content', tag);
          document.head.appendChild(el);
        });
      }
    }

    if (tags && tags.length > 0) {
      setMeta('name', 'keywords', tags.join(', '));
    }

    if (cleanPath && currentUrl) {
      // x-default = this page's own EN URL (trailing-slash form).
      const enUrl = (SITE + (cleanPath === '/' ? '' : cleanPath)).replace(/\/?$/, '/');
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', currentUrl);

      // hreflang × 11 + x-default — SHORT codes (en, fi, pt-BR, …), must match
      // the prerenderer (_prerender_routes.mjs) and sitemap.xml exactly.
      document.head.querySelectorAll('link[rel="alternate"][data-seo-hreflang]').forEach((el) => el.remove());
      SUPPORTED.forEach((l) => {
        const lnk = document.createElement('link');
        lnk.setAttribute('rel', 'alternate');
        lnk.setAttribute('hreflang', l);
        lnk.setAttribute('href', (SITE + URL_PREFIX_OF[l] + (cleanPath === '/' ? '' : cleanPath)).replace(/\/?$/, '/'));
        lnk.setAttribute('data-seo-hreflang', 'true');
        document.head.appendChild(lnk);
      });
      const xd = document.createElement('link');
      xd.setAttribute('rel', 'alternate');
      xd.setAttribute('hreflang', 'x-default');
      xd.setAttribute('href', enUrl);
      xd.setAttribute('data-seo-hreflang', 'true');
      document.head.appendChild(xd);
    }

    // JSON-LD (with inLanguage injection)
    document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    if (jsonLd) {
      const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      data.forEach((obj) => {
        const cloned = injectInLanguage(JSON.parse(JSON.stringify(obj)), BCP47[lang]);
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-seo-jsonld', 'true');
        s.textContent = JSON.stringify(cloned);
        document.head.appendChild(s);
      });
    }
  }, [title, description, image, canonical, type, publishedAt, modifiedAt, author, tags, lang, jsonLd]);
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]:not([data-seo-alt])`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Build a canonical URL for a given path (no locale prefix; locale added by useSeo). */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE}${clean}`;
}
