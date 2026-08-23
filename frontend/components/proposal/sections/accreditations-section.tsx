'use client';

import { useRef, useState } from 'react';
import { ImageUp, Loader2 } from 'lucide-react';
import { InlineText } from '@/components/im';
import { AddRowButton, RowTools, moveItem } from './row-tools';
import {
  makeUid,
  type AccreditationBadge,
  type AccreditationsData,
  type SectionChangeHandler,
} from './shared';

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`mx-0.5 text-xl ${index < rating ? 'text-accent' : 'text-gray-300'}`}
    >
      ★
    </span>
  ));

function BadgeCard({
  badge,
  index,
  count,
  editable,
  onChange,
  onMove,
  onRemove,
  onUploadFile,
  onCommit,
}: {
  badge: AccreditationBadge;
  index: number;
  count: number;
  editable?: boolean;
  onChange: (index: number, patch: Partial<AccreditationBadge>) => void;
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!onUploadFile) return;
    setUploading(true);
    try {
      const url = await onUploadFile(file);
      if (url) {
        onChange(index, { src: url });
        onCommit?.();
      }
    } finally {
      setUploading(false);
    }
  };

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={badge.src}
      alt={badge.alt}
      className='max-h-[80px] max-w-full object-contain'
    />
  );

  return (
    <div className='group/row relative flex h-full items-center justify-center rounded-xl border border-border bg-white p-6 text-center shadow-sm'>
      {editable ? (
        <>
          <input
            ref={fileRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
          <div className='absolute right-2 top-2 flex items-center gap-1'>
            <button
              type='button'
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              title='Replace badge image'
              className='rounded-full bg-muted p-1.5 text-muted-foreground transition hover:bg-accent/15 hover:text-accent disabled:opacity-60'
            >
              {uploading ? (
                <Loader2 className='h-3.5 w-3.5 animate-spin' />
              ) : (
                <ImageUp className='h-3.5 w-3.5' />
              )}
            </button>
            <RowTools
              index={index}
              count={count}
              onMove={onMove}
              onRemove={onRemove}
              minRows={0}
              orientation='horizontal'
              removeLabel='Remove badge'
            />
          </div>
          {badge.src ? (
            image
          ) : (
            <span className='text-xs text-muted-foreground/60'>
              Upload a badge image
            </span>
          )}
        </>
      ) : badge.url ? (
        <a href={badge.url} target='_blank' rel='noreferrer' className='block'>
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}

export function AccreditationsSection({
  data,
  editable,
  onChange,
  onUploadFile,
  onCommit,
}: {
  data: AccreditationsData;
  editable?: boolean;
  onChange?: SectionChangeHandler<AccreditationsData>;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const badges = data.badges ?? [];
  const card = data.ratingCard ?? { name: '', rating: 5, caption: '' };

  const editBadges = (mutate: (rows: AccreditationBadge[]) => AccreditationBadge[]) =>
    onChange?.((prev) => ({
      badges: mutate((prev.badges as AccreditationBadge[]) ?? []),
    }));

  const patchCard = (patch: Partial<AccreditationsData['ratingCard']>) =>
    onChange?.((prev) => ({
      ratingCard: {
        ...((prev.ratingCard as AccreditationsData['ratingCard']) ?? card),
        ...patch,
      },
    }));

  return (
    <div className='mb-12 mt-16 bg-transparent'>
      {(editable || data.title) && (
        <div className='mb-8 border-b border-border pb-4'>
          <InlineText
            as='h2'
            singleLine
            editable={editable}
            value={data.title}
            onChange={(v) => onChange?.({ title: v })}
            placeholder='Section title (optional)'
            className='text-2xl font-bold text-secondary'
          />
        </div>
      )}

      <div className='mb-20'>
        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Rating card */}
          <div className='flex h-full flex-col items-start justify-center rounded-xl bg-secondary p-6 text-parchment shadow-sm'>
            <InlineText
              as='h3'
              singleLine
              editable={editable}
              value={card.name}
              onChange={(v) => patchCard({ name: v })}
              placeholder='Blackmont Advisory'
              className='mb-2 text-lg font-bold'
            />
            <div className='mb-2 flex items-center'>
              <span className='mr-2 font-semibold'>
                {(card.rating ?? 5).toFixed(1)}
              </span>
              <div className='flex'>{renderStars(card.rating ?? 5)}</div>
              {editable && (
                <select
                  value={card.rating ?? 5}
                  onChange={(e) => patchCard({ rating: Number(e.target.value) })}
                  className='ml-3 h-7 rounded-none border border-parchment/30 bg-secondary px-1 text-xs text-parchment outline-none'
                  title='Star rating'
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <InlineText
              as='p'
              editable={editable}
              value={card.caption}
              onChange={(v) => patchCard({ caption: v })}
              placeholder='Business Broker in South Melbourne, Victoria'
              className='text-sm text-parchment/70'
            />
          </div>

          {badges.map((badge, index) => (
            <BadgeCard
              key={badge.id ?? index}
              badge={badge}
              index={index}
              count={badges.length}
              editable={editable}
              onChange={(i, patch) =>
                editBadges((rows) => rows.map((r, k) => (k === i ? { ...r, ...patch } : r)))
              }
              onMove={(i, dir) => editBadges((rows) => moveItem(rows, i, dir))}
              onRemove={(i) => editBadges((rows) => rows.filter((_, k) => k !== i))}
              onUploadFile={onUploadFile}
              onCommit={onCommit}
            />
          ))}
        </div>

        {editable && (
          <AddRowButton
            label='Add badge'
            onClick={() =>
              editBadges((rows) => [
                ...rows,
                { id: makeUid('badge'), src: '', alt: 'Accreditation', url: '' },
              ])
            }
          />
        )}
      </div>
    </div>
  );
}
