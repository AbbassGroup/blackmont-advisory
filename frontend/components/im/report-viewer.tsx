'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { ImReader } from './im-reader';
import { getReportConfig, type ReportKind } from './report-kind';
import type { ImTemplate } from './types';

/**
 * Public, client-facing viewer for a published template. Shared by the
 * Information Memorandum and Acquisition Report viewer routes — `kind` only
 * drives the copy; the rendered document derives its terminology from the
 * fetched template's own `kind`.
 */
export function ReportViewer({ id, kind }: { id: string; kind: ReportKind }) {
  const cfg = getReportConfig(kind);
  const [template, setTemplate] = useState<ImTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    apiClient
      .get(`${cfg.apiBase}/public/${id}`)
      .then(({ data }) => active && setTemplate(data))
      .catch(
        () =>
          active &&
          setError(
            `This ${cfg.docTitle} is unavailable or has not been published.`,
          ),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id, cfg.apiBase, cfg.docTitle]);

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-3'>
        <Loader2 className='h-10 w-10 animate-spin text-accent' />
        <p className='text-muted-foreground'>Loading {cfg.docNoun}...</p>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className='mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center'>
        <div className='flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>{error || 'Not found'}</span>
        </div>
        <p className='text-muted-foreground'>
          Please contact your broker at{' '}
          <a
            href='mailto:info@blackmontadvisory.com'
            className='text-accent underline'
          >
            info@blackmontadvisory.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <ImReader
      sections={template.sections}
      brokerEmail={template.brokerEmail}
      kind={kind}
    />
  );
}
