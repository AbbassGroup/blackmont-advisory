'use client';

import {
  ArrowLeft,
  Check,
  Download,
  Eye,
  LayoutList,
  Loader2,
  Printer,
  Redo2,
  Send,
  Settings,
  Globe,
  Undo2,
} from 'lucide-react';
import Link from 'next/link';
import type { DocStatusAction, StatusIcon } from './types';

export type PanelKey = 'sections' | 'settings';

const STATUS_ICONS: Record<StatusIcon, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  send: Send,
  check: Check,
};

/**
 * The floating bar at the bottom of every document editor: navigation, undo/redo,
 * preview/print, the two drawers, and the product's own status action.
 */
export function DocumentControlBar({
  backHref,
  previewHref,
  printHref,
  printLabel = 'Print',
  printIcon = 'printer',
  activePanel,
  onOpenPanel,
  statusAction,
  statusBusy,
  onStatusAction,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: {
  backHref: string;
  previewHref: string | null;
  printHref: string | null;
  printLabel?: string;
  printIcon?: 'printer' | 'download';
  activePanel: PanelKey | null;
  onOpenPanel: (panel: PanelKey) => void;
  statusAction: DocStatusAction | null;
  statusBusy: boolean;
  onStatusAction: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}) {
  const StatusIconCmp = statusAction ? STATUS_ICONS[statusAction.icon] : null;

  return (
    <div className="fixed bottom-3 left-1/2 z-40 flex max-w-[calc(100vw-0.75rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-2xl border border-border bg-card/95 p-1 shadow-[0_8px_30px_rgba(15,22,35,0.18)] backdrop-blur sm:bottom-4 sm:gap-1 sm:p-1.5">
      <Link href={backHref}>
        <BarButton label="Back" icon={<ArrowLeft className="h-5 w-5" />} />
      </Link>

      <Divider />

      <BarButton
        label="Undo"
        title="Undo (Ctrl+Z)"
        icon={<Undo2 className="h-5 w-5" />}
        onClick={onUndo}
        disabled={!canUndo}
      />
      <BarButton
        label="Redo"
        title="Redo (Ctrl+Shift+Z)"
        icon={<Redo2 className="h-5 w-5" />}
        onClick={onRedo}
        disabled={!canRedo}
      />

      <Divider />

      {previewHref && (
        <Link href={previewHref} target="_blank" rel="noopener noreferrer">
          <BarButton label="Preview" icon={<Eye className="h-5 w-5" />} />
        </Link>
      )}
      {printHref && (
        <Link href={printHref} target="_blank" rel="noopener noreferrer">
          <BarButton
            label={printLabel}
            icon={
              printIcon === 'download' ? (
                <Download className="h-5 w-5" />
              ) : (
                <Printer className="h-5 w-5" />
              )
            }
          />
        </Link>
      )}
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

      {statusAction && StatusIconCmp && (
        <>
          <Divider />
          <button
            onClick={onStatusAction}
            disabled={statusBusy || statusAction.disabled}
            title={statusAction.title ?? statusAction.label}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 ${
              statusAction.active
                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                : 'bg-accent text-primary hover:bg-accent-light'
            }`}
          >
            {statusBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <StatusIconCmp className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{statusAction.label}</span>
          </button>
        </>
      )}
    </div>
  );
}

function BarButton({
  label,
  icon,
  onClick,
  active,
  disabled,
  title,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title ?? label}
      className={`flex min-w-0 shrink-0 flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 text-[10px] font-medium transition-colors sm:min-w-[58px] sm:px-3 sm:text-[11px] ${
        disabled
          ? 'cursor-not-allowed text-muted-foreground/40'
          : active
            ? 'bg-accent/15 text-accent'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 hidden h-8 w-px shrink-0 bg-border sm:inline-block" />;
}
