/**
 * Common imports for the proposal section renderers.
 *
 * Each section takes its typed `data` and an `onChange` that accepts either a
 * plain partial or an updater. Use the updater form whenever the new value is
 * derived from the old one (adding a row, editing one item in a list) so the
 * change applies to the data as it stands, not to a render-old copy.
 */

import type { SectionPatch } from '@/components/documents/types';

export type SectionChangeHandler<T> = (patch: SectionPatch<T>) => void;

export {
  makeUid,
  makeFeeOption,
  makeScorecardFactor,
  scoreScorecard,
  DEFAULT_BANNER_IMAGE,
  DEFAULT_ENGAGEMENT_BODY,
} from '../types';

export type {
  AcceptData,
  AccreditationBadge,
  AccreditationsData,
  AppraisalData,
  FeeOption,
  FeeUnit,
  FinancialOverviewData,
  InvestmentData,
  ProcessData,
  ProcessStep,
  ProposalBannerData,
  ProposalTemplate,
  ScorecardData,
  ScorecardFactor,
  TextItem,
} from '../types';
