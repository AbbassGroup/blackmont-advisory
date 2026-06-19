import Image from 'next/image';

/* Shared field/label/button styling for the admin auth pages, tuned to the
   Blackmont luxury aesthetic: squared edges, navy borders, gilt focus + CTA. */
export const authLabelClass =
  'text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground';

export const authInputClass =
  'h-11 rounded-none border-secondary/15 bg-card text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15';

export const authButtonClass =
  'h-11 w-full rounded-none bg-accent text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60';

/**
 * Centered auth layout: brand logo above the form card on a cream canvas.
 * Used by login / forgot / reset pages.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-dvh items-center justify-center bg-background p-6 sm:p-10'>
      <div className='w-full max-w-md'>
        <div className='mb-10 flex justify-center'>
          <Image
            unoptimized
            src='/assets/blackmont.png'
            alt='Blackmont Advisory'
            width={200}
            height={52}
            className='h-11 w-auto'
            priority
          />
        </div>
        {children}
      </div>
    </div>
  );
}
