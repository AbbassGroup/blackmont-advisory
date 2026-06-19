import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Agents – Meet the Expert Business Brokers | Blackmont Advisory',
  description:
    'Meet the experienced business brokers at Blackmont Advisory. Our team covers Melbourne, Sydney, Queensland, and beyond – bringing decades of industry experience to every deal.',
  openGraph: {
    title: 'Our Business Brokers | Blackmont Advisory',
    description:
      'Expert agents with decades of combined experience in business sales across Australia.',
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
