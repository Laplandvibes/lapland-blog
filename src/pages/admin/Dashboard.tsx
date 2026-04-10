// Admin dashboard: lists every post in the table (drafts + published),
// newest edit first, with edit and delete actions. A "New post" CTA lives
// in both the top nav and the hero.

import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  AlertTriangle,
} from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import {
  useAdminPosts,
  deletePost,
  type AdminPostListItem,
} from '../../hooks/useAdminPosts';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Dashboard() {
  const { posts, loading, error, refresh } = useAdminPosts();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-night text-snow">
      <AdminNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
              Dashboard
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-3">
              Your stories
            </h1>
            <p className="text-slate-400 text-sm">
              {published} published · {drafts} draft{drafts === 1 ? '' : 's'}
            </p>
          </div>

          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark transition-colors"
          >
            <Plus size={16} />
            New post
          </Link>
        </header>

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

        {loading ? (
          <div className="text-center py-20 text-slate-400">
            <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading posts…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-purple/30 bg-night-light/30">
            <p className="text-slate-300 text-lg mb-2">No posts yet.</p>
            <p className="text-slate-500 text-sm mb-6">Write the first one.</p>
            <Link
              to="/admin/posts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink text-white font-semibold rounded-full text-sm hover:bg-pink-dark transition-colors"
            >
              <Plus size={14} /> New post
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-purple/25 bg-night-light/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-night-light/60 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Title</th>
                  <th className="text-left font-semibold px-5 py-3 hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left font-semibold px-5 py-3 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left font-semibold px-5 py-3 hidden lg:table-cell">
                    Published
                  </th>
                  <th className="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple/15">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-night-light/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        {p.featured && (
                          <Star
                            size={14}
                            className="text-pink mt-1 flex-shrink-0 fill-pink"
                            aria-label="Featured"
                          />
                        )}
                        <div>
                          <Link
                            to={`/admin/posts/${p.id}`}
                            className="text-snow hover:text-pink font-semibold"
                          >
                            {p.title}
                          </Link>
                          <p className="text-slate-500 text-xs mt-1 truncate max-w-[320px]">
                            /{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-slate-300 text-xs capitalize">
                      {p.category_slug}
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
                      {formatDate(p.published_at)}
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
                          to={`/admin/posts/${p.id}`}
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
      </main>
    </div>
  );
}
