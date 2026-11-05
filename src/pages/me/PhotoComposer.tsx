// /me/new and /me/:id: photo-first posting (Vesa 2026-11-05: "jengi haluaa
// mennä tänne blogia pitämään", "ajatus että haluan ottaa kuvan ja lisätä").
//
// A post starts from a photo. Place and date are read from the photo itself,
// the temperature comes from the Finnish Meteorological Institute for that
// place and moment, and after publishing the writer gets a story card for
// Instagram/Facebook. Writing is optional: one line is enough.
//
// Replaces the markdown editor (MyEditor) for readers; the admin editor for
// editorial articles is separate and unchanged.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, ImagePlus, Loader2, Star, Trash2, Thermometer, MapPin, CalendarDays, Share2, Download, Link2, Check, Plus } from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useAuth, ensureProfile } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { useLang, useLocalePath } from '../../i18n/useLang';
import { ME_COPY, fill, intlLocale } from '../../locales/me';
import { readPhotoMeta, takenToUtc } from '../../lib/exif';
import { preparePhoto } from '../../lib/photoPrep';
import { uploadPhoto, cardUrl } from '../../lib/uploadImage';
import { nearestPlace, placeCoords, PLACES } from '../../lib/places';

const PLACE_NAMES = PLACES.map((p) => p.name).sort((a, b) => a.localeCompare(b, 'fi'));
import { temperatureAt, formatTemp } from '../../lib/fmiWeather';
import { drawStoryCard } from '../../lib/storyCard';
import { useSeo } from '../../lib/seo';
import type { PostBlock } from '../../data/posts';

/**
 * [LV-FUNNEL] Lomakesuppilon eventit Umamiin — paikallinen apuri, ei jaettua
 * importtia (vendoroitu sync on refresh-only). Ei saa koskaan rikkoa
 * lomaketta. Standardi: memory _procedural/lv_form_funnel_events.md.
 */
function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch { /* ignore */ }
}

interface PhotoItem {
  key: string;
  /** Local preview (object URL) or the uploaded URL. */
  preview: string;
  full?: Blob;
  card?: Blob;
  /** Public URL once uploaded (or for photos of an existing post). */
  url?: string;
  status: 'reading' | 'ready' | 'error';
}

function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

function shortId(): string {
  const b = new Uint8Array(3);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(36).padStart(2, '0')).join('').slice(0, 5);
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function PhotoComposer() {
  const lang = useLang();
  const to = useLocalePath();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id && id !== 'new');
  const t = ME_COPY[lang].composer;
  const { user } = useAuth();
  const dateFmt = useMemo(
    () => new Intl.DateTimeFormat(intlLocale(lang), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
    [lang],
  );

  useSeo({ title: isEdit ? t.h1Edit : t.metaTitle, description: t.pickHint });

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState(todayIso());
  const [caption, setCaption] = useState('');
  const [body, setBody] = useState('');
  const [temp, setTemp] = useState<{ c: number; km: number } | null>(null);
  const [tempState, setTempState] = useState<'idle' | 'loading' | 'none' | 'ok'>('idle');
  const [showTemp, setShowTemp] = useState(true);
  const [busy, setBusy] = useState<null | 'upload' | 'save'>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | { slug: string; status: 'draft' | 'published'; handle: string | null; cover: string }>(null);
  const [loadedRow, setLoadedRow] = useState(false);

  // Where and when the shot was taken, as read from the first photo.
  const shot = useRef<{ lat?: number; lng?: number; when?: Date } | null>(null);
  const touched = useRef({ place: false, date: false });
  const startTracked = useRef(false);
  const funnel = { surface: 'composer', lang };

  const trackStart = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track('photo_start', funnel);
  };

  // ── Edit mode: load the writer's own post ────────────────────────────────
  useEffect(() => {
    if (!isEdit || !user || loadedRow) return;
    let cancelled = false;
    void supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, hero_image, content, location, visit_date, weather_note, author_id')
      .eq('id', id as string)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data || data.author_id !== user.id) return;
        const blocks = (Array.isArray(data.content) ? data.content : []) as PostBlock[];
        const images = blocks.filter((b): b is Extract<PostBlock, { type: 'image' }> => b.type === 'image').map((b) => b.src);
        const text = blocks
          .filter((b): b is Extract<PostBlock, { type: 'paragraph' }> => b.type === 'paragraph')
          .map((b) => b.text)
          .join('\n\n');
        const all = [data.hero_image as string, ...images].filter(Boolean);
        setPhotos(all.map((url, i) => ({ key: `old-${i}`, preview: cardUrl(url), url, status: 'ready' })));
        setCaption((data.excerpt as string) ?? '');
        setBody(text);
        setPlace((data.location as string) ?? '');
        if (data.visit_date) setDate(data.visit_date as string);
        setShowTemp(Boolean(data.weather_note));
        touched.current = { place: true, date: true };
        setLoadedRow(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isEdit, id, user, loadedRow]);

  // ── Temperature for the chosen place and moment ──────────────────────────
  useEffect(() => {
    const exact = shot.current;
    let lat = exact?.lat;
    let lng = exact?.lng;
    let when = exact?.when;
    if (touched.current.place || lat === undefined || lng === undefined) {
      const c = placeCoords(place);
      if (c) {
        lat = c.lat;
        lng = c.lng;
      } else if (touched.current.place) {
        lat = undefined;
        lng = undefined;
      }
    }
    if (touched.current.date || !when) {
      // Noon local time when only the date is known.
      when = date ? new Date(`${date}T10:00:00Z`) : undefined;
    }
    if (lat === undefined || lng === undefined || !when) {
      setTemp(null);
      // Nothing to look up until a known place is chosen.
      setTempState(place.trim() && photos.length ? 'none' : 'idle');
      return;
    }
    let cancelled = false;
    setTempState('loading');
    const timer = window.setTimeout(() => {
      void temperatureAt(lat as number, lng as number, when as Date).then((obs) => {
        if (cancelled) return;
        if (obs) {
          setTemp({ c: obs.tempC, km: obs.stationKm });
          setTempState('ok');
        } else {
          setTemp(null);
          setTempState('none');
        }
      });
    }, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [place, date, photos.length]);

  // ── Picking photos ────────────────────────────────────────────────────────
  const onFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      trackStart();
      setError(null);
      const list = Array.from(files).slice(0, 10);
      const items: PhotoItem[] = list.map((f, i) => ({
        key: `${Date.now()}-${i}-${f.name}`,
        preview: '',
        status: 'reading',
      }));
      const isFirstBatch = photos.length === 0;
      setPhotos((prev) => [...prev, ...items]);

      await Promise.all(
        list.map(async (file, i) => {
          const key = items[i].key;
          try {
            const [meta, prepared] = await Promise.all([readPhotoMeta(file), preparePhoto(file)]);
            setPhotos((prev) =>
              prev.map((p) =>
                p.key === key ? { ...p, preview: prepared.previewUrl, full: prepared.blob, card: prepared.card, status: 'ready' } : p,
              ),
            );
            if (isFirstBatch && i === 0) {
              const when = takenToUtc(meta) ?? undefined;
              shot.current = { lat: meta.lat, lng: meta.lng, when };
              if (!touched.current.place && meta.lat !== undefined && meta.lng !== undefined) {
                const name = nearestPlace(meta.lat, meta.lng);
                if (name) setPlace(name);
              }
              if (!touched.current.date && meta.takenLocal) setDate(meta.takenLocal.slice(0, 10));
            }
          } catch {
            setPhotos((prev) => prev.map((p) => (p.key === key ? { ...p, status: 'error' } : p)));
            setError(t.errPhotoRead);
            track('photo_blocked', { ...funnel, reason: 'decode' });
          }
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photos.length, t.errPhotoRead],
  );

  const removePhoto = (key: string) => setPhotos((prev) => prev.filter((p) => p.key !== key));
  const makeCover = (key: string) =>
    setPhotos((prev) => {
      const hit = prev.find((p) => p.key === key);
      return hit ? [hit, ...prev.filter((p) => p.key !== key)] : prev;
    });

  const readyPhotos = photos.filter((p) => p.status === 'ready');
  const stillReading = photos.some((p) => p.status === 'reading');
  const dateLabel = date ? dateFmt.format(new Date(`${date}T12:00:00Z`)) : '';

  // ── Save ─────────────────────────────────────────────────────────────────
  async function save(status: 'draft' | 'published') {
    setError(null);
    if (readyPhotos.length === 0) {
      setError(t.errNoPhoto);
      track('photo_blocked', { ...funnel, reason: 'no_photo' });
      return;
    }
    if (!user) {
      setError(t.errNotSignedIn);
      track('photo_blocked', { ...funnel, reason: 'signed_out' });
      return;
    }
    track('photo_submit', { ...funnel, status, photos: readyPhotos.length });

    // 1. Profile first: the post's author must exist (foreign key).
    setBusy('save');
    const handle = await ensureProfile(user);

    // 2. Upload what is not uploaded yet, in order.
    setBusy('upload');
    const urls: string[] = [];
    for (const p of readyPhotos) {
      if (p.url) {
        urls.push(p.url);
        continue;
      }
      const res = await uploadPhoto(p.full as Blob, p.card as Blob, user.id);
      if (res.error || !res.url) {
        setBusy(null);
        setError(t.errUpload);
        track('photo_error', { ...funnel, step: 'upload' });
        return;
      }
      urls.push(res.url);
      setPhotos((prev) => prev.map((x) => (x.key === p.key ? { ...x, url: res.url as string } : x)));
    }

    // 3. The post itself.
    setBusy('save');
    const line = caption.trim();
    const where = place.trim();
    const fallbackTitle = [where, dateLabel].filter(Boolean).join(', ');
    const title = (line || fallbackTitle || t.metaTitle).slice(0, 140);
    const paragraphs = body
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((text) => ({ type: 'paragraph' as const, text }));
    const extraImages = urls.slice(1).map((src) => ({ type: 'image' as const, src, alt: line || where }));
    const content: PostBlock[] = [...paragraphs, ...extraImages];
    const words = body.trim() ? body.trim().split(/\s+/).length : 0;
    const row = {
      title,
      kicker: '',
      excerpt: line || fallbackTitle,
      category_slug: 'stories',
      tags: [] as string[],
      hero_image: urls[0],
      hero_alt: line || where || title,
      content,
      status,
      featured: false,
      read_time_minutes: Math.max(1, Math.round(words / 200)),
      visit_date: date || null,
      location: where || null,
      weather_note: showTemp && temp ? formatTemp(temp.c) : null,
      stay_type: null,
      theme: 'yo' as const,
      lang,
    };

    let slug = '';
    let failed = false;
    if (isEdit) {
      const { data, error: e } = await supabase
        .from('blog_posts')
        .update({ ...row, published_at: status === 'published' ? new Date().toISOString() : null })
        .eq('id', id as string)
        .select('slug')
        .single();
      failed = Boolean(e);
      slug = (data?.slug as string) ?? '';
    } else {
      const { data: prof } = await supabase
        .from('blog_profiles')
        .select('handle, display_name, avatar_url')
        .eq('id', user.id)
        .maybeSingle();
      slug = `${slugify(title) || slugify(where) || 'lapland'}-${shortId()}`;
      const { error: e } = await supabase.from('blog_posts').insert({
        ...row,
        slug,
        author_id: user.id,
        author_snapshot: {
          handle: prof?.handle ?? handle ?? '',
          display_name: prof?.display_name ?? handle ?? '',
          avatar_url: prof?.avatar_url ?? null,
        },
        published_at: status === 'published' ? new Date().toISOString() : null,
      });
      failed = Boolean(e);
    }
    setBusy(null);
    if (failed) {
      setError(t.errSave);
      track('photo_error', { ...funnel, step: 'save' });
      return;
    }
    track('photo_success', { ...funnel, status, photos: urls.length, temp: Boolean(row.weather_note) });
    setDone({ slug, status, handle, cover: urls[0] });
    window.scrollTo({ top: 0 });
  }

  // ── Done view ────────────────────────────────────────────────────────────
  if (done) {
    return (
      <DoneView
        lang={lang}
        done={done}
        place={place.trim()}
        dateLabel={dateLabel}
        temp={showTemp && temp ? formatTemp(temp.c) : undefined}
        onNext={() => {
          setDone(null);
          setPhotos([]);
          setCaption('');
          setBody('');
          setTemp(null);
          shot.current = null;
          touched.current = { place: false, date: false };
          setDate(todayIso());
          setPlace('');
          startTracked.current = false;
          navigate(to('/me/new'));
        }}
      />
    );
  }

  const inputId = 'photo-input';

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />
      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link to={to('/me')} className="lv-tap inline-flex items-center gap-1.5 text-sm font-semibold text-pink-300 hover:text-snow">
            <ArrowLeft size={15} /> {t.back}
          </Link>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mt-4 mb-6 text-center lg:text-left">
            {isEdit ? t.h1Edit : t.h1New}
          </h1>

          <input
            id={inputId}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              void onFiles(e.currentTarget.files);
              e.currentTarget.value = '';
            }}
          />

          {photos.length === 0 ? (
            <label
              htmlFor={inputId}
              className="flex flex-col items-center justify-center text-center gap-4 rounded-3xl border-2 border-dashed border-pink/50 bg-night-light/50 px-6 py-14 sm:py-20 cursor-pointer hover:border-pink transition-colors"
            >
              <span className="w-16 h-16 rounded-full bg-pink-cta/20 flex items-center justify-center">
                <Camera size={30} className="text-pink-300" />
              </span>
              <span className="font-display font-bold text-2xl">{t.pickTitle}</span>
              <span className="text-slate-300 max-w-sm">{t.pickHint}</span>
              <span className="mt-2 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-pink-cta text-white font-semibold">
                <ImagePlus size={18} /> {t.pickButton}
              </span>
            </label>
          ) : (
            <section aria-label={t.pickTitle}>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {photos.map((p, i) => (
                  <figure
                    key={p.key}
                    className={`relative overflow-hidden rounded-2xl bg-night-light ${i === 0 ? 'col-span-3 sm:col-span-4 aspect-[4/3] sm:aspect-[16/9]' : 'aspect-square'}`}
                  >
                    {p.preview ? (
                      <img src={p.preview} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm gap-2">
                        <Loader2 size={18} className="animate-spin" /> {t.readingPhoto}
                      </div>
                    )}
                    {i === 0 && p.preview && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-night/80 px-3 py-1 text-xs font-semibold">
                        <Star size={12} className="text-pink-300" /> {t.coverBadge}
                      </span>
                    )}
                    <div className="absolute right-2 top-2 flex gap-2">
                      {i > 0 && p.status === 'ready' && (
                        <button
                          type="button"
                          onClick={() => makeCover(p.key)}
                          className="w-10 h-10 rounded-full bg-night/80 flex items-center justify-center hover:bg-night"
                          aria-label={t.makeCover}
                          title={t.makeCover}
                        >
                          <Star size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(p.key)}
                        className="w-10 h-10 rounded-full bg-night/80 flex items-center justify-center hover:bg-night"
                        aria-label={t.removePhoto}
                        title={t.removePhoto}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </figure>
                ))}
              </div>
              {photos.length < 10 && (
                <label
                  htmlFor={inputId}
                  className="mt-3 h-14 rounded-2xl border-2 border-dashed border-slate-500 flex items-center justify-center gap-2 text-base font-semibold text-slate-200 cursor-pointer hover:border-pink"
                >
                  <Plus size={20} /> {t.addMore}
                </label>
              )}
              <p className="mt-3 text-sm text-slate-400">{t.privacyNote}</p>
            </section>
          )}

          {photos.length > 0 && (
            <form
              className="mt-8 grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                void save('published');
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4 rounded-2xl border border-slate-700 bg-night-light/50 p-5">
                <label className="grid gap-2">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <MapPin size={15} className="text-pink-300" /> {t.placeLabel}
                  </span>
                  <input
                    value={place}
                    onChange={(e) => {
                      touched.current.place = true;
                      setPlace(e.target.value);
                    }}
                    onFocus={trackStart}
                    placeholder={t.placePlaceholder}
                    list="lv-places"
                    autoComplete="off"
                    className="h-12 rounded-xl bg-white text-ink px-4 text-base text-slate-900 placeholder:text-slate-500"
                  />
                  <datalist id="lv-places">
                    {PLACE_NAMES.map((n) => (
                      <option key={n} value={n} />
                    ))}
                  </datalist>
                </label>
                <label className="grid gap-2">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <CalendarDays size={15} className="text-pink-300" /> {t.dateLabel}
                  </span>
                  <input
                    type="date"
                    value={date}
                    max={todayIso()}
                    onChange={(e) => {
                      touched.current.date = true;
                      setDate(e.target.value);
                    }}
                    onFocus={trackStart}
                    className="h-12 rounded-xl bg-white px-4 text-base text-slate-900"
                  />
                </label>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-x-4 gap-y-2 min-h-[2.75rem]" aria-live="polite">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Thermometer size={15} className="text-pink-300" /> {t.tempLabel}
                  </span>
                  {tempState === 'loading' && (
                    <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                      <Loader2 size={14} className="animate-spin" /> {t.tempLoading}
                    </span>
                  )}
                  {tempState === 'ok' && temp && (
                    <>
                      <span className="font-display font-extrabold text-2xl">{formatTemp(temp.c)}</span>
                      <label className="inline-flex items-center gap-2 text-sm text-slate-200 cursor-pointer">
                        <input type="checkbox" checked={showTemp} onChange={(e) => setShowTemp(e.target.checked)} className="w-5 h-5 accent-pink-600" />
                        {t.tempShow}
                      </label>
                      <span className="basis-full text-xs text-slate-400">{fill(t.tempSource, { km: temp.km })}</span>
                    </>
                  )}
                  {tempState === 'none' && <span className="text-sm text-slate-400">{t.tempNone}</span>}
                </div>
              </div>

              <label className="grid gap-2">
                <span className="text-base font-semibold">{t.captionLabel}</span>
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  onFocus={trackStart}
                  maxLength={140}
                  placeholder={t.captionPlaceholder}
                  className="h-14 rounded-xl bg-white px-4 text-lg text-slate-900 placeholder:text-slate-500"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-base font-semibold">{t.bodyLabel}</span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  onFocus={trackStart}
                  rows={5}
                  placeholder={t.bodyPlaceholder}
                  className="rounded-xl bg-white px-4 py-3 text-base leading-relaxed text-slate-900 placeholder:text-slate-500"
                />
              </label>

              {error && (
                <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={busy !== null || stillReading}
                  className="h-14 px-8 rounded-full bg-pink-cta text-white font-bold text-lg inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {busy ? <Loader2 size={18} className="animate-spin" /> : null}
                  {busy === 'upload' ? t.uploading : busy === 'save' ? t.saving : isEdit ? t.update : t.publish}
                </button>
                <button
                  type="button"
                  disabled={busy !== null || stillReading}
                  onClick={() => void save('draft')}
                  className="h-14 px-8 rounded-full border border-slate-500 font-semibold inline-flex items-center justify-center hover:border-snow disabled:opacity-60"
                >
                  {t.saveDraft}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── After saving: story card + share ───────────────────────────────────────

function DoneView({
  lang,
  done,
  place,
  dateLabel,
  temp,
  onNext,
}: {
  lang: ReturnType<typeof useLang>;
  done: { slug: string; status: 'draft' | 'published'; handle: string | null; cover: string };
  place: string;
  dateLabel: string;
  temp?: string;
  onNext: () => void;
}) {
  const t = ME_COPY[lang].composer;
  const to = useLocalePath();
  const [card, setCard] = useState<{ blob: Blob; url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const postPath = to(`/post/${done.slug}`);
  const postUrl = `https://lapland.blog${postPath}`;
  const pageLabel = done.handle ? `lapland.blog/by/${done.handle}` : 'lapland.blog';

  useEffect(() => {
    let url = '';
    let cancelled = false;
    void drawStoryCard({
      photoUrl: cardUrl(done.cover),
      temp,
      place,
      date: dateLabel,
      link: pageLabel,
      tempSource: temp ? t.tempSourceCard : undefined,
    })
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setCard({ blob, url });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [done.cover, temp, place, dateLabel, pageLabel, t.tempSourceCard]);

  const file = card ? new File([card.blob], 'lapland-blog.jpg', { type: 'image/jpeg' }) : null;
  const canShareFile =
    !!file && typeof navigator !== 'undefined' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />
      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center">
          <div className="mx-auto w-full max-w-[300px]">
            <div className="aspect-[9/16] rounded-[28px] overflow-hidden border-[8px] border-night-light bg-night-light shadow-2xl">
              {card ? (
                <img src={card.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center gap-2 text-sm text-slate-300">
                  <Loader2 size={16} className="animate-spin" /> {t.storyMaking}
                </div>
              )}
            </div>
          </div>
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 text-pink-300 font-semibold">
              <Check size={18} /> {done.status === 'published' ? t.doneTitle : t.doneDraftTitle}
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mt-3 mb-4">
              {[place, temp].filter(Boolean).join(', ') || t.doneTitle}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 text-left max-w-xl mx-auto lg:mx-0">{t.doneLead}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start">
              {canShareFile ? (
                <button
                  type="button"
                  onClick={() => {
                    track('photo_share', { method: 'story', lang });
                    void navigator.share({ files: [file as File] }).catch(() => undefined);
                  }}
                  className="h-14 px-7 rounded-full bg-pink-cta text-white font-bold inline-flex items-center justify-center gap-2"
                >
                  <Share2 size={18} /> {t.shareStory}
                </button>
              ) : (
                <a
                  href={card?.url}
                  download="lapland-blog.jpg"
                  onClick={() => track('photo_share', { method: 'download', lang })}
                  className={`h-14 px-7 rounded-full bg-pink-cta text-white font-bold inline-flex items-center justify-center gap-2 ${card ? '' : 'pointer-events-none opacity-60'}`}
                >
                  <Download size={18} /> {t.downloadStory}
                </a>
              )}
              {done.status === 'published' && (
                <button
                  type="button"
                  onClick={() => {
                    track('photo_share', { method: 'copy', lang });
                    void navigator.clipboard?.writeText(postUrl).then(() => setCopied(true));
                  }}
                  className="h-14 px-7 rounded-full border border-slate-500 font-semibold inline-flex items-center justify-center gap-2 hover:border-snow"
                >
                  {copied ? <Check size={18} /> : <Link2 size={18} />} {copied ? t.copied : t.copyLink}
                </button>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm font-semibold">
              {done.status === 'published' && (
                <Link to={postPath} className="lv-tap text-pink-300 hover:text-snow">
                  {t.viewPost}
                </Link>
              )}
              <button type="button" onClick={onNext} className="lv-tap text-pink-300 hover:text-snow">
                {t.addNext}
              </button>
              <Link to={to('/me')} className="lv-tap text-pink-300 hover:text-snow">
                {t.myBlog}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
