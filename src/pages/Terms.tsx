import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import TermsContent from '../shared/Legal/TermsContent';
import { useLang, type Lang } from '../i18n/useLang';

// <title> and description per locale. The prerender reads these same `const <locale>` blocks
// (scripts/routes.json "pageFile": seoTitle / seoDescription), so the static HTML and the browser
// show one text: change it only here.
const en = { seoTitle: 'Terms of Service', seoDescription: 'The terms for using Lapland.blog, the free Finnish Lapland travel-blog platform where you keep and share a trip diary. Operated by LaPeso Oy.' };
const fi = { seoTitle: 'Käyttöehdot', seoDescription: 'Lapland.blogin käyttöehdot. Ilmainen Suomen Lapin matkablogialusta, jolla pidät ja jaat matkapäiväkirjaa. Ylläpitäjä LaPeso Oy.' };
const de = { seoTitle: 'Nutzungsbedingungen', seoDescription: 'Die Nutzungsbedingungen von Lapland.blog, der kostenlosen Reiseblog-Plattform für Finnisch-Lappland, auf der Sie ein Reisetagebuch führen und teilen.' };
const ja = { seoTitle: '利用規約', seoDescription: 'Lapland.blogの利用規約。旅の日記を残して共有する、フィンランド・ラップランドの無料旅行ブログプラットフォーム。運営はLaPeso Oy。' };
const es = { seoTitle: 'Términos de uso', seoDescription: 'Las condiciones para usar Lapland.blog: la plataforma gratuita de blogs de viaje a la Laponia finlandesa donde llevas y compartes un diario.' };
const ptBR = { seoTitle: 'Termos de serviço', seoDescription: 'As condições para usar o Lapland.blog: a plataforma gratuita de blogs de viagem à Lapônia finlandesa onde você mantém e compartilha um diário.' };
const zhCN = { seoTitle: '服务条款', seoDescription: '使用 Lapland.blog 的条款。这个免费的芬兰拉普兰旅行博客平台让你记录并分享旅行日记。由 LaPeso Oy 运营。' };
const ko = { seoTitle: '이용약관', seoDescription: 'Lapland.blog 이용 조건. 여행 일기를 쓰고 공유하는 무료 핀란드 라플란드 여행 블로그 플랫폼. LaPeso Oy가 운영합니다.' };
const fr = { seoTitle: "Conditions d'utilisation", seoDescription: "Les conditions d'utilisation de Lapland.blog, la plateforme gratuite de blogs de voyage en Laponie finlandaise où vous tenez et partagez un journal." };
const it = { seoTitle: 'Termini di servizio', seoDescription: 'Le condizioni per usare Lapland.blog: la piattaforma gratuita di blog di viaggio in Lapponia finlandese dove tiene e condivide un diario. Gestita da LaPeso Oy.' };
const nl = { seoTitle: 'Gebruiksvoorwaarden', seoDescription: 'De voorwaarden voor het gebruik van Lapland.blog, het gratis reisblogplatform voor Fins Lapland waar u een reisdagboek bijhoudt en deelt.' };
const sv = { seoTitle: 'Användarvillkor', seoDescription: 'Villkoren för att använda Lapland.blog, den gratis resebloggplattformen för finska Lappland där du för och delar en resedagbok. Drivs av LaPeso Oy.' };
const META: Record<Lang, { seoTitle: string; seoDescription: string }> = {
  en, fi, de, ja, es, 'pt-BR': ptBR, 'zh-CN': zhCN, ko, fr, it, nl, sv,
};

export default function Terms() {
  const lang = useLang();
  useSeo({
    title: META[lang].seoTitle,
    description: META[lang].seoDescription,
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
