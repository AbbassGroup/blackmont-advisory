'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

const inputCls =
  'bg-[#f9fafb] border-secondary/15 focus-visible:ring-secondary/20 focus-visible:border-secondary text-sm  h-11';

interface Props {
  open: boolean;
  onClose: () => void;
  listingTitle: string;
}

function Label({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className='text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5'>
      {children}
      {optional && (
        <span className='ml-1 text-muted-foreground normal-case font-normal'>
          (optional)
        </span>
      )}
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-2 mb-4'>
      <span className='text-sm font-bold text-accent'>{children}</span>
      <div className='flex-1 h-px bg-secondary/10' />
    </div>
  );
}

const initialForm = {
  // Purchaser
  purchaserName: '',
  purchaserEmail: '',
  purchaserPhone: '',
  purchaserAddress: '',
  purchaserCity: '',
  purchaserState: '',
  purchaserPostcode: '',
  purchaserCountry: '',
  // Business
  businessName: '',
  businessCity: '',
  businessState: '',
  // Settlement
  settlementDate: '',
  weeksFromContract: '',
  // Subject to
  subjectTo: '',
  // Solicitor
  solicitorName: '',
  solicitorEmail: '',
  solicitorPhone: '',
  solicitorAddress: '',
  solicitorCity: '',
  solicitorState: '',
  solicitorPostcode: '',
  // Price
  purchasePrice: '',
  depositValue: '',
  balanceOfPurchase: '',
};

export default function EOIForm({ open, onClose, listingTitle }: Props) {
  const [form, setForm] = useState({
    ...initialForm,
    businessName: listingTitle || '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/api/eoi', {
        ...form,
        purchasePrice: Number(form.purchasePrice) || 0,
        depositValue: Number(form.depositValue) || 0,
        balanceOfPurchase: Number(form.balanceOfPurchase) || 0,
        weeksFromContract: form.weeksFromContract
          ? Number(form.weeksFromContract)
          : null,
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
      <DialogContent className='sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 gap-0'>
        <DialogHeader className='px-7 pt-7 pb-4 border-b border-secondary/10'>
          <DialogTitle className='text-lg font-bold text-secondary'>
            Expression of Interest (EOI)
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground'>
            {listingTitle}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className='flex flex-col items-center justify-center py-16 px-7 text-center'>
            <CheckCircle className='w-16 h-16 text-accent mb-4' />
            <h3 className='text-xl font-bold text-secondary mb-2'>
              EOI Submitted!
            </h3>
            <p className='text-muted-foreground text-sm'>
              We will review your offer and be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            <form
              id='eoi-form'
              onSubmit={handleSubmit}
              className='px-7 py-6 flex flex-col gap-6'
            >
              {/* Two-column layout */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* ── Left column ─────────────────────── */}
                <div className='flex flex-col gap-5'>
                  {/* Purchaser Details */}
                  <div className='bg-muted  p-5'>
                    <SectionTitle>Purchaser Details</SectionTitle>
                    <div className='flex flex-col gap-3'>
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          className={inputCls}
                          required
                          value={form.purchaserName}
                          onChange={set('purchaserName')}
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          className={inputCls}
                          type='email'
                          required
                          value={form.purchaserEmail}
                          onChange={set('purchaserEmail')}
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          className={inputCls}
                          required
                          value={form.purchaserPhone}
                          onChange={set('purchaserPhone')}
                        />
                      </div>
                      <div>
                        <Label>Address *</Label>
                        <Input
                          className={inputCls}
                          required
                          value={form.purchaserAddress}
                          onChange={set('purchaserAddress')}
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <Label>City *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.purchaserCity}
                            onChange={set('purchaserCity')}
                          />
                        </div>
                        <div>
                          <Label>State *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.purchaserState}
                            onChange={set('purchaserState')}
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <Label>Postcode *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.purchaserPostcode}
                            onChange={set('purchaserPostcode')}
                          />
                        </div>
                        <div>
                          <Label>Country *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.purchaserCountry}
                            onChange={set('purchaserCountry')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className='bg-muted  p-5'>
                    <SectionTitle>Business Details</SectionTitle>
                    <div className='flex flex-col gap-3'>
                      <div>
                        <Label>Business Name *</Label>
                        <Input
                          className={inputCls}
                          required
                          value={form.businessName}
                          onChange={set('businessName')}
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <Label>City *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.businessCity}
                            onChange={set('businessCity')}
                          />
                        </div>
                        <div>
                          <Label>State *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.businessState}
                            onChange={set('businessState')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right column ────────────────────── */}
                <div className='flex flex-col gap-5'>
                  {/* Settlement & Contract */}
                  <div className='bg-muted  p-5'>
                    <SectionTitle>Settlement &amp; Contract</SectionTitle>
                    <div className='grid grid-cols-2 gap-3'>
                      <div>
                        <Label>Settlement Date</Label>
                        <Input
                          className={inputCls}
                          type='date'
                          value={form.settlementDate}
                          onChange={set('settlementDate')}
                        />
                      </div>
                      <div>
                        <Label>Weeks from Contract</Label>
                        <Input
                          className={inputCls}
                          type='number'
                          value={form.weeksFromContract}
                          onChange={set('weeksFromContract')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject To */}
                  <div className='bg-muted  p-5'>
                    <SectionTitle>Subject To</SectionTitle>
                    <Textarea
                      className='bg-background border-secondary/15 focus-visible:ring-secondary/20 focus-visible:border-secondary text-sm  min-h-[90px]'
                      value={form.subjectTo}
                      onChange={set('subjectTo')}
                    />
                  </div>

                  {/* Solicitor Details */}
                  <div className='bg-muted  p-5'>
                    <SectionTitle>Solicitor Details</SectionTitle>
                    <div className='flex flex-col gap-3'>
                      <div>
                        <Label>Solicitor Name *</Label>
                        <Input
                          className={inputCls}
                          required
                          value={form.solicitorName}
                          onChange={set('solicitorName')}
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <Label optional>Email</Label>
                          <Input
                            className={inputCls}
                            type='email'
                            value={form.solicitorEmail}
                            onChange={set('solicitorEmail')}
                          />
                        </div>
                        <div>
                          <Label optional>Phone</Label>
                          <Input
                            className={inputCls}
                            value={form.solicitorPhone}
                            onChange={set('solicitorPhone')}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Address *</Label>
                        <Input
                          className={inputCls}
                          required
                          value={form.solicitorAddress}
                          onChange={set('solicitorAddress')}
                        />
                      </div>
                      <div className='grid grid-cols-3 gap-2'>
                        <div>
                          <Label>City *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.solicitorCity}
                            onChange={set('solicitorCity')}
                          />
                        </div>
                        <div>
                          <Label>State *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.solicitorState}
                            onChange={set('solicitorState')}
                          />
                        </div>
                        <div>
                          <Label>Postcode *</Label>
                          <Input
                            className={inputCls}
                            required
                            value={form.solicitorPostcode}
                            onChange={set('solicitorPostcode')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Price Details (full width) ─────────────────── */}
              <div className='bg-muted  p-5'>
                <SectionTitle>Price Details</SectionTitle>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div>
                    <Label>Purchase Price ($) *</Label>
                    <Input
                      className={inputCls}
                      type='number'
                      required
                      value={form.purchasePrice}
                      onChange={set('purchasePrice')}
                    />
                  </div>
                  <div>
                    <Label>Deposit ($) *</Label>
                    <Input
                      className={inputCls}
                      type='number'
                      required
                      value={form.depositValue}
                      onChange={set('depositValue')}
                    />
                  </div>
                  <div>
                    <Label>Balance of Purchase ($) *</Label>
                    <Input
                      className={inputCls}
                      type='number'
                      required
                      value={form.balanceOfPurchase}
                      onChange={set('balanceOfPurchase')}
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

            <DialogFooter className='px-7 py-5 border-t border-secondary/10'>
              <Button
                form='eoi-form'
                type='submit'
                disabled={loading}
                className='h-12 w-full rounded-none bg-accent py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-accent-light'
              >
                {loading ? 'Submitting…' : 'Send EOI'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
