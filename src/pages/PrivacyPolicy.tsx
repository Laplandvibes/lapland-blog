import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import PrivacyContent from '../shared/Legal/PrivacyContent';
import { useLang, type Lang } from '../i18n/useLang';

// <title> and description per locale. The prerender reads these same `const <locale>` blocks
// (scripts/routes.json "pageFile": seoTitle / seoDescription), so the static HTML and the browser
// show one text: change it only here.
const en = { seoTitle: 'Privacy Policy', seoDescription: 'How Lapland.blog handles your data. The free Finnish Lapland travel-blog platform operated by LaPeso Oy. GDPR compliant.' };
const fi = { seoTitle: 'Tietosuojaseloste', seoDescription: 'Miten Lapland.blog käsittelee tietojasi. Ilmainen Suomen Lapin matkablogialusta, jota ylläpitää LaPeso Oy. GDPR:n mukainen.' };
const de = { seoTitle: 'Datenschutzerklärung', seoDescription: 'Wie Lapland.blog mit Ihren Daten umgeht. Die kostenlose Reiseblog-Plattform für Finnisch-Lappland, betrieben von LaPeso Oy. DSGVO-konform.' };
const ja = { seoTitle: 'プライバシーポリシー', seoDescription: 'Lapland.blogがあなたのデータをどう扱うか。LaPeso Oyが運営する、フィンランド・ラップランドの無料旅行ブログプラットフォーム。GDPR準拠。' };
const es = { seoTitle: 'Política de privacidad', seoDescription: 'Cómo trata sus datos Lapland.blog: la plataforma gratuita de blogs de viaje a la Laponia finlandesa operada por LaPeso Oy. Conforme al RGPD.' };
const ptBR = { seoTitle: 'Política de privacidade', seoDescription: 'Como o Lapland.blog trata seus dados: a plataforma gratuita de blogs de viagem à Lapônia finlandesa operada pela LaPeso Oy. Em conformidade com o GDPR.' };
const zhCN = { seoTitle: '隐私政策', seoDescription: 'Lapland.blog 如何处理你的数据。由 LaPeso Oy 运营的免费芬兰拉普兰旅行博客平台。符合 GDPR。我们通过 Google Analytics 4 收集假名化的访问分析数据。' };
const ko = { seoTitle: '개인정보처리방침', seoDescription: 'Lapland.blog가 귀하의 데이터를 처리하는 방식. LaPeso Oy가 운영하는 무료 핀란드 라플란드 여행 블로그 플랫폼. GDPR 준수.' };
const fr = { seoTitle: 'Politique de confidentialité', seoDescription: 'Comment Lapland.blog traite vos données. La plateforme gratuite de blogs de voyage en Laponie finlandaise exploitée par LaPeso Oy. Conforme au RGPD.' };
const it = { seoTitle: 'Informativa sulla privacy', seoDescription: 'Come Lapland.blog tratta i Suoi dati: la piattaforma gratuita di blog di viaggio in Lapponia finlandese gestita da LaPeso Oy. Conforme al GDPR.' };
const nl = { seoTitle: 'Privacybeleid', seoDescription: 'Hoe Lapland.blog met uw gegevens omgaat. Het gratis reisblogplatform voor Fins Lapland, beheerd door LaPeso Oy. AVG-conform.' };
const sv = { seoTitle: 'Integritetspolicy', seoDescription: 'Hur Lapland.blog hanterar dina uppgifter. Den gratis resebloggplattformen för finska Lappland som drivs av LaPeso Oy. GDPR-förenlig.' };
const META: Record<Lang, { seoTitle: string; seoDescription: string }> = {
  en, fi, de, ja, es, 'pt-BR': ptBR, 'zh-CN': zhCN, ko, fr, it, nl, sv,
};

export default function PrivacyPolicy() {
  const lang = useLang();
  useSeo({
    title: META[lang].seoTitle,
    description: META[lang].seoDescription,
    canonical: canonicalUrl('/privacy'),
  });

  return (
    <>
      <Nav />
      {/* 🔴 The landmark for this page. shared/Legal/PrivacyContent opens a
          plain <div> (only its sibling TermsContent opens a <main>), so without
          this wrapper the page has NO main landmark at all -- measured from the
          rendered DOM 2026-08-13 across 10 network sites. Do not remove. */}
      <main>
        <PrivacyContent siteName="Lapland Blog" lang={lang} />
      </main>
      <Footer />
    </>
  );
}
