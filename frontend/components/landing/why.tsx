import { Container, Reveal, SectionHeader } from './primitives';

const CARDS = [
  {
    tag: 'Independence',
    title: 'One side of the table only',
    body: 'We never represent buyer and seller in the same deal. No conflicts, just your outcome.',
  },
  {
    tag: 'Confidentiality',
    title: 'No public listings. Ever.',
    body: 'Every process is private and directed at pre-qualified principals only.',
  },
  {
    tag: 'Senior-led',
    title: 'Principal attention, every mandate',
    body: 'The advisor you meet manages your deal through to close.',
  },
  {
    tag: 'Structuring',
    title: 'We engineer deals, not introductions',
    body: 'Most deals die on structure, not price. We navigate the complexity that closes transactions.',
  },
  {
    tag: 'Distressed capability',
    title: 'Experienced under pressure',
    body: 'Accelerated timelines, creditor dynamics, creative structuring, we operate where others don’t.',
  },
  {
    tag: 'Global reach',
    title: 'Australian base. Worldwide network.',
    body: 'Local knowledge backed by international capital connections across multiple markets.',
  },
];

export function Why() {
  return (
    <section id='why' className='bg-linen py-20 lg:py-28'>
      <Container>
        <SectionHeader eyebrow='Why Blackmont' heading='What sets us apart.' />

        <div className='grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3'>
          {CARDS.map((card, i) => (
            <Reveal
              key={card.tag}
              delay={(i % 3) * 100}
              className='border-t-2 border-accent py-9'
            >
              <span className='mb-3.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent'>
                {card.tag}
              </span>
              <h3 className='mb-3 text-xl font-bold leading-tight tracking-tight text-secondary'>
                {card.title}
              </h3>
              <p className='leading-relaxed text-muted-foreground'>
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
