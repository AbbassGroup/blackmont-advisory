'use client';

import { useParams } from 'next/navigation';
import { ReportPrint } from '@/components/im';

export default function ImPrintPage() {
  const { id } = useParams() as { id: string };
  return <ReportPrint id={id} kind='im' />;
}
