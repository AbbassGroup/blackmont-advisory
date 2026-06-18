import { ContactFormModal } from '@/components/global/contact-form-modal';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className='bg-brand-primary py-20 relative overflow-hidden text-center'>
      <div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none' />
      <div className='max-w-[700px] mx-auto px-6 relative z-10'>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
          Ready to Buy a Business?
        </h2>
        <p className='text-lg font-semibold text-white/90 mb-4'>
          Take the stress and risk out of your next purchase.
        </p>
        <p className='text-white/80 leading-relaxed mb-10'>
          Let Blackmont Advisory represent you and ensure you buy the right
          business at the right price.
        </p>
        <ContactFormModal>
          <Button className='bg-white hover:bg-gray-50 text-brand-primary px-8 py-6 font-semibold shadow-xl shadow-black/10 transition-all hover:-translate-y-1'>
            Schedule a Consultation
          </Button>
        </ContactFormModal>
      </div>
    </section>
  );
}
