import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { PageBanner } from '@/components/global/page-banner';
import { ReviewsCarousel } from '@/components/global/reviews-carousel';
import { ServicesGrid, SERVICES } from './_components/services-grid';
import { ProcessSteps } from './_components/process-steps';
import { FAQSection } from './_components/faq-section';
import { FAQS } from './_components/faqs';
import { CTASection } from './_components/cta-section';

const SITE_URL = 'https://blackmontadvisory.com';
const DESCRIPTION =
  'Comprehensive business brokerage services tailored to your needs — business appraisals, selling your business, buyer advisory, business advisory, exit strategy and consulting from Blackmont Advisory.';

export const metadata: Metadata = {
  title: 'Our Services | Blackmont Advisory',
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/services`,
    siteName: 'Blackmont Advisory',
    title: 'Our Services | Blackmont Advisory',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Blackmont Advisory',
    description: DESCRIPTION,
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blackmont Advisory Services',
    itemListElement: SERVICES.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.title,
        provider: {
          '@type': 'ProfessionalService',
          name: 'Blackmont Advisory',
          url: SITE_URL,
        },
        areaServed: 'AU',
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageBanner
        title={
          <>
            Our <span className='font-light text-accent'>Services</span>
          </>
        }
        description='Comprehensive business brokerage services tailored to your needs.'
        image='/services.webp'
      />
      <ServicesGrid />
      <ProcessSteps />
      <ReviewsCarousel className='py-24' />
      <FAQSection />
      <CTASection />
    </>
  );
}
