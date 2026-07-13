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
  return new Date(iso).toLocaleDateString(DATE_LOCALE[lang], options);
}
