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
      'A first-person field journal from Finnish Lapland — honest, seasonal, written by someone who actually lives here.',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
  };
}

export function personSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: vesa.name,
    description: vesa.bio,
    url: `${SITE}/about`,
    jobTitle: vesa.role,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FI',
      addressRegion: 'Lapland',
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
      '@type': 'Person',
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
