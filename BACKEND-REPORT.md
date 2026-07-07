# Backend report — Lapland.blog

Date: 2026-04-07
Build: deployed to Cloudflare Pages
Supabase project: `oogioaxmfnqcbvjbcodh` (shared LaplandVibes project — same DB as the newsletter `leads` table)

---

## What was built

A production Supabase backend, an admin UI, and a public read layer that replaces the previous hardcoded posts file. Vesa can now log in with a magic link, write a post in markdown, save it as a draft or publish it, and see it on the live site without a developer.

The five existing seed posts were migrated into the database and continue to render exactly as before. The look and feel of the public site is unchanged.

---

## Files added

```
src/lib/supabase.ts                          # Supabase client + admin email constant + row types
src/lib/postAdapter.ts                       # rowToPost — converts BlogPostRow → existing Post type
src/hooks/usePosts.ts                        # public list (home, archive, category)
src/hooks/usePost.ts                         # public single + useRelated
src/hooks/useAuth.ts                         # session, magic-link, signOut, isAdmin
src/hooks/useAdminPosts.ts                   # admin list/single/createPost/updatePost/deletePost
src/components/admin/AdminGuard.tsx          # guards /admin routes
src/components/admin/AdminNav.tsx            # admin top nav
src/pages/admin/Login.tsx                    # magic-link form
src/pages/admin/Dashboard.tsx                # post list with actions
src/pages/admin/Editor.tsx                   # markdown editor + meta sidebar + preview
scripts/dump-seed-sql.mjs                    # one-shot script that regenerated SQL seed files
scripts/seed-post-01..05*.sql                # seed SQL for the five hardcoded posts
BACKEND-REPORT.md                            # this file
```

## Files modified

```
src/data/posts.ts                            # extended PostBlock union with `markdown` block type
src/pages/Post.tsx                           # now uses usePost/useRelated; renders markdown blocks
src/pages/Home.tsx                           # uses usePosts({limit:12})
src/pages/Archive.tsx                        # uses usePosts() + loading state
src/pages/Category.tsx                       # uses usePosts({category}) + loading state
src/App.tsx                                  # +/admin/login, /admin, /admin/posts/new, /admin/posts/:id
package.json                                 # +@supabase/supabase-js, react-markdown, remark-gfm
```

## Files NOT touched (sacred infra)

- `public.leads` table (newsletter) — RLS, columns, triggers all unchanged
- LaplandVibes shared Supabase edge functions
- `Newsletter.tsx`, `Footer.tsx`, `Nav.tsx`, components, theme, design tokens, fonts

---

## Database schema (migration `blog_schema_initial`)

Three tables, all in `public`, all with RLS on:

### `blog_categories`
- `slug text primary key`
- `name`, `description`, `sort_order`
- 7 rows seeded (aurora, cabins, food, seasons, people, gear, stories)

### `blog_profiles`
- `id uuid` references `auth.users.id` on delete cascade
- `handle`, `display_name`, `bio`, `avatar_url`, `role`, `created_at`
- Currently empty — Vesa's row will be inserted by an after-login trigger when she signs in for the first time. Until then the posts remain self-contained via `author_snapshot` (see below).

### `blog_posts` (the main table)
- `id uuid pk`, `slug text unique`, `title`, `kicker`, `excerpt`
- `category_slug` FK → `blog_categories.slug`
- `tags text[]`
- `hero_image`, `hero_alt`
- `content jsonb` — array of `PostBlock` (paragraph | heading | pullquote | divider | list | markdown)
- `author_id uuid` **NULLABLE** FK → `auth.users.id`
- `author_snapshot jsonb NOT NULL` — `{handle, display_name, avatar_url}` so posts render even without a profile
- `status text` — `'draft'` or `'published'`, default `'draft'`
- `published_at timestamptz`, `featured boolean`, `read_time_minutes int`, `view_count int`
- `created_at`, `updated_at` (auto via trigger)

### Indexes
- `blog_posts_status_published_at_idx`
- `blog_posts_category_slug_idx`
- `blog_posts_featured_idx` (partial — `where featured = true`)
- `blog_posts_author_id_idx` (added in migration `blog_rls_optimisations` to satisfy advisor)

### Helper functions
- `public.is_blog_admin()` — `security definer` function returning `true` if `auth.users.email = 'laplandvibe@gmail.com'`
- `public.set_updated_at()` — trigger function for `updated_at` columns

### Schema decision: nullable `author_id` + `author_snapshot`
The user explicitly asked for this. Posts are self-contained — they store a JSON snapshot of the author at write time so they don't need a foreign key into a profile that may or may not exist yet. When Vesa logs in for the first time, future posts will additionally fill `author_id` with her `auth.users.id`. The seed posts have `author_id NULL` and `author_snapshot = {handle:'vesa', display_name:'Vesa Pesola', avatar_url:null}`.

---

## RLS policies (final state after `blog_rls_optimisations`)

### `blog_posts`
- **SELECT** (anon, authenticated): single permissive policy `read posts` — `status = 'published' OR is_blog_admin()`
- **INSERT** (authenticated): `is_blog_admin()`
- **UPDATE** (authenticated): `is_blog_admin()`
- **DELETE** (authenticated): `is_blog_admin()`

### `blog_categories`
- **SELECT** (anon, authenticated): public read
- **INSERT/UPDATE/DELETE** (authenticated): `is_blog_admin()` (split into three policies to satisfy the multiple-permissive linter)

### `blog_profiles`
- **SELECT** (anon, authenticated): public read
- **INSERT/UPDATE/DELETE** (authenticated): `is_blog_admin()` (same split)

### Admin enforcement
The whitelist (`laplandvibe@gmail.com`) is enforced **server-side** by `public.is_blog_admin()` reading `auth.users.email`. The client-side check in `AdminGuard` and `Login.tsx` is purely UX — RLS would still reject any write attempt from a non-admin even if a developer poked around the JS bundle.

---

## Advisor results

### Security
**Clean for blog tables.** The two remaining `rls_policy_always_true` warnings are on `public.leads`:
- `INSERT "Anyone can subscribe"` — intentionally open so the public newsletter form works
- `DELETE "Anyone can unsubscribe"` — the unsubscribe-by-email flow

These are sacred newsletter infra and were not modified.

### Performance
**Clean for blog tables at WARN level.** Remaining INFO-level "unused index" notes on `blog_posts_status_published_at_idx`, `blog_posts_category_slug_idx`, `blog_posts_featured_idx`, `blog_posts_author_id_idx` are expected — Postgres won't bother using indexes against a 5-row table. They will start being used as the post count grows. The `auth_rls_initplan` warning is on the `leads` table — also untouched.

The original `multiple_permissive_policies` and `unindexed_foreign_keys` warnings on the blog tables were resolved in the `blog_rls_optimisations` migration.

---

## Magic-link configuration

The Supabase auth `signInWithOtp` call uses:
```ts
emailRedirectTo: `${window.location.origin}/admin`
```

This means the magic link in Vesa's inbox will redirect to wherever she clicks it from — `https://lapland.blog/admin`, `https://lapland-blog.pages.dev/admin`, or `http://localhost:5173/admin` if she's running dev.

**One-time setup in the Supabase dashboard:** make sure the following URLs are listed in `Auth → URL Configuration → Redirect URLs`:
- `https://lapland.blog/admin`
- `https://lapland-blog.pages.dev/admin`
- `http://localhost:5173/admin`

The site URL should be `https://lapland.blog` so the magic email looks correct in the inbox. (This is the only manual step that wasn't possible via MCP — please double-check it before the first login.)

---

## Cloudflare Pages deploy

Project name: `lapland-blog`
Build was deployed via:
```
npx wrangler pages deploy dist --project-name=lapland-blog --commit-dirty=true
```

Latest deployment URL: `https://99785804.lapland-blog.pages.dev`
Project URL: `https://lapland-blog.pages.dev` (200 OK at the time of writing)

The `lapland.blog` apex still resolves to Vercel as of right now (DEPLOYMENT_NOT_FOUND from Vercel) — once the DNS is pointed at Cloudflare Pages this build will go live there.

**Important:** the Cloudflare Pages project must have the same env vars as the local `.env`:
- `VITE_SUPABASE_URL` = `https://oogioaxmfnqcbvjbcodh.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = (the anon key already in `.env`)
- `VITE_SUPABASE_PROJECT_ID` = `oogioaxmfnqcbvjbcodh`

Vite inlines these at build time. The current deployed bundle was built locally with the values from `.env`, so it works for now — but any future deploy from a different machine or from CI will need those vars set on the Cloudflare Pages project.

---

## How Vesa logs in for the first time

1. Open `https://lapland.blog/admin/login` (or `https://lapland-blog.pages.dev/admin/login` until DNS points to Cloudflare).
2. Enter `laplandvibe@gmail.com` and click "Send magic link".
3. Open the email in the same browser session and click the link.
4. She lands on `/admin` — the dashboard with the five seed posts visible.
5. Click "New post" or any existing title to write/edit. Markdown body, meta in the sidebar, "Save draft" or "Publish" at the top.
6. Sign out from the top right when done.

If she signs in from a different inbox by mistake, the AdminGuard blocks her with a clear "not authorised" screen and a sign-out button.

---

## Editor model — markdown body

Posts written in the editor are stored as a single block:
```json
[{ "type": "markdown", "text": "the full markdown source" }]
```

The Post page renderer recognises six block types:
- `paragraph`, `heading`, `pullquote`, `list`, `divider` (used by the seed posts)
- `markdown` (used by all new posts) — rendered with `react-markdown` + `remark-gfm`

This means the seeded posts continue to render with their per-paragraph control, and any post Vesa writes from now on uses markdown — which is faster to type and supports headings, bold, italics, links, lists, and pull quotes (`>`).

The editor's "Edit existing post" flow re-serialises the loaded blocks back into a single markdown string so Vesa can edit a seeded post without losing structure. The next save will collapse it into one markdown block — that's intentional and matches her stated preference for not maintaining a structured-block editor.

---

## Read-time estimate

`estimateReadTime(markdown)` in `Editor.tsx` divides the word count by 220 wpm (the average reading speed for dense first-person narrative writing). The number is shown live under the editor and saved to `read_time_minutes` on every save.

---

## Build status

Two consecutive `npm run build` runs both passed clean:
```
dist/index.html                   4.08 kB │ gzip:   1.41 kB
dist/assets/index-TVSotYqL.css   65.41 kB │ gzip:  10.71 kB
dist/assets/index-DZp-cXQa.js   677.21 kB │ gzip: 195.57 kB
✓ built in ~500ms
```

The 677 kB JS bundle warning is informational — react-markdown + remark-gfm add ~80 kB gzip. The site still ships in under 200 kB gzipped.

---

## Things deliberately NOT done (Phase 1 scope)

- **No image upload.** Hero images are still URL fields. Vesa pastes Unsplash links the way the seeded posts do. A storage-backed uploader is a Phase 2 task.
- **No multi-author support.** Author is hardcoded to Vesa via `author_snapshot`. The `blog_profiles` table is ready when needed.
- **No scheduled publishing.** The `published_at` field is editable (date picker in the editor), but there is no background job that flips drafts to published at a future date. If she sets a future date and clicks Publish, the post is published immediately with that date as its `published_at`.
- **No comments.** Out of scope for the launch.
- **No view counter increment.** The `view_count` column exists but the public reader doesn't bump it yet — Phase 2.
- **No search.** Archive search is still client-side over the loaded list. Fine for ~50 posts; Phase 2 should switch to a Postgres `tsvector` or Supabase full-text search if the archive grows.

---

## Quick verification queries

```sql
-- What's in the table right now
select slug, status, featured, published_at, read_time_minutes
from public.blog_posts
order by published_at desc;

-- Public-visible count (what an unauthenticated visitor sees)
select count(*) from public.blog_posts where status = 'published';
-- → 5

-- Categories
select slug, name from public.blog_categories order by sort_order;
-- → 7 rows
```

---

## Summary

Backend live. Auth wired. Admin shipped. Five seed posts in the database. Public site rendering from Supabase. Build clean. Cloudflare deploy successful at `https://lapland-blog.pages.dev`. Vesa can log in and start writing as soon as the redirect URLs are added in the Supabase dashboard (one-time five-second task).
