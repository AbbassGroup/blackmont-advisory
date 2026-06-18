'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { SectionHeading } from '../section-chrome';
import type { MakeOfferData } from '../types';

const TRUST_ACCOUNT = {
  bankName: 'Blackmont Advisory Estate Agency Business Statutory Trust Account',
  bsb: '013-350',
  acc: '659-404-759',
};

export function MakeOfferSection({
  data,
  editable,
  onChange,
  brokerEmail,
  businessName,
}: {
  data: MakeOfferData;
  editable?: boolean;
  onChange?: (patch: Partial<MakeOfferData>) => void;
  brokerEmail?: string;
  businessName?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  // Keep the confirmation in view after submit (the short message would
  // otherwise leave the viewport scrolled past it).
  useEffect(() => {
    if (submitted) {
      successRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In the editor preview, just simulate — don't send a real email.
    if (editable) {
      setSubmitted(true);
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      fd.append('brokerEmail', brokerEmail || '');
      fd.append('businessName', businessName || '');
      await apiClient.post('/api/im-templates/public/offer', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitted(true);
    } catch {
      setError(
        'Could not submit your offer. Please try again or contact the broker.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder='Make an Offer'
      />

      {submitted ? (
        <div
          ref={successRef}
          className='flex max-w-full items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-5 text-green-700'
        >
          <CheckCircle2 className='h-5 w-5 shrink-0' />
          <div className='flex-1'>
            <p className='font-semibold'>Offer received</p>
            <p className='text-sm text-green-600/80'>
              Thank you. Your broker will be in touch shortly.
            </p>
          </div>
          <Button variant='outline' onClick={() => setSubmitted(false)}>
            Submit another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='grid gap-4 sm:grid-cols-2'>
          <Field label='Name' required>
            <Input name='name' required placeholder='Full name' />
          </Field>
          <Field label='Number' required>
            <Input name='number' required placeholder='Phone number' />
          </Field>
          <Field label='Email' required>
            <Input
              name='email'
              type='email'
              required
              placeholder='you@example.com'
            />
          </Field>
          <Field label='Offer amount' required>
            <Input name='offerAmount' required placeholder='e.g. $550,000' />
          </Field>
          <Field label='Offer terms' required className='sm:col-span-2'>
            <Input
              name='offerTerms'
              required
              placeholder='e.g. Subject to finance'
            />
          </Field>
          <Field label='Comments' className='sm:col-span-2'>
            <Textarea
              name='comments'
              rows={3}
              placeholder='Anything else we should know?'
            />
          </Field>
          <Field
            label='Attach screenshot of $1,000 deposit'
            className='sm:col-span-2'
          >
            <Input
              name='deposit'
              type='file'
              accept='image/*,application/pdf'
              className='file:mr-3 file:rounded file:bg-brand-primary/10 file:px-2 file:py-1 file:text-brand-primary'
            />
          </Field>

          {/* Purchaser refund details — part of the offer form */}
          <div className='mt-2 sm:col-span-2'>
            <h3 className='text-base font-semibold uppercase tracking-tight text-brand-black'>
              Purchaser Refund Details
            </h3>
            <p className='mt-0.5 text-sm text-brand-primary'>
              In the event a refund is required
            </p>
            <p className='mt-4 text-sm leading-relaxed text-gray-500'>
              Please note, in the event you are not successful and you have
              provided a holding deposit, we will refund your deposit as soon as
              it clears into the trust account. Please provide your bank details
              below:
            </p>
          </div>
          <Field label='Account Name' className='sm:col-span-2'>
            <Input name='accountName' placeholder='Account name' />
          </Field>
          <Field label='BSB'>
            <Input name='bsb' placeholder='000-000' />
          </Field>
          <Field label='Account Number'>
            <Input name='accountNumber' placeholder='000000000' />
          </Field>

          {error && (
            <p className='text-sm text-red-600 sm:col-span-2'>{error}</p>
          )}
          <div className='sm:col-span-2'>
            <Button
              type='submit'
              size='lg'
              disabled={submitting}
              className='bg-brand-primary text-white hover:bg-brand-primary/90'
            >
              {submitting ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                'Submit Offer'
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Trust account — predefined; REF is unique per memorandum */}
      <div className='mt-8 max-w-full rounded-2xl border border-gray-200 bg-white p-5'>
        <p className='font-semibold text-brand-black'>
          {TRUST_ACCOUNT.bankName}
        </p>
        <div className='mt-3 space-y-1.5 text-sm text-gray-600'>
          <DetailRow label='BSB' value={TRUST_ACCOUNT.bsb} />
          <DetailRow label='ACC' value={TRUST_ACCOUNT.acc} />
          <DetailRow
            label='REF'
            value={data.ref || '-'}
            valueClassName='font-semibold text-brand-black'
          />
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className='mb-1.5 block text-sm font-medium text-gray-600'>
        {label}
        {required && <span className='ml-0.5 text-red-400'>*</span>}
      </label>
      {children}
    </div>
  );
}

function DetailRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className='flex items-baseline gap-2'>
      <span className='w-10 shrink-0 font-semibold text-gray-500'>{label}</span>
      <span className={valueClassName ?? 'text-gray-600'}>{value}</span>
    </div>
  );
}
