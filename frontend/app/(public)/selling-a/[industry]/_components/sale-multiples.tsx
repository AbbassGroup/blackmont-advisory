import { LandingContainer } from '@/components/landing/presentation';
import { EbitdaMultiples } from '@/components/seo/ebitda-multiples';

type IndustrySaleMultiplesProps = {
  covers: string;
  multiple: string;
  insight: string;
};

export function IndustrySaleMultiples({
  covers,
  multiple,
  insight,
}: IndustrySaleMultiplesProps) {
  return (
    <section
      aria-labelledby='industry-sale-multiples-title'
      className='bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'
    >
      <LandingContainer>
        <h2
          id='industry-sale-multiples-title'
          className='m-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]'
        >
          What {covers} businesses sell for
        </h2>
        <p className='mt-5 mb-0 max-w-[960px] text-base leading-[1.8] min-[681px]:text-[17px]'>
          The headline range is {multiple.trim()} EBITDA, but where you land
          inside it depends heavily on the size of the business. Larger
          businesses attract higher multiples, because buyers see less risk and
          more management depth.
        </p>

        <EbitdaMultiples />

        <p className='mt-7 mb-0 max-w-[960px] text-base leading-[1.8] min-[681px]:mt-8 min-[681px]:text-[17px]'>
          {insight}
        </p>
      </LandingContainer>
    </section>
  );
}
