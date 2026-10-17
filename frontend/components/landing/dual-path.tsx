import { LandingTheme } from './landing-theme';
import { LandingContainer, LandingTextLink } from './presentation';

export function DualPath() {
  return (
    <LandingTheme className='bg-deep-navy text-white'>
      <section aria-label='How we can help'>
        <LandingContainer className='grid min-[681px]:grid-cols-2'>
          <div className='border-b border-white/[0.22] pt-8 pb-[34px] min-[681px]:border-b-0 min-[681px]:py-[51px] min-[681px]:pr-7 min-[931px]:pr-[clamp(25px,4.8vw,68px)]'>
            <h2 className='m-0 mb-[11px] font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-white min-[681px]:text-[26px]'>
              I’m selling a business
            </h2>
            <p className='m-0 mb-[13px] max-w-[450px] text-base leading-[1.65]'>
              Plan a confidential sale with a dedicated advisor handling the
              details.
            </p>
            <LandingTextLink href='#selling' tone='gilt'>
              How we help sellers
            </LandingTextLink>
          </div>
          <div className='pt-8 pb-[34px] min-[681px]:border-l min-[681px]:border-white/[0.24] min-[681px]:py-[51px] min-[681px]:pl-7 min-[931px]:pl-[clamp(25px,4.8vw,68px)]'>
            <div className='min-[681px]:ml-auto min-[681px]:max-w-[440px]'>
              <h2 className='m-0 mb-[11px] font-advisory-heading text-2xl leading-[1.3] font-bold tracking-normal text-white min-[681px]:text-[26px]'>
                I’m buying a business
              </h2>
              <p className='m-0 mb-[13px] max-w-[450px] text-base leading-[1.65]'>
                Find, assess and negotiate an acquisition with an advocate on your
                side.
              </p>
              <LandingTextLink href='#buying' tone='gilt'>
                How we help buyers
              </LandingTextLink>
            </div>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
