'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProposalBanner } from './_components/proposal-banner';
import { ProposalDisclaimer } from './_components/proposal-disclaimer';
import { ProposalFinancialOverview } from './_components/proposal-financial-overview';
import { ProposalBusinessAppraisal } from './_components/proposal-business-appraisal';
import { YourInvestment } from './_components/your-investment';
import { TheProcess } from './_components/the-process';
import { AboutAbbass } from './_components/about-abbass';
import { ContactUs } from './_components/contact-us';
import { MediaReviews } from './_components/media-reviews';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api';

const PROPOSAL_EXPIRY_DAYS = 30;

function ProposalSuccessPage({ businessName }: { businessName?: string }) {
  return (
    <div className='min-h-screen bg-linear-to-br from-[#f5f7fa] to-[#e4e8ec] flex items-center justify-center p-6'>
      <div className='max-w-[500px] w-full text-center bg-white rounded-3xl overflow-hidden shadow-xl'>
        <div className='bg-linear-to-br from-brand-primary to-[#3da8a3] py-12 px-8'>
          <div className='w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5'>
            <CheckCircle2 className='w-12 h-12 text-white' />
          </div>
          <h2 className='text-3xl font-bold text-white mb-2'>Thank You!</h2>
          <p className='text-white text-[15px] leading-relaxed opacity-90'>
            Your agreement for {businessName ? businessName : 'your business'}{' '}
            will be prepared shortly.
          </p>
        </div>
        <div className='p-8 bg-white text-left'>
          <div className='bg-[#f8f9fa] rounded-xl p-6 mb-6'>
            <p className='text-[#666] text-[13px] uppercase tracking-wider mb-2 font-bold'>
              Questions?
            </p>
            <p className='text-[#333] text-[14px] mb-1'>
              <strong>Phone:</strong> (03) 9103 1317
            </p>
            <p className='text-[#333] text-[14px]'>
              <strong>Email:</strong> info@blackmontadvisory.com
            </p>
          </div>
          <p className='text-[#999] text-[13px] text-center'>
            Blackmont Advisory
          </p>
        </div>
      </div>
    </div>
  );
}

function AcceptProposalButton({
  handleAcceptProposal,
  acceptingProposal,
  acceptError,
}: {
  handleAcceptProposal: () => void;
  acceptingProposal: boolean;
  acceptError: string;
}) {
  return (
    <div className='text-center my-12 relative z-20'>
      {acceptError && (
        <div className='mb-6 max-w-[600px] mx-auto p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center justify-center gap-2'>
          <AlertCircle className='w-5 h-5 shrink-0' />
          <span className='text-sm'>{acceptError}</span>
        </div>
      )}

      <button
        onClick={handleAcceptProposal}
        disabled={acceptingProposal}
        className='bg-brand-primary text-white px-10 py-4 text-lg font-bold rounded-xl min-w-[240px] shadow-[0_4px_20px_rgba(86,193,188,0.25)] hover:bg-brand-primary-dark hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:transform-none disabled:cursor-wait flex items-center justify-center mx-auto gap-3'
      >
        {acceptingProposal ? (
          <>
            <Loader2 className='w-5 h-5 animate-spin' />
            <span>Processing...</span>
          </>
        ) : (
          'Accept Proposal'
        )}
      </button>

      {acceptingProposal && (
        <p className='text-sm text-gray-500 mt-4'>
          Please wait while we process your proposal acceptance...
        </p>
      )}
    </div>
  );
}

function ProposalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerEmail = searchParams.get('email');
  const proposalId = searchParams.get('id');
  const isSuccess = searchParams.get('success') === 'true';

  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedAdvertisement, setSelectedAdvertisement] = useState<any>(null);
  const [selectedSuccessFee, setSelectedSuccessFee] = useState<any>(null);

  const [acceptingProposal, setAcceptingProposal] = useState(false);
  const [acceptError, setAcceptError] = useState('');

  const yourInvestmentRef = useRef<HTMLDivElement>(null);

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
        const approvedProposal = Array.isArray(proposals)
          ? proposals.find((p: any) => p.isApproved)
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

        // Pre-select defaults based on legacy logic
        if (
          approvedProposal.advertisement &&
          approvedProposal.advertisement.length > 1
        ) {
          setSelectedAdvertisement(approvedProposal.advertisement[1]); // Default to option 2
        } else if (
          approvedProposal.advertisement &&
          approvedProposal.advertisement.length === 1
        ) {
          setSelectedAdvertisement(approvedProposal.advertisement[0]);
        }

        if (
          approvedProposal.successFee &&
          approvedProposal.successFee.length > 0
        ) {
          setSelectedSuccessFee(approvedProposal.successFee[0]);
        }
      } catch (err: any) {
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

  const isProposalExpired = proposal?.approvedAt
    ? new Date() >
      new Date(
        new Date(proposal.approvedAt).getTime() +
          PROPOSAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      )
    : false;

  const handleAcceptProposal = async () => {
    const hasAdvertisementOptions =
      proposal?.advertisement && proposal.advertisement.length > 0;
    const hasSuccessFeeOptions =
      proposal?.successFee && proposal.successFee.length > 0;

    const needsAdvertisementSelection =
      hasAdvertisementOptions &&
      proposal.advertisement.length > 1 &&
      !selectedAdvertisement;
    const needsSuccessFeeSelection =
      hasSuccessFeeOptions && !selectedSuccessFee;

    if (needsAdvertisementSelection || needsSuccessFeeSelection) {
      if (yourInvestmentRef.current) {
        yourInvestmentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

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
      await apiClient.post('/api/signnow/accept-proposal', {
        proposalId: proposal._id,
        selectedAdvertisement:
          selectedAdvertisement ||
          (proposal.advertisement?.length === 1
            ? proposal.advertisement[0]
            : null),
        selectedSuccessFee:
          selectedSuccessFee ||
          (proposal.successFee?.length === 1 ? proposal.successFee[0] : null),
        customerEmail: proposal.customerEmail,
      });

      // Update URL to show success conditionally
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('success', 'true');
      router.push(newUrl.pathname + newUrl.search);
    } catch (err: any) {
      console.error('Error accepting proposal:', err);
      setAcceptError(
        err.response?.data?.message ||
          err.message ||
          'Failed to process proposal acceptance',
      );
    } finally {
      setAcceptingProposal(false);
    }
  };

  if (isSuccess) {
    return <ProposalSuccessPage businessName={proposal?.businessName} />;
  }

  if (loading) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center p-8'>
        <Loader2 className='w-12 h-12 animate-spin text-brand-primary mb-4' />
        <p className='text-gray-500 font-medium text-lg'>
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
        <p className='text-gray-700 font-bold mb-2'>
          If you believe this is an error, please contact us at:
        </p>
        <p className='text-gray-600'>Email: info@blackmontadvisory.com</p>
        <p className='text-gray-600'>Phone: (03) 9103 1317</p>
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
        <p className='text-gray-600'>Email: info@blackmontadvisory.com</p>
        <p className='text-gray-600'>Phone: (03) 9103 1317</p>
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
      <ProposalBanner
        businessName={proposal.businessName}
        businessValue={proposal.businessValue}
        backgroundImage={proposal.backgroundImage}
        template={proposal.template}
      />

      <div className='max-w-[1260px] mx-auto px-6 lg:px-8'>
        <ProposalDisclaimer template={proposal.template} />

        {proposal.template === 'business_appraisal' && (
          <ProposalFinancialOverview
            financialAssumptions={proposal.financialAssumptions}
          />
        )}

        {proposal.template === 'business_appraisal' && (
          <ProposalBusinessAppraisal
            businessName={proposal.businessName}
            businessValue={proposal.businessValue}
            brokerName={proposal.brokerName}
          />
        )}

        <YourInvestment
          ref={yourInvestmentRef}
          advertisement={proposal.advertisement}
          successFee={proposal.successFee}
          engagementFee={proposal.engagementFee}
          selectedAdvertisement={selectedAdvertisement}
          setSelectedAdvertisement={setSelectedAdvertisement}
          selectedSuccessFee={selectedSuccessFee}
          setSelectedSuccessFee={setSelectedSuccessFee}
          onAcceptProposal={handleAcceptProposal}
          hideSelectionIfSingle={true}
        />

        <AcceptProposalButton
          handleAcceptProposal={handleAcceptProposal}
          acceptingProposal={acceptingProposal}
          acceptError={acceptError}
        />

        <MediaReviews />

        <AcceptProposalButton
          handleAcceptProposal={handleAcceptProposal}
          acceptingProposal={acceptingProposal}
          acceptError={acceptError}
        />

        <TheProcess />

        <AboutAbbass />

        <ContactUs />

        <AcceptProposalButton
          handleAcceptProposal={handleAcceptProposal}
          acceptingProposal={acceptingProposal}
          acceptError={acceptError}
        />
      </div>
    </div>
  );
}

export default function ProposalPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className='min-h-[60vh] flex flex-col items-center justify-center p-8'>
          <Loader2 className='w-12 h-12 animate-spin text-brand-primary mb-4' />
          <p className='text-gray-500 font-medium text-lg'>Loading...</p>
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}
