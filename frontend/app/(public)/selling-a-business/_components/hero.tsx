import { ContactForm } from '@/components/landing/contact-form';
import { FormBanner } from '@/components/landing/tabbed-page/form-banner';
import type { Crumb } from '@/components/seo/breadcrumbs';

const POINTS = [
  'A free, confidential first conversation',
  'Valuation guidance grounded in real Australian sale data',
  'Buyers sign an NDA and are approved by you before seeing anything',
  'Licensed business agent, BLA 092153L',
];

export function SellingHero({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <FormBanner
      titleId='selling-business-title'
      crumbs={crumbs}
      title='Selling a Business in Melbourne and Across Australia'
      intro='Thinking it might be time to sell your business? We value it, prepare it and take it to qualified buyers privately, so you sell at the right price without anyone finding out.'
      points={POINTS}
      primary={{ href: '/business-valuation', label: 'Get a free business valuation' }}
      secondary={{ href: '/exit/sale-readiness', label: 'Is your business ready to sell?' }}
      form={<ContactForm lockedType='sell' headingAs='h2' />}
    />
  );
}
