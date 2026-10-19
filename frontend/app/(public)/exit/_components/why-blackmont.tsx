import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import advisoryReview from '@/public/landing/exit-advisory-review.jpeg';
import {
  LandingContainer,
  LandingSectionIntro,
} from '@/components/landing/presentation';

const reasons = [
  {
    title: 'Boutique advisory approach',
    description: 'Senior advisors on every engagement, never handed off.',
  },
  {
    title: 'High-quality marketing',
    description:
      'Polished campaigns that elevate how your business is perceived.',
  },
  {
    title: 'Strong buyer network',
    description: 'Direct access to qualified, capable acquirers.',
  },
  {
    title: 'Negotiation expertise',
    description: 'Decades of structuring deals that protect your value.',
  },
  {
    title: 'Finance + business combined',
    description: 'The rare blend of commercial and financial fluency.',
  },
  {
    title: 'Professional & confidential',
    description: 'Total discretion from first call to settlement.',
  },
];

export function WhyBlackmont() {
  return (
    <LandingTheme>
      <section
        id='why-blackmont'
        aria-labelledby='exit-why-title'
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer>
          <LandingSectionIntro
            headingId='exit-why-title'
            heading='Why business owners choose Blackmont Advisory'
          />
          <div className='grid min-[931px]:grid-cols-[0.95fr_1.05fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
            <figure className='group/image relative m-0 aspect-[1.25] min-w-0 overflow-hidden bg-canvas min-[681px]:aspect-[1.7] min-[931px]:aspect-auto min-[931px]:min-h-[520px]'>
              <LandingImage
                src={advisoryReview}
                alt='Illustrative photograph of experienced business professionals reviewing financial documents together'
                unoptimized
                fill
                loading='lazy'
                className='object-cover object-[55%_center]'
              />
            </figure>
            <ul role='list' className='m-0 flex list-none flex-col justify-between border-b border-advisory-rule p-0'>
              {reasons.map((reason) => (
                <li key={reason.title} className='min-w-0 border-t border-advisory-rule py-4'>
                  <h3 className='m-0 mb-1.5 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[22px]'>
                    {reason.title}
                  </h3>
                  <p className='m-0 max-w-[550px] text-[15px] leading-[1.65] text-ink'>
                    {reason.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
