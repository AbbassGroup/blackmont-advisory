import { RECENT_ACQUISITIONS } from '@/lib/data/recent-acquisitions';
import { AcquisitionsCarousel } from './acquisitions-carousel';
import { LandingTheme } from './landing-theme';
import { LandingContainer, LandingSectionIntro } from './presentation';
import { TransactionCard } from './transaction-card';

export function Transactions() {
  return (
    <LandingTheme>
      <section
        id='acquisitions'
        aria-labelledby='acquisitions-title'
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer id='transactions'>
          <LandingSectionIntro
            headingId='acquisitions-title'
            heading='Recent acquisitions'
          />
          <AcquisitionsCarousel>
            {RECENT_ACQUISITIONS.map((deal) => (
              <TransactionCard key={deal.id} deal={deal} />
            ))}
          </AcquisitionsCarousel>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
