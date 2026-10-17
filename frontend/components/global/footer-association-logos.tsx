import Image from 'next/image';
import aibbLogo from '@/public/aibb-logo.png';
import reivLogo from '@/public/reiv.png';

export function FooterAssociationLogos() {
  return (
    <div className='flex w-fit max-w-full flex-wrap items-center gap-x-5 gap-y-3 px-3 py-2.5'>
      <Image
        src={aibbLogo}
        alt='AIBB — Australian Institute of Business Brokers'
        unoptimized
        className='block h-auto w-[150px] max-w-full shrink-0 object-contain'
      />
      <Image
        src={reivLogo}
        alt='REIV'
        unoptimized
        className='block h-auto w-20 max-w-full shrink-0 object-contain'
      />
    </div>
  );
}
