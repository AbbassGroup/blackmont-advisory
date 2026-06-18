import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Blackmont Advisory',
  description:
    'Read the Blackmont Advisory privacy policy. Learn how we collect, use, and protect your personal information under Australian Privacy Principles.',
  openGraph: {
    title: 'Privacy Policy | Blackmont Advisory',
    description: 'How we handle and protect your personal information.',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
