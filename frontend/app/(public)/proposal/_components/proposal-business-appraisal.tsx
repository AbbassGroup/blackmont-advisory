interface ProposalBusinessAppraisalProps {
  businessName?: string;
  businessValue?: string;
  brokerName?: string;
}

export function ProposalBusinessAppraisal({
  businessName = '[Business Name]',
  businessValue = '[Business Value]',
  brokerName = '[Broker Name]',
}: ProposalBusinessAppraisalProps) {
  return (
    <div className='mt-16 mb-12 bg-transparent'>
      <div className='mb-6 pb-4 border-b border-gray-200'>
        <h2 className='text-2xl font-bold text-brand-black'>
          Business Appraisal
        </h2>
      </div>

      <div>
        <p className='text-gray-600 leading-relaxed mb-8 text-base md:text-lg'>
          Based on the above data, our research, previous sales data, and market
          experience suggest that a fair market appraisal in the current climate
          for{' '}
          <strong className='text-brand-black font-semibold'>
            {businessName}
          </strong>{' '}
          is within the range of{' '}
          <strong className='text-brand-black font-semibold'>
            {businessValue}
          </strong>
          .
        </p>

        {/* Prepared By and Approved By Section */}
        <div className='mt-10 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6'>
          <div className='bg-[#333] text-white py-3 px-6 text-center flex-1'>
            <span className='font-semibold text-sm tracking-wide uppercase'>
              Prepared By
            </span>
          </div>

          <div className='bg-[#333] text-white py-3 px-6 text-center flex-1'>
            <span className='font-semibold text-sm tracking-wide uppercase'>
              Approved By
            </span>
          </div>
        </div>

        {/* Names Section */}
        <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-1'>
          <div className='bg-[#e8f4f8] text-brand-black py-3 px-6 text-center flex-1 font-medium'>
            {brokerName}
          </div>

          <div className='bg-[#e8f4f8] text-brand-black py-3 px-6 text-center flex-1 font-medium'>
            Sadeq Abbass
          </div>
        </div>
      </div>
    </div>
  );
}
