import { LandingContainer } from '@/components/landing/presentation';

const reasons = [
  {
    title: 'Protects the client relationship',
    description:
      'We never compete for your advisory role. Your client remains your client.',
  },
  {
    title: 'Enhances your service offering',
    description:
      'You become a more complete advisor without adding operational burden.',
  },
  {
    title: 'Saves time',
    description:
      'We manage buyer enquiries, negotiations, documentation coordination, and transaction flow.',
  },
  {
    title: 'Strengthens client loyalty',
    description:
      'Clients appreciate when their advisor connects them with the right specialist at the right time.',
  },
];

export function WhyBlackmont() {
  return (
    <section
      aria-labelledby='partnership-reasons-title'
      className='bg-midnight py-14 text-white min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='partnership-reasons-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          Why partner with Blackmont
        </h2>
        <ul role='list' className='m-0 mt-8 grid list-none gap-x-10 gap-y-7 p-0 min-[681px]:mt-10 min-[681px]:grid-cols-2 min-[1121px]:gap-x-16'>
          {reasons.map(({ title, description }) => (
            <li key={title} className='min-w-0 border-t border-white/25 pt-5'>
              <h3 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal min-[681px]:text-[26px]'>
                {title}
              </h3>
              <p className='mt-3 mb-0 max-w-[70ch] text-base leading-[1.8] text-white/85 min-[681px]:text-[17px]'>
                {description}
              </p>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
