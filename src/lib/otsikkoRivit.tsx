import { type ReactNode } from 'react';
import { fraasiLapset } from '../shared/cjk/otsikko';

/* ── Otsikon rivit tietokoneella (Vesa 3.10.2026: "tehdään turhaan kolmirivisiä") ──────────────────────────────
 * Mitattu livenä 3.10. (scripts/audit_otsikkorivit.mjs, 12 kieltä × 1280/1536/1920): heron kaksirivinen otsikko
 * ("Lähdössä Lappiin? / Tee matkastasi blogi.") oli 3–4 riviä 9 kielellä, koska toinen lause on saksaksi 14,2 em
 * ja palsta 992 px: 87 px:n koolla se ei mahdu. Ratkaisu on sama kuin hubin herossa (laplandvibes cadea06): rivit
 * tulevat lauseista ja koko on pienempi kahdesta, suunniteltu koko tai koko jolla pisin rivi mahtuu palstaan
 * (100cqi / rivin leveys em-yksiköinä). */

const CJK = /[　-ヿ㐀-鿿가-힯＀-￯]/;

/** Rivin leveysarvio em-yksiköinä Manrope 700:lla ja otsikoiden -0,035 em:n välistyksellä. Kalibroitu 3.10.2026
 *  selaimessa mitatuilla merkkileveyksillä; 24 heron riviä 12 kielellä arvioituu 1,02–1,10-kertaisiksi, eli arvio
 *  on aina hieman yläkanttiin eikä rivi katkea siksi, että arvio oli liian pieni. */
export function manropeEm(s: string): number {
  let w = 0;
  for (const ch of s) {
    w += CJK.test(ch) ? 1.0
      : ch === ' ' ? 0.17
      : /[iljIíì'’.,!¡:;|]/.test(ch) ? 0.27
      : /[frt]/.test(ch) ? 0.38
      : /[mw]/.test(ch) ? 0.83
      : /[MW]/.test(ch) ? 0.95
      : /[A-ZÀ-ÖØ-Þ]/.test(ch) ? 0.68
      : 0.56;
  }
  return w;
}

/** ja ja zh kirjoitetaan ilman välilyöntejä: ilman katkokohtia selain katkaisee rivin mistä tahansa merkistä
 *  ("始めま / しょう。", "博 / 客。"). */
export const ilmanValeja = (lang: string) => lang === 'ja' || lang === 'zh-CN';


/** ja/zh: fraasien väliin <wbr> verkoston yhteisellä jaolla (src/shared/cjk, sama kuin muissa otsikoissa: paikannimet
 *  ehjinä, partikkelit ja okurigana edelliseen, pitkä katakanasana inline-blockina). CJK_CSS antaa keep-allin, jolloin
 *  rivi katkeaa vain näistä kohdista eikä kesken sanan ("ラップ / ランド"). Aiempi oma jako (Intl.Segmenter + hiraganat
 *  edelliseen) pilkkoi translitteroidut paikannimet merkeittäin, eikä JSX-välikappale näe valmiita <wbr>-elementtejä
 *  (19.10.2026). Muilla kielillä teksti sellaisenaan. */
export function Fraasit({ text, lang }: { text: string; lang: string }): ReactNode {
  return ilmanValeja(lang) ? fraasiLapset(text) : text;
}

/** Lauseet omiksi osikseen: 。/！/？ jälkeen tai . ! ? jälkeen kun perässä on väli (ei "lapland.blog"). */
export function lauseet(text: string): string[] {
  const osat = text.match(/.+?(?:[。！？]|[.!?](?=\s|$))\s*|.+$/gu);
  return osat ? osat.map((o) => o.trim()).filter(Boolean) : [text];
}
