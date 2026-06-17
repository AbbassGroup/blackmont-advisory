interface ProposalDisclaimerProps {
  template?: string;
}

export function ProposalDisclaimer({
  template = 'business_appraisal',
}: ProposalDisclaimerProps) {
  return (
    <div className='mt-8 mb-12 bg-transparent shadow-none'>
      {template === 'business_appraisal' && (
        <div className='mb-6 pb-4 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-brand-black'>
            Disclaimer - Business Appraisal Report
          </h2>
        </div>
      )}

      <div className='mb-8 space-y-4'>
        <h3 className='text-lg font-bold text-brand-black mb-4'>
          Conditions of Acceptance
        </h3>

        <p className='text-gray-600 leading-relaxed'>
          ABBASS Business Brokers provides this report as an appraisal of your
          business for information purposes only. This appraisal must not be
          interpreted or relied upon as a formal valuation under any
          professional valuation standard. We are not certified valuers.
        </p>

        <p className='text-gray-600 leading-relaxed'>
          The information, insights, and estimated market price range provided
          in this report are based on data provided by you as well as other
          publicly available sources at the date of this appraisal. ABBASS
          Business Brokers endeavours to make all reasonable inquiries but it is
          not responsible for determining the accuracy or completeness of
          information provided by you. We make no warranty or representation as
          to the accuracy, reliability, or completeness of the information
          contained in this appraisal.
        </p>

        <p className='text-gray-600 leading-relaxed'>
          This appraisal has been prepared as a general guide only and reflects
          our professional opinion at the date of this report, based on our
          experience, transaction history, market knowledge, and relevant sales
          data. Market conditions may change at any time, and this appraisal
          should not be relied upon as a precise, conclusive, or assured measure
          of value or future business performance.
        </p>

        <p className='text-gray-600 leading-relaxed'>
          We strongly recommend that you seek independent professional legal,
          financial, and accounting advice, and obtain a valuation from a
          certified valuer before making your decision to sell or purchase this
          business.
        </p>

        <p className='text-gray-600 leading-relaxed'>
          To the extent permitted by law, ABBASS Business Brokers and its
          representatives expressly disclaim all liability, whether direct or
          indirect, arising from or purporting to arise from reliance on the
          contents of this report.
        </p>
      </div>

      <div className='pt-2'>
        <p className='font-bold text-brand-black'>ABBASS Business Brokers</p>
        <p className='text-sm text-gray-500 mt-1'>ABN: 78 674 429 255</p>
        <p className='text-sm text-gray-500'>License (BLA) 092153L</p>
      </div>
    </div>
  );
}
