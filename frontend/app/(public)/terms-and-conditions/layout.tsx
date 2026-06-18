import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Blackmont Advisory',
  description:
    'Terms and conditions for using the Blackmont Advisory website and services. Operated by Blackmont Advisory (ACN 674 429 255).',
  openGraph: {
    title: 'Terms & Conditions | Blackmont Advisory',
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
