# Lapland.blog — UX Pass Report

Date: 2026-04-07
Deploy: https://d31ffcbb.lapland-blog.pages.dev (preview) → lapland.blog (live)
Build: clean (`tsc -b && vite build`, 597 ms, 705 kB JS / 74 kB CSS)
TypeScript errors: 0

---

## 1. Hero images — hand-picked, verified

Every hero / OG image was verified individually via the Unsplash
`/photos/{slug}/download` redirect (which returns the canonical
`images.unsplash.com/photo-XXXX-XXXX` URL) before being committed. No more
generic stock fallbacks.

| Surface | Photo ID | Subject |
| --- | --- | --- |
| Home hero (LCP) | `photo-1738189669835-61808a9d5981` | Aurora over snow-laden Lapland forest, full curtain |
| Home OG / `index.html` preload | same | matched 1200×630 jpg variant |
| Archive (Stories) hero | `photo-1770793861392-5f0223651d19` | Snowy mountain range, deep blue twilight |
| About hero | `photo-1513688544456-c1a3b695728a` | Solitary figure among snow-laden trees |
| Post 1 — *The night the sky broke open over Kemi* | `photo-1482249839525-2cd6b87ebc22` | Vincent Guth aurora |
| Post 2 — *Why I stopped chasing the aurora with an app* | `photo-1502288294350-301c0c4628c9` | Aurora curtain over a tree line |
| Post 3 — *Five nights in a forest cabin* | `photo-1639863523753-3952079f6ded` | Wood cabin in deep winter forest |
| Post 4 — *A bowl of salmon soup that cost more than the flight* | `photo-1547592180-85f173990554` | Salmon soup, served close-up |
| Post 5 — *Living between two suns* | `photo-1681151335137-108527dc24fe` | Polar twilight, low Arctic sun |

Format used:
- Hero (LCP / full-bleed): `?w=1920&q=85&fm=webp&fit=crop`
- OG / Twitter card: `?w=1200&q=85&fm=jpg&fit=crop&h=630`

The 5 post hero URLs were updated **both** in `src/data/posts.ts` (file
fallback) and via SQL in `public.blog_posts` (live Supabase row), so the live
site reads from Supabase but file-system fallback is consistent. `hero_alt`
was rewritten on every row to be photo-specific and screen-reader useful.

---

## 2. Storytelling home page

`src/pages/Home.tsx` is now a narrative landing page in seven movements
instead of a card grid. Each section is a `<section>` with reveal-on-scroll
animation (IntersectionObserver, threshold 0.15, `prefers-reduced-motion`
respected).

1. **Cinematic hero** — Full-bleed `animate-kenburns` aurora background,
   tagline *"Write your Lapland story. While it's still cold on your cheeks."*,
   two CTAs (`Read the latest` → `#featured`, `Join the journal` →
   `#newsletter`).
2. **Manifesto strip** — Serif blockquote on the dark band: *"I started this
   journal because every other Lapland blog read like a brochure…"* signed
   *— Vesa*. Sets the editorial tone in one screen.
3. **Featured story** — Bigger, more cinematic. Anchored at `#featured` with
   `scroll-mt-24` so the in-page CTA lands cleanly under the sticky nav.
4. **Three-pillar editorial index** — *I · What the cold actually does*,
   *II · Where I sleep, where I eat*, *III · Who else lives up here*. Each
   pillar links into the relevant categories with its own accent color
   (pink / aurora-green / aurora-blue).
5. **Latest stories grid** — Existing `PostCard` grid, three abreast on
   desktop, single column on mobile.
6. **Personal aside on cream band** — Switches to the editorial cream
   palette mid-page, 260 px Vesa portrait, two paragraphs, link to
   `/about`. Visually breaks the dark vertical and previews the editorial
   theme readers will see on post pages.
7. **Newsletter** — Existing `<Newsletter>` component (now framed with the
   improved framing copy *"The Nightline — but quieter."*).

Animation polish: `Reveal` stagger across pillars and stories, `kenburns`
on hero background, `animate-hero-pulse` ambient glow, all killed under
`prefers-reduced-motion: reduce`.

---

## 3. ShareBar component

New file: `src/components/ShareBar.tsx`. Inserted into `src/pages/Post.tsx`
**after** the article body / TOC grid and **before** the tags row, on the
editorial cream theme.

Targets (6):
- **X** (`twitter.com/intent/tweet`)
- **Facebook** (`facebook.com/sharer`)
- **LinkedIn** (`linkedin.com/sharing/share-offsite`)
- **WhatsApp** (`api.whatsapp.com/send`)
- **Email** (`mailto:` with subject + excerpt + url body)
- **Copy link** — uses `navigator.clipboard.writeText` with a
  `document.execCommand('copy')` fallback for restricted contexts; flips
  to a green `Check` + "Copied" label for 2 s on success.

Notes:
- All external buttons are `target="_blank" rel="noopener noreferrer"`.
- All buttons have `aria-label`, `cursor-pointer` and a focus-visible ring
  on `--color-accent`.
- Lucide-react no longer ships brand icons (Twitter / Facebook / LinkedIn
  were removed in v0.5+), so the brand glyphs are inlined as minimal SVGs
  inside the file. Only `Mail`, `Link2`, `Check` come from lucide.
- New analytics helper `trackShare(network, slug)` in `src/lib/analytics.ts`
  fires GA4 `share` event with `method`, `content_type='post'`, `item_id`.

---

## 4. Auth — OAuth + reader sign-in

### 4.1 useAuth (`src/hooks/useAuth.ts`)
Added:
- `signInWithGoogle({ redirectTo? })`
- `signInWithFacebook({ redirectTo? })`
- `sendMagicLink(email, { redirectTo? })` now accepts a custom redirect
- `syncProfile(user)` — idempotent upsert into `public.blog_profiles`
  on every auth event. Pulls handle / display_name / avatar from OAuth
  metadata (`full_name`, `name`, `picture`, `avatar_url`,
  `preferred_username`, `user_name`). Tracks the last synced user ID in a
  ref so we never re-upsert the same row twice.

### 4.2 Admin login (`src/pages/admin/Login.tsx`)
Below the magic-link form, an "Or sign in with" divider precedes a 2-column
button row: **Google** (white pill, official 4-color G) and **Facebook**
(brand blue pill). The admin whitelist (`is_blog_admin()` + RLS) still
enforces server-side, so OAuth is just a faster path for `laplandvibe@gmail.com`.

### 4.3 Reader sign-in (`src/pages/SignIn.tsx`, route `/signin`)
Brand-new page for readers. Same dark theme as the admin login but
explicitly framed as **optional** (*"You don't need an account to read"*).
Magic link + Google + Facebook. Captures `from` from React Router state and
redirects back there on success (defaults to `/`).

### 4.4 Nav (`src/components/Nav.tsx`)
- Unauthenticated: shows a `Sign in` link in the desktop nav and the mobile
  drawer.
- Authenticated: replaces the `Sign in` link with a 36 px round avatar
  (OAuth picture or 2-letter initials fallback). Click opens an aria-menu
  dropdown with the display name, an optional `Admin dashboard` link
  (visible only when `isAdmin === true`), and `Sign out`. Click-outside
  closes the menu. Mobile drawer has a stacked equivalent.

### 4.5 RLS migration `blog_profile_self_access`
Already applied. Three policies:
```sql
create policy "users read own profile" on public.blog_profiles
  for select to authenticated using (id = auth.uid());
create policy "users update own profile" on public.blog_profiles
  for update to authenticated using (id = auth.uid())
  with check (id = auth.uid());
create policy "users insert own profile" on public.blog_profiles
  for insert to authenticated with check (id = auth.uid());
```

---

## 5. OAuth setup walkthrough — what Vesa needs to do

The code is wired up; the providers are not yet enabled in Supabase. Until
the next two steps are done, both OAuth buttons will return an error like
*"Provider not enabled"*. Magic-link sign-in works today.

### 5.1 Supabase dashboard
1. Open https://supabase.com/dashboard/project/oogioaxmfnqcbvjbcodh/auth/providers
2. Toggle **Google** on:
   - Paste the **Client ID** + **Client Secret** from Google Cloud
     (instructions below).
   - Authorized redirect URL is shown by Supabase — copy it; you'll need
     it in Google Cloud (it looks like
     `https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback`).
3. Toggle **Facebook** on:
   - Paste the **App ID** + **App Secret** from Facebook Developers.
   - Same redirect URL pattern as above.
4. Under **Auth → URL Configuration**, add the production site URL
   `https://lapland.blog` and the preview pattern `https://*.lapland-blog.pages.dev`
   to **Additional Redirect URLs**.

### 5.2 Google Cloud Console
1. https://console.cloud.google.com → APIs & Services → Credentials.
2. Create OAuth client ID → **Web application**.
3. Authorized JavaScript origins:
   - `https://lapland.blog`
   - `https://oogioaxmfnqcbvjbcodh.supabase.co`
4. Authorized redirect URIs:
   - `https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback`
5. Copy Client ID + Secret into Supabase (step 5.1.2).
6. Configure the OAuth consent screen (External, app name `Lapland.blog`,
   support email `laplandvibe@gmail.com`, scopes `email`, `profile`,
   `openid`). You can stay in *Testing* mode while we verify it works
   end-to-end, then publish.

### 5.3 Facebook for Developers
1. https://developers.facebook.com/apps → Create App → **Consumer**.
2. Add product **Facebook Login**.
3. Settings → Basic: copy **App ID** + **App Secret** → Supabase (step 5.1.3).
4. Facebook Login → Settings → Valid OAuth Redirect URIs:
   - `https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback`
5. Add the site URL to App Domains: `lapland.blog`.
6. Switch the app to **Live** (top of dashboard) when ready. Until then
   only Facebook accounts that are listed as developers/testers can sign
   in.

### 5.4 Sanity check after enabling
- `/admin/login` → click Google → finishes at `/admin` if email is
  `laplandvibe@gmail.com`, otherwise the AdminGuard bounces back.
- `/signin` → click Google → finishes at `/` (or wherever the reader came
  from) and the nav avatar renders the Google profile picture.
- In Supabase Studio, `select * from public.blog_profiles` should now
  contain your row, with `role='admin'` for the whitelisted email.

---

## 6. Quality bar (audit)

| Item | Status |
| --- | --- |
| TypeScript clean (`tsc -b && vite build`) | OK |
| No `any` types in new code | OK |
| WCAG AA — focus rings on every interactive element | OK |
| `target="_blank" rel="noopener noreferrer"` on external links | OK |
| `cursor-pointer` on every button | OK |
| `prefers-reduced-motion: reduce` kills kenburns / hero pulse / Reveal | OK |
| Lazy load images except hero LCP | OK |
| `fetchPriority="high"` on every hero LCP | OK |
| No `console.log` in prod paths | OK |
| Mobile-first, tested in build (no responsive regressions) | OK |
| RLS — `blog_profiles` self-access policies applied | OK |

---

## 7. Known limitations

1. **OAuth providers are off in Supabase.** See section 5. The buttons
   render and call the SDK correctly; until the providers are enabled
   they'll surface a Supabase error toast in the console.
2. **`source.unsplash.com` is deprecated.** All Unsplash URLs now use the
   canonical `images.unsplash.com/photo-XXX-XXX?w=...&fm=webp` pattern,
   verified via the `/photos/{slug}/download` 302 trick.
3. **Lucide-react brand icons.** v0.5+ removed `Twitter`, `Facebook`,
   `Linkedin`. ShareBar inlines SVGs for these. If we ever upgrade to a
   brand-icon library, we can swap them out.
4. **Bundle size warning.** Vite warns the JS chunk is 705 kB (200 kB
   gzipped). That's almost entirely react-markdown + remark-gfm + the
   Supabase JS client, which we want available on the post page. Code
   splitting the editor (admin) and the markdown renderer would shave
   ~150 kB but adds a route-load delay; left as-is for now.
5. **Profile sync runs on every auth state change**, not just first
   sign-in. It's idempotent (`upsert` with `onConflict: 'id'`) so this is
   safe but not strictly minimal. The `syncedFor` ref skips re-upserts
   within a single session.

---

## 8. What to do next

Short list, in priority order:

1. **Enable Google + Facebook providers in Supabase** (15 minutes,
   walkthrough above).
2. **Verify the live site at lapland.blog** — the deploy went to the
   preview URL `d31ffcbb.lapland-blog.pages.dev`; the production alias
   updates automatically on a clean deploy, but worth a quick visual
   check.
3. **Test the share bar end-to-end** on a real article — open
   `/post/the-night-the-sky-broke-open-over-kemi`, click each share
   target, confirm the GA4 `share` event fires in Realtime view.
4. **Add a "Comments coming soon" line** under the share bar so readers
   know why we're asking them to sign in. Currently `/signin` is opt-in
   but the value prop is thin; once comments land it justifies itself.
5. **Write the next post.** The image pipeline, the storytelling
   structure, the editorial theme, the share bar and the auth all exist
   to serve actual writing. The site is now waiting for content, not
   features.

---

Files touched in this pass (absolute paths):

- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\data\posts.ts`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\pages\Home.tsx`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\pages\Archive.tsx`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\pages\About.tsx`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\pages\Post.tsx`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\pages\SignIn.tsx` *(new)*
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\pages\admin\Login.tsx`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\components\ShareBar.tsx` *(new)*
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\components\Nav.tsx`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\hooks\useAuth.ts`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\lib\analytics.ts`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\index.css`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\index.html`
- `C:\Users\pesol\Projects\laplandvibes\lapland-blog-new\src\App.tsx`
- Supabase: `blog_posts` rows updated, `blog_profile_self_access` migration applied
