import type { Metadata } from 'next';

/**
 * Bare layout for pages that exist only to be rendered into a PDF by headless
 * Chrome. No site header or footer, and — unlike the viewer group — no print
 * blocking, since printing is the entire point.
 */
export const metadata: Metadata = {
  title: 'Blackmont Advisory',
  robots: { index: false, follow: false },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
