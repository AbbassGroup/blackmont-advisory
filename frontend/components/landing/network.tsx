import { LandingImage } from './landing-image';
import { landingImages } from './images';
import { LandingTheme } from './landing-theme';
import { LandingContainer, LandingTextLink } from './presentation';

export function Network() {
  return (
    <LandingTheme className='bg-midnight text-white'>
      <section
        id='network'
        aria-labelledby='network-title'
        className='group/image relative isolate overflow-hidden border-t border-white/20'
      >
        <LandingImage
          src={landingImages.network.src}
          alt=''
          aria-hidden='true'
          fill
          quality={85}
          loading='lazy'
          sizes='100vw'
          className='pointer-events-none object-cover object-center'
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-midnight/[0.72]'
        />
        <LandingContainer className='relative z-10 grid items-start gap-[23px] pt-[72px] pb-[78px] min-[681px]:grid-cols-2 min-[681px]:gap-[74px] min-[681px]:pt-[96px] min-[681px]:pb-[100px]'>
          <h2
            data-landing-reveal
            id='network-title'
            className='m-0 max-w-[545px] font-advisory-heading text-[31px] leading-[1.32] font-bold tracking-normal text-white min-[681px]:text-[clamp(30px,3vw,40px)]'
          >
            Local knowledge. A wider circle of buyers.
          </h2>
          <div className='min-w-0 max-w-[520px] text-white/90'>
            <p className='m-0 mb-5 text-base leading-[1.7]'>
              Based in Melbourne, Blackmont works with private investors, family
              offices, high-net-worth individuals and private equity groups
              seeking Australian businesses.
            </p>
            <p className='m-0 mb-5 text-base leading-[1.7]'>
              We bring the right people into the conversation, without exposing
              your business to the wider market.
            </p>
            <LandingTextLink href='#contact' tone='white'>
              Start a private discussion
            </LandingTextLink>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
