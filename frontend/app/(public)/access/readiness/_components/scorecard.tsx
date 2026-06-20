'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackAccessEvent } from '@/lib/track';
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  CheckCircle2,
  Wrench,
  Construction,
  type LucideIcon,
} from 'lucide-react';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { ReadinessPdf } from '../../_components/pdf/readiness-pdf';
import { Button } from '@/components/ui/button';

interface Option {
  label: string;
  pts: number;
  na?: boolean;
}
interface Question {
  cat: string;
  text: string;
  opts: Option[];
}

const questions: Question[] = [
  {
    cat: 'Financial records',
    text: 'Do you have 3 years of clean, accountant-prepared financial statements?',
    opts: [
      { label: 'No, mainly informal or cash-based records', pts: 0 },
      { label: 'Some years are incomplete or unreconciled', pts: 3 },
      { label: 'Yes, mostly clean with minor gaps', pts: 7 },
      {
        label: 'Yes, 3+ years of fully prepared, signed-off financials',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Revenue trend',
    text: 'How has your business revenue trended over the last 3 years?',
    opts: [
      { label: 'Declining significantly', pts: 0 },
      { label: 'Flat or inconsistent year to year', pts: 3 },
      { label: 'Modest, steady growth each year', pts: 7 },
      { label: 'Strong, consistent growth, clear upward trajectory', pts: 10 },
    ],
  },
  {
    cat: 'Owner dependency',
    text: 'Can your business operate normally without you for 4+ weeks?',
    opts: [
      { label: "No, I'm involved in nearly everything day to day", pts: 0 },
      {
        label: "Basic operations could continue but I'd be needed remotely",
        pts: 3,
      },
      { label: 'Yes, mostly. I might need to check in occasionally', pts: 7 },
      { label: 'Yes, completely independently with no input from me', pts: 10 },
    ],
  },
  {
    cat: 'Documented processes',
    text: 'Do you have documented procedures (SOPs) for key operational tasks?',
    opts: [
      { label: "Nothing is documented. It's all in my head", pts: 0 },
      { label: 'A few informal notes or checklists exist', pts: 3 },
      { label: 'Key processes are documented and followed', pts: 7 },
      {
        label: 'A full operations manual or digital SOP system exists',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Customer concentration',
    text: 'What percentage of your revenue comes from your top 3 customers?',
    opts: [
      { label: 'Over 60%, highly concentrated', pts: 0 },
      { label: '40–60%', pts: 3 },
      { label: '20–40%', pts: 7 },
      { label: 'Under 20%, well diversified across many clients', pts: 10 },
    ],
  },
  {
    cat: 'Lease security',
    text: 'What is the current situation with your business premises lease?',
    opts: [
      {
        label: 'Month-to-month or expiring in under 12 months with no options',
        pts: 0,
      },
      { label: 'Less than 2 years remaining, no option to renew', pts: 3 },
      {
        label: '2–5 years remaining or options to renew are available',
        pts: 7,
      },
      {
        label: 'Long-term secure lease in place, or no lease required',
        pts: 10,
      },
      { label: 'N/A', pts: 0, na: true },
    ],
  },
  {
    cat: 'Staff stability',
    text: 'How stable and capable is your current team?',
    opts: [
      { label: 'High turnover, key roles are vacant or unreliable', pts: 0 },
      { label: 'Some instability, a few key people could leave', pts: 3 },
      { label: 'Mostly stable with a reliable, experienced core team', pts: 7 },
      {
        label:
          'Strong, experienced team that can run the business independently',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Profitability',
    text: 'How consistently profitable has your business been in recent years?',
    opts: [
      { label: 'Currently loss-making', pts: 0 },
      { label: 'Break-even or profits are inconsistent year to year', pts: 3 },
      { label: 'Profitable most years with reasonable margins', pts: 7 },
      {
        label: 'Strong, consistent EBITDA with healthy and improving margins',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Legal & compliance',
    text: 'Is your business free of legal disputes, ATO debts, or compliance issues?',
    opts: [
      { label: 'Major unresolved issues exist', pts: 0 },
      { label: 'Minor issues that are being worked through', pts: 3 },
      {
        label: 'Mostly clean, just some minor administrative tidying needed',
        pts: 7,
      },
      { label: 'Completely clean, no issues of any kind', pts: 10 },
    ],
  },
  {
    cat: 'Reason for selling',
    text: 'What best describes your reason for wanting to sell?',
    opts: [
      { label: 'The business is struggling and I need to exit', pts: 0 },
      { label: 'Burnout, health, or unexpected personal pressure', pts: 4 },
      { label: 'Ready for retirement or the next chapter in life', pts: 7 },
      {
        label:
          "The business is performing well. It's simply the right time to exit",
        pts: 10,
      },
    ],
  },
];

interface Tier {
  grade: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  text: string;
  blurb: (name: string) => string;
  recs: string[];
}

function getTier(total: number): Tier {
  if (total >= 85) {
    return {
      grade: 'Sale Ready',
      icon: Trophy,
      color: '#16a34a',
      bg: '#f0fdf4',
      text: '#166534',
      blurb: (name) =>
        `Hi ${name}, your business is well-positioned to go to market right now. A buyer will likely find this an attractive acquisition. The priority is pricing it correctly and finding the right qualified buyers.`,
      recs: [
        'Commission a formal business valuation to set your asking price with confidence',
        'Engage Blackmont Advisory to begin confidential marketing to qualified buyers',
        'Brief your accountant and solicitor, a transaction may be imminent',
        "Prepare a data room and vendor disclosure documents with your broker's guidance",
      ],
    };
  }
  if (total >= 65) {
    return {
      grade: 'Nearly Sale Ready',
      icon: CheckCircle2,
      color: '#c9a84c',
      bg: '#ecfbfa',
      text: '#1b2535',
      blurb: (name) =>
        `Hi ${name}, your business is close to market-ready. A few targeted improvements could add 10–20% to your final sale price and attract higher quality buyers.`,
      recs: [
        'Identify and address your two or three lowest-scoring areas before listing',
        'Get your most recent financial year reviewed and signed off by your accountant now',
        'Reduce owner-dependency further, document your remaining key processes',
        'Book a market appraisal with Blackmont to understand your current realistic price range',
      ],
    };
  }
  if (total >= 40) {
    return {
      grade: 'Needs Preparation',
      icon: Wrench,
      color: '#d97706',
      bg: '#fffbeb',
      text: '#92400e',
      blurb: (name) =>
        `Hi ${name}, your business has real potential, but would benefit from 6–12 months of focused preparation before going to market. Selling now risks leaving significant money on the table.`,
      recs: [
        'Start documenting your key systems and processes, this is the highest-impact improvement',
        'Engage an accountant to clean up and prepare 3 years of financial statements',
        'Begin deliberately reducing your personal involvement in daily operations',
        'Speak to Blackmont now about a 12-month preparation roadmap tailored to your business',
      ],
    };
  }
  return {
    grade: 'Foundation Work Needed',
    icon: Construction,
    color: '#dc2626',
    bg: '#fef2f2',
    text: '#7f1d1d',
    blurb: (name) =>
      `Hi ${name}, your business needs significant preparation before it can attract qualified buyers. The good news is that with the right plan, an exit within 18–24 months is very achievable.`,
    recs: [
      'Prioritise financial records immediately, no serious buyer will proceed without 3 years of clean financials',
      'Address any legal, ATO, or compliance matters as an urgent first step',
      'Engage Blackmont for a long-term exit strategy session, we can map the full journey with you',
      'Consider a business coach or operations consultant to help build systems and reduce owner dependency',
    ],
  };
}

export function Scorecard() {
  const [view, setView] = useState<'quiz' | 'results'>('quiz');
  const [curQ, setCurQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null),
  );

  useEffect(() => {
    if (view === 'results') {
      trackAccessEvent('tool_completed', { resource: 'Sale Readiness Score' });
    }
  }, [view]);

  const pct = Math.round(((curQ + 1) / questions.length) * 100);
  const total = answers.reduce<number>((sum, a, i) => {
    if (a === null) return sum;
    const opt = questions[i].opts[a];
    if (opt.na) return sum;
    return sum + opt.pts;
  }, 0);

  const select = (i: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[curQ] = i;
      return next;
    });
  };

  const next = () => {
    if (answers[curQ] === null) return;
    if (curQ < questions.length - 1) setCurQ((q) => q + 1);
    else setView('results');
  };

  const tier = getTier(total);
  const name = 'there';

  return (
    <section className='py-12 lg:py-16'>
      <div className='mx-auto max-w-2xl px-4 lg:px-8'>
        {/* QUIZ */}
        {view === 'quiz' && (
          <div>
            <div className='mb-7 h-1.5 overflow-hidden rounded-full bg-secondary/10'>
              <motion.div
                className='h-full rounded-full bg-accent'
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <div className=' border border-secondary/15 bg-background p-7 lg:p-9'>
              <div className='text-xs font-semibold uppercase tracking-[0.12em] text-accent'>
                Question {curQ + 1} of {questions.length}
              </div>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={curQ}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className='mt-3 text-xl font-semibold leading-snug text-secondary'>
                    {questions[curQ].text}
                  </h2>

                  <div className='mt-6 flex flex-col gap-2.5'>
                    {questions[curQ].opts.map((opt, i) => {
                      const active = answers[curQ] === i;
                      return (
                        <button
                          key={i}
                          onClick={() => select(i)}
                          className={`flex items-start gap-3  border px-4 py-3.5 text-left text-sm transition-all ${
                            active
                              ? 'border-accent bg-accent/5'
                              : 'border-secondary/15 bg-background hover:border-accent/60'
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              active
                                ? 'border-accent bg-accent'
                                : 'border-secondary/20'
                            }`}
                          >
                            {active && (
                              <span className='h-2 w-2 rounded-full bg-background' />
                            )}
                          </span>
                          <span className='leading-snug text-secondary'>
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className='mt-7 flex gap-3'>
                {curQ > 0 && (
                  <Button
                    variant='outline'
                    onClick={() => setCurQ((q) => q - 1)}
                    className='px-6 rounded-full py-4'
                  >
                    <ArrowLeft className='h-4 w-4' /> Back
                  </Button>
                )}
                <Button
                  onClick={next}
                  disabled={answers[curQ] === null}
                  className='bg-accent px-6 rounded-full py-4'
                  // className='inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {curQ === questions.length - 1 ? 'See My Score' : 'Next'}
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {view === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='space-y-5'
          >
            {/* Hero */}
            <div className=' border border-secondary/15 bg-background p-8 text-center'>
              <div
                className='mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-4'
                style={{ background: tier.bg, borderColor: `${tier.color}55` }}
              >
                <span
                  className='text-4xl font-extrabold leading-none'
                  style={{ color: tier.color }}
                >
                  {total}
                </span>
                <span className='text-xs text-muted-foreground'>out of 100</span>
              </div>
              <div
                className='mt-5 flex items-center justify-center gap-2 text-2xl font-bold'
                style={{ color: tier.text }}
              >
                <tier.icon
                  className='h-6 w-6 shrink-0'
                  strokeWidth={2}
                  style={{ color: tier.color }}
                />
                {tier.grade}
              </div>
              <p className='mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground'>
                {tier.blurb(name)}
              </p>
            </div>

            {/* Breakdown */}
            <div className=' border border-secondary/15 bg-background p-7'>
              <h3 className='text-base font-semibold text-secondary'>
                Score breakdown by category
              </h3>
              <div className='mt-5 space-y-3.5'>
                {answers.map((a, i) => {
                  const opt = a !== null ? questions[i].opts[a] : null;
                  const isNa = !!opt?.na;
                  const pts = opt && !opt.na ? opt.pts : 0;
                  const col = isNa
                    ? '#9ca3af'
                    : pts >= 7
                      ? '#16a34a'
                      : pts >= 3
                        ? '#d97706'
                        : '#dc2626';
                  return (
                    <div key={i}>
                      <div className='mb-1.5 flex justify-between text-sm'>
                        <span className='text-secondary'>
                          {questions[i].cat}
                        </span>
                        <span className='font-semibold' style={{ color: col }}>
                          {isNa ? 'N/A' : `${pts}/10`}
                        </span>
                      </div>
                      <div className='h-1.5 overflow-hidden rounded-full bg-secondary/10'>
                        <motion.div
                          className='h-full rounded-full'
                          style={{ background: col }}
                          initial={{ width: 0 }}
                          animate={{ width: isNa ? '100%' : `${pts * 10}%` }}
                          transition={{ duration: 0.9, delay: i * 0.05 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className=' border border-secondary/15 bg-background p-7'>
              <h3 className='text-base font-semibold text-secondary'>
                Your personalised next steps
              </h3>
              <div className='mt-5 space-y-3'>
                {tier.recs.map((r, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary'>
                      {i + 1}
                    </span>
                    <span className='text-sm leading-relaxed text-secondary'>
                      {r}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-center'>
              <PrintButton
                label='Print Checklist'
                fileName='Blackmont-Sale-Readiness-Checklist.pdf'
                buildDocument={(assets) => (
                  <ReadinessPdf
                    assets={assets}
                    total={total}
                    tierGrade={tier.grade}
                    blurb={tier.blurb(name)}
                    breakdown={answers.map((a, i) => {
                      const opt = a !== null ? questions[i].opts[a] : null;
                      const isNa = !!opt?.na;
                      const pts = opt && !opt.na ? opt.pts : 0;
                      return { category: questions[i].cat, pts, isNa };
                    })}
                    recommendations={tier.recs}
                  />
                )}
              />
            </div>

            <ToolCta
              resource='Sale Readiness Score'
              title='Ready to take the next step?'
              subtitle='Book a free, confidential 30-minute call with our team.'
              button='Book a Call'
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
