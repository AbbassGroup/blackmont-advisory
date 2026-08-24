'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, Download, FileText, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { PROPOSAL_API_BASE } from './types';

/** Broker-facing export screen. */
export function ProposalPrint({ id }: { id: string }) {
  const [state, setState] = useState<'working' | 'ready' | 'error'>('working');
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const started = useRef(false);

  // Kept as a promise chain rather than an awaited async call: the state lands
  // in a callback, not synchronously inside the effect below.
  const load = useCallback(
    () =>
      apiClient
        .get(`${PROPOSAL_API_BASE}/${id}/pdf`, {
          responseType: 'blob',
          // Two Chrome render passes take longer than a normal request.
          timeout: 120000,
        })
        .then(({ data }) => {
          setUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(data as Blob);
          });
          setState('ready');
        })
        .catch(async (err) => {
          // The backend explains what failed (Chrome missing, render page
          // unreachable, and so on). Surfacing it beats sending someone to the
          // server logs — the blob response has to be read back as text.
          let reason = '';
          try {
            const blob = err?.response?.data as Blob | undefined;
            if (blob && typeof blob.text === 'function') {
              reason = JSON.parse(await blob.text())?.reason ?? '';
            }
          } catch {
            /* keep the generic message */
          }
          setError(
            reason || 'The PDF could not be generated. Please try again.',
          );
          setState('error');
        }),
    [id],
  );

  const retry = useCallback(() => {
    setState('working');
    setError('');
    void load();
  }, [load]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void load();
  }, [load]);

  // Don't leak the object URL when the screen goes away.
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );

  return (
    <div className='min-h-screen bg-muted/40'>
      <div className='sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur'>
        <div className='mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3'>
          <p className='flex items-center gap-2 truncate text-sm text-muted-foreground'>
            <FileText className='h-4 w-4 shrink-0' />
            {state === 'working' ? 'Preparing the PDF…' : 'Proposal PDF'}
          </p>
          <div className='flex items-center gap-2'>
            {state === 'error' && (
              <Button
                variant='outline'
                className='rounded-none'
                onClick={retry}
              >
                Try again
              </Button>
            )}
            <a
              href={url || undefined}
              download={state === 'ready' ? 'proposal.pdf' : undefined}
            >
              <Button
                disabled={state !== 'ready'}
                className='shrink-0 gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
              >
                {state === 'working' ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Download className='h-4 w-4' />
                )}
                Download PDF
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-5xl px-4 py-6'>
        {state === 'working' && (
          <div className='flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground'>
            <Loader2 className='h-6 w-6 animate-spin text-accent' />
            <p className='text-sm'>
              Rendering the document, this takes a few seconds.
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className='mx-auto flex min-h-[40vh] max-w-xl flex-col items-center justify-center gap-4 text-center'>
            <div className='flex items-start gap-2 border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
              <AlertCircle className='h-5 w-5' />
              <span className='text-left text-sm font-medium'>{error}</span>
            </div>
          </div>
        )}

        {state === 'ready' && url && (
          <iframe
            src={url}
            title='Proposal PDF'
            className='h-[calc(100vh-8rem)] w-full border border-border bg-card'
          />
        )}
      </div>
    </div>
  );
}
