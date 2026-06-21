'use client';

import { CountUp } from './count-up';

const stats = [
  { to: 40, suffix: '+', label: 'Years of combined industry experience' },
  { to: 5000, suffix: '+', label: 'Qualified buyers in our database' },
  { to: 20000, suffix: '+', label: 'Monthly marketing reach' },
  { to: 10, suffix: '+', label: 'Industry sectors served' },
];

export function Stats() {
  return (
    <section className='bg-background pb-20 lg:pb-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <div className='grid grid-cols-2 gap-y-10 bg-accent/8 px-6 py-12 lg:grid-cols-4 lg:px-8'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 text-center lg:px-8 ${
                i !== 0 ? 'lg:border-l lg:border-accent/15' : ''
              }`}
            >
              <div className='text-4xl font-semibold tracking-tight text-secondary lg:text-5xl'>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className='mt-2 text-sm text-muted-foreground'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
