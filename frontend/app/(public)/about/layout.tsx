import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Blackmont Advisory',
  description:
    'Learn about Blackmont Advisory – a boutique Australian brokerage built on trust, expertise, and commitment. Meet Managing Director Sadeq Abbass and our leadership team.',
  openGraph: {
    title: 'About Blackmont Advisory',
    description:
      'A boutique business brokerage built on trust, expertise, and results. Learn our story and meet the team.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
