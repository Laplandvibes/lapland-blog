import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import CookieContent from '../../../shared/Legal/CookieContent';

export default function CookiePolicy() {
  useSeo({
    title: 'Cookie Policy | Lapland Blog',
    description: 'Cookie Policy for lapland.blog — what cookies and storage we use, why, and how to opt out.',
    canonical: canonicalUrl('/cookie-policy'),
  });

  return (
    <>
      <Nav />
      <CookieContent siteId="laplandblog" siteName="Lapland Blog" />
      <Footer />
    </>
  );
}
