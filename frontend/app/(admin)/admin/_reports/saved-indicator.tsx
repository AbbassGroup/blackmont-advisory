'use client';

import { Check, CloudUpload, Loader2, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export function SavedIndicator({
  state,
  lastSavedAt,
}: {
  state: SaveState;
  lastSavedAt: Date | null;
}) {
  const config = {
    idle: {
      icon: <CloudUpload className="h-4 w-4" />,
      text: lastSavedAt
        ? `Saved ${formatDistanceToNow(lastSavedAt, { addSuffix: true })}`
        : 'All changes saved',
      cls: 'border-border bg-card text-muted-foreground',
    },
    saving: {
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
      text: 'Saving...',
      cls: 'border-border bg-card text-muted-foreground',
    },
    saved: {
      icon: <Check className="h-4 w-4" />,
      text: 'Saved',
      cls: 'border-green-200 bg-green-50 text-green-600',
    },
    error: {
      icon: <AlertTriangle className="h-4 w-4" />,
      text: 'Save failed, retrying...',
      cls: 'border-red-200 bg-red-50 text-red-600',
    },
  }[state];

  return (
    <div
      className={`pointer-events-none flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-sm transition-colors ${config.cls}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
}
