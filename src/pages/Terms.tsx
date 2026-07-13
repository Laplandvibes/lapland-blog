import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import TermsContent from '../../../shared/Legal/TermsContent';
import { useLang, type Lang } from '../i18n/useLang';

// Localized title/description — kept in sync with scripts/routes.json
// (/terms fallbackTitleByLang) so the client-side document.title matches
// the prerendered <title> on /fi, /de, … instead of staying English.
const TITLE: Record<Lang, string> = {
  en: 'Terms of Service · Lapland.blog',
  fi: 'Käyttöehdot · Lapland.blog',
  de: 'Nutzungsbedingungen · Lapland.blog',
  ja: '利用規約 · Lapland.blog',
  es: 'Términos del servicio · Lapland.blog',
  'pt-BR': 'Termos de Serviço · Lapland.blog',
  'zh-CN': '服务条款 · Lapland.blog',
  ko: '이용약관 · Lapland.blog',
  fr: "Conditions d'utilisation · Lapland.blog",
  it: 'Termini di servizio · Lapland.blog',
  nl: 'Servicevoorwaarden · Lapland.blog',
  sv: 'Användarvillkor · Lapland.blog',
};
const DESCRIPTION: Record<Lang, string> = {
  en: 'The terms for using Lapland.blog, the free Finnish Lapland travel-blog platform where you keep and share a trip diary. Operated by Lapeso Oy.',
  fi: 'Lapland.blogin käyttöehdot. Ilmainen Suomen Lapin matkablogialusta, jolla pidät ja jaat matkapäiväkirjaa. Ylläpitäjä Lapeso Oy.',
  de: 'Die Nutzungsbedingungen von Lapland.blog, der kostenlosen Reiseblog-Plattform für Finnisch-Lappland, auf der du ein Reisetagebuch führst und teilst. Von Lapeso Oy.',
  ja: 'Lapland.blogの利用規約。旅の日記を残して共有する、フィンランド・ラップランドの無料旅行ブログプラットフォーム。運営はLapeso Oy。',
  es: 'Las condiciones para usar Lapland.blog: la plataforma gratuita de blogs de viaje a la Laponia finlandesa donde llevas y compartes un diario. Operada por Lapeso Oy.',
  'pt-BR': 'As condições para usar o Lapland.blog: a plataforma gratuita de blogs de viagem à Lapônia finlandesa onde você mantém e compartilha um diário. Operada pela Lapeso Oy.',
  'zh-CN': '使用 Lapland.blog 的条款。这个免费的芬兰拉普兰旅行博客平台让你记录并分享旅行日记。由 Lapeso Oy 运营。',
  ko: 'Lapland.blog 이용 조건. 여행 일기를 쓰고 공유하는 무료 핀란드 라플란드 여행 블로그 플랫폼. Lapeso Oy가 운영합니다.',
  fr: "Les conditions d'utilisation de Lapland.blog, la plateforme gratuite de blogs de voyage en Laponie finlandaise où vous tenez et partagez un journal. Exploitée par Lapeso Oy.",
  it: 'Le condizioni per usare Lapland.blog: la piattaforma gratuita di blog di viaggio in Lapponia finlandese dove tieni e condividi un diario. Gestita da Lapeso Oy.',
  nl: 'De voorwaarden voor het gebruik van Lapland.blog, het gratis reisblogplatform voor Fins Lapland waar je een reisdagboek bijhoudt en deelt. Beheerd door Lapeso Oy.',
  sv: 'Villkoren för att använda Lapland.blog, den gratis resebloggplattformen för finska Lappland där du för och delar en resedagbok. Drivs av Lapeso Oy.',
};

export default function Terms() {
  const lang = useLang();
  useSeo({
    title: TITLE[lang],
    description: DESCRIPTION[lang],
    canonical: canonicalUrl('/terms'),
  });

  return (
    <>
      <Nav />
      <TermsContent siteName="Lapland Blog" siteUrl="https://lapland.blog" lang={lang} />
      <Footer />
    </>
  );
}
