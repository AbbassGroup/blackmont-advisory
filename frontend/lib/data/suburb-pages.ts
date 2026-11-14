import { brokerLocationBySlug, type BrokerLocation } from '@/lib/data/broker-locations';
import type { LocationPage } from '@/lib/data/location-pages';
import { BRISBANE } from '@/lib/data/suburbs/brisbane';
import { MELBOURNE_A } from '@/lib/data/suburbs/melbourne-a';
import { MELBOURNE_B } from '@/lib/data/suburbs/melbourne-b';
import { PERTH } from '@/lib/data/suburbs/perth';
import { SYDNEY } from '@/lib/data/suburbs/sydney';
import type { SuburbEntry } from '@/lib/data/suburbs/types';

/**
 * CBD and inner-city pages under /selling-a-business/<suburb> and
 * /buying-a-business/<suburb>. They share the city pages' URL level, so a
 * suburb slug must never equal a city slug (checked below).
 *
 * A SuburbPage is a LocationPage whose `place` is the parent city, so the
 * city-page sections (overview, tips, FAQs) render it unchanged.
 */

export type SuburbPage = LocationPage & {
  suburb: { slug: string; name: string; nearby: string[] };
  keyword: string;
  imageAlt: string;
};

export const SUBURBS: SuburbEntry[] = [...MELBOURNE_A, ...MELBOURNE_B, ...SYDNEY, ...BRISBANE, ...PERTH];

function cityOf(entry: SuburbEntry): BrokerLocation {
  const city = brokerLocationBySlug(entry.city);
  if (!city) throw new Error(`Suburb "${entry.slug}" has unknown city "${entry.city}"`);
  if (brokerLocationBySlug(entry.slug)) throw new Error(`Suburb slug "${entry.slug}" clashes with a city`);
  return city;
}

function toPages(mode: 'sell' | 'buy'): SuburbPage[] {
  return SUBURBS.map((entry) => {
    const { keyword, imageAlt, ...copy } = entry[mode];
    return {
      ...copy,
      slug: entry.slug,
      place: cityOf(entry),
      suburb: { slug: entry.slug, name: entry.name, nearby: entry.nearby },
      keyword,
      imageAlt,
    };
  });
}

export const SELL_SUBURBS = toPages('sell');
export const BUY_SUBURBS = toPages('buy');

export const sellSuburbBySlug = (slug: string) => SELL_SUBURBS.find((s) => s.slug === slug);
export const buySuburbBySlug = (slug: string) => BUY_SUBURBS.find((s) => s.slug === slug);

/** Suburb pages in one city, keyed by display name (matches areaGroups). */
export function suburbHrefsFor(citySlug: string, basePath: string): Record<string, string> {
  return Object.fromEntries(
    SUBURBS.filter((s) => s.city === citySlug).map((s) => [s.name, `${basePath}/${s.slug}`]),
  );
}
