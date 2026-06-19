'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Image from 'next/image';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { Container } from '@/components/landing/primitives';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const AGENTS = [
  {
    name: 'Freddie Wong',
    title: 'Business Broker',
    image: '/Freddie Wong.webp',
    location: 'Victoria',
    email: 'freddie.wong@blackmontadvisory.com',
    phone: '0452655608',
    linkedin: 'https://www.linkedin.com/in/freddie-wong-3926b388/',
  },
  {
    name: 'Igor Vasiliev',
    title: 'Business Broker',
    image: '/igor.webp',
    location: 'Sydney',
    email: 'igor.vasiliev@blackmontadvisory.com',
    phone: '0424407612',
    linkedin: 'https://www.linkedin.com/in/igorvasilievgia/',
  },
  {
    name: 'Fiona Johns',
    title: 'Business Broker',
    image: '/fiona.jpg',
    location: 'Queensland',
    email: 'fiona@blackmontadvisory.com',
    phone: '0412223179',
    linkedin: 'https://www.linkedin.com/in/fiona-johns-161a44268/',
  },
  {
    name: 'Asif Ahammed',
    title: 'Business Broker',
    image: '/Asif.jpg',
    location: 'Victoria & Tasmania',
    email: 'asif.ahammed@blackmontadvisory.com',
    phone: '0451918152',
    linkedin: 'https://www.linkedin.com/in/asif-a-61412b1a1',
  },
  {
    name: 'Hicham Nahas',
    title: 'Business Broker',
    image: '/IMG_3531.webp',
    location: 'Melbourne',
    email: 'hicham.nahas@blackmontadvisory.com',
    phone: '0423241225',
    linkedin: 'https://www.linkedin.com/in/hicham-nahas-9a1bb5202/',
  },
];

const socialTile =
  'flex h-9 w-9 items-center justify-center border border-secondary/15 text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-primary';

const arrow =
  'static h-11 w-11 translate-y-0 rounded-none border-secondary/20 text-secondary transition-all duration-200 hover:border-accent hover:bg-accent hover:text-primary';

interface AgentsCarouselProps {
  title?: string;
  /** Optional footer (e.g. a CTA button) rendered below the carousel. */
  children?: React.ReactNode;
}

export function AgentsCarousel({
  title = 'Meet Our Team',
  children,
}: AgentsCarouselProps) {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <section className='bg-muted py-20 lg:py-28'>
      <Container>
        <h2 className='mb-14 text-center text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
          {title}
        </h2>

        <Carousel
          opts={{ loop: true, align: 'start' }}
          className='w-full'
          plugins={[autoplay.current]}
        >
          <CarouselContent className='-ml-4'>
            {AGENTS.map((agent) => (
              <CarouselItem
                key={agent.name}
                className='basis-full pl-4 sm:basis-1/2 lg:basis-1/4'
              >
                <div className='group h-full overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'>
                  <div className='relative aspect-[4/5] w-full overflow-hidden bg-muted'>
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                      unoptimized
                    />
                  </div>

                  <div className='p-6'>
                    <h3 className='text-lg font-bold text-secondary'>
                      {agent.name}
                    </h3>
                    <p className='mt-0.5 text-sm font-medium text-accent'>
                      {agent.title}
                    </p>
                    <div className='mt-3 flex items-center gap-1.5 text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4 text-accent' />
                      {agent.location}
                    </div>

                    <div className='mt-5 flex items-center gap-2 border-t border-secondary/10 pt-4'>
                      <a
                        href={`tel:${agent.phone}`}
                        aria-label={`Call ${agent.name}`}
                        className={socialTile}
                      >
                        <Phone className='h-4 w-4' />
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        aria-label={`Email ${agent.name}`}
                        className={socialTile}
                      >
                        <Mail className='h-4 w-4' />
                      </a>
                      {agent.linkedin && (
                        <a
                          href={agent.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`${agent.name} on LinkedIn`}
                          className={socialTile}
                        >
                          <Linkedin className='h-4 w-4' />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className='mt-10 flex justify-center gap-3 sm:justify-end'>
            <CarouselPrevious className={arrow} />
            <CarouselNext className={arrow} />
          </div>
        </Carousel>

        {children && <div className='mt-12'>{children}</div>}
      </Container>
    </section>
  );
}
