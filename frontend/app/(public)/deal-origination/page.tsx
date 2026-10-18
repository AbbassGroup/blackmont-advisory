import type { Metadata } from 'next';

import { IntroSection } from '../buy-a-business/_components/intro-section';
import { WhyUseAgent } from '../buy-a-business/_components/why-use-agent';
import { BuyingProcess } from '../buy-a-business/_components/buying-process';
import { WhoWeWorkWith } from '../buy-a-business/_components/who-we-work-with';
import { WhyBlackmont } from '../buy-a-business/_components/why-blackmont';
import { CTASection } from '../buy-a-business/_components/cta-section';
import { DealOriginationBanner } from './_components/banner';

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

export default function DealOriginationPage() {
  return (
    <div className='min-h-screen bg-background'>
      <DealOriginationBanner />

      {/* ── Page Sections ───────────────────────────── */}
      <IntroSection />
      <WhyUseAgent />
      <BuyingProcess />
      <WhoWeWorkWith />
      <WhyBlackmont />
      <CTASection />
    </div>
  );
}
