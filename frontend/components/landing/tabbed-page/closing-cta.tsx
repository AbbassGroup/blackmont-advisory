import { Phone } from 'lucide-react';
import {
  LandingButtonLink,
  LandingContainer,
} from '@/components/landing/presentation';

/**
 * Closing call to action. A contained navy panel on a white band, so it reads
 * as its own block instead of running into the (also navy) footer below.
 */
export function ClosingCta({
  heading,
  text,
  enquireHref = '#enquire',
}: {
  heading: string;
  text: string;
  enquireHref?: string;
}) {
  return (
    <section aria-labelledby='closing-cta-title' className='bg-white py-12 min-[681px]:py-14 min-[1121px]:py-16'>
      <LandingContainer>
        <div className='relative overflow-hidden border-t-[3px] border-gilt bg-midnight px-6 py-10 text-white min-[681px]:px-10 min-[681px]:py-12 min-[1121px]:px-14'>
          {/* Soft gilt glow in the corner for depth. */}
          <span
            aria-hidden='true'
            className='pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gilt/15 blur-3xl'
          />
          <div className='relative flex flex-col items-start gap-6 min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-between'>
            <div className='max-w-[640px]'>
              <h2
                id='closing-cta-title'
                className='m-0 mb-3 font-advisory-heading text-[clamp(26px,6vw,32px)] leading-[1.25] font-bold tracking-normal text-white min-[681px]:text-[clamp(28px,3vw,36px)]'
              >
                {heading}
              </h2>
              <p className='m-0 text-base leading-[1.7] text-white/80'>
                {text}
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <LandingButtonLink href={enquireHref} variant='gilt'>
                Send a confidential enquiry
              </LandingButtonLink>
              <LandingButtonLink
                href='tel:1300369474'
                variant='outline'
                className='border-white text-white hover:bg-white hover:text-midnight'
              >
                <Phone size={16} aria-hidden='true' />
                1300 369 474
              </LandingButtonLink>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
