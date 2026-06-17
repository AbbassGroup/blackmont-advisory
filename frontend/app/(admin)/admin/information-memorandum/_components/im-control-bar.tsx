'use client';

import { ArrowLeft, Eye, LayoutList, Printer, Settings, Globe, Loader2 } from 'lucide-react';
import Link from 'next/link';

export type PanelKey = 'sections' | 'settings';

export function ImControlBar({
  previewHref,
  printHref,
  activePanel,
  onOpenPanel,
  status,
  publishing,
  onTogglePublish,
}: {
  previewHref: string;
  printHref: string;
  activePanel: PanelKey | null;
  onOpenPanel: (panel: PanelKey) => void;
  status: 'draft' | 'published';
  publishing: boolean;
  onTogglePublish: () => void;
}) {
  return (
    <div className="fixed bottom-3 left-1/2 z-40 flex max-w-[calc(100vw-0.75rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-2xl border border-gray-200 bg-white/95 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur sm:bottom-4 sm:gap-1 sm:p-1.5">
      <Link href="/admin/information-memorandum">
        <BarButton label="Back" icon={<ArrowLeft className="h-5 w-5" />} />
      </Link>

      <Divider />

      <Link href={previewHref} target="_blank" rel="noopener noreferrer">
        <BarButton label="Preview" icon={<Eye className="h-5 w-5" />} />
      </Link>
      <Link href={printHref} target="_blank" rel="noopener noreferrer">
        <BarButton label="Print" icon={<Printer className="h-5 w-5" />} />
      </Link>
      <BarButton
        label="Sections"
        icon={<LayoutList className="h-5 w-5" />}
        active={activePanel === 'sections'}
        onClick={() => onOpenPanel('sections')}
      />
      <BarButton
        label="Settings"
        icon={<Settings className="h-5 w-5" />}
        active={activePanel === 'settings'}
        onClick={() => onOpenPanel('settings')}
      />

      <Divider />

      <button
        onClick={onTogglePublish}
        disabled={publishing}
        title={status === 'published' ? 'Unpublish' : 'Publish'}
        className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
          status === 'published'
            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
            : 'bg-brand-primary text-white hover:bg-brand-primary/90'
        }`}
      >
        {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
        <span className="hidden sm:inline">
          {status === 'published' ? 'Unpublish' : 'Publish'}
        </span>
      </button>
    </div>
  );
}

function BarButton({
  label,
  icon,
  onClick,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex min-w-0 shrink-0 flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 text-[10px] font-medium transition-colors sm:min-w-[58px] sm:px-3 sm:text-[11px] ${
        active
          ? 'bg-brand-primary/10 text-brand-primary'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 hidden h-8 w-px shrink-0 bg-gray-200 sm:inline-block" />;
}
