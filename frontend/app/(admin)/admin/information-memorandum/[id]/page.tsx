'use client';

import { REPORT_KINDS } from '@/components/im';
import { ReportEditor } from '../../_reports/report-editor';

export default function ImEditorPage() {
  return <ReportEditor config={REPORT_KINDS.im} />;
}
