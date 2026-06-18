import Image from 'next/image';
import { ContactFormModal } from '@/components/global/contact-form-modal';
import { Button } from '@/components/ui/button';

export function TalkToAgent() {
  return (
    <section className='bg-background py-20 lg:py-28'>
      <div className='max-w-[800px] mx-auto px-6 text-center'>
        <div className='relative hidden md:block aspect-square max-w-[350px] mx-auto mb-10'>
          <Image
            src='/talk-agent.svg'
            alt='Talk to a Business Agent'
            fill
            className='object-contain'
          />
        </div>
        <h2 className='text-3xl font-bold text-secondary mb-8'>
          Talk to a Business Agent
        </h2>
        <ContactFormModal>
          <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
            Contact Us Today
          </Button>
        </ContactFormModal>
      </div>
    </section>
  );
}
