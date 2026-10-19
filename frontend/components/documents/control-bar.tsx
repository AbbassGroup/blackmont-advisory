'use client';

import { ArrowLeft, Check, Download, Eye, LayoutList, Loader2, Printer, Redo2, Send, Settings, Globe, Undo2 } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { landingButtonVariants } from '@/components/landing/presentation';
import type { DocStatusAction, StatusIcon } from './types';

export type PanelKey = 'sections' | 'settings';

const STATUS_ICONS: Record<StatusIcon, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  send: Send,
  check: Check,
};

const TOOL_CLASS =
  'inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 border border-advisory-rule bg-white px-3 text-sm leading-[1.5] font-semibold text-midnight no-underline transition-colors duration-150 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40';
const BAR_CLASS = 'fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2 border border-advisory-rule bg-white';
const BAR_CONTENT_CLASS = 'flex items-center gap-3 overflow-x-auto px-3 py-3';

export function DocumentControlBarSkeleton({ hasPreview, hasPrint, hasStatus }: { hasPreview: boolean; hasPrint: boolean; hasStatus: boolean }) {
  const block = 'h-10 shrink-0 animate-pulse bg-canvas motion-reduce:animate-none';
  return (
    <div aria-hidden='true' className={BAR_CLASS}>
      <div className={BAR_CONTENT_CLASS}>
        <div className={cn(block, 'w-20')} />
        <div className='flex shrink-0 gap-1'><div className={cn(block, 'w-10')} /><div className={cn(block, 'w-10')} /></div>
        {(hasPreview || hasPrint) && <div className='flex shrink-0 gap-2'>{hasPreview && <div className={cn(block, 'w-24')} />}{hasPrint && <div className={cn(block, 'w-24')} />}</div>}
        <div className='flex shrink-0 gap-2'><div className={cn(block, 'w-24')} /><div className={cn(block, 'w-24')} /></div>
        {hasStatus && <div className={cn(block, 'w-28')} />}
      </div>
    </div>
  );
}

/** Shared editing controls pinned to the bottom of the screen. */
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
    <nav aria-label='Document editor controls' className={BAR_CLASS}>
      <div className={BAR_CONTENT_CLASS}>
        <Link href={backHref} className={TOOL_CLASS}>
          <ArrowLeft aria-hidden='true' className='size-4' /> Back
        </Link>
        <div role='group' aria-label='Edit history' className='flex shrink-0 gap-1'>
          <ToolButton label='Undo' title='Undo (Ctrl+Z)' icon={<Undo2 aria-hidden='true' className='size-4' />} onClick={onUndo} disabled={!canUndo} iconOnly />
          <ToolButton label='Redo' title='Redo (Ctrl+Shift+Z)' icon={<Redo2 aria-hidden='true' className='size-4' />} onClick={onRedo} disabled={!canRedo} iconOnly />
        </div>
        <div role='group' aria-label='Document preview and export' className='flex shrink-0 gap-2'>
          {previewHref && (
            <Link href={previewHref} target='_blank' rel='noopener noreferrer' className={TOOL_CLASS} aria-label='Preview document in a new tab'>
              <Eye aria-hidden='true' className='size-4' /> Preview
            </Link>
          )}
          {printHref && (
            <Link href={printHref} target='_blank' rel='noopener noreferrer' className={TOOL_CLASS} aria-label={`${printLabel} document in a new tab`}>
              {printIcon === 'download' ? <Download aria-hidden='true' className='size-4' /> : <Printer aria-hidden='true' className='size-4' />}
              {printLabel}
            </Link>
          )}
        </div>
        <div role='group' aria-label='Document panels' className='flex shrink-0 gap-2'>
          <ToolButton label='Sections' icon={<LayoutList aria-hidden='true' className='size-4' />} active={activePanel === 'sections'} onClick={() => onOpenPanel('sections')} />
          <ToolButton label='Settings' icon={<Settings aria-hidden='true' className='size-4' />} active={activePanel === 'settings'} onClick={() => onOpenPanel('settings')} />
        </div>
        {statusAction && StatusIconCmp && (
          <button
            type='button'
            onClick={onStatusAction}
            disabled={statusBusy || statusAction.disabled}
            title={statusAction.title ?? statusAction.label}
            aria-busy={statusBusy}
            className={cn(
              landingButtonVariants({ size: 'compact', variant: statusAction.active ? 'outline' : 'midnight' }),
              'min-w-24',
              statusAction.active && 'border-amber-700 text-amber-800 hover:bg-amber-50 hover:text-amber-900',
            )}
          >
            {statusBusy ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <StatusIconCmp className='size-4' />}
            {statusAction.label}
          </button>
        )}
      </div>
    </nav>
  );
}

function ToolButton({
  label,
  icon,
  onClick,
  active,
  disabled,
  title,
  iconOnly = false,
}: {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  iconOnly?: boolean;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      title={title ?? label}
      aria-label={label}
      aria-expanded={active}
      className={cn(TOOL_CLASS, iconOnly && 'size-10 px-0', active && 'border-midnight bg-midnight text-white hover:bg-deep-navy')}
    >
      {icon}
      {!iconOnly && label}
    </button>
  );
}
