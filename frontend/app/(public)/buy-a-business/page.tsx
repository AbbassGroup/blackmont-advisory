import type { Metadata } from 'next';
import { IntroSection } from './_components/intro-section';
import { WhyUseAgent } from './_components/why-use-agent';
import { BuyingProcess } from './_components/buying-process';
import { WhoWeWorkWith } from './_components/who-we-work-with';
import { TalkToAgent } from './_components/talk-to-agent';
import { WhyAbbass } from './_components/why-abbass';
import { ReviewsCarousel } from '@/components/global/reviews-carousel';
import { CTASection } from './_components/cta-section';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

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
    <main className='min-h-screen bg-white'>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url('/businessbrokers/buy-a-business.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 text-center px-4 max-w-3xl mx-auto'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'>
            Buy a Business{' '}
            <span className='text-brand-primary'>With Confidence</span>
          </h1>
          <p className='text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow'>
            Business Buyer Representation by Blackmont Advisory
          </p>
        </div>

        <ScrollIndicator />
      </section>

      {/* ── Page Sections ───────────────────────────── */}
      <IntroSection />
      <WhyUseAgent />
      <BuyingProcess />
      <WhoWeWorkWith />
      <TalkToAgent />
      <WhyAbbass />
      <ReviewsCarousel />
      <CTASection />
    </main>
  );
}
