import type { Faq } from '@/components/landing/tabbed-page/faq-section';
import { SectionShell, bodyText, cardTitle } from '@/components/landing/tabbed-page/section-shell';

/* ── Sale readiness ──────────────────────────────────────────── */

const NOT_READY_SIGNS = [
  {
    title: 'It does not run without you',
    text: 'If customers, suppliers and staff all rely on you personally, a buyer sees the value leaving with you. Expect a lower price, or a request that you stay on for longer after the sale.',
  },
  {
    title: 'Your financials do not tell a clean story',
    text: 'Accounts that do not match your tax returns and BAS, or personal costs mixed in with business costs, make buyers and their banks nervous. Three years of tidy, consistent figures is the minimum.',
  },
  {
    title: 'A few customers make up most of your revenue',
    text: 'When one or two clients account for a large share of sales, buyers price in the risk of losing them. Spreading revenue, or securing key clients on contracts, makes the business easier to sell.',
  },
  {
    title: 'Your lease or key contracts are short or uncertain',
    text: 'Buyers and lenders want security. Little time left on a lease, or agreements that cannot be transferred to a new owner, can stall a sale at due diligence.',
  },
  {
    title: 'Your earnings are falling or hard to explain',
    text: 'A buyer pays for future profit. A downward trend, or one unusually good year, invites hard questions about whether the earnings will last.',
  },
];

export function NotReadySigns() {
  return (
    <SectionShell
      id='not-ready-signs'
      tone='canvas'
      heading='5 signs your business is not ready to sell'
      intro='If any of these sound familiar, fix them before you go to market. Each one is something a buyer will find and use to lower the price.'
    >
      <ol className='m-0 grid list-none gap-4 p-0 min-[681px]:grid-cols-2 min-[681px]:gap-5'>
        {NOT_READY_SIGNS.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-white p-6'>
            <h3 className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

export const READINESS_FAQS: Faq[] = [
  {
    q: 'What makes a business sale-ready?',
    a: 'A sale-ready business has clean, consistent financials, earnings that are stable or growing, a team and systems that work without the owner, a secure lease, and no single customer it cannot afford to lose. Buyers pay most for a business they can take over with little risk.',
  },
  {
    q: 'What is a business sale readiness score?',
    a: 'It is a quick measure of how prepared your business is for a buyer’s scrutiny. Our scorecard rates ten areas buyers check, from financial records to owner dependency, and shows which ones to work on first.',
  },
  {
    q: 'How do I prepare my business for sale?',
    a: 'Start with the weakest areas from your score. Tidy up your accounts, document how the business runs, hand key relationships to your team, and check your lease and contracts. Then get a realistic valuation so you know what the work is worth.',
    link: { href: '/business-valuation', label: 'Get a free business valuation' },
  },
  {
    q: 'How long does it take to get a business ready to sell?',
    a: 'Quick fixes, like tidying records, can take a few months. Reducing owner dependency or customer concentration usually takes one to three years. The earlier you start, the more options you have when you decide to sell.',
    link: { href: '/exit/exit-planning', label: 'Plan your exit' },
  },
  {
    q: 'Is my small business ready to sell if my score is low?',
    a: 'A low score does not mean you cannot sell. It means a buyer will find the same weaknesses and price them in. Fixing the two or three weakest areas usually does more for the price than small improvements everywhere.',
  },
];

/* ── Industry benchmarks ─────────────────────────────────────── */

export const BENCHMARK_FAQS: Faq[] = [
  {
    q: 'What is an EBITDA multiple?',
    a: 'It is the number buyers multiply a business’s yearly earnings by to arrive at a price. EBITDA is earnings before interest, tax, depreciation and amortisation. A business with steady EBITDA in a sector buyers like will attract a higher multiple.',
  },
  {
    q: 'What is the EBIT formula?',
    a: 'EBIT, or earnings before interest and tax, is revenue minus cost of sales and operating expenses. You can also work back from the accounts: net profit plus interest plus tax. Add back depreciation and amortisation and you have EBITDA.',
  },
  {
    q: 'How do I calculate EBIT for a small business?',
    a: 'Start with the profit in your accounts, add back interest and tax, then adjust for anything a buyer would not inherit: one-off costs, personal expenses run through the business, and an owner’s salary that is above or below market rate.',
    link: { href: '/business-valuation', label: 'Try the business valuation calculator' },
  },
  {
    q: 'Why do multiples differ between industries?',
    a: 'Buyers pay more where earnings are predictable and easy to keep after a sale: recurring revenue, contracts, low owner dependency and strong demand. Sectors with seasonal trade, high staff turnover or reliance on one person tend to sell at lower multiples.',
  },
  {
    q: 'How do I price a business to sell?',
    a: 'Use the benchmark range for your industry as a starting point, then place your business within it based on size, earnings quality and risk. Pricing too high is the most common reason a business sits unsold, so get an independent view first.',
    link: { href: '/selling-a-business', label: 'How we sell a business' },
  },
  {
    q: 'Do these benchmarks apply to small businesses?',
    a: 'Yes, but with care. Smaller businesses usually sell at the lower end of their sector’s range, because more of the value depends on the owner and the earnings are easier to disrupt. As earnings grow and the business relies less on you, the multiple tends to rise.',
  },
];
