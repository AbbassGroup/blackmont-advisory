'use client';

import { useId, type ReactNode } from 'react';
import { CheckCircle2, Clock, FileEdit, Loader2, Trash2 } from 'lucide-react';
import { LandingButton } from '@/components/landing/presentation';
import { BROKERS } from '@/lib/data/brokers-list';
import type { SettingsRenderProps } from '@/components/documents/types';
import { getProposalStage, type DigitalProposalDoc, type ProposalTemplate } from './types';

const TERMS = ['30', '60', '90', '120', '150', '180', '270', '360'];
const INPUT_CLASS =
  'block h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt motion-reduce:transition-none min-[681px]:text-sm';

const STAGE_META = {
  draft: {
    icon: FileEdit,
    label: 'Draft',
    tone: 'border-advisory-rule bg-canvas text-midnight',
    hint: 'Not sent for approval yet. The customer cannot see it.',
  },
  pending: {
    icon: Clock,
    label: 'Pending approval',
    tone: 'border-amber-200 bg-amber-50 text-amber-900',
    hint: 'Waiting on the owner. The customer still cannot see it.',
  },
  approved: {
    icon: CheckCircle2,
    label: 'Approved',
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    hint: 'Live at the customer link, and valid for 30 days from approval.',
  },
} as const;

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div className='min-w-0'>
      <label htmlFor={id} className='mb-2 block text-sm leading-[1.6] font-medium text-midnight'>{label}</label>
      {children}
      {hint && <p id={`${id}-hint`} className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>{hint}</p>}
    </div>
  );
}

/** Proposal details and approval controls. */
export function ProposalSettingsPanel({
  doc,
  isSuperAdmin,
  onPatch,
  onDelete,
  busy,
  onStatusAction,
}: SettingsRenderProps<DigitalProposalDoc>) {
  const prefix = useId();
  const fieldId = (field: string) => `${prefix}-${field}`;
  const stage = getProposalStage(doc);
  const meta = STAGE_META[stage];
  const StageIcon = meta.icon;
  const set = <K extends keyof DigitalProposalDoc>(key: K, value: DigitalProposalDoc[K]) =>
    onPatch((prev) => ({ ...prev, [key]: value }));

  return (
    <div className='flex flex-col gap-8'>
      <section aria-label='Proposal approval' className={`border p-5 ${meta.tone}`}>
        <div className='flex items-center gap-2'>
          <StageIcon aria-hidden='true' className='size-4 shrink-0' />
          <p className='m-0 text-sm font-semibold'>{meta.label}</p>
        </div>
        <p className='mt-2 mb-4 text-xs leading-[1.75]'>{meta.hint}</p>
        <LandingButton
          variant='outline'
          size='compact'
          onClick={onStatusAction}
          disabled={busy || (stage === 'pending' && !isSuperAdmin)}
          className='w-full bg-white'
        >
          {busy && <Loader2 aria-hidden='true' className='size-4 shrink-0 animate-spin motion-reduce:animate-none' />}
          {stage === 'approved'
            ? 'Revoke approval'
            : stage === 'pending'
              ? isSuperAdmin ? 'Approve and send to customer' : 'Awaiting owner approval'
              : 'Submit for approval'}
        </LandingButton>
      </section>

      <div className='space-y-5'>
        <Field id={fieldId('template')} label='Template type'>
          <select id={fieldId('template')} value={doc.template} onChange={(event) => set('template', event.target.value as ProposalTemplate)} className={INPUT_CLASS}>
            <option value='business_appraisal'>Business Appraisal</option>
            <option value='franchise_proposal'>Franchise Proposal</option>
          </select>
        </Field>
        <Field id={fieldId('broker')} label='Prepared by (broker)' hint='Shown in the Business Appraisal section and emailed on acceptance.'>
          <select
            id={fieldId('broker')}
            aria-describedby={`${fieldId('broker')}-hint`}
            value={doc.brokerName || ''}
            onChange={(event) => {
              const broker = BROKERS.find((item) => item.name === event.target.value);
              onPatch((prev) => ({ ...prev, brokerName: event.target.value, brokerEmail: broker?.email ?? '' }));
            }}
            className={INPUT_CLASS}
          >
            <option value=''>Select broker</option>
            {BROKERS.map((broker) => <option key={broker.email} value={broker.name}>{broker.name}</option>)}
          </select>
        </Field>
      </div>

      <fieldset className='m-0 min-w-0 border-0 p-0'>
        <legend className='mb-5 p-0 text-base font-semibold text-midnight'>Customer</legend>
        <div className='space-y-5'>
          <Field id={fieldId('customer-name')} label='Customer name'>
            <input id={fieldId('customer-name')} value={doc.customerName || ''} onChange={(event) => set('customerName', event.target.value)} placeholder='Enter customer name' className={INPUT_CLASS} />
          </Field>
          <Field id={fieldId('customer-email')} label='Customer email' hint='The approval email goes here, and the link only opens for this address.'>
            <input id={fieldId('customer-email')} aria-describedby={`${fieldId('customer-email')}-hint`} type='email' value={doc.customerEmail || ''} onChange={(event) => set('customerEmail', event.target.value)} placeholder='customer@example.com' className={INPUT_CLASS} />
          </Field>
        </div>
      </fieldset>

      <fieldset className='m-0 min-w-0 border-0 p-0'>
        <legend className='mb-5 p-0 text-base font-semibold text-midnight'>Agreement</legend>
        <div className='space-y-5'>
          <Field id={fieldId('term')} label='Agreement term'>
            <select id={fieldId('term')} value={doc.agreementTerm || '90'} onChange={(event) => set('agreementTerm', event.target.value)} className={INPUT_CLASS}>
              {TERMS.map((term) => <option key={term} value={term}>{term} days</option>)}
            </select>
          </Field>
          <Field id={fieldId('address')} label='Business address'>
            <input id={fieldId('address')} value={doc.businessAddress || ''} onChange={(event) => set('businessAddress', event.target.value)} placeholder='Enter business address' className={INPUT_CLASS} />
          </Field>
          <Field id={fieldId('listing-price')} label='Listing price'>
            <input id={fieldId('listing-price')} type='number' value={doc.listingPrice || ''} onChange={(event) => set('listingPrice', event.target.value)} placeholder='e.g. 2500000' className={INPUT_CLASS} />
          </Field>
          <Field id={fieldId('sale-price')} label='Sale price'>
            <input id={fieldId('sale-price')} type='number' value={doc.salePrice || ''} onChange={(event) => set('salePrice', event.target.value)} placeholder='e.g. 2300000' className={INPUT_CLASS} />
          </Field>
          <Field id={fieldId('bonus')} label='Performance bonus (%)'>
            <input id={fieldId('bonus')} type='number' value={doc.performanceBonus || ''} onChange={(event) => set('performanceBonus', event.target.value)} placeholder='e.g. 2' className={INPUT_CLASS} />
          </Field>
        </div>
      </fieldset>

      <section aria-labelledby='delete-proposal-heading' className='border-t border-advisory-rule pt-6'>
        <h3 id='delete-proposal-heading' className='m-0 text-base font-semibold text-midnight'>Delete proposal</h3>
        <p className='mt-2 mb-4 text-xs leading-[1.75] text-ink'>
          Archives the proposal. It stops serving to the customer but stays in the database.
        </p>
        <LandingButton variant='outline' size='compact' onClick={onDelete} disabled={busy} className='border-red-700 text-red-800 hover:bg-red-50 hover:text-red-900'>
          <Trash2 aria-hidden='true' className='size-4' /> Delete proposal
        </LandingButton>
      </section>
    </div>
  );
}
