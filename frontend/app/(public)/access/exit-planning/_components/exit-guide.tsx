'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { ExitPlanningPdf } from '../../_components/pdf/exit-planning-pdf';

interface Phase {
  label: string;
  title: string;
  tasks: string[];
}

const phases: Phase[] = [
  {
    label: '24+ months out',
    title: 'Lay the foundation',
    tasks: [
      'Get a business appraisal from ABBASS Business Brokers to understand where you stand.',
      'Begin clearly separating personal and business expenses in your accounts.',
      'Start delegating key operational roles to reduce your daily involvement.',
      'Review your business structure with your accountant (Pty Ltd, trust, etc.) for optimal exit tax outcomes.',
      'Speak to your accountant about CGT concessions and small business tax planning strategies.',
      'Start documenting your key processes, even basic notes are a strong start',
      "Identify the 'story' of your business: what makes it attractive to a buyer?",
    ],
  },
  {
    label: '12–18 months out',
    title: 'Clean up and systemise',
    tasks: [
      'Get a business appraisal from ABBASS Business Brokers to understand where you stand.',
      'Get 3 years of clean, accountant-signed financial statements prepared.',
      'Review your commercial lease, negotiate an extension or options to renew now.',
      'Identify and develop 2–3 key staff who can run the business independently.',
      'Resolve any legal disputes, outstanding ATO debts, or compliance matters.',
      'Move key customer and supplier relationships to formal written contracts.',
      'Work to build or strengthen recurring revenue streams where possible.',
    ],
  },
  {
    label: '6–12 months out',
    title: 'Prepare for market',
    tasks: [
      'Engage ABBASS Business Brokers for a market appraisal.',
      'Confirm your realistic price expectation with your broker based on current market data.',
      'Begin drafting your Information Memorandum (IM) with your broker.',
      'Refresh your premises: signage, fit-out, cleanliness, and first impressions matter.',
      'Reduce customer concentration if over 40% of revenue sits with one or two clients.',
      'Speak to your financial planner about what you personally need from the sale proceeds.',
      'Review and tidy your online presence: Google reviews, website, and social media',
    ],
  },
  {
    label: '3–6 months out',
    title: 'Engage ABBASS Business Brokers and go to market',
    tasks: [
      'Sign your engagement agreement with ABBASS Business Brokers',
      'Finalise your asking price, deal structure (asset vs. share sale), and negotiation floor',
      'Prepare a vendor disclosure statement and warranties with your solicitor',
      'Set up a secure data room with all key business documents ready for buyer due diligence',
      'Ensure all licences, permits, and registrations are current and transferable to a new owner',
      'Agree on a confidentiality protocol: what do staff, suppliers, and customers know, and when?',
      'Brief your solicitor and accountant that a transaction is likely in the near term',
    ],
  },
  {
    label: 'Listed & under offer',
    title: 'Manage the sale process',
    tasks: [
      'Review and approve your final IM and all marketing materials before they go live',
      'Respond promptly to all buyer enquiries, speed signals a motivated, credible seller',
      'Prepare thoroughly for buyer inspections, first impressions significantly impact offers',
      'Review all offers carefully with your broker before responding',
      'Provide due diligence information to serious buyers promptly and professionally',
      'Negotiate through your broker, avoid direct negotiations with buyers at this stage',
      'Congratulate yourself, you have built something genuinely worth buying.',
    ],
  },
];

const totalTasks = phases.reduce((n, p) => n + p.tasks.length, 0);

function progressCopy(pct: number) {
  if (pct === 0)
    return {
      h: 'Getting started',
      s: 'Work through each phase below to prepare your business for a successful sale.',
    };
  if (pct < 25)
    return {
      h: 'Good start',
      s: 'Keep working through the early phases, a strong foundation is everything.',
    };
  if (pct < 50)
    return {
      h: 'Building momentum',
      s: 'You are building solid foundations for a high-quality exit.',
    };
  if (pct < 75)
    return {
      h: 'Strong progress',
      s: 'Your business is getting closer to being genuinely market-ready.',
    };
  if (pct < 100)
    return {
      h: 'Almost there',
      s: 'You are in excellent shape. Consider booking a broker appraisal now.',
    };
  return {
    h: 'Fully prepared',
    s: "Your business is ready to go to market. Let's talk about next steps.",
  };
}

export function ExitGuide() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const doneCount = useMemo(
    () => Object.values(done).filter(Boolean).length,
    [done],
  );
  const pct = Math.round((doneCount / totalTasks) * 100);
  const copy = progressCopy(pct);

  return (
    <section className='py-12 lg:py-16'>
      <div className='mx-auto max-w-3xl px-5 lg:px-8'>
        {/* Overall progress */}
        <div className='flex items-center gap-6 rounded-2xl bg-brand-black px-6 py-6 lg:px-8'>
          <div className='relative flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-brand-primary/40 bg-white/5'>
            <span className='text-xl font-extrabold leading-none text-brand-primary'>
              {pct}%
            </span>
            <span className='text-[10px] text-white/40'>complete</span>
          </div>
          <div>
            <h2 className='text-lg font-semibold text-white'>{copy.h}</h2>
            <p className='mt-1 text-sm text-white/55'>{copy.s}</p>
          </div>
        </div>

        {/* Phases */}
        <div className='mt-8 space-y-7'>
          {phases.map((phase, pi) => {
            const phaseDone = phase.tasks.filter(
              (_, ti) => done[`${pi}-${ti}`],
            ).length;
            const complete = phaseDone === phase.tasks.length;
            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4 }}
              >
                <div className='flex items-center gap-4'>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white transition-colors ${
                      complete ? 'bg-green-600' : 'bg-brand-primary'
                    }`}
                  >
                    {complete ? <Check className='h-5 w-5' /> : pi + 1}
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-[17px] font-semibold text-brand-black'>
                      {phase.title}
                    </h3>
                    <p className='text-xs text-gray-400'>{phase.label}</p>
                  </div>
                  <span className='whitespace-nowrap text-xs font-semibold text-brand-primary'>
                    {phaseDone} / {phase.tasks.length} done
                  </span>
                </div>

                <div className='ml-5 mt-3 space-y-2 border-l border-gray-200 pl-7'>
                  {phase.tasks.map((task, ti) => {
                    const key = `${pi}-${ti}`;
                    const checked = !!done[key];
                    return (
                      <button
                        key={ti}
                        onClick={() => toggle(key)}
                        className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                          checked
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-brand-primary'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            checked
                              ? 'border-green-600 bg-green-600 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {checked && <Check className='h-3 w-3' />}
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            checked ? 'text-gray-400' : 'text-brand-black'
                          }`}
                        >
                          {task}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className='mt-8 flex justify-center'>
          <PrintButton
            label='Print Exit Guide'
            fileName='ABBASS-Exit-Planning-Guide.pdf'
            buildDocument={(assets) => (
              <ExitPlanningPdf
                assets={assets}
                progressPct={pct}
                progressLabel={copy.h}
                phases={phases.map((phase, pi) => ({
                  label: phase.label,
                  title: phase.title,
                  tasks: phase.tasks.map((text, ti) => ({
                    text,
                    done: !!done[`${pi}-${ti}`],
                  })),
                }))}
              />
            )}
          />
        </div>

        <ToolCta
          resource='Exit Planning Guide'
          title='Not sure where to start?'
          subtitle='Our brokers will build a personalised exit roadmap for your business.'
          button='Book Strategy Call'
        />
      </div>
    </section>
  );
}
