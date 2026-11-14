import type { LocationPageCopy } from '@/lib/data/location-pages';

/**
 * Copy for one suburb page (/selling-a-business/<slug> or /buying-a-business/<slug>).
 * Same fields as a city page, plus the one keyword the page is built around
 * and the alt text for the banner photo.
 */
export type SuburbCopy = Omit<LocationPageCopy, 'slug'> & {
  /** The page's main search phrase, e.g. "sell a business Southbank". */
  keyword: string;
  /** Alt text for the banner photo; includes the keyword. */
  imageAlt: string;
};

export type SuburbEntry = {
  /** URL segment, e.g. 'southbank'. Must not clash with a city slug. */
  slug: string;
  /** Display name. Must match the name in the city's areaGroups, e.g. 'Melbourne CBD'. */
  name: string;
  /** Slug of the parent city in BROKER_LOCATIONS. */
  city: 'melbourne' | 'sydney' | 'brisbane' | 'perth';
  /** Slugs of 3–4 nearby suburbs in the same city that also have pages. */
  nearby: string[];
  sell: SuburbCopy;
  buy: SuburbCopy;
};
