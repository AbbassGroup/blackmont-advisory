'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { DocumentState, PdfLoading } from '@/components/documents/document-state';
import { LandingTheme } from '@/components/landing/landing-theme';

const PdfPages = dynamic(() => import('@/components/im/pdf-pages').then((module) => module.PdfPages), { ssr: false, loading: () => <PdfLoading /> });

function PdfFrame({ children }: { children: React.ReactNode }) {
  return <LandingTheme className='min-h-dvh select-none bg-canvas px-4 py-6 text-sm min-[681px]:px-6 min-[681px]:py-8 min-[681px]:text-sm' onContextMenu={(event) => event.preventDefault()}><main className='mx-auto w-full max-w-4xl'>{children}</main></LandingTheme>;
}

function ImPdfViewer() {
  const src = useSearchParams().get('src') || '';
  if (!src) return <DocumentState title='No document specified' description='This link does not include a document to display. Please contact your broker for the correct link.' />;
  return <PdfFrame><PdfPages url={src} /></PdfFrame>;
}

export default function ImPdfViewerPage() {
  return <Suspense fallback={<PdfFrame><PdfLoading /></PdfFrame>}><ImPdfViewer /></Suspense>;
}
