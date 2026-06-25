import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referral Partnerships for Advisors & Accountants | Blackmont Advisory',
  description:
    'Partner with Blackmont Advisory. We work with accountants, advisors, and professionals to deliver expert M&A outcomes for their clients across Australia.',
  alternates: { canonical: '/partnership' },
  openGraph: {
    title: 'Partner with Blackmont Advisory',
    description:
      'Collaborate with a boutique M&A firm to deliver expert outcomes for your clients.',
  },
};

export default function PartnershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
