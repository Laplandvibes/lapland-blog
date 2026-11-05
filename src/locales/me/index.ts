import type { Lang } from '../../i18n/useLang';
import type { MeCopy } from './types';
import en from './en';
import fi from './fi';
import de from './de';
import ja from './ja';
import es from './es';
import ptBR from './ptBR';
import zhCN from './zhCN';
import ko from './ko';
import fr from './fr';
import it from './it';
import nl from './nl';
import sv from './sv';

export type { MeCopy };

export const ME_COPY: Record<Lang, MeCopy> = {
  en, fi, de, ja, es, 'pt-BR': ptBR, 'zh-CN': zhCN, ko, fr, it, nl, sv,
};

/** Fill {name} placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}

/** BCP 47 tag for Intl formatting. */
export function intlLocale(lang: Lang): string {
  return lang === 'pt-BR' ? 'pt-BR' : lang === 'zh-CN' ? 'zh-CN' : lang;
}
