'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { LandingButton } from '@/components/landing/presentation';
import { uploadBlogImage, blogErrorMessage } from '@/lib/blogs';

interface BlogPhotoUploaderProps {
  value: string;
  onUploaded: (url: string) => void;
  disabled?: boolean;
}

/** Upload an original image and return its public URL. */
export default function BlogPhotoUploader({ value, onUploaded, disabled }: BlogPhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setError('');
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  };

  const handleFile = async (file: File | null) => {
    if (!file || uploading || disabled) return;
    setUploading(true);
    setError('');
    try {
      const url = await uploadBlogImage(file);
      onUploaded(url);
      const didCopy = await copy(url);
      toast.success(didCopy ? 'Image uploaded — URL copied to clipboard' : 'Image uploaded — copy the URL below');
    } catch (cause) {
      const message = blogErrorMessage(cause, 'Failed to upload image. Please try again.');
      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className='flex min-w-0 flex-col gap-3'>
      <LandingButton variant='outline' size='compact' disabled={uploading || disabled} onClick={() => inputRef.current?.click()} className='w-full'>
        {uploading ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Upload aria-hidden='true' className='size-4' />}
        {uploading ? 'Uploading…' : 'Upload image'}
      </LandingButton>
      {value && (
        <div className='flex min-w-0 flex-col gap-2'>
          <label htmlFor='blog-upload-url' className='text-xs font-medium text-midnight'>Uploaded image URL</label>
          <div className='flex min-w-0 border border-advisory-input bg-white focus-within:border-gilt'>
            <input id='blog-upload-url' readOnly value={value} onFocus={(event) => event.target.select()} className='h-10 w-full min-w-0 bg-transparent px-3 text-sm text-ink outline-none' />
            <button type='button' disabled={disabled} title={copied ? 'URL copied' : 'Copy image URL'} aria-label={copied ? 'Image URL copied' : 'Copy image URL'} onClick={async () => { if (!await copy(value)) setError('Copy failed. Select the URL and copy it manually.'); }}
              className='flex size-10 shrink-0 items-center justify-center border-l border-advisory-rule text-midnight hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:opacity-50'>
              {copied ? <Check aria-hidden='true' className='size-4 text-emerald-800' /> : <Copy aria-hidden='true' className='size-4' />}
            </button>
          </div>
        </div>
      )}
      <span role='status' className='sr-only'>{uploading ? 'Uploading image.' : copied ? 'Image URL copied.' : ''}</span>
      {error && <p role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>{error}</p>}
      <input ref={inputRef} type='file' accept='image/*' hidden disabled={uploading || disabled} onChange={(event) => void handleFile(event.target.files?.[0] ?? null)} />
    </div>
  );
}
