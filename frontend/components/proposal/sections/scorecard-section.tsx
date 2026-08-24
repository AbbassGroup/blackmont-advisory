'use client';

import { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { InlineText } from '@/components/im';
import { AddRowButton, RowTools, moveItem } from './row-tools';
import {
  makeScorecardFactor,
  scoreScorecard,
  type ScorecardData,
  type ScorecardFactor,
  type SectionChangeHandler,
} from './shared';

const MAX_SCORE = 5;

/** Scores read as "4", "4.25" — never "4.00" for a whole number. */
const fmt = (n: number) =>
  Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));

/** Clamp to the 0–5 scale and snap to quarters, the granularity the printed
 *  worksheet uses. Anything unparseable clears the field. */
function normaliseScore(raw: string): number | '' {
  if (raw.trim() === '') return '';
  const n = Number(raw);
  if (Number.isNaN(n)) return '';
  return Math.min(MAX_SCORE, Math.max(0, Math.round(n * 4) / 4));
}

/** Geometry for the gauge: a 140px box with a 14px ring inset from the edge. */
const RING = { size: 140, stroke: 14 };
const RADIUS = (RING.size - RING.stroke) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * The running total as a proportional gauge — the arc sweeps to however much of
 * the available score has been awarded, so 28.5 out of 35 reads as four fifths
 * of a circle at a glance rather than as a number in a disc.
 */
function ScoreRing({ total, outOf }: { total: number; outOf: number }) {
  const pct = outOf > 0 ? Math.min(1, Math.max(0, total / outOf)) : 0;

  return (
    <div
      className='relative'
      style={{ width: RING.size, height: RING.size }}
      role='img'
      aria-label={`Score ${fmt(total)} out of ${outOf}`}
    >
      {/* -90° so the arc starts at twelve o'clock rather than three. */}
      <svg
        viewBox={`0 0 ${RING.size} ${RING.size}`}
        className='h-full w-full -rotate-90'
        aria-hidden
      >
        <circle
          cx={RING.size / 2}
          cy={RING.size / 2}
          r={RADIUS}
          fill='none'
          strokeWidth={RING.stroke}
          className='stroke-secondary/10'
        />
        <circle
          cx={RING.size / 2}
          cy={RING.size / 2}
          r={RADIUS}
          fill='none'
          strokeWidth={RING.stroke}
          strokeLinecap='round'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - pct)}
          className='stroke-accent transition-[stroke-dashoffset] duration-700 ease-out'
        />
      </svg>

      {/* The denominator is captioned beneath the ring, so it isn't repeated here. */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-[2.1rem] font-bold leading-none tracking-[-0.02em] text-secondary'>
          {fmt(total)}
        </span>
      </div>
    </div>
  );
}

/** The uploaded financial screenshots, stacked full width above the factors. */
function Screenshots({
  photos,
  editable,
  onChange,
  onUploadFile,
  onCommit,
}: {
  photos: string[];
  editable?: boolean;
  onChange: (mutate: (rows: string[]) => string[]) => void;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList) => {
    if (!onUploadFile) return;
    setUploading(true);
    try {
      // Sequential, so several screenshots keep the order they were picked in.
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await onUploadFile(file);
        if (url) urls.push(url);
      }
      if (urls.length) {
        onChange((rows) => [...rows, ...urls]);
        onCommit?.();
      }
    } finally {
      setUploading(false);
    }
  };

  if (!editable && photos.length === 0) return null;

  return (
    <div className='mb-4 space-y-5'>
      {photos.map((src, index) => (
        <div key={`${src}-${index}`} className='group/row relative'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Financial data ${index + 1}`}
            className='w-full border border-border object-contain'
          />
          {editable && (
            <div className='absolute right-2 top-2 bg-card/90 p-1 shadow-sm backdrop-blur'>
              <RowTools
                index={index}
                count={photos.length}
                onMove={(i, dir) => onChange((rows) => moveItem(rows, i, dir))}
                onRemove={(i) => onChange((rows) => rows.filter((_, k) => k !== i))}
                minRows={0}
                orientation='horizontal'
                removeLabel='Remove screenshot'
              />
            </div>
          )}
        </div>
      ))}

      {editable && (
        <>
          <input
            ref={fileRef}
            type='file'
            accept='image/*'
            multiple
            className='hidden'
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <button
            type='button'
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className='flex w-full items-center justify-center gap-2 border border-dashed border-border px-3 py-4 text-xs font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent disabled:opacity-60'
          >
            {uploading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <ImagePlus className='h-4 w-4' />
            )}
            {uploading ? 'Uploading...' : 'Add financial screenshots'}
          </button>
        </>
      )}
    </div>
  );
}

function FactorCard({
  factor,
  index,
  count,
  editable,
  onChange,
  onMove,
  onRemove,
}: {
  factor: ScorecardFactor;
  index: number;
  count: number;
  editable?: boolean;
  onChange: (index: number, patch: Partial<ScorecardFactor>) => void;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className='group/row flex flex-col border border-border bg-white p-5 text-center'>
      {editable && (
        <div className='mb-2 flex items-center justify-between gap-2'>
          <span className='text-[10px] font-semibold uppercase tracking-wide text-muted-foreground'>
            {index + 1}
          </span>
          <RowTools
            index={index}
            count={count}
            onMove={onMove}
            onRemove={onRemove}
            minRows={0}
            orientation='horizontal'
            removeLabel='Remove factor'
          />
        </div>
      )}

      <InlineText
        as='p'
        editable={editable}
        value={factor.label}
        onChange={(v) => onChange(index, { label: v })}
        placeholder='Question'
        className='text-sm font-bold leading-snug text-secondary'
      />

      {(editable || factor.hint) && (
        <InlineText
          as='p'
          editable={editable}
          value={factor.hint}
          onChange={(v) => onChange(index, { hint: v })}
          placeholder='Scale, e.g. 1 = Easy, 5 = Difficult'
          className='mt-1.5 text-xs italic leading-snug text-muted-foreground'
        />
      )}

      <div className='mt-4'>
        {editable ? (
          <div className='mx-auto flex w-28 items-center'>
            <input
              type='number'
              min={0}
              max={MAX_SCORE}
              step={0.25}
              value={factor.score}
              onChange={(e) =>
                onChange(index, { score: normaliseScore(e.target.value) })
              }
              placeholder='0'
              className='h-10 w-full rounded-none border border-secondary/15 bg-background px-2 text-center text-lg font-bold text-accent outline-none focus:border-accent focus:ring-2 focus:ring-accent/15'
            />
            <span className='ml-1.5 shrink-0 text-sm text-muted-foreground'>/ 5</span>
          </div>
        ) : (
          <p className='text-3xl font-bold text-accent'>
            {factor.score === '' ? '—' : fmt(factor.score)}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Financial data and weighting factors.
 *
 * Screenshots of the financials sit on top, full width; the weighting factors
 * follow beneath, each scored out of 5, with the running total in a ring at the
 * foot. Only factors that have been given a question count towards the total —
 * an unfilled slot is shown in the editor but skipped in the document, so the
 * denominator always reflects what was actually scored.
 */
export function ScorecardSection({
  data,
  editable,
  onChange,
  onUploadFile,
  onCommit,
}: {
  data: ScorecardData;
  editable?: boolean;
  onChange?: SectionChangeHandler<ScorecardData>;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const factors = data.factors ?? [];
  const photos = data.photos ?? [];
  const { total, outOf, rated } = scoreScorecard(factors);

  const editFactors = (mutate: (rows: ScorecardFactor[]) => ScorecardFactor[]) =>
    onChange?.((prev) => ({
      factors: mutate((prev.factors as ScorecardFactor[]) ?? []),
    }));

  const editPhotos = (mutate: (rows: string[]) => string[]) =>
    onChange?.((prev) => ({ photos: mutate((prev.photos as string[]) ?? []) }));

  // The editor shows every slot so blanks are obvious; the reader sees only
  // the questions that were actually filled in.
  const shown = editable
    ? factors.map((factor, index) => ({ factor, index }))
    : factors
        .map((factor, index) => ({ factor, index }))
        .filter(({ factor }) => factor.label.trim());

  return (
    <div className='mb-12 mt-16 bg-transparent'>
      <div className='mb-6 border-b border-border pb-4'>
        <InlineText
          as='h2'
          singleLine
          editable={editable}
          value={data.title}
          onChange={(v) => onChange?.({ title: v })}
          placeholder='Historical Financial Data'
          className='text-2xl font-bold text-secondary'
        />
      </div>

      <Screenshots
        photos={photos}
        editable={editable}
        onChange={editPhotos}
        onUploadFile={onUploadFile}
        onCommit={onCommit}
      />

      <InlineText
        as='h3'
        singleLine
        editable={editable}
        value={data.factorsTitle}
        onChange={(v) => onChange?.({ factorsTitle: v })}
        placeholder='Weighting Factors'
        className='mb-6 mt-10 text-xl font-bold text-accent'
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {shown.map(({ factor, index }) => (
          <FactorCard
            key={factor.id ?? index}
            factor={factor}
            index={index}
            count={factors.length}
            editable={editable}
            onChange={(i, patch) =>
              editFactors((rows) => rows.map((r, k) => (k === i ? { ...r, ...patch } : r)))
            }
            onMove={(i, dir) => editFactors((rows) => moveItem(rows, i, dir))}
            onRemove={(i) => editFactors((rows) => rows.filter((_, k) => k !== i))}
          />
        ))}
      </div>

      {editable && (
        <AddRowButton
          className='mt-4'
          label='Add weighting factor'
          onClick={() => editFactors((rows) => [...rows, makeScorecardFactor()])}
        />
      )}

      {/* Running total */}
      {rated.length > 0 && (
        <div className='mt-10 flex flex-col items-center'>
          <ScoreRing total={total} outOf={outOf} />
          <p className='mt-3 text-sm font-bold uppercase tracking-[0.14em] text-secondary'>
            Out of {outOf}
          </p>
          {editable && rated.length < factors.length && (
            <p className='mt-1.5 text-xs italic text-muted-foreground'>
              {factors.length - rated.length} factor
              {factors.length - rated.length === 1 ? '' : 's'} still unnamed — they
              are left out of the total until you give them a question.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
