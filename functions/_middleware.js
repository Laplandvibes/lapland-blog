/**
 * Kuollut polku = aito 404 — MUTTA blogi julkaisee postit ilman deployta.
 *
 * 🔴🔴 MIKSI TALLA SIVUSTOLLA EI VOI VAIN POISTAA SPA-VARAREITTIA.
 * Verkoston muilla 26 sivustolla kuollut polku antaa aidon 404:n, koska
 * jokainen reitti on prerenderoity. Taalla ei ole: postit haetaan Supabasesta
 * AJONAIKAISESTI (src/hooks/usePost.ts hakee slugilla) ja niita julkaistaan
 * /admin-CMS:sta ilman etta kukaan ajaa buildia. Sokea "poistetaan catch-all
 * kuten muillakin" olisi siis muuttanut jokaisen viimeisen buildin jalkeen
 * julkaistun artikkelin 404:ksi. Mitattu 23.8.2026: Supabasessa 11 julkaistua
 * slugia, routes.jsonissa 11 — synkassa juuri nyt, mutta mikaan EI pida niita
 * synkassa, koska routes.json on kasin yllapidetty.
 *
 * Siksi paatos on ajonaikainen:
 *   1. ASSETS loytaa tiedoston (prerenderoity sivu, kuva, chunk) -> se.
 *   2. Ei loydy, mutta polku on /post/<slug> ja slug on Supabasessa
 *      julkaistu -> SPA-kuori 200:lla. Tama haara pitaa uudet postit elossa.
 *   3. Ei loydy, mutta polku on appin oma sivu (/admin, /signin, /me, /by/..)
 *      -> SPA-kuori 200:lla. Naita ei prerenderoida eivatka ne kuulu indeksiin.
 *   4. Muuten -> dist/404.html aidolla 404-statuksella.
 *
 * Kohta 4 on koko pointti: aiemmin tama sivusto vastasi 200:lla MIHIN TAHANSA
 * polkuun (Cloudflare Pagesin oletus kun 404.html puuttuu), ja shared/NotFound
 * asetti noindexin vasta JS:n jalkeen. Googlebot nakee ensin "sivu on
 * olemassa" ja palaa crawlaamaan sita. Sama ilmoitus osui ~19 verkoston
 * sivustolle 27.-28.7.2026; tama oli viimeinen jolla vika oli yha jaljella.
 */

/** Lokaaliprefiksit, samat kuin src/App.tsx:n reiteissa. */
const LOCALES = ['fi', 'de', 'ja', 'es', 'br', 'cn', 'kr', 'fr', 'it', 'nl', 'sv'];

/**
 * Appin omat sivut joita EI prerenderoida: kirjautuminen, CMS ja kirjoittajan
 * profiili. Naissa ei ole hakukonearvoa eika niita voi prerenderoida (sisalto
 * riippuu istunnosta), joten ne saavat kuoren ilman kantakyselya.
 */
const APP_ONLY = [/^\/admin(\/|$)/, /^\/signin(\/|$)/, /^\/me(\/|$)/, /^\/by\/[^/]+\/?$/];

/**
 * Julkinen (role=anon) pari — sama joka on jo selainbundlessa
 * (src/lib/supabaseConfig.ts) ja scripts/supabase-config.mjs:n varana.
 * Ei salaisuus. 🔴 Kierratys: paivita naiden kolmen kanssa yhdessa.
 */
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

/** /fi/post/x -> /post/x */
function stripLocale(pathname) {
  for (const l of LOCALES) {
    if (pathname === '/' + l) return '/';
    if (pathname.startsWith('/' + l + '/')) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/**
 * Onko slug julkaistu? Sama ehto kuin src/hooks/usePost.ts:ssa
 * (status = published), jotta palvelin ja selain ovat samaa mielta siita mika
 * sivu on olemassa.
 *
 * 🔴 Jos kysely epaonnistuu, vastaus on `true`. Kantakatko ei saa muuttaa
 * oikeita artikkeleita 404:ksi: vaara 200 on talla puolella halvempi virhe
 * kuin vaara 404, koska 404 poistaa sivun indeksista.
 */
async function isPublishedPost(slug) {
  const url =
    SUPABASE_URL +
    '/rest/v1/blog_posts?select=slug&status=eq.published&limit=1&slug=eq.' +
    encodeURIComponent(slug);
  try {
    const r = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY },
      cf: { cacheTtl: 60, cacheEverything: true },
    });
    if (!r.ok) return true;
    const rows = await r.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return true;
  }
}

/**
 * SPA-kuori 200:lla. Haetaan etusivun tiedosto `next()`:lla, jotta se on aina
 * sama kuori kuin muillakin sivuilla.
 *
 * 🔴 Kaikki kaaritty try/catchiin ja jokainen virhehaara palauttaa `fallback`.
 * Middleware ajaa JOKAISEN pyynnon lapi: kasittelematon poikkeus taalla ei
 * olisi rikkinainen 404 vaan 500 koko sivustolla. Huonoin sallittu
 * lopputulos on siis "kuollut polku nayttaa 404:n" — ei koskaan valkoinen
 * sivu toimivalle polulle.
 */
async function shell(context, fallback) {
  try {
    const origin = new URL(context.request.url).origin;
    const res = await context.next(new Request(origin + '/', context.request));
    if (!res || !res.ok) return fallback;
    return new Response(res.body, { status: 200, headers: res.headers });
  } catch {
    return fallback;
  }
}

export async function onRequest(context) {
  let assetResponse;
  try {
    assetResponse = await context.next();
  } catch (e) {
    // Jos edes assettien haku kaatuu, ei jaada valittamaan omaa virhetta
    // paalle: annetaan Pagesin oma virhe lapi sellaisenaan.
    throw e;
  }

  // 1. Tiedosto loytyi (tai jokin muu status kuin 404, esim. 304). Ei kosketa.
  if (assetResponse.status !== 404) return assetResponse;

  try {
    const path = stripLocale(new URL(context.request.url).pathname);

    // 3. Appin omat sivut ennen kantakyselya: halvempi ja aina sama vastaus.
    if (APP_ONLY.some((re) => re.test(path))) return await shell(context, assetResponse);

    // 2. Buildin jalkeen julkaistu artikkeli.
    const post = path.match(/^\/post\/([^/]+)\/?$/);
    if (post && (await isPublishedPost(decodeURIComponent(post[1])))) {
      return await shell(context, assetResponse);
    }
  } catch {
    // Ks. shell(): tama middleware ei saa koskaan tuottaa 500:aa.
    return assetResponse;
  }

  // 4. Aito 404 (dist/404.html, prerenderin --emit404).
  return assetResponse;
}
