import { Header } from '@/components/global/header';
import { Footer } from '@/components/global/footer';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://www.blackmontadvisory.com';

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
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
