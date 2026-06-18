'use client';

import { Button } from '@/components/ui/button';
import { PartnershipModal } from '@/components/global/partnership-modal';

export function BookDiscussionButton() {
  return (
    <div className='flex justify-center px-6'>
      <PartnershipModal>
        <Button className='h-auto rounded-none bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'>
          Book a Confidential Discussion
        </Button>
      </PartnershipModal>
    </div>
  );
}
