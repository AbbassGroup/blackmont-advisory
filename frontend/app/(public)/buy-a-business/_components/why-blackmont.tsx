import { ContactFormModal } from '@/components/global/contact-form-modal';
import { Shield, Lightbulb, Handshake, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const advantages = [
  {
    title: 'Independent advice',
    description: 'We work for you not the seller',
    icon: <Shield className='w-6 h-6' />,
  },
  {
    title: 'Experience across industries',
    description: 'Hotel, hospitality, services, manufacturing and more',
    icon: <Lightbulb className='w-6 h-6' />,
  },
  {
    title: 'End-to-end guidance',
    description: 'From search to settlement',
    icon: <Handshake className='w-6 h-6' />,
  },
  {
    title: 'Confidential and strategic',
    description: 'Protecting your privacy and your goals',
    icon: <ShieldCheck className='w-6 h-6' />,
  },
];

export function WhyBlackmont() {
  return (
    <section className='bg-muted py-20 lg:py-28'>
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            Why Blackmont Advisory
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto'>
          {advantages.map((adv, i) => (
            <div
              key={i}
              className='bg-background  p-8 border border-secondary/10 flex items-center gap-6 transition-colors hover:border-accent/40'
            >
              <div className='w-14 h-14 border-[1.5px] border-accent/30 text-accent flex items-center justify-center shrink-0'>
                {adv.icon}
              </div>
              <div>
                <h4 className='text-lg font-bold text-secondary mb-1'>
                  {adv.title}
                </h4>
                <p className='text-sm text-muted-foreground'>{adv.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <p className='text-xl font-bold text-secondary mb-8 max-w-2xl mx-auto leading-relaxed'>
            Blackmont is a boutique firm built on trust, expertise, and excellence.
          </p>
          <ContactFormModal>
            <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
              Book a Free Consultation
            </Button>
          </ContactFormModal>
        </div>
      </div>
    </section>
  );
}
