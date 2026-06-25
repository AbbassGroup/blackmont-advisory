'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import AgreementContent from './agreement-content';

const COUNTRIES = [
  'Australia',
  'New Zealand',
  'United States',
  'United Kingdom',
  'Canada',
  'Other',
];

const TRUST_ACCOUNT = {
  bankName: ' Abbass Advocacy Estate Agency Business Statutory Trust Account',
  bsb: '013-350',
  acc: '659-404-759',
  ref: 'Your surname',
};

const inputCls =
  'bg-[#f9fafb] border-secondary/15 focus-visible:ring-secondary/20 focus-visible:border-secondary text-sm  h-11';

const selectCls =
  'w-full bg-[#f9fafb] border border-secondary/15 rounded-md px-3 h-11 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary';

interface Props {
  listingTitle: string;
  listingId: string;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5'>
      {children}
    </label>
  );
}

export default function NDAFormInline({ listingTitle, listingId }: Props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    country: '',
    business: listingTitle || '',
    address: '',
    suburb: '',
    state: '',
    postalCode: '',
    accountName: '',
    bsb: '',
    accountNumber: '',
  });
  const [deposit, setDeposit] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('firstName', form.firstName);
      fd.append('lastName', form.lastName);
      fd.append('email', form.email);
      fd.append('phone', form.mobile);
      fd.append('country', form.country);
      fd.append('address', form.address);
      fd.append('suburb', form.suburb);
      fd.append('state', form.state);
      fd.append('postalCode', form.postalCode);
      fd.append('businessTitle', form.business);
      fd.append('listingId', listingId);
      fd.append('accountName', form.accountName);
      fd.append('bsb', form.bsb);
      fd.append('accountNumber', form.accountNumber);
      if (deposit) fd.append('deposit', deposit);

      await apiClient.post('/api/confidentiality', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='flex flex-col items-center justify-center  border border-accent/15 bg-accent/5 px-6 py-12 text-center'>
        <CheckCircle className='mb-4 h-14 w-14 text-accent' />
        <h2 className='mb-2 text-xl font-bold text-secondary'>
          Agreement Submitted!
        </h2>
        <p className='max-w-md text-sm leading-relaxed text-muted-foreground'>
          Thank you. We will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Agreement scroll box */}
      <div className='max-h-[280px] overflow-y-auto border-l-4 border-accent bg-muted px-5 py-4'>
        <AgreementContent />
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* Name */}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <div>
            <Label>First Name *</Label>
            <Input
              className={inputCls}
              required
              value={form.firstName}
              onChange={set('firstName')}
            />
          </div>
          <div>
            <Label>Last Name *</Label>
            <Input
              className={inputCls}
              required
              value={form.lastName}
              onChange={set('lastName')}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label>Email *</Label>
          <Input
            className={inputCls}
            type='email'
            required
            value={form.email}
            onChange={set('email')}
          />
        </div>

        {/* Mobile */}
        <div>
          <Label>Mobile Number *</Label>
          <Input
            className={inputCls}
            required
            value={form.mobile}
            onChange={set('mobile')}
          />
        </div>

        {/* Country */}
        <div>
          <Label>Country *</Label>
          <select
            required
            value={form.country}
            onChange={set('country')}
            className={selectCls}
          >
            <option value=''>Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Business (pre-filled, disabled) */}
        <div>
          <Label>Business</Label>
          <Input
            className={`${inputCls} opacity-60 cursor-not-allowed`}
            value={form.business}
            onChange={set('business')}
            disabled={!!listingTitle}
          />
        </div>

        {/* Address */}
        <div>
          <Label>Address *</Label>
          <Input
            className={inputCls}
            required
            value={form.address}
            onChange={set('address')}
          />
        </div>

        {/* Suburb / State / Postcode */}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <div>
            <Label>Suburb *</Label>
            <Input
              className={inputCls}
              required
              value={form.suburb}
              onChange={set('suburb')}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>State *</Label>
              <Input
                className={inputCls}
                required
                value={form.state}
                onChange={set('state')}
              />
            </div>
            <div>
              <Label>Postcode *</Label>
              <Input
                className={inputCls}
                required
                value={form.postalCode}
                onChange={set('postalCode')}
              />
            </div>
          </div>
        </div>

        {/* Deposit screenshot */}
        <div>
          <Label>Attach screenshot of $1,000 deposit</Label>
          <Input
            name='deposit'
            type='file'
            accept='image/*,application/pdf'
            onChange={(e) => setDeposit(e.target.files?.[0] ?? null)}
            className={`${inputCls} file:mr-3 file:rounded file:bg-accent/15 file:px-2 file:py-1 file:text-accent`}
          />
        </div>

        {/* Purchaser refund details */}
        <div className='mt-2'>
          <h3 className='text-base font-semibold uppercase tracking-tight text-secondary'>
            Purchaser Refund Details
          </h3>
          <p className='mt-0.5 text-sm text-accent'>
            In the event a refund is required
          </p>
          <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
            Please note, in the event you are not successful and you have
            provided a holding deposit, we will refund your deposit as soon as
            it clears into the trust account. Please provide your bank details
            below:
          </p>
        </div>

        <div>
          <Label>Account Name</Label>
          <Input
            name='accountName'
            className={inputCls}
            value={form.accountName}
            onChange={set('accountName')}
          />
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <div>
            <Label>BSB</Label>
            <Input
              name='bsb'
              placeholder='000-000'
              className={inputCls}
              value={form.bsb}
              onChange={set('bsb')}
            />
          </div>
          <div>
            <Label>Account Number</Label>
            <Input
              name='accountNumber'
              placeholder='000000000'
              className={inputCls}
              value={form.accountNumber}
              onChange={set('accountNumber')}
            />
          </div>
        </div>

        {error && (
          <p className='text-red-500 text-sm bg-red-50 border border-red-100  px-4 py-3'>
            {error}
          </p>
        )}

        <Button
          type='submit'
          disabled={loading}
          className='h-12 w-full rounded-none bg-accent font-bold uppercase tracking-[0.12em] text-primary hover:bg-accent-light sm:w-auto sm:px-8'
        >
          {loading && <Loader2 className='h-4 w-4 animate-spin' />}
          {loading ? 'Submitting…' : 'Submit Agreement'}
        </Button>
      </form>

      {/* Trust account — predefined */}
      <div className='max-w-full border border-secondary/10 bg-card p-5'>
        <p className='font-semibold text-secondary'>{TRUST_ACCOUNT.bankName}</p>
        <div className='mt-3 space-y-1.5 text-sm text-muted-foreground'>
          <DetailRow label='BSB' value={TRUST_ACCOUNT.bsb} />
          <DetailRow label='ACC' value={TRUST_ACCOUNT.acc} />
          <DetailRow label='REF' value={TRUST_ACCOUNT.ref} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-baseline gap-2'>
      <span className='w-10 shrink-0 font-semibold text-muted-foreground'>
        {label}
      </span>
      <span className='text-muted-foreground'>{value}</span>
    </div>
  );
}
