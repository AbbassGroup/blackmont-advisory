'use client';

import { REPORT_KINDS } from '@/components/im';
import { ReportList } from '../_reports/report-list';

export default function InformationMemorandumPage() {
  return <ReportList config={REPORT_KINDS.im} />;
}
