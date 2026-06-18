import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Reveal } from '@/components/landing/primitives';

export function CTASection() {
  return (
    <section className='bg-background py-20 lg:py-28'>
      <Container>
        <Reveal className='relative border-[1.5px] border-secondary bg-secondary px-6 py-16 text-center sm:px-10 lg:py-20'>
          <span
            aria-hidden
            className='absolute inset-x-10 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
          />
          <h2 className='mx-auto mb-4 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
            Ready to Get Started?
          </h2>
          <p className='mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-parchment/60'>
            Contact us today for a confidential consultation about buying or
            selling a business.
          </p>
          <Link
            href='/contact'
            className='group inline-flex items-center gap-2 bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'
          >
            Book a Free Consultation
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
