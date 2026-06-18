'use client';

import { memo } from 'react';
import { SectionShell } from './section-chrome';
import { BannerSection } from './sections/banner-section';
import { ConfidentialitySection } from './sections/confidentiality-section';
import { WelcomeSection } from './sections/welcome-section';
import { AboutSection } from './sections/about-section';
import { HoursSection } from './sections/hours-section';
import { ProcessSection } from './sections/process-section';
import { MakeOfferSection } from './sections/makeoffer-section';
import { KeyContactsSection } from './sections/keycontacts-section';
import { ReviewsSection } from './sections/reviews-section';
import { SocialsSection } from './sections/socials-section';
import { OwnershipSection } from './sections/ownership-section';
import { HighlightsSection } from './sections/highlights-section';
import { ChartsSection } from './sections/charts-section';
import { CustomSection } from './sections/custom-section';
import { getSectionMeta } from './types';
import type {
  BannerData,
  ChartsData,
  CustomData,
  HoursData,
  HighlightsData,
  ImSection,
  MakeOfferData,
  OwnershipData,
  SocialsData,
} from './types';

/** Stable DOM anchor id for a section (used by the preview scroll-spy nav). */
export function sectionAnchorId(section: ImSection, index: number): string {
  return `im-${section.uid || section._id || index}`;
}

/** Nav entries for the preview sidebar: enabled, in-nav sections only. The label
 * follows the section's own editable title when it has one, so renaming a
 * section inline updates the sidebar too. */
export function getNavItems(sections: ImSection[]) {
  return sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.enabled !== false && getSectionMeta(section.type)?.inNav)
    .map(({ section, index }) => {
      const title = section.data?.title;
      const label =
        typeof title === 'string' && title.trim()
          ? title
          : (getSectionMeta(section.type)?.label ?? section.type);
      return { id: sectionAnchorId(section, index), label };
    });
}

interface ImDocumentProps {
  sections: ImSection[];
  editable?: boolean;
  /** Called with the section's index in the full array and a data patch. */
  onSectionChange?: (index: number, patch: Record<string, unknown>) => void;
  /** Broker shown in Welcome / Process (chosen in Settings). */
  brokerEmail?: string;
  /** Uploads a file (e.g. a custom section's PDF) and returns its URL. */
  onUploadFile?: (file: File) => Promise<string | null>;
  /** Persist immediately (used after a custom section's PDF upload/remove). */
  onCommit?: () => void;
}

function ImDocumentImpl({
  sections,
  editable = false,
  onSectionChange,
  brokerEmail,
  onUploadFile,
  onCommit,
}: ImDocumentProps) {
  // Business name lives on the banner; the offer form emails it for context.
  const businessName =
    (sections.find((s) => s.type === 'banner')?.data?.businessName as string) || '';

  // Alternate band backgrounds across the non-banner sections, like the site.
  const toneByIndex = sections.reduce<Record<number, 'white' | 'offwhite'>>((acc, section, index) => {
    if (section.enabled === false || section.type === 'banner') return acc;
    return { ...acc, [index]: Object.keys(acc).length % 2 === 0 ? 'white' : 'offwhite' };
  }, {});

  return (
    <>
      {sections.map((section, index) => {
        if (section.enabled === false) return null;
        const key = section.uid || section._id || `${section.type}-${index}`;
        const onChange = (patch: Record<string, unknown>) => onSectionChange?.(index, patch);

        if (section.type === 'banner') {
          return (
            <BannerSection
              key={key}
              data={section.data as unknown as BannerData}
              editable={editable}
              onChange={onChange}
              onUploadFile={onUploadFile}
              onCommit={onCommit}
            />
          );
        }

        const id = sectionAnchorId(section, index);
        const tone = toneByIndex[index];

        const inner = (() => {
          switch (section.type) {
            case 'confidentiality':
              return <ConfidentialitySection />;
            case 'welcome':
              return (
                <WelcomeSection
                  brokerEmail={brokerEmail}
                  title={(section.data?.title as string) ?? 'Welcome Message'}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'about':
              return (
                <AboutSection
                  title={(section.data?.title as string) ?? 'About ABBASS'}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'hours':
              return (
                <HoursSection
                  data={section.data as unknown as HoursData}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'process':
              return (
                <ProcessSection
                  brokerEmail={brokerEmail}
                  title={(section.data?.title as string) ?? 'The Process'}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'makeoffer':
              return (
                <MakeOfferSection
                  data={section.data as unknown as MakeOfferData}
                  editable={editable}
                  onChange={onChange}
                  brokerEmail={brokerEmail}
                  businessName={businessName}
                />
              );
            case 'keycontacts':
              return (
                <KeyContactsSection
                  title={(section.data?.title as string) ?? 'Key Contacts'}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'reviews':
              return (
                <ReviewsSection
                  title={(section.data?.title as string) ?? 'Reviews'}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'socials':
              return (
                <SocialsSection
                  data={section.data as unknown as SocialsData}
                  editable={editable}
                  onChange={onChange}
                  onCommit={onCommit}
                />
              );
            case 'ownership':
              return (
                <OwnershipSection
                  data={section.data as unknown as OwnershipData}
                  editable={editable}
                  onChange={onChange}
                />
              );
            case 'highlights':
              return (
                <HighlightsSection
                  data={section.data as unknown as HighlightsData}
                  editable={editable}
                  onChange={onChange}
                  onCommit={onCommit}
                />
              );
            case 'charts':
              return (
                <ChartsSection
                  data={section.data as unknown as ChartsData}
                  editable={editable}
                  onChange={onChange}
                  onCommit={onCommit}
                />
              );
            case 'custom':
              return (
                <CustomSection
                  data={section.data as unknown as CustomData}
                  editable={editable}
                  onChange={onChange}
                  onUploadFile={onUploadFile}
                  onCommit={onCommit}
                />
              );
            default:
              return null;
          }
        })();

        return (
          <SectionShell key={key} id={id} tone={tone}>
            {inner}
          </SectionShell>
        );
      })}

      {/* Proprietary copyright notice — shown at the bottom of every memorandum */}
      <footer className="border-t border-gray-100 bg-white px-8 py-6 sm:px-12">
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-gray-400">
          © ABBASS Business Brokers. All rights reserved. The content, format, structure, templates,
          and presentation style of this Information Memorandum are proprietary to ABBASS Business
          Brokers and may not be copied, reproduced, or used without prior written consent.
        </p>
      </footer>
    </>
  );
}

// Memoised so scroll-spy state changes in the reader don't re-render the whole
// document (and any PDF canvases) while scrolling.
export const ImDocument = memo(ImDocumentImpl);
