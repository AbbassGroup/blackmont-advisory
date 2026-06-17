'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Container, Eyebrow, Reveal } from './primitives';

type Tab = 'sell' | 'buy';

const SELL_SECTORS = [
  'Business Services',
  'Manufacturing and Distribution',
  'Healthcare Services',
  'Industrials and Construction',
  'Hospitality and Leisure',
  'Trade and Technical Services',
  'Technology',
  'Retail',
  'Other',
];

const REVENUE_RANGES = [
  'Under $1M',
  '$1M to $3M',
  '$3M to $5M',
  '$5M to $10M',
  'Over $10M',
  'Prefer not to say',
];

const BUY_SECTORS = [
  'Business Services',
  'Manufacturing and Distribution',
  'Healthcare Services',
  'Industrials and Construction',
  'Hospitality and Leisure',
  'Trade and Technical Services',
  'Technology',
  'Open to opportunities',
];

const BUDGET_FROM = ['Under $500K', '$500K to $1M', '$1M to $3M', '$3M to $5M', '$5M+'];
const BUDGET_TO = ['$1M', '$3M', '$5M', '$10M', 'No upper limit'];
const BUYER_TYPES = [
  'First-time business buyer',
  'Entrepreneur seeking next venture',
  'Executive transitioning to ownership',
  'Company seeking strategic acquisition',
  'Investor or family office',
];

const fieldClass =
  'w-full border border-accent/20 bg-white/5 px-4 py-3 text-sm font-light text-parchment outline-none transition-colors placeholder:text-parchment/25 focus:border-accent';

const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.18em] text-accent';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Select({ options, label }: { options: string[]; label: string }) {
  return (
    <Field label={label}>
      <select className={`${fieldClass} cursor-pointer appearance-none`} defaultValue=''>
        <option value='' disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o} className='bg-secondary text-parchment'>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Contact() {
  const [tab, setTab] = useState<Tab>('sell');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder submit — wire to the enquiries endpoint when available.
    toast.success(
      'Thank you. Your enquiry is held in confidence — a senior advisor will be in touch shortly.',
    );
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id='contact' className='bg-background py-20 lg:py-28'>
      <Container className='grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20'>
        {/* Form */}
        <Reveal>
          <div className='relative border-[1.5px] border-secondary bg-secondary px-7 py-10 sm:px-11'>
            <span
              aria-hidden
              className='absolute inset-x-6 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
            />
            <h2 className='mb-1.5 text-[22px] font-bold tracking-tight text-parchment'>
              Begin confidentially
            </h2>
            <p className='mb-7 text-sm leading-relaxed text-parchment/50'>
              All enquiries held in strict confidence. A senior advisor will be
              in touch shortly.
            </p>

            <div className='mb-7 grid grid-cols-2 border border-accent/25'>
              {(['sell', 'buy'] as Tab[]).map((t, i) => (
                <button
                  key={t}
                  type='button'
                  onClick={() => setTab(t)}
                  className={[
                    'py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors',
                    i === 0 ? 'border-r border-accent/20' : '',
                    tab === t
                      ? 'bg-accent text-primary'
                      : 'text-parchment/40 hover:text-parchment/70',
                  ].join(' ')}
                >
                  {t === 'sell' ? 'I want to sell' : 'I want to acquire'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3.5'>
              <Field label='Name'>
                <input className={fieldClass} type='text' placeholder='Full name' required />
              </Field>
              <Field label='Email'>
                <input
                  className={fieldClass}
                  type='email'
                  placeholder='you@company.com'
                  required
                />
              </Field>

              {tab === 'sell' ? (
                <>
                  <Select label='Industry' options={SELL_SECTORS} />
                  <Select label='Annual revenue (approx.)' options={REVENUE_RANGES} />
                </>
              ) : (
                <>
                  <Select label='Target sector' options={BUY_SECTORS} />
                  <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    <Select label='Budget from' options={BUDGET_FROM} />
                    <Select label='Budget to' options={BUDGET_TO} />
                  </div>
                  <Select label='You are a' options={BUYER_TYPES} />
                </>
              )}

              <Field label='Anything else (optional)'>
                <textarea
                  className={`${fieldClass} min-h-[88px] resize-y`}
                  placeholder={
                    tab === 'sell'
                      ? 'Timing, goals or questions'
                      : 'Business type, location, timing'
                  }
                />
              </Field>

              <button
                type='submit'
                className='mt-2 w-full bg-accent py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-accent-light'
              >
                {tab === 'sell' ? 'Submit Confidentially' : 'Submit Acquisition Brief'}
              </button>
            </form>
          </div>
        </Reveal>

        {/* CTA copy */}
        <Reveal delay={120}>
          <Eyebrow className='mb-5'>Get in touch</Eyebrow>
          <h2 className='mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-[3.4rem]'>
            Every transaction begins with a{' '}
            <span className='font-light text-accent'>private conversation.</span>
          </h2>
          <p className='mb-11 text-lg font-light leading-loose text-muted-foreground'>
            Considering a sale, looking to acquire, or simply exploring your
            options. We are available for a confidential, no-obligation
            discussion.
          </p>
          <dl className='flex flex-col gap-6'>
            <div>
              <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Email
              </dt>
              <dd className='text-[1.15rem] font-semibold text-secondary'>
                <a
                  href='mailto:info@blackmontadvisory.com'
                  className='transition-colors hover:text-accent'
                >
                  info@blackmontadvisory.com
                </a>
              </dd>
            </div>
            <div>
              <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Based in
              </dt>
              <dd className='text-[1.15rem] font-semibold text-secondary'>
                Australia, with global reach
              </dd>
            </div>
            <div>
              <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Confidentiality
              </dt>
              <dd className='text-[1.15rem] font-semibold text-secondary'>
                NDA from the first conversation
              </dd>
            </div>
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
