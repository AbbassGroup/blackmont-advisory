'use client';

import { useEffect, useRef, useState } from 'react';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { BenchmarksPdf } from '../../_components/pdf/benchmarks-pdf';
import { landingButtonVariants } from '@/components/landing/presentation';
import { INDUSTRY_BENCHMARKS as industries } from '@/lib/data/industry-benchmarks';

export function BenchmarkReport() {
  const [selected, setSelected] = useState<number | null>(null);
  const ind = selected !== null ? industries[selected] : null;
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected === null || !detailRef.current) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    detailRef.current.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [selected]);

  return (
    <div className='min-w-0'>
      <fieldset className='m-0 min-w-0 border-0 p-0'>
        <legend className='mb-4 text-sm font-semibold text-midnight'>
          Select your industry · EBITDA multiples
        </legend>
        <div className='grid grid-cols-2 gap-3 min-[681px]:grid-cols-3 min-[1121px]:grid-cols-5'>
          {industries.map((item, i) => {
            const active = selected === i;
            return (
              <button
                key={item.name}
                type='button'
                aria-pressed={active}
                aria-controls='industry-benchmark-detail'
                onClick={() => setSelected(i)}
                className={`flex cursor-pointer flex-col items-start justify-between gap-3 border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none min-[681px]:p-5 ${
                  active
                    ? 'border-midnight bg-midnight text-white'
                    : 'border-advisory-rule bg-white text-midnight hover:border-midnight hover:bg-canvas'
                }`}
              >
                <span className='text-sm leading-[1.5] font-semibold'>
                  {item.name}
                </span>
                <span className='font-advisory-heading text-[22px] leading-[1.3] min-[681px]:text-[24px]'>
                  {item.multi}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div
        id='industry-benchmark-detail'
        ref={detailRef}
        className='mt-6 scroll-mt-28 border border-advisory-rule bg-white p-6 min-[681px]:p-8'
      >
        {ind ? (
          <>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <h2 className='m-0 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[32px]'>
                {ind.name}
              </h2>
              <p className='m-0 flex items-center gap-2 text-sm text-midnight'>
                <span aria-hidden className='size-2 shrink-0 rounded-full' style={{ backgroundColor: ind.demandCol }} />
                Buyer demand: <strong className='font-semibold'>{ind.demand}</strong>
              </p>
            </div>

            <dl className='my-6 grid divide-y divide-advisory-rule border-y border-advisory-rule min-[681px]:my-8 min-[681px]:grid-cols-3 min-[681px]:divide-x min-[681px]:divide-y-0'>
              {[
                { val: ind.multi, label: 'EBITDA multiple' },
                { val: ind.price, label: 'Typical price range' },
                { val: ind.days, label: 'Average time to sell' },
              ].map((metric) => (
                <div key={metric.label} className='min-w-0 py-5 min-[681px]:px-5 min-[681px]:first:pl-0 min-[681px]:last:pr-0'>
                  <dt className='text-sm leading-[1.5] text-ink'>{metric.label}</dt>
                  <dd className='m-0 mt-2 font-advisory-heading text-[clamp(22px,2.2vw,30px)] leading-[1.35] font-bold text-midnight'>
                    {metric.val}
                  </dd>
                </div>
              ))}
            </dl>

            <div className='grid items-start gap-7 min-[931px]:grid-cols-[0.9fr_1.1fr] min-[931px]:gap-10'>
              <div>
                <h3 className='m-0 mb-4 font-advisory-heading text-[22px] leading-[1.4] font-bold tracking-normal text-midnight'>
                  What buyers are looking at
                </h3>
                <ul className='m-0 list-disc space-y-2 pl-5 text-[15px] leading-[1.75] text-ink marker:text-gilt'>
                  {ind.drivers.map((driver) => <li key={driver}>{driver}</li>)}
                </ul>
              </div>

              <aside className='bg-canvas p-5 min-[681px]:p-6'>
                <h3 className='m-0 mb-3 font-advisory-heading text-[22px] leading-[1.4] font-bold tracking-normal text-midnight'>
                  Blackmont market insight
                </h3>
                <p className='m-0 text-[15px] leading-[1.8] text-ink'>{ind.insight}</p>
              </aside>
            </div>

            <div className='mt-7 border-t border-advisory-rule pt-5'>
              <PrintButton
                resource='Industry Benchmark Report'
                label='Print report'
                className={landingButtonVariants({ variant: 'outline', size: 'compact' })}
                fileName={`Blackmont-${ind.name.replace(/[^a-z0-9]+/gi, '-')}-Benchmark.pdf`}
                buildDocument={(assets) => (
                  <BenchmarksPdf
                    assets={assets}
                    industryName={ind.name}
                    demand={ind.demand}
                    multi={ind.multi}
                    price={ind.price}
                    days={ind.days}
                    drivers={ind.drivers}
                    insight={ind.insight}
                  />
                )}
              />
            </div>
          </>
        ) : (
          <p className='m-0 text-[15px] leading-[1.75] text-ink'>
            Select an industry above to see typical multiples, price ranges, and what buyers look for.
          </p>
        )}
      </div>

      <div className='mt-6'>
        <ToolCta
          resource='Industry Benchmark Report'
          title="What's your business worth?"
          subtitle='Get a free, confidential market appraisal from Blackmont Advisory.'
          button='Get an appraisal'
        />
      </div>
    </div>
  );
}
