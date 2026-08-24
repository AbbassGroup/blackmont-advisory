'use client';

import { useRef, useState } from 'react';
import { ImageUp, Loader2 } from 'lucide-react';
import { InlineText } from '@/components/im';
import {
  DEFAULT_BANNER_IMAGE,
  type ProposalBannerData,
  type ProposalTemplate,
} from './shared';

/** One column of the footer strip: tiny tracked label over its value. */
function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className='whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-parchment/45 sm:text-[10px]'>
        {label}
      </p>
      <p className='mt-1 whitespace-nowrap text-[13px] font-medium text-parchment sm:text-sm'>
        {value}
      </p>
    </div>
  );
}

/**
 * LOCKED SECTION — the cover.
 *
 * The business name and appraised value shown here are denormalised onto the
 * proposal model and quoted in the agreement, so this section can be edited but
 * never removed. The date and broker come from the document itself (the broker
 * is chosen in the Settings drawer), so they are read-only here.
 */
export function ProposalBannerSection({
  data,
  template = 'business_appraisal',
  brokerName,
  customerName,
  preparedOn,
  editable,
  onChange,
  onUploadFile,
  onCommit,
}: {
  data: ProposalBannerData;
  template?: ProposalTemplate;
  brokerName?: string;
  customerName?: string;
  /** Already formatted for display, e.g. "20 June 2026". */
  preparedOn?: string;
  editable?: boolean;
  onChange?: (patch: Partial<ProposalBannerData>) => void;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const isAppraisal = template === 'business_appraisal';
  const bg = data.backgroundImage || DEFAULT_BANNER_IMAGE;

  const handleFile = async (file: File) => {
    if (!onUploadFile) return;
    setUploading(true);
    try {
      const url = await onUploadFile(file);
      if (url) {
        onChange?.({ backgroundImage: url });
        onCommit?.();
      }
    } finally {
      setUploading(false);
    }
  };

  // The business name is already the headline, so the strip names the person
  // it was written for rather than repeating it.
  const meta = [
    { label: 'Prepared for', value: customerName },
    { label: 'Date', value: preparedOn },
    { label: 'By', value: brokerName },
  ].filter((m) => m.value) as { label: string; value: string }[];

  return (
    <header className='relative isolate flex min-h-[600px] w-full flex-col overflow-hidden border-b-2 border-accent bg-secondary sm:min-h-[780px]'>
      {/* Photograph */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url("${bg}")` }}
      />
      {/* Ink wash — heaviest at the bottom-left where the type sits, clearing
          towards the top-right so the photograph still reads as a photograph. */}
      <div className='absolute inset-0 bg-gradient-to-tr from-secondary via-secondary/75 to-secondary/10' />
      <div className='absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent' />

      {editable && (
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
          <button
            type='button'
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            title={data.backgroundImage ? 'Change cover image' : 'Upload cover image'}
            className='absolute right-5 top-5 z-30 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-black/65 disabled:opacity-60 print:hidden'
          >
            {uploading ? (
              <Loader2 className='h-3.5 w-3.5 animate-spin' />
            ) : (
              <ImageUp className='h-3.5 w-3.5' />
            )}
            {data.backgroundImage ? 'Change image' : 'Upload image'}
          </button>
        </>
      )}

      {/* The public site's nav is fixed over the top of the page, so the cover
          leaves it room rather than sliding underneath it. */}
      <div className='relative z-20 flex flex-1 flex-col px-7 pb-9 pt-24 sm:px-16 sm:pb-14 sm:pt-32'>
        {/* Title block, pinned to the lower third. The brand mark sits in the
            footer strip rather than up here — on the customer's page the site
            nav already carries the wordmark directly above. */}
        <div className='mt-auto'>
          <InlineText
            as='p'
            singleLine
            editable={editable}
            value={data.eyebrow}
            onChange={(v) => onChange?.({ eyebrow: v })}
            placeholder='Business Appraisal'
            className='text-[11px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs'
          />

          <InlineText
            as='h1'
            editable={editable}
            value={data.businessName}
            onChange={(v) => onChange?.({ businessName: v })}
            placeholder='[Business Name]'
            className='mt-3 max-w-3xl text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-6xl'
          />

          {isAppraisal && (
            <InlineText
              as='p'
              singleLine
              editable={editable}
              value={data.businessValue}
              onChange={(v) => onChange?.({ businessValue: v })}
              placeholder='[Business Value]'
              className='mt-5 text-xl font-semibold tracking-[-0.01em] text-accent sm:text-3xl'
            />
          )}
        </div>

        {/* Footer strip: who / when / by, with the brand mark opposite */}
        <div className='mt-10 flex items-end justify-between gap-6 border-t border-parchment/20 pt-5 sm:mt-14 sm:pt-6'>
          <dl className='flex min-w-0 flex-wrap gap-x-10 gap-y-5 sm:gap-x-14'>
            {meta.map((m) => (
              <MetaCell key={m.label} label={m.label} value={m.value} />
            ))}
          </dl>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/assets/blackmont-light.png'
            alt='Blackmont Advisory'
            className='hidden h-7 w-auto shrink-0 object-contain opacity-90 lg:block lg:h-8 print:block print:h-7'
          />
        </div>
      </div>
    </header>
  );
}
