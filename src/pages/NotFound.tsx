import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';

export default function NotFound() {
  useSeo({
    title: 'Not found — Lapland.blog',
    description:
      "This page doesn't exist. It might have been moved, renamed, or lost in the snow.",
    canonical: canonicalUrl('/404'),
  });

  return (
    <div className="min-h-screen bg-night text-snow flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-4 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[520px] h-[520px] rounded-full bg-pink/10 blur-[160px] pointer-events-none animate-hero-pulse" />

        <div className="relative max-w-lg text-center">
          <Compass
            className="w-14 h-14 text-pink mx-auto mb-6 animate-soft-float"
            strokeWidth={1.5}
          />
          <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
            Not found · 404
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-snow font-light tracking-tight mb-5 leading-tight">
            Lost in the snow.
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10">
            This page doesn't exist — or it doesn't exist yet. Either way, the
            rest of the blog is this way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink text-white font-semibold hover:bg-pink-dark transition-colors"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-aurora-blue/50 text-aurora-blue hover:bg-aurora-blue/10 hover:border-aurora-blue transition-colors"
            >
              All stories →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
