'use client';

import { useId } from 'react';
import { Loader2, Trash2, UserCog } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { LandingButton } from '@/components/landing/presentation';
import { BROKERS } from '@/lib/data/brokers';
import type { ImTemplate } from '@/components/im';
import { DealSelect } from './deal-select';

export function SettingsPanel({
  template,
  isSuperAdmin,
  onChangeBroker,
  publishing,
  onTogglePublish,
  onDelete,
  noun = 'memorandum',
  linkDeals = false,
  dealBusinessUnit,
  onChangeDeal,
  onManageAccess,
}: {
  template: ImTemplate;
  isSuperAdmin: boolean;
  onChangeBroker: (email: string) => void;
  publishing: boolean;
  onTogglePublish: () => void;
  onDelete: () => void;
  noun?: string;
  linkDeals?: boolean;
  dealBusinessUnit?: string;
  onChangeDeal?: (dealId: string, personName: string, businessName: string) => void;
  onManageAccess?: () => void;
}) {
  const prefix = useId();
  const brokerId = `${prefix}-broker`;
  const dealId = `${prefix}-deal`;
  const publishId = `${prefix}-published`;

  return (
    <div className='flex flex-col gap-8'>
      <div className='min-w-0'>
        <label htmlFor={brokerId} className='mb-2 block text-sm leading-[1.6] font-medium text-midnight'>Broker</label>
        <select
          id={brokerId}
          aria-describedby={!isSuperAdmin ? `${brokerId}-hint` : undefined}
          value={template.brokerEmail || ''}
          onChange={(event) => onChangeBroker(event.target.value)}
          disabled={!isSuperAdmin}
          className='block h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 focus:border-gilt disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink motion-reduce:transition-none min-[681px]:text-sm'
        >
          {!BROKERS.some((broker) => broker.email === template.brokerEmail) && (
            <option value={template.brokerEmail || ''}>{template.brokerEmail || 'Unknown'}</option>
          )}
          {BROKERS.map((broker) => <option key={broker.email} value={broker.email}>{broker.name} ({broker.email})</option>)}
        </select>
        {!isSuperAdmin && <p id={`${brokerId}-hint`} className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>Only a superadmin can reassign the broker.</p>}
      </div>

      {linkDeals && dealBusinessUnit && onChangeDeal && (
        <div className='min-w-0'>
          <label htmlFor={dealId} className='mb-2 block text-sm leading-[1.6] font-medium text-midnight'>Linked deal</label>
          <DealSelect id={dealId} businessUnit={dealBusinessUnit} value={template.deal} valueName={template.businessName} onChange={onChangeDeal} />
          {onManageAccess && (
            <div className='mt-5'>
              <LandingButton variant='outline' size='compact' onClick={onManageAccess} disabled={!template.deal} className='w-full'>
                <UserCog aria-hidden='true' className='size-4 shrink-0' /> Acquirer portal access
              </LandingButton>
              {!template.deal && <p className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>Link a deal above to grant the buyer portal access.</p>}
            </div>
          )}
        </div>
      )}

      <section aria-label='Publication status' aria-busy={publishing} className='border border-advisory-rule bg-canvas p-5'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0'>
            <label htmlFor={publishId} className='block text-sm leading-[1.6] font-semibold text-midnight'>Published</label>
            <p id={`${publishId}-hint`} className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>
              {template.status === 'published' ? 'Visible at its public link.' : 'Draft. Not publicly visible.'}
            </p>
          </div>
          <div className='flex min-h-10 shrink-0 items-center gap-2'>
            <span aria-hidden='true' className='inline-flex size-4 items-center justify-center'>
              {publishing && <Loader2 className='size-4 animate-spin motion-reduce:animate-none' />}
            </span>
            <Switch
              id={publishId}
              aria-describedby={`${publishId}-hint`}
              checked={template.status === 'published'}
              onCheckedChange={onTogglePublish}
              disabled={publishing}
              className='shadow-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'
            />
          </div>
        </div>
      </section>

      <section aria-labelledby={`${prefix}-delete-heading`} className='border-t border-advisory-rule pt-6'>
        <h3 id={`${prefix}-delete-heading`} className='m-0 text-base font-semibold text-midnight'>Delete {noun}</h3>
        <p className='mt-2 mb-4 text-xs leading-[1.75] text-ink'>Moves this {noun} to Archived. You can restore it from the list.</p>
        <LandingButton variant='outline' size='compact' onClick={onDelete} disabled={publishing} className='border-red-700 text-red-800 hover:bg-red-50 hover:text-red-900'>
          <Trash2 aria-hidden='true' className='size-4' /> Delete {noun}
        </LandingButton>
      </section>
    </div>
  );
}
