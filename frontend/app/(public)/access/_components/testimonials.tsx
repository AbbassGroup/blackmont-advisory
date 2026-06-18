'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Star } from 'lucide-react';
import { SectionHeading } from './section-heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const reviews = [
  {
    name: 'Agust',
    position: 'Business Owner',
    quote:
      'I had a great experience with the Abbass Group. The team was outstanding. Very professional, friendly, and welcoming from the start. I was impressed by how knowledgeable and approachable everyone was.',
  },
  {
    name: 'Huss',
    position: 'Business Owner',
    quote:
      'Abbass and his team are highly professional and knowledgeable. He genuinely cares about his clients, provides clear, honest advice, and goes the extra mile to help people achieve their goals.',
  },
  {
    name: 'Jordan',
    position: 'Business Owner',
    quote:
      'Definitely recommend Sadeq and the team at Abbass Group for brokerage services. Always clear in their communication with weekly updates, and candid in the market feedback they observe.',
  },
  {
    name: 'Dan',
    position: 'Business Buyer',
    quote:
      'My experience with Abbass Group was exceptional. As someone new to purchasing a business, Sadeq made everything smooth and seamless. He was informative, responsive, and thorough with every question.',
  },
  {
    name: 'Nik',
    position: 'Business Owner',
    quote:
      'Sadeq and his team are incredible. They are knowledgeable and diligent. All my communications were promptly responded to, which made the entire process smooth and assuring.',
  },
  {
    name: 'Rahul',
    position: 'Business Buyer',
    quote:
      "I recently bought a cafe through Sadeq at Blackmont Advisory, and I couldn't be happier with the experience. He provided clear information and handled any issues quickly.",
  },
  {
    name: 'Kiran',
    position: 'Business Buyer',
    quote:
      'I wanted to express my gratitude to Asif for his exceptional assistance. He worked diligently to provide all the necessary information, answering my questions thoroughly and professionally.',
  },
  {
    name: 'Jason',
    position: 'Business Owner',
    quote:
      "The team's negotiation skills and level of service and commitment were unparalleled. Highly recommended!",
  },
];

const AUTOPLAY_DELAY_MS = 3000;

export function Testimonials() {
  const autoplay = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
    }),
  );

  return (
    <section className='bg-white py-10 lg:py-14'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
          <SectionHeading label='Reviews' title='What Owners Say' />
        </div>

        <div className='mt-8'>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className='w-full'
            plugins={[autoplay.current]}
          >
            <CarouselContent className='-ml-5'>
              {reviews.map((r) => (
                <CarouselItem
                  key={r.name}
                  className='basis-full pl-5 sm:basis-1/2 lg:basis-1/3'
                >
                  <figure className='flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-shadow duration-300 hover:shadow-[0_16px_40px_-24px_rgba(49,49,49,0.4)] lg:p-9'>
                    <div className='mb-5 flex gap-0.5'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className='h-3.5 w-3.5 fill-brand-primary text-brand-primary'
                        />
                      ))}
                    </div>
                    <blockquote className='flex-1 leading-relaxed text-brand-black/85'>
                      “{r.quote}”
                    </blockquote>
                    <figcaption className='mt-7 flex items-center gap-3 border-t border-gray-100 pt-5'>
                      <span className='flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-brand-offwhite text-sm font-semibold text-brand-black'>
                        {r.name.charAt(0)}
                      </span>
                      <span>
                        <span className='block font-semibold text-brand-black'>
                          {r.name}
                        </span>
                        <span className='block text-sm text-gray-500'>
                          {r.position}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className='mt-10 flex justify-center gap-3 sm:justify-end'>
              <CarouselPrevious className='static h-11 w-11 translate-y-0 rounded-full border-gray-200 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary hover:text-white' />
              <CarouselNext className='static h-11 w-11 translate-y-0 rounded-full border-gray-200 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary hover:text-white' />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
