'use client';

import { SectionHeading } from '../section-chrome';
import { InlineText } from '../inline-text';
import type { HoursData, HoursRow } from '../types';

export function HoursSection({
  data,
  editable,
  onChange,
}: {
  data: HoursData;
  editable?: boolean;
  onChange?: (patch: Partial<HoursData>) => void;
}) {
  const rows = data.rows ?? [];
  const updateRow = (index: number, patch: Partial<HoursRow>) =>
    onChange?.({ rows: rows.map((r, i) => (i === index ? { ...r, ...patch } : r)) });

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder="Hours of Operations"
      />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-gray-100 px-6 py-4 last:border-0"
          >
            <span className="text-[0.95rem] text-gray-500">{row.day}</span>
            <InlineText
              singleLine
              editable={editable}
              value={row.hours}
              onChange={(v) => updateRow(i, { hours: v })}
              placeholder="Hours"
              className="text-[0.95rem] font-semibold text-brand-black"
            />
          </div>
        ))}
      </div>
    </>
  );
}
