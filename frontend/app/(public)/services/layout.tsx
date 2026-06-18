import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Our Services – Business Brokerage, Valuations & More | Blackmont Advisory',
  description:
    'Comprehensive business brokerage services including free valuations, buyer matching, due diligence support, and confidential business sales across Australia.',
  openGraph: {
    title: 'Business Brokerage Services | ABBASS',
    description:
      'From valuations to settlement – our full suite of services helps you buy or sell with confidence.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
