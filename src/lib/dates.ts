// Locale-aware post date formatting. Every user-facing date goes through
// this — hardcoded 'en-GB' rendered English dates on all 11 locales
// (Vesa mobile QA 2026-07-11).
import type { Lang } from '../i18n/useLang';

const DATE_LOCALE: Record<Lang, string> = {
  en: 'en-GB',
  fi: 'fi-FI',
  de: 'de-DE',
  ja: 'ja-JP',
  es: 'es-ES',
  'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN',
  ko: 'ko-KR',
  fr: 'fr-FR',
  it: 'it-IT',
  nl: 'nl-NL',
  sv: 'sv-SE',
};

export function formatPostDate(
  iso: string,
  lang: Lang,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
): string {
  // timeZone UTC: `publishedAt` is a bare date ("2026-01-18"), so it parses as
  // UTC midnight and reads back a day early for every reader west of UTC — a New
  // York reader saw "17 January" on a post published on the 18th. Callers can
  // still override it, but the default must not depend on the device.
  return new Date(iso).toLocaleDateString(DATE_LOCALE[lang], { timeZone: 'UTC', ...options });
}
