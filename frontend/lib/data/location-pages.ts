import type { Faq } from '@/components/landing/tabbed-page/faq-section';
import { brokerLocationBySlug, type BrokerLocation } from '@/lib/data/broker-locations';

/**
 * City pages under /selling-a-business/<city> and /buying-a-business/<city>.
 *
 * City facts (name, state, suburbs, outline) come from BROKER_LOCATIONS so the
 * three families of location pages always agree. Everything a visitor reads is
 * written per city here, so no two pages are the same template with the name
 * swapped. Claims stay within what the business can stand behind: the Toorak
 * office, the licence, and deals listed in recent-acquisitions.
 */

export type Tip = { title: string; text: string };

export type LocationPageCopy = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  points: string[];
  overviewHeading: string;
  overview: string[];
  highlights: string[];
  tipsHeading: string;
  tipsIntro: string;
  tips: Tip[];
  faqs: Faq[];
};

export type LocationPage = LocationPageCopy & { place: BrokerLocation };

const LICENCE = 'Licensed business agent, BLA 092153L';

/* ── Selling ─────────────────────────────────────────────────── */

const SELL: LocationPageCopy[] = [
  {
    slug: 'melbourne',
    title: 'Sell My Business Melbourne | Blackmont Advisory',
    description:
      'Selling a business in Melbourne? Blackmont Advisory, a Toorak-based business sale advisor, values and sells Melbourne businesses confidentially.',
    h1: 'Sell Your Business in Melbourne',
    intro:
      'Thinking it is time to sell your business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it and take it privately to qualified buyers, from local owners to private equity.',
    points: [
      'Office in Toorak, Melbourne',
      'Confidential first conversation',
      'Every buyer under NDA and approved by you',
      LICENCE,
    ],
    overviewHeading: 'Selling a business in Melbourne',
    overview: [
      'Melbourne has one of the deepest pools of business buyers in Australia: first-time owners, operators growing through acquisition, family offices and private equity groups. The right buyer for your business is usually out there. The work is reaching them without the whole market knowing you are selling.',
      'From professional services firms in the CBD to manufacturing and industrial businesses in Moorabbin and Dandenong, we prepare each sale around the business and the buyers most likely to pay for it, and keep it confidential from the first conversation to settlement.',
    ],
    highlights: [
      'A Melbourne business sale advisor, not a call centre',
      'Private investors, family offices and private equity in our network',
      'Recent Melbourne deals in trade services, fencing and transport',
      'Fees agreed in writing before we start',
    ],
    tipsHeading: 'Preparing a business for sale in Melbourne',
    tipsIntro: 'Tips for selling a small business in Victoria, from the issues we see most often.',
    tips: [
      {
        title: 'Talk to your landlord early',
        text: 'In Victoria, assigning a lease to a buyer usually needs the landlord’s consent. Check how much term is left and start that conversation before buyers ask.',
      },
      {
        title: 'Have three years of clean financials',
        text: 'Buyers and their banks want accounts that match your tax returns and BAS, with personal and one-off expenses clearly separated.',
      },
      {
        title: 'Show it runs without you',
        text: 'Melbourne buyers pay more for a business with a team in place. Document systems and hand over key relationships before you sell.',
      },
      {
        title: 'Know who your buyer is',
        text: 'Selling a manufacturing business in Melbourne attracts different buyers than a café or a clinic. Larger businesses with steady earnings may suit private equity.',
      },
    ],
    faqs: [
      {
        q: 'How do I sell my business in Melbourne?',
        a: 'Start with a confidential conversation and a realistic valuation. We then prepare the business, approach qualified Melbourne and national buyers privately under NDA, negotiate the price and terms and manage the sale through to settlement.',
        link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
      },
      {
        q: 'How much are business broker fees in Melbourne?',
        a: 'Most brokers charge a success fee, usually a percentage of the sale price, and some charge an upfront engagement fee. Ours are agreed in writing before we start, so there are no surprises at settlement.',
        link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
      },
      {
        q: 'Can I sell my Melbourne business to private equity?',
        a: 'If your business has consistent earnings and a team that can run it without you, private equity and family offices may be interested. We can include them in a confidential process alongside private buyers.',
      },
      {
        q: 'Will I pay capital gains tax when I sell my business?',
        a: 'Usually, yes, although small business CGT concessions can reduce or remove it. The rules are detailed, so speak to your accountant before you sell.',
      },
    ],
  },
  {
    slug: 'sydney',
    title: 'Sell My Business Sydney | Blackmont Advisory',
    description:
      'Selling a business in Sydney or NSW? Blackmont Advisory runs confidential, senior-led business sales with access to buyers across Australia.',
    h1: 'Sell Your Business in Sydney',
    intro:
      'For Sydney and New South Wales business owners who want a confidential sale, a realistic price and one senior advisor from the first call to settlement.',
    points: [
      'One senior advisor from first call to settlement',
      'Buyers from Sydney, Melbourne and nationally',
      'Every buyer under NDA and approved by you',
      LICENCE,
    ],
    overviewHeading: 'Selling a business in Sydney',
    overview: [
      'Sydney is Australia’s largest business market. That means more buyers, but also more businesses competing for their attention. A well-prepared business, presented privately to the right buyers, stands out from the listings.',
      'We are based in Melbourne and work with Sydney owners by phone and video, meeting in person when a deal needs it. You get the same senior-led process, and buyers searching nationally rather than only in Sydney.',
    ],
    highlights: [
      'Senior-led, confidential process',
      'Buyers searching nationally, not just in Sydney',
      'Recent work includes an allied health acquisition in Sydney',
      'Fees agreed in writing before we start',
    ],
    tipsHeading: 'Tips for selling a business in Sydney',
    tipsIntro: 'What makes the difference to a sale in a busy, competitive market.',
    tips: [
      {
        title: 'Price for a crowded market',
        text: 'Sydney buyers compare a lot of options. An asking price the numbers cannot support sits unsold while better-priced businesses move.',
      },
      {
        title: 'Guard confidentiality',
        text: 'In a dense market your staff, customers and competitors are close by. Share details only with buyers who have signed an NDA.',
      },
      {
        title: 'Check your lease before you list',
        text: 'Most commercial leases need the landlord’s consent to assign. Make sure there is enough term left for a buyer’s bank.',
      },
      {
        title: 'Make due diligence easy',
        text: 'Have financials, contracts and staff details organised before you start. A buyer who finds everything in order moves faster and argues less on price.',
      },
    ],
    faqs: [
      {
        q: 'Do you have an office in Sydney?',
        a: 'Our office is in Melbourne. We work with Sydney clients by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Why use a Melbourne-based advisor to sell a Sydney business?',
        a: 'Many buyers search nationally, so reach matters more than postcode. You get a senior advisor on your sale from start to finish and buyers from across Australia.',
      },
      {
        q: 'How long does it take to sell a business in Sydney?',
        a: 'Once on the market, most businesses sell in around 60 to 240 days, depending on the industry, the price and how well prepared the business is.',
        link: { href: '/guides/how-long-does-it-take-to-sell-a-business', label: 'How long it takes to sell a business' },
      },
      {
        q: 'How much does it cost to sell a business?',
        a: 'Budget for the broker’s fee, your lawyer, your accountant and any tax on the sale, such as capital gains tax. Small business CGT concessions may reduce the tax.',
      },
    ],
  },
  {
    slug: 'brisbane',
    title: 'Sell My Business Brisbane | Blackmont Advisory',
    description:
      'Selling a business in Brisbane or Queensland? Blackmont Advisory takes QLD businesses to buyers in Queensland and interstate, confidentially.',
    h1: 'Sell Your Business in Brisbane',
    intro:
      'For owners in Brisbane and across Queensland who want to reach serious buyers, including those moving north from Sydney and Melbourne, without exposing the sale.',
    points: [
      'Buyers from Queensland and interstate',
      'One senior advisor from first call to settlement',
      'Every buyer under NDA and approved by you',
      LICENCE,
    ],
    overviewHeading: 'Selling a business in Brisbane',
    overview: [
      'Queensland businesses often attract buyers from outside the state: owners relocating from Sydney and Melbourne, and investors looking for growth. Reaching them is often what lifts the price.',
      'We take Brisbane and Queensland businesses to those buyers privately, under NDA, with one senior advisor running the sale. We are based in Melbourne and meet in person when a deal needs it.',
    ],
    highlights: [
      'Reach buyers in Queensland and interstate',
      'Senior-led, confidential process',
      'Clients across South-East Queensland',
      'Fees agreed in writing before we start',
    ],
    tipsHeading: 'Tips for selling a business in Queensland',
    tipsIntro: 'How to make a Queensland business easier to sell, especially to an interstate buyer.',
    tips: [
      {
        title: 'Market beyond Queensland',
        text: 'Interstate buyers widen the pool and add competition. A confidential, national approach reaches them without a public listing.',
      },
      {
        title: 'Show it runs without you',
        text: 'A buyer relocating from another state needs confidence the business will keep running. A capable team in place is worth a lot.',
      },
      {
        title: 'Explain any seasonality',
        text: 'If trade rises and falls through the year, show monthly figures and explain the pattern before a buyer asks.',
      },
      {
        title: 'Plan a longer handover',
        text: 'An interstate buyer may need more time to learn the business and the local market. Offering a solid handover makes your business easier to buy.',
      },
    ],
    faqs: [
      {
        q: 'Do you have an office in Queensland?',
        a: 'Our office is in Melbourne. We work with Queensland clients by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Will interstate buyers look at my Queensland business?',
        a: 'Often, yes. Owners relocating from Sydney and Melbourne, and investors looking for growth, regularly consider Queensland businesses.',
      },
      {
        q: 'Can you sell a business on the Gold Coast or Sunshine Coast?',
        a: 'Yes. We act for owners across South-East Queensland, including the Gold Coast and Sunshine Coast, as well as Brisbane.',
      },
    ],
  },
  {
    slug: 'perth',
    title: 'Sell My Business Perth | Blackmont Advisory',
    description:
      'Selling a business in Perth or WA? Blackmont Advisory runs confidential sales that reach serious buyers in Western Australia and on the east coast.',
    h1: 'Sell Your Business in Perth',
    intro:
      'For owners in Perth and across Western Australia who want a confidential, senior-led sale that reaches buyers beyond the local market.',
    points: [
      'Buyers from WA and the east coast',
      'One senior advisor from first call to settlement',
      'Every buyer under NDA and approved by you',
      LICENCE,
    ],
    overviewHeading: 'Selling a business in Perth',
    overview: [
      'A business in Perth can have a smaller local pool of buyers than one on the east coast. Reaching serious buyers nationally, without exposing the sale, can make a real difference to the price and the time it takes.',
      'We run Western Australian sales with the same senior-led, confidential process we use everywhere, working with you by phone and video and meeting in person when a deal needs it.',
    ],
    highlights: [
      'Buyers from WA and the east coast',
      'Senior-led, confidential process',
      'Due diligence set up to work at a distance',
      'Fees agreed in writing before we start',
    ],
    tipsHeading: 'Tips for selling a business in Perth',
    tipsIntro: 'How to widen your buyer pool and keep a sale moving from the west.',
    tips: [
      {
        title: 'Reach east coast buyers',
        text: 'Looking beyond WA adds competition for your business. A confidential approach lets you do that without a public listing.',
      },
      {
        title: 'Make due diligence work remotely',
        text: 'Interstate buyers may review the business from a distance at first. Clear, organised financials and documents keep them engaged.',
      },
      {
        title: 'Show how results held up',
        text: 'Buyers ask how a WA business performed through different conditions. Several years of figures answer that better than one strong year.',
      },
      {
        title: 'Plan the handover',
        text: 'A buyer moving from interstate needs time to learn the business. A clear handover plan makes the purchase easier to commit to.',
      },
    ],
    faqs: [
      {
        q: 'Do you have an office in Perth?',
        a: 'Our office is in Melbourne. We work with Western Australian clients by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Why reach buyers outside Western Australia?',
        a: 'More serious buyers means more competition for your business. East coast buyers and investors regularly consider WA businesses.',
      },
      {
        q: 'How do I value my business before selling?',
        a: 'Most businesses are valued as a multiple of normalised earnings. Our free calculator gives you an indicative range in a few minutes.',
        link: { href: '/business-valuation', label: 'Try the valuation calculator' },
      },
    ],
  },
];

/* ── Buying ──────────────────────────────────────────────────── */

const BUY: LocationPageCopy[] = [
  {
    slug: 'melbourne',
    title: 'Buy a Business in Melbourne | Blackmont Advisory',
    description:
      'Looking to buy a business in Melbourne? Blackmont Advisory finds, values and negotiates the right business for you, on and off market, across Melbourne.',
    h1: 'Buy a Business in Melbourne',
    intro:
      'Looking to buy a business in Melbourne? We act only for you: finding businesses on and off market, checking the numbers and negotiating the price and terms.',
    points: [
      'Independent advice: we act for you, not the seller',
      'Off-market Melbourne businesses as well as listings',
      'Valuation and due diligence before you commit',
      LICENCE,
    ],
    overviewHeading: 'Buying a business in Melbourne',
    overview: [
      'Melbourne has businesses for sale in almost every industry and suburb, from cafés and clinics to trade services and manufacturing. The challenge is not finding a listing. It is finding the right business at a fair price, and knowing what you are really buying.',
      'We have helped first-time owners buy their first Melbourne business and helped established operators grow through acquisition. We search listings and broker networks, and approach owners directly about businesses that are not on the market.',
    ],
    highlights: [
      'Based in Toorak, buying across all of Melbourne',
      'Recent Melbourne acquisitions from $445,000 to $1.32M',
      'First-time buyers and operators expanding',
      'Finance, legal and accounting specialists we work with',
    ],
    tipsHeading: 'Tips for first-time business buyers in Melbourne',
    tipsIntro: 'What we tell people buying their first business in Melbourne.',
    tips: [
      {
        title: 'Consider a managed business',
        text: 'A managed or semi-managed business, with staff already in place, is often the easiest way into business ownership.',
      },
      {
        title: 'Line up finance first',
        text: 'Financing a business purchase in Melbourne usually means your own funds plus bank lending. Know your limit before you make an offer.',
      },
      {
        title: 'Check the lease',
        text: 'In Victoria, the landlord usually needs to consent to the lease being assigned to you. Check the term left and the rent before you commit.',
      },
      {
        title: 'Look beyond the listings',
        text: 'Some of the best Melbourne businesses are never advertised. An advisor with a network can approach owners directly.',
      },
    ],
    faqs: [
      {
        q: 'How do I find a business to buy in Melbourne?',
        a: 'Online listings are a start, but many good Melbourne businesses never reach them. We search listings and broker networks, and approach owners directly about businesses that are not on the market.',
        link: { href: '/buying-a-business#agent-vs-diy', label: 'How to find a business to buy' },
      },
      {
        q: 'How do I finance a business purchase in Melbourne?',
        a: 'Most purchases combine your own funds with bank lending. Some deals include vendor finance or an earn-out. Talk to your lender early so you know your limit before you make an offer.',
      },
      {
        q: 'Can I buy a Melbourne business for a business visa?',
        a: 'Many buyers do. The visa requirements are set by the Department of Home Affairs and explained by your migration agent. We help you find and buy an established business that fits the criteria they give you.',
      },
      {
        q: 'Are there manufacturing businesses for sale in Melbourne?',
        a: 'Yes, and many are sold privately rather than listed. Tell us what you are looking for and we will search on and off market.',
      },
    ],
  },
  {
    slug: 'sydney',
    title: 'Buy a Business in Sydney | Blackmont Advisory',
    description:
      'Looking to buy a business in Sydney? Blackmont Advisory gives independent buy-side advice in Sydney and NSW: search, valuation, negotiation and due diligence.',
    h1: 'Buy a Business in Sydney',
    intro:
      'Buying a business in Sydney or New South Wales? We work only for you, from finding the right business to negotiating the deal and getting you to settlement.',
    points: [
      'Independent advice: we act for you, not the seller',
      'Businesses on and off market',
      'Valuation and due diligence before you commit',
      LICENCE,
    ],
    overviewHeading: 'Buying a business in Sydney',
    overview: [
      'Sydney has more businesses for sale than anywhere else in Australia, which makes it easy to look and hard to choose. Clear criteria, an independent view of the price and careful due diligence protect you from paying too much.',
      'We have helped clients buy businesses in Sydney, including an allied health business for a first-time owner. We work with Sydney buyers by phone and video, and meet in person when a deal needs it.',
    ],
    highlights: [
      'Recent Sydney acquisition: allied health, $475,000',
      'Independent of the seller and their broker',
      'On- and off-market search',
      'Due diligence with your accountant and lawyer',
    ],
    tipsHeading: 'Tips for buying a business in Sydney',
    tipsIntro: 'How to buy well in Australia’s busiest business market.',
    tips: [
      {
        title: 'Narrow your criteria',
        text: 'Decide industry, area, size and budget before you start. In a market this size, a clear brief saves months.',
      },
      {
        title: 'Check the numbers yourself',
        text: 'The asking price is the seller’s view. Value the business on its verified earnings before you make an offer.',
      },
      {
        title: 'Line up finance early',
        text: 'Sellers take buyers with finance in place more seriously, and you will know exactly what you can afford.',
      },
      {
        title: 'Read the lease closely',
        text: 'Rent is a major cost in Sydney. Check the term left, rent reviews and whether the lease can be assigned to you.',
      },
    ],
    faqs: [
      {
        q: 'Do you have an office in Sydney?',
        a: 'Our office is in Melbourne. We work with Sydney buyers by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Can you find off-market businesses in Sydney?',
        a: 'Yes. Alongside listings and broker networks, we approach owners directly about businesses that are not advertised.',
      },
      {
        q: 'Can a first-time buyer buy a business in Sydney?',
        a: 'Yes. Recent work includes buying a fully managed allied health business in Sydney for a first-time business owner.',
        link: { href: '/buying-a-business#recent-acquisitions', label: 'See recent acquisitions' },
      },
    ],
  },
  {
    slug: 'brisbane',
    title: 'Buy a Business in Brisbane | Blackmont Advisory',
    description:
      'Looking to buy a business in Brisbane or Queensland? Blackmont Advisory finds, values and negotiates the right QLD business for you, on and off market.',
    h1: 'Buy a Business in Brisbane',
    intro:
      'Buying a business in Brisbane or moving to Queensland to buy one? We find, check and negotiate the right business for you, working only on your side of the deal.',
    points: [
      'Independent advice: we act for you, not the seller',
      'Help for buyers relocating from interstate',
      'Valuation and due diligence before you commit',
      LICENCE,
    ],
    overviewHeading: 'Buying a business in Brisbane',
    overview: [
      'Many people buying a business in Queensland are moving there to do it. That makes independent advice more important: you are learning a new market as well as a new business.',
      'We search Brisbane and South-East Queensland on and off market, check the numbers behind the asking price, and plan a handover that gives you time to settle in.',
    ],
    highlights: [
      'Buyers relocating to Queensland',
      'Brisbane, Gold Coast and Sunshine Coast',
      'Independent of the seller and their broker',
      'A handover planned around your move',
    ],
    tipsHeading: 'Tips for buying a business in Queensland',
    tipsIntro: 'What to check when buying in Brisbane, especially if you are moving from interstate.',
    tips: [
      {
        title: 'Visit before you commit',
        text: 'See the business trading, more than once if you can, and spend time in the area before you make an offer.',
      },
      {
        title: 'Check for seasonality',
        text: 'Some Queensland businesses, particularly on the coast, are seasonal. Look at monthly figures, not just the annual total.',
      },
      {
        title: 'Plan your move and handover',
        text: 'Agree a handover long enough for you to learn the business and meet customers and suppliers.',
      },
      {
        title: 'Line up finance early',
        text: 'Know your borrowing limit and deposit before you make an offer, especially if you are also buying a home.',
      },
    ],
    faqs: [
      {
        q: 'Do you have an office in Queensland?',
        a: 'Our office is in Melbourne. We work with Queensland buyers by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'I am moving to Queensland. Can you help me buy a business before I arrive?',
        a: 'Yes. We can search, shortlist and check businesses for you, so your time on the ground is spent on the ones worth seeing.',
      },
      {
        q: 'Can you help me buy a business on the Gold Coast or Sunshine Coast?',
        a: 'Yes. We help buyers across South-East Queensland as well as Brisbane.',
      },
    ],
  },
  {
    slug: 'perth',
    title: 'Buy a Business in Perth | Blackmont Advisory',
    description:
      'Looking to buy a business in Perth or WA? Blackmont Advisory gives independent buy-side advice: search, valuation, negotiation and due diligence.',
    h1: 'Buy a Business in Perth',
    intro:
      'Buying a business in Perth or across Western Australia? We act only for you, from finding the right business to negotiating the deal and the handover.',
    points: [
      'Independent advice: we act for you, not the seller',
      'Businesses on and off market',
      'Valuation and due diligence before you commit',
      LICENCE,
    ],
    overviewHeading: 'Buying a business in Perth',
    overview: [
      'The Western Australian market has its own rhythm, and some businesses rise and fall with the wider WA economy. Understanding how a business performed through different conditions is key to paying the right price.',
      'We search Perth and WA on and off market, check the numbers behind the asking price, and negotiate on your behalf, working with you by phone and video and meeting in person when a deal needs it.',
    ],
    highlights: [
      'Independent of the seller and their broker',
      'On- and off-market search across WA',
      'Several years of results checked, not just one',
      'Due diligence with your accountant and lawyer',
    ],
    tipsHeading: 'Tips for buying a business in Perth',
    tipsIntro: 'What to look at closely when buying in Western Australia.',
    tips: [
      {
        title: 'Look at several years of results',
        text: 'Some WA businesses move with the resources sector. Check how results held up over a few years, not just the latest one.',
      },
      {
        title: 'Understand the customers',
        text: 'If a few large customers make up most of the revenue, find out how secure those relationships are before you buy.',
      },
      {
        title: 'Line up finance early',
        text: 'Know your limit before you make an offer. Sellers take buyers with finance in place more seriously.',
      },
      {
        title: 'Agree the handover',
        text: 'Agree how long the seller will stay to train you and introduce you to customers and suppliers.',
      },
    ],
    faqs: [
      {
        q: 'Do you have an office in Perth?',
        a: 'Our office is in Melbourne. We work with Western Australian buyers by phone and video, and meet in person when a deal needs it.',
      },
      {
        q: 'Can you find off-market businesses in Perth?',
        a: 'Yes. Alongside listings and broker networks, we approach owners directly about businesses that are not advertised.',
      },
      {
        q: 'How much should I pay for a business in Perth?',
        a: 'Most businesses sell for a multiple of their normalised earnings, depending on industry, size and risk. Value it on verified earnings, not the asking price.',
        link: { href: '/business-valuation#formula', label: 'How businesses are valued' },
      },
    ],
  },
];

function withPlace(copy: LocationPageCopy): LocationPage {
  const place = brokerLocationBySlug(copy.slug);
  if (!place) throw new Error(`No broker location for "${copy.slug}"`);
  return { ...copy, place };
}

export const SELL_LOCATIONS: LocationPage[] = SELL.map(withPlace);
export const BUY_LOCATIONS: LocationPage[] = BUY.map(withPlace);

export const sellLocationBySlug = (slug: string) => SELL_LOCATIONS.find((l) => l.slug === slug);
export const buyLocationBySlug = (slug: string) => BUY_LOCATIONS.find((l) => l.slug === slug);

/* ── Process steps, shared by city and suburb pages ──────────── */

export const SELL_STEPS: Tip[] = [
  { title: 'A private conversation', text: 'We talk about your business, your timing and what you want next.' },
  { title: 'Valuation and preparation', text: 'We give you a realistic price range and prepare an Information Memorandum and the documents buyers will ask for.' },
  { title: 'Confidential buyer outreach', text: 'We approach qualified buyers privately. Each signs an NDA and you approve them before they see any details.' },
  { title: 'Negotiation and due diligence', text: 'We weigh up offers on price and terms and manage due diligence with your accountant and lawyer.' },
  { title: 'Settlement and handover', text: 'We take the sale through contracts and settlement, then help with a smooth handover.' },
];

export const BUY_STEPS: Tip[] = [
  { title: 'Your brief', text: 'We agree what you want to buy: industry, area, size, budget and how hands-on you want to be.' },
  { title: 'The search', text: 'We search listings and broker networks, and approach owners directly about businesses that are not advertised.' },
  { title: 'Valuation', text: 'We check the earnings behind the asking price and tell you what the business is really worth.' },
  { title: 'Negotiation and due diligence', text: 'We negotiate price and terms for you, then work with your accountant and lawyer to check everything.' },
  { title: 'Settlement and handover', text: 'We take the deal to settlement and make sure the handover is properly planned.' },
];
