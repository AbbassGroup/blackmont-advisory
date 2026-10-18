import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { SellingBanner } from './_components/banner';
import { IndustryMultiples } from './_components/industry-multiples';
import { SizeMultiples } from './_components/size-multiples';
import { ReadingTheNumbers } from './_components/reading-the-numbers';
import { indexableIndustryPages } from '@/lib/data/industry-benchmarks';
const TITLE = 'What Businesses Sell For in Australia';
const DESCRIPTION =
  'Typical EBITDA multiples, sale price ranges and time to sell across ten Australian SME sectors, plus how the multiple changes with the size of the business.';

export const metadata: Metadata = buildMetadata({
  path: '/selling-a',
  title: `${TITLE} | Blackmont Advisory`,
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: TITLE, path: '/selling-a' },
];

export default function SellingIndexPage() {
  const linkable = new Map(
    indexableIndustryPages().map(({ name, page }) => [name, page]),
  );

  const jsonLd = [
    breadcrumbJsonLd(CRUMBS),
    ...(linkable.size
      ? [
          itemListJsonLd(
            'Selling a business by industry',
            indexableIndustryPages().map(({ name, page }) => ({
              name: page.h1,
              description: `What ${name.toLowerCase()} businesses sell for in Australia.`,
              path: `/selling-a/${page.slug}`,
            })),
          ),
        ]
      : []),
  ];

  return (
    <div className='min-h-screen bg-background'>
      <JsonLd data={jsonLd} />

      <SellingBanner title={TITLE} crumbs={CRUMBS} />

      <IndustryMultiples />

      <SizeMultiples />

      <ReadingTheNumbers />
    </div>
  );
}
