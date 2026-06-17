'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';

const SEEK_ARTICLE =
  'https://www.seekbusiness.com.au/business-resources/broker-stories-sadeq-abbass';
const YOUTUBE_VIDEO = 'https://www.youtube.com/watch?v=gEGLob3o4WA';
const YOUTUBE_THUMB = 'https://img.youtube.com/vi/gEGLob3o4WA/hqdefault.jpg';
const BEST_MELBOURNE_ARTICLE =
  'https://www.thebestmelbourne.com/best-business-brokers-melbourne/';

export function InTheMediaSection() {
  return (
    <section className='py-20 bg-white border-t border-gray-100'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        {/* Heading */}
        <div className='text-center mb-14'>
          <h2 className='text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-brand-black leading-tight mb-4'>
            In the Media
          </h2>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto' />
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* YouTube Card */}
          <div className='group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden'>
            <a
              href={SEEK_ARTICLE}
              target='_blank'
              rel='noopener noreferrer'
              className='relative overflow-hidden bg-black block'
            >
              <Image
                src={YOUTUBE_THUMB}
                alt='Business Broker Stories: Sadeq Abbass'
                width={640}
                height={360}
                className='w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors'>
                  <Play className='w-10 h-10 text-white fill-white' />
                </div>
              </div>
              <div className='absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wide'>
                YouTube
              </div>
            </a>
            <div className='p-6 flex flex-col flex-1'>
              <p className='text-xs font-semibold text-brand-primary uppercase tracking-widest mb-2'>
                Featured on SEEK Business
              </p>
              <a
                href={SEEK_ARTICLE}
                target='_blank'
                rel='noopener noreferrer'
                className='no-underline'
              >
                <h3 className='font-bold text-brand-black text-[1.1rem] leading-snug mb-3 group-hover:text-brand-primary transition-colors'>
                  What Sadeq Abbass Wants Business Owners to Know About Selling
                </h3>
              </a>
              <a
                href={YOUTUBE_VIDEO}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-auto inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors'
              >
                <Play className='w-4 h-4 fill-current' />
                Watch on YouTube
              </a>
            </div>
          </div>

          {/* Award Card */}
          <a
            href={BEST_MELBOURNE_ARTICLE}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-10 no-underline text-center'
          >
            <Image
              src='/businessbrokers/best_melbourne.png'
              alt='Best Business Brokerage Melbourne Award'
              width={280}
              height={280}
              className='object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300'
            />
            <p className='mt-6 font-bold text-brand-primary text-[1.2rem]'>
              Best Business Brokerage
            </p>
            <p className='text-brand-text-secondary text-sm mt-1'>
              Award Winner — The Best Melbourne
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
