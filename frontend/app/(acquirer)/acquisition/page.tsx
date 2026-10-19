'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, FileText } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAcquirerAuth } from '@/context/acquirer-auth-context';
import { DEFAULT_BANNER_IMAGE } from '@/components/im';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';

type ReportCard = { _id: string; businessName: string; bannerImage: string | null; updatedAt: string };

function reportDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AcquisitionDashboardPage() {
  const { token } = useAcquirerAuth();
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!token) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    apiClient.get('/api/acquisition/reports')
      .then(({ data }) => { if (active) setReports(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token, attempt]);

  return (
    <AdminPageLayout title='Your acquisition reports' description='Select a report to view it.'>
      {loadError && !loading ? (
        <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your reports.</h2><p className='mt-2 mb-5 text-sm leading-[1.75]'>Please try again to refresh the list.</p><LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton></section>
      ) : !loading && reports.length === 0 ? (
        <section className='flex flex-col gap-3 border border-advisory-rule bg-white p-6 min-[681px]:p-8'><FileText aria-hidden='true' className='size-6 text-ink' /><h2 className='m-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>No reports yet</h2><p className='m-0 text-sm leading-[1.75]'>Your acquisition reports will appear here once they are available.</p></section>
      ) : (
        <section aria-label='Acquisition reports' aria-busy={loading} className='flex min-w-0 flex-col gap-5'>
          <p role='status' className='m-0 text-sm'>{loading ? 'Loading reports…' : `${reports.length} ${reports.length === 1 ? 'report' : 'reports'} available`}</p>
          <div className='grid min-w-0 grid-cols-1 gap-6 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3'>
            {loading ? [0, 1, 2].map((index) => (
              <div key={index} aria-hidden='true' className='flex min-w-0 flex-col border border-advisory-rule bg-white'>
                <div className='aspect-[16/10] w-full animate-pulse bg-canvas motion-reduce:animate-none' />
                <div className='flex flex-1 flex-col gap-3 p-5'><div className='h-6 w-3/4 bg-canvas' /><div className='h-4 w-36 bg-canvas' /></div>
                <div className='border-t border-advisory-rule px-5 py-4'><div className='h-5 w-28 bg-canvas' /></div>
              </div>
            )) : reports.map((report) => (
              <Link key={report._id} href={`/acquisition-report/${report._id}`} className='group flex min-w-0 flex-col border border-advisory-rule bg-white text-midnight transition-colors duration-150 hover:border-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>
                <ReportCover report={report} />
                <div className='flex flex-1 flex-col gap-3 p-5'><h2 className='m-0 font-advisory-heading text-[21px] leading-[1.5] font-bold'>{report.businessName || 'Acquisition report'}</h2>{reportDate(report.updatedAt) && <p className='m-0 text-xs leading-[1.75] text-ink'>Updated {reportDate(report.updatedAt)}</p>}</div>
                <div className='flex items-center justify-between gap-3 border-t border-advisory-rule px-5 py-4 text-sm font-semibold'><span>View report</span><ArrowUpRight aria-hidden='true' className='size-4' /></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </AdminPageLayout>
  );
}

function ReportCover({ report }: { report: ReportCard }) {
  const [failed, setFailed] = useState(false);
  return <div className='relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-canvas'>{failed ? <FileText aria-hidden='true' className='size-8 text-ink/60' /> : <Image unoptimized src={report.bannerImage || DEFAULT_BANNER_IMAGE} alt={report.businessName || 'Acquisition report'} fill sizes='(min-width:1121px) 33vw, (min-width:681px) 50vw, 100vw' onError={() => setFailed(true)} className='object-cover' />}</div>;
}
