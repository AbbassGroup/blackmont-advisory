'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CONTACT_API_URL =
  'https://blackmont-api.nexartechnologies.com/api/v1/contacts/create';

const inputCls =
  'bg-[#f9fafb] border-gray-200 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary text-sm h-11';

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
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500'>
      {children}
      {optional ? (
        <span className='ml-1 font-normal normal-case text-gray-300'>
          (optional)
        </span>
      ) : (
        <span className='ml-1 text-brand-primary'>*</span>
      )}
    </label>
  );
}

export function AcquisitionInterestForm() {
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
      <div className='flex flex-col items-center justify-center rounded-2xl border border-brand-primary/15 bg-brand-primary/5 px-6 py-12 text-center'>
        <CheckCircle className='mb-4 h-14 w-14 text-brand-primary' />
        <h2 className='mb-2 text-xl font-bold text-brand-black'>
          Interest Registered
        </h2>
        <p className='max-w-md text-sm leading-relaxed text-gray-500'>
          Thank you. Our team will review your requirements and contact you when
          suitable acquisition opportunities become available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div>
          <Label>First Name</Label>
          <Input
            className={inputCls}
            required
            value={form.firstName}
            onChange={set('firstName')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            className={inputCls}
            required
            value={form.lastName}
            onChange={set('lastName')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>Mobile</Label>
          <Input
            className={inputCls}
            type='tel'
            required
            value={form.mobile}
            onChange={set('mobile')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            className={inputCls}
            type='email'
            required
            value={form.email}
            onChange={set('email')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>Industry Preference</Label>
          <Input
            className={inputCls}
            required
            value={form.industryPreference}
            onChange={set('industryPreference')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>Purchase Price Range</Label>
          <Input
            className={inputCls}
            required
            value={form.purchasePriceRange}
            onChange={set('purchasePriceRange')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>EBITDA Requirements</Label>
          <Input
            className={inputCls}
            required
            value={form.ebitdaRequirements}
            onChange={set('ebitdaRequirements')}
            disabled={loading}
          />
        </div>
        <div>
          <Label>Location Preference</Label>
          <Input
            className={inputCls}
            required
            value={form.locationPreference}
            onChange={set('locationPreference')}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <Label optional>Comments</Label>
        <Textarea
          className='min-h-[120px] bg-[#f9fafb] text-sm border-gray-200 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary'
          value={form.comments}
          onChange={set('comments')}
          disabled={loading}
        />
      </div>

      {error && (
        <p className='rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-500'>
          {error}
        </p>
      )}

      <Button
        type='submit'
        disabled={loading}
        className='h-12 w-full bg-brand-primary font-semibold text-white hover:bg-brand-primary/90 sm:w-auto sm:px-8'
      >
        {loading && <Loader2 className='h-4 w-4 animate-spin' />}
        {loading ? 'Submitting...' : 'Register Interest'}
      </Button>
    </form>
  );
}
