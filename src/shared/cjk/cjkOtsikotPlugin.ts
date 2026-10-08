/**
 * Vite-liitännäinen CJK-otsikoiden fraasirajoille. Kaksi tehtävää:
 *
 * 1. Sovelluksen `react/jsx-runtime`- ja `react/jsx-dev-runtime`-tuonnit → cjkJsxRuntime.ts /
 *    cjkJsxDevRuntime.ts, jotka lisäävät CJK-otsikoihin <wbr>-fraasirajat (fraasit.ts). Sama rakenne
 *    kuin src/shared/router/trailingSlashPlugin.ts: yksi kohta kattaa jokaisen otsikon (myös jaetut
 *    komponentit) ilman, että jokaista otsikkoa muokataan käsin. Ohjausta EI tehdä node_modules-paketeille
 *    eikä tämän kansion tiedostoille (ne tarvitsevat Reactin oman).
 * 2. CJK_CSS sivuston src/index.css:n loppuun. Erillinen tyylitiedosto olisi jokaisella sivulla toinen
 *    renderöinnin estävä pyyntö (Vite pilkkoo moduulista tuodun CSS:n oman JS-palansa mukaan).
 *
 * Käyttö vite.config.ts:ssä: plugins: [cjkOtsikot(), trailingSlashLinks(), react(), …]
 * Optiot: `kansio` = tämän kansion polku sivuston juuresta (oletus src/shared/cjk = vendoroitu kopio),
 * `css` = tyylitiedosto, jonka loppuun säännöt liitetään (oletus src/index.css).
 */
import type { Plugin } from 'vite';

/**
 * Kiinan ja japanin otsikot katkeavat vain fraasirajoilla. otsikko.ts lisää otsikon tekstiin <wbr>-katkokohdat,
 * ja keep-all estää muut katkot: muuten rivi saa katketa minkä tahansa kahden merkin välistä ja balance jakaa
 * sen tasan ("真實的拉普 / 蘭"). keep-all vain elementille, jolla on omia <wbr>-lapsia: ilman niitä välimerkitön
 * kiina olisi yksi katkeamaton sana ja ylivuotaisi. Otsikon sisäinen elementti ilman omia katkokohtia palaa
 * tavalliseen rivitykseen. Selain ilman :has() = ennallaan.
 *
 * Kerrostamaton (ei @layer), jotta sääntö voittaa sivuston oman otsikkosäännön (overflow-wrap) sekä kerroksessa
 * että ilman. break-word = hätäkatko riviä pidemmälle fraasille 360 px:stä ylöspäin; anywhere vasta alle 360 px:n,
 * koska se toisi pilkun rivin alkuun (ラップランド / 、確認) mutta ilman sitä riviä pidempi fraasi
 * (ラップランドへ) levittäisi otsikon kapean ruudun yli.
 *
 * [data-cjk-pitka] = vähintään 7 merkin katakanasana (アクティビティ, fraasit.ts katakanaPalat): sen sisällä selaimen
 * oma rivitys ja strict-kinsoku. Muuten riviä pidempi pala katkeaisi hätäkatkona, joka ei tunne kinsokua
 * (夏の / アクティビテ / ィ, laplandactivities 8.10.2026).
 */
export const CJK_CSS = `
:is(h1, h2, h3, h4, h5, h6, :is(h1, h2, h3, h4, h5, h6) *):has(> wbr) {
  word-break: keep-all;
  overflow-wrap: break-word;
}
@media (max-width: 359.98px) {
  :is(h1, h2, h3, h4, h5, h6, :is(h1, h2, h3, h4, h5, h6) *):has(> wbr) {
    overflow-wrap: anywhere;
  }
}
:is(h1, h2, h3, h4, h5, h6):has(> wbr) *:not(:has(> wbr)) {
  word-break: normal;
}
:is(h1, h2, h3, h4, h5, h6) [data-cjk-pitka] {
  word-break: normal;
  line-break: strict;
}
`;

const norm = (p: string) => p.replace(/\\/g, '/').toLowerCase();
// Osa sivustoista aliasoi `react`in absoluuttiseen polkuun resolve.aliasissa, ja Viten alias ajetaan ENNEN
// tätä liitännäistä: tuonti saapuu silloin muodossa `…/node_modules/react/jsx-runtime`.
const ajonaika = (source: string): 'jsx-runtime' | 'jsx-dev-runtime' | null => {
  const s = norm(source).replace(/\.js$/, '');
  if (s === 'react/jsx-runtime' || s.endsWith('/node_modules/react/jsx-runtime')) return 'jsx-runtime';
  if (s === 'react/jsx-dev-runtime' || s.endsWith('/node_modules/react/jsx-dev-runtime')) return 'jsx-dev-runtime';
  return null;
};

export function cjkOtsikot({ kansio: suhteellinen = 'src/shared/cjk', css = 'src/index.css' }: { kansio?: string; css?: string } = {}): Plugin {
  let src = '';
  let kansio = '';
  let tyyli = '';
  let liitetty = false;
  let ohjattu = false;
  return {
    name: 'lv-cjk-otsikot',
    enforce: 'pre',
    configResolved(config) {
      src = `${norm(config.root)}/src/`;
      kansio = `${config.root}/${suhteellinen}`;
      tyyli = norm(`${config.root}/${css}`);
    },
    resolveId(source, importer) {
      const mika = ajonaika(source);
      if (!mika || !importer) return null;
      const from = norm(importer);
      if (!from.startsWith(src) || from.includes('/node_modules/') || from.startsWith(`${norm(kansio)}/`)) return null;
      ohjattu = true;
      return `${kansio}/${mika === 'jsx-runtime' ? 'cjkJsxRuntime.ts' : 'cjkJsxDevRuntime.ts'}`;
    },
    transform(code, id) {
      if (norm(id.split('?')[0]) !== tyyli) return null;
      liitetty = true;
      return { code: `${code}\n${CJK_CSS}`, map: null };
    },
    buildEnd() {
      // Puolikas korjaus kaatuu buildiin eikä mene julkaisuun hiljaa: ilman tyylejä <wbr>-kohdat olisivat vain
      // lisäkatkoja, ja ilman ohjausta tyylit eivät tee mitään (kumpikin on mitattu sattuneen).
      if (this.meta.watchMode !== false) return;
      if (!liitetty) this.error(`lv-cjk-otsikot: ${css} ei kulkenut liitännäisen läpi — CJK-otsikkosäännöt puuttuisivat`);
      if (!ohjattu) this.error('lv-cjk-otsikot: yhtään react/jsx-runtime-tuontia ei ohjattu (resolve.alias tai JSX-asetus?) — <wbr>-kohdat puuttuisivat');
    },
  };
}
