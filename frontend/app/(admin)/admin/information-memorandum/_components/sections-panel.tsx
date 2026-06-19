'use client';

import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Plus,
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
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  SECTION_REGISTRY,
  getSectionMeta,
  type ImSection,
  type SectionType,
} from '@/components/im';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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
};

export function SectionsPanel({
  sections,
  onMove,
  onToggle,
  onRemove,
  onDuplicate,
  onAdd,
}: {
  sections: ImSection[];
  onMove: (index: number, dir: -1 | 1) => void;
  onToggle: (index: number) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
  onAdd: (type: SectionType) => void;
}) {
  // A singleton type already in the document can't be added again.
  const present = new Set(sections.map((s) => s.type));
  const addable = SECTION_REGISTRY.filter((m) => !m.singleton || !present.has(m.type));

  return (
    <div className="space-y-6">
      <ul className="space-y-2">
        {sections.map((section, index) => {
          const meta = getSectionMeta(section.type);
          const Icon = ICONS[section.type] ?? LayoutList;
          const enabled = section.enabled !== false;
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
                  disabled={index === 0}
                  className="text-muted-foreground/60 transition hover:text-accent disabled:opacity-25"
                  title="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onMove(index, 1)}
                  disabled={index === sections.length - 1}
                  className="text-muted-foreground/60 transition hover:text-accent disabled:opacity-25"
                  title="Move down"
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
                  className={`truncate text-sm font-medium ${
                    enabled ? 'text-secondary' : 'text-muted-foreground/60'
                  }`}
                >
                  {label}
                </p>
                <p className="truncate text-xs text-muted-foreground/60">
                  Section {index + 1}
                </p>
              </div>

              <Switch checked={enabled} onCheckedChange={() => onToggle(index)} />

              <button
                onClick={() => onDuplicate(index)}
                className="p-1.5 text-muted-foreground/50 transition hover:bg-accent/10 hover:text-accent"
                title="Duplicate section"
              >
                <Copy className="h-4 w-4" />
              </button>

              <button
                onClick={() => onRemove(index)}
                className="p-1.5 text-muted-foreground/50 transition hover:bg-red-50 hover:text-red-500"
                title="Remove section"
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
          <p className="text-xs text-muted-foreground/60">All available sections have been added.</p>
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
                    <p className="truncate text-xs text-muted-foreground/60">{meta.description}</p>
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
