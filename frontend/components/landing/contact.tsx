import { ContactForm } from './contact-form';
import { LandingTheme } from './landing-theme';
import { LandingContainer, LandingTextLink } from './presentation';

export function Contact() {
  return (
    <LandingTheme>
      <section
        id='contact'
        aria-labelledby='contact-title'
        className='pt-[77px] pb-[82px] min-[681px]:pt-[104px] min-[681px]:pb-[114px]'
      >
        <LandingContainer className='grid items-start gap-[33px] min-[681px]:grid-cols-[1fr_0.94fr] min-[681px]:gap-[45px] min-[931px]:gap-[clamp(70px,8vw,125px)]'>
          <div className='min-w-0'>
            <h2
              data-landing-reveal
              id='contact-title'
              className='m-0 mb-[30px] max-w-[540px] font-advisory-heading text-[36px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(34px,3.5vw,45px)]'
            >
              Every transaction starts with a conversation.
            </h2>
            <p className='m-0 mb-[1.1em] max-w-[520px] text-base leading-[1.75]'>
              Thinking about selling, buying, or simply considering your options?
              Speak directly with Blackmont about the next step.
            </p>
            <p className='m-0 mb-[1.1em] max-w-[520px] text-base leading-[1.75]'>
              Your enquiry is treated confidentially. We can arrange an NDA before
              discussing sensitive information.
            </p>
            <dl className='m-0 mt-[30px] space-y-[17px]'>
              <div>
                <dt className='text-sm font-bold'>Email</dt>
                <dd className='m-0 text-[15px]'>
                  <LandingTextLink
                    href='mailto:info@blackmontadvisory.com'
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
