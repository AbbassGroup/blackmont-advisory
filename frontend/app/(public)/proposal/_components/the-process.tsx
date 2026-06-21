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
    label: 'STEP 5: CONFIDENTIAL AD IS LAUNCHED',
    description:
      'We launch your ad confidentially across all platforms as well as our website',
  },
  {
    label: 'STEP 6: INFORMATION MATERIAL PREPARED',
    description:
      'Your investment grade information material is prepared for you to review and approve',
  },
  {
    label: 'STEP 7: CAMPAIGN LAUNCHED',
    description:
      'The campaign starts by reaching out to our qualified database to gauge interest',
  },
];

export function TheProcess() {
  return (
    <div className='mt-16 mb-12 bg-transparent'>
      <div className='mb-8 pb-4 border-b border-border'>
        <h2 className='text-2xl font-bold text-secondary'>The Process</h2>
      </div>

      <div className='space-y-0'>
        {steps.map((step, index) => (
          <div key={index} className='relative pl-10 pb-10 last:pb-0'>
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <div className='absolute left-[11px] top-8 bottom-0 w-[2px] bg-accent/30' />
            )}

            {/* Dot */}
            <div className='absolute left-0 top-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center ring-4 ring-background shadow-sm mt-0.5 text-primary font-semibold text-sm'>
              {index + 1}
            </div>

            {/* Content */}
            <div>
              <h3 className='text-[16px] font-bold text-secondary mb-2 leading-tight uppercase tracking-wide'>
                {step.label}
              </h3>
              <p className='text-muted-foreground text-base leading-relaxed'>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
