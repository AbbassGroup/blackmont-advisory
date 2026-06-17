'use client';

import { useState } from 'react';
import {
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Coins,
  DollarSign,
  Factory,
  FileText,
  Handshake,
  Home,
  KeyRound,
  Landmark,
  Leaf,
  MapPin,
  Package,
  Percent,
  Plus,
  Receipt,
  Scale,
  Star,
  Store,
  Tag,
  Target,
  Trash2,
  TrendingUp,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { InlineText } from '../inline-text';
import { SectionHeading } from '../section-chrome';
import { makeUid, type HighlightItem, type HighlightsData } from '../types';

// Curated icons a broker can pick for a highlight.
const ICONS: Record<string, LucideIcon> = {
  store: Store,
  factory: Factory,
  building: Building2,
  mapPin: MapPin,
  dollar: DollarSign,
  coins: Coins,
  trendingUp: TrendingUp,
  barChart: BarChart3,
  tag: Tag,
  package: Package,
  home: Home,
  key: KeyRound,
  calendar: Calendar,
  clock: Clock,
  users: Users,
  handshake: Handshake,
  briefcase: Briefcase,
  award: Award,
  target: Target,
  percent: Percent,
  receipt: Receipt,
  scale: Scale,
  landmark: Landmark,
  fileText: FileText,
  truck: Truck,
  wrench: Wrench,
  leaf: Leaf,
  star: Star,
};

function HighlightIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? Store;
  return <Icon className={className} />;
}

function IconPicker({ value, onChange }: { value: string; onChange: (icon: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          title="Change icon"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2b2b2b] text-white ring-brand-primary/40 transition hover:ring-2"
        >
          <HighlightIcon icon={value} className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid max-h-60 grid-cols-6 gap-1 overflow-y-auto">
          {Object.entries(ICONS).map(([key, Icon]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
              className={cn(
                'flex items-center justify-center rounded-lg p-2 transition',
                value === key
                  ? 'bg-brand-primary/10 text-brand-primary'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800',
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function HighlightsSection({
  data,
  editable,
  onChange,
  onCommit,
}: {
  data: HighlightsData;
  editable?: boolean;
  onChange?: (patch: Partial<HighlightsData>) => void;
  onCommit?: () => void;
}) {
  const items = data.items ?? [];

  const writeItems = (next: HighlightItem[], commit = true) => {
    onChange?.({ items: next });
    if (commit) onCommit?.();
  };
  const updateItem = (id: string, patch: Partial<HighlightItem>, commit = false) =>
    writeItems(
      items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
      commit,
    );
  const addItem = () =>
    writeItems([...items, { id: makeUid('hl'), icon: 'store', title: '', desc: '' }]);
  const removeItem = (id: string) => writeItems(items.filter((it) => it.id !== id));

  const shown = editable ? items : items.filter((it) => it.title || it.desc);

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder="Key Business Highlights"
      />

      {shown.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {shown.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-xs ring-1 ring-gray-100"
            >
              {editable ? (
                <IconPicker value={it.icon} onChange={(icon) => updateItem(it.id, { icon }, true)} />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2b2b2b] text-white">
                  <HighlightIcon icon={it.icon} className="h-5 w-5" />
                </span>
              )}

              <div className="min-w-0 flex-1">
                <InlineText
                  as="p"
                  singleLine
                  editable={editable}
                  value={it.title}
                  onChange={(v) => updateItem(it.id, { title: v })}
                  placeholder="Title"
                  className="text-sm font-semibold text-brand-black"
                />
                <InlineText
                  as="p"
                  singleLine
                  editable={editable}
                  value={it.desc}
                  onChange={(v) => updateItem(it.id, { desc: v })}
                  placeholder="Detail"
                  className="text-sm text-gray-500"
                />
              </div>

              {editable && (
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  title="Remove highlight"
                  className="shrink-0 rounded-lg p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {editable && (
        <button
          type="button"
          onClick={addItem}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
        >
          <Plus className="h-4 w-4" /> Add highlight
        </button>
      )}
    </>
  );
}
