import type { StaticImageData } from 'next/image';
import type { Faq } from '@/components/landing/tabbed-page/faq-section';

/**
 * Location pages under /business-brokers/<slug>. Each entry carries its own
 * copy, areas and FAQs so the pages are genuinely different, not one template
 * with the city name swapped.
 *
 * `image` is optional: leave it out to use the default banner photo, or import
 * a city photo here when one is ready.
 */
export type BrokerLocation = {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  /** Matches a key in STATE_OUTLINES. */
  outline: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** One line for the hub card. */
  summary: string;
  marketHeading: string;
  market: string[];
  highlights: string[];
  areaGroups: { name: string; areas: string[] }[];
  faqs: Faq[];
  image?: { src: StaticImageData; alt: string };
};

export const BROKER_LOCATIONS: BrokerLocation[] = [
  {
    slug: 'melbourne',
    city: 'Melbourne',
    state: 'Victoria',
    stateAbbr: 'VIC',
    outline: 'Victoria',
    title: 'Business Brokers Melbourne | Blackmont Advisory',
    description:
      'Melbourne business brokers based in Toorak. Blackmont Advisory sells businesses confidentially and acts for buyers across Melbourne and Victoria.',
    h1: 'Business Brokers Melbourne',
    intro:
      'A Melbourne business broker based in Toorak. We sell businesses confidentially and act for buyers right across the city and regional Victoria.',
    summary: 'Our home market, with an office in Toorak.',
    marketHeading: 'Melbourne business brokers who run the whole process',
    market: [
      'Melbourne has one of the deepest pools of business buyers in Australia, from first-time owners to private equity groups and family offices. How a business is presented, and to whom, matters as much as the price.',
      'As a Melbourne-based business broker and M&A advisor, we know the local market and keep every sale confidential, from the first conversation to settlement.',
    ],
    highlights: [
      'Office at 459 Toorak Road, Toorak',
      'Licensed Victorian business agent, BLA 092153L',
      'Recent acquisitions for Melbourne buyers in trade services, fencing and transport',
      'Private investors, family offices and private equity in our network',
    ],
    areaGroups: [
      { name: 'CBD and inner city', areas: ['Melbourne CBD', 'Collins Street', 'Southbank', 'Docklands', 'South Melbourne', 'Port Melbourne'] },
      { name: 'Inner south and east', areas: ['Richmond', 'South Yarra', 'Toorak', 'St Kilda', 'Brighton', 'Hawthorn', 'Kew', 'Camberwell'] },
      { name: 'North and west', areas: ['Fitzroy', 'Brunswick', 'Preston', 'Essendon', 'Footscray', 'Werribee', 'Tullamarine'] },
      { name: 'East and south-east', areas: ['Box Hill', 'Doncaster', 'Glen Waverley', 'Oakleigh', 'Ringwood', 'Dandenong', 'Moorabbin', 'Frankston', 'Cranbourne'] },
    ],
    faqs: [
      {
        q: 'Where is your Melbourne office?',
        a: 'Our office is at 1/459 Toorak Road, Toorak, Victoria. We meet clients across Melbourne.',
      },
      {
        q: 'Are business brokers in Victoria licensed?',
        a: 'Yes. Business agents in Victoria must be licensed. Ask any broker for their licence number before you engage them. Ours is BLA 092153L.',
      },
      {
        q: 'Can I sell my Melbourne business to private equity?',
        a: 'If your business has consistent earnings and a team that can run it without you, private equity and family offices may be interested. We can include them in a confidential process alongside private buyers.',
        link: { href: '/selling-a-business', label: 'How we sell a business' },
      },
      {
        q: 'Do you cover regional Victoria?',
        a: 'Yes. We act for owners and buyers across regional Victoria as well as metropolitan Melbourne.',
      },
    ],
  },
  {
    slug: 'sydney',
    city: 'Sydney',
    state: 'New South Wales',
    stateAbbr: 'NSW',
    outline: 'New South Wales',
    title: 'Business Brokers Sydney | Blackmont Advisory',
    description:
      'Sydney business brokers for owners and buyers across NSW. Blackmont Advisory runs confidential, senior-led business sales and acquisitions.',
    h1: 'Business Brokers Sydney',
    intro:
      'For owners and buyers in Sydney and across New South Wales who want a senior-led, confidential process and access to buyers nationally.',
    summary: 'Senior-led sales and acquisitions across NSW.',
    marketHeading: 'Sydney business brokers with a national reach',
    market: [
      'Sydney is Australia’s largest business market. That means more buyers, but also more businesses competing for their attention. A well-prepared, confidential sale stands out.',
      'We bring the same senior-led process we use in Melbourne, plus buyers from across the country, not just from the local market.',
    ],
    highlights: [
      'Recent acquisition: an allied health business in Sydney, bought for a first-time owner',
      'One senior advisor from first call to settlement',
      'Buyers from Sydney, Melbourne and nationally',
      'Every buyer screened and under NDA',
    ],
    areaGroups: [
      { name: 'CBD and inner city', areas: ['Sydney CBD', 'North Sydney', 'Surry Hills', 'Pyrmont', 'Alexandria'] },
      { name: 'Greater Sydney', areas: ['Parramatta', 'Inner West', 'Eastern Suburbs', 'Northern Beaches', 'Sutherland Shire', 'Western Sydney'] },
      { name: 'Regional NSW', areas: ['Newcastle', 'Central Coast', 'Wollongong'] },
    ],
    faqs: [
      {
        q: 'Do you have an office in Sydney?',
        a: 'Our office is in Melbourne. We work with Sydney clients by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Why use a Melbourne-based broker to sell a Sydney business?',
        a: 'Many buyers search nationally, so reach matters more than postcode. You get a senior advisor on your sale from start to finish, and buyers from across Australia.',
      },
      {
        q: 'Have you completed deals in Sydney?',
        a: 'Yes. Recent work includes an allied health business in Sydney, acquired for a first-time business owner.',
        link: { href: '/buying-a-business#recent-acquisitions', label: 'See recent acquisitions' },
      },
    ],
  },
  {
    slug: 'brisbane',
    city: 'Brisbane',
    state: 'Queensland',
    stateAbbr: 'QLD',
    outline: 'Queensland',
    title: 'Business Brokers Brisbane | Blackmont Advisory',
    description:
      'Brisbane and Queensland business brokers. Blackmont Advisory sells businesses confidentially and acts for buyers across QLD, with access to interstate buyers.',
    h1: 'Business Brokers Brisbane',
    intro:
      'For owners and buyers in Brisbane and across Queensland, including businesses that attract buyers and investors from interstate.',
    summary: 'Confidential sales and buyer advocacy across QLD.',
    marketHeading: 'Queensland business brokers with interstate buyers',
    market: [
      'Queensland businesses often attract buyers from Sydney and Melbourne, including owners relocating and investors looking for growth markets.',
      'We take Queensland businesses to those buyers privately, under NDA, with one senior advisor running the sale from start to finish.',
      'Brisbane’s business market runs from professional services firms in the CBD to hospitality in Fortitude Valley and South Brisbane, and trade and industrial businesses across the wider city. Each attracts a different kind of buyer, so we prepare every sale around the buyers most likely to pay for that business.',
    ],
    highlights: [
      'Buyers from Queensland and interstate',
      'One senior advisor from first call to settlement',
      'Confidential marketing, with every buyer under NDA',
      'Independent advice for buyers acquiring in QLD',
    ],
    areaGroups: [
      { name: 'CBD and inner city', areas: ['Brisbane CBD', 'Fortitude Valley', 'South Brisbane', 'Newstead', 'West End'] },
      { name: 'Greater Brisbane', areas: ['Chermside', 'Ipswich', 'Logan'] },
      { name: 'South-east and regional QLD', areas: ['Gold Coast', 'Sunshine Coast', 'Toowoomba'] },
    ],
    faqs: [
      {
        q: 'Do you have an office in Queensland?',
        a: 'Our office is in Melbourne. We work with Queensland clients by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Do Queensland businesses attract interstate buyers?',
        a: 'Often, yes. Owners relocating from Sydney and Melbourne, and investors looking for growth, regularly look at Queensland businesses. A national buyer reach helps.',
      },
      {
        q: 'Can you help me buy a business in Brisbane?',
        a: 'Yes. We act for buyers, finding, valuing and negotiating the right business for them, on and off market.',
        link: { href: '/buying-a-business', label: 'How we help buyers' },
      },
    ],
  },
  {
    slug: 'perth',
    city: 'Perth',
    state: 'Western Australia',
    stateAbbr: 'WA',
    outline: 'Western Australia',
    title: 'Business Brokers Perth | Blackmont Advisory',
    description:
      'Perth and WA business brokers. Blackmont Advisory runs confidential, senior-led business sales and acquisitions across Western Australia.',
    h1: 'Business Brokers Perth',
    intro:
      'For owners and buyers in Perth and across Western Australia who want a confidential, senior-led process and access to buyers nationally.',
    summary: 'Senior-led sales with a national buyer reach.',
    marketHeading: 'Perth business brokers who look beyond WA',
    market: [
      'A business in Perth can have a smaller local pool of buyers than one on the east coast. Reaching serious buyers nationally, without exposing the sale, can make a real difference to the price.',
      'We run Western Australian sales and acquisitions with the same senior-led, confidential process we use everywhere.',
    ],
    highlights: [
      'Buyers from WA and the east coast',
      'One senior advisor from first call to settlement',
      'Confidential marketing, with every buyer under NDA',
      'Independent advice for buyers acquiring in WA',
    ],
    areaGroups: [
      { name: 'CBD and inner city', areas: ['Perth CBD', 'West Perth', 'Northbridge', 'Subiaco', 'East Perth'] },
      { name: 'Greater Perth', areas: ['Osborne Park', 'Fremantle', 'Joondalup', 'Midland'] },
      { name: 'Surrounds', areas: ['Rockingham', 'Mandurah'] },
    ],
    faqs: [
      {
        q: 'Do you have an office in Perth?',
        a: 'Our office is in Melbourne. We work with Western Australian clients by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Why reach buyers outside WA?',
        a: 'More serious buyers means more competition for your business. East coast buyers and investors regularly consider Western Australian businesses.',
      },
      {
        q: 'Can you help me buy a business in Perth?',
        a: 'Yes. We act for buyers, finding, valuing and negotiating the right business for them, on and off market.',
        link: { href: '/buying-a-business', label: 'How we help buyers' },
      },
    ],
  },
];

/** FAQs every location page shares, after its own. */
export const SHARED_LOCATION_FAQS: Faq[] = [
  {
    q: 'How much do business brokers charge?',
    a: 'Most business brokers in Australia charge a success fee, usually a percentage of the sale price, and some also charge an upfront engagement or marketing fee. Our fees are agreed in writing before we start.',
    link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
  },
  {
    q: 'What is my business worth?',
    a: 'Most small and medium businesses are valued as a multiple of their normalised earnings. Our free calculator gives you an indicative range in a few minutes.',
    link: { href: '/business-valuation', label: 'Try the valuation calculator' },
  },
];

export function brokerLocationBySlug(slug: string) {
  return BROKER_LOCATIONS.find((location) => location.slug === slug);
}
