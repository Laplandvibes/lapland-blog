import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  tags?: string[];
}

const SITE = 'https://lapland.blog';
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`;

/**
 * useSeo — side-effect hook that updates document.title, meta description,
 * OpenGraph, Twitter cards, and the canonical link. Safe to call in any page
 * component. Cleans up nothing (next page overwrites). SPA-friendly.
 */
export function useSeo(opts: SeoOptions) {
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
  } = opts;

  useEffect(() => {
    // Title
    document.title = title;

    // Description
    setMeta('name', 'description', description);

    // OpenGraph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Lapland.blog');
    if (canonical) setMeta('property', 'og:url', canonical);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // Article-specific
    if (type === 'article') {
      if (publishedAt) setMeta('property', 'article:published_time', publishedAt);
      if (modifiedAt) setMeta('property', 'article:modified_time', modifiedAt);
      if (author) setMeta('property', 'article:author', author);
      if (tags) {
        // Remove old article:tag tags
        document
          .querySelectorAll('meta[property="article:tag"]')
          .forEach((el) => el.remove());
        tags.forEach((tag) => {
          const el = document.createElement('meta');
          el.setAttribute('property', 'article:tag');
          el.setAttribute('content', tag);
          document.head.appendChild(el);
        });
      }
    }

    // Keywords (from tags/hashtags)
    if (tags && tags.length > 0) {
      setMeta('name', 'keywords', tags.join(', '));
    }

    // Canonical
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, image, canonical, type, publishedAt, modifiedAt, author, tags]);
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/**
 * Build a canonical URL for a given path.
 */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE}${clean}`;
}
