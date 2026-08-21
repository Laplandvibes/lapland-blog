// Node-side twin of src/lib/supabaseConfig.ts — same shared #LaplandVibes
// project, same public (role=anon) pair, same reason for the fallbacks.
//
// The prebuild scripts (generate-feeds, sync-post-meta-langs) read the database
// at build time. They used to require .env and exit(1) — and
// sync-post-meta-langs crashed with ENOENT before even getting that far —
// which meant `npm run build` could not complete in ANY environment without
// .env, including CI (.env is gitignored: `.env` + `.env.*`).
//
// process.env wins when set (CI secrets, shell), .env fills in locally, and the
// fallbacks keep a clean-clone build honest instead of half-generated. An unset
// CI secret arrives as an empty string, which falls through too.
//
// 🔴 Rotating the project or key means updating, together:
//   scripts/supabase-config.mjs (this file) · src/lib/supabaseConfig.ts
//   shared/Footer.tsx (CONTACT_ENDPOINT) · sibling sites' src/lib/supabase.ts
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=["']?(.+?)["']?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

export const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://oogioaxmfnqcbvjbcodh.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';
