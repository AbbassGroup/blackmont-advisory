'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAcquirerAuth } from '@/context/acquirer-auth-context';
import { DEFAULT_BANNER_IMAGE } from '@/components/im';
import Image from 'next/image';

type ReportCard = {
  _id: string;
  businessName: string;
  bannerImage: string | null;
  updatedAt: string;
};

export default function AcquisitionDashboardPage() {
  const { token } = useAcquirerAuth();
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [loading, setLoading] = useState(true);
  console.log('🚀 ~ AcquisitionDashboardPage ~ reports:', reports);

  useEffect(() => {
    if (!token) return;
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get('/api/acquisition/reports');
        if (active) setReports(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load acquisition reports:', error);
        if (active) setReports([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div className='mx-auto max-w-6xl space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-secondary'>
          Your Acquisition Reports
        </h1>
        <p className='mt-0.5 text-sm text-muted-foreground'>
          Select a report to view it.
        </p>
      </div>

      {loading ? (
        <div className='flex items-center justify-center border border-border bg-card p-16'>
          <Loader2 className='h-8 w-8 animate-spin text-accent' />
        </div>
      ) : reports.length === 0 ? (
        <div className='flex flex-col items-center justify-center border border-border bg-card p-16 text-center'>
          <FileText className='mb-4 h-12 w-12 text-border' />
          <h3 className='text-lg font-semibold text-secondary'>
            No reports yet
          </h3>
          <p className='mt-1 text-muted-foreground'>
            Your acquisition reports will appear here once they are available.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {reports.map((report) => (
            <Link
              key={report._id}
              href={`/acquisition-report/${report._id}`}
              className='group flex flex-col overflow-hidden border border-border bg-card transition-all duration-300 hover:border-accent/40 hover:shadow-md'
            >
              <div className='relative aspect-16/10 w-full overflow-hidden bg-muted'>
                <Image
                  src={report.bannerImage || DEFAULT_BANNER_IMAGE}
                  alt={report.businessName}
                  width={600}
                  height={400}
                  loading='lazy'
                  decoding='async'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='flex flex-1 items-start justify-between gap-2 p-4'>
                <h3 className='font-semibold leading-snug text-secondary transition-colors group-hover:text-accent'>
                  {report.businessName}
                </h3>
                <FileText className='mt-0.5 h-5 w-5 shrink-0 text-accent' />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
