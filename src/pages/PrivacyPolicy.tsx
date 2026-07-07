import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import PrivacyContent from '../../../shared/Legal/PrivacyContent';
import { useLang, type Lang } from '../i18n/useLang';

// Localized title/description — kept in sync with scripts/routes.json
// (/privacy fallbackTitleByLang) so the client-side document.title matches
// the prerendered <title> on /fi, /de, … instead of staying English.
const TITLE: Record<Lang, string> = {
  en: 'Privacy Policy · Lapland.blog',
  fi: 'Tietosuojaseloste · Lapland.blog',
  de: 'Datenschutzerklärung · Lapland.blog',
  ja: 'プライバシーポリシー · Lapland.blog',
  es: 'Política de privacidad · Lapland.blog',
  'pt-BR': 'Política de Privacidade · Lapland.blog',
  'zh-CN': '隐私政策 · Lapland.blog',
  ko: '개인정보처리방침 · Lapland.blog',
  fr: 'Politique de confidentialité · Lapland.blog',
  it: 'Informativa sulla privacy · Lapland.blog',
  nl: 'Privacybeleid · Lapland.blog',
};
const DESCRIPTION: Record<Lang, string> = {
  en: 'How Lapland.blog handles your data. The free Finnish Lapland travel-blog platform operated by Lapeso Oy. GDPR compliant.',
  fi: 'Miten Lapland.blog käsittelee tietojasi. Ilmainen Suomen Lapin matkablogialusta, jota ylläpitää Lapeso Oy. GDPR:n mukainen.',
  de: 'Wie Lapland.blog mit deinen Daten umgeht. Die kostenlose Reiseblog-Plattform für Finnisch-Lappland, betrieben von Lapeso Oy. DSGVO-konform.',
  ja: 'Lapland.blogがあなたのデータをどう扱うか。Lapeso Oyが運営する、フィンランド・ラップランドの無料旅行ブログプラットフォーム。GDPR準拠。',
  es: 'Cómo trata tus datos Lapland.blog: la plataforma gratuita de blogs de viaje a la Laponia finlandesa operada por Lapeso Oy. Conforme al RGPD.',
  'pt-BR': 'Como o Lapland.blog trata seus dados: a plataforma gratuita de blogs de viagem à Lapônia finlandesa operada pela Lapeso Oy. Em conformidade com o RGPD.',
  'zh-CN': 'Lapland.blog 如何处理你的数据。由 Lapeso Oy 运营的免费芬兰拉普兰旅行博客平台。符合 GDPR。',
  ko: 'Lapland.blog가 귀하의 데이터를 처리하는 방식. Lapeso Oy가 운영하는 무료 핀란드 라플란드 여행 블로그 플랫폼. GDPR 준수.',
  fr: 'Comment Lapland.blog traite vos données. La plateforme gratuite de blogs de voyage en Laponie finlandaise exploitée par Lapeso Oy. Conforme au RGPD.',
  it: 'Come Lapland.blog tratta i tuoi dati: la piattaforma gratuita di blog di viaggio in Lapponia finlandese gestita da Lapeso Oy. Conforme al GDPR.',
  nl: 'Hoe Lapland.blog met je gegevens omgaat. Het gratis reisblogplatform voor Fins Lapland, beheerd door Lapeso Oy. AVG-conform.',
};

export default function PrivacyPolicy() {
  const lang = useLang();
  useSeo({
    title: TITLE[lang],
    description: DESCRIPTION[lang],
    canonical: canonicalUrl('/privacy'),
  });

  return (
    <>
      <Nav />
      <PrivacyContent siteName="Lapland Blog" lang={lang} />
      <Footer />
    </>
  );
}
