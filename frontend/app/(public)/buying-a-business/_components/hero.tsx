import { ContactForm } from '@/components/landing/contact-form';
import { FormBanner } from '@/components/landing/tabbed-page/form-banner';
import type { Crumb } from '@/components/seo/breadcrumbs';
import { PINNED_ACQUISITION_LISTING_ID } from '@/data/pinned-listing';

const POINTS = [
  'Independent advice: we act for you, not the seller',
  'Access to businesses that are not on the open market',
  'Valuation and due diligence before you commit',
  'Licensed business agent, BLA 092153L',
];

export function BuyingHero({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <FormBanner
      titleId='buy-business-title'
      crumbs={crumbs}
      title='Buying a Business in Melbourne and Across Australia'
      intro='Looking to buy a business? We find, check and negotiate the right business for you, on and off market, so you buy at the right price with no surprises after settlement.'
      points={POINTS}
      primary={{ href: '#recent-acquisitions', label: 'View recent acquisitions' }}
      secondary={{
        href: `/listings/${PINNED_ACQUISITION_LISTING_ID}`,
        label: 'Exclusive $5M+ opportunities',
      }}
      form={<ContactForm lockedType='buy' headingAs='h2' />}
    />
  );
}
