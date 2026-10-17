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
        className='pt-[6px] pb-[73px] min-[681px]:pt-[23px] min-[681px]:pb-[107px]'
      >
        <LandingContainer id='transactions'>
          <LandingSectionIntro
            headingId='acquisitions-title'
            heading='Recent acquisitions'
            className='min-[681px]:mb-[39px]'
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
