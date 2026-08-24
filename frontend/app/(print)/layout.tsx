import type { Metadata } from 'next';

/** Bare layout for pages that exist only to be rendered into a PDF by headless Chrome. */
export const metadata: Metadata = {
  title: 'Blackmont Advisory',
  robots: { index: false, follow: false },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
