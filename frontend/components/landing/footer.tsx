import { LandingBrand } from './brand';
import { LandingContainer, LandingTextLink } from './presentation';

const EXPLORE_LINKS = [
  { label: 'Selling a business', href: '#selling' },
  { label: 'Buying a business', href: '#buying' },
  { label: 'Recent acquisitions', href: '#acquisitions' },
  { label: 'About Blackmont', href: '#about' },
  { label: 'Exit Planning', href: '/exit' },
  { label: 'Resources', href: '/resources' },
];

export function LandingFooter() {
  return (
    <footer className='bg-midnight text-white'>
      <LandingContainer className='grid gap-x-6 gap-y-[38px] pt-[58px] pb-[51px] min-[426px]:grid-cols-2 min-[681px]:grid-cols-[1.3fr_0.78fr_0.9fr] min-[681px]:gap-[33px] min-[931px]:gap-[72px]'>
        <div className='min-w-0 min-[426px]:col-span-2 min-[681px]:col-span-1'>
          <LandingBrand className='mb-[19px]' />
          <p className='m-0 mb-3 max-w-[425px] text-[15px] leading-[1.75]'>
            Helping business owners sell and buyers acquire established businesses
            with careful, confidential advice.
          </p>
          <p className='m-0 mb-3 max-w-[425px] text-[15px] leading-[1.75]'>
            Melbourne, Australia
            <br />
            Business agent licence BLA 092153L
          </p>
        </div>
        <div className='min-w-0'>
          <h3 className='m-0 mb-4 text-[15px] leading-[1.5] font-bold'>Explore</h3>
          <nav aria-label='Footer navigation' className='flex flex-col items-start gap-[13px]'>
            {EXPLORE_LINKS.map((link) => (
              <LandingTextLink
                key={link.href}
                href={link.href}
                tone='white'
                className='font-normal'
              >
                {link.label}
              </LandingTextLink>
            ))}
          </nav>
        </div>
        <div className='min-w-0'>
          <h3 className='m-0 mb-4 text-[15px] leading-[1.5] font-bold'>Get in touch</h3>
          <p className='m-0 mb-[13px] text-[15px] leading-[1.7]'>
            <LandingTextLink
              href='mailto:info@blackmontadvisory.com'
              tone='white'
              className='break-all font-normal'
            >
              info@blackmontadvisory.com
            </LandingTextLink>
          </p>
          <p className='m-0 mb-[13px] text-[15px] leading-[1.7]'>
            Confidentiality comes first. Enquiries are handled privately.
          </p>
          <LandingTextLink href='#contact' tone='white' className='font-normal'>
            Begin a conversation
          </LandingTextLink>
        </div>
      </LandingContainer>
      <LandingContainer className='flex flex-col items-start gap-[13px] border-t border-white/[0.24] pt-[19px] pb-6 text-xs min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:gap-5'>
        <p className='m-0'>
          © {new Date().getFullYear()} Blackmont Advisory. All rights reserved.
        </p>
        <div className='flex flex-wrap gap-x-[22px] gap-y-2'>
          <LandingTextLink
            href='/terms-and-conditions'
            tone='white'
            className='text-xs font-normal'
          >
            Terms &amp; Conditions
          </LandingTextLink>
          <LandingTextLink href='/privacy' tone='white' className='text-xs font-normal'>
            Privacy Policy
          </LandingTextLink>
        </div>
      </LandingContainer>
    </footer>
  );
}
