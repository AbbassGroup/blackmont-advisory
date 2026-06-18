import type { Metadata } from 'next';
import { Benefits } from './_components/benefits';
import { ContactForm } from './_components/contact-form';
import { EarningPotential } from './_components/earning-potential';
import { FAQSection } from './_components/faq-section';
import { JoinHero } from './_components/hero';
import { Membership } from './_components/membership';
import { PathToSuccess } from './_components/path-to-success';
import { WhyJoin } from './_components/why-join';

export const metadata: Metadata = {
  title: 'Join ABBASS – Become a Business Broker',
  description:
    'Join our elite network of experts. Take your career to the next level as an Blackmont Advisory.',
  openGraph: {
    title: 'Join Blackmont Advisory',
    description: 'Take your career to the next level as an Blackmont Advisory.',
  },
};

export default function JoinPage() {
  return (
    <main className='min-h-screen bg-white'>
      <JoinHero />
      <div className='bg-brand-offwhite min-h-screen'>
        <Benefits />
        <WhyJoin />
        <EarningPotential />
        <Membership />
        <PathToSuccess />
        <ContactForm />
        <FAQSection />
      </div>
    </main>
  );
}
