'use client';

import { PartnershipHero } from './_components/hero';
import { IntroSection } from './_components/intro-section';

import { HowAddValue } from './_components/how-add-value';
import { WhyBlackmont } from './_components/why-blackmont';
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

        <HowAddValue />
        <WhyBlackmont />
        <OurApproach />
        <Collab />
        <FAQSection />

        <CTASection />
      </div>
    </main>
  );
}
