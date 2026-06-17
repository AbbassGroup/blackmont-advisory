'use client';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { SectionHeading } from './section-heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const agents = [
  {
    name: 'Freddie Wong',
    title: 'Business Broker',
    image: '/businessbrokers/Freddie Wong.webp',
    location: 'Victoria',
    email: 'freddie.wong@abbass.group',
    phone: '0452655608',
    linkedin: 'https://www.linkedin.com/in/freddie-wong-3926b388/',
  },
  {
    name: 'Igor Vasiliev',
    title: 'Business Broker',
    image: '/businessbrokers/igor.webp',
    location: 'Sydney',
    email: 'igor.vasiliev@abbass.group',
    phone: '0424407612',
    linkedin: 'https://www.linkedin.com/in/igorvasilievgia/',
  },
  {
    name: 'Fiona Johns',
    title: 'Business Broker',
    image: '/businessbrokers/fiona.jpg',
    location: 'Queensland',
    email: 'fiona@abbass.group',
    phone: '0412223179',
    linkedin: 'https://www.linkedin.com/in/fiona-johns-161a44268/',
  },

  {
    name: 'Asif Ahammed',
    title: 'Business Broker',
    image: '/businessbrokers/Asif.jpg',
    location: 'Victoria & Tasmania',
    email: 'asif.ahammed@abbass.group',
    phone: '0451918152',
    linkedin: 'https://www.linkedin.com/in/asif-a-61412b1a1',
  },

  {
    name: 'Hicham Nahas',
    title: 'Business Broker',
    image: '/businessbrokers/IMG_3531.webp',
    location: 'Melbourne',
    email: 'hicham.nahas@abbass.group',
    phone: '0423241225',
    linkedin: 'https://www.linkedin.com/in/hicham-nahas-9a1bb5202/',
  },
];

const AUTOPLAY_DELAY_MS = 3000;

export function Team() {
  const autoplay = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
    }),
  );

  return (
    <section className='bg-brand-offwhite py-10 lg:py-14'>
      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <SectionHeading label='The People' title='Meet Our Team' />

        <div className='mt-8'>
          <Carousel
            opts={{ loop: true, align: 'start' }}
            className='w-full'
            plugins={[autoplay.current]}
          >
            <CarouselContent className='-ml-4'>
              {agents.map((agent, index) => (
                <CarouselItem
                  key={agent.name}
                  className='basis-full pl-4 sm:basis-1/2 lg:basis-1/4'
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className='group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_-24px_rgba(49,49,49,0.45)]'
                  >
                    <div className='relative aspect-[4/5] w-full overflow-hidden bg-gray-100'>
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                        unoptimized
                      />
                    </div>

                    <div className='p-6'>
                      <h3 className='text-lg font-semibold text-brand-black'>
                        {agent.name}
                      </h3>
                      <p className='mt-0.5 text-sm font-medium text-brand-primary'>
                        {agent.title}
                      </p>
                      <div className='mt-3 flex items-center gap-1.5 text-sm text-gray-500'>
                        <MapPin className='h-4 w-4 text-brand-primary' />
                        {agent.location}
                      </div>

                      <div className='mt-5 flex items-center gap-2 border-t border-gray-100 pt-4'>
                        <a
                          href={`tel:${agent.phone}`}
                          aria-label={`Call ${agent.name}`}
                          className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white'
                        >
                          <Phone className='h-4 w-4' />
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          aria-label={`Email ${agent.name}`}
                          className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white'
                        >
                          <Mail className='h-4 w-4' />
                        </a>
                        {agent.linkedin && (
                          <a
                            href={agent.linkedin}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${agent.name} on LinkedIn`}
                            className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white'
                          >
                            <Linkedin className='h-4 w-4' />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
