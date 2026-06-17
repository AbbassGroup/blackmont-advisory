import { Container, Reveal, SectionHeader } from './primitives';

const PHASES = [
  {
    num: '01',
    title: 'Define your brief',
    body: "Sector, size, structure. We clarify exactly what you're looking for.",
  },
  {
    num: '02',
    title: 'Private sourcing',
    body: 'Discreet search across our network, including off-market opportunities unavailable elsewhere.',
  },
  {
    num: '03',
    title: 'Assessment and due diligence',
    body: 'Financials verified, claims tested before you commit time or capital.',
  },
  {
    num: '04',
    title: 'Negotiation',
    body: 'Price, terms and structure, negotiated firmly in your corner.',
  },
  {
    num: '05',
    title: 'Settlement',
    body: 'Coordinated through to completion alongside your legal and financial advisors.',
  },
];

const BUILT_FOR = [
  { strong: 'First-time buyers', rest: ' seeking expert guidance' },
  { strong: 'Entrepreneurs', rest: ' acquiring an established business' },
  { strong: 'Corporate executives', rest: ' transitioning to ownership' },
  { strong: 'Companies', rest: ' expanding through strategic acquisition' },
  { strong: 'Investors and family offices', rest: ' seeking direct ownership' },
];

const SECTORS = [
  'Business Services',
  'Manufacturing',
  'Healthcare',
  'Industrials',
  'Distribution',
  'Hospitality',
  'Trade Services',
  'Professional Services',
];

export function Buying() {
  return (
    <section id='buying' className='bg-linen py-20 lg:py-28'>
      <Container>
        <SectionHeader
          eyebrow='Buyer Advocacy'
          heading={<>We search, assess and negotiate for you.</>}
        />

        <div className='grid items-start gap-12 lg:grid-cols-2 lg:gap-20'>
          {/* Phases */}
          <Reveal className='flex flex-col border-t border-secondary/10'>
            {PHASES.map((phase) => (
              <div
                key={phase.num}
                className='grid grid-cols-[44px_1fr] gap-4 border-b border-secondary/10 py-6'
              >
                <span className='pt-0.5 text-base font-bold tracking-[0.1em] text-accent'>
                  {phase.num}
                </span>
                <div>
                  <h3 className='mb-1.5 text-[1.05rem] font-bold text-secondary'>
                    {phase.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    {phase.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Side panels */}
          <Reveal delay={120} className='flex flex-col gap-6'>
            <div className='relative border-[1.5px] border-secondary/10 bg-background px-8 py-9'>
              <span
                aria-hidden
                className='absolute inset-x-5 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
              />
              <h3 className='mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent'>
                Built for
              </h3>
              <ul className='flex flex-col gap-2.5'>
                {BUILT_FOR.map((item) => (
                  <li
                    key={item.strong}
                    className='relative pl-[18px] text-base leading-relaxed text-foreground before:absolute before:left-0 before:top-2.5 before:h-[5px] before:w-[5px] before:rounded-full before:bg-accent'
                  >
                    <strong className='font-semibold text-secondary'>
                      {item.strong}
                    </strong>
                    {item.rest}
                  </li>
                ))}
              </ul>
            </div>

            <div className='relative border-[1.5px] border-secondary/10 bg-background px-8 py-9'>
              <span
                aria-hidden
                className='absolute inset-x-5 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
              />
              <h3 className='mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent'>
                Sectors we source across
              </h3>
              <div className='flex flex-wrap gap-2'>
                {SECTORS.map((sector) => (
                  <span
                    key={sector}
                    className='border border-secondary/10 bg-muted px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary'
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
