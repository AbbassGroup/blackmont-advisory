'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

// Controls stay in normal document flow, inside the same width as the cards.
const CONTROL_CLASS =
  'static inset-auto size-11 shrink-0 translate-x-0 translate-y-0 rounded-none border border-advisory-rule bg-white text-midnight shadow-none transition-colors duration-200 hover:border-midnight hover:bg-midnight hover:text-white focus-visible:border-midnight focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:opacity-35 motion-reduce:transition-none';

export function AcquisitionsCarousel({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      breakpoints: {
        '(prefers-reduced-motion: reduce)': { active: false },
      },
    }),
  );
  const count = Children.count(children);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!api || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !preference.matches) autoplay.play();
      else autoplay.stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });

    observer.observe(api.rootNode());
    api.on('reInit', syncPlayback);
    return () => {
      observer.disconnect();
      api.off('reInit', syncPlayback);
      autoplay.stop();
    };
  }, [api, autoplay]);

  return (
    <Carousel
      aria-labelledby='acquisitions-title'
      className='w-full min-w-0'
      setApi={setApi}
      plugins={[autoplay]}
      opts={{
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll: 1,
        loop: true,
        duration: reducedMotion ? 0 : 25,
      }}
    >
      <CarouselContent className='-ml-[20px] touch-pan-y touch-pinch-zoom min-[681px]:-ml-7 min-[931px]:-ml-[20px] min-[1121px]:-ml-6'>
        {Children.map(children, (child, index) => (
          <CarouselItem
            aria-label={`${index + 1} of ${count}`}
            className='flex basis-full pl-[20px] min-[601px]:basis-1/2 min-[681px]:pl-7 min-[931px]:basis-1/4 min-[931px]:pl-[20px] min-[1121px]:pl-6'
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='mt-7 flex flex-wrap items-center justify-end gap-2.5'>
        <CarouselPrevious
          aria-label='Previous acquisition'
          size='icon'
          className={CONTROL_CLASS}
        />
        <CarouselNext
          aria-label='Next acquisition'
          size='icon'
          className={CONTROL_CLASS}
        />
      </div>
    </Carousel>
  );
}
