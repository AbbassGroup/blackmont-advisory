import { ContactFormModal } from '@/components/global/contact-form-modal';
import { Shield, Lightbulb, Handshake, ShieldCheck } from 'lucide-react';
import Title from '@/components/global/title';
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

export function WhyAbbass() {
  return (
    <section className='bg-gray-50 py-20 lg:py-28'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        <div className='text-center mb-16'>
          <Title>Why Blackmont Advisory</Title>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto'>
          {advantages.map((adv, i) => (
            <div
              key={i}
              className='bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow'
            >
              <div className='w-14 h-14 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0'>
                {adv.icon}
              </div>
              <div>
                <h4 className='text-lg font-bold text-brand-black mb-1'>
                  {adv.title}
                </h4>
                <p className='text-sm text-gray-500'>{adv.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <p className='text-xl font-bold text-brand-black mb-8 max-w-2xl mx-auto leading-relaxed'>
            ABBASS is a boutique firm built on trust, expertise, and excellence.
          </p>
          <ContactFormModal>
            <Button className='bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-6 font-semibold shadow-lg shadow-brand-primary/20'>
              Book a Free Consultation
            </Button>
          </ContactFormModal>
        </div>
      </div>
    </section>
  );
}
