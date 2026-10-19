import {
  LandingButtonLink,
  LandingContainer,
} from '@/components/landing/presentation';

const actions = [
  {
    href: '/exit/valuation',
    title: 'Find out what your business is worth',
    detail: 'Free valuation tool. Five questions, indicative range.',
    button: 'Use the valuation tool',
  },
  {
    href: '/#contact',
    title: 'Talk to a broker confidentially',
    detail: 'A 30-minute strategy call. No obligation.',
    button: 'Start a private discussion',
  },
];

export function IndustryNextSteps() {
  return (
    <section aria-label='Your next step' className='bg-midnight text-white py-10 min-[681px]:py-12 min-[1121px]:py-16'>
      <LandingContainer className='grid gap-10 min-[931px]:grid-cols-2 min-[931px]:gap-12 min-[1121px]:gap-16'>
        {actions.map(({ href, title, detail, button }, index) => (
          <div key={href} className='flex min-w-0 flex-col items-start'>
            <h2 className='m-0 mb-3 max-w-[550px] font-advisory-heading text-[25px] leading-[1.4] font-bold tracking-normal min-[681px]:text-[29px]'>
              {title}
            </h2>
            <p className='m-0 mb-6 text-base leading-[1.75] text-white/80'>{detail}</p>
            <LandingButtonLink
              href={href}
              variant={index === 0 ? 'gilt' : 'outline'}
              className={index === 0
                ? 'mt-auto max-w-full'
                : 'mt-auto max-w-full border-white/70 text-white hover:border-white hover:bg-white hover:text-midnight focus-visible:bg-white focus-visible:text-midnight'}
            >
              {button}
            </LandingButtonLink>
          </div>
        ))}
      </LandingContainer>
    </section>
  );
}
