'use client';

import Image from 'next/image';
import { useId } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_CONTENT } from '../fixed-content';
import { LandingImage } from '@/components/landing/landing-image';
import contactMeeting from '@/public/landing/proposal-contact-meeting.jpeg';

/** Fixed wording from `fixed-content.ts`; nothing here is editable. */
export function ProposalContactSection({ appearance = 'document' }: { appearance?: 'document' | 'advisory' }) {
  const c = CONTACT_CONTENT;
  const headingId = useId();

  const rows = [
    { key: 'email', icon: Mail, value: c.email, multiline: false },
    { key: 'phone', icon: Phone, value: c.phone, multiline: false },
    { key: 'address', icon: MapPin, value: c.address, multiline: true },
  ].filter((row) => row.value);

  if (appearance === 'advisory') {
    return (
      <section aria-labelledby={headingId} className='my-12 grid overflow-hidden bg-midnight text-white min-[681px]:my-16 min-[931px]:grid-cols-[1.05fr_0.95fr]'>
        <figure className='group/image relative m-0 aspect-[3/2] min-w-0 overflow-hidden min-[931px]:aspect-auto min-[931px]:min-h-[360px]'>
          <LandingImage
            src={contactMeeting}
            alt='Illustrative photograph of people working together in an office'
            fill
            unoptimized
            sizes='(max-width: 930px) 100vw, 50vw'
            className='object-cover object-[50%_40%]'
          />
        </figure>
        <div className='flex min-w-0 flex-col justify-center px-6 py-9 min-[681px]:px-10 min-[681px]:py-12 min-[1121px]:px-12'>
          <h2 id={headingId} className='m-0 font-advisory-heading text-[29px] leading-[1.35] font-bold tracking-normal text-white min-[681px]:text-[34px]'>
            {c.title.charAt(0) + c.title.slice(1).toLowerCase()}
          </h2>
          <p className='mt-5 mb-0 max-w-[430px] text-base leading-[1.8] text-white/85 min-[681px]:text-[17px]'>
            Speak with Blackmont about your proposal and the next step for your business.
          </p>
          <div className='mt-7 flex flex-col items-start gap-5'>
          {rows.map(({ key, icon: Icon, value, multiline }) => (
            <div key={key} className='flex min-w-0 max-w-full items-start gap-3 text-base leading-[1.8] text-white'>
              <Icon aria-hidden='true' className='mt-1 size-5 shrink-0 text-gilt' />
              {key === 'email' || key === 'phone' ? (
                <a
                  href={`${key === 'email' ? 'mailto' : 'tel'}:${value}`}
                  className='min-w-0 break-words underline underline-offset-4 transition-colors duration-200 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'
                >{value}</a>
              ) : (
                <span className={multiline ? 'whitespace-pre-line' : undefined}>{value}</span>
              )}
            </div>
          ))}
          </div>
        </div>
      </section>
    );
  }

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
