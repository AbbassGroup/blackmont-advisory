import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { indexableGuides } from '@/lib/data/guides';
import { GuidesBanner } from './_components/banner';
import { GuideList } from './_components/guide-list';
import { IndustryLinks } from './_components/industry-links';

const TITLE = 'Guides to Selling a Business';
const DESCRIPTION =
  'Practical guides for Australian business owners considering a sale: what buyers check, how long it takes, and what the process actually involves.';

export const metadata: Metadata = buildMetadata({
  path: '/guides',
  title: `${TITLE} | Blackmont Advisory`,
  description: DESCRIPTION,
});

const CRUMBS = [
  { name: 'Home', path: '' },
  { name: TITLE, path: '/guides' },
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
      <IndustryLinks />
    </div>
  );
}
