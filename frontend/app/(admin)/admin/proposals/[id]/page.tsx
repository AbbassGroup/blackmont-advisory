'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButtonLink } from '@/components/landing/presentation';
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

  return (
    <AdminPageLayout title='New proposal' description='Prepare a new client proposal.'>
      {error ? (
        <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <p className='mt-0 mb-5 text-sm leading-[1.75] text-ink'>{error}</p>
          <LandingButtonLink href={PROPOSAL_BASE_PATH} variant='outline' size='compact'>Back to list</LandingButtonLink>
        </section>
      ) : (
        <div role='status' className='flex items-center gap-3 border border-advisory-rule bg-white p-6 text-sm text-midnight min-[681px]:p-8'>
          <Loader2 aria-hidden='true' className='size-4 shrink-0 animate-spin motion-reduce:animate-none' />
          Creating your proposal…
        </div>
      )}
    </AdminPageLayout>
  );
}

export default function ProposalEditorPage() {
  const params = useParams();
  return params?.id === 'new' ? <NewProposalRedirect /> : <ProposalEditor />;
}
