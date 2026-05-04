import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import PrivacyContent from '../../../shared/Legal/PrivacyContent';

export default function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy | Lapland Blog',
    description: 'Privacy Policy for lapland.blog — long-form Lapland travel editorial, operated by Lapeso Oy. GDPR compliant.',
    canonical: canonicalUrl('/privacy'),
  });

  return (
    <>
      <Nav />
      <PrivacyContent siteName="Lapland Blog" />
      <Footer />
    </>
  );
}
