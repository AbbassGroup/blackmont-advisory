import { Phone, MapPin, Mail } from 'lucide-react';
import Image from 'next/image';

export function ContactUs() {
  return (
    <div
      className='mt-16 py-16 bg-cover bg-center bg-no-repeat relative rounded-2xl overflow-hidden'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1920&q=80)',
      }}
    >
      <div className='absolute inset-0 bg-black/40' />

      <div className='relative z-10 max-w-[340px] mx-auto overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]'>
        {/* gilt hairline at the top */}
        <span
          aria-hidden
          className='block h-0.5 w-full bg-linear-to-r from-transparent via-accent to-transparent'
        />
        {/* Top Info Section */}
        <div className='bg-secondary text-parchment p-8 text-center'>
          <h2 className='font-bold text-2xl tracking-wide mb-6 uppercase text-accent'>
            CONTACT US
          </h2>

          <div className='space-y-5 text-left ml-2'>
            <div className='flex items-center'>
              <Phone className='w-5 h-5 mr-4 shrink-0 text-accent' />
              <span className='text-base font-medium'>(03) 9103 1317</span>
            </div>

            <div className='flex items-start'>
              <MapPin className='w-5 h-5 mr-4 mt-0.5 shrink-0 text-accent' />
              <span className='text-base font-medium leading-snug'>
                101 Moray St, South
                <br />
                Melbourne, VIC 3205
              </span>
            </div>

            <div className='flex items-center'>
              <Mail className='w-5 h-5 mr-4 shrink-0 text-accent' />
              <span className='text-base font-medium'>
                info@blackmontadvisory.com
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Logo Section */}
        <div className='bg-primary p-8 flex flex-col items-center justify-center min-h-[160px]'>
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
