/**
 * Copy shared between the visible page and its structured data, so the FAQ
 * schema can never drift from what visitors actually read.
 */

export const PAGE_PATH = '/selling-a-business';

/** In-page tabs. Each id is the anchor of one section on the page. */
export const SECTIONS = [
  { id: 'why-blackmont', label: 'Why Blackmont' },
  { id: 'how-we-work', label: 'How we work' },
  { id: 'private-vs-broker', label: 'Private vs broker' },
  { id: 'valuation', label: 'Valuation' },
  { id: 'industries', label: 'Industries' },
  { id: 'locations', label: 'Locations' },
  { id: 'tips', label: 'Selling tips' },
  { id: 'faqs', label: 'FAQs' },
] as const;

export type { Faq } from '@/components/landing/tabbed-page/faq-section';
import type { Faq } from '@/components/landing/tabbed-page/faq-section';

export const FAQS: Faq[] = [
  {
    q: 'How do I sell my business?',
    a: 'Start with a confidential conversation and a realistic valuation. From there the business is prepared, taken to buyers privately, negotiated and settled, while you keep running it.',
    link: { href: '#how-we-work', label: 'See our step-by-step sale process' },
  },
  {
    q: 'How do I calculate what my business is worth?',
    a: 'Most small and medium businesses in Australia are valued at a multiple of normalised earnings, usually EBITDA. Multiples run from about 0.8× for cafés to around 5× for childcare and allied health.',
    link: { href: '/business-valuation', label: 'Try the free business valuation calculator' },
  },
  {
    q: 'How long does it take to sell a business?',
    a: 'Once it’s on the market, most businesses sell in 60 to 240 days, depending on the industry, the price and how well prepared they are.',
    link: { href: '/guides/how-long-does-it-take-to-sell-a-business', label: 'Read: How long it takes to sell a business' },
  },
  {
    q: 'Should I sell my business privately or use a business broker?',
    a: 'Selling privately saves the fee, but you’ll price, market, screen buyers and negotiate yourself while still running the business. For most owners, a better result on price and terms more than covers a broker’s fee.',
    link: { href: '#private-vs-broker', label: 'Compare selling privately and using a broker' },
  },
  {
    q: 'Can I sell my business confidentially?',
    a: 'Yes. The business is marketed anonymously, every buyer signs an NDA, and you approve each one before they see any details.',
    link: { href: '/guides/how-to-sell-a-business-confidentially', label: 'Read: How to sell a business confidentially' },
  },
  {
    q: 'Can I sell my business to private equity?',
    a: 'Yes, if the business is large enough, earns consistently and can run without you. We can bring these buyers into the same confidential process as private buyers.',
    link: { href: '#enquire', label: 'Talk to us confidentially' },
  },
  {
    q: 'How do I know if my business is ready to sell?',
    a: 'When a buyer can check your earnings and see the business will keep going without you. That means clean financials, a secure lease and no heavy reliance on one customer, or on you.',
    link: { href: '/exit/sale-readiness', label: 'Take the free sale readiness check' },
  },
];
