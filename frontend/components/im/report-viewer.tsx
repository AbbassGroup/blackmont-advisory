'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { DocumentState, ReportLoading } from '@/components/documents/document-state';
import { LandingButton } from '@/components/landing/presentation';
import { ImReader } from './im-reader';
import { getReportConfig, type ReportKind } from './report-kind';
import type { ImTemplate } from './types';

/** Shared published-document route; data and permissions remain server controlled. */
export function ReportViewer({ id, kind }: { id: string; kind: ReportKind }) {
  const cfg = getReportConfig(kind);
  const key = kind + ':' + id;
  const [result, setResult] = useState<{ key: string; template: ImTemplate | null } | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    apiClient.get(`${cfg.apiBase}/public/${id}`)
      .then(({ data }) => { if (active) setResult({ key, template: data }); })
      .catch(() => { if (active) setResult({ key, template: null }); });
    return () => { active = false; };
  }, [id, key, cfg.apiBase, attempt]);

  if (!result || result.key !== key) return <ReportLoading label={`Loading ${cfg.docNoun}…`} />;
  if (!result.template) return (
    <DocumentState title='Document unavailable' description={`This ${cfg.docTitle} is unavailable or has not been published.`}>
      <LandingButton variant='outline' size='compact' onClick={() => { setResult(null); setAttempt((value) => value + 1); }}>Try again</LandingButton>
    </DocumentState>
  );
  return <ImReader sections={result.template.sections} brokerEmail={result.template.brokerEmail} kind={kind} />;
}
