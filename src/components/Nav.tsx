import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  User as UserIcon,
  BookOpen as BookOpenIcon,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLang, useLocalePath, stripLocale, LANG_PREFIX } from '../i18n/useLang';
import type { Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import EcosystemMenu from '../../../shared/EcosystemMenu';

const ALL_LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'fi', label: 'FI', native: 'Suomi' },
  { code: 'de', label: 'DE', native: 'Deutsch' },
  { code: 'ja', label: 'JA', native: '日本語' },
  { code: 'es', label: 'ES', native: 'Español' },
  { code: 'pt-BR', label: 'BR', native: 'Português' },
  { code: 'zh-CN', label: 'CN', native: '简体中文' },
  { code: 'ko', label: 'KR', native: '한국어' },
  { code: 'fr', label: 'FR', native: 'Français' },
  { code: 'it', label: 'IT', native: 'Italiano' },
  { code: 'nl', label: 'NL', native: 'Nederlands' },
];

/**
 * Sticky site navigation.
 * Switches to a light editorial variant on /post/* and /about routes so the
 * reading experience doesn't ship a dark bar on top of a cream page.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const langWrapRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;

  const links = [
    { to: to('/start-here'), label: c.startHere },
    { to: to('/top-reads'), label: c.topReads },
    { to: to('/destinations'), label: c.destinations },
    { to: to('/stories'), label: c.tripDiaries },
    { to: to('/about'), label: c.about },
  ];

  // Editorial (light) variant on reading pages — match any locale prefix.
  const isEditorial =
    /^\/(?:fi|de)?\/?post\//.test(pathname) ||
    pathname === '/about' ||
    pathname === '/fi/about' ||
    pathname === '/de/about';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!langWrapRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  useEffect(() => {
    if (!accountOpen) return;
    function onDocClick(e: MouseEvent) {
      if (!accountRef.current) return;
      if (!accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [accountOpen]);

  // Language switching — also persists the choice so future / auto-redirects
  // pick the same locale.
  const switchTo = (target: Lang) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('lv_locale_choice', target);
    }
    const bare = stripLocale(pathname);
    const prefix = LANG_PREFIX[target];
    if (!prefix) {
      navigate(bare);
    } else {
      navigate(bare === '/' ? `/${prefix}` : `/${prefix}${bare}`);
    }
  };

  const wrapCls = isEditorial
    ? `${
        scrolled
          ? 'bg-[var(--color-cream)]/92 border-b border-[var(--color-paper-border)] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.12)]'
          : 'bg-[var(--color-cream)]/70 border-b border-transparent'
      }`
    : `${
        scrolled
          ? 'bg-night/85 border-b border-purple/25 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]'
          : 'bg-night/40 border-b border-transparent'
      }`;

  const logoWordColor = isEditorial ? 'text-[var(--color-ink)]' : 'text-snow';
  const logoAccentColor = isEditorial
    ? 'text-[var(--color-accent)]'
    : 'text-pink';
  const linkBase = isEditorial
    ? 'text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]'
    : 'text-slate-300 hover:text-pink';
  const linkActive = isEditorial ? 'text-[var(--color-accent)]' : 'text-pink';
  const mobileBtnCls = isEditorial
    ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
    : 'text-slate-200 hover:text-pink';

  const mobileDrawerCls = isEditorial
    ? 'border-t border-[var(--color-paper-border)] bg-[var(--color-cream)]/95 backdrop-blur-xl'
    : 'border-t border-purple/20 bg-night/95 backdrop-blur-xl';

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const avatarUrl =
    (meta.avatar_url as string | undefined) ??
    (meta.picture as string | undefined) ??
    null;
  const displayName =
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    user?.email ??
    'Reader';
  const initials = displayName
    .split(/[\s.@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('') || 'R';

  async function handleSignOut() {
    setAccountOpen(false);
    await signOut();
  }

  const currentLangLabel = ALL_LANGS.find((l) => l.code === lang)?.label ?? 'EN';

  const LangDropdown = () => (
    <div className="relative" ref={langWrapRef}>
      <button
        type="button"
        onClick={() => setLangOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        aria-label="Switch language"
        className={`flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors px-2 py-1 rounded-full border ${
          isEditorial
            ? 'text-[var(--color-ink)] border-[var(--color-paper-border)] hover:border-[var(--color-accent)]'
            : 'text-snow border-snow/40 hover:border-vibe-pink'
        }`}
      >
        <Globe className="w-3 h-3" />
        {currentLangLabel}
        <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
      </button>
      {langOpen && (
        <ul
          role="listbox"
          aria-label="Language"
          className={`absolute right-0 top-full mt-2 min-w-[180px] py-1 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto border ${
            isEditorial
              ? 'bg-[var(--color-cream)] border-[var(--color-paper-border)]'
              : 'bg-night/95 backdrop-blur-md border-purple/30'
          }`}
        >
          {ALL_LANGS.map((item) => {
            const isActive = item.code === lang;
            return (
              <li key={item.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => { switchTo(item.code); setLangOpen(false); }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? isEditorial
                        ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold'
                        : 'bg-vibe-pink/15 text-vibe-pink font-semibold'
                      : isEditorial
                        ? 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-accent)]'
                        : 'text-slate-200 hover:bg-night-light hover:text-pink'
                  }`}
                >
                  <span className="w-8 font-semibold text-xs tracking-wider">{item.label}</span>
                  <span>{item.native}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-300 ${wrapCls}`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={lang} currentDomain="lapland-blog" />
          <Link
            to={to('/')}
            className="group"
            aria-label="#LaplandBlog · home"
            onClick={() => setOpen(false)}
          >
            <span className="font-display tracking-wide text-xl md:text-2xl font-semibold uppercase leading-none flex items-baseline">
              <span className={`${logoAccentColor} transition-colors`}>#</span>
              <span className={`${logoWordColor} transition-colors`}>LAPLAND</span>
              <span className={`${logoAccentColor} transition-colors`}>.BLOG</span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-4 text-sm" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative whitespace-nowrap tracking-wider uppercase text-xs font-semibold transition-colors py-1 ${
                  isActive ? linkActive : linkBase
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Language switcher */}
          <div className="pl-3 ml-1 border-l border-purple/25">
            <LangDropdown />
          </div>

          {!user ? null : (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                aria-label="Account menu"
                className={`flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 transition-colors cursor-pointer ${
                  isEditorial
                    ? 'border-[var(--color-paper-border)] hover:border-[var(--color-accent)]'
                    : 'border-purple/40 hover:border-pink'
                }`}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    className={`text-[11px] font-bold tracking-wider ${
                      isEditorial
                        ? 'text-[var(--color-ink)] bg-[var(--color-cream-deep)] w-full h-full flex items-center justify-center'
                        : 'text-snow bg-night-light w-full h-full flex items-center justify-center'
                    }`}
                  >
                    {initials}
                  </span>
                )}
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden z-50 ${
                    isEditorial
                      ? 'bg-[var(--color-cream)] border border-[var(--color-paper-border)]'
                      : 'bg-night-light border border-purple/30'
                  }`}
                >
                  <div
                    className={`px-4 py-3 text-xs ${
                      isEditorial
                        ? 'text-[var(--color-ink-mute)] border-b border-[var(--color-paper-border)]'
                        : 'text-slate-400 border-b border-purple/20'
                    }`}
                  >
                    {c.signedInAs}
                    <div
                      className={`mt-0.5 truncate text-sm font-semibold ${
                        isEditorial ? 'text-[var(--color-ink)]' : 'text-snow'
                      }`}
                    >
                      {displayName}
                    </div>
                  </div>
                  <Link
                    to="/me"
                    role="menuitem"
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                      isEditorial
                        ? 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-accent)]'
                        : 'text-slate-200 hover:bg-night/60 hover:text-pink'
                    }`}
                  >
                    <BookOpenIcon size={14} />
                    {c.myTripBlog}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      role="menuitem"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                        isEditorial
                          ? 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-accent)]'
                          : 'text-slate-200 hover:bg-night/60 hover:text-pink'
                      }`}
                    >
                      <UserIcon size={14} />
                      {c.adminDashboard}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    role="menuitem"
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      isEditorial
                        ? 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-accent)]'
                        : 'text-slate-200 hover:bg-night/60 hover:text-pink'
                    }`}
                  >
                    <LogOut size={14} />
                    {c.signOut}
                  </button>
                </div>
              )}
            </div>
          )}

          {!user && (
            <Link
              to={to('/signin')}
              className={
                isEditorial
                  ? 'ml-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition-colors'
                  : 'ml-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink text-white hover:bg-pink-dark transition-colors'
              }
            >
              {c.startYourBlog}
            </Link>
          )}
        </nav>

        <div className="xl:hidden flex items-center gap-2">
            <select
              value={lang}
              onChange={(e) => switchTo(e.target.value as Lang)}
              aria-label="Language"
              className={`bg-transparent border rounded px-2 py-1 text-xs font-semibold uppercase ${isEditorial ? 'border-[var(--color-paper-border)] text-[var(--color-ink)]' : 'border-snow/40 text-snow'}`}
            >
              {ALL_LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <button
              className={`transition-colors ${mobileBtnCls}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
      </div>

      {open && (
        <div className={`xl:hidden ${mobileDrawerCls}`}>
          <nav
            className="flex flex-col px-6 py-5 gap-4"
            aria-label="Mobile primary"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`tracking-wider uppercase text-sm font-semibold transition-colors ${
                  isEditorial
                    ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
                    : 'text-slate-200 hover:text-pink'
                }`}
              >
                {link.label}
              </Link>
            ))}


            {!user ? (
              <Link
                to={to('/signin')}
                className={`tracking-wider uppercase text-sm font-semibold transition-colors ${
                  isEditorial
                    ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
                    : 'text-slate-200 hover:text-pink'
                }`}
              >
                {c.signIn}
              </Link>
            ) : (
              <>
                <div
                  className={`flex items-center gap-3 pt-3 border-t ${
                    isEditorial ? 'border-[var(--color-paper-border)]' : 'border-purple/20'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full overflow-hidden border ${
                      isEditorial ? 'border-[var(--color-paper-border)]' : 'border-purple/40'
                    }`}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span
                        className={`text-[11px] font-bold tracking-wider w-full h-full flex items-center justify-center ${
                          isEditorial
                            ? 'text-[var(--color-ink)] bg-[var(--color-cream-deep)]'
                            : 'text-snow bg-night-light'
                        }`}
                      >
                        {initials}
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs ${
                      isEditorial ? 'text-[var(--color-ink-mute)]' : 'text-slate-400'
                    }`}
                  >
                    {c.signedInAs}
                    <div
                      className={`text-sm font-semibold truncate max-w-[180px] ${
                        isEditorial ? 'text-[var(--color-ink)]' : 'text-snow'
                      }`}
                    >
                      {displayName}
                    </div>
                  </div>
                </div>
                <Link
                  to="/me"
                  className={`tracking-wider uppercase text-sm font-semibold transition-colors ${
                    isEditorial
                      ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
                      : 'text-slate-200 hover:text-pink'
                  }`}
                >
                  {c.myTripBlog}
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`tracking-wider uppercase text-sm font-semibold transition-colors ${
                      isEditorial
                        ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
                        : 'text-slate-200 hover:text-pink'
                    }`}
                  >
                    {c.adminDashboard}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={`text-left tracking-wider uppercase text-sm font-semibold transition-colors cursor-pointer ${
                    isEditorial
                      ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
                      : 'text-slate-200 hover:text-pink'
                  }`}
                >
                  {c.signOut}
                </button>
              </>
            )}

            <Link
              to={`${to('/')}#newsletter`}
              className={
                isEditorial
                  ? 'mt-2 text-center px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-accent)] text-white'
                  : 'mt-2 text-center px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink text-white'
              }
            >
              {c.subscribe}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
