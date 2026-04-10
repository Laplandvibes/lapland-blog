import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  User as UserIcon,
  BookOpen as BookOpenIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const links = [
  { to: '/stories', label: 'Stories' },
  { to: '/category/aurora', label: 'Aurora' },
  { to: '/category/cabins', label: 'Cabins' },
  { to: '/category/seasons', label: 'Seasons' },
  { to: '/about', label: 'About' },
];

/**
 * Sticky site navigation.
 * Switches to a light editorial variant on /post/* and /about routes so the
 * reading experience doesn't ship a dark bar on top of a cream page.
 */
export default function Nav({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  // Editorial (light) variant on reading pages
  const isEditorial = pathname.startsWith('/post/') || pathname === '/about';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  // Close account dropdown on outside click
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

  // ── Style maps per theme ─────────────────────────────────────────────────
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
  const logoDotColor = isEditorial
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

  // Avatar initials / image
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-300 ${wrapCls}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Lapland.blog — home"
          onClick={() => setOpen(false)}
        >
          <span
            className={`font-display text-[1.6rem] font-light leading-none italic transition-colors ${logoDotColor}`}
          >
            .
          </span>
          <span
            className={`font-display text-xl font-medium tracking-tight transition-colors ${logoWordColor}`}
          >
            lapland
            <span
              className={`${
                isEditorial ? 'text-[var(--color-accent)]' : 'text-pink'
              } mx-0.5`}
            >
              .
            </span>
            blog
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm" aria-label="Primary">
          {!minimal && links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative tracking-wider uppercase text-xs font-semibold transition-colors py-1 ${
                  isActive ? linkActive : linkBase
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

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
                    Signed in as
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
                    My trip blog
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
                      Admin dashboard
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
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          {!user && !minimal && (
            <Link
              to="/signin"
              className={
                isEditorial
                  ? 'ml-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] transition-colors'
                  : 'ml-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink text-white hover:bg-pink-dark transition-colors'
              }
            >
              Start your blog
            </Link>
          )}
        </nav>

        {!minimal && (
          <button
            className={`md:hidden transition-colors ${mobileBtnCls}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {open && (
        <div className={`md:hidden ${mobileDrawerCls}`}>
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
                to="/signin"
                className={`tracking-wider uppercase text-sm font-semibold transition-colors ${
                  isEditorial
                    ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
                    : 'text-slate-200 hover:text-pink'
                }`}
              >
                Sign in
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
                    Signed in as
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
                  My trip blog
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
                    Admin dashboard
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
                  Sign out
                </button>
              </>
            )}

            <Link
              to="/#newsletter"
              className={
                isEditorial
                  ? 'mt-2 text-center px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-accent)] text-white'
                  : 'mt-2 text-center px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink text-white'
              }
            >
              Subscribe
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
