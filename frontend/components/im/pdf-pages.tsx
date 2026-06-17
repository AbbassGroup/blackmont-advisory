'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';

// Load the pdf.js worker from the CDN matching the bundled pdfjs version.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * Renders every page of a PDF as a full-width block so the pages flow inline
 * with the rest of the memorandum's sections.
 */
export function PdfPages({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <Document
        file={url}
        onLoadSuccess={({ numPages: n }) => setNumPages(n)}
        loading={
          <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading PDF...
          </div>
        }
        error={
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
            Could not load this PDF.
          </div>
        }
        className="space-y-4"
      >
        {width > 0 &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="overflow-hidden rounded-lg border border-gray-100 shadow-xs"
            />
          ))}
      </Document>
    </div>
  );
}
