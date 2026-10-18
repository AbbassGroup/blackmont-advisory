'use client';

import { useEffect, useState } from 'react';
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
import { LandingButton, landingButtonVariants } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';

import { READINESS_QUESTIONS as questions } from '@/lib/data/readiness';

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
      <div className='min-w-0' data-tool-results={view === 'results' ? true : undefined}>
        {/* QUIZ */}
        {view === 'quiz' && (
          <form
            aria-labelledby='readiness-question'
            onSubmit={(event) => { event.preventDefault(); next(); }}
            className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'
          >
            <div className='mb-3 flex items-center justify-between gap-3 text-sm leading-[1.5]'>
              <span role='status' className='font-semibold text-midnight'>Question {curQ + 1} of {questions.length}</span>
              <span className='text-ink'>{pct}%</span>
            </div>
            <div
              role='progressbar'
              aria-label='Readiness questionnaire progress'
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className='mb-7 h-1 overflow-hidden bg-advisory-rule'
            >
              <div
                className='h-full w-full origin-left bg-gilt transition-transform duration-200 ease-out motion-reduce:transition-none'
                style={{ transform: `scaleX(${pct / 100})` }}
              />
            </div>

            <div>
                <fieldset key={curQ} className='m-0 min-w-0 border-0 p-0'>
                  <legend id='readiness-question' className='mb-5 w-full font-advisory-heading text-[24px] leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[28px]'>
                    {questions[curQ].text}
                  </legend>

                  <div className='flex flex-col gap-2.5'>
                    {questions[curQ].opts.map((opt, i) => {
                      const active = answers[curQ] === i;
                      return (
                        <label
                          key={i}
                          className={cn('flex min-h-11 cursor-pointer items-start gap-3 border px-3 py-3 text-left text-[15px] leading-[1.6] transition-colors duration-150 focus-within:border-midnight motion-reduce:transition-none',
                            active
                              ? 'border-midnight bg-canvas'
                              : 'border-advisory-input bg-white hover:border-midnight',
                          )}
                        >
                          <input
                            type='radio'
                            name={`readiness-question-${curQ}`}
                            value={i}
                            checked={active}
                            onChange={() => select(i)}
                            className='mt-1 size-4 shrink-0 accent-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt'
                          />
                          <span className='text-ink'>
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

              <div className='mt-6 flex flex-wrap items-center gap-3 border-t border-advisory-rule pt-6'>
                {curQ > 0 && (
                  <LandingButton
                    type='button'
                    variant='outline'
                    onClick={() => setCurQ((q) => q - 1)}
                    size='compact'
                  >
                    <ArrowLeft aria-hidden='true' className='size-4' /> Back
                  </LandingButton>
                )}
                <LandingButton
                  type='submit'
                  disabled={answers[curQ] === null}
                  size='compact'
                >
                  {curQ === questions.length - 1 ? 'See my score' : 'Next'}
                  <ArrowRight aria-hidden='true' className='size-4' />
                </LandingButton>
              </div>
            </div>
          </form>
        )}

        {/* RESULTS */}
        {view === 'results' && (
          <div
            role='region'
            aria-labelledby='readiness-result-title'
            className='space-y-6'
          >
            {/* Hero */}
            <div className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
              <div className='flex flex-wrap items-start justify-between gap-5'>
                <div>
                  <h2 id='readiness-result-title' className='m-0 mb-3 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight'>Your readiness score</h2>
                  <p className='m-0 flex items-center gap-2 text-lg font-semibold' style={{ color: tier.text }}>
                    <tier.icon aria-hidden='true' className='size-5 shrink-0' />
                    {tier.grade}
                  </p>
                </div>
                <p className='m-0 flex items-baseline gap-2 text-midnight'>
                  <span className='font-advisory-heading text-[44px] leading-[1.2] font-bold'>{total}</span>
                  <span className='text-sm'>out of 100</span>
                </p>
              </div>
              <p className='m-0 mt-5 max-w-[900px] text-[15px] leading-[1.8] text-ink'>
                {tier.blurb(name)}
              </p>
            </div>

            {/* Breakdown */}
            <div className='grid items-start gap-6 min-[931px]:grid-cols-2'>
            <div className='min-w-0 border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
              <h3 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>
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
                      <div className='mb-2 flex justify-between gap-4 text-sm leading-[1.6]'>
                        <span className='text-ink'>
                          {questions[i].cat}
                        </span>
                        <span className='shrink-0 font-semibold text-midnight'>
                          {isNa ? 'N/A' : `${pts}/10`}
                        </span>
                      </div>
                      <div aria-hidden='true' className='h-1.5 overflow-hidden bg-advisory-rule'>
                        <div
                          className='h-full'
                          style={{ background: col, width: isNa ? '100%' : `${pts * 10}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className='min-w-0 border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
              <h3 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>
                Your personalised next steps
              </h3>
              <ol role='list' className='m-0 mt-5 list-none space-y-4 p-0'>
                {tier.recs.map((r, i) => (
                  <li key={i} className='flex items-start gap-3'>
                    <span aria-hidden='true' className='shrink-0 text-[15px] leading-[1.75] font-bold text-midnight'>
                      {i + 1}.
                    </span>
                    <span className='text-[15px] leading-[1.75] text-ink'>
                      {r}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <PrintButton
                resource='Sale Readiness Score'
                label='Print checklist'
                className={landingButtonVariants({ variant: 'outline', size: 'compact' })}
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
              <LandingButton
                variant='outline'
                size='compact'
                onClick={() => {
                  setCurQ(0);
                  setAnswers(new Array(questions.length).fill(null));
                  setView('quiz');
                }}
              >
                Start over
              </LandingButton>
            </div>

            <ToolCta
              appearance='advisory'
              resource='Sale Readiness Score'
              title='Ready to take the next step?'
              subtitle='Book a free, confidential 30-minute call with our team.'
              button='Book a call'
            />
          </div>
        )}
      </div>
  );
}
