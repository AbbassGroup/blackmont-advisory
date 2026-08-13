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

const SITE_URL = 'https://www.blackmontadvisory.com';
const OG_IMAGE = '/assets/blackmont-og.png';
const DESCRIPTION =
  'Blackmont Advisory is a boutique, senior-led M&A firm. We manage confidential business sales for owners and act as exclusive buyer advocates for acquirers across Australia and beyond.';

// NOTE: openGraph/twitter are REPLACED (not deep-merged) by Next.js, so this
// block re-declares images/siteName/locale to keep the root layout's defaults.
export const metadata: Metadata = {
  title:
    'Blackmont Advisory | Boutique M&A Advisory for Business Sales & Acquisitions',
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Blackmont Advisory',
    title: 'Blackmont Advisory | Trusted M&A Advisory',
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Blackmont Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blackmont Advisory | Trusted M&A Advisory',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Blackmont Advisory',
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  image: `${SITE_URL}${OG_IMAGE}`,
  email: 'info@blackmontadvisory.com',
  areaServed: 'AU',
  address: { '@type': 'PostalAddress', addressCountry: 'AU' },
  knowsAbout: [
    'Mergers and Acquisitions',
    'Business Sales',
    'Buyer Advocacy',
    'Deal Structuring',
    'Business Valuation',
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
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
