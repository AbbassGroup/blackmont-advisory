import Image from 'next/image';
import { ContactFormModal } from '@/components/global/contact-form-modal';
import { Button } from '@/components/ui/button';

export function TalkToAgent() {
  return (
    <section className='bg-white py-20 lg:py-28'>
      <div className='max-w-[800px] mx-auto px-6 text-center'>
        <div className='relative hidden md:block aspect-square max-w-[350px] mx-auto mb-10'>
          <Image
            src='/businessbrokers/talk-agent.svg'
            alt='Talk to a Business Agent'
            fill
            className='object-contain'
          />
        </div>
        <h2 className='text-3xl font-bold text-brand-black mb-8'>
          Talk to a Business Agent
        </h2>
        <ContactFormModal>
          <Button className='bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-6 font-semibold shadow-lg shadow-brand-primary/20'>
            Contact Us Today
          </Button>
        </ContactFormModal>
      </div>
    </section>
  );
}
