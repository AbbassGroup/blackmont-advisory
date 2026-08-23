'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, Printer } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { ProposalDocument } from './proposal-document';
import { PROPOSAL_API_BASE, type DigitalProposalDoc } from './types';

/** Force every image to load (lazy images are skipped during print) and resolve
 *  once they're all done — with a safety timeout. */
function waitForImages(root: HTMLElement, timeout = 7000): Promise<void> {
  const imgs = Array.from(root.querySelectorAll('img'));
  const pending = imgs.map((img) => {
    img.loading = 'eager';
    try {
      img.decoding = 'sync';
    } catch {
      /* ignore */
    }
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
    });
  });
  return Promise.race([
    Promise.all(pending).then(() => undefined),
    new Promise<void>((r) => setTimeout(r, timeout)),
  ]);
}

/**
 * Broker-only printable view of a Digital Proposal.
 *
 * Renders outside the dashboard chrome so the document paginates like the web
 * page does, at the A4 printable width.
 */
export function ProposalPrint({ id }: { id: string }) {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [proposal, setProposal] = useState<DigitalProposalDoc | null>(null);
  const [error, setError] = useState('');
  const printed = useRef(false);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    apiClient
      .get(`${PROPOSAL_API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setProposal(data))
      .catch(() => setError('Failed to load this proposal.'));
  }, [id, token, router]);

  const doPrint = useCallback(async () => {
    if (docRef.current) await waitForImages(docRef.current);
    window.print();
  }, []);

  // Auto-print once the document has rendered and its images are ready.
  useEffect(() => {
    if (proposal && !printed.current) {
      printed.current = true;
      const t = setTimeout(() => void doPrint(), 300);
      return () => clearTimeout(t);
    }
  }, [proposal, doPrint]);

  if (error) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-2 text-red-600'>
        <AlertCircle className='h-6 w-6' />
        <span className='text-sm font-medium'>{error}</span>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-accent' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-muted/40 print:bg-white'>
      <style>{`@media print {
        /* Browsers drop background colours and images by default; the cover is
           almost entirely both. */
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        tr, img, iframe { break-inside: avoid; }
        canvas, svg, img { max-width: 100% !important; }
        /* The cover is designed to bleed to the sheet's edges. */
        [data-proposal-section="banner"] { margin: -12mm -12mm 0 -12mm; }
        @page { margin: 12mm; }
      }`}</style>

      {/* Toolbar — hidden when printing */}
      <div className='sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur print:hidden'>
        <div className='mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3'>
          <p className='truncate text-sm text-muted-foreground'>
            {proposal.businessName || 'Digital Proposal'}
          </p>
          <Button
            onClick={() => void doPrint()}
            className='shrink-0 gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
          >
            <Printer className='h-4 w-4' /> Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Fixed to the A4 printable width (210mm − 2×12mm margins) so on-screen
          measurements match the print width exactly. */}
      <div className='mx-auto w-[186mm] py-6 print:py-0'>
        <div
          ref={docRef}
          className='overflow-hidden border border-border bg-card shadow-sm print:overflow-visible print:border-0 print:shadow-none'
        >
          <ProposalDocument
            sections={proposal.sections ?? []}
            context={{
              template: proposal.template ?? 'business_appraisal',
              brokerName: proposal.brokerName ?? '',
              customerName: proposal.customerName ?? '',
              businessName: proposal.businessName ?? '',
              businessValue: proposal.businessValue ?? '',
              preparedOn: proposal.approvedAt ?? proposal.createdAt,
            }}
            contentClassName='px-6'
          />
        </div>
      </div>
    </div>
  );
}
