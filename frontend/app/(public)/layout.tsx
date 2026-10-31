import { LandingHeader } from '@/components/landing/header';
import { LandingFooter } from '@/components/landing/footer';
import { LandingTheme } from '@/components/landing/landing-theme';
import { JsonLd } from '@/components/seo/json-ld';

const SITE_URL = 'https://blackmontadvisory.com';

/**
 * Official profiles of the firm — LinkedIn, Google Business Profile, etc.
 * `sameAs` tells Google and AI answer engines these all describe one entity.
 * Only list profiles the firm actually controls.
 */
const SOCIAL_PROFILES: string[] = [
  // Google Business Profile. The share link minus `/review` — that suffix opens
  // the review form rather than the profile.
  'https://g.page/r/Cf9d4jAIBo5zEAI',
  // TODO: add the company LinkedIn page once it exists.
];

// ProfessionalService is a LocalBusiness (so address/phone count for local
// search) and still an Organization (so `logo` is honoured). Contact details
// mirror the footer — keep the two in step.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Blackmont Advisory',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  image: `${SITE_URL}/assets/blackmont-og.png`,
  email: 'info@blackmontadvisory.com',
  telephone: '1300 369 474',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1/459 Toorak Road',
    addressLocality: 'Toorak',
    addressRegion: 'VIC',
    postalCode: '3149',
    addressCountry: 'AU',
  },
  description:
    'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses.',
  areaServed: { '@type': 'Country', name: 'Australia' },
  knowsAbout: [
    'Business brokerage',
    'Selling a business',
    'Buying a business',
    'Business valuation',
    'Exit planning',
    'Mergers and acquisitions',
  ],
  ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <LandingTheme data-landing-page className='flex flex-1 flex-col'>
        <LandingHeader homePath='/' />
        <main id='top' className='flex-1'>{children}</main>
        <LandingFooter homePath='/' />
      </LandingTheme>
    </>
  );
}
