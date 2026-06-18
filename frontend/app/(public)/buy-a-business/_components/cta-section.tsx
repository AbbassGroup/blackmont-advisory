import { ContactFormModal } from '@/components/global/contact-form-modal';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/landing/primitives';

export function CTASection() {
  return (
    <section className='bg-background py-20 lg:py-28'>
      <Container>
        <div className='relative border-[1.5px] border-secondary bg-secondary px-6 py-16 text-center sm:px-10 lg:py-20'>
          <span
            aria-hidden
            className='absolute inset-x-10 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
          />
          <h2 className='mx-auto mb-6 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
            Ready to Buy a Business?
          </h2>
          <p className='mb-3 text-lg font-light text-parchment/70'>
            Take the stress and risk out of your next purchase.
          </p>
          <p className='mx-auto mb-10 max-w-xl text-parchment/60 leading-relaxed'>
            Let Blackmont Advisory represent you and ensure you buy the right
            business at the right price.
          </p>
          <ContactFormModal>
            <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
              Schedule a Consultation
            </Button>
          </ContactFormModal>
        </div>
      </Container>
    </section>
  );
}
