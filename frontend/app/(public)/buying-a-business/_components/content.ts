import type { Faq } from '@/components/landing/tabbed-page/faq-section';

/**
 * Copy shared between the visible page and its structured data, so the FAQ
 * schema can never drift from what visitors actually read.
 */

export const PAGE_PATH = '/buying-a-business';

/** In-page tabs. Each id is the anchor of one section on the page. */
export const SECTIONS = [
  { id: 'recent-acquisitions', label: 'Recent acquisitions' },
  { id: 'why-blackmont', label: 'Why Blackmont' },
  { id: 'how-we-work', label: 'How we work' },
  { id: 'who-we-help', label: 'Who we help' },
  { id: 'agent-vs-diy', label: 'Advisor vs DIY' },
  { id: 'due-diligence', label: 'Due diligence' },
  { id: 'locations', label: 'Locations' },
  { id: 'tips', label: 'Buying tips' },
  { id: 'faqs', label: 'FAQs' },
] as const;

export const FAQS: Faq[] = [
  {
    q: 'How do I buy a business?',
    a: 'Start by deciding what you want to buy and what you can afford. Then search on and off market, value the businesses that fit, negotiate price and terms, complete due diligence and settle with a proper handover. A buyer’s advisor runs this with you, so you don’t miss the things that cost money later.',
    link: { href: '#how-we-work', label: 'See our step-by-step buying process' },
  },
  {
    q: 'How do I find a business to buy?',
    a: 'Most buyers only look at online listings, but many good businesses never reach them. We search listings and broker networks, and approach owners directly about businesses that are not on the market.',
    link: { href: '/listings/exclusive-5m-acquisition-opportunities', label: 'See exclusive $5M+ opportunities' },
  },
  {
    q: 'What does a business buyer’s advisor do?',
    a: 'A buyer’s advisor works only for you. We find suitable businesses, check the numbers, negotiate price and terms, and manage due diligence through to settlement and handover.',
    link: { href: '#why-blackmont', label: 'Why buyers use Blackmont' },
  },
  {
    q: 'The seller already has a broker. Why do I need an advisor?',
    a: 'The seller’s broker is paid by the seller and works to get the seller the best price. An independent advisor is on your side of the table: checking the asking price, finding the risks and negotiating for you.',
    link: { href: '#agent-vs-diy', label: 'Compare buying alone and with an advisor' },
  },
  {
    q: 'How much should I pay for a business?',
    a: 'Most small and medium businesses sell for a multiple of their normalised earnings, usually EBITDA. The right multiple depends on the industry, the size of the business and how much it relies on the owner. Check the earnings yourself rather than relying on the asking price.',
    link: { href: '/selling-a', label: 'Compare what businesses sell for in Australia' },
  },
  {
    q: 'What should I check before buying a business?',
    a: 'At a minimum: three years of financials checked against tax returns and BAS, the lease, staff and entitlements, customer and supplier concentration, licences and compliance, and the condition of equipment and stock.',
    link: { href: '#due-diligence', label: 'See our due diligence checklist' },
  },
  {
    q: 'How do I finance a business acquisition?',
    a: 'Most purchases combine your own funds with bank lending. Some deals also include vendor finance or an earn-out, where part of the price is paid later out of the business’s results. Talk to your lender early so you know your limit before you make an offer.',
    link: { href: '#enquire', label: 'Talk to us about your acquisition' },
  },
  {
    q: 'Can a first-time buyer buy a business?',
    a: 'Yes. Many of our clients are buying their first business. A managed or semi-managed business, with staff already in place, is often the easiest way in.',
    link: { href: '#recent-acquisitions', label: 'See recent acquisitions' },
  },
  {
    q: 'Do you help buyers outside Melbourne?',
    a: 'Yes. We are based in Melbourne and work with buyers across Victoria, and we have also helped clients buy businesses interstate, including in Sydney.',
    link: { href: '#locations', label: 'See where we work' },
  },
];
