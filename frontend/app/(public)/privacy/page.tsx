'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const CONTENT = {
  title: 'Privacy Policy',
  intro:
    'This Privacy Policy applies to all personal information collected by Blackmont Advisory via the website located at https://abbass.com.au/businessbrokers/.',
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
    <main className='min-h-screen bg-white pb-24'>
      {/* Hero Banner */}
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] bg-[#1c2434] text-center overflow-hidden flex items-center justify-center'>
        <div className='absolute inset-0 bg-[url("https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[1000px] mx-auto px-6 mt-10'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            {CONTENT.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white/90 text-xl md:text-2xl font-light max-w-[600px] mx-auto drop-shadow-md'
          >
            Learn how we handle and protect your personal information.
          </motion.p>
        </div>

        <ScrollIndicator />
      </div>

      <div className='max-w-[1500px] mx-auto px-6 lg:px-12 mt-16'>
        <div className='flex flex-col lg:flex-row gap-16 items-start'>
          {/* Sidebar */}
          <aside className='lg:w-[320px] shrink-0 lg:sticky lg:top-[120px] hidden lg:block'>
            <div className='py-2'>
              <nav className='flex flex-col gap-1'>
                {CONTENT.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-5 py-3 rounded-lg text-[0.95rem] font-medium transition-colors duration-200 ${
                      activeId === section.id
                        ? 'bg-[#ebf8f2] text-brand-primary-dark'
                        : 'text-[#6b7280] hover:bg-gray-50'
                    }`}
                  >
                    {section.heading.replace(/^\d+\.\s*/, '')}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className='flex-1 lg:max-w-[850px]'>
            <div className='flex flex-col gap-14 pb-20'>
              <p className='text-[#868A9A] text-[1.05rem] leading-loose max-w-[800px]'>
                {CONTENT.intro}
              </p>

              <div className='flex flex-col gap-14'>
                {CONTENT.sections.map((section) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    className='scroll-m-[140px]'
                  >
                    <h2 className='text-xl md:text-2xl font-bold text-brand-primary-dark mb-5'>
                      {section.heading.replace(/^\d+\.\s*/, '')}
                    </h2>
                    <div className='flex flex-col gap-4 text-[#868A9A] text-[1.03rem] leading-loose font-light'>
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
