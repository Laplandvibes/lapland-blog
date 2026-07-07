import { useEffect } from 'react';
import type { Post } from '../data/posts';
import { vesa } from '../data/author';

const SITE = 'https://lapland.blog';
const LOGO = `${SITE}/favicon.svg`;
const SITE_NAME = 'Lapland.blog';
const PUBLISHER = 'Lapeso Oy';

type JsonLd = Record<string, unknown>;

/**
 * Inject a JSON-LD <script> block into the <head>.
 * Replaces any existing block with the same `id` so pages don't accumulate stale schema.
 */
export function useJsonLd(id: string, data: JsonLd | JsonLd[] | null) {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!data) {
      el?.remove();
      return;
    }

    if (!el) {
      el = document.createElement('script');
      el.id = scriptId;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }

    el.textContent = JSON.stringify(data);

    return () => {
      // Leave it in place on unmount — page transitions will overwrite.
    };
  }, [id, data]);
}

// ─── Schema builders ──────────────────────────────────────────────────────────

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE,
    description:
      'A free travel-journal platform for visitors to Finnish Lapland: pin places, write trip entries, and share them. Seed entries written by the in-house editorial voice, The Field Journal.',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
  };
}

/**
 * The site's authorial voice is "The Field Journal" — an editorial pen-name, not
 * a real individual. We model it as an Organization (a Brand sub-org of the
 * publisher), NOT a schema.org Person, so search engines never treat the seed
 * entries as the work of a specific named resident. (Honest-attribution rule.)
 */
export function publisherSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: vesa.name,
    alternateName: SITE_NAME,
    description: vesa.bio,
    url: `${SITE}/about`,
    parentOrganization: { '@type': 'Organization', name: PUBLISHER },
    areaServed: {
      '@type': 'Place',
      name: 'Finnish Lapland',
      address: { '@type': 'PostalAddress', addressCountry: 'FI', addressRegion: 'Lapland' },
    },
  };
}

export function blogPostingSchema(post: Post): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      // Organization, not Person — "The Field Journal" is an editorial voice,
      // not a real individual. (Honest-attribution rule.)
      '@type': 'Organization',
      name: vesa.name,
      url: `${SITE}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/post/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'en',
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(items: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: i.a,
      },
    })),
  };
}
