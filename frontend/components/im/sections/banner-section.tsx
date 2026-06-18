'use client';

import { useRef, useState } from 'react';
import { ImageUp, Loader2 } from 'lucide-react';
import { InlineText } from '../inline-text';
import { DEFAULT_BANNER_IMAGE, type BannerData } from '../types';

export function BannerSection({
  data,
  editable,
  onChange,
  onUploadFile,
  onCommit,
}: {
  data: BannerData;
  editable?: boolean;
  onChange?: (patch: Partial<BannerData>) => void;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Fall back to the default ABBASS image when no background has been set.
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

  return (
    <header className='relative overflow-hidden bg-slate-900 text-white'>
      {/* Background image (defaults to the ABBASS image; editable per template) */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url("${bg}")` }}
      />
      {/* Subtle scrim for legibility */}
      <div className='absolute inset-0 bg-black/35' />

      {/* Corner upload button (editor only) */}
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
            title={
              data.backgroundImage
                ? 'Change background image'
                : 'Upload background image'
            }
            className='absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-black/65 disabled:opacity-60'
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

      <div className='relative z-10 flex min-h-[340px] flex-col px-6 py-10 sm:min-h-[460px] sm:px-14 sm:py-12'>
        {/* logo-text.webp is a white wordmark served under the public basePath. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/logo-text.webp'
          alt='Blackmont Advisory'
          className='h-7 w-auto object-contain object-left sm:h-8'
        />

        <div className='mt-auto max-w-2xl'>
          <InlineText
            as='p'
            singleLine
            editable={editable}
            value={data.title}
            onChange={(v) => onChange?.({ title: v })}
            placeholder='Information Memorandum'
            className='mb-2 text-xl font-medium text-brand-primary sm:mb-3 sm:text-3xl'
          />
          <InlineText
            as='h1'
            editable={editable}
            value={data.businessName}
            onChange={(v) => onChange?.({ businessName: v })}
            placeholder='Business Name'
            className='text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl'
          />
          <div className='mt-6 flex items-center gap-3'>
            <span className='h-7 w-1 rounded-full bg-brand-primary' />
            <InlineText
              singleLine
              editable={editable}
              value={data.price}
              onChange={(v) => onChange?.({ price: v })}
              placeholder='$1,000,000 + SaV'
              className='text-xl font-semibold text-white sm:text-2xl'
            />
          </div>
        </div>
      </div>
    </header>
  );
}
