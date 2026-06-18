import { Button } from '@/components/ui/button';
import { ContactFormModal } from '@/components/global/contact-form-modal';

export function IntroSection() {
  return (
    <section className='max-w-315 mx-auto px-4 lg:px-8 py-20 lg:py-28'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-y-8 lg:gap-y-0 items-center'>
        <div className='order-2 md:order-1 col-span-3'>
          <h2 className='text-3xl lg:text-5xl font-bold text-brand-black mb-6 leading-tight'>
            Looking to buy a business?
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed mb-8'>
            Don&apos;t go it alone. Blackmont Advisory helps individuals and
            investors find, analyse, and negotiate the right business, so you
            make a smart purchase with confidence and clarity.
          </p>
          <ContactFormModal>
            <Button className='bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-6 font-semibold shadow-lg shadow-brand-primary/20 transition-all'>
              Book Your Free Strategy Call
            </Button>
          </ContactFormModal>
        </div>
        <div className='order-1 md:order-2 col-span-2 max-w-60 md:max-w-80 mx-auto md:ml-auto'>
          <video
            src='/businessbrokers/buy.mp4'
            autoPlay
            loop
            muted
            playsInline
            controls
            className='w-full h-auto rounded-lg'
          />
        </div>
      </div>
    </section>
  );
}
