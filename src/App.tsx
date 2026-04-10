import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';

// Lazy-load every non-landing route. Home stays in the main bundle so first
// paint on the most-visited URL is instant. Everything else is code-split.
const Post = lazy(() => import('./pages/Post'));
const Archive = lazy(() => import('./pages/Archive'));
const Category = lazy(() => import('./pages/Category'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
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

// Lightweight skeleton shown while a chunk is in-flight. Same dark palette as
// the rest of the app so there's no visual flash.
function RouteFallback() {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-pink border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Archive />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />

          {/* ─── User's own trip blog ──────────────────────────────── */}
          <Route
            path="/me"
            element={
              <AuthGuard>
                <MyDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/me/new"
            element={
              <AuthGuard>
                <MyEditor />
              </AuthGuard>
            }
          />
          <Route
            path="/me/:id"
            element={
              <AuthGuard>
                <MyEditor />
              </AuthGuard>
            }
          />

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
      <CookieBanner />
    </BrowserRouter>
  );
}
