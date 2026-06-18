'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader2, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { trackAccessEvent } from '@/lib/track';

const NEXAR_API_URL =
  process.env.NEXT_PUBLIC_NEXAR_API_URL ||
  'https://api.nexartechnologies.com/api/v1';

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

      <DialogContent className='p-6 sm:max-w-110 gap-0'>
        {success ? (
          <div className='py-4 text-center'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10'>
              <Check className='h-7 w-7 text-accent' />
            </div>
            <DialogTitle className='text-lg font-semibold text-secondary'>
              Request received
            </DialogTitle>
            <p className='mx-auto mt-2 max-w-xs text-sm text-muted-foreground'>
              Thanks! Our team will be in touch shortly to arrange your
              confidential call.
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              className='bg-accent mt-5 w-full'
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className='space-y-1.5'>
              <DialogTitle className='text-base sm:text-lg font-semibold text-secondary'>
                Schedule a Confidential Call
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
              <div className='space-y-1.5'>
                <Label htmlFor='rg-name' className='text-sm font-medium'>
                  Name<span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='rg-name'
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder='Your full name'
                  disabled={loading}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className='text-xs font-medium text-red-500'>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className='space-y-1.5'>
                <Label htmlFor='rg-email' className='text-sm font-medium'>
                  Email<span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='rg-email'
                  type='email'
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder='you@business.com.au'
                  disabled={loading}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className='text-xs font-medium text-red-500'>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='rg-phone' className='text-sm font-medium'>
                  Phone<span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='rg-phone'
                  type='phone'
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder='Enter your phone number'
                  disabled={loading}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className='text-xs font-medium text-red-500'>
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='rg-industry' className='text-sm font-medium'>
                  Industry<span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='rg-industry'
                  type='industry'
                  value={form.industry}
                  onChange={(e) => update('industry', e.target.value)}
                  placeholder='Enter industry'
                  disabled={loading}
                  className={errors.industry ? 'border-red-500' : ''}
                />
                {errors.industry && (
                  <p className='text-xs font-medium text-red-500'>
                    {errors.industry}
                  </p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='rg-location' className='text-sm font-medium'>
                  Location<span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='rg-location'
                  type='location'
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                  placeholder='Enter your location'
                  disabled={loading}
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && (
                  <p className='text-xs font-medium text-red-500'>
                    {errors.location}
                  </p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='rg-turnover' className='text-sm font-medium'>
                  Annual Turnover<span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='rg-turnover'
                  type='text'
                  value={form.turnover}
                  onChange={(e) => update('turnover', e.target.value)}
                  placeholder='Enter revenue'
                  disabled={loading}
                  className={errors.turnover ? 'border-red-500' : ''}
                />
                {errors.turnover && (
                  <p className='text-xs font-medium text-red-500'>
                    {errors.turnover}
                  </p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='rg-comments' className='text-sm font-medium'>
                  Comments
                </Label>
                <Input
                  id='rg-comments'
                  type='text'
                  value={form.comments}
                  onChange={(e) => update('comments', e.target.value)}
                  placeholder='Enter your comments'
                  disabled={loading}
                />
              </div>

              {failed && (
                <p className='text-center text-sm font-medium text-red-500'>
                  Something went wrong. Please try again.
                </p>
              )}

              <Button type='submit' disabled={loading} className='w-full'>
                {loading && <Loader2 className='h-4 w-4 animate-spin' />}
                {loading ? 'Submitting…' : 'Submit'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
