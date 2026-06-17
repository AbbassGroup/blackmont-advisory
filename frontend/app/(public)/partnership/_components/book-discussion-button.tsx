'use client';

import { Button } from '@/components/ui/button';
import { PartnershipModal } from '@/components/global/partnership-modal';

export function BookDiscussionButton() {
  return (
    <div className='flex justify-center px-6'>
      <PartnershipModal>
        <Button className='bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-7 font-bold md:text-lg shadow-[0_4px_14px_rgba(86,193,188,0.4)] hover:shadow-[0_6px_20px_rgba(86,193,188,0.6)] transition-all'>
          Book a Confidential Discussion
        </Button>
      </PartnershipModal>
    </div>
  );
}
