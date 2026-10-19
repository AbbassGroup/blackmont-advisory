import { Loader2 } from 'lucide-react';
import { LandingTheme } from '@/components/landing/landing-theme';

export function SessionLoading({ message = 'Loading portal…' }: { message?: string }) {
  return (
    <LandingTheme className='flex min-h-dvh items-center justify-center bg-canvas px-5 py-10 text-sm min-[681px]:text-sm'>
      <div role='status' className='flex items-center gap-3 border border-advisory-rule bg-white px-6 py-5 text-ink'>
        <Loader2 aria-hidden='true' className='size-4 animate-spin text-midnight motion-reduce:animate-none' />
        <p className='m-0'>{message}</p>
      </div>
    </LandingTheme>
  );
}
