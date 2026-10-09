import { DealsCarousel } from '@/components/global/deals-carousel';

export function RecentAcquisitions() {
  return (
    <section className='bg-linen py-20 lg:py-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            Recent Acquisitions
          </h2>
        </div>

        {/* Already on the buy page, so the cards don't link anywhere. */}
        <DealsCarousel tone='light' />
      </div>
    </section>
  );
}
