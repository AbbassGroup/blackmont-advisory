import { LandingContainer } from '@/components/landing/presentation';

type BuyerValueDriversProps = {
  drivers: string[];
  details: string[];
};

export function BuyerValueDrivers({ drivers, details }: BuyerValueDriversProps) {
  return (
    <section
      aria-labelledby='buyer-value-drivers-title'
      className='bg-white py-14 text-ink min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='buyer-value-drivers-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          The five things buyers pay for
        </h2>

        <ul
          role='list'
          className='m-0 mt-8 list-none border-b border-advisory-rule p-0 min-[681px]:mt-10'
        >
          {drivers.map((driver, index) => (
            <li
              key={driver}
              className='grid items-start gap-3 border-t border-advisory-rule py-6 min-[931px]:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] min-[931px]:gap-12 min-[931px]:py-7 min-[1121px]:gap-16'
            >
              <h3 className='m-0 max-w-[390px] font-advisory-heading text-[22px] leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[25px]'>
                {driver}
              </h3>
              <p className='m-0 max-w-[75ch] text-base leading-[1.8] min-[681px]:text-[17px]'>
                {details[index]}
              </p>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
