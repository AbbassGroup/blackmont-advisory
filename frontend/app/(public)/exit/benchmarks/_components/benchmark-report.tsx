'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { BenchmarksPdf } from '../../_components/pdf/benchmarks-pdf';

import { INDUSTRY_BENCHMARKS as industries } from '@/lib/data/industry-benchmarks';

export function BenchmarkReport() {
  const [selected, setSelected] = useState<number | null>(null);
  const ind = selected !== null ? industries[selected] : null;
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected === null || !detailRef.current) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selected]);

  return (
    <section className='py-12 lg:py-16'>
      <div className='mx-auto max-w-275 px-5 lg:px-8'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
          {industries.map((item, i) => {
            const active = selected === i;
            return (
              <button
                key={item.name}
                onClick={() => setSelected(i)}
                className={` border p-4 text-left transition-all cursor-pointer ${
                  active
                    ? 'border-accent bg-accent text-primary shadow-[0_12px_30px_-14px_rgba(201, 168, 76, 0.7)]'
                    : 'border-secondary/15 bg-background hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                }`}
              >
                <div
                  className={`text-[13px] font-semibold ${
                    active ? 'text-primary/80' : 'text-secondary'
                  }`}
                >
                  {item.name}
                </div>
                <div
                  className={`mt-2 text-2xl font-extrabold tracking-tight ${
                    active ? 'text-primary' : 'text-accent'
                  }`}
                >
                  {item.multi}
                </div>
                <div
                  className={`mt-0.5 text-[10px] uppercase tracking-[0.07em] ${
                    active ? 'text-primary/55' : 'text-muted-foreground'
                  }`}
                >
                  EBITDA multiple
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode='wait'>
          {ind && (
            <motion.div
              key={ind.name}
              ref={detailRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className='mt-6 scroll-mt-24  border border-secondary/15 bg-background p-7 lg:p-8'
            >
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-2xl font-extrabold tracking-tight text-secondary'>
                  {ind.name}
                </h2>
                <span
                  className='rounded-full border px-3 py-1 text-xs font-semibold'
                  style={{
                    background: `${ind.demandCol}1a`,
                    color: ind.demandCol,
                    borderColor: `${ind.demandCol}40`,
                  }}
                >
                  Buyer demand: {ind.demand}
                </span>
              </div>

              <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                {[
                  { val: ind.multi, label: 'EBITDA multiple' },
                  { val: ind.price, label: 'Typical price range' },
                  { val: ind.days, label: 'Average time to sell' },
                ].map((m) => (
                  <div
                    key={m.label}
                    className=' bg-muted p-4 text-center'
                  >
                    <div className='text-xl font-extrabold tracking-tight text-secondary'>
                      {m.val}
                    </div>
                    <div className='mt-1 text-[11px] uppercase tracking-[0.07em] text-muted-foreground'>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className='mt-7 text-sm font-semibold text-secondary'>
                What buyers are looking at
              </h3>
              <div className='mt-3 flex flex-wrap gap-2'>
                {ind.drivers.map((d) => (
                  <span
                    key={d}
                    className='rounded-full border border-secondary/15 bg-muted px-3 py-1.5 text-xs font-medium text-secondary'
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className='mt-6 border-t border-secondary/15 pt-5'>
                <div className='text-xs font-bold uppercase tracking-[0.08em] text-accent'>
                  Blackmont market insight
                </div>
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  {ind.insight}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!ind && (
          <p className='mt-6  border border-dashed border-secondary/20 bg-background/50 p-8 text-center text-sm text-muted-foreground'>
            Select an industry above to see typical multiples, price ranges, and
            what buyers look for.
          </p>
        )}

        {ind && (
          <div className='mt-6 flex justify-center'>
            <PrintButton
              resource='Industry Benchmark Report'
              label='Print Report'
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
        )}

        <ToolCta
          resource='Industry Benchmark Report'
          title="What's your business worth?"
          subtitle='Get a free, confidential market appraisal from Blackmont Advisory.'
          button='Get an Appraisal'
        />
      </div>
    </section>
  );
}
