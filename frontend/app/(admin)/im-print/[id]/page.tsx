'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircle, Loader2, Printer } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { ImDocument, type ImTemplate } from '@/components/im';

/** Force every image in `root` to load (lazy images are skipped during print)
 * and resolve once they're all loaded — with a safety timeout. */
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

/** True if the template has any PDF insert (a custom section with a pdf block or
 * a legacy pdfUrl) — so we only pay the PDF-wait cost when there's one. */
function templateHasPdf(sections: ImTemplate['sections']): boolean {
  return sections.some((s) => {
    if (s.type !== 'custom') return false;
    const d = s.data as Record<string, unknown>;
    if (typeof d.pdfUrl === 'string' && d.pdfUrl) return true;
    const blocks = Array.isArray(d.blocks) ? (d.blocks as Array<Record<string, unknown>>) : [];
    return blocks.some((b) => b && b.type === 'pdf' && typeof b.url === 'string' && b.url);
  });
}

/** Wait until every react-pdf insert has fetched and finished drawing its pages.
 * react-pdf hides a page canvas (`visibility: hidden`) while rendering and clears
 * it on success, so a finished page = a sized, visible canvas. A grace period
 * covers lazy mount; a hard timeout stops a slow/broken PDF blocking the print. */
function waitForPdfs(root: HTMLElement, timeout = 20000, grace = 2500): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    let prev = -1;
    let stable = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const docs = root.querySelectorAll('.react-pdf__Document').length;
      if (docs === 0) {
        if (elapsed > grace) return resolve();
      } else {
        const loading = root.querySelectorAll('.react-pdf__message--loading').length;
        const pages = root.querySelectorAll('.react-pdf__Page').length;
        const canvases = Array.from(
          root.querySelectorAll<HTMLCanvasElement>('.react-pdf__Page canvas'),
        );
        const rendered = canvases.filter(
          (c) => c.width > 0 && c.style.visibility !== 'hidden',
        ).length;
        // Every document mounted, nothing loading, and every page has a finished
        // canvas — held stable across two ticks so we don't catch a mid-render gap.
        const ready = loading === 0 && pages > 0 && pages >= docs && rendered >= pages;
        if (ready && rendered === prev) {
          if (++stable >= 2) return resolve();
        } else {
          stable = 0;
        }
        prev = rendered;
      }
      if (elapsed > timeout) return resolve();
      setTimeout(tick, 150);
    };
    tick();
  });
}

/**
 * Broker-only printable view. It renders OUTSIDE the dashboard chrome (so the
 * whole document prints and paginates like the web page) but inside the admin
 * auth group. Recipients can't print — the public viewer blocks it.
 */
export default function ImPrintPage() {
  const { id } = useParams() as { id: string };
  const { token } = useAdminAuth();
  const router = useRouter();
  const [template, setTemplate] = useState<ImTemplate | null>(null);
  const [error, setError] = useState('');
  const printed = useRef(false);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    apiClient
      .get(`/api/im-templates/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setTemplate(data))
      .catch(() => setError('Failed to load this memorandum.'));
  }, [id, token, router]);

  // Ensure all (lazy) images and any PDF inserts have finished, then print.
  const doPrint = async () => {
    const root = docRef.current;
    if (root) {
      await waitForImages(root);
      if (template && templateHasPdf(template.sections)) await waitForPdfs(root);
    }
    window.print();
  };

  // Auto-print once the document has rendered and its images are ready.
  useEffect(() => {
    if (template && !printed.current) {
      printed.current = true;
      const t = setTimeout(() => void doPrint(), 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-red-600">
        <AlertCircle className="h-6 w-6" />
        <span className="text-sm font-medium">{error}</span>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 print:bg-white">
      {/* Force brand colours/images to print (browsers skip them by default) and
          keep table rows / images from splitting across pages. */}
      <style>{`@media print {
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        tr, img, iframe { break-inside: avoid; }
        /* Wide rendered media (chart SVGs, PDF canvases) must never exceed the page. */
        canvas, svg, img { max-width: 100% !important; }
        @page { margin: 12mm; }
      }`}</style>

      {/* Toolbar — hidden when printing */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <p className="truncate text-sm text-muted-foreground">
            {template.businessName || 'Information Memorandum'}
          </p>
          <Button
            onClick={() => void doPrint()}
            className="shrink-0 gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light"
          >
            <Printer className="h-4 w-4" /> Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Fixed to the A4 printable width (210mm − 2×12mm margins) so on-screen
          measurements (chart SVGs, PDF canvases) match the print width exactly —
          otherwise those baked-in pixel widths overflow and clip on the right. */}
      <div className="mx-auto w-[186mm] py-6 print:py-0">
        <div
          ref={docRef}
          className="overflow-hidden border border-border bg-card shadow-sm print:overflow-visible print:rounded-none print:border-0 print:shadow-none"
        >
          <ImDocument sections={template.sections} editable={false} brokerEmail={template.brokerEmail} />
        </div>
      </div>
    </div>
  );
}
