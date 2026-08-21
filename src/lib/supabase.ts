// Supabase client for lapland.blog.
// Connects to the shared LaplandVibes Supabase project (oogioaxmfnqcbvjbcodh),
// which also hosts the newsletter `leads` table. Treat that table as sacred —
// this module only ever reads/writes `blog_*` tables and `auth.users` via supabase.auth.

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig';

// 🔴 Do NOT read import.meta.env here again. It used to, with `?? ''` as the
// only guard — but createClient('', '') throws 'supabaseUrl is required.' at
// module load, so a build without .env (every clean-clone CI build; .env is
// gitignored) killed the entire blog, not just one fetch. The values and the
// rationale for their fallbacks live in ./supabaseConfig.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
  // i18n: a post exists once per language. `translation_of` points at the
  // original (EN) row; it is null on the original itself.
  lang: string | null;
  translation_of: string | null;
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
