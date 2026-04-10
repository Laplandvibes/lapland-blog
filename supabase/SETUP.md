# Lapland.blog · Supabase Auth setup checklist

These five settings must be configured in the Supabase Dashboard for sign-in
to work in production. Configuration cannot be done from code — Supabase
requires Dashboard access. Estimated time: 5 minutes.

Project: `oogioaxmfnqcbvjbcodh` (lapland-blog)
Dashboard: <https://supabase.com/dashboard/project/oogioaxmfnqcbvjbcodh>

---

## 1. URL Configuration — fix the broken localhost redirect

**Why:** When you click the email confirmation link, it currently redirects
to `http://localhost:3000` and shows ERR_CONNECTION_REFUSED. That's because
Supabase is using its default Site URL (localhost from dev setup). It needs
to point at the production site.

**Where:** Authentication → URL Configuration

**Set Site URL to:**

```
https://lapland.blog
```

**Add to "Redirect URLs" allow-list (one per line):**

```
https://lapland.blog
https://lapland.blog/**
https://*.lapland-blog.pages.dev/**
http://localhost:5173/**
http://localhost:3000/**
```

(The two localhost lines stay for local dev; the wildcard pages.dev line
covers every Cloudflare Pages preview deploy.)

Click **Save**.

---

## 2. Email Templates — replace generic Supabase branding

**Why:** Right now emails arrive with the Supabase logo and "powered by
Supabase ⚡" footer. We want Lapland.blog branding.

**Where:** Authentication → Email Templates

Two templates to replace:

### a) Magic Link

- **Subject:** `Your magic link to lapland.blog`
- **Message body:** copy the entire contents of
  `supabase/email-templates/magic-link.html` into the body editor.
- Click **Save**.

### b) Confirm signup

- **Subject:** `Confirm your Lapland.blog account`
- **Message body:** copy the entire contents of
  `supabase/email-templates/confirm-signup.html` into the body editor.
- Click **Save**.

---

## 3. (Recommended) Disable email confirmation — one-click signup

**Why:** With "Confirm email" enabled, new users have to:
  1. Type email
  2. Get a "Confirm signup" email
  3. Click confirm
  4. Get redirected, then *also* click sign-in

That's two emails for one signup. Friction.

With it **disabled**, the magic link is the proof of identity:
  1. Type email
  2. Get magic link
  3. Click — instantly logged in and account created

**Where:** Authentication → Sign In / Up → Email

- Toggle **Confirm email** to **OFF**
- Click **Save**

After disabling, only the **Magic Link** template is used. The Confirm
signup template can stay in the dashboard but will not be sent.

---

## 4. (Optional) Enable Google OAuth

The Google button on `/signin` is hidden behind a feature flag in the code
(`ENABLE_OAUTH = false` in `src/pages/SignIn.tsx`) because the provider is
not yet configured. To enable it:

### a) Get Google OAuth credentials

1. Open <https://console.cloud.google.com/apis/credentials>
2. Create a new project (or pick an existing one)
3. Configure OAuth consent screen → External, app name "Lapland.blog"
4. Credentials → Create Credentials → OAuth client ID → Web application
5. **Authorized redirect URI:**
   ```
   https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback
   ```
6. Copy the **Client ID** and **Client secret**

### b) Enable in Supabase

1. Authentication → Providers → Google
2. Toggle **Enable Sign in with Google**
3. Paste **Client ID** and **Client Secret**
4. Click **Save**

### c) Flip the feature flag in the code

In `src/pages/SignIn.tsx`:

```ts
const ENABLE_OAUTH = true;  // was false
```

Commit, push, deploy. The Google button reappears and works.

---

## 5. (Optional) Enable Facebook OAuth

Same flow as Google but via <https://developers.facebook.com/apps>.
Add the same callback URL. Then in Supabase enable Facebook provider with
the App ID + secret. The same `ENABLE_OAUTH` flag controls both buttons.

---

## Verification checklist

After completing steps 1–3:

- [ ] Open the production sign-in page on a real browser
- [ ] Type your email and click "Start my Lapland blog"
- [ ] Receive an email branded **Lapland.blog** (no Supabase logo)
- [ ] Click the magic link
- [ ] Land on **lapland.blog** (not localhost) — logged in
- [ ] The Nav shows your avatar in the top-right

If any step fails, check:
- Supabase Auth → Logs for the most recent auth event
- Browser DevTools → Network for the redirect chain
- That the redirect URL pattern in the allow-list matches the URL exactly
