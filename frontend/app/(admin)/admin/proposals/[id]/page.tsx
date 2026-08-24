'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { BROKERS } from '@/lib/data/brokers-list';
import { ProposalEditor } from '@/components/proposal/proposal-editor';
import {
  PROPOSAL_API_BASE,
  PROPOSAL_BASE_PATH,
} from '@/components/proposal/types';

/**
 * `/admin/proposals/new` creates an empty draft and redirects to its editor, so
 * there is only ever one way to build a proposal: inline on the document, the
 * same as an Information Memorandum.
 */
function NewProposalRedirect() {
  const router = useRouter();
  const { user } = useAdminAuth();
  const [error, setError] = useState('');
  // React runs effects twice in development; without this the first visit
  // would leave an orphan draft behind.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Pre-select the signed-in broker when they are one of the listed brokers,
    // so the Settings dropdown starts on a real option rather than a username
    // that doesn't match any of them.
    const email = user?.user?.email ?? '';
    const broker = BROKERS.find((b) => b.email.toLowerCase() === email.toLowerCase());

    apiClient
      .post(PROPOSAL_API_BASE, {
        brokerName: broker?.name ?? '',
        brokerEmail: broker?.email ?? '',
        createdBy: user?.user?.username ?? 'Admin',
      })
      .then(({ data }) => router.replace(`${PROPOSAL_BASE_PATH}/${data._id}`))
      .catch(() => setError('Could not create a new proposal. Please try again.'));
  }, [router, user]);

  if (error) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 text-center'>
        <div className='flex items-center gap-2 border border-red-100 bg-red-50 px-5 py-4 text-red-600'>
          <AlertCircle className='h-5 w-5' />
          <span className='text-sm font-medium'>{error}</span>
        </div>
        <Link href={PROPOSAL_BASE_PATH}>
          <Button variant='outline' className='rounded-none'>
            Back to list
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <Loader2 className='h-6 w-6 animate-spin text-accent' />
    </div>
  );
}

export default function ProposalEditorPage() {
  const params = useParams();
  return params?.id === 'new' ? <NewProposalRedirect /> : <ProposalEditor />;
}
