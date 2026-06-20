'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { ImReader, type ImTemplate } from '@/components/im';

export default function PublicImViewer() {
  const params = useParams();
  const id = params?.id as string;

  const [template, setTemplate] = useState<ImTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    apiClient
      .get(`/api/im-templates/public/${id}`)
      .then(({ data }) => active && setTemplate(data))
      .catch(
        () =>
          active &&
          setError(
            'This Information Memorandum is unavailable or has not been published.',
          ),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-3'>
        <Loader2 className='h-10 w-10 animate-spin text-accent' />
        <p className='text-muted-foreground'>Loading memorandum...</p>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className='mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center'>
        <div className='flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>{error || 'Not found'}</span>
        </div>
        <p className='text-muted-foreground'>
          Please contact your broker at{' '}
          <a
            href='mailto:info@blackmontadvisory.com'
            className='text-accent underline'
          >
            info@blackmontadvisory.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <ImReader sections={template.sections} brokerEmail={template.brokerEmail} />
  );
}
