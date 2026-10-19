import type { Metadata } from 'next';
import { LandingTheme } from '@/components/landing/landing-theme';

// Party-facing forms are standalone documents, no site header, footer or nav.
export const metadata: Metadata = {
  title: 'Letter of Intent | Blackmont Advisory',
  robots: { index: false, follow: false },
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingTheme className='min-h-dvh bg-canvas text-[15px] min-[681px]:text-[15px]'>{children}</LandingTheme>;
}
