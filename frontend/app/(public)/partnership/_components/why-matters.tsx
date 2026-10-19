import { LandingContainer } from '@/components/landing/presentation';
import { LandingImage } from '@/components/landing/landing-image';
import planningMeeting from '@/public/landing/partnership-planning-meeting.jpeg';

const bulletPoints = [
  'Selling their business',
  'Strategic acquisitions',
  'Succession planning',
  'Business valuation',
  'Strategic exit timing',
];

export function WhyMatters() {
  return (
    <section
      aria-labelledby='partnership-why-matters-title'
      className='bg-deep-navy text-white py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-why-matters-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Why it matters
        </h2>
        <div className='mt-8 grid items-stretch gap-7 min-[681px]:mt-10 min-[931px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[931px]:gap-12 min-[1121px]:gap-16'>
          <figure className='group/image relative m-0 aspect-[4/3] overflow-hidden min-[931px]:aspect-auto min-[931px]:min-h-[460px]'>
            <LandingImage
              src={planningMeeting}
              alt='Illustrative photograph of two professionals discussing business documents at an office table'
              unoptimized
              loading='lazy'
              fill
              sizes='(max-width: 930px) 100vw, (max-width: 1444px) 52vw, 670px'
              className='object-cover object-[60%_center]'
            />
          </figure>
          <div className='min-w-0 min-[931px]:self-center'>
            <p className='m-0 max-w-[540px] font-advisory-heading text-[23px] leading-[1.5] min-[681px]:text-[26px]'>
              Your clients will eventually ask about exiting or acquiring
            </p>
            <ul role='list' className='m-0 mt-6 list-none border-b border-white/25 p-0'>
              {bulletPoints.map((item) => (
                <li
                  key={item}
                  className='flex items-center gap-4 border-t border-white/25 py-4 text-base leading-[1.6] font-medium min-[681px]:text-[17px]'
                >
                  <span aria-hidden='true' className='size-1 shrink-0 bg-gilt' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
