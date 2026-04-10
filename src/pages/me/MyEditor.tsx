// /me/new + /me/:id — author-facing entry editor. Trimmed down from the
// admin Editor: no "featured on home" toggle, no tag picker, no publish date
// override. A reader writing their own trip blog just needs title, hero,
// category, excerpt and a markdown body. Everything else is derived.
//
// Reuses createPost/updatePost/useAdminPost from useAdminPosts — those helpers
// already pull author_snapshot from blog_profiles and RLS enforces that the
// signed-in user can only touch their own rows. The name "admin" is an
// accident of history; the functions are per-user safe.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent as ReactClipboardEvent,
} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Globe,
  FileText,
  AlertTriangle,
  Check,
  Link2,
  ImagePlus,
} from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import ImageUpload from '../../components/me/ImageUpload';
import { categories } from '../../data/categories';
import {
  createPost,
  updatePost,
  useAdminPost,
  type PostInput,
} from '../../hooks/useAdminPosts';
import { useAuth } from '../../hooks/useAuth';
import { useSeo, canonicalUrl } from '../../lib/seo';
import { uploadTripImage } from '../../lib/uploadImage';
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

export default function MyEditor() {
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
  const [excerpt, setExcerpt] = useState('');
  const [categorySlug, setCategorySlug] = useState<string>('stories');
  const [heroImage, setHeroImage] = useState('');
  const [heroAlt, setHeroAlt] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [ownershipOk, setOwnershipOk] = useState(true);

  // Show the "paste a URL instead" field on demand only — the default is
  // upload-from-device so the editor feels closer to Medium/Substack.
  const [heroUrlMode, setHeroUrlMode] = useState(false);

  // Inline paste-to-upload state for the markdown body. While an upload is
  // running we leave a placeholder `![Uploading…](…)` at the caret so the
  // author can keep typing; once finished we swap it for the real URL.
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bodyImageRef = useRef<HTMLInputElement>(null);
  const [bodyUploading, setBodyUploading] = useState(false);
  const [bodyUploadError, setBodyUploadError] = useState<string | null>(null);

  useSeo({
    title: isNew
      ? 'Write a new post — Lapland.blog'
      : 'Edit post — Lapland.blog',
    description: 'Write your Lapland trip story.',
    canonical: canonicalUrl(isNew ? '/me/new' : `/me/${id ?? ''}`),
  });

  // Hydrate form from the loaded row, and verify the signed-in user actually
  // owns it. RLS blocks writes to other rows, but a draft by another author
  // might briefly be visible before the update fails — this check is belt +
  // braces UX so we never put someone in a "looks editable, save fails" loop.
  useEffect(() => {
    if (!row) return;
    if (user && row.author_id && row.author_id !== user.id) {
      setOwnershipOk(false);
      return;
    }
    setOwnershipOk(true);
    setTitle(row.title ?? '');
    setSlug(row.slug ?? '');
    setSlugEdited(true);
    setExcerpt(row.excerpt ?? '');
    setCategorySlug(row.category_slug ?? 'stories');
    setHeroImage(row.hero_image ?? '');
    setHeroAlt(row.hero_alt ?? '');
    setMarkdown(contentToMarkdown(row.content));
    setStatus(row.status ?? 'draft');
  }, [row, user]);

  // Auto-slug from title as long as the user hasn't customised it.
  useEffect(() => {
    if (isNew && !slugEdited) {
      setSlug(slugify(title));
    }
  }, [title, isNew, slugEdited]);

  const readTime = useMemo(() => estimateReadTime(markdown), [markdown]);

  // ── Auto-save (3 s debounce) — only for existing posts, only drafts ────
  // New posts must be saved manually first (to generate the id/slug).
  // Published posts are not auto-saved (to avoid accidental publishes).
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoSaved, setAutoSaved] = useState(false);
  const hydratedRef = useRef(false);

  // Mark as hydrated once the row data is loaded — prevents auto-save from
  // triggering on the initial hydration pass.
  useEffect(() => {
    if (row) {
      setTimeout(() => { hydratedRef.current = true; }, 500);
    }
  }, [row]);

  const triggerAutoSave = useCallback(() => {
    if (isNew || !id || !hydratedRef.current) return;
    if (saving) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      // Only auto-save drafts — don't auto-publish
      const content: PostBlock[] = markdown.trim()
        ? [{ type: 'markdown', text: markdown }]
        : [];
      const input: PostInput = {
        slug: slug || slugify(title),
        title: title.trim(),
        kicker: '',
        excerpt: excerpt.trim(),
        category_slug: categorySlug,
        tags: [],
        hero_image: heroImage.trim(),
        hero_alt: heroAlt.trim(),
        content,
        status,
        featured: false,
        read_time_minutes: readTime,
        published_at: null,
      };
      if (!input.title) return; // don't save empty posts
      const { error } = await updatePost(id, input);
      if (!error) {
        setAutoSaved(true);
        setSavedAt(new Date());
        setTimeout(() => setAutoSaved(false), 2000);
      }
    }, 3000);
  }, [isNew, id, saving, markdown, title, excerpt, categorySlug, heroImage, heroAlt, slug, status, readTime]);

  // Trigger auto-save on any content change
  useEffect(() => {
    triggerAutoSave();
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [title, excerpt, markdown, categorySlug, heroImage, heroAlt, triggerAutoSave]);

  // Insert a markdown snippet at the caret (or replace a range) and restore
  // focus so the author keeps typing right where they were.
  function spliceIntoBody(
    replaceFrom: number,
    replaceTo: number,
    insert: string
  ) {
    setMarkdown((prev) => prev.slice(0, replaceFrom) + insert + prev.slice(replaceTo));
    // Wait a tick so React has applied the new value before we move the caret.
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      const nextPos = replaceFrom + insert.length;
      el.focus();
      el.setSelectionRange(nextPos, nextPos);
    });
  }

  async function handleBodyImagePick(file: File) {
    if (!user) {
      setBodyUploadError('Sign in first so we know whose folder to save to.');
      return;
    }
    const el = textareaRef.current;
    const start = el?.selectionStart ?? markdown.length;
    const end = el?.selectionEnd ?? start;
    const placeholder = '![Uploading…]()';
    spliceIntoBody(start, end, placeholder);
    setBodyUploading(true);
    setBodyUploadError(null);

    const result = await uploadTripImage(file, user.id);
    setBodyUploading(false);

    setMarkdown((prev) => {
      const idx = prev.indexOf(placeholder);
      if (idx === -1) return prev;
      if (result.error !== null) {
        return prev.slice(0, idx) + prev.slice(idx + placeholder.length);
      }
      const replacement = `\n\n![](${result.url})\n\n`;
      return prev.slice(0, idx) + replacement + prev.slice(idx + placeholder.length);
    });

    if (result.error !== null) {
      setBodyUploadError(result.error);
    }
  }

  async function handleBodyPaste(e: ReactClipboardEvent<HTMLTextAreaElement>) {
    const items = e.clipboardData?.items;
    if (!items) return;
    let imageFile: File | null = null;
    for (const item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        imageFile = item.getAsFile();
        if (imageFile) break;
      }
    }
    if (!imageFile) return; // let the browser handle normal text paste

    e.preventDefault();
    if (!user) {
      setBodyUploadError('Sign in first so we know whose folder to save to.');
      return;
    }

    const el = e.currentTarget;
    const start = el.selectionStart ?? markdown.length;
    const end = el.selectionEnd ?? start;
    const placeholder = '![Uploading…]()';

    // Drop the placeholder in immediately so the author sees something.
    spliceIntoBody(start, end, placeholder);
    setBodyUploading(true);
    setBodyUploadError(null);

    const result = await uploadTripImage(imageFile, user.id);
    setBodyUploading(false);

    // Replace the first placeholder we find — the author may have kept typing
    // so we look it up in the live value via the ref rather than in `markdown`.
    setMarkdown((prev) => {
      const idx = prev.indexOf(placeholder);
      if (idx === -1) return prev;
      if (result.error) {
        return prev.slice(0, idx) + prev.slice(idx + placeholder.length);
      }
      const replacement = `![](${result.url})`;
      return prev.slice(0, idx) + replacement + prev.slice(idx + placeholder.length);
    });

    if (result.error) {
      setBodyUploadError(result.error);
    }
  }

  async function handleSave(targetStatus: 'draft' | 'published') {
    setSaving(true);
    setSaveError(null);

    const content: PostBlock[] = markdown.trim()
      ? [{ type: 'markdown', text: markdown }]
      : [];

    const input: PostInput = {
      slug: slug || slugify(title),
      title: title.trim(),
      kicker: '',
      excerpt: excerpt.trim(),
      category_slug: categorySlug,
      tags: [],
      hero_image: heroImage.trim(),
      hero_alt: heroAlt.trim(),
      content,
      status: targetStatus,
      featured: false,
      read_time_minutes: readTime,
      published_at: null,
    };

    if (!input.title) {
      setSaving(false);
      setSaveError('Give your post a title first.');
      return;
    }
    if (!input.slug) {
      setSaving(false);
      setSaveError('Slug is required — try adding a few more letters to the title.');
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
        navigate(`/me/${newId}`, { replace: true });
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

  // ── Loading / error / ownership gates ─────────────────────────────────────

  if (!isNew && rowLoading) {
    return (
      <div className="min-h-screen bg-night text-snow">
        <Nav minimal />
        <div className="pt-32 text-center text-slate-400">
          <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm">Loading your post…</p>
        </div>
      </div>
    );
  }

  if (!isNew && loadError) {
    return (
      <div className="min-h-screen bg-night text-snow flex flex-col">
        <Nav minimal />
        <main className="flex-1 max-w-2xl mx-auto px-4 pt-32 pb-20 text-center">
          <AlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
          <p className="text-slate-300 mb-2">Could not load that post.</p>
          <p className="text-slate-500 text-sm mb-6">{loadError}</p>
          <Link
            to="/me"
            className="inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-sm font-semibold"
          >
            <ArrowLeft size={14} /> Back to your blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!ownershipOk) {
    return (
      <div className="min-h-screen bg-night text-snow flex flex-col">
        <Nav minimal />
        <main className="flex-1 max-w-2xl mx-auto px-4 pt-32 pb-20 text-center">
          <AlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
          <p className="text-slate-300 mb-2">
            This post belongs to another writer.
          </p>
          <p className="text-slate-300 text-sm mb-6">
            You can only edit your own posts.
          </p>
          <Link
            to="/me"
            className="inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-sm font-semibold"
          >
            <ArrowLeft size={14} /> Back to your blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-night-light/50 via-night to-night text-snow flex flex-col">
      <Nav minimal />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Toolbar */}
        <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/me"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
          >
            <ArrowLeft size={14} /> Your blog
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
        </Reveal>

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
            {autoSaved ? 'Auto-saved' : 'Saved'} at {savedAt.toLocaleTimeString('en-GB')}
          </div>
        )}

        <Reveal delay={1}>
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* ── Body editor ──────────────────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The day we saw reindeer on the ice…"
                className="w-full px-4 py-3 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 font-display text-2xl"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
                Short description
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="One sentence that previews the entry in search and on social."
                rows={2}
                className="w-full px-4 py-3 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 text-sm resize-y"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold">
                  Your story
                </label>
                <button
                  type="button"
                  onClick={() => bodyImageRef.current?.click()}
                  disabled={bodyUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple/30 text-slate-300 hover:text-snow hover:border-pink/60 text-[11px] font-semibold tracking-wider uppercase transition-colors disabled:opacity-50"
                >
                  <ImagePlus size={14} />
                  Add photo
                </button>
                <input
                  ref={bodyImageRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleBodyImagePick(file);
                    e.target.value = '';
                  }}
                />
              </div>
              <textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onPaste={handleBodyPaste}
                placeholder={`Start writing your trip story here...\n\nWhat did you see? Where did you go?\nHow did it feel?\n\nYou can add photos with the "Add photo" button above.`}
                rows={previewOpen ? 12 : 22}
                className="w-full px-4 py-4 bg-night-light/40 border border-purple/30 rounded-xl text-snow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink/40 focus:border-pink/60 text-sm font-mono leading-relaxed resize-y"
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] text-slate-300">
                  Just write — about {readTime} min read so far. Use "Add photo" above or paste an image from your clipboard.
                </p>
                {bodyUploading && (
                  <span className="text-[11px] text-aurora-blue">Uploading photo…</span>
                )}
              </div>
              {bodyUploadError && (
                <p className="mt-1 text-[11px] text-red-400">{bodyUploadError}</p>
              )}
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

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Step-by-step guide — desktop only, collapsible */}
            {isNew && (
              <Reveal delay={2}>
              <div className="hidden lg:block rounded-2xl border border-pink/25 bg-pink/5 p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-bold mb-3">
                  How to write your post
                </p>
                <ol className="space-y-2.5 text-[13px] text-slate-200 leading-snug">
                  <li className="flex gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink/20 text-pink text-[11px] font-bold flex items-center justify-center">1</span>
                    <span><strong className="text-snow">Title</strong> — give your trip a name</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink/20 text-pink text-[11px] font-bold flex items-center justify-center">2</span>
                    <span><strong className="text-snow">Write your story</strong> — what happened, what you saw</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink/20 text-pink text-[11px] font-bold flex items-center justify-center">3</span>
                    <span><strong className="text-snow">Add photos</strong> — use the button or paste from clipboard</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink/20 text-pink text-[11px] font-bold flex items-center justify-center">4</span>
                    <span><strong className="text-snow">Cover photo</strong> — upload a hero image below</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink/20 text-pink text-[11px] font-bold flex items-center justify-center">5</span>
                    <span><strong className="text-snow">Publish</strong> — hit the pink button when you're ready!</span>
                  </li>
                </ol>
              </div>
              </Reveal>
            )}

            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-5 space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
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
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
                  Topic
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
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
                  Post URL
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(slugify(e.target.value));
                    setSlugEdited(true);
                  }}
                  placeholder="reindeer-on-the-ice"
                  className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink/40 font-mono text-xs"
                />
                <p className="mt-1 text-[11px] text-slate-300">
                  Created from your title. You can leave it as-is.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold">
                  Cover photo
                </label>
                <button
                  type="button"
                  onClick={() => setHeroUrlMode((m) => !m)}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-300 hover:text-pink font-semibold transition-colors"
                >
                  <Link2 size={11} />
                  {heroUrlMode ? 'Upload' : 'Paste URL'}
                </button>
              </div>

              {heroUrlMode ? (
                <div>
                  <input
                    type="url"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://…"
                    className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink/40 text-xs font-mono"
                  />
                  <p className="mt-1 text-[11px] text-slate-300">
                    Paste a link to any image — Unsplash, Imgur, your own host.
                  </p>
                  {heroImage && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-purple/20">
                      <img
                        src={heroImage}
                        alt={heroAlt || 'Hero preview'}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <ImageUpload
                  userId={user?.id}
                  currentUrl={heroImage || undefined}
                  onUploaded={setHeroImage}
                  onClear={() => setHeroImage('')}
                  compact
                />
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
                  Photo caption
                </label>
                <input
                  type="text"
                  value={heroAlt}
                  onChange={(e) => setHeroAlt(e.target.value)}
                  placeholder="What's in the photo?"
                  className="w-full px-3 py-2 bg-night/60 border border-purple/30 rounded-lg text-snow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink/40 text-sm"
                />
              </div>
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
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
