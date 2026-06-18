import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers – Join the ABBASS Team',
  description:
    "Explore career opportunities at Blackmont Advisory. Join a collaborative team of professionals in Australia's growing business brokerage industry.",
  openGraph: {
    title: 'Careers at Blackmont Advisory',
    description:
      'Professional growth, mentorship, and real career advancement in business brokerage.',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
