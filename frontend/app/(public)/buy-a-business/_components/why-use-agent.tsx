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
import Title from '@/components/global/title';
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
    <section className='bg-brand-offwhite py-20 lg:py-28 relative overflow-hidden'>
      {/* Subtle decorative background element */}
      <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(86,193,188,0.03)_0%,transparent_50%)] pointer-events-none' />

      <div className='max-w-[1260px] mx-auto px-4 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24'>
          <div className='relative hidden md:block aspect-square max-w-[400px] mx-auto w-full'>
            <Image
              src='/businessbrokers/business-deal.svg'
              alt='Business Deal'
              fill
              className='object-contain'
            />
          </div>
          <div>
            <Title>Why Use a Business Buyer&apos;s Agent</Title>
            <div className='w-16 h-1 bg-brand-primary rounded-full mb-8' />
            <p className='text-lg text-gray-700 leading-relaxed mb-4 font-medium'>
              Most people think of brokers as only working for sellers, but
              business buyers need representation too.
            </p>
            <p className='text-lg text-gray-700 leading-relaxed mb-6 font-medium'>
              When you buy a business directly from a seller or broker,
              you&apos;re negotiating against professionals who represent the
              other side.
            </p>
            <p className='text-xl text-brand-primary-dark font-semibold'>
              At ABBASS, we represent you, the buyer.
            </p>
          </div>
        </div>

        <div className='text-center mb-12'>
          <h3 className='text-2xl lg:text-3xl font-bold text-brand-black mb-4'>
            We help you:
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {buyerServices.map((service, i) => (
            <div
              key={i}
              className='bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center'
            >
              <div className='w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6'>
                {service.icon}
              </div>
              <h4 className='text-lg font-bold text-brand-black mb-3'>
                {service.title}
              </h4>
              <p className='text-sm text-gray-500 leading-relaxed'>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <ContactFormModal>
            <Button className='bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-6 font-semibold shadow-lg shadow-brand-primary/20'>
              Book a 15-Minute Discovery Call
            </Button>
          </ContactFormModal>
        </div>
      </div>
    </section>
  );
}
