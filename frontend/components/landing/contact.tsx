import { ContactForm } from './contact-form';
import { landingImages } from './images';
import { LandingImage } from './landing-image';
import { LandingTheme } from './landing-theme';
import { LandingContainer, LandingTextLink } from './presentation';

export function Contact() {
  return (
    <LandingTheme>
      <section
        id='contact'
        aria-labelledby='contact-title'
        className='relative isolate overflow-hidden bg-midnight py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingImage
          src={landingImages.network.src}
          alt=''
          aria-hidden='true'
          fill
          unoptimized
          loading='lazy'
          sizes='100vw'
          className='pointer-events-none object-cover object-center'
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-midnight/[0.72]'
        />
        <LandingContainer className='relative z-10 grid items-start min-[681px]:grid-cols-[1fr_0.94fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
          <div className='min-w-0 self-start text-white'>
            <h2
              data-landing-reveal
              id='contact-title'
              className='m-0 mb-6 max-w-[540px] font-advisory-heading text-[36px] leading-[1.3] font-bold tracking-normal text-white min-[681px]:text-[clamp(34px,3.5vw,45px)]'
            >
              Every transaction starts with a conversation.
            </h2>
            <p className='m-0 mb-6 max-w-[520px] text-base leading-[1.75]'>
              Thinking about selling, buying, or simply considering your
              options? Speak directly with Blackmont about the next step.
            </p>

            <dl className='m-0 mt-[32px] space-y-[16px]'>
              <div>
                <dt className='text-sm font-bold'>Email</dt>
                <dd className='m-0 text-[15px]'>
                  <LandingTextLink
                    href='mailto:info@blackmontadvisory.com'
                    tone='white'
                    className='break-all font-normal'
                  >
                    info@blackmontadvisory.com
                  </LandingTextLink>
                </dd>
              </div>
              <div>
                <dt className='text-sm font-bold'>Location</dt>
                <dd className='m-0 text-[15px]'>Melbourne, Australia</dd>
              </div>
              <div>
                <dt className='text-sm font-bold'>Licence</dt>
                <dd className='m-0 text-[15px]'>BLA 092153L</dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
