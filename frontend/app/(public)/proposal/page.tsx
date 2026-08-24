'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { ProposalDocument } from '@/components/proposal/proposal-document';
import {
  PROPOSAL_API_BASE,
  type DigitalProposalDoc,
  type FeeOption,
} from '@/components/proposal/types';

const PROPOSAL_EXPIRY_DAYS = 30;

function ProposalSuccessPage({ businessName }: { businessName?: string }) {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-6'>
      <div className='max-w-[500px] w-full text-center bg-card border border-border overflow-hidden shadow-xl'>
        <div className='bg-secondary py-12 px-8'>
          <div className='w-20 h-20 rounded-full border border-accent/30 bg-accent/15 flex items-center justify-center mx-auto mb-5'>
            <CheckCircle2 className='w-12 h-12 text-accent' />
          </div>
          <h2 className='text-3xl font-bold text-parchment mb-2'>Thank You!</h2>
          <p className='text-parchment/70 text-[15px] leading-relaxed'>
            Your agreement for {businessName ? businessName : 'your business'}{' '}
            will be prepared shortly.
          </p>
        </div>
        <div className='p-8 bg-card text-left'>
          <div className='bg-muted p-6 mb-6'>
            <p className='text-muted-foreground text-[13px] uppercase tracking-wider mb-2 font-bold'>
              Questions?
            </p>
            {/* <p className='text-foreground text-[14px] mb-1'>
              <strong>Phone:</strong> (03) 9103 1317
            </p> */}
            <p className='text-foreground text-[14px]'>
              <strong>Email:</strong> info@blackmontadvisory.com
            </p>
          </div>
          <p className='text-muted-foreground text-[13px] text-center'>
            Blackmont Advisory
          </p>
        </div>
      </div>
    </div>
  );
}

/** Fee options are matched by id so the tick survives an autosave round-trip
 *  replacing the objects underneath it. */
const findOption = (options: FeeOption[] | undefined, id?: string | null) =>
  (options ?? []).find((o) => o.id === id) ?? null;

function ProposalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerEmail = searchParams.get('email');
  const proposalId = searchParams.get('id');
  const isSuccess = searchParams.get('success') === 'true';

  const [proposal, setProposal] = useState<DigitalProposalDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Held by id; resolved back to the live option object at render time.
  const [selectedAdvertisementId, setSelectedAdvertisementId] = useState<string | null>(null);
  const [selectedSuccessFeeId, setSelectedSuccessFeeId] = useState<string | null>(null);

  const [acceptingProposal, setAcceptingProposal] = useState(false);
  const [acceptError, setAcceptError] = useState('');

  const investmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!customerEmail || !proposalId) {
        setError('Missing required parameters in the URL (email and id).');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // GET /api/digital-proposals/email/:email/:id
        const res = await apiClient.get(
          `/api/digital-proposals/email/${encodeURIComponent(customerEmail)}/${proposalId}`,
        );
        const proposals = res.data;

        // Backend possibly returns array of matching proposals
        const approvedProposal: DigitalProposalDoc | null = Array.isArray(proposals)
          ? (proposals.find((p: DigitalProposalDoc) => p.isApproved) ?? null)
          : proposals && proposals.isApproved
            ? proposals
            : null;

        if (!approvedProposal) {
          setError(
            'No approved proposal found for this email address. It may have been revoked or not yet approved.',
          );
          return;
        }

        setProposal(approvedProposal);

        // Record a view silently (fire-and-forget)
        try {
          await apiClient.post(
            `/api/digital-proposals/${approvedProposal._id}/view`,
            {
              customerEmail: approvedProposal.customerEmail,
              customerName: approvedProposal.customerName,
            },
          );
        } catch {
          // Non-critical — don't surface view-tracking errors to the user
        }

        // Pre-select defaults based on legacy logic. The options now live on
        // the locked Investment section rather than the flat fields.
        const investment = approvedProposal.sections?.find(
          (s) => s.type === 'investment',
        )?.data as { advertisement?: FeeOption[]; successFee?: FeeOption[] } | undefined;

        const ads = investment?.advertisement ?? [];
        const fees = investment?.successFee ?? [];

        if (ads.length > 1) setSelectedAdvertisementId(ads[1].id); // Default to option 2
        else if (ads.length === 1) setSelectedAdvertisementId(ads[0].id);

        if (fees.length > 0) setSelectedSuccessFeeId(fees[0].id);
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError(
          'Failed to load your business appraisal. Please check your email link or contact us for assistance.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [customerEmail, proposalId]);

  // Memoised so the accept handler isn't rebuilt on every render.
  const { advertisementOptions, successFeeOptions } = useMemo(() => {
    const investment = proposal?.sections?.find((s) => s.type === 'investment')
      ?.data as { advertisement?: FeeOption[]; successFee?: FeeOption[] } | undefined;
    return {
      advertisementOptions: investment?.advertisement ?? [],
      successFeeOptions: investment?.successFee ?? [],
    };
  }, [proposal]);

  const selectedAdvertisement = findOption(advertisementOptions, selectedAdvertisementId);
  const selectedSuccessFee = findOption(successFeeOptions, selectedSuccessFeeId);

  const isProposalExpired = proposal?.approvedAt
    ? new Date() >
      new Date(
        new Date(proposal.approvedAt).getTime() +
          PROPOSAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      )
    : false;

  const handleAcceptProposal = useCallback(async () => {
    if (!proposal) return;

    const hasAdvertisementOptions = advertisementOptions.length > 0;
    const hasSuccessFeeOptions = successFeeOptions.length > 0;

    const needsAdvertisementSelection =
      hasAdvertisementOptions && advertisementOptions.length > 1 && !selectedAdvertisement;
    const needsSuccessFeeSelection = hasSuccessFeeOptions && !selectedSuccessFee;

    if (needsAdvertisementSelection || needsSuccessFeeSelection) {
      investmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      let errorMessage = 'Please select ';
      if (needsAdvertisementSelection && needsSuccessFeeSelection) {
        errorMessage += 'both advertisement and success fee options';
      } else if (needsAdvertisementSelection) {
        errorMessage += 'an advertisement option';
      } else {
        errorMessage += 'a success fee option';
      }
      errorMessage += ' before accepting the proposal.';

      setAcceptError(errorMessage);
      return;
    }

    setAcceptingProposal(true);
    setAcceptError('');

    try {
      await apiClient.post(`${PROPOSAL_API_BASE}/${proposal._id}/accept`, {
        selectedAdvertisement:
          selectedAdvertisement ||
          (advertisementOptions.length === 1 ? advertisementOptions[0] : null),
        selectedSuccessFee:
          selectedSuccessFee ||
          (successFeeOptions.length === 1 ? successFeeOptions[0] : null),
        customerEmail: proposal.customerEmail,
      });

      // Update URL to show success conditionally
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('success', 'true');
      router.push(newUrl.pathname + newUrl.search);
    } catch (err) {
      console.error('Error accepting proposal:', err);
      const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
      setAcceptError(
        axiosErr.response?.data?.message ||
          axiosErr.message ||
          'Failed to process proposal acceptance',
      );
    } finally {
      setAcceptingProposal(false);
    }
  }, [
    proposal,
    advertisementOptions,
    successFeeOptions,
    selectedAdvertisement,
    selectedSuccessFee,
    router,
  ]);

  if (isSuccess) {
    return <ProposalSuccessPage businessName={proposal?.businessName} />;
  }

  if (loading) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center p-8'>
        <Loader2 className='w-12 h-12 animate-spin text-accent mb-4' />
        <p className='text-muted-foreground font-medium text-lg'>
          Loading your business appraisal...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <div className='bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 mb-6'>
          <AlertCircle className='w-8 h-8 mx-auto mb-3 opacity-90' />
          <p className='font-medium'>{error}</p>
        </div>
        <p className='text-secondary font-bold mb-2'>
          If you believe this is an error, please contact us at:
        </p>
        <p className='text-muted-foreground'>Email: info@blackmontadvisory.com</p>
        {/* <p className='text-muted-foreground'>Phone: (03) 9103 1317</p> */}
      </div>
    );
  }

  if (isProposalExpired) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center'>
        <div className='bg-orange-50 text-orange-700 p-6 rounded-2xl border border-orange-100 mb-6'>
          <AlertCircle className='w-8 h-8 mx-auto mb-3 opacity-90' />
          <p className='font-medium'>
            Proposal has expired. Please contact your broker.
          </p>
        </div>
        <p className='text-muted-foreground'>Email: info@blackmontadvisory.com</p>
        {/* <p className='text-muted-foreground'>Phone: (03) 9103 1317</p> */}
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center p-8'>
        <div className='bg-yellow-50 text-yellow-700 p-6 rounded-2xl border border-yellow-100'>
          <p className='font-medium'>No proposal data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Printing / "Save as PDF" from this page should give the document
          alone, without the marketing chrome around it. */}
      <style>{`@media print {
        /* The nav and footer are direct children of <body>; the cover's own
           <header> lives inside <main> and is untouched. */
        body > header, body > footer { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        @page { margin: 12mm; }
      }`}</style>

      <ProposalDocument
        sections={proposal.sections ?? []}
        context={{
          template: proposal.template ?? 'business_appraisal',
          brokerName: proposal.brokerName ?? '',
          customerName: proposal.customerName ?? '',
          businessName: proposal.businessName ?? '',
          businessValue: proposal.businessValue ?? '',
          // The cover dates the appraisal: when it was approved, else when it was made.
          preparedOn: proposal.approvedAt ?? proposal.createdAt,
        }}
        interaction={{
          selectedAdvertisement,
          onSelectAdvertisement: (o) => setSelectedAdvertisementId(o.id),
          selectedSuccessFee,
          onSelectSuccessFee: (o) => setSelectedSuccessFeeId(o.id),
          onAccept: handleAcceptProposal,
          accepting: acceptingProposal,
          acceptError,
          investmentRef,
          hideSelectionIfSingle: true,
        }}
      />
    </div>
  );
}

export default function ProposalPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className='min-h-[60vh] flex flex-col items-center justify-center p-8'>
          <Loader2 className='w-12 h-12 animate-spin text-accent mb-4' />
          <p className='text-muted-foreground font-medium text-lg'>Loading...</p>
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}
