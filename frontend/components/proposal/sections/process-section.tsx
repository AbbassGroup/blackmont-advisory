'use client';

import { InlineText } from '@/components/im';
import { AddRowButton, RowTools, moveItem } from './row-tools';
import { makeUid, type ProcessData, type ProcessStep, type SectionChangeHandler } from './shared';

export function ProposalProcessSection({
  data,
  editable,
  onChange,
}: {
  data: ProcessData;
  editable?: boolean;
  onChange?: SectionChangeHandler<ProcessData>;
}) {
  const steps = data.steps ?? [];

  const editSteps = (mutate: (rows: ProcessStep[]) => ProcessStep[]) =>
    onChange?.((prev) => ({ steps: mutate((prev.steps as ProcessStep[]) ?? []) }));

  return (
    <div className='mb-12 mt-16 bg-transparent'>
      <div className='mb-8 border-b border-border pb-4'>
        <InlineText
          as='h2'
          singleLine
          editable={editable}
          value={data.title}
          onChange={(v) => onChange?.({ title: v })}
          placeholder='The Process'
          className='text-2xl font-bold text-secondary'
        />
      </div>

      <div className='space-y-0'>
        {steps.map((step, index) => (
          <div key={step.id ?? index} className='group/row relative pb-10 pl-10 last:pb-0'>
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <div className='absolute bottom-0 left-[11px] top-8 w-[2px] bg-accent/30' />
            )}

            {/* Dot */}
            <div className='absolute left-0 top-1 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary shadow-sm ring-4 ring-background'>
              {index + 1}
            </div>

            <div className='flex items-start gap-2'>
              <div className='min-w-0 flex-1'>
                <InlineText
                  as='h3'
                  editable={editable}
                  value={step.label}
                  onChange={(v) =>
                    editSteps((rows) =>
                      rows.map((r, i) => (i === index ? { ...r, label: v } : r)),
                    )
                  }
                  placeholder='STEP TITLE'
                  className='mb-2 text-[16px] font-bold uppercase leading-tight tracking-wide text-secondary'
                />
                <InlineText
                  as='p'
                  editable={editable}
                  value={step.description}
                  onChange={(v) =>
                    editSteps((rows) =>
                      rows.map((r, i) => (i === index ? { ...r, description: v } : r)),
                    )
                  }
                  placeholder='What happens at this step'
                  className='text-base leading-relaxed text-muted-foreground'
                />
              </div>
              {editable && (
                <RowTools
                  index={index}
                  count={steps.length}
                  onMove={(i, dir) => editSteps((rows) => moveItem(rows, i, dir))}
                  onRemove={(i) => editSteps((rows) => rows.filter((_, k) => k !== i))}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {editable && (
        <AddRowButton
          className='mt-4'
          label='Add step'
          onClick={() =>
            editSteps((rows) => [
              ...rows,
              { id: makeUid('step'), label: '', description: '' },
            ])
          }
        />
      )}
    </div>
  );
}
