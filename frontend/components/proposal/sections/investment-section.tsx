'use client';

import React, { forwardRef } from 'react';
import { InlineText } from '@/components/im';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '../rich-text-editor';
import { AddRowButton, RowTools, moveItem } from './row-tools';
import {
  makeFeeOption,
  type FeeOption,
  type FeeUnit,
  type InvestmentData,
  type SectionChangeHandler,
} from './shared';

/** At most three options per fee group — the layout is a 1/2/3-column grid. */
const MAX_OPTIONS = 3;

const inputCls =
  'h-9 rounded-none border-secondary/15 bg-background shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15';

function CustomCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`relative flex h-5 w-5 cursor-pointer items-center justify-center border transition-colors ${
        checked
          ? 'border-accent bg-accent'
          : 'border-gray-300 bg-white hover:border-accent'
      }`}
    >
      {checked && (
        <svg
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={3}
          className='h-3.5 w-3.5 text-primary'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
        </svg>
      )}
    </div>
  );
}

const formatAmount = (amount?: string | number, unit?: string) => {
  if (!amount) return '';
  const symbol = unit === 'Dollar' ? '$' : '';
  const suffix = unit === 'Percentage' ? '%' : '';
  return `${symbol}${amount}${suffix} + GST`;
};

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * The engagement blurb used to be plain text with newlines. It is rich text now,
 * so anything that doesn't already look like markup is converted a paragraph per
 * line — the first edit then saves it back as HTML for good.
 */
const engagementHtml = (value?: string) => {
  if (!value) return '';
  if (/<[a-z][\s\S]*>/i.test(value)) return value;
  return value
    .split('\n')
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join('');
};

const gridCols = (length: number) => {
  if (length === 1) return 'grid-cols-1 md:w-[600px] mx-auto';
  if (length === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-3';
};

/**
 * Fee options are matched by id, not object identity — an autosave round-trip replaces the objects, and the customer's tick must survive that.
 */
const sameOption = (a?: FeeOption | null, b?: FeeOption | null) =>
  !!a && !!b && (a.id ? a.id === b.id : a === b);

interface FeeGroupProps {
  options: FeeOption[];
  selected?: FeeOption | null;
  onSelect?: (option: FeeOption) => void;
  editable?: boolean;
  /** Advertisement rows are always priced in dollars, so the unit is fixed. */
  lockUnit?: boolean;
  hideSelectionIfSingle?: boolean;
  onChangeOption: (index: number, patch: Partial<FeeOption>) => void;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  addLabel: string;
}

function FeeGroup({
  options,
  selected,
  onSelect,
  editable,
  lockUnit,
  hideSelectionIfSingle,
  onChangeOption,
  onMove,
  onRemove,
  onAdd,
  addLabel,
}: FeeGroupProps) {
  // With a single option there is nothing to choose, so the tick is noise.
  const showTicks = !editable && !(hideSelectionIfSingle && options.length <= 1);

  return (
    <>
      <div className={`grid gap-6 ${gridCols(Math.max(options.length, 1))}`}>
        {options.map((item, index) => {
          const isSelected = sameOption(selected, item);
          return (
            <div
              key={item.id ?? index}
              onClick={() => !editable && onSelect?.(item)}
              className={`group/row flex h-full flex-col border p-6 transition-all duration-200 ${
                editable
                  ? 'border-border bg-white'
                  : `cursor-pointer ${
                      isSelected
                        ? 'border-2 border-accent bg-accent-pale shadow-sm'
                        : 'border-border bg-white hover:-translate-y-1 hover:border-accent/50 hover:shadow-md'
                    }`
              }`}
            >
              {showTicks && (
                <div className='mb-4 flex w-full flex-col items-center'>
                  <CustomCheckbox
                    checked={isSelected}
                    onChange={() => onSelect?.(item)}
                  />
                </div>
              )}

              {editable && (
                <div className='mb-3 flex items-center justify-between gap-2'>
                  <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                    Option {index + 1}
                  </span>
                  <RowTools
                    index={index}
                    count={options.length}
                    onMove={onMove}
                    onRemove={onRemove}
                    orientation='horizontal'
                    removeLabel='Remove option'
                  />
                </div>
              )}

              <div className='mb-6 w-full flex-1 text-center'>
                {editable ? (
                  <div className='text-left'>
                    <RichTextEditor
                      value={item.text || ''}
                      onChange={(text) => onChangeOption(index, { text })}
                      placeholder='What this option includes...'
                    />
                  </div>
                ) : (
                  <div className='prose prose-sm mx-auto max-w-none text-foreground prose-p:my-1 prose-strong:font-semibold prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5'>
                    <div dangerouslySetInnerHTML={{ __html: item.text || '' }} />
                  </div>
                )}
              </div>

              <div className='mt-auto w-full text-center'>
                {editable ? (
                  <div className='flex items-center gap-2'>
                    <Input
                      type='number'
                      value={item.amount}
                      onChange={(e) => onChangeOption(index, { amount: e.target.value })}
                      placeholder='Amount'
                      className={inputCls}
                    />
                    <select
                      value={item.unit}
                      disabled={lockUnit}
                      onChange={(e) =>
                        onChangeOption(index, { unit: e.target.value as FeeUnit })
                      }
                      className='h-9 rounded-none border border-secondary/15 bg-background px-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:bg-muted disabled:text-muted-foreground'
                    >
                      <option value='Dollar'>$</option>
                      <option value='Percentage'>%</option>
                    </select>
                  </div>
                ) : (
                  <div className='inline-block bg-accent px-6 py-1.5 text-center text-primary shadow-sm'>
                    <span className='text-base font-bold sm:text-lg'>
                      {formatAmount(item.amount, item.unit)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editable && (
        <AddRowButton
          className='mt-4'
          label={addLabel}
          onClick={onAdd}
          disabled={options.length >= MAX_OPTIONS}
          disabledHint={`At most ${MAX_OPTIONS} options`}
        />
      )}
    </>
  );
}

export interface InvestmentSectionProps {
  data: InvestmentData;
  editable?: boolean;
  onChange?: SectionChangeHandler<InvestmentData>;
  // Customer-facing selection (public page only).
  selectedAdvertisement?: FeeOption | null;
  onSelectAdvertisement?: (option: FeeOption) => void;
  selectedSuccessFee?: FeeOption | null;
  onSelectSuccessFee?: (option: FeeOption) => void;
  hideSelectionIfSingle?: boolean;
}

/** LOCKED SECTION — "Your Investment". */
export const InvestmentSection = forwardRef<HTMLDivElement, InvestmentSectionProps>(
  function InvestmentSection(
    {
      data,
      editable,
      onChange,
      selectedAdvertisement,
      onSelectAdvertisement,
      selectedSuccessFee,
      onSelectSuccessFee,
      hideSelectionIfSingle,
    },
    ref,
  ) {
    const advertisement = data.advertisement ?? [];
    const successFee = data.successFee ?? [];

    /**
     * Read the live list off `prev` so a slow rich-text change can't clobber a reorder that landed while it was open.
     */
    const editGroup =
      (key: 'advertisement' | 'successFee') =>
      (mutate: (rows: FeeOption[]) => FeeOption[]) =>
        onChange?.((prev) => ({
          [key]: mutate((prev[key] as FeeOption[]) ?? []),
        }) as Partial<InvestmentData>);

    const ads = editGroup('advertisement');
    const fees = editGroup('successFee');

    return (
      <div ref={ref} id='your-investment' className='mb-12 mt-16 scroll-mt-24 bg-transparent'>
        <div className='mb-8 border-b border-border pb-4'>
          <InlineText
            as='h2'
            singleLine
            editable={editable}
            value={data.title}
            onChange={(v) => onChange?.({ title: v })}
            placeholder='Your Investment'
            className='text-2xl font-bold text-secondary'
          />
        </div>

        {/* Advertisement */}
        {(editable || advertisement.length > 0) && (
          <div className='mb-12'>
            <InlineText
              as='h3'
              singleLine
              editable={editable}
              value={data.advertisementTitle}
              onChange={(v) => onChange?.({ advertisementTitle: v })}
              placeholder='Advertisement'
              className='mb-6 text-xl font-bold text-accent'
            />
            <FeeGroup
              options={advertisement}
              selected={selectedAdvertisement}
              onSelect={onSelectAdvertisement}
              editable={editable}
              lockUnit
              hideSelectionIfSingle={hideSelectionIfSingle}
              onChangeOption={(index, patch) =>
                ads((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)))
              }
              onMove={(index, dir) => ads((rows) => moveItem(rows, index, dir))}
              onRemove={(index) => ads((rows) => rows.filter((_, i) => i !== index))}
              onAdd={() => ads((rows) => [...rows, makeFeeOption('Dollar')])}
              addLabel='Add advertisement option'
            />
          </div>
        )}

        {/* Engagement */}
        <div className='mb-12'>
          <InlineText
            as='h3'
            singleLine
            editable={editable}
            value={data.engagementTitle}
            onChange={(v) => onChange?.({ engagementTitle: v })}
            placeholder='Engagement'
            className='mb-6 text-xl font-bold text-accent'
          />
          <div className='w-full border border-border bg-white p-8 text-center shadow-sm'>
            {editable ? (
              <div className='mx-auto mb-8 max-w-2xl text-left'>
                <RichTextEditor
                  value={engagementHtml(data.engagementBody)}
                  onChange={(html) => onChange?.({ engagementBody: html })}
                  placeholder='What the engagement covers...'
                />
              </div>
            ) : (
              <div
                className='prose prose-sm mx-auto mb-8 max-w-2xl text-base leading-relaxed text-foreground prose-p:my-1 prose-strong:font-semibold prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5'
                dangerouslySetInnerHTML={{
                  __html: engagementHtml(data.engagementBody),
                }}
              />
            )}

            {editable ? (
              <div className='mx-auto max-w-[220px]'>
                <Input
                  type='number'
                  value={data.engagementFee}
                  onChange={(e) => onChange?.({ engagementFee: e.target.value })}
                  placeholder='Engagement fee'
                  className={inputCls}
                />
              </div>
            ) : (
              <div className='inline-block bg-accent px-7 py-1.5 text-primary shadow-sm'>
                <span className='text-base font-bold sm:text-lg'>
                  ${data.engagementFee || '0'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Success Fee */}
        {(editable || successFee.length > 0) && (
          <div>
            <InlineText
              as='h3'
              singleLine
              editable={editable}
              value={data.successFeeTitle}
              onChange={(v) => onChange?.({ successFeeTitle: v })}
              placeholder='Success Fee'
              className='mb-6 text-xl font-bold text-accent'
            />
            <FeeGroup
              options={successFee}
              selected={selectedSuccessFee}
              onSelect={onSelectSuccessFee}
              editable={editable}
              onChangeOption={(index, patch) =>
                fees((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)))
              }
              onMove={(index, dir) => fees((rows) => moveItem(rows, index, dir))}
              onRemove={(index) => fees((rows) => rows.filter((_, i) => i !== index))}
              onAdd={() => fees((rows) => [...rows, makeFeeOption('Percentage')])}
              addLabel='Add success fee option'
            />
          </div>
        )}
      </div>
    );
  },
);
