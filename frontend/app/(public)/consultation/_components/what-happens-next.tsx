import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export function WhatHappensNext() {
  return (
    <section className='py-20 lg:py-28 bg-white'>
      <div className='max-w-[1400px] mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Left Content */}
          <div>
            <h2 className='text-3xl lg:text-4xl font-extrabold text-brand-black mb-8 leading-tight'>
              What Happens Next
            </h2>

            <div className='space-y-6 text-lg text-gray-600 leading-relaxed'>
              <p>
                After the consultation, we&apos;ll ask you to complete a short
                Request for Information (RFI) document. This RFI provides us
                with the key financial and operational information we need to
                prepare a tailored, professional business appraisal.
              </p>
              <p>
                Once we receive your completed RFI and supporting documents, you
                can typically expect your appraisal within{' '}
                <strong className='text-brand-black'>
                  2 to 3 business days
                </strong>
                .
              </p>
              <p className='text-brand-black font-medium'>
                You can also "Download the RFI File Here"
              </p>
            </div>
          </div>

          {/* Right Video CTA */}
          <div className='relative w-full rounded-[2rem] overflow-hidden min-h-[350px] lg:min-h-[500px] flex items-center justify-center shadow-2xl group'>
            {/* Background Image */}
            <div
              className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105'
              style={{
                backgroundImage: 'url("/rfi-bg.webp")',
              }}
            />
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/40' />

            <div className='relative z-10 text-center px-6'>
              <Button
                asChild
                className='bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white px-8 py-7 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-brand-primary/40 transition-all hover:-translate-y-1'
              >
                <a
                  href='https://www.loom.com/share/c62553fb282f4b2f83dd3e41387a82f4?sid=c9aa4dc9-f222-470c-9760-af4b64b64f45'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3'
                >
                  <PlayCircle className='w-7 h-7' />
                  Here's instructions on how to complete the file
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
