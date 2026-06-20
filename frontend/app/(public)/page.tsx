import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { Hero } from '@/components/landing/hero';
import { TrustStrip } from '@/components/landing/trust-strip';
import { About } from '@/components/landing/about';
import { DualPath } from '@/components/landing/dual-path';
import { Selling } from '@/components/landing/selling';
import { Buying } from '@/components/landing/buying';
import { Network } from '@/components/landing/network';
import { Why } from '@/components/landing/why';
import { Contact } from '@/components/landing/contact';

// const SITE_URL = 'https://blackmontadvisory.com';
// const DESCRIPTION =
//   'Blackmont Advisory is a boutique, senior-led M&A firm. We manage confidential business sales for owners and act as exclusive buyer advocates for acquirers across Australia and beyond.';

// export const metadata: Metadata = {
//   title:
//     'Blackmont Advisory | Boutique M&A Advisory for Business Sales & Acquisitions',
//   description: DESCRIPTION,
//   alternates: { canonical: '/' },
//   openGraph: {
//     type: 'website',
//     locale: 'en_AU',
//     url: SITE_URL,
//     siteName: 'Blackmont Advisory',
//     title: 'Blackmont Advisory | Trusted M&A Advisory',
//     description: DESCRIPTION,
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Blackmont Advisory | Trusted M&A Advisory',
//     description: DESCRIPTION,
//   },
// };

// const structuredData = {
//   '@context': 'https://schema.org',
//   '@type': 'ProfessionalService',
//   name: 'Blackmont Advisory',
//   description: DESCRIPTION,
//   url: SITE_URL,
//   email: 'info@blackmontadvisory.com',
//   areaServed: 'AU',
//   address: { '@type': 'PostalAddress', addressCountry: 'AU' },
//   knowsAbout: [
//     'Mergers and Acquisitions',
//     'Business Sales',
//     'Buyer Advocacy',
//     'Deal Structuring',
//     'Business Valuation',
//   ],
// };

export default function HomePage() {
  return (
    <>
      {/* <JsonLd data={structuredData} /> */}
      <Hero />
      <TrustStrip />
      <About />
      <DualPath />
      <Selling />
      <Buying />
      <Network />
      <Why />
      <Contact />
    </>
  );
}
