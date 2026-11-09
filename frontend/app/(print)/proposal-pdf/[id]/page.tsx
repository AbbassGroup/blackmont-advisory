'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { apiClient } from '@/lib/api';
import type { DocSection } from '@/components/documents/types';
import { ProposalDocument } from '@/components/proposal/proposal-document';
import {
  getProposalSectionMeta,
  PROPOSAL_API_BASE,
  type DigitalProposalDoc,
} from '@/components/proposal/types';

/**
 * Sections that continue on the page of the section before them, rather than
 * opening a new one. The previous type ignores `noPageBreak` sections (the
 * Accept button), so a button between two sections doesn't split them.
 *
 *  - Appraisal Output + Comparable Listings (custom sections) + Business Appraisal
 *  - Accreditations + The Process
 */
const JOINS_PREVIOUS: Record<string, string[]> = {
  custom: ['custom'],
  appraisal: ['custom'],
  process: ['accreditations'],
};

/** A page holding any of these is shrunk to fit one sheet if it overflows. */
const FIT_TYPES = new Set([
  'financialOverview',
  'appraisal',
  'investment',
  'accreditations',
  'process',
]);

/** Below this the text gets too small to read — let the page flow instead. */
const MIN_SCALE = 0.6;

/** Splits the body sections into printed pages. */
function paginate(sections: DocSection[]): DocSection[][] {
  const pages: DocSection[][] = [];
  let prevType: string | null = null;

  for (const section of sections) {
    if (section.enabled === false) continue;
    const meta = getProposalSectionMeta(section.type);
    const current = pages[pages.length - 1];

    const joins =
      current &&
      (meta?.noPageBreak ||
        (prevType !== null && (JOINS_PREVIOUS[section.type] ?? []).includes(prevType)));

    if (joins) current.push(section);
    else pages.push([section]);

    if (!meta?.noPageBreak) prevType = section.type;
  }
  return pages;
}

/**
 * Shrinks each fit-page that overflows the sheet. `zoom` scales text and
 * spacing together; widening by the inverse keeps the content full-width, and
 * the reflow that causes makes height non-linear in scale — so the largest
 * scale that fits is found by bisection rather than by ratio.
 */
function fitPagesToSheet() {
  // The renderer sizes the viewport to the printable area of one sheet; the
  // slack absorbs rounding at the page edge.
  const sheet = window.innerHeight - 8;
  const pages = document.querySelectorAll<HTMLElement>('[data-pdf-page][data-fit="true"]');

  pages.forEach((page) => {
    const width = page.parentElement?.clientWidth ?? page.clientWidth;
    const fitsAt = (scale: number) => {
      page.style.zoom = String(scale);
      page.style.width = `${width / scale}px`;
      return page.getBoundingClientRect().height <= sheet;
    };
    const reset = () => {
      page.style.removeProperty('zoom');
      page.style.removeProperty('width');
    };

    if (page.getBoundingClientRect().height <= sheet) return;
    if (!fitsAt(MIN_SCALE)) return reset();

    let lo = MIN_SCALE;
    let hi = 1;
    for (let i = 0; i < 8; i += 1) {
      const mid = (lo + hi) / 2;
      if (fitsAt(mid)) lo = mid;
      else hi = mid;
    }
    fitsAt(lo);
  });
}

/** The page headless Chrome renders when a broker exports a proposal. */
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
  // loaded, pages fitted, and a beat for the charts to finish their entry
  // animation.
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
      if (cancelled) return;
      // Measured only once images and fonts are in — both change the height.
      if (part === 'body') fitPagesToSheet();
      // Recharts animates in over ~1.5s; snapshotting sooner can catch a chart
      // mid-draw or empty.
      await new Promise((r) => setTimeout(r, 1800));
      if (!cancelled) document.documentElement.dataset.pdfReady = 'true';
    };

    void settle();
    return () => {
      cancelled = true;
    };
  }, [proposal, failed, part]);

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
    preparedOn: proposal.updatedAt ?? proposal.createdAt,
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
        /* Contain margins so a page measures its full height. */
        [data-pdf-page] { display: flow-root; }
        [data-pdf-page] + [data-pdf-page] { break-before: page; }
        /* The first section on a sheet would otherwise start an inch down it. */
        [data-pdf-page] > div > [data-proposal-section]:first-child > * { margin-top: 0 !important; }
        /* Keep atomic things whole where they'll fit. */
        tr, img, figure, .recharts-wrapper { break-inside: avoid; }
        h1, h2, h3 { break-after: avoid; }
        img, svg, canvas { max-width: 100% !important; }
      `}</style>
      {paginate(body).map((page, i) => (
        <div
          key={page[0].uid || page[0]._id || i}
          data-pdf-page
          data-fit={page.some((s) => FIT_TYPES.has(s.type)) ? 'true' : undefined}
        >
          <ProposalDocument sections={page} context={context} contentClassName='' />
        </div>
      ))}
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
