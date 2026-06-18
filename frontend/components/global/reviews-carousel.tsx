import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/landing/primitives';
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
    text: `I recently bought a cafe through Sadeq at Blackmont Advisory, and I couldn't be happier with the experience. He provided clear information and handled any issues quickly.`,
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
    <section className={cn('bg-background', className)}>
      <Container>
        <div className='mb-14 text-center'>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            {title}
          </h2>
        </div>
        <Carousel opts={{ align: 'start', loop: true }} className='w-full'>
          <CarouselContent className='-ml-5'>
            {reviewsData.map((t, i) => (
              <CarouselItem
                key={i}
                className='basis-full pb-5 pl-5 md:basis-1/2 lg:basis-1/3'
              >
                <div className='flex h-full flex-col border border-secondary/10 bg-background p-7 transition-colors hover:border-accent/40'>
                  <Quote
                    aria-hidden
                    strokeWidth={0}
                    className='mb-4 h-8 w-8 shrink-0 fill-accent/25'
                  />
                  <p className='mb-6 flex-1 text-sm italic leading-relaxed text-muted-foreground'>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className='border-t border-secondary/10 pt-4'>
                    <p className='text-sm font-bold text-secondary'>
                      {t.author}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {t.position}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='mt-10 flex justify-center gap-3'>
            <CarouselPrevious className='static h-11 w-11 translate-y-0 rounded-none border-secondary/20 text-secondary transition-all duration-200 hover:border-accent hover:bg-accent hover:text-primary' />
            <CarouselNext className='static h-11 w-11 translate-y-0 rounded-none border-secondary/20 text-secondary transition-all duration-200 hover:border-accent hover:bg-accent hover:text-primary' />
          </div>
        </Carousel>
      </Container>
    </section>
  );
}
