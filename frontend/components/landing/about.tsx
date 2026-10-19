import { LandingImage } from './landing-image';
import { landingImages } from './images';
import { LandingTheme } from './landing-theme';
import { LandingButtonLink } from './presentation';

export function About() {
  return (
    <LandingTheme id='why' className='bg-midnight text-white'>
      <section
        id='about'
        aria-labelledby='private-title'
        className='grid min-h-[515px] min-[681px]:grid-cols-2'
      >
        <figure className='group/image relative m-0 min-h-[330px] min-w-0 overflow-hidden min-[681px]:min-h-[515px]'>
          <LandingImage
            src={landingImages.about.src}
            alt={landingImages.about.alt}
            unoptimized
            fill
            loading='lazy'
            className='object-cover object-[35%_center]'
          />
        </figure>
        <div className='py-14 min-[681px]:py-16 min-[1121px]:py-20 min-w-0 self-center px-6 min-[681px]:px-8 min-[931px]:px-12 min-[1121px]:px-16'>
          <h2
            data-landing-reveal
            id='private-title'
            className='m-0 mb-7 max-w-[575px] font-advisory-heading text-[35px] leading-[1.26] font-bold tracking-normal text-white min-[681px]:text-[34px] min-[931px]:text-[clamp(34px,3.5vw,48px)]'
          >
            A private process.
            <br />
            Personal attention.
          </h2>
          <p className='m-0 mb-[24px] max-w-[570px] leading-[1.7]'>
            We only represent one side of a transaction. The advisor you meet at
            the first briefing remains responsible for your mandate through to
            completion.
          </p>
          <p className='m-0 mb-[24px] max-w-[570px] leading-[1.7]'>
            Our role is to help you make sound decisions, keep sensitive
            information protected and negotiate an outcome that works for you.
          </p>
          <LandingButtonLink
            href='#contact'
            variant='gilt'
            className='mt-[12px]'
          >
            Speak with Blackmont
          </LandingButtonLink>
        </div>
      </section>
    </LandingTheme>
  );
}
