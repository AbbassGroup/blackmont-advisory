import { LandingButton } from '@/components/landing/presentation';
import { PartnershipModal } from '@/components/global/partnership-modal';

export function BookDiscussionButton() {
  return (
    <PartnershipModal>
      <LandingButton variant='outline' className='max-w-full'>
        Book a confidential discussion
      </LandingButton>
    </PartnershipModal>
  );
}
