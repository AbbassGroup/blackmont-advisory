import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Eyebrow, Reveal } from './primitives';

const PATHS = [
  {
    num: '01',
    title: 'For Business Owners',
    body: 'A confidential, managed sale process that protects your legacy and maximises your outcome.',
    href: '#selling',
  },
  {
    num: '02',
    title: 'For Aspiring Acquirers',
    body: 'We work exclusively for you, sourcing, assessing and negotiating the right business on your behalf.',
    href: '#buying',
  },
];

export function Hero() {
  return (
    <section
      id='home'
      className='relative overflow-hidden border-b border-secondary/10 bg-background'
    >
      {/* Subtle background texture with cream overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-[center_30%] opacity-30"
      />
      <div
        aria-hidden
        className='absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/70 to-background/45'
      />

      <Container className='relative z-[2] grid items-center gap-12 pb-20 pt-32 lg:grid-cols-2 lg:gap-20 lg:pb-28 lg:pt-40'>
        {/* Left: headline */}
        <Reveal>
          <h1 className='mb-7 text-[2.75rem] font-bold leading-[1.08] tracking-tight text-secondary sm:text-6xl lg:text-7xl'>
            Your Boutique
            <br />
            M&amp;A <span className='font-light text-accent'>Advisory.</span>
          </h1>
          <p className='mb-10 max-w-md text-lg font-light leading-relaxed text-muted-foreground'>
            We represent business owners seeking a premium exit, and act as
            exclusive buyer advocates for those looking to acquire.
          </p>
          <div className='flex flex-wrap items-center gap-5'>
            <Link
              href='#selling'
              className='bg-secondary px-8 py-4 text-xs font-bold uppercase  text-background transition-colors hover:bg-accent hover:text-primary'
            >
              I want to sell
            </Link>
            <Link
              href='#buying'
              className='group inline-flex items-center gap-2 text-xs font-semibold uppercase  text-muted-foreground transition-colors hover:text-secondary'
            >
              I want to acquire
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        </Reveal>

        {/* Right: two-paths panel */}
        <Reveal delay={120}>
          <div className='relative border-[1.5px] border-secondary/10 bg-muted/90 px-8 py-12 sm:px-11 sm:py-13'>
            <span
              aria-hidden
              className='absolute inset-x-8 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
            />
            <p className='mb-8 text-xs font-bold uppercase text-accent'>
              Two ways we work
            </p>
            <div className='flex flex-col'>
              {PATHS.map((path, i) => (
                <div
                  key={path.num}
                  className={[
                    'flex items-start gap-5 border-secondary/10 py-6 first:pt-0 last:pb-0',
                    i < PATHS.length - 1 ? 'border-b' : '',
                  ].join(' ')}
                >
                  <span className='mt-0.5 shrink-0 text-[11px] font-bold tracking-[0.1em] text-accent'>
                    {path.num}
                  </span>
                  <div>
                    <h3 className='mb-2 text-xl font-bold leading-tight text-secondary'>
                      {path.title}
                    </h3>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                      {path.body}
                    </p>
                    <Link
                      href={path.href}
                      className='group mt-3 inline-flex items-center gap-1.5 text-sm font-bold tracking-[0.06em] text-accent'
                    >
                      Learn more
                      <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
