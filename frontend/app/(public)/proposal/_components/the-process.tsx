const steps = [
  {
    label: 'STEP 1: REVIEW APPRAISAL',
    description:
      'Review the appraisal provided by Blackmont Advisory to understand where your business sits',
  },
  {
    label: 'STEP 2: Q&A',
    description:
      'Ask us any questions you may have in regards to this appraisal or anything else related to the sale of your business',
  },
  {
    label: 'STEP 3: AGREE ON TERMS',
    description:
      'Agree on terms to proceed with on an exclusive or non exclusive agreement',
  },
  {
    label: 'STEP 4: SIGN AGREEMENT',
    description:
      'Provide business owners name(s) and address and proceed to sign agreement which will be sent for electronic signing',
  },
  {
    label: 'STEP 5: PROCESS MARKETING INVOICE PAYMENT',
    description:
      'Process payment of marketing invoice as well as engagement invoice (where applicable)',
  },
  {
    label: 'STEP 6: CONFIDENTIAL AD IS LAUNCHED',
    description:
      'We launch your ad confidentially across all platforms as well as our website',
  },
  {
    label: 'STEP 7: BULK EMAIL TO DATABASE',
    description:
      'A bulk email will be sent to our extensive database of qualified buyers',
  },
  {
    label: 'STEP 8: PROSPECTING BEGINS',
    description:
      'We begin the prospecting process and will reach out to you as and when we have buyer interest',
  },
];

export function TheProcess() {
  return (
    <div className='mt-16 mb-12 bg-transparent'>
      <div className='mb-8 pb-4 border-b border-gray-200'>
        <h2 className='text-2xl font-bold text-brand-black'>The Process</h2>
      </div>

      <div className='space-y-0'>
        {steps.map((step, index) => (
          <div key={index} className='relative pl-10 pb-10 last:pb-0'>
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <div className='absolute left-[11px] top-8 bottom-0 w-[2px] bg-brand-primary/30' />
            )}

            {/* Dot */}
            <div className='absolute left-0 top-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center ring-4 ring-white shadow-sm mt-0.5 text-white font-medium text-sm'>
              {index + 1}
            </div>

            {/* Content */}
            <div>
              <h3 className='text-[16px] font-bold text-brand-black mb-2 leading-tight uppercase tracking-wide'>
                {step.label}
              </h3>
              <p className='text-gray-600 text-base leading-relaxed'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
