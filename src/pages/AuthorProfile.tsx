// /by/:handle — public author profile page.
// Shows display_name + bio + avatar + every published trip-blog entry the
// author has written. RLS already grants public SELECT on blog_profiles
// (policy 'public read profiles' qual=true). Empty-state encourages
// visitors to start their own blog.
//
// Phase 5 deliverable. Per author handle, /by/anna or /by/maria etc.

import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabase';
import type { BlogPostRow } from '../lib/supabase';
import { rowToPost } from '../lib/postAdapter';
import type { Post } from '../data/posts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, breadcrumbSchema } from '../lib/jsonld';
import { useLocalePath } from '../i18n/useLang';

interface Profile {
  id: string;
  handle: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

export default function AuthorProfile() {
  const { handle } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const lp = useLocalePath();

  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    const lower = handle.toLowerCase();

    async function run() {
      setLoading(true);
      const { data: pData } = await supabase
        .from('blog_profiles')
        .select('id, handle, display_name, bio, avatar_url, role, created_at')
        .eq('handle', lower)
        .maybeSingle();

      if (cancelled) return;

      if (!pData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const p = pData as Profile;
      setProfile(p);

      const { data: postsData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .eq('author_id', p.id)
        .order('published_at', { ascending: false });

      if (!cancelled) {
        setPosts(((postsData ?? []) as BlogPostRow[]).map(rowToPost));
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [handle]);

  useSeo({
    title: profile
      ? `${profile.display_name} (@${profile.handle}) · Lapland.blog`
      : 'Author · Lapland.blog',
    description: profile?.bio
      ? `${profile.display_name} on Lapland.blog. ${profile.bio.slice(0, 130)}`
      : `${profile?.display_name ?? 'An author'} on Lapland.blog. Trip-blog entries from Finnish Lapland.`,
    canonical: profile ? canonicalUrl(`/by/${profile.handle}`) : undefined,
  });

  useJsonLd(
    'author-breadcrumb',
    profile
      ? breadcrumbSchema([
          { name: 'Home', url: canonicalUrl('/') },
          { name: 'Authors', url: canonicalUrl('/destinations') },
          { name: profile.display_name, url: canonicalUrl(`/by/${profile.handle}`) },
        ])
      : { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [] }
  );

  if (notFound) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/25 to-night" />
        <div className="absolute top-1/3 left-1/3 w-[420px] h-[420px] rounded-full bg-aurora-blue/15 blur-[140px] pointer-events-none animate-soft-float" />
        <div className="relative max-w-4xl mx-auto">
          <Link
            to={lp('/destinations')}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Lapland.blog
          </Link>

          {loading && !profile ? (
            <div className="h-32 flex items-center">
              <div className="w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
            </div>
          ) : profile ? (
            <Reveal>
              <div className="flex items-start gap-6">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border border-purple/30"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-night-light/70 border border-purple/30 flex items-center justify-center font-display text-2xl text-snow">
                    {initials(profile.display_name)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-pink tracking-[0.3em] text-[10px] font-bold uppercase mb-2">
                    @{profile.handle}
                  </p>
                  <h1 className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight text-snow mb-3">
                    {profile.display_name}
                  </h1>
                  {profile.bio && (
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                      {profile.bio}
                    </p>
                  )}
                  <p className="mt-3 inline-flex items-center gap-1.5 text-slate-400 text-xs">
                    <Calendar size={12} />
                    Writing since {new Date(profile.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 mb-12" />

      {/* Posts list */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16" aria-labelledby="entries-heading">
        <div className="max-w-6xl mx-auto">
          <h2
            id="entries-heading"
            className="font-display text-2xl md:text-3xl font-light tracking-tight text-snow mb-8"
          >
            {posts.length === 0
              ? 'No published entries yet.'
              : posts.length === 1
                ? '1 entry'
                : `${posts.length} entries`}
          </h2>

          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6}>
                  <PostCard post={p} variant="dark" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-purple/20 bg-night-light/30 p-10 text-center max-w-2xl mx-auto">
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {profile?.display_name ?? 'This author'} hasn't published an entry
                yet. The drafts are probably in a forest cabin somewhere with no
                wifi.
              </p>
              <Link
                to={lp('/signin')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink text-white font-semibold uppercase tracking-[0.18em] text-xs hover:bg-pink-dark transition-colors"
              >
                Start your own
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Cross-sell — even an empty author page must offer the visitor a path. */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-pink-300 tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
              While you're here
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-snow mb-3">
              Read what others wrote.
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-7 max-w-xl mx-auto">
              The editor's picks, the destinations, and the seed entries from
              The Field Journal. All curated.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={lp('/top-reads')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink text-white font-semibold uppercase tracking-[0.18em] text-xs hover:bg-pink-dark transition-colors"
              >
                Top reads
                <ArrowRight size={14} />
              </Link>
              <Link
                to={lp('/destinations')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-night-light/60 border border-aurora-blue/40 text-pink-300 font-semibold uppercase tracking-[0.18em] text-xs hover:bg-night-light/80 hover:text-pink-200 transition-colors"
              >
                Destinations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

function initials(name: string): string {
  return (
    name
      .split(/[\s.@_-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() ?? '')
      .join('') || '·'
  );
}
