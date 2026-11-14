import { ArrowRight } from 'lucide-react';
import { LandingButtonLink } from '@/components/landing/presentation';
import { SectionShell } from '@/components/landing/tabbed-page/section-shell';

const ROWS = [
  {
    factor: 'Setting the price',
    privately: 'Based on your own research, with a real risk of pricing too high and stalling, or too low and losing value.',
    broker: 'A price range built from normalised earnings, industry multiples and comparable sales.',
  },
  {
    factor: 'Finding buyers',
    privately: 'Online listings and your own contacts.',
    broker: 'Listings plus a direct approach to a private network of qualified buyers.',
  },
  {
    factor: 'Confidentiality',
    privately: 'Hard to stay anonymous when your name is on the listing.',
    broker: 'Anonymous marketing, an NDA and your approval first.',
  },
  {
    factor: 'Negotiation',
    privately: 'You negotiate face to face, where it is easy for things to get personal.',
    broker: 'An independent negotiator focused on terms as well as price.',
  },
  {
    factor: 'Cost',
    privately: 'No broker fee.',
    broker: 'A professional fee, agreed in writing before we start.',
  },
];

export function PrivateVsBroker() {
  return (
    <SectionShell
      id='private-vs-broker'
      heading='Selling privately vs using a business broker'
      intro="Plenty of owners sell without a broker. Here's how the two compare, so you can work out which way suits you."
    >
      <div className='overflow-x-auto border border-advisory-rule'>
        <table className='w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.6]'>
          <caption className='sr-only'>Comparison of selling a business privately and with Blackmont Advisory</caption>
          <thead>
            <tr className='bg-midnight text-white'>
              <th scope='col' className='w-[22%] p-4 font-semibold'>Factor</th>
              <th scope='col' className='p-4 font-semibold'>Selling privately</th>
              <th scope='col' className='p-4 font-semibold text-gilt'>Selling with Blackmont</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(({ factor, privately, broker }) => (
              <tr key={factor} className='border-t border-advisory-rule align-top'>
                <th scope='row' className='p-4 font-semibold text-midnight'>{factor}</th>
                <td className='p-4 text-ink'>{privately}</td>
                <td className='bg-canvas p-4 text-ink'>{broker}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-10 flex justify-center'>
        <LandingButtonLink
          href='/guides/how-to-sell-a-business-confidentially'
          className='group'
        >
          How to sell a business confidentially
          <ArrowRight
            size={16}
            aria-hidden='true'
            className='transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none'
          />
        </LandingButtonLink>
      </div>
    </SectionShell>
  );
}
