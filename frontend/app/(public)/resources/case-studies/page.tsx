import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { ResourceTools } from '@/components/resources/resource-tools';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { ResourcesBanner } from '../_components/banner';
import { ResourceTabs } from '../_components/resource-tabs';
import { BlogSection } from '../_components/blog-section';
import { loadResourceTab, pagedCanonical, toPageNumber } from '../_components/load-tab';

const PATH = '/resources/case-studies';

type CaseStudiesPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: CaseStudiesPageProps): Promise<Metadata> {
  const page = toPageNumber((await searchParams).page);
  return buildMetadata({
    path: pagedCanonical(PATH, page),
    title: `Business Sale Case Studies${page > 1 ? ` – Page ${page}` : ''} | Blackmont Advisory`,
    description:
      'Business sale case studies from Blackmont Advisory: how we have helped Australian owners sell their businesses and buyers acquire the right one.',
  });
}

/** Case studies are published from the admin Blogs section with the type "Case study". */
export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const page = toPageNumber((await searchParams).page);
  const { blogs, totalPages, failed } = await loadResourceTab('case-study', page);

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'Case Studies', path: PATH },
    ]),
    ...(blogs.length
      ? [
          itemListJsonLd(
            'Blackmont Advisory case studies',
            blogs
              .filter((study) => study.url)
              .map((study) => ({
                name: study.title,
                description: study.metaDescription,
                path: `/resources/${study.url}`,
              })),
          ),
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ResourcesBanner
        title='Business Sale Case Studies'
        intro='Real business sales and acquisitions we have worked on: who the client was, what they wanted, and how the deal came together, with confidential details left out.'
      />
      <ResourceTabs active='case-studies' />
      <BlogSection
        blogs={blogs}
        page={page}
        totalPages={totalPages}
        failed={failed}
        heading='Business sale case studies'
        basePath={PATH}
        noun='case studies'
      />
      <ResourceTools id='resource-tools' heading='Resource tools' headingId='resource-tools-title' />
    </>
  );
}
