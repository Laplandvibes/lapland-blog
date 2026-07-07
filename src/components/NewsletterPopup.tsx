// Site-specific wrapper around the shared LV NewsletterPopup.
// Mounted once at the root (App.tsx) — triggers after 25 s OR 55 % scroll.

import SharedNewsletterPopup from '../../../shared/NewsletterPopup';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang } from '../i18n/useLang'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function NewsletterPopup() {
  const langRaw = useLang();
  // NOTE: do NOT pass `headline`/`description` here. The shared popup ships
  // fully-localized #LaplandVibes copy (LOCALE_HEADLINES/LOCALE_DICTS) for all
  // 11 languages; passing an override would force it to English on /fi /cn etc.
  // (the bug Vesa flagged). Letting `lang` drive the built-in copy keeps the
  // popup localized AND on-brand as the #LaplandVibes travel newsletter —
  // aurora/Kp alerts, cabin & tour booking windows, seasonal notes — with no
  // per-blog-entry framing.
  return (
    <SharedNewsletterPopup
      lang={langRaw as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl'}
      siteId="laplandblog"
      brandWord=".BLOG"
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_ANON_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  );
}
