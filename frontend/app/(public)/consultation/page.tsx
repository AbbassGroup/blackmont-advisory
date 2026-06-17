'use client';
import { HeroSection } from './_components/hero';
import { WhatToExpect } from './_components/what-to-expect';
import { MeetingAgenda } from './_components/meeting-agenda';
import { WhatHappensNext } from './_components/what-happens-next';
import { FAQSection } from './_components/faq-section';
import { AgentList } from './_components/agent-list';

export default function ConsultationPage() {
  return (
    <main className='min-h-screen bg-white'>
      <HeroSection />
      <div className='bg-brand-offwhite min-h-screen'>
        <WhatToExpect />
        <MeetingAgenda />
        <WhatHappensNext />
        <FAQSection />
        <AgentList />
      </div>
    </main>
  );
}
