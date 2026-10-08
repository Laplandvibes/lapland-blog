/**
 * Otsikon CJK-tekstiin <wbr>-katkokohdat fraasirajoille (fraasit.ts). Käyttäjät:
 * - cjkJsxRuntime.ts / cjkJsxDevRuntime.ts: jokaisen h1–h6:n merkkijonolapset ja sen sisäisten tekstielementtien
 *   (span, a, em, strong …) merkkijonot automaattisesti;
 * - fraasiLapset() suoraan, kun otsikon teksti on komponentin sisällä (<h2><Link>{otsikko}</Link></h2>).
 * Katkokohdat vaikuttavat vain CJK_CSS:n kautta (cjkOtsikotPlugin.ts: keep-all elementille, jolla on <wbr>-lapsia).
 */
import { cloneElement, isValidElement, type ReactNode } from 'react';
import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime';
import { CJK, katakanaPalat, katkokohdat } from './fraasit';

const OTSIKKO = /^h[1-6]$/;
const valimuisti = new Map<string, string[] | null>();

function palat(teksti: string): string[] | null {
  let p = valimuisti.get(teksti);
  if (p !== undefined) return p;
  const k = katkokohdat(teksti);
  if (k.length) {
    const cps = [...teksti];
    p = [];
    let prev = 0;
    for (const i of k) { p.push(cps.slice(prev, i).join('')); prev = i; }
    p.push(cps.slice(prev).join(''));
  } else p = null;
  if (valimuisti.size > 1000) valimuisti.clear();
  valimuisti.set(teksti, p);
  return p;
}

/** Teksti, jonka fraasirajoilla on <wbr>. Ei-CJK tai ilman katkokohtia = sama merkkijono. */
export function fraasiLapset(teksti: string, key?: string): ReactNode {
  if (!CJK.test(teksti)) return teksti;
  const p = palat(teksti);
  if (!p) return teksti;
  const lapset: ReactNode[] = [];
  p.forEach((osa, n) => {
    if (n > 0) lapset.push(reactJsx('wbr', {}, `w${n}`));
    // Pitkä katakanasana omaan elementtiinsä: sen sisällä selaimen oma rivitys (CJK_CSS [data-cjk-pitka]).
    const k = katakanaPalat(osa);
    if (!k) lapset.push(osa);
    else k.forEach((x, m) => lapset.push(x.pitka ? reactJsx('span', { 'data-cjk-pitka': '', children: x.teksti }, `p${n}-${m}`) : x.teksti));
  });
  return reactJsxs(Fragment, { children: lapset }, key);
}

// Otsikon sisäiset tekstielementit (esim. <h1>{otsikko}<span className="block">{alaotsikko}</span></h1>) käsitellään
// myös. Komponentteihin (Link ym.) ei kosketa: ne voivat käyttää lapsitekstiä muuhunkin kuin näkyvään tekstiin.
// Fragmentti (<>{a}<br />{b}</>) on DOMissa näkymätön, joten sen tekstit ovat otsikon omia lapsia: hero-komponentti
// saa otsikon usein propsina muodossa title={<>…</>} (laplandwork /ja/employers/ jäi 8.10.2026 ilman katkokohtia).
const TEKSTIELEMENTTI = /^(span|a|em|strong|b|i|small|mark|u|s|q|cite|abbr|time|bdi|bdo|sup|sub)$/;
const SYVYYS = 3;

function kasitteleElementti(x: unknown, syvyys: number): unknown {
  if (syvyys <= 0 || !isValidElement(x)) return x;
  if (x.type !== Fragment && (typeof x.type !== 'string' || !TEKSTIELEMENTTI.test(x.type))) return x;
  const lapset = (x.props as { children?: unknown }).children;
  if (lapset == null) return x;
  const uudet = kasitteleLapset(lapset, syvyys - 1);
  if (uudet === lapset) return x;
  return cloneElement(x, undefined, ...((Array.isArray(uudet) ? uudet : [uudet]) as ReactNode[]));
}

function kasitteleLapset(c: unknown, syvyys: number): unknown {
  if (typeof c === 'string') return fraasiLapset(c);
  if (Array.isArray(c)) {
    let muuttui = false;
    const uusi = c.map((x, i) => {
      const y = typeof x === 'string' ? fraasiLapset(x, `cjk${i}`) : kasitteleElementti(x, syvyys);
      if (y !== x) muuttui = true;
      return y;
    });
    return muuttui ? uusi : c;
  }
  return kasitteleElementti(c, syvyys);
}

/** h1–h6:n propsit, joissa CJK-tekstiin on lisätty katkokohdat (myös otsikon sisäisiin tekstielementteihin). */
export function otsikonPropsit<P>(type: unknown, props: P): P {
  if (typeof type !== 'string' || !OTSIKKO.test(type) || props == null || typeof props !== 'object') return props;
  const c = (props as { children?: unknown }).children;
  if (c == null) return props;
  const uusi = kasitteleLapset(c, SYVYYS);
  return uusi === c ? props : { ...props, children: uusi };
}
