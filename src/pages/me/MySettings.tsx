// /me/settings — author account controls.
// Magic-link auth has no password (so no "reset password" flow). What
// authors DO need: confirm email on file, request data export, delete
// their account. Self-serve email change requires Supabase auth UpdateUser
// + confirmation flow that we haven't wired yet — for now those go via
// mailto so a human at info@lapland.blog handles them.
//
// Phase 5+ — Vesa flagged that GDPR account deletion + data export
// must have a path before scaling user signups.

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  AtSign,
  Download,
  Trash2,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { useSeo, canonicalUrl } from '../../lib/seo';

interface ProfileBasics {
  handle: string;
  display_name: string;
  created_at: string;
}

export default function MySettings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileBasics | null>(null);
  const [postCount, setPostCount] = useState<number>(0);

  useSeo({
    title: 'Account settings · Lapland.blog',
    description: 'Your Lapland.blog account: email, account deletion and data export.',
    canonical: canonicalUrl('/me/settings'),
  });

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    async function run() {
      const { data: p } = await supabase
        .from('blog_profiles')
        .select('handle, display_name, created_at')
        .eq('id', user!.id)
        .maybeSingle();
      if (cancelled) return;
      if (p) setProfile(p as ProfileBasics);

      const { count } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact', head: true })
        .eq('author_id', user!.id);
      if (!cancelled && typeof count === 'number') setPostCount(count);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const email = user?.email ?? 'unknown@unknown';
  const handle = profile?.handle ?? '—';
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      })
    : '—';

  // Mailto helpers — pre-fills the support email so the team can verify
  // identity (signed-in email matches the From: header).
  const exportMailto = `mailto:info@lapland.blog?subject=${encodeURIComponent(
    'Data export request · Lapland.blog'
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'd like to request a copy of all the data Lapland.blog holds about my account.\n\nAccount email: ${email}\nHandle: @${handle}\n\nThank you.`
  )}`;
  const deleteMailto = `mailto:info@lapland.blog?subject=${encodeURIComponent(
    'Account deletion request · Lapland.blog'
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'd like to permanently delete my Lapland.blog account and all my entries.\n\nAccount email: ${email}\nHandle: @${handle}\n\nI understand this is irreversible. Please confirm once it's done.\n\nThank you.`
  )}`;
  const emailChangeMailto = `mailto:info@lapland.blog?subject=${encodeURIComponent(
    'Change email address · Lapland.blog'
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'd like to change the email address on my Lapland.blog account.\n\nCurrent email: ${email}\nHandle: @${handle}\nNew email: <please fill in>\n\nThank you.`
  )}`;

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/me"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to dashboard
          </Link>

          <Reveal>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
              Account
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-snow mb-3">
              Settings.
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-12 max-w-xl">
              Magic-link sign-in means there's no password to reset. The
              other account controls live below.
            </p>
          </Reveal>

          {/* Account summary */}
          <Reveal delay={1}>
            <div className="rounded-2xl border border-purple/25 bg-night-light/40 p-7 mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-aurora-blue font-bold mb-4">
                Your account
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
                <div>
                  <dt className="text-slate-400 mb-1 inline-flex items-center gap-1.5">
                    <Mail size={12} /> Email
                  </dt>
                  <dd className="text-snow font-semibold break-all">{email}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 mb-1 inline-flex items-center gap-1.5">
                    <AtSign size={12} /> Handle
                  </dt>
                  <dd className="text-snow font-semibold">
                    @{handle}
                    {profile && (
                      <Link
                        to={`/by/${handle}`}
                        className="ml-2 inline-flex items-center gap-1 text-aurora-blue text-xs hover:text-pink transition-colors"
                      >
                        view profile <ExternalLink size={11} />
                      </Link>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 mb-1">Member since</dt>
                  <dd className="text-snow font-semibold">{memberSince}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 mb-1">Entries</dt>
                  <dd className="text-snow font-semibold">{postCount}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Auth + security note */}
          <Reveal delay={2}>
            <div className="rounded-2xl border border-aurora-green/25 bg-aurora-green/5 p-7 mb-8">
              <div className="flex items-start gap-3 mb-3">
                <ShieldCheck size={18} className="text-aurora-green shrink-0 mt-1" />
                <div>
                  <h2 className="text-snow font-semibold text-base mb-1">
                    How sign-in works
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    No passwords. We email you a one-time magic link that
                    expires in one hour. If you misplace your sign-in email,
                    just request a new link from{' '}
                    <Link
                      to="/signin"
                      className="text-aurora-green hover:text-pink underline-offset-2 hover:underline"
                    >
                      /signin
                    </Link>
                    . Your account stays attached to the email on file.
                    Nobody else can sign in unless they have access to that
                    inbox.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Change email */}
          <Reveal delay={3}>
            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-7 mb-8">
              <h2 className="text-snow font-semibold text-base mb-2">
                Change email address
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Email-change goes through the team for verification. We'll
                confirm the new address and migrate your account.
              </p>
              <a
                href={emailChangeMailto}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-aurora-blue/45 bg-night-light/40 text-aurora-blue text-xs font-semibold uppercase tracking-[0.18em] hover:bg-night-light/70 transition-colors"
              >
                <Mail size={13} />
                Email info@lapland.blog
              </a>
            </div>
          </Reveal>

          {/* Data export */}
          <Reveal delay={4}>
            <div className="rounded-2xl border border-purple/25 bg-night-light/30 p-7 mb-8">
              <div className="flex items-start gap-3 mb-3">
                <Download size={18} className="text-aurora-blue shrink-0 mt-1" />
                <div>
                  <h2 className="text-snow font-semibold text-base mb-1">
                    Export your data (GDPR)
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    A copy of every entry, draft, profile field and image we
                    hold for your account. Delivered as JSON + a media zip
                    within seven days.
                  </p>
                </div>
              </div>
              <a
                href={exportMailto}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-aurora-blue/45 bg-night-light/40 text-aurora-blue text-xs font-semibold uppercase tracking-[0.18em] hover:bg-night-light/70 transition-colors"
              >
                Request my data
              </a>
            </div>
          </Reveal>

          {/* Delete account */}
          <Reveal delay={5}>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-7 mb-8">
              <div className="flex items-start gap-3 mb-3">
                <Trash2 size={18} className="text-red-400 shrink-0 mt-1" />
                <div>
                  <h2 className="text-snow font-semibold text-base mb-1">
                    Delete my account
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Permanent and irreversible. Removes your profile, all
                    entries (published and drafts), every uploaded image, and
                    the auth identity tied to <span className="font-semibold text-snow">{email}</span>.
                    The newsletter is a separate list. You can also unsubscribe
                    via{' '}
                    <Link
                      to="/unsubscribe"
                      className="text-red-300 hover:text-pink underline-offset-2 hover:underline"
                    >
                      /unsubscribe
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <a
                href={deleteMailto}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/45 bg-red-500/10 text-red-300 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={13} />
                Email deletion request
              </a>
            </div>
          </Reveal>

          {/* Sign out */}
          <Reveal delay={6}>
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.22em] font-semibold transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                Sign out of this device
              </button>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
