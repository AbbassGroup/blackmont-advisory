import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ABBASS Business Brokers',
  description:
    'Terms and conditions for using the ABBASS Business Brokers website and services. Operated by Abbass Advocacy Pty Ltd (ACN 674 429 255).',
  openGraph: {
    title: 'Terms & Conditions | ABBASS Business Brokers',
    description:
      'Please read our terms and conditions carefully before using our website.',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
