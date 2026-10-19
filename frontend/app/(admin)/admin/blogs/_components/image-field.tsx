'use client';

import { useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';

interface ImageFieldProps {
  preview: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

/** Cover-image picker: original file with a live preview. */
export function ImageField({ preview, onChange, disabled }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className='flex min-w-0 flex-col gap-3'>
      <button type='button' disabled={disabled} aria-label={preview ? 'Change cover image' : 'Choose cover image'}
        onClick={() => inputRef.current?.click()}
        className='group relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border border-dashed border-advisory-input bg-canvas p-4 text-ink transition-colors duration-150 hover:border-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none'>
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt='Blog cover preview' className='absolute inset-0 h-full w-full object-cover' />
            <span className='absolute right-2 bottom-2 bg-midnight px-3 py-2 text-xs font-semibold text-white'>Change image</span>
          </>
        ) : (
          <span className='flex flex-col items-center gap-2'>
            <ImagePlus aria-hidden='true' className='size-6' />
            <span className='text-sm font-medium'>Choose a cover image</span>
          </span>
        )}
      </button>
      <p className='m-0 text-xs leading-[1.75] text-ink'>PNG, JPG or WebP — max 10MB.</p>
      {preview && <button type='button' onClick={clear} disabled={disabled}
        className='inline-flex min-h-8 w-fit items-center gap-2 text-xs font-medium text-red-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:opacity-50'>
        <Trash2 aria-hidden='true' className='size-4' />Remove cover image
      </button>}
      <input ref={inputRef} type='file' accept='image/*' hidden disabled={disabled} onChange={(event) => {
        const file = event.target.files?.[0];
        if (file) onChange(file);
        event.target.value = '';
      }} />
    </div>
  );
}
