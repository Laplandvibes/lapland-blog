import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';

export default function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy — Lapland.blog',
    description:
      'How Lapland.blog handles your data, cookies, analytics and newsletter subscriptions. Published by Lapeso Oy, Finland.',
    canonical: canonicalUrl('/privacy'),
  });

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-night-light/70 backdrop-blur-sm border border-pink/40">
            <div className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
              Legal
            </p>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-snow font-light tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm mb-12">Last updated: April 2026</p>

          <div className="space-y-10 text-slate-300 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">1. Controller</h2>
              <p>
                Lapeso Oy, Finland. Contact:{' '}
                <a
                  href="mailto:laplandvibe@gmail.com"
                  className="text-pink hover:text-pink-dark"
                >
                  laplandvibe@gmail.com
                </a>
                . Lapland.blog is part of the LaplandVibes publishing network operated
                by Lapeso Oy. This page explains how we handle data for lapland.blog
                specifically.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">2. Data We Collect</h2>
              <p>
                We collect anonymous analytics data via Google Analytics 4. If you
                subscribe to our newsletter, we store your email address securely in
                the shared LaplandVibes newsletter database. We do not collect any
                other personally identifiable information unless you contact us
                directly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">3. Cookies</h2>
              <p>
                Lapland.blog uses cookies to improve your browsing experience and to
                collect anonymous analytics data. These include:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>
                  <strong className="text-snow">Essential cookies</strong> — required
                  for the website to function properly.
                </li>
                <li>
                  <strong className="text-snow">Analytics cookies</strong> — used by
                  Google Analytics to understand how visitors interact with the site.
                  These cookies collect information anonymously.
                </li>
              </ul>
              <p className="mt-3">
                Analytics cookies are only placed after you give consent via the
                cookie banner. You can decline at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">
                4. Google Analytics
              </h2>
              <p>
                We use Google Analytics 4 with Consent Mode v2. If you decline
                cookies, no analytics data is collected. If you accept, anonymous
                usage data (pages viewed, time on site, general location by country)
                is sent to Google. No personal data is included.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">
                5. Newsletter (shared LaplandVibes infrastructure)
              </h2>
              <p>
                If you subscribe to our newsletter, your email address is stored
                securely in the shared LaplandVibes newsletter database (Supabase,
                EU region) and delivered via Resend. Every signup is tagged with its
                source site — for lapland.blog the tag is{' '}
                <code className="text-pink">laplandblog-website</code> — for analytics
                only. We do not sell or share this data. You can unsubscribe at any
                time using the link in every email or via our{' '}
                <Link to="/unsubscribe" className="text-pink hover:text-pink-dark">
                  unsubscribe page
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">6. Data Retention</h2>
              <p>
                Analytics data is retained for 14 months in Google Analytics.
                Newsletter emails are retained until you unsubscribe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">7. Third Parties</h2>
              <p>
                We use Google Analytics (analytics), Supabase (database hosting,
                EU region) and Resend (newsletter delivery). We do not sell, share
                or transfer your data to any other third parties. We do not use
                advertising networks or tracking pixels.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">
                8. Your Rights Under GDPR
              </h2>
              <p>
                As we operate from Finland and serve visitors from the European
                Union, the GDPR applies. You have the right to access, rectify, or
                delete any data we hold about you. Contact us at{' '}
                <a
                  href="mailto:laplandvibe@gmail.com"
                  className="text-pink hover:text-pink-dark"
                >
                  laplandvibe@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-snow tracking-wide mb-3">9. Editorial Policy</h2>
              <p>
                Lapland.blog is a personal travel blog. Everything published here
                reflects the author's own experience. We do not accept paid posts,
                sponsored content or affiliate incentives. Any factual errors can be
                reported to the email above and will be corrected.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-medium"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
