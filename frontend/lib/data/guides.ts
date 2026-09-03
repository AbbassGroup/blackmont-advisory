export interface Guide {
  slug: string;
  h1: string;
  pageTitle: string;
  metaDescription: string;
  summary: string;
  reviewed: boolean;
}

export const GUIDES: Guide[] = [
  {
    slug: 'is-my-business-ready-to-sell',
    h1: 'Is My Business Ready to Sell?',
    pageTitle: 'Is My Business Ready to Sell?',
    metaDescription:
      'The ten things buyers check before making an offer on an Australian business, what a weak answer looks like against a strong one, and where owners lose value.',
    summary:
      'The ten things buyers check before they make an offer, and what a strong answer looks like.',
    reviewed: true,
  },
  {
    slug: 'how-long-does-it-take-to-sell-a-business',
    h1: 'How Long Does It Take to Sell a Business?',
    pageTitle: 'How Long Does It Take to Sell a Business in Australia?',
    metaDescription:
      'How long it takes to sell a business in Australia, by industry, plus the preparation timeline before you list and what actually causes delays.',
    summary:
      'Time to sell by industry, the preparation timeline before listing, and what causes delays.',
    reviewed: true,
  },
  {
    slug: 'how-to-sell-a-business-confidentially',
    h1: 'How to Sell a Business Confidentially',
    pageTitle: 'How to Sell a Business Confidentially in Australia',
    metaDescription:
      'How to sell a business without staff, customers or competitors finding out. What actually leaks, how a confidential sale is controlled, and when to tell your team.',
    summary:
      'What actually leaks, how a confidential sale is controlled, and when to tell your team.',
    reviewed: true,
  },
];

export function indexableGuides() {
  return GUIDES.filter((guide) => guide.reviewed);
}

export function guideBySlug(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
