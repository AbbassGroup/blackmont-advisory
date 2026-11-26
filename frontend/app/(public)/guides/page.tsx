import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { indexableGuides } from '@/lib/data/guides';
import { GuidesBanner } from './_components/banner';
import { GuideList } from './_components/guide-list';
import { IndustryLinks } from './_components/industry-links';
import { SaleOverview } from './_components/sale-overview';

const TITLE = 'How to Sell a Business: Guides for Owners';
const DESCRIPTION =
  'How selling a business works in Australia, stage by stage: preparation, valuation, confidential marketing, due diligence and completion, with in-depth owner guides.';

export const metadata: Metadata = buildMetadata({
  path: '/guides',
  // Distinct from /resources/guides, which is the article listing.
  title: 'How to Sell a Business in Australia: Owner Guides | Blackmont Advisory',
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: 'Selling Guides', path: '/guides' },
];

export default function GuidesIndexPage() {
  const guides = indexableGuides();

  const jsonLd = [
    breadcrumbJsonLd(CRUMBS),
    ...(guides.length
      ? [
          itemListJsonLd(
            TITLE,
            guides.map((guide) => ({
              name: guide.h1,
              description: guide.summary,
              path: `/guides/${guide.slug}`,
            })),
          ),
        ]
      : []),
  ];

  return (
    <div className='min-h-screen bg-white'>
      <JsonLd data={jsonLd} />
      <GuidesBanner title={TITLE} crumbs={CRUMBS} />
      <GuideList guides={guides} />
      <SaleOverview />
      <IndustryLinks />
    </div>
  );
}
