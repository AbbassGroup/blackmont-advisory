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
      <div className='mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-primary px-7 py-8 sm:flex-row sm:items-center lg:px-8'>
        <div>
          <h3 className='text-xl font-semibold text-white'>{title}</h3>
          <p className='mt-1 text-sm text-white/85'>{subtitle}</p>
        </div>
        <GetStarted className='w-full sm:w-auto' resourceTitle={resource}>
          <Button className='w-full sm:w-max group inline-flex shrink-0 items-center gap-2 rounded-full bg-white hover:bg-white/90 px-6 py-5 text-sm font-semibold text-brand-primary shadow-md shadow-black/10 transition-all hover:-translate-y-0.5'>
            {button}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </Button>
        </GetStarted>
      </div>
    </Suspense>
  );
}
