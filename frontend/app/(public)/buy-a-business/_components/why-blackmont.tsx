import { ContactFormModal } from '@/components/global/contact-form-modal';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import { LandingButton, LandingContainer } from '@/components/landing/presentation';
import independentAdvice from '@/public/landing/buyer-independent-advice.jpeg';

const advantages = [
  {
    title: 'Independent advice',
    description: 'We work for you not the seller',
  },
  {
    title: 'Experience across industries',
    description: 'We have experience working across various industries',
  },
  {
    title: 'End-to-end guidance',
    description: 'From search to settlement',
  },
  {
    title: 'Confidential and strategic',
    description: 'Protecting your privacy and your goals',
  },
];

export function WhyBlackmont() {
  return (
    <LandingTheme className='bg-white'>
      <section aria-labelledby='buying-why-blackmont-title' className='py-14 min-[681px]:py-20'>
        <LandingContainer>
          <h2
            id='buying-why-blackmont-title'
            className='m-0 mb-8 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:mb-10 min-[681px]:text-[clamp(32px,3.4vw,43px)]'
          >
            Why Blackmont Advisory
          </h2>
          <div className='grid gap-8 min-[931px]:grid-cols-[0.95fr_1.05fr] min-[931px]:gap-[clamp(40px,5vw,72px)]'>
            <figure className='group/image relative m-0 aspect-[1.5] min-w-0 overflow-hidden min-[681px]:aspect-[1.8] min-[931px]:min-h-[440px] min-[931px]:aspect-auto'>
              <LandingImage
                src={independentAdvice}
                alt='Illustrative photograph of an advisor explaining financial documents to a client'
                unoptimized
                fill
                loading='lazy'
                sizes='(max-width: 680px) calc(100vw - 38px), (max-width: 930px) calc(100vw - 72px), (max-width: 1444px) 45vw, 600px'
                className='object-cover object-[55%_center]'
              />
            </figure>
            <div className='min-w-0'>
              <p className='m-0 mb-6 text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
                Blackmont Advisory is a boutique firm built on trust, expertise, and excellence.
              </p>
              <ul role='list' className='m-0 list-none border-b border-advisory-rule p-0'>
                {advantages.map((advantage) => (
                  <li key={advantage.title} className='min-w-0 border-t border-advisory-rule py-4'>
                    <h3 className='m-0 mb-2 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[22px]'>
                      {advantage.title}
                    </h3>
                    <p className='m-0 text-[15px] leading-[1.75] text-ink'>
                      {advantage.description}
                    </p>
                  </li>
                ))}
              </ul>
              <div className='mt-6'>
                <ContactFormModal>
                  <LandingButton variant='outline'>Book a free consultation</LandingButton>
                </ContactFormModal>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
