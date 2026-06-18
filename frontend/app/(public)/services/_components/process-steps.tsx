import {
  Handshake,
  BarChart3,
  TrendingUp,
  Megaphone,
  FileText,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { Container, Eyebrow, Reveal } from '@/components/landing/primitives';

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const PROCESS_STEPS: Step[] = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'Initial consultation and a deep dive into your business operations to better advise you.',
    icon: Handshake,
  },
  {
    number: '02',
    title: 'Appraisal',
    description:
      'Based on an initial consultation and finance assessment, we provide you with an appraisal for your business.',
    icon: BarChart3,
  },
  {
    number: '03',
    title: 'Strategy Development',
    description:
      'We develop a strategy around the potential sale of your business.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Strategic Marketing',
    description:
      'Strategic marketing on your business to best position it for sale to the right buyer.',
    icon: Megaphone,
  },
  {
    number: '05',
    title: 'Offer Reviews',
    description: 'We receive, vet and negotiate the best outcome for you.',
    icon: FileText,
  },
  {
    number: '06',
    title: 'Post Sale',
    description:
      'We help you with the sale and transition of business ownership.',
    icon: ClipboardList,
  },
];

export function ProcessSteps() {
  return (
    <section className='bg-secondary py-20 lg:py-28'>
      <Container>
        <Reveal className='mb-14 max-w-2xl'>
          <Eyebrow className='mb-5'>How We Work</Eyebrow>
          <h2 className='mb-6 text-3xl font-bold leading-tight tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
            Our Proven Process
          </h2>
          <p className='text-lg font-light leading-relaxed text-parchment/60'>
            Guiding you from consultation to post-sale.
          </p>
        </Reveal>

        <Reveal className='grid gap-px border border-parchment/10 bg-parchment/10 sm:grid-cols-2 lg:grid-cols-3'>
          {PROCESS_STEPS.map(({ number, title, description, icon: Icon }) => (
            <div
              key={number}
              className='bg-secondary p-8 transition-colors hover:bg-white/[0.03]'
            >
              <div className='mb-6 flex items-center justify-between'>
                <span className='flex h-11 w-11 items-center justify-center border-[1.5px] border-accent/30'>
                  <Icon className='h-5 w-5 text-accent' strokeWidth={1.5} />
                </span>
                <span className='text-2xl font-bold tracking-tight text-accent/30'>
                  {number}
                </span>
              </div>
              <h3 className='mb-2 text-lg font-bold text-parchment'>{title}</h3>
              <p className='text-sm leading-relaxed text-parchment/55'>
                {description}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
