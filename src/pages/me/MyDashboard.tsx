// /me — the author's own command centre. Lists drafts + published entries
// scoped to the signed-in user, shows a friendly empty state for new signups,
// and links to the editor. Unlike the admin Dashboard this reuses the public
// Nav so it feels like part of the reader's site (because it is).

import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  Compass,
  ExternalLink,
  Check,
  X,
} from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import { useAuth } from '../../hooks/useAuth';
import { useMyPosts } from '../../hooks/useMyPosts';
import { deletePost, type AdminPostListItem } from '../../hooks/useAdminPosts';
import { supabase } from '../../lib/supabase';
import { useSeo, canonicalUrl } from '../../lib/seo';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface ProfileSummary {
  handle: string;
  display_name: string;
  avatar_url: string | null;
}

export default function MyDashboard() {
  const { user } = useAuth();
  const { posts, loading, error, refresh } = useMyPosts(user?.id);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileSummary | null>(null);

  // Handle editing
  const [editingHandle, setEditingHandle] = useState(false);
  const [handleDraft, setHandleDraft] = useState('');
  const [handleSaving, setHandleSaving] = useState(false);
  const [handleError, setHandleError] = useState<string | null>(null);
  const handleInputRef = useRef<HTMLInputElement>(null);

  useSeo({
    title: 'Your trip blog · Lapland.blog',
    description: 'Your drafts, published stories and entries at a glance.',
    canonical: canonicalUrl('/me'),
  });

  // Pull the public profile so we can show the /yourname link.
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    void supabase
      .from('blog_profiles')
      .select('handle, display_name, avatar_url')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setProfile((data as ProfileSummary | null) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const published = posts.filter((p) => p.status === 'published').length;
  const drafts = posts.filter((p) => p.status === 'draft').length;

  async function handleDelete(post: AdminPostListItem) {
    const ok = window.confirm(
      `Delete "${post.title}"? This cannot be undone.`
    );
    if (!ok) return;
    setDeletingId(post.id);
    setDeleteError(null);
    const { error: err } = await deletePost(post.id);
    setDeletingId(null);
    if (err) {
      setDeleteError(err);
    } else {
      void refresh();
    }
  }

  function startEditingHandle() {
    setHandleDraft(profile?.handle ?? '');
    setHandleError(null);
    setEditingHandle(true);
    setTimeout(() => handleInputRef.current?.focus(), 50);
  }

  async function saveHandle() {
    if (!user) return;
    const clean = handleDraft
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '')
      .slice(0, 30);
    if (!clean || clean.length < 2) {
      setHandleError('At least 2 characters (a–z, 0–9, - or _).');
      return;
    }
    if (clean === profile?.handle) {
      setEditingHandle(false);
      return;
    }
    setHandleSaving(true);
    setHandleError(null);

    // Check uniqueness first
    const { data: existing } = await supabase
      .from('blog_profiles')
      .select('id')
      .eq('handle', clean)
      .neq('id', user.id)
      .maybeSingle();
    if (existing) {
      setHandleSaving(false);
      setHandleError(`"${clean}" is already taken. Try another.`);
      return;
    }

    const { error: err } = await supabase
      .from('blog_profiles')
      .update({ handle: clean })
      .eq('id', user.id);

    setHandleSaving(false);
    if (err) {
      setHandleError(err.message);
    } else {
      setProfile((prev) => (prev ? { ...prev, handle: clean } : prev));
      setEditingHandle(false);
    }
  }

  const firstName =
    (profile?.display_name ?? user?.email ?? 'traveller').split(/[\s@]/)[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-night-light/50 via-night to-night text-snow flex flex-col">
      <Nav />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* ─── Hero ─────────────────────────────────────────────────── */}
        <Reveal as="header" className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-pink tracking-[0.35em] text-[11px] font-bold uppercase mb-3">
              Your trip blog
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-snow font-light tracking-tight mb-4">
              Hei, <span className="italic text-pink">{firstName}</span>.
            </h1>
            <p className="text-slate-200 text-base md:text-lg">
              {published} published · {drafts} draft
              {drafts === 1 ? '' : 's'}
            </p>

            {/* Editable handle / blog URL */}
            {profile?.handle && !editingHandle && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`/${profile.handle}`}
                    className="inline-flex items-center gap-1 text-aurora-blue hover:text-pink text-sm transition-colors"
                  >
                    lapland.blog/{profile.handle}
                    <ExternalLink size={11} />
                  </a>
                  <button
                    type="button"
                    onClick={startEditingHandle}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] text-slate-400 hover:text-pink border border-purple/25 hover:border-pink/40 transition-colors"
                    aria-label="Change your blog URL"
                  >
                    <Pencil size={10} />
                    Change
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  This is your public blog address. Share it with friends.
                </p>
              </div>
            )}
            {editingHandle && (
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">lapland.blog/</span>
                  <input
                    ref={handleInputRef}
                    type="text"
                    value={handleDraft}
                    onChange={(e) =>
                      setHandleDraft(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9_-]/g, '')
                          .slice(0, 30)
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') void saveHandle();
                      if (e.key === 'Escape') setEditingHandle(false);
                    }}
                    className="px-2 py-1 bg-night/60 border border-purple/30 rounded-lg text-snow font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink/40 w-40"
                  />
                  <button
                    type="button"
                    onClick={() => void saveHandle()}
                    disabled={handleSaving}
                    className="p-1.5 rounded-lg bg-aurora-green/15 text-aurora-green hover:bg-aurora-green/25 transition-colors disabled:opacity-50"
                    aria-label="Save handle"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingHandle(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Cancel"
                  >
                    <X size={14} />
                  </button>
                </div>
                {handleError && (
                  <p className="text-[11px] text-red-400">{handleError}</p>
                )}
                <p className="text-[11px] text-slate-300">
                  Lowercase letters, numbers, dash or underscore. 2–30 characters.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Hide the top create button while the empty-state card is showing
                (0 posts) so the "Write your first post" CTA is the single,
                unambiguous call to action. Once the author has at least one
                post — or while we're still loading — keep it as the create
                action. */}
            {(loading || posts.length > 0) && (
              <Link
                to="/me/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all"
              >
                <Plus size={16} />
                Write new post
              </Link>
            )}
            <Link
              to="/me/settings"
              className="inline-flex items-center gap-2 px-5 py-3 bg-night-light/40 border border-purple/30 text-slate-200 hover:text-pink hover:border-pink/55 text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-colors"
            >
              Account &amp; settings
            </Link>
          </div>
        </Reveal>

        {/* ─── Status banners ───────────────────────────────────────── */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <span>Could not load posts: {error}</span>
          </div>
        )}
        {deleteError && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <span>Could not delete: {deleteError}</span>
          </div>
        )}

        {/* ─── List ─────────────────────────────────────────────────── */}
        <Reveal delay={1}>
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading your entries…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="relative text-center py-20 px-6 rounded-3xl border border-pink/30 bg-gradient-to-b from-pink/15 via-night-light/60 to-night-light/40 shadow-[0_30px_90px_-50px_rgba(236,72,153,0.7)] overflow-hidden">
            {/* Soft pink glow blooming from the top so the card feels warm,
                not like an empty void. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-pink/25 blur-3xl"
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink/20 border border-pink/40 mb-7 shadow-[0_0_40px_-6px_rgba(236,72,153,0.8)]">
                <Compass size={34} className="text-pink" />
              </div>
              <h2 className="text-snow text-3xl md:text-4xl font-display font-light tracking-tight mb-4">
                Your blog is a <span className="italic text-pink">blank map</span>.
              </h2>
              <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                Let&apos;s put the first pin on it. Write about a place you&apos;ve
                been, a plan for the trip, or the colour of the sky on the drive
                north. Whatever you want to remember.
              </p>
              <Link
                to="/me/new"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-pink text-white font-semibold rounded-full text-base hover:bg-pink-dark hover:-translate-y-0.5 transition-all shadow-[0_12px_36px_-8px_rgba(236,72,153,0.65)]"
              >
                <Plus size={18} /> Write your first post
              </Link>
              <p className="text-slate-400 text-xs mt-5">
                Takes a few minutes. You can save it as a draft and finish later.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-purple/25 bg-night-light/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-night-light/60 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Post</th>
                  <th className="text-left font-semibold px-5 py-3 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left font-semibold px-5 py-3 hidden lg:table-cell">
                    Updated
                  </th>
                  <th className="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple/15">
                {posts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-night-light/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <Link
                        to={`/me/${p.id}`}
                        className="text-snow hover:text-pink font-semibold"
                      >
                        {p.title || <em className="text-slate-500">Untitled</em>}
                      </Link>
                      <p className="text-slate-400 text-xs mt-1 truncate max-w-[320px]">
                        /{p.slug}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {p.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider bg-aurora-green/15 text-aurora-green border border-aurora-green/30">
                          <Eye size={11} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider bg-slate-500/15 text-slate-300 border border-slate-500/30">
                          <EyeOff size={11} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-slate-400 text-xs">
                      {formatDate(p.updated_at)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {p.status === 'published' && (
                          <Link
                            to={`/post/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-400 hover:text-aurora-blue hover:bg-night/50 transition-colors"
                            aria-label="View live"
                          >
                            <Eye size={14} />
                          </Link>
                        )}
                        <Link
                          to={`/me/${p.id}`}
                          className="p-2 rounded-lg text-slate-400 hover:text-pink hover:bg-night/50 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            void handleDelete(p);
                          }}
                          disabled={deletingId === p.id}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
