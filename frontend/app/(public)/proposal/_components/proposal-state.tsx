import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { LandingButtonLink, LandingContainer, LandingTextLink } from '@/components/landing/presentation';

export function ProposalLoading({ message = 'Loading your business appraisal...' }: { message?: string }) {
  return (
    <LandingContainer className='flex min-h-[50vh] items-center justify-center py-14'>
      <div role='status' className='flex flex-col items-center gap-4 text-center text-midnight'>
        <Loader2 aria-hidden='true' className='size-7 animate-spin motion-reduce:animate-none' />
        <p className='m-0 text-base leading-[1.8]'>{message}</p>
      </div>
    </LandingContainer>
  );
}

export function ProposalNotice({ title, detail }: { title: string; detail?: string }) {
  return (
    <LandingContainer className='max-w-[860px] py-14 min-[681px]:py-16 min-[1121px]:py-20'>
      <section role='alert' className='bg-canvas p-6 text-midnight min-[681px]:p-10'>
        <AlertCircle aria-hidden='true' className='mb-5 size-7' />
        <h1 className='m-0 font-advisory-heading text-[30px] leading-[1.3] font-bold tracking-normal min-[681px]:text-[38px]'>{title}</h1>
        {detail && <p className='mt-5 mb-0 max-w-[65ch] text-base leading-[1.8] text-ink'>{detail}</p>}
        <LandingTextLink href='mailto:info@blackmontadvisory.com' className='mt-6 inline-block break-all'>
          info@blackmontadvisory.com
        </LandingTextLink>
      </section>
    </LandingContainer>
  );
}

export function ProposalSuccessPage({ businessName }: { businessName?: string }) {
  return (
    <LandingContainer className='max-w-[860px] py-14 min-[681px]:py-16 min-[1121px]:py-20'>
      <section role='status' className='bg-canvas p-6 text-midnight min-[681px]:p-10'>
        <CheckCircle2 aria-hidden='true' className='mb-5 size-8' />
        <h1 className='m-0 font-advisory-heading text-[34px] leading-[1.3] font-bold tracking-normal min-[681px]:text-[44px]'>Thank you!</h1>
        <p className='mt-5 mb-0 max-w-[65ch] text-base leading-[1.8] text-ink'>
          Your agreement for {businessName || 'your business'} will be prepared shortly.
        </p>
        <p className='mt-6 mb-2 text-sm font-medium'>Questions?</p>
        <LandingTextLink href='mailto:info@blackmontadvisory.com' className='inline-block break-all'>
          info@blackmontadvisory.com
        </LandingTextLink>
        <div className='mt-8'><LandingButtonLink href='/' variant='outline' size='compact'>Back to home</LandingButtonLink></div>
      </section>
    </LandingContainer>
  );
}
