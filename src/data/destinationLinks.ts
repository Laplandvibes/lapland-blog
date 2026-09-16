// Mitä TÄSTÄ kohteesta on avattu muualla LaplandVibes-verkostossa.
//
// ── Miksi tämä tiedosto on olemassa (Vesa 2026-09-16) ──────────────────────
// Vesa katsoi /destinations-sivua: "nämä kohteet? ne ei juuri anna mitään
// lukijalle? pitäisi olla linkit että lue lisää kohteesta ja jonnekin
// sisarsivulle missä on avattu enemmän."
//
// Hän oli oikeassa, ja ero oli mitattavissa. Verkostossa on **38 kohdesivua**
// näistä kahdeksasta paikasta, ja blogin kohdekortit linkittivät niistä
// nollaan. Kortissa oli täsmälleen kaksi linkkiä: juttuhaku ja majoituksen
// affiliate-linkki.
//
// ── Mistä tämä taulukko on luettu ─────────────────────────────────────────
// 🔴 Jokainen rivi on luettu sivuston OMASTA sitemapista 2026-09-16, ei
// arvattu polkukaavasta. Kaava ei riitä: sama kohde on `/destination/levi/`
// hubissa, `/destinations/levi/` majoituksessa, `/city/levi/` ravintoloissa ja
// `/resort/levi/` hiihtokeskuksissa — neljä eri kaavaa neljällä sivustolla.
// Ja kaava joka osuu yhteen kohteeseen ei osu muihin: laplandbars tuntee neljä
// kohdetta kahdeksasta, laplandskiresorts kolme.
//
// 🔴 Puuttuva linkki ei ole vika vaan tieto: Muonio on verkoston ohuin kohde
// (1 sivu), Kemijärvi 2, Kemi 3. Kohdesivu näyttää vain ne jotka ovat
// olemassa — kuollut linkki olisi lukijalle pahempi kuin puuttuva.
//
// Ylläpito: aja `node scripts/audit_destination_links.mjs` ennen deployta. Se
// hakee jokaisen rivin livenä ja kaatuu jos yksikin on kuollut.

export type NetworkSiteKey =
  | 'vibes'
  | 'stays'
  | 'activities'
  | 'dining'
  | 'skiresorts'
  | 'bars'
  | 'nightlife';

export interface NetworkSite {
  key: NetworkSiteKey;
  host: string;
  /** Järjestys kohdesivulla: yleisopas ensin, sitten yöpyminen, tekeminen, syöminen. */
  order: number;
}

export const NETWORK_SITES: Record<NetworkSiteKey, NetworkSite> = {
  vibes: { key: 'vibes', host: 'laplandvibes.com', order: 1 },
  stays: { key: 'stays', host: 'laplandstays.com', order: 2 },
  activities: { key: 'activities', host: 'laplandactivities.fi', order: 3 },
  skiresorts: { key: 'skiresorts', host: 'laplandskiresorts.com', order: 4 },
  dining: { key: 'dining', host: 'laplanddining.com', order: 5 },
  bars: { key: 'bars', host: 'laplandbars.com', order: 6 },
  nightlife: { key: 'nightlife', host: 'laplandnightlife.com', order: 7 },
};

/** kohde -> sivusto -> polku. Luettu sitemapeista 2026-09-16. */
export const DESTINATION_LINKS: Record<string, Partial<Record<NetworkSiteKey, string>>> = {
  rovaniemi: {
    vibes: '/destination/rovaniemi/',
    stays: '/destinations/rovaniemi/',
    activities: '/destinations/rovaniemi/',
    dining: '/city/rovaniemi/',
    bars: '/city/rovaniemi/',
    nightlife: '/city/rovaniemi/',
  },
  saariselka: {
    vibes: '/destination/saariselka/',
    stays: '/destinations/saariselka/',
    activities: '/destinations/saariselka/',
    skiresorts: '/resort/saariselka/',
    dining: '/city/saariselka/',
    bars: '/city/saariselka/',
    nightlife: '/city/saariselka/',
  },
  levi: {
    vibes: '/destination/levi/',
    stays: '/destinations/levi/',
    activities: '/destinations/levi/',
    skiresorts: '/resort/levi/',
    dining: '/city/levi/',
    bars: '/city/levi/',
    nightlife: '/city/levi/',
  },
  kemi: {
    vibes: '/destination/kemi/',
    dining: '/city/kemi/',
    nightlife: '/city/kemi/',
  },
  inari: {
    vibes: '/destination/inari/',
    stays: '/destinations/inari/',
    activities: '/destinations/inari/',
    dining: '/city/inari/',
    nightlife: '/city/inari/',
  },
  muonio: {
    nightlife: '/city/muonio/',
  },
  yllas: {
    vibes: '/destination/yllas/',
    stays: '/destinations/yllas/',
    activities: '/destinations/yllas/',
    skiresorts: '/resort/yllas/',
    dining: '/city/yllas/',
    bars: '/city/yllas/',
    nightlife: '/city/yllas/',
  },
  kemijarvi: {
    activities: '/destinations/kemijarvi/',
    dining: '/city/kemijarvi/',
  },
};

/** Kohteen verkostolinkit järjestyksessä, vain olemassa olevat. */
export function networkLinksFor(
  slug: string
): Array<{ site: NetworkSite; url: string }> {
  const rivit = DESTINATION_LINKS[slug];
  if (!rivit) return [];
  return Object.entries(rivit)
    .map(([k, polku]) => ({ site: NETWORK_SITES[k as NetworkSiteKey], url: `https://${NETWORK_SITES[k as NetworkSiteKey].host}${polku}` }))
    .sort((a, b) => a.site.order - b.site.order);
}
