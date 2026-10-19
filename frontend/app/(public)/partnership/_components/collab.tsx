import { LandingContainer } from '@/components/landing/presentation';

const steps = [
  'You identify a client considering sale or acquisition.',
  'We meet jointly (or independently if preferred).',
  'We assess readiness and provide a structured plan.',
  'We manage the transaction process.',
  'We keep you informed throughout the process, whilst maintaining client confidentiality.',
];

export function Collab() {
  return (
    <section
      aria-labelledby='partnership-collaboration-title'
      className='bg-canvas text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-collaboration-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          What a typical collaboration looks like
        </h2>
        <ol
          role='list'
          className='m-0 mt-8 grid list-none gap-x-8 gap-y-6 p-0 min-[681px]:mt-10 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-5'
        >
          {steps.map((step, index) => (
            <li
              key={step}
              className='grid min-w-0 grid-cols-[28px_minmax(0,1fr)] items-start gap-4 border-t border-advisory-rule pt-5 min-[1121px]:block'
            >
              <span aria-hidden='true' className='font-advisory-heading text-[27px] leading-[1.2] text-midnight'>
                {index + 1}
              </span>
              <p className='m-0 text-base leading-[1.8] min-[681px]:text-[17px] min-[1121px]:mt-4'>
                {step}
              </p>
            </li>
          ))}
        </ol>
      </LandingContainer>
    </section>
  );
}
