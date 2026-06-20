'use client';

import { Loader2, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { BROKERS } from '@/lib/data/brokers';
import type { ImTemplate } from '@/components/im';

export function SettingsPanel({
  template,
  isSuperAdmin,
  onChangeBroker,
  publishing,
  onTogglePublish,
  onDelete,
}: {
  template: ImTemplate;
  isSuperAdmin: boolean;
  onChangeBroker: (email: string) => void;
  publishing: boolean;
  onTogglePublish: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Broker */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-foreground">Broker</Label>
        <select
          value={template.brokerEmail || ''}
          onChange={(e) => onChangeBroker(e.target.value)}
          disabled={!isSuperAdmin}
          className="h-10 w-full rounded-none border border-secondary/15 bg-background px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {!BROKERS.some((b) => b.email === template.brokerEmail) && (
            <option value={template.brokerEmail || ''}>{template.brokerEmail || 'Unknown'}</option>
          )}
          {BROKERS.map((b) => (
            <option key={b.email} value={b.email}>
              {b.name} ({b.email})
            </option>
          ))}
        </select>
        {!isSuperAdmin && (
          <p className="text-xs text-muted-foreground/60">Only a superadmin can reassign the broker.</p>
        )}
      </div>

      {/* Status */}
      <div className="border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Published</p>
            <p className="text-xs text-muted-foreground/60">
              {template.status === 'published'
                ? 'Visible at its public link.'
                : 'Draft. Not publicly visible.'}
            </p>
          </div>
          {publishing ? (
            <Loader2 className="h-5 w-5 animate-spin text-accent" />
          ) : (
            <Switch checked={template.status === 'published'} onCheckedChange={onTogglePublish} />
          )}
        </div>
      </div>

      {/* Danger zone */}
      <div className="border border-red-100 bg-red-50/50 p-4">
        <p className="text-sm font-semibold text-red-600">Delete memorandum</p>
        <p className="mb-3 text-xs text-red-400">This permanently removes the template.</p>
        <Button
          variant="outline"
          onClick={onDelete}
          className="gap-2 rounded-none border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
}
