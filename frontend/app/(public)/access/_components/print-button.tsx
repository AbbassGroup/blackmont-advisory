'use client';

import { useState } from 'react';
import { Printer } from 'lucide-react';
import type { DocumentProps } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import type { PdfAssets } from './pdf/shared';

interface PrintButtonProps {
  buildDocument: (assets: PdfAssets) => React.ReactElement<DocumentProps>;
  fileName: string;
  label?: string;
  className?: string;
}

async function loadImageAsPng(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

export function PrintButton({
  buildDocument,
  fileName,
  label = 'Print Report',
  className,
}: PrintButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const [logo, mark, mod] = await Promise.all([
        loadImageAsPng('/businessbrokers/logo-dark.png'),
        loadImageAsPng('/businessbrokers/mark.webp'),
        import('@react-pdf/renderer'),
      ]);
      const blob = await mod.pdf(buildDocument({ logo, mark })).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      type='button'
      variant='outline'
      onClick={handleClick}
      disabled={busy}
      className={`gap-2 rounded-full px-6 py-4 ${className ?? ''}`}
    >
      <Printer className='h-4 w-4' />
      {busy ? 'Preparing…' : label}
    </Button>
  );
}
