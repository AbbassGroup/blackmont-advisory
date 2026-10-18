import { ArrowRight } from 'lucide-react';
import { GetStarted } from './get-started';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { LandingButton, landingButtonVariants } from '@/components/landing/presentation';

interface ToolCtaProps {
  title: string;
  subtitle: string;
  button: string;
  resource?: string;
  appearance?: 'legacy' | 'advisory';
}

export function ToolCta({ title, subtitle, button, resource, appearance = 'legacy' }: ToolCtaProps) {
  if (appearance === 'advisory') {
    const buttonClass = landingButtonVariants({ variant: 'gilt', size: 'compact', className: 'shrink-0' });
    return (
      <div className='flex flex-col items-start gap-6 bg-midnight p-6 text-white min-[681px]:p-8 min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-between'>
        <div className='min-w-0'>
          <h3 className='m-0 mb-3 font-advisory-heading text-[25px] leading-[1.35] font-bold tracking-normal'>{title}</h3>
          <p className='m-0 text-[15px] leading-[1.75] text-white/90'>{subtitle}</p>
        </div>
        <Suspense fallback={<LandingButton disabled size='compact' className={buttonClass}>{button}</LandingButton>}>
          <GetStarted resourceTitle={resource} className={buttonClass}>{button}</GetStarted>
        </Suspense>
      </div>
    );
  }

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
