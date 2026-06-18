'use client';

import { PartnershipHero } from './_components/hero';
import { IntroSection } from './_components/intro-section';

import { AgentsCarousel } from '@/components/global/agents-carousel';
import { BookDiscussionButton } from './_components/book-discussion-button';
import { HowAddValue } from './_components/how-add-value';
import { WhyAbbass } from './_components/why-abbass';
import { OurApproach } from './_components/our-approach';
import { Collab } from './_components/collab';
import { FAQSection } from './_components/faq-section';
import { CTASection } from './_components/cta-section';
import { WhyMatters } from './_components/why-matters';
import { HowWork } from './_components/how-work';

export default function PartnershipPage() {
  return (
    <main className='min-h-screen bg-background'>
      <PartnershipHero />
      <div className='min-h-screen bg-background'>
        <IntroSection />
        <WhyMatters />
        <HowWork />
        <AgentsCarousel title='Meet Our Agents'>
          <BookDiscussionButton />
        </AgentsCarousel>

        <HowAddValue />
        <WhyAbbass />
        <OurApproach />
        <Collab />
        <FAQSection />

        <CTASection />
      </div>
    </main>
  );
}
