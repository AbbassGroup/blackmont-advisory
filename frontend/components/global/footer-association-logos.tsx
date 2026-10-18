import Image from 'next/image';
import aibbLogo from '@/public/aibb-logo.png';
import reivLogo from '@/public/reiv.png';

export function FooterAssociationLogos() {
  return (
    <div className='grid aspect-[458/119] w-[380px] max-w-full grid-cols-[1.3fr_1fr] overflow-hidden border-b-[6px] border-gilt bg-white'>
      <div className='relative flex min-h-0 min-w-0 items-center justify-center px-[10%]'>
        <Image
          src={aibbLogo}
          alt='AIBB — Australian Institute of Business Brokers'
          unoptimized
          className='block h-auto w-full object-contain'
        />
        <span aria-hidden='true' className='absolute inset-y-[16%] right-0 w-px bg-midnight' />
      </div>
      <div className='relative min-h-0 min-w-0'>
        <Image
          src={reivLogo}
          alt='REIV'
          unoptimized
          fill
          className='object-contain px-[10%] py-[3%]'
        />
      </div>
    </div>
  );
}
