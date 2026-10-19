import type { ReactNode } from 'react';
import { LandingTheme } from '@/components/landing/landing-theme';

export function AdminPageLayout({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <LandingTheme className='mx-auto flex w-full max-w-advisory min-w-0 flex-col gap-8 bg-transparent text-[15px] min-[681px]:text-[15px]'>
      <header className='flex min-w-0 flex-col items-start justify-between gap-5 min-[681px]:flex-row min-[681px]:items-center'>
        <div className='min-w-0'>
          <h1 className='m-0 font-advisory-heading text-[30px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[36px]'>
            {title}
          </h1>
          <p className='mt-3 mb-0 text-[15px] leading-[1.75] text-ink'>
            {description}
          </p>
        </div>
        {action && (
          <div className='flex w-full shrink-0 min-[681px]:w-auto [&>*]:w-full min-[681px]:[&>*]:w-auto'>
            {action}
          </div>
        )}
      </header>
      {children}
    </LandingTheme>
  );
}
