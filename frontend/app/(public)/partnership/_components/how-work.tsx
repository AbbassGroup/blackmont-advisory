import { ShieldCheck } from 'lucide-react';
import { LandingContainer } from '@/components/landing/presentation';

const partnershipOptions = [
  {
    title: 'Referral model',
    description:
      'You introduce the client. We manage the sale or acquisition process and keep you informed at every stage.',
  },
  {
    title: 'Co-branded approach',
    description:
      'We collaborate under both brands, reinforcing your involvement throughout the process.',
  },
  {
    title: 'White-label support',
    description:
      'We operate under your brand with our licence as an extension of your firms service offerings.',
  },
];

export function HowWork() {
  return (
    <section
      id='partnership-models'
      aria-labelledby='partnership-models-title'
      className='scroll-mt-28 bg-white py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-models-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          How we work with you
        </h2>
        <dl className='m-0 mt-8 grid gap-7 min-[681px]:mt-10 min-[931px]:grid-cols-3 min-[931px]:gap-10 min-[1121px]:gap-12'>
          {partnershipOptions.map(({ title, description }) => (
            <div key={title} className='min-w-0 border-t border-advisory-rule pt-5'>
              <dt className='font-advisory-heading text-[24px] leading-[1.4] font-bold text-midnight min-[681px]:text-[27px]'>
                {title}
              </dt>
              <dd className='m-0 mt-4 max-w-[70ch] text-base leading-[1.8] min-[681px]:text-[17px]'>
                {description}
              </dd>
            </div>
          ))}
        </dl>
        <div className='mt-8 flex items-start gap-3 border-t border-advisory-rule pt-5 min-[681px]:mt-9'>
          <ShieldCheck aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt' />
          <p className='m-0 text-[15px] leading-[1.8]'>
            All models are designed around transparency, compliance, and
            protecting your client relationship.
          </p>
        </div>
      </LandingContainer>
    </section>
  );
}
