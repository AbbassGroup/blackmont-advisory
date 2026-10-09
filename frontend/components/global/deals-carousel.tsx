'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const DEALS: {
  image: string;
  sector: string;
  location: string;
  structure: string;
  dealSize: string;
  sde?: string;
  outcome: string;
}[] = [
  {
    image: '/carousel/allied-health.webp',
    sector: 'Allied Health',
    location: 'Sydney',
    structure: 'Fully-Managed',
    dealSize: '$475,000',
    sde: '$151k',
    outcome: 'Acquired for First Time Business Owner',
  },
  {
    image: '/carousel/fencing.webp',
    sector: 'Fencing',
    location: 'Melbourne',
    structure: 'Owner-Operated',
    dealSize: '$445,000',
    sde: '$248k',
    outcome: 'Acquired for First Time Business Owner',
  },
  {
    image: '/carousel/trade-services.webp',
    sector: 'Trade Services',
    location: 'Melbourne',
    structure: 'Semi-Managed',
    dealSize: '$810,000',
    outcome: 'Buy-side advisory for an owner scaling through acquisition',
  },
  {
    image: '/carousel/transport.webp',
    sector: 'Transport',
    location: 'Melbourne',
    structure: 'Owner-Operated',
    dealSize: '$740,000',
    sde: '$224k',
    outcome: 'Acquired for First Time Business Owner',
  },
];

/* Square outline arrows, matching the reviews carousel; tone is the
   background the carousel sits on. */
const CONTROL_BASE =
  'static size-11 translate-y-0 rounded-none bg-transparent shadow-none transition-all duration-200 hover:border-accent hover:bg-accent hover:text-primary focus-visible:border-accent focus-visible:ring-accent/40';
const CONTROL_TONE = {
  dark: 'border-parchment/20 text-parchment',
  light: 'border-secondary/20 text-secondary',
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className='px-6 py-4'>
      <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
        {label}
      </dt>
      <dd className='text-xl font-bold tabular-nums tracking-tight text-secondary'>
        {value}
      </dd>
    </div>
  );
}

/* Buy-side deal cards. Pass `href` to make every card a link; without it
   the cards are static. */
export function DealsCarousel({
  href,
  tone = 'light',
}: {
  href?: string;
  tone?: 'dark' | 'light';
}) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      // Hover target is the whole carousel (viewport + arrows), so using the
      // arrows pauses autoplay and leaving restarts the full delay.
      rootNode: (viewport) => viewport.parentElement,
    }),
  );

  const control = cn(CONTROL_BASE, CONTROL_TONE[tone]);

  return (
    <Carousel opts={{ align: 'start', loop: true }} plugins={[autoplay]}>
      <CarouselContent className='-ml-5'>
        {DEALS.map((deal) => {
          const card = (
            <article
              className={cn(
                'flex h-full flex-col bg-background',
                // Bordered like the light pages' cards; on navy the border
                // reads as a pale outline round the photo, so it's dropped.
                tone === 'light' &&
                  'border border-secondary/10 transition-colors hover:border-accent/40',
              )}
            >
              {/* Photo carries the card's header: tag top, title over a
                  midnight scrim at the foot. */}
              <div className='relative aspect-[16/10] overflow-hidden bg-primary'>
                <Image
                  src={deal.image}
                  alt=''
                  fill
                  sizes='(min-width: 1500px) 460px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 80vw'
                  className={cn(
                    'object-cover',
                    // Zoom only hints at a click when there is one.
                    href &&
                      'transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none',
                  )}
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/35 to-transparent'
                />
                <span className='absolute left-6 top-5 border border-parchment/25 bg-primary/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-parchment backdrop-blur-sm'>
                  {deal.structure}
                </span>
                <div className='absolute inset-x-6 bottom-5'>
                  <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-accent'>
                    {deal.location}
                  </p>
                  <h3 className='mt-1 text-2xl font-bold leading-tight tracking-tight text-parchment'>
                    {deal.sector}
                  </h3>
                </div>
              </div>

              <div className='relative flex flex-1 items-center gap-3.5 px-6 py-5'>
                <span
                  aria-hidden
                  className='absolute inset-x-5 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
                />
                <span className='flex h-[22px] w-[22px] shrink-0 items-center justify-center border-[1.5px] border-accent'>
                  <Check className='h-3 w-3 text-accent' strokeWidth={2.5} />
                </span>
                <p className='text-[15px] font-semibold leading-snug text-secondary'>
                  {deal.outcome}
                </p>
              </div>

              <dl
                className={cn(
                  'grid divide-x divide-secondary/10 border-t border-secondary/10',
                  deal.sde ? 'grid-cols-2' : 'grid-cols-1',
                )}
              >
                <Stat label='Deal Size' value={deal.dealSize} />
                {deal.sde && <Stat label='SDE' value={deal.sde} />}
              </dl>
            </article>
          );

          return (
            <CarouselItem
              key={deal.sector}
              className='basis-[85%] pl-5 sm:basis-1/2 lg:basis-1/3'
            >
              {href ? (
                <Link
                  href={href}
                  // Focus ring lives on an overlay: an outline on the link
                  // itself would paint beneath the positioned photo.
                  className='group relative block h-full outline-none after:pointer-events-none after:absolute after:inset-0 after:z-10 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-accent'
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className='mt-10 flex justify-center gap-3'>
        <CarouselPrevious size='icon' className={control} />
        <CarouselNext size='icon' className={control} />
      </div>
    </Carousel>
  );
}
