import { Quote } from 'lucide-react';
import Title from '@/components/global/title';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export interface ReviewsCarouselProps {
  title?: string;
  className?: string;
}

const reviewsData = [
  {
    text: `I had a great experience with the Abbas Group. The team was outstanding! Very professional, friendly, and welcoming from the start. I was impressed by how knowledgeable and approachable everyone was.`,
    author: 'Agust',
    position: 'Business Owner',
  },
  {
    text: `I wanted to express my gratitude to Asif for his exceptional assistance. He worked diligently to provide me with all the necessary information, answering my questions thoroughly and professionally.`,
    author: 'Kiran',
    position: 'Business Buyer',
  },
  {
    text: `My experience with Abbass Group was exceptional. As someone new to the process of purchasing a business, Sadeq made everything smooth and seamless. He was informative, responsive, and took the time to answer all of my questions in detail.`,
    author: 'Dan',
    position: 'Business Buyer',
  },
  {
    text: `Abbass and his team are highly professional and knowledgeable. He genuinely cares about his clients. He provides clear, honest advice and goes the extra mile to help people achieve their goals.`,
    author: 'Huss',
    position: 'Business Owner',
  },
  {
    text: `Definitely recommend Sadeq and the team at Abbass Group for brokerage services for your business. Always clear in their communication with weekly updates, but also candid in the market feedback they observe.`,
    author: 'Jordan',
    position: 'Business Owner',
  },
  {
    text: `I recently bought a cafe through Sadeq at Abbass Business Brokers, and I couldn't be happier with the experience. He provided clear information and handled any issues quickly.`,
    author: 'Rahul',
    position: 'Business Buyer',
  },
  {
    text: `Sadeq and his team are incredible. They are quite knowledgeable and diligent. All my communications were promptly responded to. Made the entire process smooth and assuring.`,
    author: 'Nik',
    position: 'Business Owner',
  },
  {
    text: `The team's negotiation skills and level of service and commitment was unparalleled. Highly recommended!`,
    author: 'Jason',
    position: 'Business Owner',
  },
];

export function ReviewsCarousel({
  title = 'What Our Clients Say',
  className = 'py-20 lg:py-28',
}: ReviewsCarouselProps) {
  return (
    <section className={className}>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        <div className='text-center mb-16'>
          <Title>{title}</Title>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto' />
        </div>
        <Carousel opts={{ align: 'start', loop: true }} className='w-full'>
          <CarouselContent className='-ml-5'>
            {reviewsData.map((t, i) => (
              <CarouselItem
                key={i}
                className='pl-5 pb-5 basis-full md:basis-1/2 lg:basis-1/3'
              >
                <div className='bg-white border border-gray-100 rounded-2xl p-7 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow'>
                  <Quote className='w-8 h-8 text-brand-primary/30 mb-4 shrink-0' />
                  <p className='text-gray-600 text-sm leading-relaxed mb-6 italic flex-1'>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
                    <div>
                      <p className='font-bold text-sm text-brand-primary-dark'>
                        {t.author}
                      </p>
                      <p className='text-xs text-gray-400'>{t.position}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex justify-center gap-3 mt-10'>
            <CarouselPrevious className='static translate-y-0 w-11 h-11 rounded-full border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200' />
            <CarouselNext className='static translate-y-0 w-11 h-11 rounded-full border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200' />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
