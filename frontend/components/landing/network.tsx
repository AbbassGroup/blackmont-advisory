import { Container, Reveal, SectionHeader } from './primitives';

const CARDS = [
  {
    roman: 'I',
    title: 'Family Offices',
    body: 'Long investment horizons, a preference for direct ownership and a reputation for quiet, discreet transactions.',
  },
  {
    roman: 'II',
    title: 'Private Equity',
    body: 'Mid-market PE firms with platform and add-on mandates. Structured, well-capitalised and experienced at moving efficiently.',
  },
  {
    roman: 'III',
    title: 'HNW Principals',
    body: 'High-net-worth individuals and syndicates who move fast, accept flexible structures and engage where others hesitate.',
  },
];

export function Network() {
  return (
    <section id='network' className='bg-muted py-20 lg:py-28'>
      <Container>
        <SectionHeader
          eyebrow='Our Network'
          heading={<>Private capital, actively seeking.</>}
        />

        <Reveal className='grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 lg:grid-cols-3'>
          {CARDS.map((card) => (
            <div
              key={card.roman}
              className='group relative overflow-hidden bg-muted px-8 py-11 transition-colors hover:bg-accent-pale'
            >
              <span
                aria-hidden
                className='absolute inset-x-0 top-0 h-0.5 bg-accent opacity-0 transition-opacity group-hover:opacity-100'
              />
              <span className='mb-5 block text-[44px] font-bold leading-none tracking-tight text-accent/20'>
                {card.roman}
              </span>
              <h3 className='mb-3 text-2xl font-bold tracking-tight text-secondary'>
                {card.title}
              </h3>
              <p className='leading-relaxed text-muted-foreground'>
                {card.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className='mt-6 grid items-center gap-8 border-[1.5px] border-secondary bg-secondary px-8 py-9 md:grid-cols-[260px_1fr] md:gap-12 md:px-10'>
          <div>
            <p className='mb-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-accent'>
              Our reach
            </p>
            <p className='text-2xl font-bold tracking-tight text-parchment'>
              Australia and beyond
            </p>
          </div>
          <p className='leading-loose text-parchment/65'>
            Based in Australia with a global network of buyers, investors and
            partners, connecting local businesses with domestic and
            international capital.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
