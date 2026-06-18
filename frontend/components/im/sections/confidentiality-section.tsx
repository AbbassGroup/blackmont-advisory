'use client';

import { SectionHeading } from '../section-chrome';

const BODY = [
  'This memorandum contains statements, estimates and projections provided by the proprietor of the business (Vendor). Blackmont Advisory has not verified, audited or independently checked the information provided by the Vendor. We make no warranty or representation as to the accuracy, reliability, or completeness of the information contained in this memorandum.',
  'You bear sole responsibility for verifying all information related to the business. We strongly recommend that you conduct your own due diligence and you do so with the assistance of independent legal, financial, and accounting professionals before entering into any agreement.',
  "You are not permitted to make direct contact with the Vendor, the Vendor's employees, or the Vendor's suppliers. All communications with the Vendor or requests for information from the Vendor, as well as arrangement of inspections must be conducted through Blackmont Advisory.",
  'This memorandum is confidential and issued pursuant to the Confidentiality Agreement. In the event you cease to have an interest in the proposed acquisition, you are required to promptly destroy or return this memorandum and any related materials about the business.',
  'To the extent permitted by law, Blackmont Advisory and its representatives expressly disclaim all liability, whether direct or indirect, arising from or purporting to arise from reliance on the contents of this report or any subsequent files or documents.',
];

// Confidentiality & Disclaimer is standard boilerplate and intentionally read-only.
export function ConfidentialitySection() {
  return (
    <div className='relative'>
      {/* Faint logo watermark in the background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='/businessbrokers/mark.webp'
        alt=''
        aria-hidden
        className='pointer-events-none absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 opacity-[0.12] sm:w-80'
      />
      <div className='relative z-10'>
        <SectionHeading title='Confidentiality & Disclaimer' />
        <h3 className='mb-4 text-lg font-semibold text-brand-primary'>
          Conditions of Acceptance
        </h3>
        <div className='max-w-3xl space-y-4 text-[14px] italic leading-relaxed text-gray-400'>
          {BODY.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className='mt-8 border-t border-gray-200 pt-4 text-sm text-gray-400'>
          <p className='font-semibold text-gray-600'>Blackmont Advisory</p>
          <p>ABN: 78 674 429 255</p>
          <p>License (BLA) 092153L</p>
        </div>
      </div>
    </div>
  );
}
