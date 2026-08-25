'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_CONTENT } from '../fixed-content';

/** Fixed wording from `fixed-content.ts`; nothing here is editable. */
export function ProposalContactSection() {
  const c = CONTACT_CONTENT;

  const rows = [
    { key: 'email', icon: Mail, value: c.email, multiline: false },
    { key: 'phone', icon: Phone, value: c.phone, multiline: false },
    { key: 'address', icon: MapPin, value: c.address, multiline: true },
  ].filter((row) => row.value);

  return (
    <div
      className='relative mt-16 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat py-16'
      style={{ backgroundImage: `url(${c.backgroundImage})` }}
    >
      <div className='absolute inset-0 bg-black/40' />

      <div className='relative z-10 mx-auto max-w-[340px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]'>
        {/* gilt hairline at the top */}
        <span
          aria-hidden
          className='block h-0.5 w-full'
          style={{ backgroundImage: 'url("/assets/scrim-hairline.png")', backgroundSize: '100% 100%' }}
        />

        <div className='bg-secondary p-8 text-center text-parchment'>
          <h2 className='mb-6 text-2xl font-bold uppercase tracking-wide text-accent'>
            {c.title}
          </h2>

          <div className='ml-2 space-y-5 text-left'>
            {rows.map(({ key, icon: Icon, value, multiline }) => (
              <div key={key} className='flex items-start'>
                <Icon className='mr-4 mt-0.5 h-5 w-5 shrink-0 text-accent' />
                <span
                  className={`text-base font-medium leading-snug ${
                    multiline ? 'whitespace-pre-line' : ''
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='flex min-h-[160px] flex-col items-center justify-center bg-primary p-8'>
          <div className='relative h-14 w-52'>
            <Image
              loading='eager'
              unoptimized
              src='/assets/blackmont-light.png'
              alt='Blackmont Advisory'
              fill
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
