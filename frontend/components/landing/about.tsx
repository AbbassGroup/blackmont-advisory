import { Check, Quote } from 'lucide-react';
import { Container, Eyebrow, Reveal } from './primitives';

const CHECKS = [
  {
    title: 'Qualified Buyer Database',
    body: 'Large database of HNWI, Private Equity, sophisticated investors and other qualified buyers who are ready to make a move.',
  },
  {
    title: 'One side of the table, always',
    body: 'We never represent both parties in the same transaction. Our advice is independently structured for you.',
  },
  {
    title: 'Senior advisors, every deal',
    body: 'The advisor you meet at briefing manages your transaction through to close.',
  },
  {
    title: 'Australia-based, globally connected',
    body: 'Local market expertise backed by an international network of buyers and capital.',
  },
];

export function About() {
  return (
    <section id='about' className='bg-background py-20 lg:py-28'>
      <Container>
        {/* Heading + intro — full width */}
        <Reveal className='mb-14'>
          <Eyebrow className='mb-5'>About Blackmont</Eyebrow>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            Boutique. Senior-led. Built for getting results.
          </h2>
        </Reveal>

        {/* Checks (left) + quote (right) */}
        <div className='grid items-stretch gap-12 lg:grid-cols-2 lg:gap-20'>
          <Reveal className='flex flex-col border-t border-secondary/10'>
            {CHECKS.map((check) => (
              <div
                key={check.title}
                className='flex items-start gap-4 border-b border-secondary/10 py-3.5'
              >
                <span className='mt-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center border-[1.5px] border-accent'>
                  <Check className='h-3 w-3 text-accent' strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className='text-[1.1rem] font-bold text-secondary'>
                    {check.title}
                  </h3>
                  <p className='leading-relaxed text-muted-foreground'>
                    {check.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className='h-full'>
            <figure className='relative flex h-full flex-col justify-center border-[1.5px] border-secondary/10 bg-linen px-8 py-12 sm:px-11 sm:py-14'>
              <span
                aria-hidden
                className='absolute inset-x-7 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
              />
              <Quote
                aria-hidden
                strokeWidth={0}
                className='mb-5 h-16 w-16 fill-accent/20'
              />
              <blockquote className='text-2xl font-light italic leading-relaxed text-secondary'>
                The best M&amp;A outcomes don&rsquo;t happen by accident. They
                are the result of disciplined process, the right relationships,
                and an advisor fully aligned with you from day one.
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
