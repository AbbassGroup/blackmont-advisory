import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Blackmont Advisory',
  description:
    'Contact Blackmont Advisory in South Melbourne or Sydney. Call (03) 9103 1317 or email info@blackmontadvisory.com for a confidential consultation about buying or selling a business.',
  openGraph: {
    title: 'Contact Blackmont Advisory',
    description:
      'Reach our expert team of business brokers. Offices in Melbourne & Sydney.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
