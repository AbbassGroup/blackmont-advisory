'use client';

import { SectionHeading } from '../section-chrome';
import { InlineText } from '../inline-text';
import type { HoursData, HoursRow, SectionPatch } from '../types';

export function HoursSection({
  data,
  editable,
  onChange,
}: {
  data: HoursData;
  editable?: boolean;
  onChange?: (patch: SectionPatch<HoursData>) => void;
}) {
  const rows = data.rows ?? [];
  // Built from the current rows rather than the ones this render captured.
  const updateRow = (index: number, patch: Partial<HoursRow>) =>
    onChange?.((prev) => ({
      rows: ((prev.rows as HoursRow[]) ?? []).map((r, i) =>
        i === index ? { ...r, ...patch } : r,
      ),
    }));

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder="Hours of Operations"
      />

      <div className="overflow-hidden border border-border bg-card">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border px-6 py-4 last:border-0"
          >
            <span className="text-[0.95rem] text-muted-foreground">{row.day}</span>
            <InlineText
              singleLine
              editable={editable}
              value={row.hours}
              onChange={(v) => updateRow(i, { hours: v })}
              placeholder="Hours"
              className="text-[0.95rem] font-semibold text-secondary"
            />
          </div>
        ))}
      </div>
    </>
  );
}
