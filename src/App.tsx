import { lazy, Suspense, useEffect, useReducer, type ReactNode } from 'react';
import { COPY, loadCopy } from './locales/copy';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from '../../shared/CookieBanner';
import NewsletterPopup from './components/NewsletterPopup';
import LocaleAutoRedirect from './i18n/LocaleAutoRedirect';
import { useHtmlLang, useLang, LANG_PREFIX } from './i18n/useLang';

// The auth-gated /me/* dashboard is registered under the bare path AND under
// every locale prefix ('/fi', '/de', …) so a signed-in visitor never 404s on
// a locale-prefixed dashboard URL. Derived from LANG_PREFIX so new locales are
// covered automatically. '' = the canonical, locale-agnostic /me.
const ME_ROUTE_PREFIXES = [
  '',
  ...Object.values(LANG_PREFIX)
    .filter(Boolean)
    .map((p) => `/${p}`),
];

// Lazy-load every route, including Home. Home was static before, but it pulls
// in posts.ts (~76 KB) and locales/copy.ts (~275 KB), bloating the main chunk
// to 353 KB. Lazy Home moves that weight into a per-route chunk so the shell
// ships a small main bundle and the home view loads behind Suspense.
const Home = lazy(() => import('./pages/Home'));
const Post = lazy(() => import('./pages/Post'));
const Archive = lazy(() => import('./pages/Archive'));
const Category = lazy(() => import('./pages/Category'));
const About = lazy(() => import('./pages/About'));
const StartHere = lazy(() => import('./pages/StartHere'));
const TopReads = lazy(() => import('./pages/TopReads'));
const Destinations = lazy(() => import('./pages/Destinations'));
const AuthorProfile = lazy(() => import('./pages/AuthorProfile'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin chunk: AdminGuard, Login, Dashboard, Editor — all behind auth, all
// rarely used by readers, so they go to a separate chunk that only authors
// download.
const AdminGuard = lazy(() => import('./components/admin/AdminGuard'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Editor = lazy(() => import('./pages/admin/Editor'));

// User-facing "my blog" chunk — every signed-in reader lands here to manage
// their own entries. Separate chunk from the admin so anonymous visitors
// never download either.
const AuthGuard = lazy(() => import('./components/me/AuthGuard'));
const MyDashboard = lazy(() => import('./pages/me/MyDashboard'));
const MyEditor = lazy(() => import('./pages/me/MyEditor'));
const MySettings = lazy(() => import('./pages/me/MySettings'));

// Lightweight skeleton shown while a chunk is in-flight. Same dark palette as
// the rest of the app so there's no visual flash.
function RouteFallback() {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-pink border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function LocaleSync() {
  const lang = useHtmlLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

function LocalisedCookieBanner() {
  const lang = useLang();
  return <CookieBanner consentKey="laplandblog_cookie_consent" lang={lang} />;
}

/**
 * Non-EN copy lives in per-language lazy chunks (see locales/copy.ts).
 * Gate the route tree until the active language's chunk is registered in
 * COPY, so every consumer keeps reading COPY[lang] synchronously.
 * EN is bundled eagerly — English visitors never hit the gate.
 */
function CopyGate({ children }: { children: ReactNode }) {
  const lang = useLang();
  const [, bump] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    let alive = true;
    if (!COPY[lang]) loadCopy(lang).then(() => { if (alive) bump(); });
    return () => { alive = false; };
  }, [lang]);
  if (!COPY[lang]) return <RouteFallback />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LocaleAutoRedirect />
      <LocaleSync />
      <CopyGate>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fi" element={<Home />} />
          <Route path="/de" element={<Home />} />

          <Route path="/start-here" element={<StartHere />} />
          <Route path="/fi/start-here" element={<StartHere />} />
          <Route path="/de/start-here" element={<StartHere />} />

          <Route path="/top-reads" element={<TopReads />} />
          <Route path="/fi/top-reads" element={<TopReads />} />
          <Route path="/de/top-reads" element={<TopReads />} />

          <Route path="/destinations" element={<Destinations />} />
          <Route path="/fi/destinations" element={<Destinations />} />
          <Route path="/de/destinations" element={<Destinations />} />

          <Route path="/by/:handle" element={<AuthorProfile />} />
          <Route path="/fi/by/:handle" element={<AuthorProfile />} />
          <Route path="/de/by/:handle" element={<AuthorProfile />} />

          <Route path="/stories" element={<Archive />} />
          <Route path="/fi/stories" element={<Archive />} />
          <Route path="/de/stories" element={<Archive />} />

          <Route path="/category/:slug" element={<Category />} />
          <Route path="/fi/category/:slug" element={<Category />} />
          <Route path="/de/category/:slug" element={<Category />} />

          <Route path="/post/:slug" element={<Post />} />
          <Route path="/fi/post/:slug" element={<Post />} />
          <Route path="/de/post/:slug" element={<Post />} />

          <Route path="/about" element={<About />} />
          <Route path="/fi/about" element={<About />} />
          <Route path="/de/about" element={<About />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/fi/signin" element={<SignIn />} />
          <Route path="/de/signin" element={<SignIn />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/fi/privacy" element={<PrivacyPolicy />} />
          <Route path="/de/privacy" element={<PrivacyPolicy />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/fi/terms" element={<Terms />} />
          <Route path="/de/terms" element={<Terms />} />

          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/fi/cookie-policy" element={<CookiePolicy />} />
          <Route path="/de/cookie-policy" element={<CookiePolicy />} />

          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/fi/unsubscribe" element={<Unsubscribe />} />
          <Route path="/de/unsubscribe" element={<Unsubscribe />} />
      {/* JA */}
          <Route path="/ja" element={<Home />} />
          <Route path="/ja/start-here" element={<StartHere />} />
          <Route path="/ja/top-reads" element={<TopReads />} />
          <Route path="/ja/destinations" element={<Destinations />} />
          <Route path="/ja/by/:handle" element={<AuthorProfile />} />
          <Route path="/ja/stories" element={<Archive />} />
          <Route path="/ja/category/:slug" element={<Category />} />
          <Route path="/ja/post/:slug" element={<Post />} />
          <Route path="/ja/about" element={<About />} />
          <Route path="/ja/signin" element={<SignIn />} />
          <Route path="/ja/privacy" element={<PrivacyPolicy />} />
          <Route path="/ja/terms" element={<Terms />} />
          <Route path="/ja/cookie-policy" element={<CookiePolicy />} />
          <Route path="/ja/unsubscribe" element={<Unsubscribe />} />

      {/* ES */}
          <Route path="/es" element={<Home />} />
          <Route path="/es/start-here" element={<StartHere />} />
          <Route path="/es/top-reads" element={<TopReads />} />
          <Route path="/es/destinations" element={<Destinations />} />
          <Route path="/es/by/:handle" element={<AuthorProfile />} />
          <Route path="/es/stories" element={<Archive />} />
          <Route path="/es/category/:slug" element={<Category />} />
          <Route path="/es/post/:slug" element={<Post />} />
          <Route path="/es/about" element={<About />} />
          <Route path="/es/signin" element={<SignIn />} />
          <Route path="/es/privacy" element={<PrivacyPolicy />} />
          <Route path="/es/terms" element={<Terms />} />
          <Route path="/es/cookie-policy" element={<CookiePolicy />} />
          <Route path="/es/unsubscribe" element={<Unsubscribe />} />

      {/* PT-BR (/br) */}
          <Route path="/br" element={<Home />} />
          <Route path="/br/start-here" element={<StartHere />} />
          <Route path="/br/top-reads" element={<TopReads />} />
          <Route path="/br/destinations" element={<Destinations />} />
          <Route path="/br/by/:handle" element={<AuthorProfile />} />
          <Route path="/br/stories" element={<Archive />} />
          <Route path="/br/category/:slug" element={<Category />} />
          <Route path="/br/post/:slug" element={<Post />} />
          <Route path="/br/about" element={<About />} />
          <Route path="/br/signin" element={<SignIn />} />
          <Route path="/br/privacy" element={<PrivacyPolicy />} />
          <Route path="/br/terms" element={<Terms />} />
          <Route path="/br/cookie-policy" element={<CookiePolicy />} />
          <Route path="/br/unsubscribe" element={<Unsubscribe />} />

      {/* ZH-CN (/cn) */}
          <Route path="/cn" element={<Home />} />
          <Route path="/cn/start-here" element={<StartHere />} />
          <Route path="/cn/top-reads" element={<TopReads />} />
          <Route path="/cn/destinations" element={<Destinations />} />
          <Route path="/cn/by/:handle" element={<AuthorProfile />} />
          <Route path="/cn/stories" element={<Archive />} />
          <Route path="/cn/category/:slug" element={<Category />} />
          <Route path="/cn/post/:slug" element={<Post />} />
          <Route path="/cn/about" element={<About />} />
          <Route path="/cn/signin" element={<SignIn />} />
          <Route path="/cn/privacy" element={<PrivacyPolicy />} />
          <Route path="/cn/terms" element={<Terms />} />
          <Route path="/cn/cookie-policy" element={<CookiePolicy />} />
          <Route path="/cn/unsubscribe" element={<Unsubscribe />} />

      {/* KO (/kr) */}
          <Route path="/kr" element={<Home />} />
          <Route path="/kr/start-here" element={<StartHere />} />
          <Route path="/kr/top-reads" element={<TopReads />} />
          <Route path="/kr/destinations" element={<Destinations />} />
          <Route path="/kr/by/:handle" element={<AuthorProfile />} />
          <Route path="/kr/stories" element={<Archive />} />
          <Route path="/kr/category/:slug" element={<Category />} />
          <Route path="/kr/post/:slug" element={<Post />} />
          <Route path="/kr/about" element={<About />} />
          <Route path="/kr/signin" element={<SignIn />} />
          <Route path="/kr/privacy" element={<PrivacyPolicy />} />
          <Route path="/kr/terms" element={<Terms />} />
          <Route path="/kr/cookie-policy" element={<CookiePolicy />} />
          <Route path="/kr/unsubscribe" element={<Unsubscribe />} />

      {/* FR */}
          <Route path="/fr" element={<Home />} />
          <Route path="/fr/start-here" element={<StartHere />} />
          <Route path="/fr/top-reads" element={<TopReads />} />
          <Route path="/fr/destinations" element={<Destinations />} />
          <Route path="/fr/by/:handle" element={<AuthorProfile />} />
          <Route path="/fr/stories" element={<Archive />} />
          <Route path="/fr/category/:slug" element={<Category />} />
          <Route path="/fr/post/:slug" element={<Post />} />
          <Route path="/fr/about" element={<About />} />
          <Route path="/fr/signin" element={<SignIn />} />
          <Route path="/fr/privacy" element={<PrivacyPolicy />} />
          <Route path="/fr/terms" element={<Terms />} />
          <Route path="/fr/cookie-policy" element={<CookiePolicy />} />
          <Route path="/fr/unsubscribe" element={<Unsubscribe />} />

      {/* IT */}
          <Route path="/it" element={<Home />} />
          <Route path="/it/start-here" element={<StartHere />} />
          <Route path="/it/top-reads" element={<TopReads />} />
          <Route path="/it/destinations" element={<Destinations />} />
          <Route path="/it/by/:handle" element={<AuthorProfile />} />
          <Route path="/it/stories" element={<Archive />} />
          <Route path="/it/category/:slug" element={<Category />} />
          <Route path="/it/post/:slug" element={<Post />} />
          <Route path="/it/about" element={<About />} />
          <Route path="/it/signin" element={<SignIn />} />
          <Route path="/it/privacy" element={<PrivacyPolicy />} />
          <Route path="/it/terms" element={<Terms />} />
          <Route path="/it/cookie-policy" element={<CookiePolicy />} />
          <Route path="/it/unsubscribe" element={<Unsubscribe />} />

      {/* NL */}
          <Route path="/nl" element={<Home />} />
          <Route path="/nl/start-here" element={<StartHere />} />
          <Route path="/nl/top-reads" element={<TopReads />} />
          <Route path="/nl/destinations" element={<Destinations />} />
          <Route path="/nl/by/:handle" element={<AuthorProfile />} />
          <Route path="/nl/stories" element={<Archive />} />
          <Route path="/nl/category/:slug" element={<Category />} />
          <Route path="/nl/post/:slug" element={<Post />} />
          <Route path="/nl/about" element={<About />} />
          <Route path="/nl/signin" element={<SignIn />} />
          <Route path="/nl/privacy" element={<PrivacyPolicy />} />
          <Route path="/nl/terms" element={<Terms />} />
          <Route path="/nl/cookie-policy" element={<CookiePolicy />} />
          <Route path="/nl/unsubscribe" element={<Unsubscribe />} />

          {/* ─── User's own trip blog ──────────────────────────────────
              The /me/* dashboard area is auth-gated and conceptually
              locale-agnostic. But a signed-in visitor can arrive carrying a
              locale prefix — e.g. the post-login redirect, a restored session
              landing on /fi, or a shared /de/me link. Without locale-prefixed
              variants those all fell through to the 404 page ("/fi/me#").
              We register the same four routes under "" + every locale prefix
              so /me, /fi/me, /de/me, … (and /me/new, /me/settings, /me/:id)
              every one resolves to the dashboard. The trailing "#" from the
              Supabase token callback is a hash fragment the router ignores. */}
          {ME_ROUTE_PREFIXES.map((prefix) => (
            <Route key={prefix || 'root'} path={`${prefix}/me`}>
              <Route
                index
                element={
                  <AuthGuard>
                    <MyDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path="new"
                element={
                  <AuthGuard>
                    <MyEditor />
                  </AuthGuard>
                }
              />
              <Route
                path="settings"
                element={
                  <AuthGuard>
                    <MySettings />
                  </AuthGuard>
                }
              />
              <Route
                path=":id"
                element={
                  <AuthGuard>
                    <MyEditor />
                  </AuthGuard>
                }
              />
            </Route>
          ))}

          {/* ─── Admin ───────────────────────────────────────────────── */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <Dashboard />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/posts/new"
            element={
              <AdminGuard>
                <Editor />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/posts/:id"
            element={
              <AdminGuard>
                <Editor />
              </AdminGuard>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </CopyGate>
      <LocalisedCookieBanner />
      <NewsletterPopup />
    </BrowserRouter>
  );
}
