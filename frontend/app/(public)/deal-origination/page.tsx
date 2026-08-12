import type { Metadata } from 'next';

import { PageBanner } from '@/components/global/page-banner';
import { IntroSection } from '../buy-a-business/_components/intro-section';
import { WhyUseAgent } from '../buy-a-business/_components/why-use-agent';
import { BuyingProcess } from '../buy-a-business/_components/buying-process';
import { WhoWeWorkWith } from '../buy-a-business/_components/who-we-work-with';
import { TalkToAgent } from '../buy-a-business/_components/talk-to-agent';
import { WhyBlackmont } from '../buy-a-business/_components/why-blackmont';
import { CTASection } from '../buy-a-business/_components/cta-section';
import { HeroVideo } from './_components/hero-video';

export const metadata: Metadata = {
  title: 'Buy a Business | Business Buyers Agents | Blackmont Advisory',
  description:
    'Looking to buy a business? Blackmont Advisory helps buyers find, analyse, and negotiate the right business. Independent buyer advocacy from strategy to settlement. Book a free consultation.',
  alternates: { canonical: '/buy-a-business' },
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
        description={
          <span className='font-bold'>
            Buy Side Deal Origination by Blackmont Advisory
          </span>
        }
        image='/buy-a-business.webp'
        align='center'
      >
        <HeroVideo />
      </PageBanner>

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
