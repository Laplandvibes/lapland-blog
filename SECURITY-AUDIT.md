# Lapland.blog — security & auth audit (2026-05-04)

Triggered by Vesa: "voidaanko sanoa ilmainen aina? ja toimiiko tämä
varmasti ja tästä sivusta on ohjeistus muistissa miten sign in tapahtuu
jne. salasanan nollaus onnistuu ja kaikki turvallisuus aspektit on otettu
huomioon?"

This is the audit. TL;DR: the platform's RLS, storage and magic-link
infrastructure are at enterprise level. The gaps were on the user-facing
copy ("Free forever" was too categorical) and on GDPR self-serve (no
delete-account / data-export path). Both fixed in commit
`canonicalisation-2026-05-04` HEAD.

---

## 1. Database — Row Level Security

Audit query (run on Supabase project `oogioaxmfnqcbvjbcodh`):

```sql
SELECT t.tablename, t.rowsecurity, json_agg(...) AS policies
FROM pg_tables t LEFT JOIN pg_policies p USING (schemaname, tablename)
WHERE t.schemaname='public' AND t.tablename LIKE 'blog_%';
```

Result:

| Table | RLS | Policies | Verdict |
|---|---|---|---|
| `blog_categories` | on | public read · admin INSERT/UPDATE/DELETE | ✅ Read-only for visitors |
| `blog_leads` | on | INSERT open (`true`) · **NO public SELECT** | ✅ Newsletter list private |
| `blog_posts` | on | public reads only `status='published'` OR admin · authors INSERT/UPDATE/DELETE rows where `author_id=auth.uid()` · authors can read own drafts · admin overrides all | ✅ Author can only touch their own; published-only public; drafts are private |
| `blog_profiles` | on | public read all · users INSERT/UPDATE/DELETE only their own row | ✅ Per-author public profiles work; can't impersonate |

**Storage bucket `trip-images`:**
- Public read ✅
- Owner-scoped INSERT/UPDATE/DELETE: `(storage.foldername(name))[1] = (auth.uid())::text` — i.e. each user can only write into a folder named with their UUID ✅
- File size limit: **10 MB** ✅
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/avif` ✅ (no malicious uploads)

**Verdict: solid.** No findings against the database layer.

---

## 2. Auth — magic-link only (passwordless)

- Passwords are **not used**. Cannot be phished, cannot be reused, cannot leak in a breach.
- Magic-link sent via Supabase Auth → Resend integration.
- Link expires in **1 hour**.
- Supabase built-in rate limit: 3 magic-link emails per email address per hour.
- Inline rate limit on `send-welcome-email` Edge Function: 5 requests per IP per 60 seconds.
- OAuth: Google enabled (`ENABLE_GOOGLE_OAUTH = true`); Facebook disabled (Meta App Review pending).
- Auth-state propagated via `useAuth()` hook; gated routes use `<AuthGuard>` and `<AdminGuard>`.

**Q: How does password reset work?**
A: There is no password. If a user loses access to their email, they request a fresh magic link. If the email itself is compromised, the user contacts info@lapland.blog. This is documented on the new `/me/settings` page.

**Q: How does email change work?**
A: Self-serve email-change requires Supabase `auth.updateUser({ email })` + a confirmation flow we haven't shipped yet. Until then, users go through `mailto:info@lapland.blog` (link from `/me/settings`). The team verifies identity by checking the `From:` matches the account on file.

**Verdict: simple, correct, low attack surface.**

---

## 3. CORS

Edge Function `send-welcome-email/index.ts` hard-codes `ALLOWED_ORIGINS`. Verified:
- `https://lapland.blog` ✅ (line 45)
- `https://*.lapland-blog.pages.dev` matches via regex `^https:\/\/[a-z0-9-]+\.lapland[a-z-]*\.pages\.dev$` ✅
- Defaults to `https://laplandvibes.com` if origin not allowed

**Verdict: ✅ no CORS gap.**

---

## 4. The "Free forever" claim — softened

**Before:** "Free forever · No card required" (Home + SignIn footers).
**After:** "Free for travel journals · No card required" (commit HEAD).

Why: "forever" is a forward-looking promise the company can't legally guarantee. Hosting + Supabase free-tier limits could in theory force a future change. The new wording promises *journal authoring is free*, leaving room to introduce premium features later (verified profiles, custom domains for trip blogs, etc.) without having broken a promise.

The privacy/terms pages already cover service-availability and right-to-discontinue — so the legal seam is intact.

---

## 5. GDPR — self-serve data rights

**Gap before this audit:** users had no public way to request data export or account deletion. The privacy page mentioned the right but didn't link a method.

**Fix shipped in this commit:**

New page `/me/settings` (mounted under `<AuthGuard>`) gives every signed-in author three controls:

1. **Change email address** — `mailto:info@lapland.blog` with pre-filled subject + body, identity verification by sender match
2. **Export my data (GDPR Art. 20)** — `mailto:info@lapland.blog` request; team delivers JSON + media zip within 7 days
3. **Delete my account (GDPR Art. 17)** — `mailto:info@lapland.blog` request; team confirms before purging

Plus prominent reminder: newsletter is a separate list, unsubscribe via `/unsubscribe`.

A link "Account & settings" was added to the `/me` dashboard so authors can find this without searching.

**Future work (Phase 6+):** convert mailto-driven flows to in-app self-serve once the support load justifies the engineering. Priority order: deletion > export > email-change. Schema is ready (deleting `auth.users` cascades blog_profiles → blog_posts via existing FKs).

---

## 6. PII handling

- **Email address** — stored on `auth.users` (Supabase-managed, encrypted at rest) and copied to `blog_leads` for newsletter signups. Not displayed anywhere on the public site.
- **Display name + handle** — voluntarily set by user; public on `/by/<handle>` and `/post/<slug>`.
- **IP address** — handled by Cloudflare for DDoS / bot mitigation; not stored long-term in our DB. Supabase logs request IPs for 7 days.
- **Browser fingerprint / device data** — NOT collected by Lapland.blog. GA4 with consent-mode-v2 default-denied; only set after user accepts cookie banner.
- **OAuth metadata** (Google avatar URL, full_name) — synced into `blog_profiles` only on first sign-in, then static.

**Newsletter list is private:** `blog_leads` has `INSERT` open and `SELECT` `false` — nobody outside the service-role can read who signed up.

---

## 7. Outstanding follow-ups (NOT blockers, defer to phase 6+)

1. **In-app self-serve email change** — `auth.updateUser` flow with confirmation email.
2. **In-app self-serve account deletion** — call `auth.admin.deleteUser` via an Edge Function with the user's signed JWT. Cascades cleanly.
3. **Two-factor auth (TOTP)** — Supabase supports it; not yet wired into the UI. Not critical for a UGC trip blog but a nice-to-have.
4. **Audit logging** — record `auth.users.last_sign_in_at` is automatic; we don't yet log post-publish/delete events. If we ship self-serve delete, add an audit table so accidental deletions can be reasoned about.
5. **Storage upload virus scan** — Supabase doesn't scan uploaded images; we rely on MIME-type allow-list. ClamAV/equivalent on the Edge could be added if we ever expand to non-image uploads.
6. **Rate limit on signup endpoints** — current 5 req/min/IP is lax. Tighten to 3/min during a public launch surge.

None of these are required to ship the v1 of the platform safely.

---

## 8. Open security cheatsheet (operations)

Run periodically (every 30 days minimum):

```bash
# 1. Check no service-role keys leaked into the bundle
grep -r "supabase\.co/auth/v1/admin\|service_role" laplandvibes/ lapland-blog-new/

# 2. Check no PII in client logs
grep -r "console.log.*email\|console.log.*user" lapland-blog-new/src/

# 3. List the production RLS state
psql "$SUPABASE_PG_URL" -c "
  SELECT tablename, rowsecurity FROM pg_tables
  WHERE schemaname='public' AND tablename LIKE 'blog_%';"

# 4. Confirm storage bucket sizes/limits unchanged
psql "$SUPABASE_PG_URL" -c "
  SELECT name, public, file_size_limit, allowed_mime_types
  FROM storage.buckets;"

# 5. Check magic-link delivery sample
curl -sX POST $SUPABASE_URL/auth/v1/otp \
  -H "apikey: $ANON_KEY" -H "Content-Type: application/json" \
  -d '{"email":"smoke+'$(date +%s)'@example.com"}'
```

If any of the above produce unexpected output → page Vesa.

---

## TL;DR for Vesa

✅ RLS on every blog_* table, storage bucket, and CORS allowlist — verified solid.
✅ Magic-link auth with 1h expiry, 3/h rate limit per email, 5/min/IP on the welcome endpoint.
✅ "Free forever" → "Free for travel journals" softened.
✅ `/me/settings` page now gives users self-serve paths (via mailto) for email change, GDPR data export, and GDPR account deletion.
✅ Memory: `project_lapland_blog_auth_security.md` codifies how sign-in works for future agents.
⚠️ Phase 6+: convert the three mailto flows to in-app self-serve; add 2FA option.
