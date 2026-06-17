'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: 40, suffix: '+', label: 'Years of combined industry experience' },
  { number: 5000, suffix: '+', label: 'Qualified buyers in our database' },
  { number: 20000, suffix: '+', label: 'Monthly marketing reach' },
  { number: 10, suffix: '+', label: 'Industry sectors served' },
];

function CountUp({ end, duration = 2.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start: number;
          const animate = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <section
      className='py-14'
      style={{
        background: 'linear-gradient(135deg, #6ee7e7 0%, #b2f1ec 100%)',
      }}
    >
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/30'>
          {stats.map(({ number, suffix, label }, i) => (
            <div
              key={i}
              className='flex flex-col items-center text-center px-6 py-4'
            >
              <div className='text-[clamp(2.4rem,5vw,3.2rem)] font-bold text-white leading-none tabular-nums'>
                <CountUp end={number} />
                {suffix}
              </div>
              <p className='text-[#2c3e50]  font-semibold mt-3 leading-snug max-w-[200px]'>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
