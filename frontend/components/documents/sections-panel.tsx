'use client';

import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Plus,
  Lock,
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

/**
 * The Sections drawer: reorder, hide, duplicate, remove and add.
 *
 * Sections marked `locked` in the registry can be edited and hidden but not
 * removed, duplicated, or moved — a Digital Proposal's cover and fee options
 * carry the values that end up in the signed agreement. Sections with a
 * `minCount` are freely placeable but cannot all be deleted, and `fixed` ones
 * are placeable but have no editable content.
 */
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
  // A singleton type already in the document can't be added again.
  const present = new Set(sections.map((s) => s.type));
  const addable = registry.filter(
    (m) => !m.locked && (!m.singleton || !present.has(m.type)),
  );

  return (
    <div className="space-y-6">
      <ul className="space-y-2">
        {sections.map((section, index) => {
          const meta = findSectionMeta(registry, section.type);
          const Icon = ICONS[section.type] ?? LayoutList;
          const enabled = section.enabled !== false;
          const locked = !!meta?.locked;
          const removable = canRemoveSection(registry, sections, index);
          const fixed = !!meta?.fixed;
          // Show the section's own (edited) title when it has one, e.g. a custom
          // section renamed to "Business Overview" — otherwise the registry label.
          const dataTitle =
            typeof section.data?.title === 'string' && section.data.title.trim()
              ? section.data.title
              : null;
          const label = dataTitle ?? meta?.label ?? section.type;
          return (
            <li
              key={section.uid || section._id || index}
              className="flex items-center gap-3 border border-border bg-card p-3"
            >
              <div className="flex flex-col">
                <button
                  onClick={() => onMove(index, -1)}
                  disabled={locked || index === 0}
                  className="text-muted-foreground/60 transition hover:text-accent disabled:opacity-25 disabled:hover:text-muted-foreground/60"
                  title={locked ? 'This section is fixed in place' : 'Move up'}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onMove(index, 1)}
                  disabled={locked || index === sections.length - 1}
                  className="text-muted-foreground/60 transition hover:text-accent disabled:opacity-25 disabled:hover:text-muted-foreground/60"
                  title={locked ? 'This section is fixed in place' : 'Move down'}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                  enabled
                    ? 'bg-accent/15 text-accent'
                    : 'bg-muted text-muted-foreground/60'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className={`flex items-center gap-1.5 truncate text-sm font-medium ${
                    enabled ? 'text-secondary' : 'text-muted-foreground/60'
                  }`}
                >
                  <span className="truncate">{label}</span>
                  {locked && (
                    <Lock
                      className="h-3 w-3 shrink-0 text-muted-foreground/50"
                      aria-label="Required section"
                    />
                  )}
                  {fixed && (
                    <Landmark
                      className="h-3 w-3 shrink-0 text-muted-foreground/50"
                      aria-label="Fixed content"
                    />
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground/60">
                  {locked
                    ? 'Required — editable, but always present'
                    : fixed
                      ? 'Fixed wording — place it, but it reads the same every time'
                      : `Section ${index + 1}`}
                </p>
              </div>

              <Switch checked={enabled} onCheckedChange={() => onToggle(index)} />

              <button
                onClick={() => onDuplicate(index)}
                disabled={locked}
                className="p-1.5 text-muted-foreground/50 transition hover:bg-accent/10 hover:text-accent disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/50"
                title={locked ? 'This section cannot be duplicated' : 'Duplicate section'}
              >
                <Copy className="h-4 w-4" />
              </button>

              <button
                onClick={() => onRemove(index)}
                disabled={!removable}
                className="p-1.5 text-muted-foreground/50 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/50"
                title={
                  locked
                    ? 'This section cannot be removed'
                    : removable
                      ? 'Remove section'
                      : `At least one ${meta?.label ?? section.type} is required`
                }
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border pt-5">
        <h4 className="mb-3 text-sm font-semibold text-foreground">Add a section</h4>
        {addable.length === 0 ? (
          <p className="text-xs text-muted-foreground/60">
            All available sections have been added.
          </p>
        ) : (
          <div className="space-y-2">
            {addable.map((meta) => {
              const Icon = ICONS[meta.type] ?? LayoutList;
              return (
                <button
                  key={meta.type}
                  onClick={() => onAdd(meta.type)}
                  className="flex w-full items-center gap-3 border border-dashed border-border p-3 text-left transition hover:border-accent hover:bg-accent/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-secondary">{meta.label}</p>
                    <p className="truncate text-xs text-muted-foreground/60">
                      {meta.description}
                    </p>
                  </div>
                  <Plus className="h-4 w-4 shrink-0 text-accent" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
