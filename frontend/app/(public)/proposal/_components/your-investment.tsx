import React, { forwardRef } from 'react';

// Using standard input type checkbox with Tailwind styling instead of heavy MUI
function CustomCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`relative w-5 h-5 border flex items-center justify-center transition-colors cursor-pointer ${
        checked
          ? 'bg-accent border-accent'
          : 'bg-white border-gray-300 hover:border-accent'
      }`}
    >
      {checked && (
        <svg
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={3}
          className='w-3.5 h-3.5 text-primary'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M5 13l4 4L19 7'
          />
        </svg>
      )}
    </div>
  );
}

interface OptionItem {
  text: string;
  amount: string | number;
  unit: string;
}

interface YourInvestmentProps {
  advertisement?: OptionItem[];
  successFee?: OptionItem[];
  engagementFee?: string | number;
  selectedAdvertisement?: OptionItem | null;
  setSelectedAdvertisement: (item: OptionItem) => void;
  selectedSuccessFee?: OptionItem | null;
  setSelectedSuccessFee: (item: OptionItem) => void;
  showAcceptButton?: boolean;
  onAcceptProposal?: () => void;
  hideSelectionIfSingle?: boolean;
}

export const YourInvestment = forwardRef<HTMLDivElement, YourInvestmentProps>(
  (
    {
      advertisement = [],
      successFee = [],
      engagementFee = '0',
      selectedAdvertisement,
      setSelectedAdvertisement,
      selectedSuccessFee,
      setSelectedSuccessFee,
    },
    ref,
  ) => {
    const formatAmount = (amount?: string | number, unit?: string) => {
      if (!amount) return '';
      const symbol = unit === 'Dollar' ? '$' : '';
      const suffix = unit === 'Percentage' ? '%' : '';
      return `${symbol}${amount}${suffix} + GST`;
    };

    const advertisementData = advertisement.length > 0 ? advertisement : [];
    const successFeeData = successFee.length > 0 ? successFee : [];

    const getGridCols = (length: number) => {
      if (length === 1) return 'grid-cols-1 md:w-[600px] mx-auto';
      if (length === 2) return 'grid-cols-1 md:grid-cols-2';
      return 'grid-cols-1 md:grid-cols-3';
    };

    return (
      <div
        ref={ref}
        className='mt-16 mb-12 bg-transparent scroll-mt-24'
        id='your-investment'
      >
        <div className='mb-8 pb-4 border-b border-border'>
          <h2 className='text-2xl font-bold text-secondary'>
            Your Investment
          </h2>
        </div>

        {/* Advertisement Section */}
        {advertisementData.length > 0 && (
          <div className='mb-12'>
            <h3 className='text-xl font-bold text-accent mb-6'>
              Advertisement
            </h3>
            <div
              className={`grid gap-6 ${getGridCols(advertisementData.length)}`}
            >
              {advertisementData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAdvertisement(item)}
                  className={`flex flex-col border p-6 transition-all duration-200 cursor-pointer h-full ${
                    selectedAdvertisement === item
                      ? 'bg-accent-pale border-accent border-2 shadow-sm'
                      : 'bg-white border-border hover:border-accent/50 hover:shadow-md hover:-translate-y-1'
                  }`}
                >
                  <div className='mb-4 flex flex-col items-center w-full'>
                    <CustomCheckbox
                      checked={selectedAdvertisement === item}
                      onChange={() => setSelectedAdvertisement(item)}
                    />
                  </div>

                  <div className='flex-1 mb-6 text-center w-full'>
                    <div className='prose prose-sm max-w-none text-foreground mx-auto prose-p:my-1 prose-ul:pl-4 prose-ul:my-1 prose-li:my-0.5 prose-strong:font-semibold'>
                      {item.text ? (
                        <div dangerouslySetInnerHTML={{ __html: item.text }} />
                      ) : (
                        <p className='whitespace-pre-line text-[15px] leading-snug text-foreground'>
                          {item.text}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='mt-auto w-full'>
                    <div className='bg-accent text-primary px-6 py-3 text-center shadow-sm'>
                      <span className='font-bold text-xl'>
                        {formatAmount(item.amount, item.unit)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Section */}
        <div className='mb-12'>
          <h3 className='text-xl font-bold text-accent mb-6'>
            Engagement
          </h3>
          <div className='border border-border p-8 bg-white text-center shadow-sm w-full'>
            <p className='text-foreground text-base leading-relaxed mb-8 max-w-2xl mx-auto'>
              Call through key contacts in database
              <br />
              Handle enquiries from prospects
              <br />
              Obtain NDA from prospects & review client profile Nurture clients
              <br />
              Negotiate & structure deal with clients Collaborate with
              stakeholders on deal structure
            </p>

            <div className='inline-block bg-accent text-primary px-8 py-3 shadow-sm'>
              <span className='font-bold text-xl'>${engagementFee || '0'}</span>
            </div>
          </div>
        </div>

        {/* Success Fee Section */}
        {successFeeData.length > 0 && (
          <div>
            <h3 className='text-xl font-bold text-accent mb-6'>
              Success Fee
            </h3>
            <div className={`grid gap-6 ${getGridCols(successFeeData.length)}`}>
              {successFeeData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSuccessFee(item)}
                  className={`flex flex-col items-center border p-6 transition-all duration-200 cursor-pointer h-full ${
                    selectedSuccessFee === item
                      ? 'bg-accent-pale border-accent border-2 shadow-sm'
                      : 'bg-white border-border hover:border-accent/50 hover:shadow-md hover:-translate-y-1'
                  }`}
                >
                  <div className='mb-4'>
                    <CustomCheckbox
                      checked={selectedSuccessFee === item}
                      onChange={() => setSelectedSuccessFee(item)}
                    />
                  </div>

                  <div className='flex-1 mb-6 text-center w-full'>
                    <div className='prose prose-sm max-w-none text-foreground mx-auto prose-p:my-1 prose-ul:pl-4 prose-ul:my-1 prose-li:my-0.5 prose-strong:font-semibold'>
                      {item.text ? (
                        <div dangerouslySetInnerHTML={{ __html: item.text }} />
                      ) : (
                        <p className='whitespace-pre-line text-[15px] leading-snug text-foreground'>
                          {item.text}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='mt-auto w-full'>
                    <div className='bg-accent text-primary px-6 py-3 text-center shadow-sm inline-block min-w-[200px] w-full'>
                      <span className='font-bold text-xl'>
                        {formatAmount(item.amount, item.unit)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

YourInvestment.displayName = 'YourInvestment';
