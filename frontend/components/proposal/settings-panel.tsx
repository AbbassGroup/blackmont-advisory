'use client';

import { CheckCircle2, Clock, FileEdit, Loader2, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BROKERS } from '@/lib/data/brokers-list';
import type { SettingsRenderProps } from '@/components/documents/types';
import {
  getProposalStage,
  type DigitalProposalDoc,
  type ProposalTemplate,
} from './types';

const TERMS = ['30', '60', '90', '120', '150', '180', '270', '360'];

const inputCls =
  'h-10 rounded-none border-secondary/15 bg-background shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15';
const selectCls =
  'h-10 w-full rounded-none border border-secondary/15 bg-background px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15';

const STAGE_META = {
  draft: {
    icon: FileEdit,
    label: 'Draft',
    tone: 'border-border bg-muted text-muted-foreground',
    hint: 'Not sent for approval yet. The customer cannot see it.',
  },
  pending: {
    icon: Clock,
    label: 'Pending approval',
    tone: 'border-amber-200 bg-amber-50 text-amber-700',
    hint: 'Waiting on the owner. The customer still cannot see it.',
  },
  approved: {
    icon: CheckCircle2,
    label: 'Approved',
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    hint: 'Live at the customer link, and valid for 30 days from approval.',
  },
} as const;

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-1.5'>
      <Label className='text-sm font-medium text-foreground'>{label}</Label>
      {children}
      {hint && <p className='text-xs text-muted-foreground/60'>{hint}</p>}
    </div>
  );
}

/**
 * The Settings drawer for a Digital Proposal.
 *
 * Everything here is a contract input that never appears as document text:
 * who the proposal is for, the agreement term, and the prices that fill the
 * agreement's smart fields. What the customer *reads* is edited inline on the
 * document itself.
 */
export function ProposalSettingsPanel({
  doc,
  isSuperAdmin,
  onPatch,
  onDelete,
  busy,
  onStatusAction,
}: SettingsRenderProps<DigitalProposalDoc>) {
  const stage = getProposalStage(doc);
  const meta = STAGE_META[stage];
  const StageIcon = meta.icon;

  const set = <K extends keyof DigitalProposalDoc>(
    key: K,
    value: DigitalProposalDoc[K],
  ) => onPatch((prev) => ({ ...prev, [key]: value }));

  return (
    <div className='space-y-6'>
      {/* Status */}
      <div className={`border p-4 ${meta.tone}`}>
        <div className='flex items-center gap-2'>
          <StageIcon className='h-4 w-4' />
          <p className='text-sm font-semibold'>{meta.label}</p>
        </div>
        <p className='mt-1 text-xs opacity-80'>{meta.hint}</p>
        <Button
          variant='outline'
          onClick={onStatusAction}
          disabled={busy || (stage === 'pending' && !isSuperAdmin)}
          className='mt-3 w-full gap-2 rounded-none bg-card'
        >
          {busy && <Loader2 className='h-4 w-4 animate-spin' />}
          {stage === 'approved'
            ? 'Revoke approval'
            : stage === 'pending'
              ? isSuperAdmin
                ? 'Approve and send to customer'
                : 'Awaiting owner approval'
              : 'Submit for approval'}
        </Button>
      </div>

      {/* Template */}
      <Field label='Template type'>
        <select
          value={doc.template}
          onChange={(e) => set('template', e.target.value as ProposalTemplate)}
          className={selectCls}
        >
          <option value='business_appraisal'>Business Appraisal</option>
          <option value='franchise_proposal'>Franchise Proposal</option>
        </select>
      </Field>

      {/* Broker */}
      <Field
        label='Prepared by (broker)'
        hint='Shown in the Business Appraisal section and emailed on acceptance.'
      >
        <select
          value={doc.brokerName || ''}
          onChange={(e) => {
            const broker = BROKERS.find((b) => b.name === e.target.value);
            onPatch((prev) => ({
              ...prev,
              brokerName: e.target.value,
              brokerEmail: broker?.email ?? '',
            }));
          }}
          className={selectCls}
        >
          <option value=''>Select broker</option>
          {BROKERS.map((b) => (
            <option key={b.email} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Customer */}
      <div className='space-y-4 border border-border p-4'>
        <p className='text-sm font-semibold text-secondary'>Customer</p>
        <Field label='Customer name'>
          <Input
            value={doc.customerName || ''}
            onChange={(e) => set('customerName', e.target.value)}
            placeholder='Enter customer name'
            className={inputCls}
          />
        </Field>
        <Field
          label='Customer email'
          hint='The approval email goes here, and the link only opens for this address.'
        >
          <Input
            type='email'
            value={doc.customerEmail || ''}
            onChange={(e) => set('customerEmail', e.target.value)}
            placeholder='customer@example.com'
            className={inputCls}
          />
        </Field>
      </div>

      {/* Agreement */}
      <div className='space-y-4 border border-border p-4'>
        <p className='text-sm font-semibold text-secondary'>Agreement</p>
        <Field label='Agreement term'>
          <select
            value={doc.agreementTerm || '90'}
            onChange={(e) => set('agreementTerm', e.target.value)}
            className={selectCls}
          >
            {TERMS.map((t) => (
              <option key={t} value={t}>
                {t} days
              </option>
            ))}
          </select>
        </Field>
        <Field label='Business address'>
          <Input
            value={doc.businessAddress || ''}
            onChange={(e) => set('businessAddress', e.target.value)}
            placeholder='Enter business address'
            className={inputCls}
          />
        </Field>
        <Field label='Listing price'>
          <Input
            type='number'
            value={doc.listingPrice || ''}
            onChange={(e) => set('listingPrice', e.target.value)}
            placeholder='e.g. 2500000'
            className={inputCls}
          />
        </Field>
        <Field label='Sale price'>
          <Input
            type='number'
            value={doc.salePrice || ''}
            onChange={(e) => set('salePrice', e.target.value)}
            placeholder='e.g. 2300000'
            className={inputCls}
          />
        </Field>
        <Field label='Performance bonus (%)'>
          <Input
            type='number'
            value={doc.performanceBonus || ''}
            onChange={(e) => set('performanceBonus', e.target.value)}
            placeholder='e.g. 2'
            className={inputCls}
          />
        </Field>
      </div>

      {/* Danger zone */}
      <div className='border border-red-100 bg-red-50/50 p-4'>
        <p className='text-sm font-semibold text-red-600'>Delete proposal</p>
        <p className='mb-3 text-xs text-red-400'>
          Archives the proposal. It stops serving to the customer but stays in
          the database.
        </p>
        <Button
          variant='outline'
          onClick={onDelete}
          className='gap-2 rounded-none border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700'
        >
          <Trash2 className='h-4 w-4' /> Delete
        </Button>
      </div>
    </div>
  );
}
