import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingContainer } from '@/components/landing/presentation';

const clientTypes = [
  {
    title: 'First-time business buyers',
    description:
      'New entrepreneurs looking to enter the business world with confidence',
  },
  {
    title: 'Experienced operators expanding portfolios',
    description:
      'Seasoned business owners seeking to grow their investment portfolio',
  },
  {
    title: 'Corporate professionals seeking lifestyle businesses',
    description:
      'Professionals transitioning to business ownership for lifestyle change',
  },
  {
    title: 'Investors and migration buyers',
    description:
      'Investment-focused buyers and those seeking migration pathways',
  },
  {
    title: 'Private equity & high-net-worth clients',
    description:
      'Sophisticated investors looking for strategic business acquisitions',
  },
  {
    title: 'Expansion operators',
    description:
      'Business owners looking to rollup or expand their existing operations',
  },
];

export function WhoWeWorkWith() {
  return (
    <LandingTheme className='bg-midnight text-white'>
      <section
        aria-labelledby='buyer-clients-title'
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer>
          <h2
            id='buyer-clients-title'
            className='m-0 mb-6 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-white min-[681px]:text-[clamp(32px,3.4vw,43px)]'
          >
            Who we work with
          </h2>
          <p className='m-0 max-w-[760px] text-base leading-[1.8] text-white/90 min-[681px]:text-[17px] mb-8 min-[681px]:mb-10'>
            No matter your background, we tailor our approach to your goals,
            budget, and risk profile.
          </p>

          <ul
            role='list'
            className='m-0 grid list-none gap-x-8 gap-y-2 p-0 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3 min-[1121px]:gap-x-12'
          >
            {clientTypes.map((client) => (
              <li key={client.title} className='min-w-0 border-t border-white/25 pt-5 pb-4'>
                <h3 className='m-0 mb-3 font-advisory-heading text-xl leading-[1.45] font-bold tracking-normal text-white min-[681px]:min-h-[58px]'>
                  {client.title}
                </h3>
                <p className='m-0 max-w-[390px] text-[15px] leading-[1.75] text-white/90'>
                  {client.description}
                </p>
              </li>
            ))}
          </ul>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
