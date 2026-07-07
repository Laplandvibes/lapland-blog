# lapland.blog — Build Report

Production-ready first-pass build of `lapland.blog`, the editorial personal travel blog of the LaplandVibes ecosystem. Built in one session as the lead-builder rebuild from the original Vite scaffold.

---

## What was built

### Foundation
- **`.env`** — Supabase credentials copied from the laplandvibes shared infra (PROJECT_ID, PUBLISHABLE_KEY, URL).
- **`index.html`** — Full OG/Twitter meta, hero preload, GA4 (`G-R1MNNKEY0X`) Consent Mode v2 default-denied, cross-domain linker including `lapland.blog` and the 11 sister sites. Re-grants `analytics_storage` only if `localStorage['laplandblog_cookie_consent'] === 'accepted'`.
- **`src/index.css`** — Tailwind v4 `@theme` block with **dual palettes**:
  - Dark (default body): `night #0F172A`, `pink #EC4899`, `purple #7C3AED`, aurora-green/blue.
  - Light editorial (`.theme-editorial` wrapper): `cream #FAF7F2`, `cream-deep #F2ECDF`, `paper-border #E8E2D6`, `ink #1A1815`, `ink-soft #3B3935`, `ink-mute #6B655C`, `accent #C1543B` ("hot lingonberry"), `accent-dark #8F3525`.
  - WCAG AA contrast pairings documented inline.
  - `.prose-editorial` long-form typography: 65ch measure, 1.75 line-height, Fraunces h2/h3, drop cap on first paragraph (`::first-letter` 5.25rem accent), `.pullquote` with 3px accent border.
  - Motion: `.reveal` / `.reveal.is-visible` / `.reveal-delay-1..6`, `hero-pulse`, `soft-float`, `.hero-text-shadow`, `.hero-scrim-radial`, `.card-base`.
  - `prefers-reduced-motion` global killswitch.
- **Fonts**: Space Grotesk (display), Inter (body), Fraunces 9–144 opsz (editorial).

### Component library (`src/components/`)
- `Nav.tsx` — Sticky nav, **theme-aware**: detects `pathname.startsWith('/post/') || pathname === '/about'` and switches to editorial light variant. Mobile drawer closes on route change.
- `Footer.tsx` — Dark footer, ecosystem links to 6 sister sites (LaplandVibes, LaplandNightlife, LaplandStays, LaplandActivities, LaplandDining, LaplandTransport), Privacy + Unsubscribe, `laplandvibe@gmail.com`.
- `Newsletter.tsx` — POSTs to shared edge function with `source: 'laplandblog-website'`. Status FSM (`idle | loading | success | already | error`). Calls `trackNewsletterSignup` on success.
- `CookieBanner.tsx` — `role="dialog"`, writes `laplandblog_cookie_consent`, fires `gtag('consent','update', ...)` on accept.
- `PostCard.tsx` — Two variants: dark (default) and editorial (cream-on-cream for the Read Next "bridge").
- `FeaturedPost.tsx` — Cinematic 5-col hero card, 3 cols image + 2 cols copy.
- `AuthorBio.tsx` — VP initials badge (no photo per spec), two variants.
- `ReadingProgress.tsx` — Fixed top 3px gradient bar tracking scroll.
- `TableOfContents.tsx` — Pulls H2 blocks, only renders on `xl+` and only if ≥2 H2s.
- `Reveal.tsx`, `ScrollToTop.tsx`, `TagChip.tsx` — utilities.

### Pages (`src/pages/`)
| Route | File | Theme |
|---|---|---|
| `/` | `Home.tsx` | dark |
| `/stories` | `Archive.tsx` | dark |
| `/category/:slug` | `Category.tsx` | dark |
| `/post/:slug` | `Post.tsx` | **editorial light** |
| `/about` | `About.tsx` | **editorial light** |
| `/privacy` | `PrivacyPolicy.tsx` | dark |
| `/unsubscribe` | `Unsubscribe.tsx` | dark |
| `*` | `NotFound.tsx` | dark, "Lost in the snow." |

- `Home.tsx` — Hero with full-bleed aurora image + radial scrim, italic pink tagline second line, FeaturedPost, recent grid (6), category chip row (7), "no brochure voice" strip, Newsletter, Footer.
- `Post.tsx` — Editorial wrapper, ReadingProgress, full-bleed hero with overlap title card (`-mt-32 md:-mt-40`), TableOfContents sidebar (`xl:grid-cols-[1fr_220px]`), tag row, AuthorBio, Read Next bridge (cream-deep bg with editorial PostCards), then Newsletter + Footer wrapped in `bg-night text-snow`. Hooks placed before early `<Navigate>` return.
- `Archive.tsx` — Category filter buttons + client-side search (title/excerpt/tags lowercase includes), `useMemo` for filter+sort.
- `Category.tsx` — Hero with description + count, post grid, "other categories" row, empty state, `trackCategoryView` on mount.
- `About.tsx` — Editorial, uses `.prose-editorial`. "Why this blog exists / What you'll find / What you won't / Newsletter / Network / Get in touch."
- `PrivacyPolicy.tsx` — 9 sections, explicit mention of `laplandblog-website` source tag, Lapeso Oy controller, GDPR rights.
- `Unsubscribe.tsx` — Branded with Nav + Footer (no floating panel), POSTs to `/functions/v1/unsubscribe`.

### Routing (`src/App.tsx`)
BrowserRouter → ScrollToTop → Routes (8) → CookieBanner.

### Data layer (`src/data/`)
- `author.ts` — Vesa Pesola, longBio in first person, initials "VP".
- `categories.ts` — 7 categories: aurora, cabins, food, seasons, people, gear, stories — each with `name`, `description`, `tagline`, `accent`. `categoryBySlug()` helper.
- `posts.ts` — `PostBlock` union (`paragraph | heading | pullquote | divider | list`), `Post` interface, **5 placeholder posts** with real Unsplash hero URLs and titles matching the brand strategy (Saariselkä, Levi, Rovaniemi, Sodankylä, Muonio). Helpers: `postBySlug`, `postsByCategory`, `latestPosts`, `featuredPost`, `relatedPosts`, `categoryCount`. **The `lorem()` body content is explicitly placeholder** — flagged for the content agent.

### SEO + Analytics (`src/lib/`)
- `seo.ts` — `useSeo({ title, description, image, canonical, type, publishedAt, modifiedAt, author, tags })` hook. Sets title, description, OG (title/description/image/type/site_name/url), Twitter card, `article:*` meta, canonical link. `canonicalUrl(path)` helper.
- `jsonld.ts` — `useJsonLd(id, data)` injects `<script type="application/ld+json">`. Builders: `websiteSchema`, `personSchema`, `blogPostingSchema` (full BlogPosting with author/publisher/mainEntityOfPage/keywords/articleSection), `breadcrumbSchema`.
- `analytics.ts` — GA_ID + 12 cross-domain list. `trackPageView`, `trackNewsletterSignup` (dual-fires `generate_lead`), `trackPostRead`, `trackCategoryView`, `trackNetworkClick`. Global `Window.gtag?` augmentation.

### Public assets (`public/`)
- `robots.txt` — `Allow: /` + sitemap reference.
- `sitemap.xml` — Manual static sitemap: home, stories, about, 7 categories, 5 post slugs, privacy, unsubscribe.

---

## Key design decisions

1. **Hybrid theme system via CSS-var wrapper class.** Default body is dark navy + pink (Home/Archive/Category/Privacy/Unsubscribe/404 — the "magazine cover"). The reading pages (Post/About) wrap their root in `.theme-editorial`, which swaps the palette CSS variables to cream/ink/lingonberry — same Tailwind utilities, different feel. Newsletter + Footer are kept dark on editorial pages by re-wrapping them in `<div className="bg-night text-snow">` inside the editorial root. The Nav detects `pathname` and swaps its own colors.

2. **No author photo.** Per spec, the author is represented by a "VP" initials badge in a colored circle on AuthorBio. Easy to swap to a real photo later by editing one component.

3. **Drop cap as the editorial signal.** The first paragraph of every post gets a 5.25rem Fraunces accent-colored drop cap via `::first-letter`. It is the visual moment that says "this is a magazine, not a CMS."

4. **TOC only when it earns its place.** `TableOfContents` returns `null` if the post has fewer than 2 H2 headings, and is `hidden xl:block` so it never crowds mobile/tablet.

5. **Newsletter source tag is hardcoded.** Per the LaplandVibes shared-infra reference: `source: 'laplandblog-website'`. Every signup is tagged so the shared Resend/Supabase pool can attribute leads to lapland.blog.

6. **Consent Mode v2, default denied.** GA4 is loaded with all storage denied by default. The inline script in `index.html` re-grants `analytics_storage` only if the user previously accepted. The CookieBanner accept button calls `gtag('consent', 'update', ...)` live, no reload needed.

7. **Unsplash hero URLs use `?w=1600&q=75&fm=webp&fit=crop`** for fast first paint on mobile. The hero on Home is preloaded in `index.html`.

8. **Hooks-before-early-return.** `Post.tsx` and `Category.tsx` both call `useSeo`/`useJsonLd`/`useEffect` before the `if (!post) return <Navigate to="/404" replace />` to comply with React's rules of hooks.

9. **One copy of placeholder content, clearly labeled.** `posts.ts` uses a `lorem()` helper to generate filler `PostBlock[]` arrays. The helper is explicitly named so the content agent knows exactly what to replace.

---

## Known limitations / next-pass work

- **Body content is placeholder.** The 5 posts have real titles, real hero images, real categories, real tags, real metadata — but the body blocks are `lorem()`. A content pass needs to write the actual stories.
- **Sitemap is static.** When new posts are added to `posts.ts`, `public/sitemap.xml` must be regenerated. Easy to script later — could be a `prebuild` Node script that reads `posts.ts` and emits the XML.
- **OG hero image is the home hero URL.** Per-post OG images would be sharper for social sharing — could be added by passing `image: post.heroImage` into `useSeo` (already supported by the hook).
- **No RSS feed yet.** The strategy doc mentions RSS as a Phase 2 nice-to-have. Not built.
- **No search beyond client-side filter on Archive.** Fine for the first 30–50 posts; revisit if the archive grows past that.
- **Author has only initials, no photo.** Locked decision. When a portrait is ready, swap the badge in `AuthorBio.tsx`.

---

## Commands

```bash
# install
npm install

# dev
npm run dev

# typecheck + production build
npm run build

# preview production build locally
npm run preview
```

Build verified clean: 1754 modules, 308 KB JS / 59 KB CSS / 4 KB HTML, gzipped 94 KB / 10 KB / 1.4 KB, built in ~525 ms.

---

## File map

```
lapland-blog-new/
├── .env                          # Supabase shared infra
├── index.html                    # GA4 + consent mode + OG meta
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── App.tsx                   # 8 routes
    ├── main.tsx
    ├── index.css                 # dual-theme @theme + .prose-editorial
    ├── components/
    │   ├── Nav.tsx               # theme-aware
    │   ├── Footer.tsx
    │   ├── Newsletter.tsx        # source: laplandblog-website
    │   ├── CookieBanner.tsx
    │   ├── PostCard.tsx          # dark + editorial variants
    │   ├── FeaturedPost.tsx
    │   ├── AuthorBio.tsx         # VP initials badge
    │   ├── ReadingProgress.tsx
    │   ├── TableOfContents.tsx
    │   ├── Reveal.tsx
    │   ├── ScrollToTop.tsx
    │   └── TagChip.tsx
    ├── data/
    │   ├── author.ts
    │   ├── categories.ts         # 7 categories
    │   └── posts.ts              # 5 placeholder posts
    ├── lib/
    │   ├── analytics.ts          # GA4 + cross-domain
    │   ├── seo.ts                # useSeo hook
    │   └── jsonld.ts             # useJsonLd hook + schema builders
    └── pages/
        ├── Home.tsx              # dark
        ├── Archive.tsx           # dark, /stories
        ├── Category.tsx          # dark, /category/:slug
        ├── Post.tsx              # editorial light
        ├── About.tsx             # editorial light
        ├── PrivacyPolicy.tsx     # dark
        ├── Unsubscribe.tsx       # dark, branded
        └── NotFound.tsx          # dark, "Lost in the snow."
```

---

Built in one pass. Ready for content.
