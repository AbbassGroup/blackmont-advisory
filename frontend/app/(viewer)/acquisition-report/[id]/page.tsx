'use client';

import { useParams } from 'next/navigation';
import { ReportViewer } from '@/components/im';

export default function PublicAcquisitionReportViewer() {
  const params = useParams();
  const id = params?.id as string;
  return <ReportViewer id={id} kind='acquisition' />;
}
