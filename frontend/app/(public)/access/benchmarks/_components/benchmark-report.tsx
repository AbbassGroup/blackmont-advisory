'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolCta } from '../../_components/tool-cta';
import { PrintButton } from '../../_components/print-button';
import { BenchmarksPdf } from '../../_components/pdf/benchmarks-pdf';

interface Industry {
  name: string;
  multi: string;
  price: string;
  days: string;
  demand: string;
  demandCol: string;
  drivers: string[];
  insight: string;
}

const industries: Industry[] = [
  {
    name: 'Café / Restaurant',
    multi: '0.8× - 1.5×',
    price: '$150k–$500k',
    days: '90–150 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Location & foot traffic',
      'Rent as % of revenue',
      'Weekly trading turnover',
      'Chef / staff dependency',
      'Lease terms & length',
    ],
    insight:
      'Cafés sell quickly when located in high-foot-traffic areas. Buyers scrutinise rent as a percentage of revenue, ideally under 10%. Owner-operated venues with well-trained staff and no single chef dependency command a meaningful premium.',
  },
  {
    name: 'Trade Services',
    multi: '2× - 4.5×',
    price: '$200k–$1m',
    days: '60–90 days',
    demand: 'Very High',
    demandCol: '#166534',
    drivers: [
      'Licenced staff & subcontractors',
      'Recurring commercial clients',
      'Equipment & vehicle value',
      'Online reputation & reviews',
      'Geographic territory',
    ],
    insight:
      'Trade businesses (plumbing, electrical, HVAC, pest control) are among the most sought-after SMEs in Australia. Recurring commercial maintenance contracts and licenced employees dramatically increase both value and the speed of sale.',
  },
  {
    name: 'Retail (Non-food)',
    multi: '1× - 2×',
    price: '$80k–$400k',
    days: '60–120 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Lease length & location quality',
      'Stock value at completion',
      'Gross margin percentage',
      'E-commerce presence',
      'Branded vs. generic product range',
    ],
    insight:
      'Retail businesses face ongoing headwinds from online competition. Businesses with a strong e-commerce channel, niche positioning, or premium brand alignment command higher multiples. Lease length is the single most critical factor for buyers.',
  },
  {
    name: 'Professional Services',
    multi: '2×–4×',
    price: '$300k–$1.5m',
    days: '90–180 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Recurring & retainer revenue',
      'Client retention rate',
      'Staff qualifications & tenure',
      'Owner-dependency level',
      'CRM, systems & documented workflows',
    ],
    insight:
      'Accountancies, financial planning, law, IT services, and consulting firms sell well when revenue is recurring and not founder-dependent. Documented workflows, strong staff culture, and a healthy client pipeline are the primary value multipliers.',
  },
  {
    name: 'Allied Health',
    multi: '3×–5×',
    price: '$400k–$2m',
    days: '90–180 days',
    demand: 'Very High',
    demandCol: '#166534',
    drivers: [
      'Provider registration numbers',
      'Referral network quality',
      'Medicare / NDIS billing mi×',
      'Multi-practitioner structure',
      'Location & accessibility',
    ],
    insight:
      "Allied health is one of Australia's highest-demand acquisition sectors. Businesses with multiple registered practitioners, diversified referral networks, and NDIS registration attract strong multiples from corporate acquirers and PE-backed roll-ups.",
  },
  {
    name: 'Manufacturing',
    multi: '2× - 4×',
    price: '$500k–$5m',
    days: '120–240 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Long-term supply contracts',
      'Plant & equipment condition',
      'Proprietary products or IP',
      'Skilled and retained workforce',
      'Export market potential',
    ],
    insight:
      'Manufacturing businesses with proprietary products, long-term supply contracts, or export capability attract the strongest multiples. Equipment condition and workforce skill depth are scrutinised closely. These transactions typically take longer to complete due to due diligence complexity.',
  },
  {
    name: 'E-commerce',
    multi: '2.5× - 4×',
    price: '$200k–$1.5m',
    days: '60–120 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Revenue quality & consistency',
      'Gross margin trends',
      'Customer acquisition cost',
      'Platform diversification',
      'Repeat purchase & LTV rates',
    ],
    insight:
      'eCommerce businesses are valued on Proprietors Earnings Before Interest Tax Depreciation and Amortisation (PEBITDA). Buyers focus heavily on margin trends, repeat purchase rates, and whether the business is over-reliant on a single platform (e.g. Amazon or a single social channel). Diversified traffic and supply chains attract premiums.',
  },
  {
    name: 'Childcare / OSHC',
    multi: '3× - 5×',
    price: '$500k–$3m',
    days: '120–240 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Occupancy rate (80%+ ideal)',
      'Licences, approvals & ratings',
      'Qualified educator ratios',
      'Waitlist length',
      'Location & catchment demographics',
    ],
    insight:
      'Childcare and OSHC services command the highest multiples in the SME market due to significant regulatory barriers to entry. High occupancy (above 80%), and active waitlist are powerful drivers. Corporate operators are often active buyers in this space.',
  },
  {
    name: 'Transport / Logistics',
    multi: '2.5× - 3.5×',
    price: '$300k–$2m',
    days: '90–180 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Long-term client contracts',
      'Fleet condition & age',
      'Driver licences & compliance',
      'Geographic routes & territories',
      'Fuel costs & efficiency',
    ],
    insight:
      'Fleet condition and long-term client supply agreements (government, retail, FMCG) are the dominant value factors. Owner-drivers scaling to managed fleet businesses attract interest from aggregators. Heavy vehicle compliance history is scrutinised carefully.',
  },
  {
    name: 'Hair & Beauty',
    multi: ' 1.5× - 2.5×',
    price: '$50k–$300k',
    days: '60–120 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Client database quality',
      'Rent as % of revenue',
      'Stylist / therapist retention',
      'Social media following',
      'Equipment & fit-out condition',
    ],
    insight:
      "Hair and beauty businesses are highly personal, value is closely tied to client loyalty and staff relationships. Sellers who have built systems, a strong client database, and genuine independence from the owner's personal following attract meaningfully better offers from buyers.",
  },
];

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
