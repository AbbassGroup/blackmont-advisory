import { ArrowRight } from 'lucide-react';
import { LandingImage } from '@/components/landing/landing-image';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer, LandingSectionIntro } from '@/components/landing/presentation';
import { ResourceLink } from './resource-link';

interface Resource {
  title: string;
  apiName: string;
  summary: string;
  image: string;
  href: string;
  cta: string;
}

const resources: Resource[] = [
  {
    title: 'Business valuation tool',
    apiName: 'Valuation Tool',
    summary:
      'Estimate the potential value of your business using industry-based insights.',
    image: '/valuation.webp',
    href: '/exit/valuation',
    cta: 'Access tool',
  },
  {
    title: 'Business sale checklist',
    apiName: 'Sale Readiness Score',
    summary:
      'Understand what buyers look for before taking your business to market.',
    image: '/sale.webp',
    href: '/exit/readiness',
    cta: 'Download checklist',
  },
  {
    title: 'Industry benchmark report',
    apiName: 'Industry Benchmark Report',
    summary:
      'Compare your business performance against broader industry standards.',
    image: '/benchmark.webp',
    href: '/exit/benchmarks',
    cta: 'View report',
  },
  {
    title: 'Exit planning guide',
    apiName: 'Exit Planning Guide',
    summary:
      'Learn how to prepare for a smoother and more profitable business exit.',
    image: '/exit-plan.webp',
    href: '/exit/exit-planning',
    cta: 'Get guide',
  },
];

const cardClass =
  'group flex h-full w-full min-w-0 flex-col text-left no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt';

function CardInner({ resource }: { resource: Resource }) {
  return (
    <>
      <div className='group/image relative aspect-[1.6] w-full shrink-0 overflow-hidden bg-canvas'>
        <LandingImage
          src={resource.image}
          alt={resource.title}
          fill
          quality={85}
          loading='lazy'
          sizes='(max-width: 680px) calc(100vw - 40px), (max-width: 1120px) calc(50vw - 48px), (max-width: 1444px) calc(25vw - 44px), 317px'
          className='object-cover'
        />
      </div>
      <div className='flex flex-1 flex-col pt-[20px]'>
        <h3 className='m-0 mb-3 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[22px]'>
          {resource.title}
        </h3>
        <p className='m-0 mb-[24px] flex-1 text-[15px] leading-[1.75] text-ink'>
          {resource.summary}
        </p>
        <div className='mt-auto flex min-h-14 items-center justify-between gap-3 border-t border-advisory-rule py-4 text-base font-bold text-midnight transition-colors duration-200 group-hover:text-gilt group-focus-visible:text-gilt motion-reduce:transition-none'>
          {resource.cta}
          <ArrowRight aria-hidden='true' className='size-5 shrink-0' />
        </div>
      </div>
    </>
  );
}

export function ResourceTools({
  id = 'resources',
  heading = 'Business exit resources',
  headingId = 'exit-resources-title',
}: {
  id?: string;
  heading?: string;
  headingId?: string;
}) {
  return (
    <LandingTheme>
      <section
        id={id}
        aria-labelledby={headingId}
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer>
          <LandingSectionIntro
            headingId={headingId}
            heading={heading}
          />
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-4'>
            {resources.map((resource) => (
              <ResourceLink
                key={resource.title}
                href={resource.href}
                resourceTitle={resource.apiName}
                className={cardClass}
              >
                <CardInner resource={resource} />
              </ResourceLink>
            ))}
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
