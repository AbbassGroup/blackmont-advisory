import type { Metadata } from 'next';
import { IntroSection } from './_components/intro-section';
import { WhyUseAgent } from './_components/why-use-agent';
import { BuyingProcess } from './_components/buying-process';
import { WhoWeWorkWith } from './_components/who-we-work-with';
import { TalkToAgent } from './_components/talk-to-agent';
import { WhyBlackmont } from './_components/why-blackmont';
import { CTASection } from './_components/cta-section';
import { PageBanner } from '@/components/global/page-banner';

export const metadata: Metadata = {
  title: 'Buy a Business | Business Buyers Agents | Blackmont Advisory',
  description:
    'Looking to buy a business? Blackmont Advisory helps buyers find, analyse, and negotiate the right business. Independent buyer advocacy from strategy to settlement. Book a free consultation.',
  openGraph: {
    title: 'Buy a Business | Blackmont Advisory',
    description: 'Independent buyer advocacy from strategy to settlement.',
  },
};

export default function BuyBusinessPage() {
  return (
    <main className='min-h-screen bg-background'>
      <PageBanner
        title={
          <>
            Buy a Business{' '}
            <span className='font-light text-accent'>With Confidence</span>
          </>
        }
        description='Business Buyer Representation by Blackmont Advisory'
        image='/buy-a-business.webp'
      />

      {/* ── Page Sections ───────────────────────────── */}
      <IntroSection />
      <WhyUseAgent />
      <BuyingProcess />
      <WhoWeWorkWith />
      <TalkToAgent />
      <WhyBlackmont />
      <CTASection />
    </main>
  );
}
