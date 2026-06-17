'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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

const inputCls =
  'bg-[#f9fafb] border-gray-200 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary text-sm  h-11';

const selectCls =
  'w-full bg-[#f9fafb] border border-gray-200 rounded-md px-3 h-11 text-sm text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary';

interface Props {
  open: boolean;
  onClose: () => void;
  listingTitle: string;
  listingId: string;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5'>
      {children}
    </label>
  );
}

export default function NDAForm({
  open,
  onClose,
  listingTitle,
  listingId,
}: Props) {
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
  });
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
      await apiClient.post('/api/confidentiality', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.mobile,
        country: form.country,
        address: form.address,
        suburb: form.suburb,
        state: form.state,
        postalCode: form.postalCode,
        businessTitle: form.business,
        listingId,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='sm:max-w-[720px] max-h-[90vh] overflow-y-auto p-0 gap-0'>
        <DialogHeader className='px-7 pt-7 pb-4 border-b border-gray-100'>
          <DialogTitle className='text-lg font-bold text-brand-black'>
            Confidentiality Agreement
          </DialogTitle>
          <DialogDescription className='text-xs text-gray-400'>
            {listingTitle}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className='flex flex-col items-center justify-center py-16 px-7 text-center'>
            <CheckCircle className='w-16 h-16 text-brand-primary mb-4' />
            <h3 className='text-xl font-bold text-brand-black mb-2'>
              Agreement Submitted!
            </h3>
            <p className='text-gray-400 text-sm'>
              Thank you. We will be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Agreement scroll box */}
            <div className='mx-7 mt-5 max-h-[220px] overflow-y-auto  border-l-4 border-brand-primary bg-gray-50 px-5 py-4'>
              <AgreementContent />
            </div>

            <form
              id='nda-form'
              onSubmit={handleSubmit}
              className='flex flex-col gap-4 px-7 py-6'
            >
              {/* Name */}
              <div className='grid grid-cols-2 gap-4'>
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
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label>Suburb *</Label>
                  <Input
                    className={inputCls}
                    required
                    value={form.suburb}
                    onChange={set('suburb')}
                  />
                </div>
                <div className='grid grid-cols-2 gap-2'>
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

              {error && (
                <p className='text-red-500 text-sm bg-red-50 border border-red-100  px-4 py-3'>
                  {error}
                </p>
              )}
            </form>

            <DialogFooter className='px-7 py-5 border-t border-gray-100'>
              <Button
                form='nda-form'
                type='submit'
                disabled={loading}
                className='w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 h-12'
              >
                {loading ? 'Submitting…' : 'Submit Agreement'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
