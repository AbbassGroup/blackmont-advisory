'use client';

import { SectionHeading } from '../section-chrome';
import type { ReportKind } from '../report-kind';

const IM_BODY = [
  'This memorandum contains statements, estimates and projections provided by the proprietor of the business (Vendor). Blackmont Advisory has not verified, audited or independently checked the information provided by the Vendor. We make no warranty or representation as to the accuracy, reliability, or completeness of the information contained in this memorandum.',
  'You bear sole responsibility for verifying all information related to the business. We strongly recommend that you conduct your own due diligence and you do so with the assistance of independent legal, financial, and accounting professionals before entering into any agreement.',
  "You are not permitted to make direct contact with the Vendor, the Vendor's employees, or the Vendor's suppliers. All communications with the Vendor or requests for information from the Vendor, as well as arrangement of inspections must be conducted through Blackmont Advisory.",
  'This memorandum is confidential and issued pursuant to the Confidentiality Agreement. In the event you cease to have an interest in the proposed acquisition, you are required to promptly destroy or return this memorandum and any related materials about the business.',
  'To the extent permitted by law, Blackmont Advisory and its representatives expressly disclaim all liability, whether direct or indirect, arising from or purporting to arise from reliance on the contents of this report or any subsequent files or documents.',
];

const ACQUISITION_BODY = [
  'This report has been prepared by Blackmont Advisory exclusively for the client. This report is based on information, documentation, and representations provided by the client. Blackmont Advisory has, in good faith, relied on the accuracy and completeness of all information supplied, and has not independently verified any financial, operational, or legal data unless expressly stated.',
  'The analysis, opinions, and recommendations contained in this report and subsequent correspondence are provided for informational purposes only and do not constitute legal, financial, taxation, or accounting advice. We strongly recommend that you seek professional advice before taking action based on this report.',
  'While Blackmont Advisory strives for accuracy and completeness, it makes no representations or warranties regarding future outcomes, business performance, or the success of any strategies arising from this report.',
  'All Brokers at Blackmont Advisory are licenced Business Brokers but are not licenced Accountants, Lawyers or Financial Advisors.',
  'To the extent permitted by law, Blackmont Advisory and its representatives expressly disclaim all liability, whether direct or indirect which relies or purports to rely on the contents of this report.',
  'This report is strictly confidential and must not be distributed, reproduced, or shared with any third party without the prior written consent of Blackmont Advisory.',
];

// Standard boilerplate, intentionally read-only. Copy and heading differ per
// product: an Information Memorandum's "Confidentiality & Disclaimer" vs an
// Acquisition Report's "Conditions of Acceptance".
export function ConfidentialitySection({ kind = 'im' }: { kind?: ReportKind }) {
  const isAcquisition = kind === 'acquisition';
  const heading = isAcquisition
    ? 'Conditions of Acceptance'
    : 'Confidentiality & Disclaimer';
  const body = isAcquisition ? ACQUISITION_BODY : IM_BODY;

  return (
    <div className='relative'>
      {/* Faint logo watermark in the background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='/assets/logo.png'
        alt=''
        aria-hidden
        className='pointer-events-none absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] sm:w-80'
      />
      <div className='relative z-10'>
        <SectionHeading title={heading} />
        {!isAcquisition && (
          <h3 className='mb-4 text-lg font-semibold text-accent'>
            Conditions of Acceptance
          </h3>
        )}
        <div className='max-w-3xl space-y-4 text-[14px] italic leading-relaxed text-muted-foreground'>
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className='mt-8 border-t border-border pt-4 text-sm text-muted-foreground'>
          {isAcquisition && (
            <>
              <p className='font-semibold text-secondary'>
                Abbass Advocacy Pty Ltd
              </p>
              <p className='font-semibold text-secondary'>
                T/A Blackmont Advisory
              </p>
            </>
          )}
          {!isAcquisition && (
            <p className='font-semibold text-secondary'>Blackmont Advisory</p>
          )}
          <p>ABN: 78 674 429 255</p>
          <p>License (BLA) 092153L</p>
        </div>
      </div>
    </div>
  );
}
