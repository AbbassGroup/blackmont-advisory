import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ContactFormModal } from '@/components/global/contact-form-modal';

export function IntroSection() {
  return (
    <section className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-y-8 lg:gap-y-0 items-center'>
        <div className='order-2 md:order-1 col-span-3'>
          <h2 className='text-3xl lg:text-5xl font-bold text-secondary mb-6 leading-tight'>
            Looking to buy a business?
          </h2>
          <p className='text-lg text-muted-foreground leading-relaxed mb-8'>
            Don&apos;t go it alone. Blackmont Advisory helps individuals and
            investors find, analyse, and negotiate the right business, so you
            make a smart purchase with confidence and clarity.
          </p>
          <ContactFormModal>
            <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light transition-all'>
              Book Your Free Strategy Call
            </Button>
          </ContactFormModal>
        </div>
        <div className='order-1 md:order-2 col-span-2 max-w-60 md:max-w-80 mx-auto md:ml-auto'>
          <div className='relative aspect-square w-full'>
            <Image
              src='/looking-business.svg'
              alt='Looking to buy a business'
              width={600}
              height={600}
              className='object-contain w-full h-full'
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
