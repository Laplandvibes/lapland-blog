// /me/settings — account controls: sign-in explained, email change, data
// export (GDPR art. 20) and account deletion (art. 17). The three requests go
// by email to info@laplandvibes.com, pre-filled so the team can verify the
// sender against the account email. Localised 2026-11-05 (was English only).

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Download, Trash2, ShieldCheck, LogOut, ArrowLeft } from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { useSeo } from '../../lib/seo';
import { useLang, useLocalePath } from '../../i18n/useLang';
import { ME_COPY, fill, intlLocale } from '../../locales/me';

interface ProfileBasics {
  handle: string;
  created_at: string;
}

const SUPPORT = 'info@laplandvibes.com';

export default function MySettings() {
  const lang = useLang();
  const to = useLocalePath();
  const t = ME_COPY[lang].settings;
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileBasics | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);

  useSeo({ title: t.metaTitle, description: t.lead });

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    void (async () => {
      const { data: p } = await supabase.from('blog_profiles').select('handle, created_at').eq('id', user.id).maybeSingle();
      const { count } = await supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('author_id', user.id);
      if (cancelled) return;
      if (p) setProfile(p as ProfileBasics);
      if (typeof count === 'number') setPostCount(count);
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const email = user?.email ?? '';
  const handle = profile?.handle ?? '';
  const memberSince = profile?.created_at
    ? new Intl.DateTimeFormat(intlLocale(lang), { month: 'long', year: 'numeric' }).format(new Date(profile.created_at))
    : '';
  const mail = (subject: string, body: string) =>
    `mailto:${SUPPORT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fill(body, { email, handle }))}`;

  const sections = [
    { icon: Mail, title: t.changeEmailTitle, body: t.changeEmailBody, href: mail(t.mailChangeSubject, t.mailChangeBody), cta: t.emailButton },
    { icon: Download, title: t.exportTitle, body: t.exportBody, href: mail(t.mailExportSubject, t.mailExportBody), cta: t.exportButton },
    { icon: Trash2, title: t.deleteTitle, body: t.deleteBody, href: mail(t.mailDeleteSubject, t.mailDeleteBody), cta: t.deleteButton },
  ];

  return (
    <div className="min-h-screen bg-night text-snow flex flex-col">
      <Nav />
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link to={to('/me')} className="lv-tap inline-flex items-center gap-1.5 text-sm font-semibold text-pink-300 hover:text-snow">
            <ArrowLeft size={15} /> {t.back}
          </Link>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mt-4 mb-3 text-center lg:text-left">{t.h1}</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">{t.lead}</p>

          <section className="rounded-2xl border border-slate-700 bg-night-light/50 p-6 mb-6">
            <h2 className="font-display font-bold text-xl mb-4">{t.account}</h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-base">
              <div>
                <dt className="text-sm text-slate-400">{t.email}</dt>
                <dd className="font-semibold break-all">{email}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">{t.address}</dt>
                <dd className="font-semibold break-all">
                  {handle ? (
                    <Link to={to(`/by/${handle}`)} className="hover:text-pink-300">
                      lapland.blog/by/{handle}
                    </Link>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">{t.memberSince}</dt>
                <dd className="font-semibold">{memberSince}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">{t.entries}</dt>
                <dd className="font-semibold">{postCount ?? ''}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-700 bg-night-light/30 p-6 mb-6 flex gap-4">
            <ShieldCheck size={22} className="text-pink-300 shrink-0 mt-1" />
            <div>
              <h2 className="font-display font-bold text-xl mb-2">{t.signInTitle}</h2>
              <p className="text-slate-300 leading-relaxed">{t.signInBody}</p>
            </div>
          </section>

          {sections.map(({ icon: Icon, title, body, href, cta }) => (
            <section key={title} className="rounded-2xl border border-slate-700 bg-night-light/30 p-6 mb-6">
              <div className="flex gap-4">
                <Icon size={22} className="text-pink-300 shrink-0 mt-1" />
                <div>
                  <h2 className="font-display font-bold text-xl mb-2">{title}</h2>
                  <p className="text-slate-300 leading-relaxed mb-4">{body}</p>
                  <a href={href} className="h-11 px-5 rounded-full border border-slate-500 inline-flex items-center gap-2 text-sm font-semibold hover:border-snow">
                    {cta}
                  </a>
                </div>
              </div>
            </section>
          ))}

          <button
            type="button"
            onClick={() => void signOut().then(() => navigate(to('/')))}
            className="h-12 px-6 rounded-full border border-slate-500 inline-flex items-center gap-2 font-semibold hover:border-snow"
          >
            <LogOut size={16} /> {t.signOut}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
