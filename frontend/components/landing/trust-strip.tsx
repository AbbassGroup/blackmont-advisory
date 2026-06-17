import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './primitives';

const ITEMS = [
  { val: 'Discreet', label: 'Private process' },
  { val: 'Exclusive', label: 'Senior-led mandates' },
  { val: 'Both Sides', label: 'Seller and buyer representation' },
  { val: 'Australia', label: 'Based here, reaching globally' },
  { val: 'NDA', label: 'From the first conversation' },
];

export function TrustStrip() {
  return (
    <div className='border-y border-secondary/10 bg-linen'>
      <Container className='grid grid-cols-2 gap-x-4 gap-y-7 py-7 md:flex md:items-center md:justify-between md:gap-0'>
        {ITEMS.map((item, i) => (
          <Fragment key={item.val}>
            {i > 0 && (
              <span
                aria-hidden
                className='hidden h-9 w-px shrink-0 bg-secondary/15 md:block'
              />
            )}
            <div
              className={cn(
                'flex flex-col items-center gap-1 px-2 text-center',
                i === ITEMS.length - 1 && 'col-span-2 md:col-span-1',
              )}
            >
              <span className='text-xl font-bold tracking-tight text-secondary'>
                {item.val}
              </span>
              <span className='text-[0.7rem] font-medium uppercase tracking-[0.02em] text-muted-foreground'>
                {item.label}
              </span>
            </div>
          </Fragment>
        ))}
      </Container>
    </div>
  );
}
