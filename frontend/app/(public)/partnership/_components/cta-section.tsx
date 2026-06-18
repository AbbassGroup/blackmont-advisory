'use client';

import { Calendar, MapPin, Phone } from 'lucide-react';
import { PartnershipModal } from '@/components/global/partnership-modal';

export function CTASection() {
  const handlePhoneClick = () => {
    window.location.href = 'tel:0391031317';
  };

  return (
    <section className='py-20 lg:py-32 relative overflow-hidden text-white bg-brand-primary'>
      {/* Decorative Grid Background Overlay */}
      <div
        className='absolute inset-0 opacity-20 pointer-events-none'
        style={{
          backgroundImage: 'url("/bg-grid.png")',
          backgroundSize: '80%',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className='max-w-[1260px] mx-auto px-6 lg:px-8 relative z-10'>
        <div className='text-center max-w-[800px] mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight'>
            Let’s Strengthen the Support You Offer Your Clients
          </h2>
          <p className='text-lg md:text-xl text-white/90 leading-relaxed font-medium'>
            If you would like to explore how Blackmont Advisory can support your
            firm and your clients, we welcome a confidential discussion.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
          {/* Action 1 - Book Meeting */}
          <PartnershipModal>
            <div className='flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/15 hover:border-white/30 transition-colors h-full'>
              <div className='w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 shrink-0'>
                <Calendar className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Book a Meeting</h3>
              <p className='text-white/80 leading-relaxed'>
                Schedule a confidential discussion at a time that suits you.
              </p>
            </div>
          </PartnershipModal>

          {/* Action 2 - Office */}
          <div className='flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/15 hover:border-white/30 transition-colors h-full'>
            <div className='w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 shrink-0'>
              <MapPin className='w-7 h-7 text-white' />
            </div>
            <h3 className='text-xl font-bold mb-3'>
              Visit Our South Melbourne Office
            </h3>
            <p className='text-white/80 leading-relaxed'>
              Meet us in person to discuss how we can work together.
            </p>
          </div>

          {/* Action 3 - Phone */}
          <div
            onClick={handlePhoneClick}
            className='flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/15 hover:border-white/30 transition-colors h-full'
          >
            <div className='w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 shrink-0'>
              <Phone className='w-7 h-7 text-white' />
            </div>
            <h3 className='text-xl font-bold mb-3'>Contact Us Directly</h3>
            <p className='text-white/80 leading-relaxed'>
              Reach out via phone or email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
