// Admin editor for writing/updating a post. Loads by id when editing, or
// starts blank when the route is /admin/posts/new. Body is markdown — the
// Post renderer already understands a single `{type:'markdown', text}` block
// and pipes it through react-markdown + remark-gfm.

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Star,
  Globe,
  FileText,
  AlertTriangle,
  Check,
} from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import { categories } from '../../data/categories';
import {
  createPost,
  updatePost,
  useAdminPost,
  type PostInput,
} from '../../hooks/useAdminPosts';
import { useAuth } from '../../hooks/useAuth';
import type { PostBlock } from '../../data/posts';

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function estimateReadTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Convert a stored `content` JSONB value (PostBlock[]) into a single markdown
// string for editing. For blocks we created in the editor it's a single
// markdown block — but we also handle the legacy mixed-block shape so Vesa
// can edit the seeded posts without losing anything.
function contentToMarkdown(raw: unknown): string {
  if (!Array.isArray(raw)) return '';
  const parts: string[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const b = item as Record<string, unknown>;
    const type = b.type;
    if (type === 'markdown' && typeof b.text === 'string') {
      parts.push(b.text);
    } else if (type === 'paragraph' && typeof b.text === 'string') {
      parts.push(b.text);
    } else if (type === 'heading' && typeof b.text === 'string') {
      const level = b.level === 3 ? '###' : '##';
      parts.push(`${level} ${b.text}`);
    } else if (type === 'pullquote' && typeof b.text === 'string') {
      parts.push(`> ${b.text}`);
    } else if (type === 'divider') {
      parts.push('---');
    } else if (type === 'list' && Array.isArray(b.items)) {
      const prefix = b.ordered ? (i: number) => `${i + 1}. ` : () => '- ';
      parts.push(
        b.items
          .filter((x): x is string => typeof x === 'string')
          .map((x, i) => `${prefix(i)}${x}`)
          .join('\n')
      );
    }
  }
  return parts.join('\n\n');
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const { row, loading: rowLoading, error: loadError } = useAdminPost(
    isNew ? undefined : id
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [kicker, setKicker] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categorySlug, setCategorySlug] = useState<string>('stories');
  const [tagsText, setTagsText] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroAlt, setHeroAlt] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [publishedAt, setPublishedAt] = useState<string>('');

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Hydrate form from loaded row.
  useEffect(() => {
    if (!row) return;
    setTitle(row.title ?? '');
    setSlug(row.slug ?? '');
    setSlugEdited(true);
    setKicker(row.kicker ?? '');
    setExcerpt(row.excerpt ?? '');
    setCategorySlug(row.category_slug ?? 'stories');
    setTagsText((row.tags ?? []).join(', '));
    setHeroImage(row.hero_image ?? '');
    setHeroAlt(row.hero_alt ?? '');
    setMarkdown(contentToMarkdown(row.content));
    setFeatured(row.featured ?? false);
    setStatus(row.status ?? 'draft');
    setPublishedAt(row.published_at ? row.published_at.slice(0, 10) : '');
  }, [row]);

  // Auto-slug from title as long as the user hasn't customised it.
  useEffect(() => {
    if (isNew && !slugEdited) {
      setSlug(slugify(title));
    }
  }, [title, isNew, slugEdited]);

  const readTime = useMemo(() => estimateReadTime(markdown), [markdown]);

  async function handleSave(targetStatus: 'draft' | 'published') {
    setSaving(true);
    setSaveError(null);

    const content: PostBlock[] = markdown.trim()
      ? [{ type: 'markdown', text: markdown }]
      : [];

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const input: PostInput = {
      slug: slug || slugify(title),
      title: title.trim(),
      kicker: kicker.trim(),
      excerpt: excerpt.trim(),
      category_slug: categorySlug,
      tags,
      hero_image: heroImage.trim(),
      hero_alt: heroAlt.trim(),
      content,
      status: targetStatus,
      featured,
      read_time_minutes: readTime,
      published_at: publishedAt
        ? new Date(publishedAt + 'T12:00:00Z').toISOString()
        : null,
      visit_date: null,
      location: null,
      weather_note: null,
      stay_type: null,
    };

    if (!input.title) {
      setSaving(false);
      setSaveError('Title is required.');
      return;
    }
    if (!input.slug) {
      setSaving(false);
      setSaveError('Slug is required.');
      return;
    }

    if (isNew) {
      if (!user) {
        setSaving(false);
        setSaveError('Not signed in.');
        return;
      }
      const { id: newId, error } = await createPost(
        input,
        user.id,
        user.email ?? ''
      );
      setSaving(false);
      if (error) {
        setSaveError(error);
      } else if (newId) {
        setStatus(targetStatus);
        setSavedAt(new Date());
        navigate(`/admin/posts/${newId}`, { replace: true });
      }
    } else {
      const { error } = await updatePost(id as string, input);
      setSaving(false);
      if (error) {
        setSaveError(error);
      } else {
        setStatus(targetStatus);
        setSavedAt(new Date());
      }
    }
  }

  if (!isNew && rowLoading) {
    return (
      <div className="min-h-screen bg-night text-snow">
        <AdminNav />
        <div className="py-20 text-center text-slate-400">
          <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm">Loading post…</p>
        </div>
      </div>
    );
  }

  if (!isNew && loadError) {
    return (
      <div className="min-h-screen bg-night text-snow">
        <AdminNav />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <AlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
          <p className="text-slate-300 mb-2">Could not load that post.</p>
          <p className="text-slate-500 text-sm mb-6">{loadError}</p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-sm font-semibold"
          >
            <ArrowLeft size={14} /> Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night text-snow">
      <AdminNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-purple/30 text-slate-300 hover:text-snow hover:border-pink/60 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              {previewOpen ? <EyeOff size={14} /> : <Eye size={14} />}
              {previewOpen ? 'Hide preview' : 'Preview'}
            </button>
            <button
              type="button"
              onClick={() => {
                void handleSave('draft');
              }}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-slate-500/40 text-slate-200 hover:text-snow hover:border-snow/60 text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50"
            >
              <FileText size={14} />
              Save draft
            </button>
            <button
              type="button"
              onClick={() => {
                void handleSave('published');
              }}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-pink text-white hover:bg-pink-dark text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50"
            >
              <Globe size={14} />
              {status === 'published' ? 'Update live' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Status banners */}
        {saveError && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}
        {savedAt && !saveError && (
          <div className="mb-6 rounded-xl border border-aurora-green/40 bg-aurora-green/10 px-4 py-3 text-sm text-aurora-green flex items-center gap-2">
            <Check size={16} />
            Saved at {savedAt.toLocaleTimeString('en-GB')}
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* ── Left: body editor ─────────────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The night the sky broke open…"
                className="w-full px-4 py-3 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 font-display text-2xl"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(slugify(e.target.value));
                    setSlugEdited(true);
                  }}
                  placeholder="the-night-the-sky-broke-open"
                  className="w-full px-4 py-3 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Kicker
                </label>
                <input
                  type="text"
                  value={kicker}
                  onChange={(e) => setKicker(e.target.value)}
                  placeholder="Rovaniemi · January · Aurora"
                  className="w-full px-4 py-3 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="The one-paragraph summary that appears on cards and meta tags."
                rows={3}
                className="w-full px-4 py-3 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 text-sm resize-y"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                Body (markdown)
              </label>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder={`## The first hour\n\nIt was minus twenty-three and the sky was still a dull smear…\n\n> A pull quote goes here.\n\n- Bullet one\n- Bullet two`}
                rows={previewOpen ? 12 : 24}
                className="w-full px-4 py-4 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 text-sm font-mono leading-relaxed resize-y"
              />
              <p className="mt-2 text-[11px] text-slate-500">
                Supports headings, lists, bold, italic, links and blockquotes (pull quotes).
                About {readTime} min read.
              </p>
            </div>

            {previewOpen && (
              <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-aurora-blue font-semibold mb-4">
                  Preview
                </p>
                <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-light prose-a:text-pink">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown || '_Nothing to preview yet._'}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: meta sidebar ───────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-5 space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  {status === 'published' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-aurora-green/15 text-aurora-green border border-aurora-green/30">
                      <Eye size={11} /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-slate-500/15 text-slate-300 border border-slate-500/30">
                      <EyeOff size={11} /> Draft
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Category
                </label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow focus:outline-none focus:ring-2 focus:ring-pink/40 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Publish date
                </label>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow focus:outline-none focus:ring-2 focus:ring-pink/40 text-sm"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Leave empty to use publish-now timestamp.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-pink"
                />
                <span className="inline-flex items-center gap-1 text-sm text-slate-200">
                  <Star size={13} className="text-pink" /> Featured on home
                </span>
              </label>
            </div>

            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-5 space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Hero image URL
                </label>
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://images.unsplash.com/…"
                  className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                  Hero alt text
                </label>
                <input
                  type="text"
                  value={heroAlt}
                  onChange={(e) => setHeroAlt(e.target.value)}
                  placeholder="Short description for accessibility"
                  className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 text-sm"
                />
              </div>
              {heroImage && (
                <div className="rounded-lg overflow-hidden border border-purple/20">
                  <img
                    src={heroImage}
                    alt={heroAlt || 'Hero preview'}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-5">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="aurora, kemi, photography"
                className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink/40 text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                void handleSave(status);
              }}
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark disabled:opacity-60 transition-colors"
            >
              <Save size={16} />
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
