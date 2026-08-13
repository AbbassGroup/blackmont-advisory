import { Users, FileText, Eye, Lock } from 'lucide-react';
import { Container, Reveal, SectionHeader } from './primitives';

const STEPS = [
  {
    num: '01',
    title: 'Confidential Briefing',
    body: 'Mutual NDA from the outset. Nothing shared without your sign-off.',
  },
  {
    num: '02',
    title: 'Valuation Guidance',
    body: 'Honest assessment against real market appetite.',
  },
  {
    num: '03',
    title: 'IM Preparation',
    body: 'Investment-grade Information Memorandums and sales materials.',
  },
  {
    num: '04',
    title: 'Private Buyer Outreach',
    body: 'Direct contact with our pre-qualified network.',
  },
  {
    num: '05',
    title: 'Structuring and Close',
    body: 'We negotiate and structure through to settlement.',
  },
];

const CAPABILITIES = [
  {
    icon: Users,
    title: 'Private Buyer Network',
    body: 'Family offices, PE groups and HNW individuals. Pre-screened and NDA-executed before seeing anything about your business.',
  },
  {
    icon: FileText,
    title: 'Investment-Grade Documentation',
    body: 'Your IM prepared to institutional standard, covering financials, operations and deal structure options.',
  },
  {
    icon: Eye,
    title: 'Complete Visibility',
    body: 'Your own dedicated vendor portal with access to track your sale progress.',
  },
  {
    icon: Lock,
    title: 'End-to-End Confidentiality',
    body: 'Staged information release and identity protection at every step. Buyers learn only what you authorise.',
  },
];

export function Selling() {
  return (
    <section id='selling' className='bg-muted py-20 lg:py-28'>
      <Container>
        <SectionHeader
          eyebrow='For Business Owners'
          heading={<>Your exit, managed with precision.</>}
        />

        {/* Process steps */}
        <Reveal className='grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 sm:grid-cols-2 lg:grid-cols-5'>
          {STEPS.map((step) => (
            <div
              key={step.num}
              className='bg-background px-7 py-9 transition-colors hover:bg-accent-pale'
            >
              <div className='mb-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent'>
                {step.num}
              </div>
              <h3 className='mb-2 text-base font-bold leading-tight text-secondary'>
                {step.title}
              </h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                {step.body}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Capability grid */}
        <Reveal className='mt-14 grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 md:grid-cols-2'>
          {CAPABILITIES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className='flex items-start gap-5 bg-background px-8 py-9 transition-colors hover:bg-accent-pale'
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center border-[1.5px] border-accent/25'>
                <Icon className='h-4 w-4 text-accent' strokeWidth={1.5} />
              </span>
              <div>
                <h3 className='mb-2 text-[1.05rem] font-bold text-secondary'>
                  {title}
                </h3>
                <p className='leading-relaxed text-muted-foreground'>{body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
