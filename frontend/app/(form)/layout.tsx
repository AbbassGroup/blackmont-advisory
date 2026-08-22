import type { Metadata } from 'next';

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
  return <div className='min-h-screen bg-muted'>{children}</div>;
}
