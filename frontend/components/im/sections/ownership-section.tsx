'use client';

import { UserRound } from 'lucide-react';
import { InlineText } from '../inline-text';
import { SectionHeading } from '../section-chrome';
import type { OwnershipData, StaffGroup } from '../types';

/** A single "Label: value" line. The label is static; the value is editable
 * (highlighted to show it can be edited, echoing the source design). */
function Row({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
      <span className='text-sm font-semibold text-gray-500'>{label}:</span>
      <InlineText
        as='span'
        singleLine
        editable={editable}
        value={value}
        onChange={onChange}
        placeholder='—'
        className='text-sm font-semibold text-brand-black'
      />
    </div>
  );
}

function GroupCard({
  heading,
  group,
  withRate,
  editable,
  onChange,
}: {
  heading: string;
  group: StaffGroup;
  withRate?: boolean;
  editable?: boolean;
  onChange: (patch: Partial<StaffGroup>) => void;
}) {
  return (
    <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs'>
      <div className='bg-brand-primary/10 px-5 py-2.5'>
        <p className='text-sm font-semibold uppercase tracking-wide text-brand-primary'>
          {heading}
        </p>
      </div>
      <div className='space-y-2 p-5'>
        <Row
          label='People'
          value={group.people}
          editable={editable}
          onChange={(v) => onChange({ people: v })}
        />
        <Row
          label='Hours'
          value={group.hours}
          editable={editable}
          onChange={(v) => onChange({ hours: v })}
        />
        <Row
          label='Tasks'
          value={group.tasks}
          editable={editable}
          onChange={(v) => onChange({ tasks: v })}
        />
        {withRate && (
          <Row
            label='Rate'
            value={group.rate}
            editable={editable}
            onChange={(v) => onChange({ rate: v })}
          />
        )}
      </div>
    </div>
  );
}

export function OwnershipSection({
  data,
  editable,
  onChange,
}: {
  data: OwnershipData;
  editable?: boolean;
  onChange?: (patch: Partial<OwnershipData>) => void;
}) {
  const setOwner = (patch: Partial<OwnershipData['owner']>) =>
    onChange?.({ owner: { ...data.owner, ...patch } });
  const setGroup =
    (key: 'fulltime' | 'parttime' | 'casual' | 'subcontractors') =>
    (patch: Partial<StaffGroup>) =>
      onChange?.({
        [key]: { ...data[key], ...patch },
      } as Partial<OwnershipData>);

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder='Ownership & Staff'
      />

      {/* Business owner(s) */}
      <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs'>
        <div className='flex items-center gap-3 bg-brand-primary/10 px-5 py-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white'>
            <UserRound className='h-5 w-5' />
          </span>
          <p className='text-base font-semibold text-brand-black'>
            Business Owner(s)
          </p>
        </div>
        <div className='space-y-2 p-5'>
          <Row
            label='Owner(s)'
            value={data.owner.owners}
            editable={editable}
            onChange={(v) => setOwner({ owners: v })}
          />
          <Row
            label='Hours'
            value={data.owner.hours}
            editable={editable}
            onChange={(v) => setOwner({ hours: v })}
          />
          <Row
            label='Tasks'
            value={data.owner.tasks}
            editable={editable}
            onChange={(v) => setOwner({ tasks: v })}
          />
        </div>
      </div>

      {/* Staff breakdown */}
      <div className='mt-4 grid gap-4 sm:grid-cols-2'>
        <GroupCard
          heading='Full Time'
          group={data.fulltime}
          withRate
          editable={editable}
          onChange={setGroup('fulltime')}
        />
        <GroupCard
          heading='Part Time'
          group={data.parttime}
          withRate
          editable={editable}
          onChange={setGroup('parttime')}
        />
        <GroupCard
          heading='Casual'
          group={data.casual}
          withRate
          editable={editable}
          onChange={setGroup('casual')}
        />
        <GroupCard
          heading='Sub-Contractors'
          group={data.subcontractors}
          withRate
          editable={editable}
          onChange={setGroup('subcontractors')}
        />
      </div>
    </>
  );
}
