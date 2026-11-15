import { RECENT_ACQUISITIONS } from '@/lib/data/recent-acquisitions';
import { AcquisitionsCarousel } from '@/components/landing/acquisitions-carousel';
import { TransactionCard } from '@/components/landing/transaction-card';
import { SectionShell } from '@/components/landing/tabbed-page/section-shell';

export function RecentAcquisitions() {
  return (
    <SectionShell
      id='recent-acquisitions'
      tone='canvas'
      heading='Recent business acquisitions for our buyers'
      intro='A few of the businesses we have helped clients buy, from first-time owners to operators growing through acquisition.'
    >
      <AcquisitionsCarousel>
        {RECENT_ACQUISITIONS.map((deal) => (
          <TransactionCard key={deal.id} deal={deal} href={null} />
        ))}
      </AcquisitionsCarousel>
    </SectionShell>
  );
}
