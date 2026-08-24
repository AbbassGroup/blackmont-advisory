'use client';

import { useParams } from 'next/navigation';
import { ProposalPrint } from '@/components/proposal/proposal-print';

export default function ProposalPrintPage() {
  const { id } = useParams() as { id: string };
  return <ProposalPrint id={id} />;
}
