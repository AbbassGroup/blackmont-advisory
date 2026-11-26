import Link from 'next/link';
import { LandingContainer } from '@/components/landing/presentation';

/**
 * Long-form copy for the /guides hub. Kept deliberately light on markup (one
 * styled wrapper, plain child elements) so the page carries real reading
 * content rather than a list of links alone.
 */
const STAGES = [
  {
    title: 'Preparation',
    body: 'Before a business goes to market, the financials are tidied, owner dependence is reduced and anything a buyer would find in due diligence is found first. Six to twelve months of preparation is common, and it is where most of the value in a sale is protected or lost.',
  },
  {
    title: 'Valuation and pricing',
    body: 'A realistic asking price comes from normalised earnings, the multiple buyers are paying in your sector and the risks a buyer will price in. Overpricing is the most common reason a business sits on the market.',
  },
  {
    title: 'Confidential marketing',
    body: 'The business is presented to buyers without naming it. Interested parties sign a confidentiality agreement and are screened before they see anything that identifies the business, its staff or its customers.',
  },
  {
    title: 'Information memorandum and buyer meetings',
    body: 'Qualified buyers receive the information memorandum, which sets out the operations, financials and opportunity in detail. Serious buyers then meet the owner and ask the questions that decide whether an offer follows.',
  },
  {
    title: 'Offers, due diligence and completion',
    body: 'Offers are negotiated on price and on terms such as earn-outs, vendor finance and handover periods. The chosen buyer verifies the financials, contracts and legal position, then contracts are signed, the business settles and the handover begins.',
  },
];

export function SaleOverview() {
  return (
    <section
      aria-labelledby='guides-overview-title'
      className='bg-white pb-14 text-ink min-[681px]:pb-16 min-[1121px]:pb-20'
    >
      <LandingContainer>
        <div className='max-w-[820px] text-base leading-[1.8] min-[681px]:text-[17px] [&_h2]:m-0 [&_h2]:font-advisory-heading [&_h2]:text-[clamp(29px,6.5vw,38px)] [&_h2]:leading-[1.25] [&_h2]:font-bold [&_h2]:text-midnight [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-advisory-heading [&_h3]:text-[21px] [&_h3]:font-bold [&_h3]:text-midnight [&_p]:mt-4 [&_p]:mb-0 [&_a]:text-midnight [&_a]:underline [&_a]:decoration-gilt [&_a]:underline-offset-4'>
          <h2 id='guides-overview-title'>How selling a business works in Australia</h2>
          <p>
            Most owners sell a business once. The buyers they meet have often
            bought several, and the advisers on the other side of the table do
            it every week. These guides close that gap. They explain what
            happens at each stage of a sale, what buyers look for, and where
            owners tend to lose time or value, so you can make decisions with
            the same information the buyer has.
          </p>
          <p>
            Every sale is different, but almost all of them move through the
            same five stages. Knowing the order, and what each stage needs from
            you, is the simplest way to avoid a sale that stalls.
          </p>

          {STAGES.map((stage, index) => (
            <div key={stage.title}>
              <h3>
                {index + 1}. {stage.title}
              </h3>
              <p>{stage.body}</p>
            </div>
          ))}

          <h3>Which guide to start with</h3>
          <p>
            If you are still deciding whether to sell, start with{' '}
            <Link href='/guides/is-my-business-ready-to-sell'>Is My Business Ready to Sell?</Link>,
            which walks through the ten things buyers check before they make an
            offer. If you have decided and want to plan around a date, read{' '}
            <Link href='/guides/how-long-does-it-take-to-sell-a-business'>
              How Long Does It Take to Sell a Business?
            </Link>{' '}
            for timeframes by industry and the causes of delay. If your main
            concern is staff, customers or competitors finding out, read{' '}
            <Link href='/guides/how-to-sell-a-business-confidentially'>
              How to Sell a Business Confidentially
            </Link>
            .
          </p>
          <p>
            For a number to work from, our{' '}
            <Link href='/business-valuation'>business valuation</Link> page
            explains how a price is reached, and the{' '}
            <Link href='/exit/sale-readiness'>sale readiness</Link> and{' '}
            <Link href='/exit/exit-planning'>exit planning</Link> pages cover
            the preparation in more depth. When you are ready to talk it
            through, our{' '}
            <Link href='/selling-a-business'>selling a business</Link> page
            sets out how we run a sale from first conversation to settlement.
          </p>
        </div>
      </LandingContainer>
    </section>
  );
}
