'use client';

import { useState, type ComponentProps, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { LandingTheme } from '@/components/landing/landing-theme';
import { cn } from '@/lib/utils';

export const authLabelClass = 'text-sm font-medium text-midnight';
export const authInputClass = 'h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 font-advisory-body text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60 min-[681px]:text-sm';
export const authButtonClass = 'inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-none border border-midnight bg-midnight px-5 py-2 font-advisory-body text-sm font-bold text-white transition-colors duration-150 hover:bg-deep-navy focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <LandingTheme className='flex min-h-dvh items-center justify-center bg-canvas px-5 py-10 text-[15px] min-[681px]:text-[15px]'>
      <main className='flex w-full max-w-[460px] flex-col gap-8'>
        <Link href='/' aria-label='Blackmont Advisory home' className='mx-auto inline-flex min-h-10 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt'>
          <Image unoptimized src='/assets/blackmont.png' alt='Blackmont Advisory' width={240} height={52} className='h-auto w-60 max-w-full' priority />
        </Link>
        <div className='flex min-w-0 flex-col gap-6 border border-advisory-rule bg-white p-6 min-[681px]:p-8'>{children}</div>
      </main>
    </LandingTheme>
  );
}

export function AuthHeading({ title, description }: { title: string; description: ReactNode }) {
  return <header className='flex flex-col gap-3'><h1 className='m-0 font-advisory-heading text-[28px] leading-[1.35] font-bold tracking-normal text-midnight min-[681px]:text-[30px]'>{title}</h1><p className='m-0 text-sm leading-[1.75] text-ink'>{description}</p></header>;
}

export function AuthMessage({ children, success = false }: { children: ReactNode; success?: boolean }) {
  return <p role={success ? 'status' : 'alert'} className={cn('m-0 border px-4 py-3 text-sm leading-[1.75]', success ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800')}>{children}</p>;
}

type AuthFieldProps = Omit<ComponentProps<'input'>, 'className'> & { label: ReactNode; hint?: string };

export function AuthField({ id, label, hint, ...props }: AuthFieldProps) {
  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <label htmlFor={id} className={authLabelClass}>{label}</label>
      <input id={id} className={authInputClass} aria-describedby={hint ? id + '-hint' : undefined} {...props} />
      {hint && <p id={id + '-hint'} className='m-0 text-xs leading-[1.75] text-ink'>{hint}</p>}
    </div>
  );
}

export function AuthPasswordField({ id, label, hint, disabled, ...props }: Omit<AuthFieldProps, 'type'>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <label htmlFor={id} className={authLabelClass}>{label}</label>
      <div className='relative'>
        <input id={id} type={visible ? 'text' : 'password'} disabled={disabled} className={cn(authInputClass, 'pr-12')} aria-describedby={hint ? id + '-hint' : undefined} {...props} />
        <button type='button' disabled={disabled} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} aria-controls={id} onClick={() => setVisible((value) => !value)}
          className='absolute top-0 right-0 flex size-10 items-center justify-center text-ink hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:opacity-50'>
          {visible ? <EyeOff aria-hidden='true' className='size-4' /> : <Eye aria-hidden='true' className='size-4' />}
        </button>
      </div>
      {hint && <p id={id + '-hint'} className='m-0 text-xs leading-[1.75] text-ink'>{hint}</p>}
    </div>
  );
}
