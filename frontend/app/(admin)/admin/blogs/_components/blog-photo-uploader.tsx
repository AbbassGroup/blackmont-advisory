'use client';

import { useRef, useState } from 'react';
import { Check, Copy, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { uploadBlogImage, blogErrorMessage } from '@/lib/blogs';

interface BlogPhotoUploaderProps {
  value: string;
  onUploaded: (url: string) => void;
}

/**
 * Uploads one image and hands back its public URL, ready to paste wherever a
 * URL is needed. The editor's own image button covers inserting into the body —
 * this is for everything else.
 */
export default function BlogPhotoUploader({ value, onUploaded }: BlogPhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFile = async (file: File | null) => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadBlogImage(file);
      onUploaded(url);
      await copy(url);
      toast.success('Image uploaded — URL copied to clipboard');
    } catch (error) {
      toast.error(blogErrorMessage(error, 'Failed to upload image'));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  // Clipboard access can be denied (insecure origin, permissions) — the URL is
  // still shown below so it can be copied by hand.
  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className='space-y-2'>
      <button
        type='button'
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className='flex h-9 w-full items-center justify-center gap-1.5 border border-border bg-card px-3 text-xs font-medium text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60'
      >
        {uploading ? (
          <Loader2 className='h-3.5 w-3.5 animate-spin' />
        ) : (
          <Upload className='h-3.5 w-3.5' />
        )}
        {uploading ? 'Uploading...' : 'Upload image'}
      </button>

      {value && (
        <button
          type='button'
          onClick={() => copy(value)}
          title={value}
          className='flex w-full items-center gap-1.5 border border-border bg-muted/60 px-2 py-1.5 text-left text-[11px] text-muted-foreground transition-colors hover:text-foreground'
        >
          {copied ? (
            <Check className='h-3 w-3 shrink-0 text-emerald-600' />
          ) : (
            <Copy className='h-3 w-3 shrink-0' />
          )}
          <span className='truncate'>{value}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        hidden
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
