'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader2, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { trackAccessEvent } from '@/lib/track';

const NEXAR_API_URL =
  process.env.NEXT_PUBLIC_NEXAR_API_URL ||
  'https://blackmont-api.nexartechnologies.com';

const consultationFields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your full name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@business.com.au' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: 'Enter your phone number' },
  { name: 'industry', label: 'Industry', type: 'text', autoComplete: undefined, placeholder: 'Enter industry' },
  { name: 'location', label: 'Location', type: 'text', autoComplete: 'address-level2', placeholder: 'Enter your location' },
  { name: 'turnover', label: 'Annual turnover', type: 'text', autoComplete: undefined, placeholder: 'Enter revenue' },
  { name: 'comments', label: 'Comments', type: 'text', autoComplete: undefined, placeholder: 'Enter your comments' },
] as const;

async function submitResourceLead({
  name,
  email,
  industry,
  location,
  comments,
  phone,
  notes,
  resource,
}: {
  name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  comments: string;
  notes?: Array<{ content: string }>;
  resource?: string;
}) {
  await axios.put(`${NEXAR_API_URL}/deals/update/by-email`, {
    stage: 'Enquiry',
    email,
    phone,
    typeOfBusiness: industry,
    location,
    comments,
    ...(name.trim() ? { name: name.trim() } : {}),
    ...(notes && notes.length ? { notes } : {}),
    ...(resource ? { resource } : {}),
  });
}

interface GetStartedProps {
  resourceTitle?: string;
  className?: string;
  selectedTime?: string;
  /**
   * Opt-in for the `?consultation=true` deep link to auto-open this dialog.
   * Only enable on ONE instance per page — otherwise every CTA opens a stacked
   * modal from the same param.
   */
  consultationTrigger?: boolean;
  children: React.ReactNode;
}

export function GetStarted({
  className,
  selectedTime,
  resourceTitle,
  consultationTrigger = false,
  children,
}: GetStartedProps) {
  const formId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consultation =
    consultationTrigger && searchParams.get('consultation') === 'true';
  const [open, setOpen] = useState(consultation);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    location: '',
    turnover: '',
    comments: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    industry?: string;
    location?: string;
    turnover?: string;
    comments?: string;
  }>({});
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const [prevConsultation, setPrevConsultation] = useState(consultation);
  if (consultation !== prevConsultation) {
    setPrevConsultation(consultation);
    if (consultation) setOpen(true);
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) return;

    setErrors({});
    setFailed(false);
    setSuccess(false);

    // Drop ?consultation from the URL without a navigation/scroll jump.
    if (consultation) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('consultation');
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }
  };

  const update = (
    field:
      | 'name'
      | 'email'
      | 'phone'
      | 'industry'
      | 'location'
      | 'turnover'
      | 'comments',
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (failed) setFailed(false);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: {
      name?: string;
      email?: string;
      industry?: string;
      location?: string;
      turnover?: string;
      phone?: string;
    } = {};

    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone number';
    if (!form.name.trim()) nextErrors.name = 'Please enter your name';
    if (!form.email.trim()) nextErrors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = 'Please enter a valid email address';
    if (!form.industry.trim())
      nextErrors.industry = 'Please enter your industry';
    if (!form.location.trim())
      nextErrors.location = 'Please enter your location';
    if (!form.turnover.trim())
      nextErrors.turnover = 'Please enter your annual turnover';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const turnover = form.turnover.trim();
    const userComment = form.comments.trim();
    const mergedComments =
      turnover && userComment
        ? `${turnover} - ${userComment}`
        : turnover || userComment;

    setLoading(true);
    setFailed(false);
    try {
      await submitResourceLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        location: form.location,
        comments: mergedComments,
        notes: selectedTime
          ? [{ content: `Preferred call time: ${selectedTime}` }]
          : undefined,
        resource: resourceTitle,
      });
      trackAccessEvent('lead_submitted', {
        resource: resourceTitle,
        lead: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          industry: form.industry,
          location: form.location,
          comments: mergedComments,
          leadType: 'consultation',
        },
      });
      setLoading(false);
      setSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        industry: '',
        location: '',
        turnover: '',
        comments: '',
      });
    } catch {
      setLoading(false);
      setFailed(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <motion.button
          type='button'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 2 * 0.08 }}
          className={className}
        >
          {children}
        </motion.button>
      </DialogTrigger>

      <DialogContent className={cn(landingFontVariables, 'max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-ink ring-0 sm:max-w-[480px] sm:p-7 [&>[data-slot=dialog-close]]:rounded-none [&>[data-slot=dialog-close]]:text-midnight')}>
        {success ? (
          <div>
            <Check className='mb-4 size-6 text-midnight' aria-hidden />
            <DialogTitle className='pr-8 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight sm:text-[25px]'>
              Request received
            </DialogTitle>
            <DialogDescription className='mt-3 text-[15px] leading-[1.75] text-ink'>
              Thanks! Our team will be in touch shortly to arrange your
              confidential call.
            </DialogDescription>
            <LandingButton
              size='compact'
              onClick={() => handleOpenChange(false)}
              className='mt-6 w-full'
            >
              Close
            </LandingButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className='pr-8 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight sm:text-[25px]'>
                Schedule a confidential call
              </DialogTitle>
              <DialogDescription className='sr-only'>
                Enter your details to request a confidential call.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
              {consultationFields.map((field) => {
                const inputId = `${formId}-${field.name}`;
                const errorId = `${inputId}-error`;
                const error = errors[field.name];
                const required = field.name !== 'comments';

                return (
                  <div key={field.name} className='space-y-1.5'>
                    <Label htmlFor={inputId} className='text-sm font-medium text-midnight'>
                      {field.label}{required && <span className='text-red-700'>*</span>}
                    </Label>
                    <Input
                      id={inputId}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={form[field.name]}
                      onChange={(e) => update(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      disabled={loading}
                      aria-required={required}
                      aria-invalid={!!error}
                      aria-describedby={error ? errorId : undefined}
                      className={cn('h-12 rounded-none border-advisory-input bg-white px-3 text-base text-midnight shadow-none transition-colors placeholder:text-ink/70 focus-visible:border-midnight focus-visible:ring-0 aria-invalid:border-red-700 aria-invalid:ring-0 motion-reduce:transition-none md:text-base', error && 'border-red-700 focus-visible:border-red-700')}
                    />
                    {error && (
                      <p id={errorId} role='alert' className='text-sm font-medium text-red-700'>{error}</p>
                    )}
                  </div>
                );
              })}

              {failed && (
                <p role='alert' className='text-sm font-medium text-red-700'>
                  Something went wrong. Please try again.
                </p>
              )}

              <LandingButton type='submit' size='compact' disabled={loading} className='w-full'>
                {loading && <Loader2 className='size-4 animate-spin' aria-hidden />}
                {loading ? 'Submitting…' : 'Submit'}
              </LandingButton>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
