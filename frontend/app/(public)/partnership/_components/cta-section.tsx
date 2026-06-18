'use client';

import { Calendar, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { PartnershipModal } from '@/components/global/partnership-modal';

function ActionCard({
  icon: Icon,
  title,
  body,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className='flex h-full cursor-pointer flex-col items-center border border-parchment/10 bg-white/5 p-8 text-center transition-colors hover:border-accent/40 hover:bg-white/[0.07]'
    >
      <span className='mb-5 flex h-14 w-14 shrink-0 items-center justify-center border-[1.5px] border-accent/30 text-accent'>
        <Icon className='h-6 w-6' strokeWidth={1.5} />
      </span>
      <h3 className='mb-3 text-xl font-bold text-parchment'>{title}</h3>
      <p className='leading-relaxed text-parchment/60'>{body}</p>
    </div>
  );
}

export function CTASection() {
  const handlePhoneClick = () => {
    window.location.href = 'tel:0391031317';
  };

  return (
    <section className='relative overflow-hidden bg-secondary py-20 lg:py-28'>
      <span
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent'
      />

      <div className='relative z-10 mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16'>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='mb-6 text-3xl font-bold leading-tight tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
            Let&rsquo;s Strengthen the Support You Offer Your Clients
          </h2>
          <p className='text-lg font-light leading-relaxed text-parchment/60'>
            If you would like to explore how Blackmont Advisory can support your
            firm and your clients, we welcome a confidential discussion.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8'>
          <PartnershipModal>
            <ActionCard
              icon={Calendar}
              title='Book a Meeting'
              body='Schedule a confidential discussion at a time that suits you.'
            />
          </PartnershipModal>

          <ActionCard
            icon={MapPin}
            title='Visit Our South Melbourne Office'
            body='Meet us in person to discuss how we can work together.'
          />

          <ActionCard
            icon={Phone}
            title='Contact Us Directly'
            body='Reach out via phone or email.'
            onClick={handlePhoneClick}
          />
        </div>
      </div>
    </section>
  );
}
