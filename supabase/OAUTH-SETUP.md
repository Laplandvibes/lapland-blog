# OAuth setup — Google + Facebook sign-in

The UI code for Google and Facebook sign-in is already wired up in
`src/pages/SignIn.tsx` and `src/hooks/useAuth.ts`, but the buttons are
hidden behind a feature flag (`ENABLE_OAUTH = false`) until the upstream
providers are configured. This file walks through exactly what has to be
done outside the codebase — none of it is possible via MCP, it all requires
human hands on the Supabase / Google / Facebook consoles.

Once both providers below are live, flip the flag:

```ts
// src/pages/SignIn.tsx
const ENABLE_OAUTH = true;
```

… and the two buttons appear automatically.

---

## 1. Google sign-in

### 1.1 Google Cloud Console → OAuth client

1. Go to https://console.cloud.google.com/apis/credentials
2. Pick the project you want to own this (or create a new one — e.g.
   "Lapland Blog").
3. **APIs & Services → OAuth consent screen**
   - User type: **External**
   - App name: `Lapland.blog`
   - User support email: `laplandvibe@gmail.com`
   - Developer contact: `laplandvibe@gmail.com`
   - App logo: upload `public/icons/favicon-512.png` or similar
   - Authorised domains: `lapland.blog`, `supabase.co`
   - Scopes: leave defaults (openid, email, profile) — nothing extra
   - Test users: add yourself if the app is still in Testing mode
4. **Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `Lapland Blog Web`
   - **Authorised JavaScript origins**:
     - `https://lapland.blog`
     - `http://localhost:5173` (for local dev)
   - **Authorised redirect URIs** (CRITICAL — this is the Supabase callback):
     - `https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback`
5. Click **Create**. Copy the **Client ID** and **Client secret** — you'll
   paste them into Supabase in a second.

### 1.2 Supabase dashboard → enable Google

1. Go to https://supabase.com/dashboard/project/oogioaxmfnqcbvjbcodh/auth/providers
2. Find **Google** in the list, click it open.
3. Toggle **Enable Sign in with Google** on.
4. Paste:
   - **Client ID (for OAuth)**: `<the client id you just copied>`
   - **Client secret (for OAuth)**: `<the client secret>`
5. Leave "Skip nonce check" unchecked (keep the default).
6. Click **Save**.

### 1.3 Publish the Google consent screen (required for real users)

While the app is in **Testing**, only listed test users can sign in. To
accept anyone:

1. OAuth consent screen → **Publish app**
2. If Google asks for verification, you can still run in production as
   long as you only use the basic `openid email profile` scopes — those
   are non-sensitive and require no manual review.

---

## 2. Facebook sign-in

### 2.1 Facebook Developer Console → App

1. Go to https://developers.facebook.com/apps
2. **Create App** → "Authenticate and request data from users with
   Facebook Login" → Next
3. App name: `Lapland.blog`
4. App contact email: `laplandvibe@gmail.com`
5. Business account: pick the existing Lapeso Oy business account, or
   skip and create it now.
6. Once the app is created, open it and go to **Products → Facebook
   Login → Set up → Web**.

### 2.2 Facebook Login settings

1. Sidebar → **Facebook Login → Settings**
2. **Valid OAuth Redirect URIs** (CRITICAL):
   - `https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback`
3. **Client OAuth Login**: ON
4. **Web OAuth Login**: ON
5. **Enforce HTTPS**: ON
6. **Use Strict Mode for Redirect URIs**: ON
7. Save changes.

### 2.3 Get the App ID + Secret

1. Sidebar → **Settings → Basic**
2. Copy **App ID** and **App Secret** (click Show, confirm with Facebook
   password).
3. Add **App Domains**: `lapland.blog`
4. Add **Privacy Policy URL**: `https://lapland.blog/privacy`
5. Add **Category**: Blogging
6. Save changes.

### 2.4 Supabase dashboard → enable Facebook

1. Back to https://supabase.com/dashboard/project/oogioaxmfnqcbvjbcodh/auth/providers
2. Find **Facebook**, click open.
3. Toggle **Enable Sign in with Facebook** on.
4. Paste:
   - **Facebook client ID**: `<App ID>`
   - **Facebook secret**: `<App Secret>`
5. Save.

### 2.5 Make the app live

1. Facebook app dashboard → top bar → flip **App Mode** from
   "Development" to "Live".
2. Facebook may require you to provide the Privacy Policy URL and an
   icon (512×512) before allowing live mode — both are already on the
   site.

---

## 3. Flip the feature flag

```bash
# src/pages/SignIn.tsx line ~33
- const ENABLE_OAUTH = false;
+ const ENABLE_OAUTH = true;
```

Commit, `npm run build`, deploy:

```bash
npx wrangler pages deploy dist --project-name=lapland-blog --branch=main
```

Visit `https://lapland.blog/signin` and confirm both buttons appear
below the magic-link form.

---

## 4. How it actually works under the hood

When a visitor clicks **Google** or **Facebook** on `/signin`:

1. `signInWithGoogle()` / `signInWithFacebook()` in `src/hooks/useAuth.ts`
   calls `supabase.auth.signInWithOAuth({ provider, options: { redirectTo } })`.
2. Supabase bounces the browser to Google/Facebook with the right
   client ID.
3. The visitor grants permission on the provider.
4. Google/Facebook redirect back to
   `https://oogioaxmfnqcbvjbcodh.supabase.co/auth/v1/callback` with a
   code.
5. Supabase exchanges the code for a session and redirects the browser
   back to `window.location.origin + from` (usually `/me`).
6. `useAuth.ts` detects the new session via `onAuthStateChange` and
   upserts a row into `blog_profiles` with the handle / display_name /
   avatar pulled from the OAuth profile metadata.
7. The user lands on `/me` already signed in, profile pre-filled.

## 5. Troubleshooting cheat sheet

| Symptom | Likely cause | Fix |
|---|---|---|
| "Unsupported provider" 400 | Provider not enabled in Supabase | Step 1.2 / 2.4 |
| "redirect_uri_mismatch" | Callback URL not whitelisted in Google/FB | Step 1.1.4 / 2.2 |
| Google consent screen says "unverified" | App still in Testing mode | Step 1.3 |
| Facebook says "App not available" | App in Development mode, user not a tester | Step 2.5 |
| Login works, but no row in `blog_profiles` | Role constraint violation | Already fixed — role default is `'author'` |
| Avatar not showing after Google signin | `meta.picture` URL expired | Reload — useAuth re-syncs on every auth event |
