'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { ProposalDocument } from '@/components/proposal/proposal-document';
import {
  PROPOSAL_API_BASE,
  type DigitalProposalDoc,
} from '@/components/proposal/types';

/**
 * The page headless Chrome renders when a broker exports a proposal.
 *
 * It is never linked from the app: the backend mints a short-lived render token,
 * opens this URL, and flags `data-pdf-ready` once the document has settled. Two
 * passes are taken — `part=cover` for the full-bleed first page and `part=body`
 * for the content pages — which the backend stitches together so the cover can
 * bleed while every other page carries the running header.
 */
function ProposalPdfContent() {
  const params = useParams();
  const search = useSearchParams();
  const id = params?.id as string;
  const token = search.get('token') ?? '';
  const part = search.get('part') === 'cover' ? 'cover' : 'body';

  const [proposal, setProposal] = useState<DigitalProposalDoc | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    apiClient
      .get(`${PROPOSAL_API_BASE}/${id}/render`, { params: { token } })
      .then(({ data }) => setProposal(data))
      .catch(() => setFailed(true));
  }, [id, token]);

  // Tell the renderer when it is safe to snapshot: images decoded, webfonts
  // loaded, and a beat for the charts to finish their entry animation.
  useEffect(() => {
    if (!proposal && !failed) return;
    let cancelled = false;

    const settle = async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
              }),
        ),
      );
      await document.fonts?.ready?.catch?.(() => {});
      // Recharts animates in over ~1.5s; snapshotting sooner can catch a chart
      // mid-draw or empty.
      await new Promise((r) => setTimeout(r, 1800));
      if (!cancelled) document.documentElement.dataset.pdfReady = 'true';
    };

    void settle();
    return () => {
      cancelled = true;
    };
  }, [proposal, failed]);

  if (failed) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#b91c1c' }}>
        This proposal could not be loaded for export.
      </div>
    );
  }

  if (!proposal) return null;

  const context = {
    template: proposal.template ?? 'business_appraisal',
    brokerName: proposal.brokerName ?? '',
    customerName: proposal.customerName ?? '',
    businessName: proposal.businessName ?? '',
    businessValue: proposal.businessValue ?? '',
    preparedOn: proposal.approvedAt ?? proposal.createdAt,
  };

  const sections = proposal.sections ?? [];
  const cover = sections.filter((s) => s.type === 'banner').slice(0, 1);
  const body = sections.filter((s) => s.type !== 'banner');

  if (part === 'cover') {
    return (
      <>
        {/* The cover owns the whole sheet: no margins, no header. */}
        <style>{`
          @page { size: A4; margin: 0; }
          html, body { margin: 0; padding: 0; background: #fff; }
          [data-proposal-section="banner"] > header { min-height: 1123px; }
        `}</style>
        <ProposalDocument sections={cover} context={context} contentClassName='' />
      </>
    );
  }

  return (
    <>
      <style>{`
        @page { size: A4; }
        html, body { margin: 0; padding: 0; background: #fff; }
        /* Chrome drops backgrounds by default and this document is largely
           colour: gold rules, navy panels, the score ring. */
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        /* A section that opens a sheet would otherwise start an inch down it.
           Sections that follow on from the previous one keep their spacing. */
        [data-page-start] > * { margin-top: 0 !important; }
        /* Keep atomic things whole where they'll fit. */
        tr, img, figure, .recharts-wrapper { break-inside: avoid; }
        h1, h2, h3 { break-after: avoid; }
        img, svg, canvas { max-width: 100% !important; }
      `}</style>
      <ProposalDocument
        sections={body}
        context={context}
        contentClassName=''
        pageBreakPerSection
      />
    </>
  );
}

export default function ProposalPdfPage() {
  return (
    <Suspense fallback={null}>
      <ProposalPdfContent />
    </Suspense>
  );
}
