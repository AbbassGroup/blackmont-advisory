import React from 'react';

interface ProposalFinancialOverviewProps {
  financialAssumptions?: string | null;
}

export function ProposalFinancialOverview({
  financialAssumptions,
}: ProposalFinancialOverviewProps) {
  const defaultAssumptions = `
    <ul class="list-disc pl-5 space-y-2 mt-4 text-gray-600">
      <li></li>
      <li></li>
    </ul>
  `;

  return (
    <div className='mt-16 mb-12 bg-transparent'>
      <div className='mb-6 pb-4 border-b border-gray-200'>
        <h2 className='text-2xl font-bold text-brand-black'>
          Financial Assumptions
        </h2>
      </div>

      <div className='prose prose-gray max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-headings:text-brand-black prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3'>
        {financialAssumptions ? (
          <div dangerouslySetInnerHTML={{ __html: financialAssumptions }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: defaultAssumptions }} />
        )}
      </div>
    </div>
  );
}
