import { DealsCarousel } from '@/components/global/deals-carousel';
import { Container, Reveal } from './primitives';

export function Transactions() {
  return (
    <section id='transactions' className='bg-secondary py-20 lg:py-28'>
      <Container>
        {/* SectionHeader's sizing, in parchment for the navy band. */}
        <Reveal className='mb-14'>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
            Recent Acquisitions
          </h2>
        </Reveal>
        <Reveal>
          <DealsCarousel tone='dark' href='/buy-a-business' />
        </Reveal>
      </Container>
    </section>
  );
}
