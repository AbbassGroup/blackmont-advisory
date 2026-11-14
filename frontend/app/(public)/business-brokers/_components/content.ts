import type { Faq } from '@/components/landing/tabbed-page/faq-section';

export const PAGE_PATH = '/business-brokers';

export const FAQS: Faq[] = [
  {
    q: 'What does a business broker do?',
    a: 'A business broker manages the sale or purchase of a business: valuing it, preparing it for market, finding and qualifying buyers or businesses, negotiating price and terms, and managing the deal through due diligence to settlement.',
    link: { href: '#what-we-do', label: 'How we work with sellers and buyers' },
  },
  {
    q: 'How much do business brokers charge?',
    a: 'Most business brokers in Australia charge a success fee, usually a percentage of the sale price, and some also charge an upfront engagement or marketing fee. Smaller businesses generally pay a higher percentage than larger ones. Always get the fee agreed in writing before you sign.',
    link: { href: '#fees', label: 'Business broker fees explained' },
  },
  {
    q: 'How much does it cost to sell a business?',
    a: 'Beyond the broker’s fee, budget for your lawyer, your accountant and any tax on the sale, such as capital gains tax. Your accountant can tell you which small business CGT concessions may apply.',
    link: { href: '#fees', label: 'What selling a business costs' },
  },
  {
    q: 'Are business brokers licensed in Victoria?',
    a: 'Yes. In Victoria, business agents must hold a licence. Ask any broker for their licence number before you engage them. Blackmont Advisory’s is BLA 092153L.',
    link: { href: '#choosing', label: 'How to choose a business broker' },
  },
  {
    q: 'Should I use a business broker or sell my business myself?',
    a: 'Selling yourself saves the broker’s fee, but you have to price the business, find and screen buyers, keep the sale confidential and negotiate while still running it. For most owners, a better price and terms more than cover the fee.',
    link: { href: '/selling-a-business#private-vs-broker', label: 'Compare selling privately and with a broker' },
  },
  {
    q: 'What is the difference between a business broker and an M&A advisor?',
    a: 'Business brokers typically sell small and medium businesses, while M&A advisors handle larger transactions with more complex structures and buyers such as private equity. Blackmont works across both, as a boutique M&A advisor in Melbourne.',
  },
  {
    q: 'Do business brokers help buyers too?',
    a: 'Most brokers act for the seller. Blackmont also acts for buyers, finding, valuing and negotiating the right business for them, on and off market.',
    link: { href: '/buying-a-business', label: 'How we help buyers' },
  },
  {
    q: 'Do you work outside Melbourne?',
    a: 'Yes. We are based in Toorak and work with clients across Victoria, and we also act for sellers and buyers in New South Wales, Queensland and Western Australia.',
    link: { href: '#locations', label: 'Find a broker near you' },
  },
];
