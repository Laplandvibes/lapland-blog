// Site-specific wrapper around the shared LV NewsletterPopup.
// Mounted once at the root (App.tsx) — triggers after 25 s OR 55 % scroll.

import SharedNewsletterPopup from '../../../shared/NewsletterPopup';
import { trackNewsletterSignup } from '../lib/analytics';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function NewsletterPopup() {
  return (
    <SharedNewsletterPopup
      siteId="laplandblog"
      brandWord=".BLOG"
      headline="A travel journal worth keeping — straight from Finland, in English."
      description="The #LaplandVibes newsletter: aurora alerts when Kp spikes, the cabin and tour windows that always sell out, and seasonal travel notes — written by people who actually live in Lapland. Plus the next field-journal entry, when it drops."
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_ANON_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  );
}
