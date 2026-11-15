import { fetchPublicBlogs } from '@/lib/blogs';
import { authorPath, fetchPublicAuthors } from '@/lib/authors';
import { indexableGuides } from '@/lib/data/guides';
import { indexableIndustryPages } from '@/lib/data/industry-benchmarks';

/**
 * /llms.txt — a plain-markdown map of the site for AI assistants and answer
 * engines (the llmstxt.org convention). It's a hint, not a ranking signal: it
 * points crawlers at the pages worth quoting and says what each one answers.
 */

const SITE_URL = 'https://blackmontadvisory.com';

// Rebuilt hourly so new articles and authors show up without a deploy.
export const revalidate = 3600;

const KEY_PAGES: [title: string, path: string, note: string][] = [
  ['Selling a business', '/selling-a-business', 'How Blackmont values, prepares and confidentially sells a business, with FAQs'],
  ['Free exit tools', '/exit', 'Free valuation, sale-readiness and exit-planning tools for business owners'],
  ['Business valuation', '/business-valuation', 'How Australian businesses are valued and what drives the multiple'],
  ['Sale readiness', '/exit/sale-readiness', 'What buyers check before making an offer'],
  ['Industry benchmarks', '/exit/industry-benchmarks', 'Typical EBITDA multiples by industry'],
  ['Exit planning', '/exit/exit-planning', 'Preparing a business for sale over 1–3 years'],
  ['Selling a business by city', '/selling-a-business/melbourne', 'City pages for Melbourne, Sydney, Brisbane and Perth, plus CBD and inner-city pages such as /selling-a-business/southbank'],
  ['Buying a business by city', '/buying-a-business/melbourne', 'City pages for Melbourne, Sydney, Brisbane and Perth, plus CBD and inner-city pages such as /buying-a-business/richmond'],
  ['Buying a business', '/buying-a-business', 'How Blackmont helps buyers find, value and negotiate a business, with FAQs'],
  ['Buy a business', '/buy-a-business', 'Businesses for sale and how to enquire under NDA'],
  ['Business brokers', '/business-brokers', 'Business brokers in Melbourne, Sydney, Brisbane and Perth, broker fees and how to choose a broker'],
  ['About us', '/about-us', 'Who Blackmont Advisory is, how we work and who we work with'],
  ['Guides', '/guides', 'In-depth guides to selling a business in Australia'],
  ['Resource guides', '/resources/guides', 'Guides published in the Resources section'],
  ['Blogs', '/resources/blogs', 'Articles on buying, selling and valuing businesses'],
  ['Case studies', '/resources/case-studies', 'Recent business acquisitions completed for clients'],
];

const line = (title: string, path: string, note?: string) =>
  `- [${title}](${SITE_URL}${path})${note ? `: ${note}` : ''}`;

export async function GET() {
  // Each live source is optional — an API outage drops its section rather
  // than failing the whole file.
  const [blogs, authors] = await Promise.all([
    fetchPublicBlogs({ page: 1, limit: 50, revalidate }).then((r) => r.blogs).catch(() => []),
    fetchPublicAuthors({ revalidate }).catch(() => []),
  ]);

  const sections: string[] = [
    '# Blackmont Advisory',
    '',
    '> Boutique Australian business brokerage and M&A advisory firm based in Toorak, Melbourne (VIC), helping owners sell — and buyers acquire — established businesses across Australia.',
    '',
    'Contact: 1300 369 474 · info@blackmontadvisory.com · 1/459 Toorak Road, Toorak VIC 3149.',
    '',
    '## Key pages',
    '',
    ...KEY_PAGES.map(([title, path, note]) => line(title, path, note)),
  ];

  const guides = indexableGuides();
  if (guides.length) {
    sections.push('', '## Guides', '', ...guides.map((g) => line(g.h1, `/guides/${g.slug}`, g.summary)));
  }

  const industries = indexableIndustryPages();
  if (industries.length) {
    sections.push('', '## Selling by industry', '', ...industries.map(({ page }) => line(page.h1, `/selling-a/${page.slug}`)));
  }

  const articles = blogs.filter((b) => b.url);
  if (articles.length) {
    sections.push('', '## Articles', '', ...articles.map((b) => line(b.title, `/resources/${b.url}`, b.metaDescription || undefined)));
  }

  if (authors.length) {
    sections.push('', '## Advisers', '', ...authors.map((a) => line(a.name, authorPath(a), a.role || undefined)));
  }

  return new Response(`${sections.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
