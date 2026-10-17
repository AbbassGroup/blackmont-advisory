import { Footer } from '@/components/global/footer';
import { PublicChrome } from '@/components/global/public-chrome';
import { LandingFooter } from '@/components/landing/footer';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://blackmontadvisory.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blackmont Advisory',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  email: 'info@blackmontadvisory.com',
  description:
    'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses.',
  areaServed: 'AU',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <PublicChrome
        footer={<Footer />}
        landingFooter={<LandingFooter />}
        interiorFooter={<LandingFooter homePath='/' />}
      >
        {children}
      </PublicChrome>
    </>
  );
}
