'use client';

import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Plus,
  Landmark,
  Image as ImageIcon,
  ShieldAlert,
  MessageSquareQuote,
  Building2,
  ListChecks,
  HandCoins,
  Contact,
  Star,
  Share2,
  Users,
  Sparkles,
  BarChart3,
  FileText,
  Clock,
  LayoutList,
  BadgeCheck,
  ScrollText,
  Coins,
  Gauge,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  canRemoveSection,
  findSectionMeta,
  type DocSection,
  type DocSectionMeta,
} from './types';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // Information Memorandum / Acquisition Report
  banner: ImageIcon,
  confidentiality: ShieldAlert,
  welcome: MessageSquareQuote,
  about: Building2,
  hours: Clock,
  process: ListChecks,
  makeoffer: HandCoins,
  keycontacts: Contact,
  reviews: Star,
  socials: Share2,
  ownership: Users,
  highlights: Sparkles,
  charts: BarChart3,
  custom: FileText,
  // Digital Proposal
  disclaimer: ScrollText,
  financialOverview: Coins,
  scorecard: Gauge,
  appraisal: BadgeCheck,
  investment: HandCoins,
  accept: CheckCircle2,
  accreditations: Star,
  contact: Mail,
};

const SECTION_ACTION_CLASS =
  'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-30';

/** Reorder, show, duplicate, remove and add document sections. */
export function SectionsPanel({
  sections,
  registry,
  onMove,
  onToggle,
  onRemove,
  onDuplicate,
  onAdd,
}: {
  sections: DocSection[];
  registry: DocSectionMeta[];
  onMove: (index: number, dir: -1 | 1) => void;
  onToggle: (index: number) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
  onAdd: (type: string) => void;
}) {
  const present = new Set(sections.map((section) => section.type));
  const addable = registry.filter((meta) => !meta.singleton || !present.has(meta.type));

  return (
    <div className='flex min-w-0 flex-col gap-8'>
      <ul className='m-0 flex list-none flex-col divide-y divide-advisory-rule border-y border-advisory-rule p-0'>
        {sections.map((section, index) => {
          const meta = findSectionMeta(registry, section.type);
          const enabled = section.enabled !== false;
          const removable = canRemoveSection(registry, sections, index);
          const fixed = Boolean(meta?.fixed);
          const dataTitle = typeof section.data?.title === 'string' && section.data.title.trim() ? section.data.title : null;
          const label = dataTitle ?? meta?.label ?? section.type;

          return (
            <li key={section.uid || section._id || index} className={cn('flex min-w-0 items-center gap-3 py-3', enabled ? 'bg-white' : 'bg-canvas')}>
                <div role='group' aria-label={`Position of ${label}`} className='flex shrink-0 flex-col'>
                  <button type='button' onClick={() => onMove(index, -1)} disabled={index === 0} className={cn(SECTION_ACTION_CLASS, 'size-6')} title='Move up' aria-label={`Move ${label} up`}>
                    <ChevronUp aria-hidden='true' className='size-4' />
                  </button>
                  <button type='button' onClick={() => onMove(index, 1)} disabled={index === sections.length - 1} className={cn(SECTION_ACTION_CLASS, 'size-6')} title='Move down' aria-label={`Move ${label} down`}>
                    <ChevronDown aria-hidden='true' className='size-4' />
                  </button>
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='m-0 break-words text-sm leading-[1.5] font-medium text-midnight'>
                    {label}
                    {fixed && <span title='Fixed wording. You can change its position and visibility.' className='ml-1.5 inline-flex align-middle'><Landmark aria-hidden='true' className='size-3.5 text-ink/60' /><span className='sr-only'>Fixed wording. You can change its position and visibility.</span></span>}
                  </p>
                  {!enabled && <p className='mt-1 mb-0 text-xs text-ink'>Hidden</p>}
                </div>
                <div role='group' aria-label={`Actions for ${label}`} className='flex shrink-0 items-center'>
                  <label title={enabled ? 'Hide section' : 'Show section'} className='flex h-8 w-12 shrink-0 cursor-pointer items-center justify-center'>
                    <Switch checked={enabled} onCheckedChange={() => onToggle(index)} aria-label={`Show ${label}`} className='shadow-none after:inset-0 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt' />
                  </label>
                  <button type='button' onClick={() => onDuplicate(index)} className={SECTION_ACTION_CLASS} title='Duplicate section' aria-label={`Duplicate ${label}`}>
                    <Copy aria-hidden='true' className='size-4' />
                  </button>
                  <button
                    type='button'
                    onClick={() => onRemove(index)}
                    disabled={!removable}
                    className={cn(SECTION_ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')}
                    title={removable ? 'Remove section' : `At least one ${meta?.label ?? section.type} is required`}
                    aria-label={`Remove ${label}`}
                  >
                    <Trash2 aria-hidden='true' className='size-4' />
                  </button>
                </div>
            </li>
          );
        })}
      </ul>

      <section aria-labelledby='add-section-title' className='flex min-w-0 flex-col gap-3'>
        <h3 id='add-section-title' className='m-0 text-base font-semibold text-midnight'>Add a section</h3>
        {addable.length === 0 ? (
          <p className='m-0 text-sm leading-[1.75] text-ink'>All available sections have been added.</p>
        ) : (
          <ul className='m-0 flex list-none flex-col divide-y divide-advisory-rule border-y border-advisory-rule p-0'>
            {addable.map((meta) => {
              const Icon = ICONS[meta.type] ?? LayoutList;
              return (
                <li key={meta.type}>
                  <button type='button' onClick={() => onAdd(meta.type)} className='flex min-h-12 w-full cursor-pointer items-start gap-3 bg-white px-1 py-3 text-left text-midnight transition-colors duration-150 hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'>
                    <Icon className='mt-0.5 size-4 shrink-0' />
                    <span className='min-w-0 flex-1'>
                      <span className='block text-sm leading-[1.65] font-semibold'>{meta.label}</span>
                      <span className='mt-1 block text-xs leading-[1.75] text-ink'>{meta.description}</span>
                    </span>
                    <Plus aria-hidden='true' className='mt-0.5 size-4 shrink-0' />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
