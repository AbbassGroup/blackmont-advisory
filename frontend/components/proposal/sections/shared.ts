/** Common imports for the proposal section renderers. */

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
