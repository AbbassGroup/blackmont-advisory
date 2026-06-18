'use client';

import { useEffect, useState } from 'react';
import { PageBanner } from '@/components/global/page-banner';

const CONTENT = {
  title: 'Privacy Policy',
  intro:
    'This Privacy Policy applies to all personal information collected by Blackmont Advisory via the website located at https://www.blackmontadvisory.com/.',
  sections: [
    {
      id: 'what-is-personal',
      heading: '1. What is "personal information"?',
      paragraphs: [
        'The Privacy Act 1988 (Cth) currently defines "personal information" as meaning information or an opinion about an identified individual or an individual who is reasonably identifiable: whether the information or opinion is true or not; and whether the information or opinion is recorded in a material form or not.',
        'If the information does not disclose your identity or enable your identity to be ascertained, it will in most cases not be classified as "personal information" and will not be subject to this privacy policy.',
      ],
    },
    {
      id: 'what-info',
      heading: '2. What information do we collect?',
      paragraphs: [
        'The kind of personal information that we collect from you will depend on how you use the website. The personal information which we collect and hold about you may include: Full name, email address and contact number.',
      ],
    },
    {
      id: 'how-collect',
      heading: '3. How we collect your personal information',
      paragraphs: [
        '(a) We may collect personal information from you whenever you input such information into the website.',
        '(b) We also collect cookies from your computer which enable us to tell when you use the website and also to help customise your website experience. As a general rule, however, it is not possible to identify you personally from our use of cookies.',
      ],
    },
    {
      id: 'purpose',
      heading: '4. Purpose of collection',
      paragraphs: [
        '(a) The purpose for which we collect personal information is to provide you with the best service experience possible on the website.',
        '(b) We customarily disclose personal information only to our service providers who assist us in operating the website. Your personal information may also be exposed from time to time to maintenance and support personnel acting in the normal course of their duties.',
        '(c) By using our website, you consent to the receipt of direct marketing material. We will only use your personal information for this purpose if we have collected such information direct from you, and if it is material of a type which you would reasonably expect to receive from us. We do not use sensitive personal information in direct marketing activity. Our direct marketing material will include a simple means by which you can request not to receive further communications of this nature.',
      ],
    },
    {
      id: 'access-correction',
      heading: '5. Access and correction',
      paragraphs: [
        'Australian Privacy Principle 12 permits you to obtain access to the personal information we hold about you in certain circumstances, and Australian Privacy Principle 13 allows you to correct inaccurate personal information subject to certain exceptions. If you would like to obtain such access, please contact us as set out below.',
      ],
    },
    {
      id: 'complaint',
      heading: '6. Complaint procedure',
      paragraphs: [
        'If you have a complaint concerning the manner in which we maintain the privacy of your personal information, please contact us as set out below. All complaints will be considered by Blackmont Advisory and we may seek further information from you to clarify your concerns. If we agree that your complaint is well founded, we will, in consultation with you, take appropriate steps to rectify the problem. If you remain dissatisfied with the outcome, you may refer the matter to the Office of the Australian Information Commissioner.',
      ],
    },
    {
      id: 'overseas',
      heading: '7. Overseas transfer',
      paragraphs: [
        'Your personal information may be transferred to recipients located in countries outside of Australia. Those countries in question have data protection laws which protect personal information in a way which is at least substantially similar to the Australian Privacy Principles, and there will be mechanisms available to you to enforce protection of your personal information under that overseas law. In the circumstances, we do not require the overseas recipients to comply with the Australian Privacy Principles and we will not be liable for a breach of the Australian Privacy Principles if your personal information is mishandled.',
      ],
    },
    {
      id: 'contact',
      heading: '8. How to contact us about privacy',
      paragraphs: [
        'If you have any queries, or if you seek access to your personal information, or if you have a complaint about our privacy practices, you can contact us through: info@blackmontadvisory.com',
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(CONTENT.sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = CONTENT.sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 200;

      let currentActiveId = CONTENT.sections[0].id;
      for (const el of sectionElements) {
        if (el.offsetTop <= scrollPosition) {
          currentActiveId = el.id;
        }
      }
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <PageBanner
        title={CONTENT.title}
        description='Learn how we handle and protect your personal information.'
        image='https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg'
      />

      <section className='bg-background py-20 lg:py-28'>
        <div className='mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16'>
          <div className='flex flex-col items-start gap-12 lg:flex-row lg:gap-16'>
            {/* Sidebar */}
            <aside className='hidden shrink-0 lg:sticky lg:top-28 lg:block lg:w-[300px]'>
              <nav className='flex flex-col border-l border-secondary/10'>
                {CONTENT.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`-ml-px border-l-2 px-5 py-2.5 text-left text-sm font-medium transition-colors ${
                      activeId === section.id
                        ? 'border-accent bg-accent-pale text-secondary'
                        : 'border-transparent text-muted-foreground hover:text-secondary'
                    }`}
                  >
                    {section.heading.replace(/^\d+\.\s*/, '')}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className='flex-1 lg:max-w-[850px]'>
              <p className='mb-12 max-w-[800px] text-lg leading-relaxed text-muted-foreground'>
                {CONTENT.intro}
              </p>

              <div className='flex flex-col gap-12'>
                {CONTENT.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className='scroll-mt-28'
                  >
                    <h2 className='mb-5 text-xl font-bold tracking-tight text-secondary md:text-2xl'>
                      {section.heading.replace(/^\d+\.\s*/, '')}
                    </h2>
                    <div className='flex flex-col gap-4 leading-relaxed text-muted-foreground'>
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
