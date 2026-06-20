import Image from 'next/image';
import { ContactFormModal } from '@/components/global/contact-form-modal';
import {
  Search,
  BarChart,
  Handshake,
  Shield,
  Users,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const buyerServices = [
  {
    title: 'Source on-market and off-market opportunities',
    description:
      'Access exclusive business opportunities not available to the general public',
    icon: <Search className='w-7 h-7' />,
  },
  {
    title: 'Conduct independent valuations and due diligence',
    description:
      'Professional assessment to ensure you make informed decisions',
    icon: <BarChart className='w-7 h-7' />,
  },
  {
    title: 'Negotiate the best price and terms',
    description: 'Expert negotiation to secure favorable purchase conditions',
    icon: <Handshake className='w-7 h-7' />,
  },
  {
    title: 'Avoid costly mistakes and emotional decisions',
    description:
      'Objective guidance to prevent expensive errors in the buying process',
    icon: <Shield className='w-7 h-7' />,
  },
  {
    title: 'Connect with finance, legal, and accounting specialists',
    description: 'Access to our network of trusted professional advisors',
    icon: <Users className='w-7 h-7' />,
  },
  {
    title: 'Navigate through to settlement & transition',
    description:
      'We help you effectively settle and transition into your new business',
    icon: <CheckCircle className='w-7 h-7' />,
  },
];

export function WhyUseAgent() {
  return (
    <section className='bg-muted py-20 lg:py-28 relative overflow-hidden'>
      {/* Subtle decorative background element */}
      <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(201,168,76,0.03)_0%,transparent_50%)] pointer-events-none' />

      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24'>
          <div className='relative hidden md:block aspect-square max-w-[400px] mx-auto w-full'>
            <Image
              src='/partnership.svg'
              alt='Business Deal'
              fill
              className='object-contain'
            />
          </div>
          <div>
            <h2 className='mb-8 text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
              Why Use a Business Buyer&apos;s Agent
            </h2>
            <p className='text-lg text-secondary leading-relaxed mb-4 font-medium'>
              Most people think of brokers as only working for sellers, but
              business buyers need representation too.
            </p>
            <p className='text-lg text-secondary leading-relaxed mb-6 font-medium'>
              When you buy a business directly from a seller or broker,
              you&apos;re negotiating against professionals who represent the
              other side.
            </p>
            <p className='text-xl text-accent font-semibold'>
              At Blackmont, we represent you, the buyer.
            </p>
          </div>
        </div>

        <div className='text-center mb-12'>
          <h3 className='text-2xl lg:text-3xl font-bold text-secondary mb-4'>
            We help you:
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {buyerServices.map((service, i) => (
            <div
              key={i}
              className='bg-background  p-8 border border-secondary/10 transition-colors hover:border-accent/40 flex flex-col items-center text-center'
            >
              <div className='w-16 h-16 border-[1.5px] border-accent/30 text-accent flex items-center justify-center mb-6'>
                {service.icon}
              </div>
              <h4 className='text-lg font-bold text-secondary mb-3'>
                {service.title}
              </h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <ContactFormModal>
            <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
              Book a 15-Minute Discovery Call
            </Button>
          </ContactFormModal>
        </div>
      </div>
    </section>
  );
}
