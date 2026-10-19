import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const LISTING_INPUT_CLASS = 'block h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink disabled:opacity-60 aria-invalid:border-red-700 motion-reduce:transition-none min-[681px]:text-sm';
export const LISTING_ICON_CLASS = 'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-30 motion-reduce:transition-none';

export function ListingSection({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-heading`} className='flex min-w-0 flex-col gap-6 border border-advisory-rule bg-white p-5 min-[681px]:p-8'>
      <header>
        <h2 id={`${id}-heading`} className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight'>{title}</h2>
        {description && <p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>{description}</p>}
      </header>
      {children}
    </section>
  );
}

export function ListingField({ id, label, required, error, hint, className, children }: { id: string; label: string; required?: boolean; error?: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <div data-field={id} className={cn('flex min-w-0 scroll-mt-20 flex-col gap-2', className)}>
      <label id={`${id}-label`} htmlFor={id} className='text-sm leading-[1.6] font-medium text-midnight'>{label}{required && <span aria-hidden='true' className='ml-1'>*</span>}</label>
      {children}
      {error ? <p id={`${id}-hint`} role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>{error}</p> : hint ? <p id={`${id}-hint`} className='m-0 text-xs leading-[1.75] text-ink'>{hint}</p> : null}
    </div>
  );
}

export function ListingInput({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(LISTING_INPUT_CLASS, className)} {...props} />;
}
