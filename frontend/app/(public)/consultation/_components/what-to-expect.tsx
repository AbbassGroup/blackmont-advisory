import Title from '@/components/global/title';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export function WhatToExpect() {
  return (
    <section className='py-20 lg:py-24 bg-white'>
      <div className='max-w-[1400px] mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Left - Video Card */}
          <div className='relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px] flex items-center justify-center bg-gray-900 group shadow-2xl'>
            <div
              className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60'
              style={{ backgroundImage: 'url("/what-next-bg.webp")' }}
            />
            <div className='absolute inset-0 bg-black/40' />

            <div className='relative z-10 text-center p-8 md:p-12 w-full max-w-[500px] mx-auto flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.1)]'>
              <h3 className='text-3xl font-bold text-white mb-4'>
                How to Access the Meeting
              </h3>
              <p className='text-gray-200 text-lg mb-8 leading-relaxed'>
                Watch this short video guide that walks you through how to
                access your consultation session.
              </p>
              <Button
                asChild
                className='bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white px-8 py-6 rounded-full font-bold text-lg shadow-lg hover:shadow-brand-primary/30 transition-all hover:scale-105'
              >
                <a
                  href='https://www.loom.com/share/8eda1e44ab3d4efeb03686708df531ba?sid=d80377d9-0d57-4714-a9f9-11bad3010c3a'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2'
                >
                  <PlayCircle className='w-6 h-6' />
                  Watch Video Guide
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className='text-3xl lg:text-4xl font-extrabold text-brand-black mb-8 leading-[1.15]'>
              What Will Happen in the Meeting
            </h2>
            <div className='space-y-6 text-lg text-gray-600 leading-relaxed'>
              <p>
                Your Initial Consultation is a{' '}
                <strong className='text-brand-black'>
                  30-45 minute discovery meeting
                </strong>{' '}
                conducted either in person or via Google Meets.
              </p>
              <p>
                This session gives us a chance to{' '}
                <strong className='text-brand-black'>
                  learn about you, your business, and your goals
                </strong>
                . It also allows us to walk you through our process and answer
                any early questions you may have.
              </p>
              <p className='text-brand-black font-medium'>
                <strong>No preparation is needed</strong> — you don&apos;t need
                to provide financials or documentation during the consultation.
                We&apos;ll guide the conversation and ask the right questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
