'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PdfLoading } from '@/components/documents/document-state';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/** Canvas-only pages retain the existing view-only document behavior. */
export function PdfPages({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState<{ url: string; pages: number } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const pages = loaded?.url === url ? loaded.pages : 0;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setWidth(element.clientWidth);
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => observer.disconnect();
  }, []);

  const failure = (
    <div role='alert' className='flex flex-col items-start gap-4 border border-advisory-rule bg-white p-5 min-[681px]:p-6'>
      <p className='m-0 text-sm leading-[1.75] text-red-800'>Could not load this PDF.</p>
      <LandingButton variant='outline' size='compact' onClick={() => { setLoaded(null); setAttempt((value) => value + 1); }}>Try again</LandingButton>
    </div>
  );

  return (
    <div ref={ref} className={cn(landingFontVariables, 'w-full min-w-0 font-advisory-body text-sm leading-[1.75] text-ink')}>
      <Document key={url + ':' + attempt} file={url} onLoadSuccess={({ numPages }) => setLoaded({ url, pages: numPages })}
        loading={<PdfLoading />} error={failure} noData={failure} className='flex min-w-0 flex-col gap-6'>
        {width > 0 && Array.from({ length: pages }, (_, index) => (
          <Page key={index} pageNumber={index + 1} width={Math.max(1, width - 2)} renderTextLayer={false} renderAnnotationLayer={false}
            loading={<PdfLoading label={`Loading page ${index + 1}…`} />}
            error={<p role='alert' className='m-0 p-5 text-sm text-red-800'>Could not display page {index + 1}. Please refresh the document to try again.</p>}
            className='overflow-hidden border border-advisory-rule bg-white' />
        ))}
      </Document>
    </div>
  );
}
