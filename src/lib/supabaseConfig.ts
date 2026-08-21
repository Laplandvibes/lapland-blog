// Shared #LaplandVibes Supabase backend for lapland.blog (anon/publishable pair).
//
// One dependency-free module on purpose: the newsletter surfaces (inline form,
// shared popup, /unsubscribe) call the Edge Functions with plain fetch and must
// not pull @supabase/supabase-js into their chunks just to learn the host.
// src/lib/supabase.ts (the real client) reads its values from here too, so the
// project is configured in exactly one place.
//
// 🔴 The fallbacks are load-bearing, not a convenience. .env is gitignored here
// (.gitignore: `.env` + `.env.*`), so any build from a clean clone —
// .github/workflows/deploy.yml — compiles import.meta.env.VITE_* to undefined.
// On this site that is worse than a dead newsletter: createClient('', '') throws
// at module load, so the whole blog would render a blank page. Env still wins
// when present, and '' from an unset CI secret falls through to the fallback too.
//
// 🔴 This deliberately diverges from the app's 2026-08-18 decision
// (memory: appi_kuoli_hiljaa_env_puuttui_buildista_20260818), which rejected a
// runtime fallback because it trades a loud build failure for a quiet
// half-broken production. That reasoning holds where the value is
// environment-specific — a fallback would then serve the WRONG backend. It is
// not the case here: there is exactly one shared newsletter/blog project for the
// whole network, these are its public (role=anon) values, and the same project
// is already hardcoded as CONTACT_ENDPOINT in shared/Footer.tsx. A build made
// with the fallback behaves identically to one made with .env.
//
// Rotating the project or key means updating, together:
//   src/lib/supabaseConfig.ts (this file) · scripts/supabase-config.mjs
//   shared/Footer.tsx (CONTACT_ENDPOINT) · sibling sites' src/lib/supabase.ts
export const SUPABASE_URL: string =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://oogioaxmfnqcbvjbcodh.supabase.co';

export const SUPABASE_ANON_KEY: string =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';
