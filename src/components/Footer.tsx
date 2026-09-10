// Thin wrapper around the canonical shared SharedFooter. The shared component
// auto-detects URL prefix (/fr /it /nl /kr ...) and renders the 27-spoke
// ecosystem grid with localized niche labels.
import SharedFooter from '../shared/Footer';

import JobNetworkBanner from "../shared/JobNetworkBanner";
function Footer() {
  return <SharedFooter />;
}

/**
 * Maksetun Network-tason ilmoituskortti tämän sivuston footerin yläpuolella
 * (10.9.2026, Vesa: "kytke banner").
 *
 * 🔴 Footerin sisältöä EI kosketa: alkuperäinen komponentti on yhä Footer ja
 * tämä kääre vain renderöi bannerin sen eteen. Footerin markup vaihtelee
 * sivustoittain, joten sen sisälle kirjoittaminen olisi 23 eri muokkausta ja
 * 23 tapaa rikkoa jaettu footer.
 *
 * Banneri palauttaa null kun tämän sivuston nimeä ei ole ostettu yhteenkään
 * ilmoitukseen, joten näkyvä muutos on nolla ennen ensimmäistä Network-kauppaa.
 */
export default function FooterWithNetworkJobs() {
  return (
    <>
      <JobNetworkBanner siteId="laplandblog" />
      <Footer />
    </>
  );
}
