import { ContactFormModal } from '@/components/global/contact-form-modal';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import { LandingButton, LandingContainer } from '@/components/landing/presentation';
import warehouseReview from '@/public/landing/buying-warehouse-review.jpeg';

const buyerServices = [
  {
    title: 'Source on-market and off-market opportunities',
    description:
      'Access exclusive business opportunities not available to the general public',
  },
  {
    title: 'Conduct independent valuations and due diligence',
    description:
      'Professional assessment to ensure you make informed decisions',
  },
  {
    title: 'Negotiate the best price and terms',
    description: 'Expert negotiation to secure favorable purchase conditions',
  },
  {
    title: 'Avoid costly mistakes and emotional decisions',
    description:
      'Objective guidance to prevent expensive errors in the buying process',
  },
  {
    title: 'Connect with finance, legal, and accounting specialists',
    description: 'Access to our network of trusted professional advisors',
  },
  {
    title: 'Navigate through to settlement & transition',
    description:
      'We help you effectively settle and transition into your new business',
  },
];

export function WhyUseAgent() {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby='buyer-representation-title' className='py-14 min-[681px]:py-16 min-[1121px]:py-20'>
        <LandingContainer>
          <h2
            id='buyer-representation-title'
            className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)] mb-8 min-[681px]:mb-10'
          >
            Why use a business buyer&apos;s agent
          </h2>

          <div className='grid items-center min-[931px]:grid-cols-[0.95fr_1.05fr] gap-8 min-[681px]:gap-10 min-[1121px]:gap-16'>
            <div className='order-1 min-w-0 min-[931px]:order-2'>
              <div className='space-y-4 text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
                <p className='m-0'>
                  Most people think of brokers as only working for sellers, but
                  business buyers need representation too.
                </p>
                <p className='m-0'>
                  When you buy a business directly from a seller or broker,
                  you&apos;re negotiating against professionals who represent the
                  other side.
                </p>
              </div>
              <p className='m-0 mt-6 max-w-[530px] font-advisory-heading text-[23px] leading-[1.5] font-bold text-midnight min-[681px]:text-[25px]'>
                At Blackmont, we represent you, the buyer.
              </p>
              <div className='mt-6'>
                <ContactFormModal>
                  <LandingButton>Book a 15-minute discovery call</LandingButton>
                </ContactFormModal>
              </div>
            </div>

            <figure className='group/image relative order-2 m-0 aspect-[1.5] min-w-0 overflow-hidden min-[681px]:aspect-[1.8] min-[931px]:order-1 min-[931px]:aspect-[1.5]'>
              <LandingImage
                src={warehouseReview}
                alt='Illustrative photograph of two warehouse colleagues reviewing operations on a tablet'
                unoptimized
                fill
                loading='lazy'
                sizes='(max-width: 680px) calc(100vw - 40px), (max-width: 930px) calc(100vw - 72px), (max-width: 1444px) 45vw, 600px'
                className='object-cover object-[58%_66%]'
              />
            </figure>
          </div>

          <div className='mt-9 min-[681px]:mt-12'>
            <h3 className='m-0 mb-5 font-advisory-heading text-[25px] leading-[1.35] font-bold tracking-normal text-midnight'>
              We help you
            </h3>
            <ul role='list' className='m-0 grid list-none gap-x-8 gap-y-2 p-0 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3 min-[1121px]:gap-x-10'>
              {buyerServices.map((service) => (
                <li key={service.title} className='min-w-0 border-t border-advisory-rule py-4'>
                  <h4 className='m-0 mb-3 font-advisory-heading text-xl leading-[1.45] font-bold tracking-normal text-midnight'>
                    {service.title}
                  </h4>
                  <p className='m-0 text-[15px] leading-[1.75] text-ink'>
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
