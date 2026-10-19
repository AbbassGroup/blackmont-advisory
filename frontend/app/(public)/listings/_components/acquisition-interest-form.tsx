'use client';

import { useId, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { LandingButton } from '@/components/landing/presentation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CONTACT_API_URL =
  'https://blackmont-api.nexartechnologies.com/api/v1/contacts/create';

const inputCls =
  'h-12 rounded-none border-advisory-input bg-white px-3 text-base text-midnight shadow-none outline-none transition-colors duration-200 placeholder:text-ink/70 focus-visible:border-midnight focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none md:text-base';

const initialForm = {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  industryPreference: '',
  purchasePriceRange: '',
  ebitdaRequirements: '',
  locationPreference: '',
  comments: '',
};

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className='mb-2 block text-sm leading-[1.5] font-medium text-midnight'>
      {children}
      {optional ? (
        <span className='ml-1 font-normal text-ink'>
          (optional)
        </span>
      ) : (
        <span aria-hidden='true' className='ml-1'>*</span>
      )}
    </label>
  );
}

export function AcquisitionInterestForm() {
  const formId = useId();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set =
    (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError('');
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer businessbrokersecret`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.mobile,
          email: form.email,
          priceRange: form.purchasePriceRange,
          industry: form.industryPreference,
          ebitda: form.ebitdaRequirements,
          location: form.locationPreference,
          contactOwner: form.comments,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div role='status' className='mt-8 bg-canvas text-midnight p-6 min-[681px]:p-8'>
        <CheckCircle aria-hidden='true' className='mb-4 size-8 text-midnight' />
        <h3 className='mt-0 mb-3 font-advisory-heading text-[25px] leading-[1.4] font-bold tracking-normal'>
          Interest Registered
        </h3>
        <p className='m-0 max-w-[650px] text-base leading-[1.8] text-ink'>
          Thank you. Our team will review your requirements and contact you when
          suitable acquisition opportunities become available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={loading} className='mt-8 space-y-6 bg-canvas p-6 min-[681px]:p-8'>
      <div className='grid grid-cols-1 min-[681px]:grid-cols-2 gap-y-5 gap-x-6'>
        <div>
          <Label htmlFor={`${formId}-firstName`}>First name</Label>
          <Input
            id={`${formId}-firstName`}
            name='firstName'
            autoComplete='given-name'
            className={inputCls}
            required
            value={form.firstName}
            onChange={set('firstName')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-lastName`}>Last name</Label>
          <Input
            id={`${formId}-lastName`}
            name='lastName'
            autoComplete='family-name'
            className={inputCls}
            required
            value={form.lastName}
            onChange={set('lastName')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-mobile`}>Mobile</Label>
          <Input
            id={`${formId}-mobile`}
            name='mobile'
            autoComplete='tel'
            className={inputCls}
            type='tel'
            required
            value={form.mobile}
            onChange={set('mobile')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-email`}>Email</Label>
          <Input
            id={`${formId}-email`}
            name='email'
            autoComplete='email'
            className={inputCls}
            type='email'
            required
            value={form.email}
            onChange={set('email')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-industryPreference`}>Industry preference</Label>
          <Input
            id={`${formId}-industryPreference`}
            name='industryPreference'
            className={inputCls}
            required
            value={form.industryPreference}
            onChange={set('industryPreference')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-purchasePriceRange`}>Purchase price range</Label>
          <Input
            id={`${formId}-purchasePriceRange`}
            name='purchasePriceRange'
            className={inputCls}
            required
            value={form.purchasePriceRange}
            onChange={set('purchasePriceRange')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-ebitdaRequirements`}>EBITDA requirements</Label>
          <Input
            id={`${formId}-ebitdaRequirements`}
            name='ebitdaRequirements'
            className={inputCls}
            required
            value={form.ebitdaRequirements}
            onChange={set('ebitdaRequirements')}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-locationPreference`}>Location preference</Label>
          <Input
            id={`${formId}-locationPreference`}
            name='locationPreference'
            className={inputCls}
            required
            value={form.locationPreference}
            onChange={set('locationPreference')}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <Label htmlFor={`${formId}-comments`} optional>Comments</Label>
        <Textarea
          id={`${formId}-comments`}
          name='comments'
          className='min-h-[120px] resize-y rounded-none border-advisory-input bg-white px-3 py-3 text-base text-midnight shadow-none outline-none transition-colors duration-200 focus-visible:border-midnight focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none md:text-base'
          value={form.comments}
          onChange={set('comments')}
          disabled={loading}
        />
      </div>

      {error && (
        <p role='alert' className='m-0 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-[1.7] text-red-800'>
          {error}
        </p>
      )}

      <LandingButton
        type='submit'
        disabled={loading}
        className='w-full min-[681px]:w-auto'
      >
        {loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
        {loading ? 'Submitting...' : 'Register interest'}
      </LandingButton>
    </form>
  );
}
