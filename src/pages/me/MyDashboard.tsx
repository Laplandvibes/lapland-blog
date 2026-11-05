// /me — the writer's own blog: their photos as a grid, the big "add a photo"
// button, their public trip page address and name. Localised (was English on
// every language until 2026-11-05).

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Camera, Settings, LogOut, Loader2, Thermometer, MapPin } from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useAuth, ensureProfile } from '../../hooks/useAuth';
import { useMyPosts } from '../../hooks/useMyPosts';
import { deletePost } from '../../hooks/useAdminPosts';
import { supabase } from '../../lib/supabase';
import { cardUrl } from '../../lib/uploadImage';
import { useSeo } from '../../lib/seo';
import { useLang, useLocalePath } from '../../i18n/useLang';
import { ME_COPY } from '../../locales/me';

interface ProfileSummary {
  handle: string;
  display_name: string;
}

export default function MyDashboard() {
  const lang = useLang();
  const to = useLocalePath();
  const navigate = useNavigate();
  const t = ME_COPY[lang].dashboard;
  const { user, signOut } = useAuth();
  const { posts, loading, error, refresh } = useMyPosts(user?.id);
  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [editing, setEditing] = useState<null | 'name' | 'handle'>(null);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useSeo({ title: t.metaTitle, description: t.emptyBody });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void (async () => {
      await ensureProfile(user);
      const { data } = await supabase.from('blog_profiles').select('handle, display_name').eq('id', user.id).maybeSingle();
      if (!cancelled) setProfile((data as ProfileSummary | null) ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  function startEdit(kind: 'name' | 'handle') {
    setDraft(kind === 'name' ? profile?.display_name ?? '' : profile?.handle ?? '');
    setFieldError(null);
    setEditing(kind);
  }

  async function saveField() {
    if (!user || !editing) return;
    setFieldError(null);
    if (editing === 'name') {
      const name = draft.trim().slice(0, 60);
      if (name.length < 2) return;
      setSaving(true);
      const { error: err } = await supabase.from('blog_profiles').update({ display_name: name }).eq('id', user.id);
      setSaving(false);
      if (err) return setFieldError(t.deleteFailed);
      setProfile((p) => (p ? { ...p, display_name: name } : p));
      // Posts carry a copy of the name; keep them in step.
      await supabase
        .from('blog_posts')
        .update({ author_snapshot: { handle: profile?.handle ?? '', display_name: name, avatar_url: null } })
        .eq('author_id', user.id);
      setEditing(null);
      return;
    }
    const clean = draft.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30);
    if (clean.length < 2) return setFieldError(t.handleRule);
    if (clean === profile?.handle) return setEditing(null);
    setSaving(true);
    const { data: taken } = await supabase.from('blog_profiles').select('id').eq('handle', clean).neq('id', user.id).maybeSingle();
    if (taken) {
      setSaving(false);
      return setFieldError(t.handleTaken);
    }
    const { error: err } = await supabase.from('blog_profiles').update({ handle: clean }).eq('id', user.id);
    setSaving(false);
    if (err) return setFieldError(t.handleTaken);
    await supabase
      .from('blog_posts')
      .update({ author_snapshot: { handle: clean, display_name: profile?.display_name ?? clean, avatar_url: null } })
      .eq('author_id', user.id);
    setProfile((p) => (p ? { ...p, handle: clean } : p));
    setEditing(null);
  }

  async function remove(id: string) {
    if (!window.confirm(t.confirmDelete)) return;
    setDeleteError(null);
    const { error: err } = await deletePost(id);
    if (err) setDeleteError(t.deleteFailed);
    else void refresh();
  }

  const pageUrl = profile ? to(`/by/${profile.handle}`) : null;

  return (
    <div className="min-h-screen bg-night text-snow flex flex-col">
      <Nav />
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="text-center lg:text-left">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">{t.h1}</h1>
              {profile && (
                <div className="mt-4 grid gap-2 text-left max-w-xl mx-auto lg:mx-0">
                  <EditableRow
                    label={t.nameLabel}
                    value={profile.display_name}
                    editing={editing === 'name'}
                    draft={draft}
                    setDraft={setDraft}
                    placeholder={t.namePlaceholder}
                    onEdit={() => startEdit('name')}
                    onSave={() => void saveField()}
                    onCancel={() => setEditing(null)}
                    editLabel={t.editName}
                    saveLabel={t.save}
                    cancelLabel={t.cancel}
                    saving={saving}
                  />
                  <EditableRow
                    label={t.yourPage}
                    value={`lapland.blog/by/${profile.handle}`}
                    href={pageUrl ?? undefined}
                    editing={editing === 'handle'}
                    draft={draft}
                    setDraft={setDraft}
                    prefix="lapland.blog/by/"
                    onEdit={() => startEdit('handle')}
                    onSave={() => void saveField()}
                    onCancel={() => setEditing(null)}
                    editLabel={t.editAddress}
                    saveLabel={t.save}
                    cancelLabel={t.cancel}
                    saving={saving}
                  />
                  {fieldError && <p role="alert" className="text-sm text-red-200">{fieldError}</p>}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-center lg:justify-end">
              <Link
                to={to('/me/new')}
                className="h-14 px-7 rounded-full bg-pink-cta text-white font-bold inline-flex items-center justify-center gap-2"
                data-umami-event="photo_cta"
                data-umami-event-surface="dashboard"
              >
                <Camera size={18} /> {t.addPhoto}
              </Link>
              <div className="flex gap-2 justify-center">
                <Link to={to('/me/settings')} className="h-12 px-4 rounded-full border border-slate-600 inline-flex items-center gap-2 text-sm font-semibold hover:border-snow">
                  <Settings size={16} /> {t.settings}
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut().then(() => navigate(to('/')))}
                  className="h-12 px-4 rounded-full border border-slate-600 inline-flex items-center gap-2 text-sm font-semibold hover:border-snow"
                >
                  <LogOut size={16} /> {t.signOut}
                </button>
              </div>
            </div>
          </div>

          {deleteError && <p role="alert" className="mb-4 text-sm text-red-200">{deleteError}</p>}

          {loading ? (
            <p className="py-16 text-center text-slate-300 inline-flex w-full items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" /> {t.loading}
            </p>
          ) : error ? (
            <p role="alert" className="py-10 text-center text-red-200">{t.loadError}</p>
          ) : posts.length === 0 ? (
            <Link
              to={to('/me/new')}
              className="block rounded-3xl border-2 border-dashed border-pink/50 bg-night-light/50 px-6 py-14 text-center hover:border-pink transition-colors"
              data-umami-event="photo_cta"
              data-umami-event-surface="dashboard_empty"
            >
              <span className="mx-auto mb-5 w-16 h-16 rounded-full bg-pink-cta/20 flex items-center justify-center">
                <Camera size={30} className="text-pink-300" />
              </span>
              <span className="block font-display font-bold text-2xl sm:text-3xl mb-3">{t.emptyTitle}</span>
              <span className="block text-slate-300 max-w-md mx-auto text-left sm:text-center">{t.emptyBody}</span>
              <span className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-pink-cta text-white font-semibold">
                <Plus size={18} /> {t.addPhoto}
              </span>
            </Link>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.id} className="rounded-2xl overflow-hidden border border-slate-700 bg-night-light/60 flex flex-col">
                  <div className="relative aspect-[4/3] bg-night-light">
                    {p.hero_image && <img src={cardUrl(p.hero_image)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />}
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        p.moderation_hidden ? 'bg-red-600 text-white' : p.status === 'published' ? 'bg-night/85 text-snow' : 'bg-amber-300 text-night'
                      }`}
                    >
                      {p.moderation_hidden ? t.hidden : p.status === 'published' ? t.published : t.draft}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <p className="font-display font-bold text-lg leading-snug">{p.title || t.untitled}</p>
                    {(p.location || p.weather_note) && (
                      <p className="text-sm text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
                        {p.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={13} className="text-pink-300" /> {p.location}
                          </span>
                        )}
                        {p.weather_note && (
                          <span className="inline-flex items-center gap-1">
                            <Thermometer size={13} className="text-pink-300" /> {p.weather_note}
                          </span>
                        )}
                      </p>
                    )}
                    <div className="mt-auto pt-2 flex flex-wrap gap-2">
                      <Link to={to(`/me/${p.id}`)} className="h-10 px-4 rounded-full border border-slate-600 inline-flex items-center gap-1.5 text-sm font-semibold hover:border-snow">
                        <Pencil size={14} /> {t.edit}
                      </Link>
                      {p.status === 'published' && !p.moderation_hidden && (
                        <Link to={to(`/post/${p.slug}`)} className="h-10 px-4 rounded-full border border-slate-600 inline-flex items-center gap-1.5 text-sm font-semibold hover:border-snow">
                          <ExternalLink size={14} /> {t.view}
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => void remove(p.id)}
                        className="h-10 px-4 rounded-full border border-slate-600 inline-flex items-center gap-1.5 text-sm font-semibold hover:border-red-300 hover:text-red-200"
                      >
                        <Trash2 size={14} /> {t.delete}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function EditableRow(props: {
  label: string;
  value: string;
  href?: string;
  editing: boolean;
  draft: string;
  setDraft: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editLabel: string;
  saveLabel: string;
  cancelLabel: string;
  saving: boolean;
}) {
  if (props.editing) {
    return (
      <form
        className="grid gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSave();
        }}
      >
        <span className="text-sm text-slate-400">{props.label}</span>
        <div className="flex flex-wrap items-center gap-2">
          {props.prefix && <span className="text-sm text-slate-300">{props.prefix}</span>}
          <input
            autoFocus
            value={props.draft}
            onChange={(e) => props.setDraft(e.target.value)}
            placeholder={props.placeholder}
            className="h-11 flex-1 min-w-[10rem] rounded-xl bg-white px-3 text-base text-slate-900"
          />
          <button type="submit" disabled={props.saving} className="h-11 px-4 rounded-full bg-pink-cta text-white text-sm font-bold disabled:opacity-60">
            {props.saveLabel}
          </button>
          <button type="button" onClick={props.onCancel} className="h-11 px-4 rounded-full border border-slate-600 text-sm font-semibold">
            {props.cancelLabel}
          </button>
        </div>
      </form>
    );
  }
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-sm text-slate-400">{props.label}</span>
      {props.href ? (
        <Link to={props.href} className="font-semibold text-snow hover:text-pink-300 break-all">
          {props.value}
        </Link>
      ) : (
        <span className="font-semibold text-snow">{props.value}</span>
      )}
      <button type="button" onClick={props.onEdit} className="lv-tap text-sm font-semibold text-pink-300 hover:text-snow">
        {props.editLabel}
      </button>
    </div>
  );
}
