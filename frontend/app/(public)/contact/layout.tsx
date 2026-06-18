import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | ABBASS Business Brokers',
  description:
    'Contact ABBASS Business Brokers in South Melbourne or Sydney. Call (03) 9103 1317 or email info@abbass.group for a confidential consultation about buying or selling a business.',
  openGraph: {
    title: 'Contact ABBASS Business Brokers',
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
