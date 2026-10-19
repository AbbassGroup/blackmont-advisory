import { GetStarted } from './get-started';
import { Suspense } from 'react';
import { LandingButton, landingButtonVariants } from '@/components/landing/presentation';

interface ToolCtaProps {
  title: string;
  subtitle: string;
  button: string;
  resource?: string;
}

export function ToolCta({ title, subtitle, button, resource }: ToolCtaProps) {
  const buttonClass = landingButtonVariants({ variant: 'gilt', size: 'compact', className: 'shrink-0' });
  return (
    <div className='flex flex-col items-start gap-6 bg-midnight text-white min-[931px]:flex-row min-[931px]:items-center min-[931px]:justify-between p-6 min-[681px]:p-8'>
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
