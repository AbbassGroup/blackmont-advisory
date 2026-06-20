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
        {template === 'business_appraisal' && (
          <p className='mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.24em] text-accent drop-shadow-sm'>
            Business Appraisal
          </p>
        )}

        <h1 className='text-3xl md:text-5xl font-bold mb-5 drop-shadow-md'>
          {businessName}
        </h1>

        {template === 'business_appraisal' && (
          <div className='inline-block bg-accent text-primary px-7 py-2.5 font-semibold text-lg md:text-xl shadow-lg'>
            {businessValue}
          </div>
        )}
      </div>
    </div>
  );
}
