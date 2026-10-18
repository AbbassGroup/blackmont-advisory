'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Check, Loader2, Mail } from 'lucide-react';
import axios from 'axios';
import type { DocumentProps } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trackAccessEvent } from '@/lib/track';
import type { PdfAssets } from './pdf/shared';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const NEXAR_API_URL =
  process.env.NEXT_PUBLIC_NEXAR_API_URL ||
  'https://blackmont-api.nexartechnologies.com';

/** Asked once per browser, not once per tool. */
const EMAIL_KEY = 'bm_resource_email';

function storedEmail(): string | null {
  try {
    return window.localStorage.getItem(EMAIL_KEY);
  } catch {
    return null;
  }
}

function rememberEmail(email: string) {
  try {
    window.localStorage.setItem(EMAIL_KEY, email);
  } catch {
    // private browsing or blocked storage: we just ask again next time
  }
}

async function submitResourceLead({
  email,
  resource,
}: {
  email: string;
  resource: string;
}) {
  await axios.put(`${NEXAR_API_URL}/deals/update/by-email`, {
    stage: 'Resource Access',
    businessUnit: 'Business Brokers',
    office: 'Head Office',
    resource,
    email,
  });
}

interface PrintButtonProps {
  buildDocument: (assets: PdfAssets) => React.ReactElement<DocumentProps>;
  fileName: string;
  /** Resource name recorded against the lead. */
  resource: string;
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
  resource,
  label = 'Print Report',
  className,
}: PrintButtonProps) {
  const emailId = useId();
  const emailErrorId = `${emailId}-error`;
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  const sendReport = async (address: string) => {
    const [logo, mark, mod] = await Promise.all([
      loadImageAsPng('/assets/blackmont.png'),
      loadImageAsPng('/assets/logo.png'),
      import('@react-pdf/renderer'),
    ]);
    const blob = await mod.pdf(buildDocument({ logo, mark })).toBlob();

    const form = new FormData();
    form.append('email', address);
    form.append('resource', resource);
    form.append('report', blob, fileName);

    await axios.post(`${API_URL}/api/resource-reports`, form);
  };

  const handleClick = () => {
    if (busy) return;
    setError(undefined);
    setSent(false);
    setEmail(storedEmail() ?? '');
    setOpen(true);
  };

  const submit = async () => {
    const value = email.trim();
    if (!value) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(undefined);
    setBusy(true);

    try {
      await sendReport(value);
    } catch (err) {
      console.error('Failed to email report:', err);
      setError('We could not send the report. Please try again.');
      setBusy(false);
      return;
    }

    // The report is away; lead capture must never block or undo that.
    trackAccessEvent('lead_submitted', {
      resource,
      lead: { email: value, leadType: 'pdf_download' },
    });
    try {
      await submitResourceLead({ email: value, resource });
    } catch (err) {
      console.error('Resource lead sync failed:', err);
    }

    rememberEmail(value);
    setBusy(false);
    setSent(true);
  };

  return (
    <>
      <Button
        type='button'
        variant='outline'
        onClick={handleClick}
        disabled={busy}
        className={`gap-2 rounded-full px-6 py-4 ${className ?? ''}`}
      >
        <Mail className='h-4 w-4' />
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn(landingFontVariables, 'max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-none border border-advisory-rule bg-white p-0 font-advisory-body text-ink ring-0 sm:max-w-[480px] [&>[data-slot=dialog-close]]:rounded-none [&>[data-slot=dialog-close]]:text-midnight')}>
          <div className='px-6 pt-7 pb-2 sm:px-7'>
            <DialogHeader className='text-left'>
              <DialogTitle className='pr-8 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight sm:text-[25px]'>
                {sent ? 'Report sent' : 'Email your report'}
              </DialogTitle>
            </DialogHeader>
            {!sent && (
              <DialogDescription className='mt-3 text-[15px] leading-[1.75] text-ink'>
                We will email the report to the address below.
              </DialogDescription>
            )}
          </div>

          {sent ? (
            <div className='px-6 pt-4 pb-7 sm:px-7'>
              <DialogDescription className='flex items-start gap-2.5 text-[15px] leading-[1.75] text-ink'>
                <Check className='mt-1 h-4 w-4 shrink-0 text-midnight' aria-hidden />
                <span className='min-w-0 break-words'>
                  Sent to <strong className='font-semibold'>{email.trim()}</strong>.
                  It should arrive within a minute. Check your spam folder if it
                  does not.
                </span>
              </DialogDescription>
              <LandingButton
                type='button'
                size='compact'
                onClick={() => setOpen(false)}
                className='mt-6 w-full'
              >
                Done
              </LandingButton>
            </div>
          ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
            className='space-y-4 px-6 pt-6 pb-7 sm:px-7'
            noValidate
          >
            <div className='space-y-1.5'>
              <Label
                htmlFor={emailId}
                className='text-sm font-medium text-midnight'
              >
                Email <span className='text-red-700'>*</span>
              </Label>
              <Input
                id={emailId}
                type='email'
                autoComplete='email'
                inputMode='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(undefined);
                }}
                placeholder='you@business.com.au'
                disabled={busy}
                required
                aria-invalid={!!error}
                aria-describedby={error ? emailErrorId : undefined}
                className={cn('h-12 rounded-none border-advisory-input bg-white px-3 text-base text-midnight shadow-none transition-colors placeholder:text-ink/70 focus-visible:border-midnight focus-visible:ring-0 aria-invalid:border-red-700 aria-invalid:ring-0 motion-reduce:transition-none md:text-base', error && 'border-red-700 focus-visible:border-red-700')}
              />
              {error && (
                <p id={emailErrorId} role='alert' className='text-sm font-medium text-red-700'>{error}</p>
              )}
            </div>

            <LandingButton
              type='submit'
              size='compact'
              disabled={busy}
              className='w-full'
            >
              {busy ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Sending…
                </>
              ) : (
                'Send report'
              )}
            </LandingButton>

            <p className='text-center text-xs leading-[1.75] text-ink'>
              By submitting, you agree to our{' '}
              <Link
                href='/privacy'
                target='_blank'
                className='text-gilt underline underline-offset-3 transition-colors hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                href='/terms-and-conditions'
                target='_blank'
                className='text-gilt underline underline-offset-3 transition-colors hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
