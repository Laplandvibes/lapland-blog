import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import TermsContent from '../../../shared/Legal/TermsContent';

export default function Terms() {
  useSeo({
    title: 'Terms of Service | Lapland Blog',
    description: 'Terms of Service for lapland.blog — long-form Lapland travel editorial, operated by Lapeso Oy.',
    canonical: canonicalUrl('/terms'),
  });

  return (
    <>
      <Nav />
      <TermsContent siteName="Lapland Blog" siteUrl="https://lapland.blog" />
      <Footer />
    </>
  );
}
