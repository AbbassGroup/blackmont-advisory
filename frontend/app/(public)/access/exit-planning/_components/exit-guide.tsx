'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { ExitPlanningPdf } from '../../_components/pdf/exit-planning-pdf';

import { EXIT_PHASES as phases } from '@/lib/data/exit-phases';


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
        <div className='flex items-center gap-6 border-[1.5px] border-secondary bg-secondary px-6 py-6 lg:px-8'>
          <div className='relative flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-accent/40 bg-white/5'>
            <span className='text-xl font-extrabold leading-none text-accent'>
              {pct}%
            </span>
            <span className='text-[10px] text-parchment/40'>complete</span>
          </div>
          <div>
            <h2 className='text-lg font-bold text-parchment'>{copy.h}</h2>
            <p className='mt-1 text-sm text-parchment/55'>{copy.s}</p>
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
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold transition-colors ${
                      complete ? 'bg-green-600 text-white' : 'bg-accent text-primary'
                    }`}
                  >
                    {complete ? <Check className='h-5 w-5' /> : pi + 1}
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-[17px] font-semibold text-secondary'>
                      {phase.title}
                    </h3>
                    <p className='text-xs text-muted-foreground'>{phase.label}</p>
                  </div>
                  <span className='whitespace-nowrap text-xs font-semibold text-accent'>
                    {phaseDone} / {phase.tasks.length} done
                  </span>
                </div>

                <div className='ml-5 mt-3 space-y-2 border-l border-secondary/15 pl-7'>
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
                            : 'border-secondary/15 bg-background hover:border-accent'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            checked
                              ? 'border-green-600 bg-green-600 text-white'
                              : 'border-secondary/20'
                          }`}
                        >
                          {checked && <Check className='h-3 w-3' />}
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            checked ? 'text-muted-foreground' : 'text-secondary'
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
            fileName='Blackmont-Exit-Planning-Guide.pdf'
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
