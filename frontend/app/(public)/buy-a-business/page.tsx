import type { Metadata } from 'next';
import { IntroSection } from './_components/intro-section';
import { WhyUseAgent } from './_components/why-use-agent';
import { BuyingProcess } from './_components/buying-process';
import { RecentAcquisitions } from './_components/recent-acquisitions';
import { WhoWeWorkWith } from './_components/who-we-work-with';
import { WhyBlackmont } from './_components/why-blackmont';
import { CTASection } from './_components/cta-section';
import { BuyingBanner } from './_components/banner';

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
    <div className='min-h-screen bg-background'>
      <BuyingBanner />

      {/* ── Page Sections ───────────────────────────── */}
      <IntroSection />
      <WhyUseAgent />
      <BuyingProcess />
      <RecentAcquisitions />
      <WhoWeWorkWith />
      <WhyBlackmont />
      <CTASection />
    </div>
  );
}
