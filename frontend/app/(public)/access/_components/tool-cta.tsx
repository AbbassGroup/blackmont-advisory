import { ArrowRight } from 'lucide-react';
import { GetStarted } from './get-started';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

interface ToolCtaProps {
  title: string;
  subtitle: string;
  button: string;
  resource?: string;
}

export function ToolCta({ title, subtitle, button, resource }: ToolCtaProps) {
  return (
    <Suspense>
      <div className='relative mt-10 flex flex-col items-start justify-between gap-6 border-[1.5px] border-secondary bg-secondary px-7 py-8 sm:flex-row sm:items-center lg:px-8'>
        <span
          aria-hidden
          className='absolute inset-x-8 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
        />
        <div>
          <h3 className='text-xl font-bold text-parchment'>{title}</h3>
          <p className='mt-1 text-sm leading-relaxed text-parchment/60'>
            {subtitle}
          </p>
        </div>
        <GetStarted className='w-full sm:w-auto' resourceTitle={resource}>
          <Button className='group inline-flex h-auto w-full shrink-0 items-center gap-2 rounded-none bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light sm:w-max'>
            {button}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </Button>
        </GetStarted>
      </div>
    </Suspense>
  );
}
