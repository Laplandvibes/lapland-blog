// /fan-league — Lapland Fan League: which country reads most about Lapland this month.
//
// Vesa 2026-10-22: "Sinne pitää saada kävijöitä. Thats the point." The first draft was rejected as
// "aivan liian geneerinen"; the approved v2 is built from real material only: an own photograph,
// the real table drawn as a map (capitals at their true coordinates, a line to Lapland, star size =
// readers) and a real object the joiner gets (the fan card). No card grid, no pills, no gradient
// panels.
//
// 🔴 The hero photo is NOT the aurora shot of the approved draft: that frame (Kemijärvi 10.10.
//    21:51) and its sibling frames were already on laplandactivities, and one photo = one site.
//    The Nuorgam sign has its own lettering, so the headline sits above the photo, not on it.
// 🔴 Country names and dates come from Intl in the reader's language. Copy sentences that take a
//    {country} are written to read with a bare nominative name (see SectionCopy.fanLeague).
// 🔴 The table shows an index (leader = 100), never raw reader counts.

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Download, Loader2, Share2 } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { fillCopy } from '../lib/copyTemplate';
import { trackNewsletterSignup } from '../lib/analytics';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabaseConfig';
import { POST_META } from '../lib/postMeta.gen';
import { FAN_LEAGUE } from '../data/fanLeague.gen';
import { CAPITALS, JOIN_COUNTRIES, LAPLAND, type FanLeagueRow } from '../data/fanLeague';

const SOURCE = 'laplandblog-fanclub';
const TOP = 10;
const HERO = '/images/fan-league/nuorgam-northernmost';
const CARD_PHOTO = '/images/fan-league/nuorgam-sign-card.webp';
const PHOTO_DAY = Date.UTC(2026, 9, 13, 12);

/** [LV-FUNNEL] Local helper on purpose (no shared import); must never break the form. */
function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch { /* ignore */ }
}

const regionNames = new Map<Lang, Intl.DisplayNames | null>();
function countryName(lang: Lang, code: string): string {
  if (!regionNames.has(lang)) {
    try { regionNames.set(lang, new Intl.DisplayNames([lang], { type: 'region' })); } catch { regionNames.set(lang, null); }
  }
  return regionNames.get(lang)?.of(code) ?? code;
}

const utc = (ymd: string) => { const [y, m, d] = ymd.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
function dayRange(lang: Lang, from: string, to: string): string {
  const f = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', timeZone: 'UTC' });
  try { return f.formatRange(utc(from), utc(to)); } catch { return `${f.format(utc(from))} – ${f.format(utc(to))}`; }
}
const fullDate = (lang: Lang, d: Date) => new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
const monthYear = (lang: Lang, d: Date) => new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'Europe/Helsinki' }).format(d);
const monthOnly = (lang: Lang, ymd: string) => new Intl.DateTimeFormat(lang, { month: 'long', timeZone: 'UTC' }).format(utc(`${ymd}-15`));

/** Rough text width for label placement; CJK and Hangul glyphs are about one em wide. */
const isWide = (cp: number) => (cp >= 0x3000 && cp <= 0x9fff) || (cp >= 0xac00 && cp <= 0xd7af) || (cp >= 0xff00 && cp <= 0xffef);
const textWidth = (s: string, size: number) =>
  [...s].reduce((w, ch) => w + (isWide(ch.codePointAt(0) ?? 0) ? size : size * 0.56), 0);

type Box = [number, number, number, number];
const overlaps = (a: Box, b: Box) => a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3];

/**
 * Equirectangular projection framed around the top ten capitals plus Lapland. Shape is true at the
 * frame's middle latitude φ0 (px per degree of latitude = px per degree of longitude / cos φ0), the
 * same rule as the network's other maps (CLAUDE.md "Kartat"); φ0 moves with the frame, so a country
 * from the southern hemisphere widens the frame instead of falling off it.
 */
function LeagueMap({ rows, lang, label }: { rows: FanLeagueRow[]; lang: Lang; label: string }) {
  const W = 1180;
  const TOP_PAD = 60;
  const pts = rows.map((r) => CAPITALS[r.c]).filter(Boolean);
  const lats = [...pts.map((p) => p[0]), LAPLAND[0]];
  const lons = [...pts.map((p) => p[1]), LAPLAND[1]];
  const lon0 = Math.min(...lons) - 14, lon1 = Math.max(...lons) + 14;
  const lat0 = Math.min(...lats) - 7, lat1 = Math.max(...lats) + 6;
  const kx = W / (lon1 - lon0);
  const ky = kx / Math.cos((((lat0 + lat1) / 2) * Math.PI) / 180);
  const H = Math.round((lat1 - lat0) * ky) + TOP_PAD;
  const P = ([la, lo]: [number, number]): [number, number] => [(lo - lon0) * kx, (lat1 - la) * ky + TOP_PAD];
  const [hx, hy] = P(LAPLAND);

  const stars = rows
    .map((r, idx) => {
      const cap = CAPITALS[r.c];
      if (!cap) return null;
      const [x, y] = P(cap);
      const s = r.i / 100;
      return { r, idx, x, y, s, rad: 4 + 18 * Math.sqrt(s), name: countryName(lang, r.c) };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  // Greedy label placement in rank order: try right, left, then above/below on each side; the
  // first spot that clears every earlier label, every star core and the frame wins.
  const place = (text: (st: (typeof stars)[number]) => string, size: number) => {
    const taken: Box[] = stars.map((st) => [st.x - 5, st.y - 5, 10, 10]);
    return stars.map((st) => {
      const t = text(st);
      const w = textWidth(t, size);
      // Lapland's pink ring (r 16) sits on Finland's star, so its label starts outside the ring.
      const gap = Math.max(st.r.c === 'FI' ? 22 : 8, st.rad / 3 + 6);
      const tries: [number, number, 'start' | 'end'][] = [
        [gap, size * 0.35, 'start'], [-gap, size * 0.35, 'end'],
        [gap, -size * 0.75, 'start'], [gap, size * 1.3, 'start'],
        [-gap, -size * 0.75, 'end'], [-gap, size * 1.3, 'end'],
        [gap, -size * 1.7, 'start'], [-gap, size * 2.2, 'end'],
      ];
      let pick = tries[0];
      for (const tr of tries) {
        const bx: Box = [tr[2] === 'start' ? st.x + tr[0] : st.x + tr[0] - w, st.y + tr[1] - size * 0.82, w, size];
        if (bx[0] < 2 || bx[0] + bx[2] > W - 2 || bx[1] < 2 || bx[1] + bx[3] > H - 2) continue;
        if (taken.some((b) => overlaps(b, bx))) continue;
        pick = tr;
        taken.push(bx);
        break;
      }
      return { t, x: st.x + pick[0], y: st.y + pick[1], anchor: pick[2] };
    });
  };
  const full = place((st) => `${st.idx + 1} ${st.name}`, 17);
  const short = place((st) => String(st.idx + 1), 52);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={label} className="block fl-map">
      <defs>
        <radialGradient id="fl-glow">
          <stop offset="0" stopColor="#6EE7B7" stopOpacity=".9" />
          <stop offset="1" stopColor="#6EE7B7" stopOpacity="0" />
        </radialGradient>
        {stars.filter((st) => st.r.c !== 'FI').map((st) => (
          <linearGradient key={st.r.c} id={`fl-ag-${st.r.c}`} gradientUnits="userSpaceOnUse" x1={st.x} y1={st.y} x2={hx} y2={hy}>
            <stop offset="0" stopColor="#34D399" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        ))}
      </defs>
      {stars.filter((st) => st.r.c !== 'FI').map((st) => {
        const mx = (st.x + hx) / 2;
        const my = Math.max(6, Math.min(st.y, hy) - 40 - 0.18 * Math.abs(st.x - hx));
        return (
          <path key={st.r.c} d={`M${st.x.toFixed(1)},${st.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`}
            stroke={`url(#fl-ag-${st.r.c})`} strokeWidth={1 + 3 * st.s} fill="none" opacity={0.35 + 0.6 * st.s} />
        );
      })}
      {stars.map((st) => (
        <g key={st.r.c}>
          <circle cx={st.x} cy={st.y} r={st.rad * 2.2} fill="url(#fl-glow)" opacity={0.4 + 0.6 * st.s} />
          <circle cx={st.x} cy={st.y} r={Math.max(2.5, st.rad / 3)} fill="#F8FAFC" />
        </g>
      ))}
      <circle cx={hx} cy={hy} r={7} fill="#EC4899" />
      <circle cx={hx} cy={hy} r={16} fill="none" stroke="#EC4899" strokeOpacity=".5" />
      <g className="fl-lab-full" aria-hidden="true">
        {full.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor={l.anchor} fontSize={17} fontWeight={600} fill="#E2E8F0">
            <tspan fill="#F472B6" fontWeight={800}>{stars[i].idx + 1}</tspan> {stars[i].name}
          </text>
        ))}
      </g>
      <g className="fl-lab-short" aria-hidden="true">
        {short.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor={l.anchor} fontSize={52} fontWeight={800} fill="#F472B6">{l.t}</text>
        ))}
      </g>
    </svg>
  );
}

/** Draws the fan card as a 1200×750 PNG for saving or sharing. Fonts are the page's own. */
async function drawCard(country: string, since: string, title: string): Promise<Blob | null> {
  const W = 1200, H = 750;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  if (!g) return null;
  try {
    await Promise.all([
      document.fonts.load("800 84px 'Manrope'"),
      document.fonts.load("700 30px 'Inter'"),
      document.fonts.load("400 60px 'Bebas Neue'"),
    ]);
  } catch { /* fall back to whatever is loaded */ }
  const img = new Image();
  img.src = CARD_PHOTO;
  try { await img.decode(); } catch { /* card without the photo strip */ }
  g.beginPath();
  g.roundRect(0, 0, W, H, 48);
  g.clip();
  g.fillStyle = '#0F172A';
  g.fillRect(0, 0, W, H);
  if (img.naturalWidth) g.drawImage(img, 0, 0, W, Math.round((W * img.naturalHeight) / img.naturalWidth));
  g.fillStyle = '#F9A8D4';
  g.font = "700 30px 'Inter', sans-serif";
  if ('letterSpacing' in g) (g as unknown as { letterSpacing: string }).letterSpacing = '7px';
  g.fillText(title, 64, 420);
  if ('letterSpacing' in g) (g as unknown as { letterSpacing: string }).letterSpacing = '0px';
  g.fillStyle = '#F8FAFC';
  let size = 84;
  g.font = `800 ${size}px 'Manrope', sans-serif`;
  while (g.measureText(country).width > W - 128 && size > 40) { size -= 4; g.font = `800 ${size}px 'Manrope', sans-serif`; }
  g.fillText(country, 64, 520);
  g.fillStyle = '#94A3B8';
  g.font = "400 34px 'Inter', sans-serif";
  g.fillText(since, 64, 580);
  g.font = "400 60px 'Bebas Neue', 'Arial Narrow', sans-serif";
  const parts: [string, string][] = [['#', '#EC4899'], ['LAPLAND', '#F8FAFC'], ['.BLOG', '#EC4899']];
  let x = W - 64 - parts.reduce((w, [t]) => w + g.measureText(t).width, 0);
  for (const [t, col] of parts) { g.fillStyle = col; g.fillText(t, x, H - 56); x += g.measureText(t).width; }
  return new Promise((res) => cv.toBlob((b) => res(b), 'image/png'));
}

export default function FanLeague() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].fanLeague;
  const data = FAN_LEAGUE;
  const rows = data.rows.slice(0, TOP);

  useSeo({ title: c.metaTitle, description: c.metaDescription, canonical: canonicalUrl('/fan-league') });
  useJsonLd('website', websiteSchema());
  useJsonLd(
    'fanleague-breadcrumb',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'Fan League', url: canonicalUrl('/fan-league') },
    ])
  );

  const name = (code: string) => countryName(lang, code);
  const hasMoves = rows.some((r) => r.p);

  // Desk notes are built from the table, so they stay true every week without an editor.
  const notes = useMemo(() => {
    const out: string[] = [];
    const plural = new Intl.PluralRules(lang);
    const pts = (n: number) => fillCopy(plural.select(n) === 'one' ? c.pointOne : c.pointMany, { n: String(n) });
    if (rows.length >= 2) out.push(fillCopy(c.noteLead, { leader: name(rows[0].c), second: name(rows[1].c), pts: pts(rows[0].i - rows[1].i) }));
    let duel: { k: number; d: number } | null = null;
    for (let k = 1; k + 1 < rows.length; k++) {
      const d = rows[k].i - rows[k + 1].i;
      if (!duel || d < duel.d) duel = { k, d };
    }
    if (duel) {
      const v = { a: name(rows[duel.k].c), b: name(rows[duel.k + 1].c), pos: String(duel.k + 1), pts: pts(duel.d) };
      out.push(fillCopy(duel.d === 0 ? c.noteDuelTie : c.noteDuel, v));
    }
    let climb: { idx: number; gain: number } | null = null;
    rows.forEach((r, idx) => {
      const gain = r.p ? r.p - (idx + 1) : 0;
      if (gain > 0 && (!climb || gain > climb.gain)) climb = { idx, gain };
    });
    if (climb) {
      const cl = climb as { idx: number; gain: number };
      const r = rows[cl.idx];
      out.push(fillCopy(c.noteClimber, { name: name(r.c), from: String(r.p), to: String(cl.idx + 1) }));
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // ---------- join form + card ----------
  const countries = useMemo(
    () => [...JOIN_COUNTRIES].sort((a, b) => name(a).localeCompare(name(b), lang)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [error, setError] = useState('');
  const [canShare, setCanShare] = useState(false);
  const joined = status === 'success' || status === 'already';

  useEffect(() => {
    // Preselect the reader's country from the browser locale; a guess, never a requirement.
    // English has no single country, so an English page without a region stays unselected.
    const fromLocale = (navigator.languages || [navigator.language])
      .map((l) => (l.split('-')[1] || '').toUpperCase())
      .find((r) => JOIN_COUNTRIES.includes(r));
    const byLang: Partial<Record<Lang, string>> = {
      fi: 'FI', sv: 'SE', de: 'DE', ja: 'JP', ko: 'KR', 'zh-CN': 'CN', 'pt-BR': 'BR', nl: 'NL', it: 'IT', fr: 'FR', es: 'ES',
    };
    const guess = fromLocale ?? byLang[lang];
    if (guess) setCountry(guess);
    try {
      const probe = new File([''], 'x.png', { type: 'image/png' });
      setCanShare(Boolean(navigator.canShare?.({ files: [probe] })));
    } catch { setCanShare(false); }
  }, [lang]);

  const funnel = { surface: 'fanclub', lang };
  const formRef = useRef<HTMLElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((en) => {
      if (en.some((e) => e.isIntersecting)) { track('nl_view', funnel); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onStart = () => { if (!started.current) { started.current = true; track('nl_start', funnel); } };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const reason = !country ? 'country' : !email ? 'email' : !consented ? 'consent' : '';
    if (reason) {
      setError(reason === 'country' ? c.errCountry : reason === 'email' ? c.errEmail : c.errConsent);
      track('nl_blocked', { ...funnel, reason });
      return;
    }
    setStatus('loading');
    setError('');
    track('nl_submit', { ...funnel, country });
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          email, source: SOURCE, site: 'laplandblog', language: lang, channel: `fanclub:${country}`,
          consent: true, ageConfirmed: true, consentText: c.consent,
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || String(res.status));
      setStatus(out.alreadySubscribed ? 'already' : 'success');
      track('nl_success', { ...funnel, country, ...(out.alreadySubscribed ? { already: true } : {}) });
      if (!out.alreadySubscribed) trackNewsletterSignup(SOURCE);
    } catch (err) {
      console.error('Fan club signup error:', err);
      setStatus('error');
      setError(c.errGeneric);
      track('nl_error', funnel);
    }
  };

  const since = fillCopy(c.cardSince, { month: monthYear(lang, new Date()) });
  const cardCountry = country ? name(country) : '?';
  const cardFile = async () => {
    const blob = await drawCard(cardCountry, since, c.cardTitle);
    return blob ? new File([blob], `lapland-fan-card-${country.toLowerCase()}.png`, { type: 'image/png' }) : null;
  };
  const save = async () => {
    const f = await cardFile();
    if (!f) return;
    const url = URL.createObjectURL(f);
    const a = document.createElement('a');
    a.href = url; a.download = f.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };
  const share = async () => {
    const f = await cardFile();
    if (!f) return;
    try {
      await navigator.share({ files: [f], text: fillCopy(c.shareText, { country: cardCountry }), url: canonicalUrl('/fan-league') });
    } catch { /* closed the share sheet */ }
  };

  const stories: { slug: string; kicker: string }[] = [
    { slug: 'the-night-the-sky-broke-open-over-kemi', kicker: c.kAurora },
    { slug: 'five-nights-in-a-forest-cabin', kicker: c.kCabin },
    { slug: 'the-sauna-thermometer-said-eighty-two', kicker: c.kSauna },
  ].filter((s) => POST_META[s.slug]);

  const h2 = 'font-display font-extrabold text-snow text-[clamp(1.75rem,3.6vw,2.4rem)] leading-tight tracking-tight';
  const lead = 'text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl text-pretty';

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* HERO: masthead above an own photograph (the sign carries its own lettering) */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-pink-300 font-bold text-sm tracking-[0.18em] uppercase">
            {c.kicker} <span className="text-slate-400 font-semibold normal-case tracking-normal ml-2">{monthOnly(lang, data.month)}</span>
          </p>
          {/* Full column width + balance (Vesa 23.10.: "miksi otsikko on kahdella rivillä kun se mahtuu yhdellekin"):
              one line is 960–1 139 px in 8 of 12 languages and the column is 1 152 px; the old max-w-4xl (896 px)
              forced a second line. nl/ja/ko need two lines, and balance splits them evenly. */}
          <h1 className="font-display font-extrabold text-[clamp(2.6rem,7vw,4.9rem)] leading-[1.02] tracking-tight mt-4 mb-5 text-balance">
            {c.h1}
          </h1>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-3xl text-pretty">
            {/* Non-breaking hyphen: "LaplandVibes-/sivustolla" broke at the hyphen (fi/de/sv/nl compounds). */}
            {fillCopy(c.lead, { sites: String(data.sites) })
              .replace(/LaplandVibes-/g, `LaplandVibes${String.fromCharCode(0x2011)}`)
              // A number stays with its word: "12 / kielellä" and "in 12 / talen" broke apart.
              .replace(/(\d) (?=\S)/g, `$1${String.fromCharCode(0xa0)}`)}
          </p>
        </div>
        <figure className="max-w-6xl mx-auto mt-10">
          <img
            src={`${HERO}-1600.webp`}
            srcSet={`${HERO}-960.webp 960w, ${HERO}-1600.webp 1600w, ${HERO}-2400.webp 2400w`}
            sizes="(min-width: 1152px) 1152px, 100vw"
            width={1600}
            height={901}
            alt={c.photoAlt}
            fetchPriority="high"
            className="w-full h-auto rounded-xl bg-night-light"
          />
          <figcaption className="mt-3 text-sm text-slate-400 leading-relaxed">
            {c.photoCaption} <span className="text-slate-500">{fillCopy(c.photoCredit, { date: fullDate(lang, new Date(PHOTO_DAY)) })}</span>
          </figcaption>
        </figure>
      </section>

      <PageBreadcrumb />

      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* MAP */}
          <section className="pt-16" aria-labelledby="fl-map">
            <h2 id="fl-map" className={h2}>{c.mapH2}</h2>
            <p className={`${lead} mt-3`}>{c.mapLead}</p>
            <div className="mt-6 bg-[radial-gradient(1200px_300px_at_50%_0%,rgba(52,211,153,0.07),transparent)]">
              <LeagueMap rows={rows} lang={lang} label={c.mapAria} />
            </div>
          </section>

          {/* TABLE + DESK NOTES */}
          <section className="pt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start" aria-labelledby="fl-table">
            <div>
              <h2 id="fl-table" className={h2}>{data.final ? c.tableH2Final : c.tableH2}</h2>
              <p className="text-slate-400 text-sm mt-2">
                {fillCopy(c.periodLine, { range: dayRange(lang, data.from, data.to), date: fullDate(lang, utc(data.updated)) })}{' '}
                {data.final ? c.finalNote : c.liveNote}
              </p>
              <table className="w-full mt-6 border-collapse tabular-nums">
                <thead>
                  <tr className="border-b-2 border-snow text-left text-xs font-semibold tracking-[0.12em] uppercase text-slate-400">
                    <th scope="col" className="pb-2.5 w-12">{c.thPos}</th>
                    <th scope="col" className="pb-2.5">{c.thCountry}</th>
                    <th scope="col" className="pb-2.5 text-right w-20">{c.thIndex}</th>
                    {hasMoves && <th scope="col" className="pb-2.5 text-right w-16">{c.thMove}</th>}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => {
                    const pos = idx + 1;
                    const move = r.p ? (r.p > pos ? 'up' : r.p < pos ? 'down' : 'same') : null;
                    return (
                      <tr key={r.c} className="border-b border-night-light text-lg">
                        <td className={`py-3 font-display font-extrabold ${pos <= 3 ? 'text-pink' : 'text-pink-300'}`}>{pos}</td>
                        <td className="py-3 font-display font-bold">{name(r.c)}</td>
                        <td className="py-3 text-right text-slate-300">{r.i}</td>
                        {hasMoves && (
                          <td className="py-3 text-right text-sm">
                            {move === 'up' && <span className="text-emerald-300" aria-label={fillCopy(c.moveUpAria, { n: String(r.p) })}>▲ {r.p! - pos}</span>}
                            {move === 'down' && <span className="text-slate-400" aria-label={fillCopy(c.moveDownAria, { n: String(r.p) })}>▼ {pos - r.p!}</span>}
                            {move === 'same' && <span className="text-slate-500" aria-label={c.moveSameAria}>–</span>}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">{c.footnote}</p>
            </div>
            <div className="lg:pt-1">
              <h2 className={h2}>{c.notesH2}</h2>
              <div className="mt-5 space-y-4">
                {notes.map((n) => <p key={n} className="text-slate-200 text-lg leading-relaxed">{n}</p>)}
                <p className="text-slate-300 leading-relaxed">{c.noteCall}</p>
              </div>
            </div>
          </section>

          {/* FAN CLUB: card + form */}
          <section ref={formRef} id="fan-club" className="pt-20 scroll-mt-24" aria-labelledby="fl-club">
            <h2 id="fl-club" className={h2}>{c.clubH2}</h2>
            <p className={`${lead} mt-3`}>{c.clubLead}</p>
            <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,420px)_1fr] items-center">
              <div className="py-4 md:py-6">
                <div
                  role="img"
                  aria-label={fillCopy(c.cardAria, { country: cardCountry })}
                  className="relative w-full max-w-[420px] aspect-[420/262] rounded-2xl overflow-hidden bg-night -rotate-3 shadow-[0_30px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)]"
                >
                  <img src={CARD_PHOTO} alt="" width={840} height={220} loading="lazy" className="w-full h-[42%] object-cover" />
                  {!joined && (
                    <span className="absolute top-3 left-3 rounded bg-night/80 px-2 py-0.5 text-[11px] font-semibold text-slate-200">{c.cardPreview}</span>
                  )}
                  <div className="px-5 pt-3">
                    <p className="text-[11px] font-bold tracking-[0.22em] text-pink-300">{c.cardTitle}</p>
                    <p className="font-display font-extrabold text-[clamp(1.4rem,5vw,1.75rem)] leading-tight mt-1 truncate">{cardCountry}</p>
                    <p className="text-slate-400 text-[13px] mt-0.5">{since}</p>
                  </div>
                  <span className="absolute right-4 bottom-3 font-logo text-xl tracking-wide leading-none" aria-hidden="true">
                    <span className="text-pink">#</span>LAPLAND<span className="text-pink">.BLOG</span>
                  </span>
                </div>
              </div>

              {joined ? (
                <div aria-live="polite">
                  <p className="flex items-center gap-2 font-display font-extrabold text-2xl"><CheckCircle size={24} className="text-emerald-300" />{c.successH}</p>
                  <p className="text-slate-300 leading-relaxed mt-3 max-w-xl">{status === 'already' ? c.alreadyBody : c.successBody}</p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button type="button" onClick={save} data-umami-event="fancard_save"
                      className="lv-tap inline-flex items-center gap-2 rounded-full bg-pink-cta hover:bg-pink-dark px-6 py-3.5 font-display font-bold text-white">
                      <Download size={18} />{c.saveCard}
                    </button>
                    {canShare && (
                      <button type="button" onClick={share} data-umami-event="fancard_share"
                        className="lv-tap inline-flex items-center gap-2 rounded-full border border-slate-500 hover:border-snow px-6 py-3.5 font-display font-bold">
                        <Share2 size={18} />{c.shareCard}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="max-w-xl" onFocus={onStart}>
                  <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
                    <label className="block">
                      <span className="block text-sm font-semibold text-slate-300 mb-1.5">{c.countryLabel}</span>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} required
                        className="w-full rounded-lg bg-night-light border border-night-lighter px-3.5 py-3 text-base text-snow">
                        <option value="">{c.countryPlaceholder}</option>
                        {countries.map((cc) => <option key={cc} value={cc}>{name(cc)}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="block text-sm font-semibold text-slate-300 mb-1.5">{c.emailLabel}</span>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={c.emailPlaceholder}
                        autoComplete="email" required
                        className="w-full rounded-lg bg-night-light border border-night-lighter px-3.5 py-3 text-base text-snow placeholder:text-slate-500" />
                    </label>
                  </div>
                  <label className="flex items-start gap-3 mt-4 text-sm text-slate-300 leading-relaxed cursor-pointer">
                    <input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} className="mt-1 h-4 w-4 accent-pink-600 shrink-0" />
                    <span>{c.consent} <Link to={to('/privacy')} className="underline underline-offset-2 hover:text-snow">{c.privacy}</Link></span>
                  </label>
                  {error && <p role="alert" className="mt-3 text-sm text-pink-200">{error}</p>}
                  <button type="submit" disabled={status === 'loading'}
                    className="lv-tap mt-5 inline-flex items-center gap-2 rounded-full bg-pink-cta hover:bg-pink-dark disabled:opacity-70 px-7 py-3.5 font-display font-bold text-white">
                    {status === 'loading' ? <><Loader2 size={18} className="animate-spin" />{c.submitting}</> : c.submit}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* WRITE THE NEXT STORY */}
          <section className="pt-20 pb-24" aria-labelledby="fl-write">
            <h2 id="fl-write" className={h2}>{c.writeH2}</h2>
            <p className={`${lead} mt-3`}>{c.writeLead}</p>
            <ul className="mt-6 border-t-2 border-snow">
              {stories.map((s) => {
                const m = POST_META[s.slug];
                return (
                  <li key={s.slug} className="border-b border-night-light">
                    <Link to={to(`/post/${s.slug}`)} className="lv-tap group grid gap-1 sm:grid-cols-[150px_1fr_auto] sm:gap-6 py-4 sm:items-baseline">
                      <span className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-400">{s.kicker}</span>
                      <span className="font-display font-bold text-xl text-snow group-hover:text-pink-200">{m.title[lang] ?? m.title.en}</span>
                      <span className="text-pink-300 font-semibold inline-flex items-center gap-1">{c.readStory}<ArrowRight size={16} /></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-lg text-slate-200">
              {c.writeCtaLead}{' '}
              <Link to={to('/signin')} data-umami-event="fanleague_write_cta" className="lv-tap text-pink-300 font-bold hover:text-pink-200 inline-flex items-center gap-1">
                {c.writeCta}<ArrowRight size={18} />
              </Link>
            </p>
            {/* /finnish-bands links back here; both pages are there to bring readers to the blog. */}
            <p className="mt-4 text-lg text-slate-200">
              {COPY[lang].finnishBands.fromFanLeague}{' '}
              <Link to={to('/finnish-bands')} data-umami-event="fanleague_bands_cta" className="lv-tap text-pink-300 font-bold hover:text-pink-200 inline-flex items-center gap-1">
                {COPY[lang].finnishBands.fromFanLeagueCta}<ArrowRight size={18} />
              </Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
