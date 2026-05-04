// Supabase client for lapland.blog.
// Connects to the shared LaplandVibes Supabase project (oogioaxmfnqcbvjbcodh),
// which also hosts the newsletter `leads` table. Treat that table as sacred —
// this module only ever reads/writes `blog_*` tables and `auth.users` via supabase.auth.

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

if (!url || !anonKey) {
  // Fail loud in dev, quietly in prod (so the site still builds).
  // eslint-disable-next-line no-console
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. ' +
      'Check your .env file.'
  );
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'lapland-blog-auth',
  },
});

// ─── Admin whitelist (client-side UX only — server enforces via RLS) ─────────
export const ADMIN_EMAIL = 'laplandvibe@gmail.com';

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}

// ─── Shared row types mirroring the `blog_posts` table ───────────────────────
export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  kicker: string | null;
  excerpt: string | null;
  category_slug: string;
  tags: string[] | null;
  hero_image: string | null;
  hero_alt: string | null;
  content: unknown; // jsonb — PostBlock[]
  author_id: string | null;
  author_snapshot: {
    handle: string;
    display_name: string;
    avatar_url: string | null;
  };
  status: 'draft' | 'published';
  published_at: string | null;
  featured: boolean;
  read_time_minutes: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  // Trip metadata (Phase 2)
  visit_date: string | null;
  location: string | null;
  weather_note: string | null;
  stay_type: string | null;
}
