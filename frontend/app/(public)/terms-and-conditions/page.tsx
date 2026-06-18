'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const TERMS_DATA = {
  title: 'Terms & Conditions',
  sections: [
    {
      id: 'about',
      heading: '1. About the Website',
      paragraphs: [
        '(a) Welcome to www.abbass.com.au/businessbrokers. The Website provides you with an opportunity to browse various services that have been listed for sale through the Website (Services). The Website provides this service by way of granting you access to the content on the Website (Services).',
        '(b) The Website is operated by   Blackmont Advisory (ACN 674 429 255). Access to and use of the Website, or any of its associated Services, is provided by   Blackmont Advisory. Please read these terms and conditions (Terms) carefully. By using, browsing and/or reading the Website, this signifies that you have read, understood and agree to be bound by the Terms. If you do not agree with the Terms, you must cease usage of the Website, or any of Services, immediately.',
        '(c)   Blackmont Advisory reserves the right to review and change any of the Terms by updating this page at its sole discretion. When   Blackmont Advisory updates the Terms, it will use reasonable endeavours to provide you with notice of updates to the Terms. Any changes to the Terms take immediate effect from the date of their publication. Before you continue, we recommend you keep a copy of the Terms for your records.',
      ],
    },
    {
      id: 'acceptance',
      heading: '2. Acceptance of the Terms',
      paragraphs: [
        'You ("The customer") accept the Terms by remaining on the Website. You may also accept the Terms by clicking to accept or agree to the Terms where this option is made available to you by   Blackmont Advisory in the user interface.',
      ],
    },
    {
      id: 'registration',
      heading: '3. Registration to be Contacted',
      paragraphs: [
        '(a) In order to be contacted by Blackmont Advisory, you must first register your contact details. As part of this process, you may be required to provide personal information about yourself (such as identification or contact details), including:',
        '(i) Name',
        '(ii) Telephone number',
        '(iii) Email address',
      ],
    },
    {
      id: 'copyright',
      heading: '4. Copyright and Intellectual Property',
      paragraphs: [
        '(a) The Website and all of the related Services of   Blackmont Advisory are subject to copyright. The material on the Website is protected by copyright under the laws of Australia and through international treaties. Unless otherwise indicated, all rights (including copyright) in the site content and compilation of the website (including text, graphics, logos, button icons, video images, audio clips and software) (Content) are owned or controlled for these purposes, and are reserved by   Blackmont Advisory or its contributors.',
        '(b)   Blackmont Advisory retains all rights, title and interest in and to the Website and all related content. Nothing you do on or in relation to the Website will transfer to you:',
        '(i) the business name, trading name, domain name, trade mark, industrial design, patent, registered design or copyright of   Blackmont Advisory; or',
        '(ii) the right to use or exploit a business name, trading name, domain name, trade mark or industrial design; or',
        '(iii) a system or process that is the subject of a patent, registered design or copyright (or an adaptation or modification of such a system or process).',
      ],
    },
    {
      id: 'privacy',
      heading: '5. Privacy',
      paragraphs: [
        "  Blackmont Advisory takes your privacy seriously and any information provided through your use of the Website and/or the Services are subject to   Blackmont Advisory's Privacy Policy, which is available on the Website.",
      ],
    },
    {
      id: 'disclaimer',
      heading: '6. General Disclaimer',
      paragraphs: [
        '(a) You acknowledge that   Blackmont Advisory does not make any terms, guarantees, warranties, representations or conditions whatsoever regarding the Services other than provided for pursuant to these Terms.',
        '(b) Nothing in these Terms limits or excludes any guarantees, warranties, representations or conditions implied or imposed by law, including the Australian Consumer Law (or any liability under them) which by law may not be limited or excluded.',
        '(c) Subject to this clause, and to the extent permitted by law:',
        '(i) all terms, guarantees, warranties, representations or conditions which are not expressly stated in these Terms are excluded; and',
        '(ii)   Blackmont Advisory will not be liable for any special, indirect or consequential loss or damage (unless such loss or damage is reasonably foreseeable resulting from our failure to meet an applicable Consumer Guarantee), loss of profit or opportunity, or damage to goodwill arising out of or in connection with the Services or these Terms (including as a result of not being able to use the Services, whether at common law, under contract, tort (including negligence), in equity, pursuant to statute or otherwise.',
        '(e) Use of the Website, the Services, and any of the Services of   Blackmont Advisory, is at your own risk. Everything on the Website, the Services of   Blackmont Advisory, are provided to you on an "as is" and "as available" basis, without warranty or condition of any kind. None of the affiliates, directors, officers, employees, agents, contributors, third party content providers or licensors of   Blackmont Advisory make any express or implied representation or warranty about its Content or any Services referred to on the Website. This includes (but is not restricted to) loss or damage you might suffer as a result of any of the following:',
        '(i) the accuracy, suitability or currency of any information on the Website, the Service (including third party material and advertisements on the Website);',
        "(ii) the Content or operation in respect to links which are provided for the User's convenience;",
        '(iii) the use of any of the calculators available on the website.',
      ],
    },
    {
      id: 'liability',
      heading: '7. Limitation of Liability',
      paragraphs: [
        "(a)   Blackmont Advisory's total liability arising out of or in connection with the services or these Terms, however arising, including under contract, tort (including negligence), in equity, under statute or otherwise, will not exceed the most recent Purchase Price paid by you under these Terms or where you have not paid the Purchase Price, then the total liability of   Blackmont Advisory is the resupply of information or services to you.",
        '(b) You expressly understand and agree that   Blackmont Advisory, its affiliates, employees, agents, contributors, third party content providers and licensors shall not be liable to you for any direct, indirect, incidental, special consequential or exemplary damages which may be incurred by you, however caused and under any theory of liability. This shall include, but is not limited to, any loss of profit (whether incurred directly or indirectly), any loss of goodwill or business reputation and any other intangible loss.',
        '(c)   Blackmont Advisory is not responsible or liable in any manner for any site content (including the Content and Third Party Content) posted on the Website or in connection with the Services, whether posted or caused by users of the website of   Blackmont Advisory, by third parties or by any of the Services offered by   Blackmont Advisory.',
      ],
    },
    {
      id: 'indemnity',
      heading: '8. Indemnity',
      paragraphs: [
        '(a) You agree to indemnify   Blackmont Advisory, its affiliates, employees, agents, contributors, third party content providers and licensors from and against:',
        '(i) all actions, suits, claims, demands, liabilities, costs, expenses, loss and damage (including legal fees on a full indemnity basis) incurred, suffered or arising out of or in connection with any Content you post through the Website;',
        '(ii) any direct or indirect consequences of you accessing, using or transacting on the Website or attempts to do so and any breach by you or your agents of these Terms; and/or',
        '(iii) any breach of the Terms.',
      ],
    },
    {
      id: 'dispute-resolution',
      heading: '9. Dispute Resolution',
      paragraphs: [
        '9.1. Compulsory\nIf a dispute arises out of or relates to the Terms, either party may not commence any Tribunal or Court proceedings in relation to the dispute, unless the following clauses have been complied with (except where urgent interlocutory relief is sought).',
        '9.2. Notice\nA party to the Terms claiming a dispute (Dispute) has arisen under the Terms, must give written notice to the other party detailing the nature of the dispute, the desired outcome and the action required to settle the Dispute.',
        '9.3 Resolution\nOn receipt of that notice (Notice) by that other party, the parties to the Terms (Parties) must:',
        '(i) Within 28 days of the Notice endeavour in good faith to resolve the Dispute expeditiously by negotiation or such other means upon which they may mutually agree;',
        '(ii) If for any reason whatsoever, 28 days after the date of the Notice, the Dispute has not been resolved, the Parties must either agree upon selection of a mediator or request that an appropriate mediator be appointed by the President of the Australian Mediation Association or his or her nominee;',
        '(iii) The Parties are equally liable for the fees and reasonable expenses of a mediator and the cost of the venue of the mediation and without limiting the foregoing undertake to pay any amounts requested by the mediator as a pre-condition to the mediation commencing. The Parties must each pay their own costs associated with the mediation;',
        '(iv) The mediation will be held in Melbourne, Australia.',
        '9.4 Confidential\nAll communications concerning negotiations made by the Parties arising out of and in connection with this dispute resolution clause are confidential and to the extent possible, must be treated as "without prejudice" negotiations for the purpose of applicable laws of evidence.',
        '9.5 Termination of Mediation\nIf 2 months have elapsed after the start of a mediation of the Dispute and the Dispute has not been resolved, either Party may ask the mediator to terminate the mediation and the mediator must do so.',
      ],
    },
    {
      id: 'jurisdiction',
      heading: '10. Venue and Jurisdiction',
      paragraphs: [
        'The Services offered by   Blackmont Advisory are intended to be used by residents of Australia. In the event of any dispute arising out of or in relation to the Website, you agree that the exclusive venue for resolving any dispute shall be in the courts of Victoria, Australia.',
      ],
    },
    {
      id: 'governing-law',
      heading: '11. Governing Law',
      paragraphs: [
        'The Terms are governed by the laws of Victoria, Australia. Any dispute, controversy, proceeding or claim of whatever nature arising out of or in any way relating to the Terms and the rights created hereby shall be governed, interpreted and construed by, under and pursuant to the laws of Victoria Australia, without reference to conflict of law principles, notwithstanding mandatory rules. The validity of this governing law clause is not contested. The Terms shall be binding to the benefit of the parties hereto and their successors and assigns.',
      ],
    },
    {
      id: 'severance',
      heading: '12. Severance',
      paragraphs: [
        'If any part of these Terms is found to be void or unenforceable by a Court of competent jurisdiction, that part shall be severed and the rest of the Terms shall remain in force.',
      ],
    },
  ],
};

export default function TermsPage() {
  const [activeId, setActiveId] = useState(TERMS_DATA.sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = TERMS_DATA.sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 200;

      let currentActiveId = TERMS_DATA.sections[0].id;
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
        <div className='absolute inset-0 bg-[url("https://images.pexels.com/photos/8730374/pexels-photo-8730374.jpeg")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[1000px] mx-auto px-6 mt-10'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            {TERMS_DATA.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white/90 text-xl md:text-2xl font-light max-w-[600px] mx-auto drop-shadow-md'
          >
            Please read these terms and conditions carefully.
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
                {TERMS_DATA.sections.map((section) => (
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
              {TERMS_DATA.sections.map((section) => (
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
                  <div className='flex flex-col gap-5 text-[#868A9A] text-[1.03rem] leading-loose font-light'>
                    {section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={
                          p.startsWith('(i)') || p.startsWith('9.')
                            ? 'pl-5'
                            : ''
                        }
                      >
                        {p.split('\n').map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < p.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
