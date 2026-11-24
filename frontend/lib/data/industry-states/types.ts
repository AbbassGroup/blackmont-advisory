/**
 * State pages for each industry guide: /selling-a/<industry>/<state>.
 *
 * The national industry page supplies the benchmarks (multiple, price, time
 * to sell, value drivers, buyer checks). Each state page adds its own copy:
 * the local market, the state's lease, licensing and transfer rules, and
 * state FAQs, so no two pages are the same text with the state name swapped.
 */

export type IndustryStateSlug = 'victoria' | 'new-south-wales' | 'queensland' | 'western-australia';

export type IndustryState = {
  slug: IndustryStateSlug;
  /** Full name; also the key into STATE_OUTLINES. */
  name: string;
  abbr: string;
  /** Adjective for headings, e.g. "What Victorian buyers pay for". */
  adjective: string;
  /** Capital city and its /selling-a-business/<slug> page. */
  city: string;
  citySlug: string;
};

export const INDUSTRY_STATES: IndustryState[] = [
  { slug: 'victoria', name: 'Victoria', abbr: 'VIC', adjective: 'Victorian', city: 'Melbourne', citySlug: 'melbourne' },
  { slug: 'new-south-wales', name: 'New South Wales', abbr: 'NSW', adjective: 'NSW', city: 'Sydney', citySlug: 'sydney' },
  { slug: 'queensland', name: 'Queensland', abbr: 'QLD', adjective: 'Queensland', city: 'Brisbane', citySlug: 'brisbane' },
  { slug: 'western-australia', name: 'Western Australia', abbr: 'WA', adjective: 'WA', city: 'Perth', citySlug: 'perth' },
];

export type IndustryStateCopy = {
  /** The page's main search phrase, e.g. "sell a cafe victoria". */
  keyword: string;
  /** Related phrases for the meta keywords tag. */
  keywords: string[];
  /** Meta title, 50–60 characters. */
  title: string;
  /** Meta description, 140–160 characters. */
  description: string;
  h1: string;
  /** Banner paragraph; opens with a direct answer (multiple, price, timing). */
  intro: string;
  /** Four short banner bullets. */
  points: string[];
  /** Alt text for the banner photo; includes the keyword. */
  imageAlt: string;
  /** H2 + 3 paragraphs on this industry in this state. */
  marketHeading: string;
  market: string[];
  /** H2 + 3 paragraphs on the state's lease, licensing and transfer rules. */
  transfer: { heading: string; body: string[] };
  /** Four state-specific FAQs; each answer opens with a direct answer. */
  faqs: { q: string; a: string }[];
};

export type IndustryStateSet = Partial<Record<IndustryStateSlug, IndustryStateCopy>>;
