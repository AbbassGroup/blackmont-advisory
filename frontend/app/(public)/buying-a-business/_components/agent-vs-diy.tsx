import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';

const CHANNELS = [
  {
    title: 'Online listings',
    text: 'The easiest place to start, but every other buyer is looking at the same businesses.',
  },
  {
    title: 'Business brokers',
    text: 'Brokers often know about businesses before they are listed. Remember they work for the seller.',
  },
  {
    title: 'Off-market approaches',
    text: 'Going directly to owners of businesses that are not for sale. Less competition, but it takes time and a network.',
  },
];

const ROWS = [
  {
    factor: 'Finding businesses',
    diy: 'Mostly online listings, competing with every other buyer.',
    advisor: 'Listings, broker networks and off-market approaches to owners.',
  },
  {
    factor: 'Price',
    diy: 'Starts from the seller’s asking price.',
    advisor: 'An independent view of what the business is worth.',
  },
  {
    factor: 'Due diligence',
    diy: 'You decide what to check and coordinate everyone.',
    advisor: 'A structured checklist, run with your accountant and lawyer.',
  },
  {
    factor: 'Negotiation',
    diy: 'You negotiate with the seller’s broker, who works for the seller.',
    advisor: 'An experienced negotiator working only for you.',
  },
  {
    factor: 'Cost',
    diy: 'No advisor fee.',
    advisor: 'A professional fee, agreed in writing before we start.',
  },
];

export function AgentVsDiy() {
  return (
    <SectionShell
      id='agent-vs-diy'
      tone='canvas'
      heading='Buying a business yourself vs with an advisor'
      intro='You can buy a business on your own, and some buyers do. Here is how to find a business to buy, and how the two approaches compare.'
    >
      <h3 className='m-0 mb-4 font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-midnight'>
        How to find a business to buy
      </h3>
      <ul className='m-0 mb-10 grid list-none gap-4 p-0 min-[931px]:grid-cols-3'>
        {CHANNELS.map(({ title, text }, i) => (
          <li key={title} className='border-t-2 border-gilt bg-white p-6'>
            <p className={cardTitle}>
              <span className='text-gilt'>{i + 1}.</span> {title}
            </p>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
      </ul>

      <div className='overflow-x-auto border border-advisory-rule bg-white'>
        <table className='w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.6]'>
          <caption className='sr-only'>Comparison of buying a business yourself and with Blackmont Advisory</caption>
          <thead>
            <tr className='bg-midnight text-white'>
              <th scope='col' className='w-[22%] p-4 font-semibold'>Factor</th>
              <th scope='col' className='p-4 font-semibold'>Buying yourself</th>
              <th scope='col' className='p-4 font-semibold text-gilt'>Buying with Blackmont</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(({ factor, diy, advisor }) => (
              <tr key={factor} className='border-t border-advisory-rule align-top'>
                <th scope='row' className='p-4 font-semibold text-midnight'>{factor}</th>
                <td className='p-4 text-ink'>{diy}</td>
                <td className='bg-canvas p-4 text-ink'>{advisor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
