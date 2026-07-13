import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import CookieContent from '../../../shared/Legal/CookieContent';
import { useLang, type Lang } from '../i18n/useLang';

// Localized title/description — kept in sync with scripts/routes.json
// (/cookie-policy fallbackTitleByLang) so the client-side document.title matches
// the prerendered <title> on /fi, /de, … instead of staying English.
const TITLE: Record<Lang, string> = {
  en: 'Cookie Policy · Lapland.blog',
  fi: 'Evästekäytäntö · Lapland.blog',
  de: 'Cookie-Richtlinie · Lapland.blog',
  ja: 'クッキーポリシー · Lapland.blog',
  es: 'Política de cookies · Lapland.blog',
  'pt-BR': 'Política de Cookies · Lapland.blog',
  'zh-CN': 'Cookie 政策 · Lapland.blog',
  ko: '쿠키 정책 · Lapland.blog',
  fr: 'Politique relative aux cookies · Lapland.blog',
  it: 'Informativa sui cookie · Lapland.blog',
  nl: 'Cookiebeleid · Lapland.blog',
  sv: 'Cookiepolicy · Lapland.blog',
};
const DESCRIPTION: Record<Lang, string> = {
  en: 'What cookies and storage Lapland.blog uses, why, and how to opt out. The free Finnish Lapland travel-blog platform by Lapeso Oy.',
  fi: 'Mitä evästeitä ja tallennusta Lapland.blog käyttää, miksi ja miten kiellät ne. Ilmainen Suomen Lapin matkablogialusta, ylläpitäjä Lapeso Oy.',
  de: 'Welche Cookies und welchen Speicher Lapland.blog nutzt, warum und wie du widersprichst. Die kostenlose Reiseblog-Plattform für Finnisch-Lappland von Lapeso Oy.',
  ja: 'Lapland.blogが使うクッキーとストレージの種類、その理由、オプトアウトの方法。Lapeso Oyによるフィンランド・ラップランドの無料旅行ブログプラットフォーム。',
  es: 'Qué cookies y almacenamiento usa Lapland.blog, por qué y cómo rechazarlos: la plataforma gratuita de blogs de viaje a la Laponia finlandesa de Lapeso Oy.',
  'pt-BR': 'Quais cookies e armazenamento o Lapland.blog usa, por quê e como recusar: a plataforma gratuita de blogs de viagem à Lapônia finlandesa da Lapeso Oy.',
  'zh-CN': 'Lapland.blog 使用哪些 Cookie 和存储、为何使用，以及如何选择退出。由 Lapeso Oy 运营的免费芬兰拉普兰旅行博客平台。',
  ko: 'Lapland.blog가 사용하는 쿠키와 저장소, 그 이유, 그리고 거부 방법. Lapeso Oy의 무료 핀란드 라플란드 여행 블로그 플랫폼.',
  fr: 'Quels cookies et stockage Lapland.blog utilise, pourquoi et comment les refuser. La plateforme gratuite de blogs de voyage en Laponie finlandaise par Lapeso Oy.',
  it: 'Quali cookie e archiviazione usa Lapland.blog, perché e come rifiutarli: la piattaforma gratuita di blog di viaggio in Lapponia finlandese di Lapeso Oy.',
  nl: 'Welke cookies en opslag Lapland.blog gebruikt, waarom en hoe je je afmeldt. Het gratis reisblogplatform voor Fins Lapland van Lapeso Oy.',
  sv: 'Vilka cookies och vilken lagring Lapland.blog använder, varför och hur du tackar nej. Den gratis resebloggplattformen för finska Lappland från Lapeso Oy.',
};

export default function CookiePolicy() {
  const lang = useLang();
  useSeo({
    title: TITLE[lang],
    description: DESCRIPTION[lang],
    canonical: canonicalUrl('/cookie-policy'),
  });

  return (
    <>
      <Nav />
      <CookieContent siteId="laplandblog" siteName="Lapland Blog" lang={lang} />
      <Footer />
    </>
  );
}
