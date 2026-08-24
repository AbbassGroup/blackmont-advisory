'use client';

import { useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';

interface ImageFieldProps {
  preview: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

/** Cover-image picker: click to choose a file, with a live preview. */
export function ImageField({ preview, onChange, disabled }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className='space-y-2'>
      <button
        type='button'
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className='group relative flex h-44 w-full items-center justify-center overflow-hidden border border-dashed border-border bg-muted/40 transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60'
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt='Cover preview'
            className='h-full w-full object-cover'
          />
        ) : (
          <span className='flex flex-col items-center gap-1.5 text-muted-foreground'>
            <ImagePlus className='h-6 w-6' />
            <span className='text-xs font-medium'>Click to upload a cover image</span>
            <span className='text-[11px] text-muted-foreground/70'>PNG, JPG or WebP — max 10MB</span>
          </span>
        )}
      </button>

      {preview && (
        <button
          type='button'
          onClick={clear}
          disabled={disabled}
          className='flex items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-600 disabled:opacity-50'
        >
          <Trash2 className='h-3.5 w-3.5' />
          Remove cover image
        </button>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
