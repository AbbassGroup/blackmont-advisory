'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CONTACT_API_URL =
  'https://blackmont-api.nexartechnologies.com/api/v1/contacts/create';

const inputCls =
  'bg-[#f9fafb] border-secondary/15 focus-visible:ring-secondary/20 focus-visible:border-secondary text-sm h-11';

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
    <label className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
      {children}
      {optional ? (
        <span className='ml-1 font-normal normal-case text-muted-foreground'>
          (optional)
        </span>
      ) : (
        <span className='ml-1 text-accent'>*</span>
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
      <div className='flex flex-col items-center justify-center  border border-accent/15 bg-accent/5 px-6 py-12 text-center'>
        <CheckCircle className='mb-4 h-14 w-14 text-accent' />
        <h2 className='mb-2 text-xl font-bold text-secondary'>
          Interest Registered
        </h2>
        <p className='max-w-md text-sm leading-relaxed text-muted-foreground'>
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
          className='min-h-[120px] bg-[#f9fafb] text-sm border-secondary/15 focus-visible:ring-secondary/20 focus-visible:border-secondary'
          value={form.comments}
          onChange={set('comments')}
          disabled={loading}
        />
      </div>

      {error && (
        <p className=' border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-500'>
          {error}
        </p>
      )}

      <Button
        type='submit'
        disabled={loading}
        className='h-12 w-full rounded-none bg-accent font-bold uppercase tracking-[0.12em] text-primary hover:bg-accent-light sm:w-auto sm:px-8'
      >
        {loading && <Loader2 className='h-4 w-4 animate-spin' />}
        {loading ? 'Submitting...' : 'Register Interest'}
      </Button>
    </form>
  );
}
