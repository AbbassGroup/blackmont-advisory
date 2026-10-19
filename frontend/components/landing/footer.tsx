import { LandingBrand } from './brand';
import { FooterAssociationLogos } from '@/components/global/footer-association-logos';
import { LandingContainer, LandingTextLink } from './presentation';

const EXPLORE_LINKS = [
  { label: 'Selling a Business', href: '#selling' },
  { label: 'Buying a Business', href: '#buying' },
  { label: 'Recent Acquisitions', href: '#acquisitions' },
  { label: 'About Blackmont', href: '#about' },
  { label: 'Exit Planning', href: '/exit' },
  { label: 'Resources', href: '/resources' },
];

export function LandingFooter({ homePath = '' }: { homePath?: '' | '/' }) {
  return (
    <footer className='bg-midnight text-white [&_a]:no-underline'>
      <LandingContainer className='grid py-10 min-[681px]:py-12 min-[1121px]:py-16 gap-x-6 gap-y-8 min-[426px]:grid-cols-2 min-[681px]:grid-cols-[1.3fr_0.78fr_0.9fr] min-[681px]:gap-10 min-[1121px]:gap-16'>
        <div className='min-w-0 min-[426px]:col-span-2 min-[681px]:col-span-1'>
          <LandingBrand
            placement='footer'
            href={`${homePath}#top`}
            className='mb-[20px]'
          />
          <p className='m-0 mb-3 max-w-[425px] text-[15px] leading-[1.75]'>
            Helping business owners sell and buyers acquire established
            businesses with careful, confidential advice.
          </p>
          <p className='m-0 mb-3 max-w-[425px] text-[15px] leading-[1.75]'>
            Melbourne, Australia
            <br />
            Business agent licence BLA 092153L
            <br />
            ABN 78 674 429 255
          </p>
        </div>
        <div className='min-w-0'>
          <h3 className='m-0 mb-4 text-[15px] leading-[1.5] font-bold'>
            Explore
          </h3>
          <nav
            aria-label='Footer navigation'
            className='flex flex-col items-start gap-[12px]'
          >
            {EXPLORE_LINKS.map((link) => (
              <LandingTextLink
                key={link.href}
                href={
                  link.href.startsWith('#')
                    ? `${homePath}${link.href}`
                    : link.href
                }
                tone='white'
                className='font-normal'
              >
                {link.label}
              </LandingTextLink>
            ))}
          </nav>
        </div>
        <div className='min-w-0'>
          <h3 className='m-0 mb-4 text-[15px] leading-[1.5] font-bold'>
            Get in touch
          </h3>
          <p className='m-0 mb-[12px] text-[15px] leading-[1.7]'>
            1/459 Toorak Road, Toorak, VIC 3149
          </p>
          <p className='m-0 mb-[12px] text-[15px] leading-[1.7]'>
            <LandingTextLink
              href='mailto:info@blackmontadvisory.com'
              tone='white'
              className='break-all font-normal'
            >
              info@blackmontadvisory.com
            </LandingTextLink>
          </p>

          <LandingTextLink
            href={`${homePath}#contact`}
            tone='white'
            className='font-normal'
          >
            Begin a conversation
          </LandingTextLink>
          <div className='mt-6'>
            <FooterAssociationLogos />
          </div>
        </div>
      </LandingContainer>
      <LandingContainer className='flex flex-col items-start gap-[12px] border-t border-white/[0.24] pt-[20px] pb-6 text-xs min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:gap-5'>
        <p className='m-0'>
          © {new Date().getFullYear()} Blackmont Advisory. All rights reserved.
        </p>
        <div className='flex flex-wrap gap-x-[24px] gap-y-2'>
          <LandingTextLink
            href='/terms-and-conditions'
            tone='white'
            className='text-xs font-normal'
          >
            Terms &amp; Conditions
          </LandingTextLink>
          <LandingTextLink
            href='/privacy'
            tone='white'
            className='text-xs font-normal'
          >
            Privacy Policy
          </LandingTextLink>
        </div>
      </LandingContainer>
    </footer>
  );
}
