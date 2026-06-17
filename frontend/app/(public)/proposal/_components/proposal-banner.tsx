import React from 'react';

interface ProposalBannerProps {
  businessName?: string;
  businessValue?: string;
  backgroundImage?: string | null;
  template?: string;
}

export function ProposalBanner({
  businessName = '[Business Name]',
  businessValue = '[Business Value]',
  backgroundImage,
  template = 'business_appraisal',
}: ProposalBannerProps) {
  const bgImage = backgroundImage
    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
    : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80)`;

  return (
    <div
      className='relative h-[300px] md:h-[400px] w-full flex flex-col items-center justify-center text-white bg-cover bg-center overflow-hidden'
      style={{ backgroundImage: bgImage }}
    >
      <div className='relative z-10 text-center px-4 w-full max-w-4xl mx-auto'>
        <h1 className='text-3xl md:text-5xl font-bold mb-3 drop-shadow-md'>
          {businessName}
        </h1>

        {template === 'business_appraisal' && (
          <h2 className='text-xl md:text-2xl font-medium mb-6 drop-shadow-sm opacity-90'>
            Business Appraisal
          </h2>
        )}

        {template === 'business_appraisal' && (
          <div className='inline-block bg-brand-primary/95 text-white px-6 py-2.5 rounded-md font-semibold text-lg md:text-xl shadow-lg'>
            {businessValue}
          </div>
        )}
      </div>
    </div>
  );
}
