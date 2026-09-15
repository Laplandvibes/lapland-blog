import { Link } from 'react-router-dom';
import { MapPin, PenLine, Share2, Check, X } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function About() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].about;

  useSeo({
    title: c.pageTitle,
    description: c.pageDescription,
    image: 'https://lapland.blog/og/page-about.jpg',
    canonical: canonicalUrl('/about'),
  });

  useJsonLd('website', websiteSchema());
  useJsonLd(
    'about',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'About', url: canonicalUrl('/about') },
    ])
  );

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* HERO — otsikko kuvan päälle, ei erillistä laatikkoa (sama malli kuin
          Aloita tästä ja Kohteet). */}
      <header className="relative pt-16">
        <div className="relative min-h-[58vh] md:min-h-[64vh] flex items-center overflow-hidden">
          <picture>
            <source srcSet="/images/aside-vesa-1200.avif" type="image/avif" />
            <img
              src="/images/aside-vesa-1200.webp"
              alt="Yksinäinen kulkija otsalampun kanssa suuren revontulikaaren alla Lapin tunturissa"
              className="absolute inset-0 w-full h-full object-cover object-[50%_38%]"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={800}
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.6) 45%, rgba(15,23,42,0.3) 100%)' }}
          />
          <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-pink tracking-[0.32em] text-[11px] font-bold uppercase mb-5">{c.eyebrow}</p>
              <h1
                className="text-snow leading-[1.05] tracking-[-0.015em] text-[clamp(2.25rem,5.5vw,3.75rem)] mb-5 hero-text-shadow"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800 }}
              >
                {c.h1}
              </h1>
              <p className="text-slate-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto hero-text-shadow-sm">
                {c.lead}
              </p>
            </div>
          </div>
        </div>
      </header>

      <PageBreadcrumb />

      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        {/* 1. Mikä tämä on — yksi kappale, ei tekstiseinää */}
        <section className="max-w-3xl mx-auto pt-14 md:pt-20">
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed">{c.intro}</p>
        </section>

        {/* 2. Näin se toimii — kolme korttia samalla syvyydellä kuin etusivulla */}
        <section className="max-w-5xl mx-auto mt-16 md:mt-20">
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-10 text-center">
            {c.howHeading}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { Icon: MapPin, body: c.howStepPin },
              { Icon: PenLine, body: c.howStepWrite },
              { Icon: Share2, body: c.howStepShare },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl p-6 border border-slate-400/15 bg-gradient-to-b from-slate-800/90 to-[#111A2E]/90 shadow-[0_18px_40px_-24px_rgba(2,6,23,0.85)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-pink/15 border border-pink/40 flex items-center justify-center">
                    <step.Icon size={18} className="text-pink" />
                  </span>
                  <span className="text-slate-400 text-xs font-bold tracking-[0.3em]">0{i + 1}</span>
                </div>
                <p className="text-slate-300 text-[0.95rem] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-base leading-relaxed mt-8 max-w-3xl mx-auto">{c.howBody}</p>
        </section>

        {/* 3. Mikä on ilmaista / mitä et löydä */}
        <section className="max-w-5xl mx-auto mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl p-7 border border-slate-400/15 bg-gradient-to-b from-slate-800/90 to-[#111A2E]/90 shadow-[0_18px_40px_-24px_rgba(2,6,23,0.85)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-pink/15 flex items-center justify-center">
                <Check size={16} className="text-pink" />
              </span>
              <h3 className="font-display text-xl text-snow">{c.freeHeading}</h3>
            </div>
            <p className="text-slate-300 text-[0.95rem] leading-relaxed">{c.freeBody}</p>
          </div>
          <div className="rounded-2xl p-7 border border-slate-400/15 bg-gradient-to-b from-slate-800/90 to-[#111A2E]/90 shadow-[0_18px_40px_-24px_rgba(2,6,23,0.85)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-600/40 flex items-center justify-center">
                <X size={16} className="text-slate-300" />
              </span>
              <h3 className="font-display text-xl text-snow">{c.notHeading}</h3>
            </div>
            <p className="text-slate-300 text-[0.95rem] leading-relaxed">{c.notBody}</p>
          </div>
        </section>

        {/* 4. Mistä sivun jutut tulevat */}
        <section className="max-w-3xl mx-auto mt-14">
          <div className="rounded-2xl border-l-2 border-pink pl-6 py-2">
            <p className="text-pink text-[10px] uppercase tracking-[0.32em] font-bold mb-3">{c.seedHeading}</p>
            <p className="text-slate-300 text-[0.95rem] leading-relaxed">{c.seedBody}</p>
          </div>
        </section>

        {/* 5. Verkosto ja yhteystiedot rinnakkain */}
        <section className="max-w-5xl mx-auto mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl p-7 border border-slate-400/15 bg-gradient-to-b from-slate-800/90 to-[#111A2E]/90 shadow-[0_18px_40px_-24px_rgba(2,6,23,0.85)]">
            <h3 className="font-display text-xl text-snow mb-3">{c.networkHeading}</h3>
            <p className="text-slate-300 text-[0.95rem] leading-relaxed">{c.networkBody}</p>
          </div>
          <div className="rounded-2xl p-7 border border-slate-400/15 bg-gradient-to-b from-slate-800/90 to-[#111A2E]/90 shadow-[0_18px_40px_-24px_rgba(2,6,23,0.85)]">
            <h3 className="font-display text-xl text-snow mb-3">{c.contactHeading}</h3>
            <p className="text-slate-300 text-[0.95rem] leading-relaxed">{c.contactBody}</p>
          </div>
        </section>

        {/* 6. Lopetus + CTA */}
        <section className="max-w-3xl mx-auto mt-14 text-center">
          <p className="text-slate-400 text-base italic leading-relaxed mb-8">{c.closing}</p>
          <Link
            to={to('/signin')}
            className="inline-block px-7 py-3.5 rounded-full bg-pink-cta text-white font-semibold uppercase tracking-wider text-xs hover:bg-pink transition-colors"
          >
            {c.ctaPrimary}
          </Link>
          <p className="text-slate-400 text-sm mt-5">
            {c.ctaSecondary}{' '}
            <Link to={to('/stories')} className="text-pink-300 hover:text-snow underline underline-offset-4 transition-colors">
              {c.ctaSecondaryLink}
            </Link>
          </p>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
