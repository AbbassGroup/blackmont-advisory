import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingContainer,
  LandingSectionIntro,
  LandingTextLink,
} from '@/components/landing/presentation';

const steps = [
  {
    title: 'Access resources instantly',
    description: 'Get immediate access to the full suite of tools.',
  },
  {
    title: 'Book a strategy call',
    description: 'Schedule a confidential conversation at your convenience.',
  },
  {
    title: 'Receive tailored advice',
    description: 'Hear directly from the Blackmont Advisory team.',
  },
];

export function Process() {
  return (
    <LandingTheme className='bg-canvas'>
      <section
        id='process'
        aria-labelledby='exit-process-title'
        className='py-10 min-[681px]:py-12'
      >
        <LandingContainer className='grid items-start gap-5 min-[931px]:grid-cols-[0.8fr_1.4fr] min-[931px]:gap-[clamp(40px,5vw,72px)]'>
          <div className='min-w-0 min-[931px]:pt-3'>
            <LandingSectionIntro
              headingId='exit-process-title'
              heading='How the process works'
              className='mb-2 min-[681px]:mb-2'
              headingClassName='max-w-[340px] text-[28px] min-[681px]:text-[34px]'
            />
            <LandingTextLink href='#resources' className='inline-flex min-h-11 items-center text-sm'>
              Explore the free resources
            </LandingTextLink>
          </div>
          <ol role='list' className='m-0 list-none border-b border-advisory-rule p-0'>
            {steps.map((step) => (
              <li
                key={step.title}
                className='grid min-w-0 gap-1.5 border-t border-advisory-rule py-4 min-[1121px]:grid-cols-[1fr_1.1fr] min-[1121px]:items-baseline min-[1121px]:gap-6'
              >
                <h3 className='m-0 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight'>
                  {step.title}
                </h3>
                <p className='m-0 max-w-[420px] text-[15px] leading-[1.65] text-ink'>
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
