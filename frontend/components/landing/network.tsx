import { LandingTheme } from './landing-theme';
import { LandingContainer, LandingTextLink } from './presentation';

export function Network() {
  return (
    <LandingTheme className='bg-white text-ink'>
      <section
        id='network'
        aria-labelledby='network-title'
        className='border-t border-advisory-rule'
      >
        <LandingContainer className='py-14 min-[681px]:py-16 min-[1121px]:py-20 gap-8 min-[681px]:gap-10 min-[1121px]:gap-16 grid items-start min-[681px]:grid-cols-2'>
          <h2
            data-landing-reveal
            id='network-title'
            className='m-0 max-w-[545px] font-advisory-heading text-[31px] leading-[1.32] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(30px,3vw,40px)]'
          >
            Local knowledge. A wider circle of buyers.
          </h2>
          <div className='min-w-0 max-w-[520px] text-ink'>
            <p className='m-0 mb-5 text-base leading-[1.7]'>
              Based in Melbourne, Blackmont works with private investors, family
              offices, high-net-worth individuals and private equity groups
              seeking Australian businesses.
            </p>
            <p className='m-0 mb-5 text-base leading-[1.7]'>
              We bring the right people into the conversation, without exposing
              your business to the wider market.
            </p>
            <LandingTextLink href='#contact'>
              Start a private discussion
            </LandingTextLink>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
