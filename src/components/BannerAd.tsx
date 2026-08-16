// BannerAd — small monetisation card placed on reader surfaces (post sidebar,
// archive grid). Routes through go.laplandvibes.com; the Worker reads the
// Referer header to attribute the click to this site. Affiliate disclosure
// stays footer-only (LV ecosystem rule); these cards are visually labeled
// with the ad marker in the page language.
//
// Copy is localised to all 12 site languages (Vesa 2026-07-30: paid/affiliate
// ad surfaces render in the reader's language; EN is the only fallback).
//
// Accent matches whichever theme they sit on — pass `variant` to switch.

import { ArrowUpRight, BedDouble, Plane, MapPin } from 'lucide-react';
import { useLang, type Lang } from '../i18n/useLang';

const GO = 'https://go.laplandvibes.com';

const HOTELS_LOCALE: Record<Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP',
  es: 'es_ES', 'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN',
  ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};
const CARS_LANG: Record<Lang, string> = {
  en: 'en', fi: 'fi', de: 'de', ja: 'ja',
  es: 'es', 'pt-BR': 'pt', 'zh-CN': 'zh',
  ko: 'ko', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
};

type Partner = 'hotels' | 'flights' | 'activities';
type Variant = 'editorial' | 'dark';

interface BannerAdProps {
  partner: Partner;
  /** Snake-case placement id, e.g. 'post_sidebar', 'archive_inline'. */
  sid: string;
  /** Search query (hotels), origin code (flights), or GYG slug (activities). */
  destination?: string;
  /** Optional headline override. */
  headline?: string;
  /** Optional supporting line override. */
  copy?: string;
  variant?: Variant;
}

interface PartnerCopy {
  headline: string;
  copy: string;
  cta: string;
}

/** Mainosmerkintä + aria-label sivun kielellä. Merkintäsana on sama kuin
 *  verkoston AD_LABEL-vakiossa (shared/ads/AdUnit.tsx). */
const AD_MARKER: Record<Lang, { label: string; aria: string }> = {
  en: { label: 'Ad · Affiliate', aria: 'Sponsored partner card' },
  fi: { label: 'Mainos · Kumppanilinkki', aria: 'Maksettu kumppanikortti' },
  de: { label: 'Anzeige · Affiliate-Link', aria: 'Gesponserte Partnerkarte' },
  ja: { label: '広告 · アフィリエイトリンク', aria: 'スポンサー付きパートナーカード' },
  es: { label: 'Anuncio · Enlace de afiliado', aria: 'Tarjeta de socio patrocinada' },
  'pt-BR': { label: 'Anúncio · Link de afiliado', aria: 'Cartão de parceiro patrocinado' },
  'zh-CN': { label: '广告 · 联盟链接', aria: '赞助合作伙伴卡片' },
  ko: { label: '광고 · 제휴 링크', aria: '스폰서 파트너 카드' },
  fr: { label: 'Annonce · Lien affilié', aria: 'Carte partenaire sponsorisée' },
  it: { label: 'Annuncio · Link di affiliazione', aria: 'Scheda partner sponsorizzata' },
  nl: { label: 'Advertentie · Affiliate-link', aria: 'Gesponsorde partnerkaart' },
  sv: { label: 'Annons · Affiliatelänk', aria: 'Sponsrat partnerkort' },
};

const PARTNER_COPY: Record<Partner, Record<Lang, PartnerCopy>> = {
  hotels: {
    en: {
      headline: 'Find your cabin or igloo',
      copy: 'Compare Lapland stays, from glass igloos in Saariselkä to log cabins outside Levi.',
      cta: 'Browse stays',
    },
    fi: {
      headline: 'Löydä mökkisi tai iglusi',
      copy: 'Vertaile Lapin majoituksia Saariselän lasi-igluista Levin liepeiden hirsimökkeihin.',
      cta: 'Selaa majoituksia',
    },
    de: {
      headline: 'Finde deine Hütte oder dein Iglu',
      copy: 'Vergleiche Unterkünfte in Lappland, von Glasiglus in Saariselkä bis zu Blockhütten bei Levi.',
      cta: 'Unterkünfte ansehen',
    },
    ja: {
      headline: 'コテージかイグルーを見つける',
      copy: 'サーリセルカのガラスイグルーからレヴィ郊外のログコテージまで、ラップランドの宿を比較。',
      cta: '宿泊先を見る',
    },
    es: {
      headline: 'Encuentra tu cabaña o iglú',
      copy: 'Compara alojamientos en Laponia, de los iglús de cristal de Saariselkä a las cabañas de madera cerca de Levi.',
      cta: 'Ver alojamientos',
    },
    'pt-BR': {
      headline: 'Encontre sua cabana ou iglu',
      copy: 'Compare hospedagens na Lapônia, dos iglus de vidro de Saariselkä às cabanas de madeira perto de Levi.',
      cta: 'Ver hospedagens',
    },
    'zh-CN': {
      headline: '找到你的木屋或冰屋',
      copy: '比较拉普兰住宿：从萨利色尔卡的玻璃穹顶屋到莱维郊外的原木小屋。',
      cta: '浏览住宿',
    },
    ko: {
      headline: '나만의 캐빈 또는 이글루 찾기',
      copy: '사리셀카의 유리 이글루부터 레비 외곽의 통나무 캐빈까지, 라플란드 숙소를 비교해 보세요.',
      cta: '숙소 둘러보기',
    },
    fr: {
      headline: 'Trouvez votre chalet ou votre igloo',
      copy: 'Comparez les hébergements de Laponie, des igloos de verre de Saariselkä aux chalets en rondins près de Levi.',
      cta: 'Voir les hébergements',
    },
    it: {
      headline: 'Trova la tua baita o il tuo iglù',
      copy: 'Confronta gli alloggi in Lapponia, dagli igloo di vetro di Saariselkä alle baite di tronchi vicino a Levi.',
      cta: 'Sfoglia gli alloggi',
    },
    nl: {
      headline: 'Vind je hut of iglo',
      copy: 'Vergelijk verblijven in Lapland, van glazen iglo’s in Saariselkä tot blokhutten bij Levi.',
      cta: 'Bekijk verblijven',
    },
    sv: {
      headline: 'Hitta din stuga eller din iglo',
      copy: 'Jämför boenden i Lappland, från glasigloor i Saariselkä till timmerstugor utanför Levi.',
      cta: 'Bläddra bland boenden',
    },
  },
  flights: {
    en: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Search flight + hotel packages to the Arctic. Direct flights from Helsinki, ~75 minutes.',
      cta: 'Compare flights',
    },
    fi: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Etsi lento + hotelli -paketteja arktiselle. Suorat lennot Helsingistä, noin 75 minuuttia.',
      cta: 'Vertaile lentoja',
    },
    de: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Suche Flug + Hotel-Pakete in die Arktis. Direktflüge ab Helsinki, ca. 75 Minuten.',
      cta: 'Flüge vergleichen',
    },
    ja: {
      headline: 'ヘルシンキ → ロヴァニエミ',
      copy: '北極圏へのフライト+ホテルのパッケージを検索。ヘルシンキから直行便で約75分。',
      cta: 'フライトを比較',
    },
    es: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Busca paquetes de vuelo + hotel al Ártico. Vuelos directos desde Helsinki, unos 75 minutos.',
      cta: 'Comparar vuelos',
    },
    'pt-BR': {
      headline: 'Helsinque → Rovaniemi',
      copy: 'Busque pacotes de voo + hotel para o Ártico. Voos diretos de Helsinque, cerca de 75 minutos.',
      cta: 'Comparar voos',
    },
    'zh-CN': {
      headline: '赫尔辛基 → 罗瓦涅米',
      copy: '搜索飞往北极的机票+酒店套餐。赫尔辛基直飞约 75 分钟。',
      cta: '比较航班',
    },
    ko: {
      headline: '헬싱키 → 로바니에미',
      copy: '북극행 항공 + 호텔 패키지를 검색하세요. 헬싱키에서 직항 약 75분.',
      cta: '항공편 비교',
    },
    fr: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Cherchez des forfaits vol + hôtel vers l’Arctique. Vols directs depuis Helsinki, environ 75 minutes.',
      cta: 'Comparer les vols',
    },
    it: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Cerca pacchetti volo + hotel per l’Artico. Voli diretti da Helsinki, circa 75 minuti.',
      cta: 'Confronta i voli',
    },
    nl: {
      headline: 'Helsinki → Rovaniemi',
      copy: 'Zoek vlucht + hotel-pakketten naar het Noordpoolgebied. Directe vluchten vanaf Helsinki, ± 75 minuten.',
      cta: 'Vergelijk vluchten',
    },
    sv: {
      headline: 'Helsingfors → Rovaniemi',
      copy: 'Sök paket med flyg + hotell till Arktis. Direktflyg från Helsingfors, cirka 75 minuter.',
      cta: 'Jämför flyg',
    },
  },
  activities: {
    en: {
      headline: 'Husky safaris, sauna, snowmobile',
      copy: 'Bookable activities from the operators that actually run them, with reviews.',
      cta: 'See activities',
    },
    fi: {
      headline: 'Huskysafarit, sauna, moottorikelkka',
      copy: 'Varattavia aktiviteetteja suoraan niitä vetäviltä yrittäjiltä, arvosteluineen.',
      cta: 'Katso aktiviteetit',
    },
    de: {
      headline: 'Huskysafaris, Sauna, Schneemobil',
      copy: 'Buchbare Aktivitäten von den Anbietern, die sie wirklich durchführen, mit Bewertungen.',
      cta: 'Aktivitäten ansehen',
    },
    ja: {
      headline: 'ハスキーサファリ、サウナ、スノーモービル',
      copy: '実際に催行するオペレーターの予約できるアクティビティ。レビュー付き。',
      cta: 'アクティビティを見る',
    },
    es: {
      headline: 'Safaris en husky, sauna, moto de nieve',
      copy: 'Actividades reservables de los operadores que realmente las organizan, con reseñas.',
      cta: 'Ver actividades',
    },
    'pt-BR': {
      headline: 'Safáris de husky, sauna, moto de neve',
      copy: 'Atividades reserváveis dos operadores que realmente as realizam, com avaliações.',
      cta: 'Ver atividades',
    },
    'zh-CN': {
      headline: '哈士奇雪橇、桑拿、雪地摩托',
      copy: '可预订的活动，来自真正运营它们的商家，附评价。',
      cta: '查看活动',
    },
    ko: {
      headline: '허스키 사파리, 사우나, 스노모빌',
      copy: '실제로 운영하는 업체의 예약 가능한 액티비티, 후기와 함께.',
      cta: '액티비티 보기',
    },
    fr: {
      headline: 'Safaris en husky, sauna, motoneige',
      copy: 'Des activités réservables auprès des opérateurs qui les organisent vraiment, avec avis.',
      cta: 'Voir les activités',
    },
    it: {
      headline: 'Safari con gli husky, sauna, motoslitta',
      copy: 'Attività prenotabili dagli operatori che le organizzano davvero, con recensioni.',
      cta: 'Vedi le attività',
    },
    nl: {
      headline: 'Huskysafari’s, sauna, sneeuwscooter',
      copy: 'Boekbare activiteiten van de aanbieders die ze echt uitvoeren, met reviews.',
      cta: 'Bekijk activiteiten',
    },
    sv: {
      headline: 'Huskysafarier, bastu, snöskoter',
      copy: 'Bokningsbara aktiviteter från arrangörerna som faktiskt kör dem, med omdömen.',
      cta: 'Se aktiviteter',
    },
  },
};

const PARTNER_ICON: Record<Partner, typeof BedDouble> = {
  hotels: BedDouble,
  flights: Plane,
  activities: MapPin,
};

/**
 * Anchor any hotels search to Finnish Lapland. A bare "Lapland" makes
 * Hotels.com geocode to *Lapland, Indiana, USA* — a real revenue/trust bug
 * (Vesa 2026-07-08). So we force ", Finland" onto every hotels query that
 * doesn't already name the country. Callers cannot re-introduce the bug.
 */
function anchorFinland(destination: string): string {
  return /finland|suomi/i.test(destination)
    ? destination
    : `${destination.replace(/[\s,]+$/, '')}, Finland`;
}

function buildHref(partner: Partner, sid: string, destination?: string, lang: Lang = 'en') {
  const params = new URLSearchParams({ sid });
  if (partner === 'hotels' && destination) params.set('ss', anchorFinland(destination));
  if (partner === 'flights' && destination) params.set('origin', destination);
  if (partner === 'activities' && destination) {
    params.set('locale', lang);
    return `${GO}/go/activities/${destination}?${params.toString()}`;
  }
  const partnerPath = partner === 'flights' ? 'cars' : partner;
  if (partner === 'hotels') params.set('locale', HOTELS_LOCALE[lang]);
  else if (partner === 'flights') params.set('lang', CARS_LANG[lang]);
  return `${GO}/go/${partnerPath}?${params.toString()}`;
}

export default function BannerAd({
  partner,
  sid,
  destination,
  headline,
  copy,
  variant = 'editorial',
}: BannerAdProps) {
  const lang = useLang();
  const defaults = PARTNER_COPY[partner][lang] ?? PARTNER_COPY[partner].en;
  const marker = AD_MARKER[lang] ?? AD_MARKER.en;
  const Icon = PARTNER_ICON[partner];
  const href = buildHref(partner, sid, destination, lang);

  if (variant === 'editorial') {
    return (
      <aside
        className="rounded-xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] p-5 not-prose"
        aria-label={marker.aria}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-mute)] font-semibold mb-3">
          {marker.label}
        </p>
        <div className="flex items-start gap-3 mb-3">
          <Icon size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
          <h4
            className="text-[var(--color-ink)] text-base font-medium leading-snug"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {headline ?? defaults.headline}
          </h4>
        </div>
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
          {copy ?? defaults.copy}
        </p>
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
        >
          {defaults.cta}
          <ArrowUpRight size={14} />
        </a>
      </aside>
    );
  }

  // Dark variant — fits dark surfaces (Archive, Category)
  return (
    <aside
      className="rounded-xl border border-purple/25 bg-night-light/60 p-5"
      aria-label={marker.aria}
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-3">
        {marker.label}
      </p>
      <div className="flex items-start gap-3 mb-3">
        <Icon size={20} className="text-pink shrink-0 mt-0.5" />
        <h4 className="text-snow text-base font-medium leading-snug">
          {headline ?? defaults.headline}
        </h4>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {copy ?? defaults.copy}
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-300 hover:text-pink-200 transition-colors"
      >
        {defaults.cta}
        <ArrowUpRight size={14} />
      </a>
    </aside>
  );
}
