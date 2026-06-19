'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';

// react-pdf is browser-only; render its canvas pages (no native PDF toolbar, so
// no download/print) to keep documents view-only — like the legacy IM viewer.
const PdfPages = dynamic(() => import('@/components/im/pdf-pages').then((m) => m.PdfPages), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
      <Loader2 className="h-5 w-5 animate-spin" /> Loading PDF...
    </div>
  ),
});

function ImPdfViewer() {
  const src = useSearchParams().get('src') || '';

  if (!src) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-medium">No document specified.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen select-none bg-white"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="mx-auto max-w-4xl">
        <PdfPages url={src} />
      </div>
    </div>
  );
}

export default function ImPdfViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      }
    >
      <ImPdfViewer />
    </Suspense>
  );
}
