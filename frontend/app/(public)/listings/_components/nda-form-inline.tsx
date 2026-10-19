'use client';

import { useId, useState, type ReactNode } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LandingButton } from '@/components/landing/presentation';
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
  'h-12 rounded-none border-advisory-input bg-white px-3 text-base text-midnight shadow-none outline-none transition-colors duration-200 placeholder:text-ink/70 focus-visible:border-midnight focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none md:text-base';

const selectCls =
  'h-12 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 text-base text-midnight outline-none transition-colors duration-200 focus:border-midnight disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none';

interface Props {
  listingTitle: string;
  listingId: string;
}

function Label({ htmlFor, children, required = false }: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className='mb-2 block text-sm leading-[1.5] font-medium text-midnight'>
      {children}{required && <span aria-hidden='true'> *</span>}
    </label>
  );
}

const groupHeading = 'mb-5 w-full p-0 font-advisory-body text-[18px] leading-[1.5] font-semibold tracking-normal text-midnight';

export default function NDAFormInline({ listingTitle, listingId }: Props) {
  const formId = useId();
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
      <div role='status' className='bg-canvas text-midnight p-6 min-[681px]:p-8'>
        <CheckCircle aria-hidden='true' className='mb-4 size-8' />
        <h2 className='mt-0 mb-3 font-advisory-heading text-[28px] leading-[1.4] font-bold tracking-normal'>
          Agreement Submitted!
        </h2>
        <p className='m-0 text-base leading-[1.8] text-ink'>
          Thank you. We will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-10 min-[681px]:space-y-12'>
      <section aria-labelledby='nda-agreement-title'>
        <h2 id='nda-agreement-title' className='mt-0 mb-6 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[34px]'>
          Review the agreement
        </h2>
        <div
          role='region'
          aria-labelledby='nda-agreement-title'
          tabIndex={0}
          className='max-h-[360px] overflow-y-auto overscroll-contain border border-advisory-rule bg-white p-5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt min-[681px]:max-h-[440px] min-[681px]:p-8'
        >
          <AgreementContent />
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        aria-label='Confidentiality agreement details'
        aria-busy={loading}
        className='flex flex-col gap-8 bg-canvas p-6 min-[681px]:p-8'
      >
        <fieldset disabled={loading} className='m-0 min-w-0 border-0 p-0'>
          <legend className={groupHeading}>Your details</legend>
          <div className='grid min-[681px]:grid-cols-2 gap-y-5 gap-x-6'>
            <div>
              <Label htmlFor={`${formId}-firstName`} required>First name</Label>
              <Input
                id={`${formId}-firstName`}
                name='firstName'
                className={inputCls}
                autoComplete='given-name'
                required
                value={form.firstName}
                onChange={set('firstName')}
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-lastName`} required>Last name</Label>
              <Input
                id={`${formId}-lastName`}
                name='lastName'
                className={inputCls}
                autoComplete='family-name'
                required
                value={form.lastName}
                onChange={set('lastName')}
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-email`} required>Email</Label>
              <Input
                id={`${formId}-email`}
                name='email'
                className={inputCls}
                type='email'
                autoComplete='email'
                required
                value={form.email}
                onChange={set('email')}
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-mobile`} required>Mobile number</Label>
              <Input
                id={`${formId}-mobile`}
                name='mobile'
                className={inputCls}
                type='tel'
                autoComplete='tel'
                required
                value={form.mobile}
                onChange={set('mobile')}
              />
            </div>
            <div className='min-[681px]:col-span-2'>
              <Label htmlFor={`${formId}-business`}>Business</Label>
              <Input
                id={`${formId}-business`}
                name='business'
                className={inputCls}
                disabled={!!listingTitle}
                value={form.business}
                onChange={set('business')}
              />
            </div>
          </div>
        </fieldset>

        <fieldset disabled={loading} className='m-0 min-w-0 border-0 p-0'>
          <legend className={groupHeading}>Your address</legend>
          <div className='grid min-[681px]:grid-cols-2 gap-y-5 gap-x-6'>
            <div>
              <Label htmlFor={`${formId}-country`} required>Country</Label>
              <select
                id={`${formId}-country`}
                name='country'
                autoComplete='country-name'
                required
                value={form.country}
                onChange={set('country')}
                className={selectCls}
              >
                <option value=''>Select country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor={`${formId}-address`} required>Address</Label>
              <Input
                id={`${formId}-address`}
                name='address'
                className={inputCls}
                autoComplete='street-address'
                required
                value={form.address}
                onChange={set('address')}
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-suburb`} required>Suburb</Label>
              <Input
                id={`${formId}-suburb`}
                name='suburb'
                className={inputCls}
                autoComplete='address-level2'
                required
                value={form.suburb}
                onChange={set('suburb')}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor={`${formId}-state`} required>State</Label>
                <Input
                  id={`${formId}-state`}
                  name='state'
                  className={inputCls}
                  autoComplete='address-level1'
                  required
                  value={form.state}
                  onChange={set('state')}
                />
              </div>
              <div>
                <Label htmlFor={`${formId}-postalCode`} required>Postcode</Label>
                <Input
                  id={`${formId}-postalCode`}
                  name='postalCode'
                  className={inputCls}
                  autoComplete='postal-code'
                  required
                  value={form.postalCode}
                  onChange={set('postalCode')}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset disabled={loading} className='m-0 min-w-0 border-0 p-0'>
          <legend className={groupHeading}>Deposit details</legend>
          <p className='m-0 max-w-[700px] text-base leading-[1.8] font-medium text-midnight'>
            {TRUST_ACCOUNT.bankName}
          </p>
          <dl className='mt-4 mb-6 grid gap-x-7 gap-y-4 min-[681px]:grid-cols-3'>
            <DetailRow label='BSB' value={TRUST_ACCOUNT.bsb} />
            <DetailRow label='ACC' value={TRUST_ACCOUNT.acc} />
            <DetailRow label='REF' value={TRUST_ACCOUNT.ref} />
          </dl>
          <Label htmlFor={`${formId}-deposit`}>Attach screenshot of $500 deposit</Label>
          <Input
            id={`${formId}-deposit`}
            name='deposit'
            type='file'
            accept='image/*,application/pdf'
            onChange={(e) => setDeposit(e.target.files?.[0] ?? null)}
            className={`${inputCls} h-auto min-h-12 py-2 file:mr-3 file:h-8 file:rounded-none file:border-0 file:bg-midnight file:px-3 file:py-1 file:font-medium file:text-white`}
          />
        </fieldset>

        <fieldset disabled={loading} className='m-0 min-w-0 border-0 p-0'>
          <legend className={groupHeading}>Purchaser refund details</legend>
          <p className='mt-0 mb-3 text-sm font-medium text-midnight'>In the event a refund is required</p>
          <p className='mt-0 mb-6 max-w-[75ch] text-base leading-[1.8] text-ink'>
            In the event the business is no longer of interest and you have
            requested a refund of your holding deposit, we will refund your
            deposit as soon as it clears into the trust account. Please provide
            your bank details below:
          </p>
          <div className='grid min-[681px]:grid-cols-2 gap-y-5 gap-x-6'>
            <div className='min-[681px]:col-span-2'>
              <Label htmlFor={`${formId}-accountName`}>Account name</Label>
              <Input
                id={`${formId}-accountName`}
                name='accountName'
                className={inputCls}
                value={form.accountName}
                onChange={set('accountName')}
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-bsb`}>BSB</Label>
              <Input
                id={`${formId}-bsb`}
                name='bsb'
                className={inputCls}
                placeholder='000-000'
                value={form.bsb}
                onChange={set('bsb')}
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-accountNumber`}>Account number</Label>
              <Input
                id={`${formId}-accountNumber`}
                name='accountNumber'
                className={inputCls}
                placeholder='000000000'
                value={form.accountNumber}
                onChange={set('accountNumber')}
              />
            </div>
          </div>
        </fieldset>

        {error && (
          <p role='alert' className='m-0 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-[1.7] text-red-800'>
            {error}
          </p>
        )}

        <LandingButton type='submit' disabled={loading} className='w-full min-[681px]:w-auto'>
          {loading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
          {loading ? 'Submitting…' : 'Submit agreement'}
        </LandingButton>
      </form>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className='text-sm font-medium text-midnight'>{label}</dt>
      <dd className='mt-1 text-base leading-[1.7] text-ink'>{value}</dd>
    </div>
  );
}
