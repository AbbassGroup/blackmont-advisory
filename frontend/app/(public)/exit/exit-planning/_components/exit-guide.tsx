'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { ExitPlanningPdf } from '../../_components/pdf/exit-planning-pdf';
import { landingButtonVariants } from '@/components/landing/presentation';
import { EXIT_PHASES as phases } from '@/lib/data/exit-phases';

const totalTasks = phases.reduce((n, p) => n + p.tasks.length, 0);
const progressKey = 'bm_exit_planning_progress';
const taskKeys = new Set(phases.flatMap((phase, pi) => phase.tasks.map((_, ti) => `${pi}-${ti}`)));

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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem(progressKey) ?? '{}');
      if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
        setDone(Object.fromEntries(
          Object.entries(stored).filter(([key, value]) => taskKeys.has(key) && value === true),
        ));
      }
    } catch {
      // The checklist remains usable when storage is unavailable or invalid.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(progressKey, JSON.stringify(done));
    } catch {
      // Keep the current session usable when the browser blocks storage.
    }
  }, [done, loaded]);

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
    <div className='min-w-0'>
      <section aria-labelledby='exit-guide-progress-title' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
        <div className='flex flex-wrap items-start justify-between gap-5'>
          <div className='min-w-0 flex-1 basis-[280px]'>
            <h2 id='exit-guide-progress-title' className='m-0 font-advisory-heading text-[25px] leading-[1.35] font-bold tracking-normal text-midnight'>
              {copy.h}
            </h2>
            <p className='m-0 mt-2 max-w-[520px] text-[15px] leading-[1.75] text-ink'>{copy.s}</p>
          </div>
          <PrintButton
            resource='Exit Planning Guide'
            label='Print exit guide'
            className={landingButtonVariants({ variant: 'outline', size: 'compact', className: 'shrink-0' })}
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
        <div className='mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-midnight' aria-live='polite' aria-atomic='true'>
          <span>{doneCount} of {totalTasks} tasks complete</span>
          <span className='font-semibold'>{pct}%</span>
        </div>
        <div
          role='progressbar'
          aria-label='Exit planning progress'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className='mt-3 h-1 overflow-hidden bg-advisory-rule'
        >
          <div className='h-full origin-left bg-gilt transition-transform duration-300 ease-out motion-reduce:transition-none' style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </section>

      <div className='mt-8 border border-advisory-rule bg-white px-5 min-[681px]:px-8'>
        {phases.map((phase, pi) => {
          const phaseDone = phase.tasks.filter((_, ti) => done[`${pi}-${ti}`]).length;
          const complete = phaseDone === phase.tasks.length;
          return (
            <section
              key={phase.title}
              aria-labelledby={`exit-phase-${pi}`}
              className='border-b border-advisory-rule py-6 last:border-b-0 min-[681px]:py-8'
            >
              <div className='flex flex-wrap items-start justify-between gap-x-5 gap-y-3'>
                <div className='min-w-0 flex-1 basis-[260px]'>
                  <h2 id={`exit-phase-${pi}`} className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[25px]'>
                    {phase.title}
                  </h2>
                  <p className='m-0 mt-2 text-sm leading-[1.5] text-ink'>{phase.label}</p>
                </div>
                <span className='flex shrink-0 items-center gap-2 text-sm leading-[1.5] text-midnight min-[681px]:pt-2'>
                  {complete && <Check aria-hidden className='size-4' />}
                  {phaseDone} / {phase.tasks.length} done
                </span>
              </div>

              <ul className='m-0 mt-5 list-none divide-y divide-advisory-rule/60 p-0'>
                {phase.tasks.map((task, ti) => {
                  const key = `${pi}-${ti}`;
                  const checked = !!done[key];
                  return (
                    <li key={key}>
                      <label className='flex cursor-pointer items-start gap-3 px-1 py-3 transition-colors duration-200 hover:bg-canvas motion-reduce:transition-none min-[681px]:gap-4'>
                        <input
                          type='checkbox'
                          checked={checked}
                          disabled={!loaded}
                          onChange={() => toggle(key)}
                          className='mt-1 size-[18px] shrink-0 cursor-pointer accent-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:cursor-wait'
                        />
                        <span className={`text-[15px] leading-[1.75] ${checked ? 'text-ink/75' : 'text-midnight'}`}>
                          {task}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className='mt-8'>
        <ToolCta
          resource='Exit Planning Guide'
          title='Not sure where to start?'
          subtitle='Our brokers will build a personalised exit roadmap for your business.'
          button='Book a strategy call'
        />
      </div>
    </div>
  );
}
