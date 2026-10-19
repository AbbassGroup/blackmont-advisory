import { RECENT_ACQUISITIONS } from '@/lib/data/recent-acquisitions';
import { AcquisitionsCarousel } from '@/components/landing/acquisitions-carousel';
import { TransactionCard } from '@/components/landing/transaction-card';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer, LandingSectionIntro } from '@/components/landing/presentation';

export function RecentAcquisitions() {
  return (
    <LandingTheme className='bg-canvas'>
      <section id='recent-acquisitions' aria-labelledby='acquisitions-title' className='py-14 min-[681px]:py-16 min-[1121px]:py-20'>
        <LandingContainer>
          <LandingSectionIntro headingId='acquisitions-title' heading='Recent acquisitions' />
          <AcquisitionsCarousel>
            {RECENT_ACQUISITIONS.map((deal) => (
              <TransactionCard key={deal.id} deal={deal} href={null} />
            ))}
          </AcquisitionsCarousel>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
