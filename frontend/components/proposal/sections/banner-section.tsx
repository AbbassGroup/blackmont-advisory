'use client';

import { useRef, useState } from 'react';
import { ImageUp, Loader2 } from 'lucide-react';
import { InlineText } from '@/components/im';
import { LandingImage } from '@/components/landing/landing-image';
import { LandingContainer } from '@/components/landing/presentation';
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

/** LOCKED SECTION — the cover. */
export function ProposalBannerSection({
  data,
  appearance = 'document',
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
  appearance?: 'document' | 'advisory';
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

  if (appearance === 'advisory' && !editable) {
    return (
      <header className='relative isolate overflow-hidden border-b border-advisory-rule bg-canvas'>
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[560px] min-[931px]:items-center'>
          <div className='pointer-events-auto min-w-0 min-[931px]:w-[53%] py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20'>
            <h1 className='m-0 max-w-[680px] break-words font-advisory-heading text-[clamp(34px,7.5vw,46px)] leading-[1.22] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(40px,4.2vw,56px)]'>
              {data.businessName || '[Business Name]'}
            </h1>
            {data.eyebrow && (
              <p className='mt-5 mb-0 text-lg leading-[1.7] text-ink'>{data.eyebrow}</p>
            )}
            {isAppraisal && data.businessValue && (
              <p className='mt-5 mb-0 font-advisory-heading text-[27px] leading-[1.4] font-bold text-midnight min-[681px]:text-[32px]'>
                {data.businessValue}
              </p>
            )}
            {meta.length > 0 && (
              <dl className='mt-8 mb-0 flex flex-wrap gap-x-9 gap-y-5'>
                {meta.map(({ label, value }) => (
                  <div key={label} className='min-w-0 max-w-full'>
                    <dt className='text-sm leading-[1.6] text-ink'>{label}</dt>
                    <dd className='mt-2 break-words text-base leading-[1.7] font-medium text-midnight'>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </LandingContainer>
        <figure className='relative m-0 h-[clamp(260px,60vw,420px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[58%]'>
          <LandingImage
            src={bg}
            alt=''
            fill
            preload
            unoptimized
            sizes='(max-width: 930px) 100vw, 58vw'
            className='object-cover'
          />
          <div aria-hidden='true' className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[6%] to-canvas/0 to-[22%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[18%] min-[931px]:to-[48%]' />
        </figure>
      </header>
    );
  }

  return (
    <header className='relative isolate flex min-h-[600px] w-full flex-col overflow-hidden border-b-2 border-accent bg-secondary sm:min-h-[780px]'>
      {/* Photograph */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url("${bg}")` }}
      />
      {/* Ink wash — heaviest at the bottom-left where the type sits, clearing
          towards the top-right so the photograph still reads as a photograph.
          Raster ramps rather than CSS gradients: a gradient fading to
          transparent compiles to a PDF function-based shading, which pdf.js
          can't render and paints hotpink instead. */}
      <div
        className='absolute inset-0 bg-cover'
        style={{ backgroundImage: 'url("/assets/scrim-cover.png")', backgroundSize: '100% 100%' }}
      />
      <div
        className='absolute inset-0'
        style={{ backgroundImage: 'url("/assets/scrim-foot.png")', backgroundSize: '100% 100%' }}
      />

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
