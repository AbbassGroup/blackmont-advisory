import type { CityLink } from '@/components/landing/location-page/sections';
import { CAFE_OR_RESTAURANT } from './cafe-or-restaurant';
import { TRADES_BUSINESS } from './trades-business';
import { RETAIL_BUSINESS } from './retail-business';
import { PROFESSIONAL_SERVICES_FIRM } from './professional-services-firm';
import { ALLIED_HEALTH_PRACTICE } from './allied-health-practice';
import { MANUFACTURING_BUSINESS } from './manufacturing-business';
import { ECOMMERCE_BUSINESS } from './ecommerce-business';
import { CHILDCARE_CENTRE } from './childcare-centre';
import { TRANSPORT_LOGISTICS_BUSINESS } from './transport-logistics-business';
import { HAIR_AND_BEAUTY_SALON } from './hair-and-beauty-salon';
import {
  INDUSTRY_STATES,
  type IndustryState,
  type IndustryStateCopy,
  type IndustryStateSet,
} from './types';

export { INDUSTRY_STATES } from './types';
export type { IndustryState, IndustryStateCopy, IndustryStateSlug } from './types';

/** Industry page slug → its state pages. Add an industry here once its copy is written. */
const BY_INDUSTRY: Record<string, IndustryStateSet> = {
  'cafe-or-restaurant': CAFE_OR_RESTAURANT,
  'trades-business': TRADES_BUSINESS,
  'retail-business': RETAIL_BUSINESS,
  'professional-services-firm': PROFESSIONAL_SERVICES_FIRM,
  'allied-health-practice': ALLIED_HEALTH_PRACTICE,
  'manufacturing-business': MANUFACTURING_BUSINESS,
  'ecommerce-business': ECOMMERCE_BUSINESS,
  'childcare-centre': CHILDCARE_CENTRE,
  'transport-logistics-business': TRANSPORT_LOGISTICS_BUSINESS,
  'hair-and-beauty-salon': HAIR_AND_BEAUTY_SALON,
};

/** "Selling a Café or Restaurant in Australia" → "Café or Restaurant". */
export const industryLabel = (h1: string) => h1.replace(/^Selling an? /, '').replace(/ in Australia$/, '');

export const aOrAn = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

export const stateBySlug = (slug: string) => INDUSTRY_STATES.find((s) => s.slug === slug);

export function industryStateCopy(industry: string, state: string): { state: IndustryState; copy: IndustryStateCopy } | undefined {
  const meta = stateBySlug(state);
  const copy = meta && BY_INDUSTRY[industry]?.[meta.slug];
  return meta && copy ? { state: meta, copy } : undefined;
}

/** Every (industry, state) pair that has copy, for generateStaticParams and the sitemap. */
export function industryStateParams(): { industry: string; state: string }[] {
  return Object.entries(BY_INDUSTRY).flatMap(([industry, set]) =>
    INDUSTRY_STATES.filter((s) => set[s.slug]).map((s) => ({ industry, state: s.slug })),
  );
}

/** State cards for an industry, in the CityLinks shape. `label` is e.g. "Café or Restaurant". */
export function industryStateLinks(industry: string, label: string, exclude?: string): CityLink[] {
  const set = BY_INDUSTRY[industry];
  if (!set) return [];
  return INDUSTRY_STATES.filter((s) => set[s.slug] && s.slug !== exclude).map((s) => ({
    href: `/selling-a/${industry}/${s.slug}`,
    city: s.name,
    state: s.city,
    stateAbbr: s.abbr,
    outline: s.name,
    cta: `Selling ${aOrAn(label)} ${label.toLowerCase()} in ${s.abbr}`,
  }));
}
