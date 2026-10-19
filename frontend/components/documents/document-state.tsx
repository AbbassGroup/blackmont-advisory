import type { ReactNode } from 'react';
import { AuthShell, AuthHeading } from '@/app/(admin)/_components/auth-shell';
import { LandingTheme } from '@/components/landing/landing-theme';

export function DocumentContact() {
  return <p className='m-0 break-words text-xs leading-[1.75] text-ink'>For help, contact Blackmont Advisory at <a href='mailto:info@blackmontadvisory.com' className='font-medium text-midnight underline decoration-gilt underline-offset-4 hover:decoration-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'>info@blackmontadvisory.com</a>.</p>;
}

export function DocumentState({ title, description, children }: { title: string; description: ReactNode; children?: ReactNode }) {
  return <AuthShell><AuthHeading title={title} description={description} />{children}<DocumentContact /></AuthShell>;
}

export function PdfLoading({ label = 'Loading PDF…' }: { label?: string }) {
  return (
    <div role='status' className='flex w-full flex-col gap-4 font-advisory-body text-sm text-ink'>
      <p className='m-0'>{label}</p>
      <div aria-hidden='true' className='flex aspect-[1/1.414] w-full flex-col gap-5 border border-advisory-rule bg-white p-6 min-[681px]:p-10'>
        <div className='mb-4 h-6 w-1/2 animate-pulse bg-canvas motion-reduce:animate-none' />
        {[0, 1, 2, 3, 4].map((index) => <div key={index} className='h-4 w-full animate-pulse bg-canvas motion-reduce:animate-none' />)}
        <div className='h-4 w-2/3 animate-pulse bg-canvas motion-reduce:animate-none' />
      </div>
    </div>
  );
}

export function ReportLoading({ label }: { label: string }) {
  return (
    <LandingTheme className='min-h-dvh bg-canvas text-sm min-[681px]:text-sm'>
      <div aria-hidden='true' className='flex min-h-14 items-center gap-3 border-b border-advisory-rule bg-white px-5 py-3 lg:hidden'><div className='h-4 w-4 bg-canvas' /><span className='text-sm font-semibold text-midnight'>Contents</span></div>
      <div role='status' className='mx-auto flex w-full max-w-6xl gap-8 py-0 min-[681px]:px-6 min-[681px]:py-8'>
        <p className='sr-only'>{label}</p>
        <div aria-hidden='true' className='hidden w-56 shrink-0 flex-col gap-4 lg:flex'><div className='mb-3 h-7 w-28 bg-white' />{[0, 1, 2, 3, 4, 5].map((index) => <div key={index} className='h-10 w-full animate-pulse bg-white motion-reduce:animate-none' />)}</div>
        <div aria-hidden='true' className='flex min-w-0 flex-1 flex-col border border-advisory-rule bg-white'>
          <div className='flex h-[340px] flex-col justify-end gap-4 bg-canvas/60 p-6 min-[681px]:h-[460px] min-[681px]:p-10'><div className='h-5 w-32 animate-pulse bg-white motion-reduce:animate-none' /><div className='h-9 w-3/4 animate-pulse bg-white motion-reduce:animate-none' /></div>
          <div className='flex flex-col gap-4 p-6 min-[681px]:p-10'><div className='h-6 w-48 bg-canvas' />{[0, 1, 2, 3].map((index) => <div key={index} className='h-4 w-full bg-canvas' />)}</div>
        </div>
      </div>
    </LandingTheme>
  );
}
