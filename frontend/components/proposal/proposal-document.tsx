'use client';

import { memo, type ReactNode, type Ref } from 'react';
import { format } from 'date-fns';
import { ChartsSection } from '@/components/im/sections/charts-section';
import { CustomSection } from '@/components/im/sections/custom-section';
import type { ChartsData, CustomData } from '@/components/im';
import type { DocSection, SectionPatch } from '@/components/documents/types';
import { ProposalBannerSection } from './sections/banner-section';
import { DisclaimerSection } from './sections/disclaimer-section';
import { ScorecardSection } from './sections/scorecard-section';
import { FinancialOverviewSection } from './sections/financial-overview-section';
import { AppraisalSection } from './sections/appraisal-section';
import { InvestmentSection } from './sections/investment-section';
import { AcceptSection } from './sections/accept-section';
import { AccreditationsSection } from './sections/accreditations-section';
import { ProposalProcessSection } from './sections/process-section';
import { ProposalAboutSection } from './sections/about-section';
import { ProposalContactSection } from './sections/contact-section';
import { getProposalSectionMeta } from './types';
import type {
  AcceptData,
  AccreditationsData,
  AppraisalData,
  FeeOption,
  FinancialOverviewData,
  InvestmentData,
  ProcessData,
  ProposalBannerData,
  ProposalTemplate,
  ScorecardData,
} from './types';

/** Cover date, e.g. "06 August 2026". Blank when the document has no date yet. */
function formatPreparedOn(iso?: string | null): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : format(date, 'dd MMMM yyyy');
}

/** Stable DOM anchor id for a section. */
export function proposalAnchorId(section: DocSection, index: number): string {
  return `proposal-${section.uid || section._id || index}`;
}

/** Customer-facing behaviour. Absent in the admin editor. */
export interface ProposalInteraction {
  selectedAdvertisement?: FeeOption | null;
  onSelectAdvertisement?: (option: FeeOption) => void;
  selectedSuccessFee?: FeeOption | null;
  onSelectSuccessFee?: (option: FeeOption) => void;
  onAccept?: () => void;
  accepting?: boolean;
  acceptError?: string;
  /** Scrolled into view when the customer accepts without choosing an option. */
  investmentRef?: Ref<HTMLDivElement>;
  /** With one option there is nothing to choose, so the tick is hidden. */
  hideSelectionIfSingle?: boolean;
}

/** Fields the sections need that live on the document rather than a section. */
export interface ProposalDocumentContext {
  template: ProposalTemplate;
  brokerName: string;
  customerName: string;
  businessName: string;
  businessValue: string;
  /** ISO timestamp shown on the cover — approval date, else creation date. */
  preparedOn?: string | null;
}

export interface ProposalDocumentProps {
  sections: DocSection[];
  context: ProposalDocumentContext;
  editable?: boolean;
  onSectionChange?: (index: number, patch: SectionPatch) => void;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
  interaction?: ProposalInteraction;
  /** Tailwind classes for the container wrapping every non-cover section. */
  contentClassName?: string;
  /** Start each section on a fresh printed page. */
  pageBreakPerSection?: boolean;
}

function ProposalDocumentImpl({
  sections,
  context,
  editable = false,
  onSectionChange,
  onUploadFile,
  onCommit,
  interaction,
  contentClassName = 'mx-auto max-w-[1260px] px-6 lg:px-8',
  pageBreakPerSection = false,
}: ProposalDocumentProps) {
  const renderSection = (section: DocSection, index: number): ReactNode => {
    const onChange = (patch: SectionPatch) => onSectionChange?.(index, patch);
    const data = section.data ?? {};

    switch (section.type) {
      case 'banner':
        return (
          <ProposalBannerSection
            data={data as unknown as ProposalBannerData}
            template={context.template}
            brokerName={context.brokerName}
            customerName={context.customerName}
            preparedOn={formatPreparedOn(context.preparedOn)}
            editable={editable}
            onChange={onChange}
            onUploadFile={onUploadFile}
            onCommit={onCommit}
          />
        );

      // Fixed content — rendered from `fixed-content.ts`, not from section data.
      case 'disclaimer':
        return (
          <DisclaimerSection showTitle={context.template === 'business_appraisal'} />
        );

      case 'scorecard':
        return (
          <ScorecardSection
            data={data as unknown as ScorecardData}
            editable={editable}
            onChange={onChange}
            onUploadFile={onUploadFile}
            onCommit={onCommit}
          />
        );

      case 'financialOverview':
        return (
          <FinancialOverviewSection
            data={data as unknown as FinancialOverviewData}
            editable={editable}
            onChange={onChange}
          />
        );

      case 'appraisal':
        return (
          <AppraisalSection
            data={data as unknown as AppraisalData}
            businessName={context.businessName}
            businessValue={context.businessValue}
            brokerName={context.brokerName}
            editable={editable}
            onChange={onChange}
          />
        );

      case 'investment':
        return (
          <InvestmentSection
            ref={interaction?.investmentRef}
            data={data as unknown as InvestmentData}
            editable={editable}
            onChange={onChange}
            selectedAdvertisement={interaction?.selectedAdvertisement}
            onSelectAdvertisement={interaction?.onSelectAdvertisement}
            selectedSuccessFee={interaction?.selectedSuccessFee}
            onSelectSuccessFee={interaction?.onSelectSuccessFee}
            hideSelectionIfSingle={interaction?.hideSelectionIfSingle}
          />
        );

      case 'accept':
        return (
          <AcceptSection
            data={data as unknown as AcceptData}
            editable={editable}
            onChange={onChange}
            onAccept={interaction?.onAccept}
            accepting={interaction?.accepting}
            acceptError={interaction?.acceptError}
          />
        );

      case 'accreditations':
        return (
          <AccreditationsSection
            data={data as unknown as AccreditationsData}
            editable={editable}
            onChange={onChange}
            onUploadFile={onUploadFile}
            onCommit={onCommit}
          />
        );

      case 'process':
        return (
          <ProposalProcessSection
            data={data as unknown as ProcessData}
            editable={editable}
            onChange={onChange}
          />
        );

      case 'about':
        return <ProposalAboutSection />;

      case 'contact':
        return <ProposalContactSection />;

      // Shared with the Information Memorandum engine — the whole block system
      // (text, tables, buttons, photos, video, PDF) and the chart builder.
      case 'custom':
        return (
          <div className='py-8'>
            <CustomSection
              data={data as unknown as CustomData}
              editable={editable}
              onChange={onChange}
              onUploadFile={onUploadFile}
              onCommit={onCommit}
            />
          </div>
        );

      case 'charts':
        return (
          <div className='py-8'>
            <ChartsSection
              data={data as unknown as ChartsData}
              editable={editable}
              onChange={onChange}
              onCommit={onCommit}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // The cover is full-bleed; everything else shares one container so the
  // sections' vertical margins collapse the way they did before the engine.
  const groups: { full: boolean; items: { section: DocSection; index: number }[] }[] = [];
  // Counted across groups so the first rendered section doesn't open with a
  // page break and leave a blank sheet.
  let rendered = 0;
  sections.forEach((section, index) => {
    if (section.enabled === false) return;
    const full = section.type === 'banner';
    const last = groups[groups.length - 1];
    if (last && last.full === full) last.items.push({ section, index });
    else groups.push({ full, items: [{ section, index }] });
  });

  return (
    <>
      {groups.map((group, gi) => {
        const items = group.items.map(({ section, index }) => {
          const first = rendered === 0;
          rendered += 1;
          // A single-element section (the Accept button) would otherwise claim a
          // sheet of its own that is almost entirely whitespace.
          const breaks =
            pageBreakPerSection &&
            !first &&
            !getProposalSectionMeta(section.type)?.noPageBreak;
          return (
            <div
              key={section.uid || section._id || index}
              id={proposalAnchorId(section, index)}
              data-proposal-section={section.type}
              className={breaks ? 'break-before-page' : undefined}
              // Only a section that opens a sheet should lose its top margin.
              data-page-start={
                pageBreakPerSection && (first || breaks) ? 'true' : undefined
              }
            >
              {renderSection(section, index)}
            </div>
          );
        });
        return group.full ? (
          <div key={`g${gi}`}>{items}</div>
        ) : (
          <div key={`g${gi}`} className={contentClassName}>
            {items}
          </div>
        );
      })}
    </>
  );
}

/**
 * Renders a Digital Proposal from its section list — editable in the admin, read-only (with fee selection and acceptance) for the customer.
 */
export const ProposalDocument = memo(ProposalDocumentImpl);
