import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import CookieContent from '../shared/Legal/CookieContent';
import { useLang, type Lang } from '../i18n/useLang';

// <title> and description per locale. The prerender reads these same `const <locale>` blocks
// (scripts/routes.json "pageFile": seoTitle / seoDescription), so the static HTML and the browser
// show one text: change it only here.
const en = { seoTitle: 'Cookie Policy', seoDescription: 'What cookies and storage Lapland.blog uses, why, and how to opt out. The free Finnish Lapland travel-blog platform by LaPeso Oy.' };
const fi = { seoTitle: 'Evästekäytäntö', seoDescription: 'Mitä evästeitä ja tallennusta Lapland.blog käyttää, miksi ja miten kiellät ne. Ilmainen Suomen Lapin matkablogialusta, ylläpitäjä LaPeso Oy.' };
const de = { seoTitle: 'Cookie-Richtlinie', seoDescription: 'Welche Cookies und welchen Speicher Lapland.blog nutzt, warum, und wie Sie widersprechen. Die kostenlose Reiseblog-Plattform für Finnisch-Lappland.' };
const ja = { seoTitle: 'クッキーポリシー', seoDescription: 'Lapland.blogが使うクッキーとストレージの種類、その理由、オプトアウトの方法。LaPeso Oyによるフィンランド・ラップランドの無料旅行ブログプラットフォーム。' };
const es = { seoTitle: 'Política de cookies y consentimiento', seoDescription: 'Qué cookies y almacenamiento usa Lapland.blog, por qué y cómo rechazarlos: la plataforma gratuita de blogs de viaje a la Laponia finlandesa de LaPeso Oy.' };
const ptBR = { seoTitle: 'Política de cookies', seoDescription: 'Quais cookies e armazenamento o Lapland.blog usa, por quê e como recusar: a plataforma gratuita de blogs de viagem à Lapônia finlandesa da LaPeso Oy.' };
const zhCN = { seoTitle: 'Cookie 政策', seoDescription: 'Lapland.blog 使用哪些 Cookie 和存储、为何使用，以及如何选择退出。由 LaPeso Oy 运营的免费芬兰拉普兰旅行博客平台。' };
const ko = { seoTitle: '쿠키 정책', seoDescription: 'Lapland.blog가 사용하는 쿠키와 저장소, 그 이유, 그리고 거부 방법. LaPeso Oy의 무료 핀란드 라플란드 여행 블로그 플랫폼.' };
const fr = { seoTitle: 'Politique relative aux cookies', seoDescription: 'Quels cookies et stockage Lapland.blog utilise, pourquoi et comment les refuser. La plateforme gratuite de blogs de voyage en Laponie finlandaise par LaPeso Oy.' };
const it = { seoTitle: 'Informativa sui cookie', seoDescription: 'Quali cookie e archiviazione usa Lapland.blog, perché e come rifiutarli: la piattaforma gratuita di blog di viaggio in Lapponia finlandese di LaPeso Oy.' };
const nl = { seoTitle: 'Cookiebeleid', seoDescription: 'Welke cookies en opslag Lapland.blog gebruikt, waarom en hoe u zich afmeldt. Het gratis reisblogplatform voor Fins Lapland van LaPeso Oy.' };
const sv = { seoTitle: 'Cookiepolicy', seoDescription: 'Vilka cookies och vilken lagring Lapland.blog använder, varför och hur du tackar nej. Den gratis resebloggplattformen för finska Lappland från LaPeso Oy.' };
const META: Record<Lang, { seoTitle: string; seoDescription: string }> = {
  en, fi, de, ja, es, 'pt-BR': ptBR, 'zh-CN': zhCN, ko, fr, it, nl, sv,
};

export default function CookiePolicy() {
  const lang = useLang();
  useSeo({
    title: META[lang].seoTitle,
    description: META[lang].seoDescription,
    canonical: canonicalUrl('/cookie-policy'),
  });

  return (
    <>
      <Nav />
      {/* 🔴 The landmark for this page. shared/Legal/CookieContent opens a
          plain <div> (only its sibling TermsContent opens a <main>), so without
          this wrapper the page has NO main landmark at all -- measured from the
          rendered DOM 2026-08-13 across 10 network sites. Do not remove. */}
      <main>
        <CookieContent siteId="laplandblog" siteName="Lapland Blog" lang={lang} />
      </main>
      <Footer />
    </>
  );
}
