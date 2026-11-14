import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { ClosingCta } from '@/components/landing/tabbed-page/closing-cta';
import { FaqSection, type Faq } from '@/components/landing/tabbed-page/faq-section';
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd, SITE_URL } from '@/lib/seo';
import { AboutBanner } from './_components/banner';
import {
  CredentialsBar,
  Network,
  Principles,
  Services,
  WhoWeAre,
} from './_components/sections';

const PAGE_PATH = '/about-us';

// Primary: "Blackmont Advisory" (brand) + "M&A advisor Melbourne".
// Secondary: "business advisory services", "private equity", "family offices".
export const metadata: Metadata = buildMetadata({
  path: PAGE_PATH,
  title: 'About Blackmont Advisory | Melbourne M&A Advisory Firm',
  description:
    'Blackmont Advisory is a boutique M&A and business advisory firm in Melbourne, managing confidential business sales and acting for buyers across Australia.',
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'About Us', path: PAGE_PATH },
];

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: absoluteUrl(PAGE_PATH),
  name: 'About Blackmont Advisory',
  mainEntity: { '@id': `${SITE_URL}/#organization` },
};

const FAQS: Faq[] = [
  {
    q: 'What does Blackmont Advisory do?',
    a: 'We are a Melbourne M&A and business advisory firm. We sell businesses confidentially for their owners, and we act for buyers looking to acquire a business, from the first conversation through to settlement.',
    link: { href: '/selling-a-business', label: 'How we sell a business' },
  },
  {
    q: 'Is Blackmont Advisory a business broker?',
    a: 'Yes. We are a licensed business agent in Victoria (BLA 092153L), and we run each sale the way an M&A advisor would: a proper valuation, an Information Memorandum, buyers screened under NDA, and one senior advisor throughout.',
    link: { href: '/business-brokers', label: 'Our business broker services' },
  },
  {
    q: 'Where is Blackmont Advisory based?',
    a: 'Our office is at 459 Toorak Road, Toorak, in Melbourne. We work with clients across Victoria and around Australia, by phone and video, and meet in person when a deal needs it.',
    link: { href: '/business-brokers/melbourne', label: 'Business brokers in Melbourne' },
  },
  {
    q: 'Who do you work with?',
    a: 'Business owners planning a sale or exit, first-time buyers, and operators growing through acquisition. Our buyer network includes private investors, family offices and private equity.',
    link: { href: '/buying-a-business', label: 'How we help buyers' },
  },
  {
    q: 'How much does it cost to sell a business with Blackmont?',
    a: 'It depends on the size and complexity of the sale. The first conversation is free and confidential, and our fees are agreed in writing before any work starts, so you know exactly what you will pay and when.',
    link: { href: '/business-brokers', label: 'How business broker fees work' },
  },
];

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={[breadcrumbJsonLd(CRUMBS), aboutJsonLd, faqJsonLd(FAQS)]} />
      <AboutBanner crumbs={CRUMBS} />
      <CredentialsBar />
      <WhoWeAre />
      <Principles />
      <Services />
      <Network />
      <FaqSection
        faqs={FAQS}
        heading='About Blackmont Advisory: FAQs'
        intro='Quick answers about who we are and how we work.'
      />
      <ClosingCta
        heading='Every transaction starts with a conversation.'
        text='Thinking about selling, buying or just weighing up your options? Speak directly with Blackmont.'
        enquireHref='/#contact'
      />
    </div>
  );
}
