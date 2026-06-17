import { FranchiseHero } from './_components/hero';
import { VideoSection } from './_components/video-section';
import { Benefits } from './_components/benefits';
import { WhyJoin } from './_components/why-join';
import { FAQSection } from './_components/faq-section';
import { ContactForm } from './_components/contact-form';

export default function FranchisePage() {
  return (
    <main className='min-h-screen bg-white'>
      <FranchiseHero />
      <div className='bg-brand-offwhite min-h-screen'>
        <VideoSection />
        <Benefits />
        <WhyJoin />
        <FAQSection />
        <ContactForm />
      </div>
    </main>
  );
}
