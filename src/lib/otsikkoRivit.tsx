import { Fragment, type ReactNode } from 'react';

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

const segmentoija = (lang: string) => {
  try {
    return typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? new Intl.Segmenter(lang, { granularity: 'word' })
      : null;
  } catch {
    return null;
  }
};

/** ja/zh: teksti fraaseiksi, joiden väliin <wbr>. Sanojen rajat Intl.Segmenterilta; japanissa pelkät hiraganat
 *  (partikkelit, taivutuspäätteet) ja välimerkit liitetään edelliseen, jotta rivi ei ala "へ"- tai "。"-merkillä.
 *  Käytetään yhdessä `word-break: keep-all`:n kanssa, jolloin rivi katkeaa vain näistä kohdista. Muilla kielillä
 *  ja ilman Segmenteriä teksti palaa sellaisenaan. */
export function Fraasit({ text, lang }: { text: string; lang: string }): ReactNode {
  if (!ilmanValeja(lang)) return text;
  const seg = segmentoija(lang);
  if (!seg) return text;
  const osat: string[] = [];
  for (const { segment } of seg.segment(text)) {
    const liita = osat.length > 0 && (
      /^[、。！？，：；)）」』】ー]+$/.test(segment)
      || (lang === 'ja' && /^[぀-ゟ]+$/.test(segment))
    );
    if (liita) osat[osat.length - 1] += segment;
    else osat.push(segment);
  }
  return osat.map((o, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {o}
    </Fragment>
  ));
}

/** Lauseet omiksi osikseen: 。/！/？ jälkeen tai . ! ? jälkeen kun perässä on väli (ei "lapland.blog"). */
export function lauseet(text: string): string[] {
  const osat = text.match(/.+?(?:[。！？]|[.!?](?=\s|$))\s*|.+$/gu);
  return osat ? osat.map((o) => o.trim()).filter(Boolean) : [text];
}
