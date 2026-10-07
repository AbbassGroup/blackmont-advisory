'use client';

import { format } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  STOCK_TREATMENT_OPTIONS,
  formatMoney,
  type OfferTermSheet,
  type SubjectTo,
} from '@/components/offer-term-sheet';

export function PartySummary({
  sheet,
  subjectTo,
  readOnly,
  errors,
  onSubjectToChange,
}: {
  sheet: OfferTermSheet;
  subjectTo: SubjectTo;
  readOnly: boolean;
  errors: Record<string, string>;
  onSubjectToChange: (value: SubjectTo) => void;
}) {
  // The price no longer signals this, since the broker may have entered it.
  const buyerStarted = !!sheet.purchaserName || !!sheet.purchaserEmail;

  return (
    <>
      <Section title='Purchaser Details'>
        {buyerStarted ? (
          <Rows
            rows={[
              ['Full Name', sheet.purchaserName],
              ['Email', sheet.purchaserEmail],
            ]}
          />
        ) : (
          <Pending>The buyer confirms their own details on the form.</Pending>
        )}
      </Section>

      <Section title='Offer terms'>
        {sheet.purchasePrice ? (
          <Rows
            rows={[
              ['Stock', stockLabel(sheet.stockTreatment)],
              ['Balance of purchase price', formatMoney(sheet.balanceAmount)],
            ]}
          />
        ) : (
          <Pending>
            The buyer confirms the price, stock treatment and terms.
          </Pending>
        )}
      </Section>

      <Section title='Settlement Date'>
        {settlementText(sheet) ? (
          <p className='text-sm text-foreground/80'>{settlementText(sheet)}</p>
        ) : (
          <Pending>The buyer sets a date, or a number of weeks.</Pending>
        )}
      </Section>

      <Section title='Subject To'>
        {!readOnly ? (
          <SubjectToEditor
            value={subjectTo}
            errors={errors}
            onChange={onSubjectToChange}
          />
        ) : conditions(sheet).length ? (
          <ul className='space-y-1.5 text-sm text-foreground/80'>
            {conditions(sheet).map((c) => (
              <li key={c} className='flex items-start gap-2'>
                <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-accent' />
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <Pending>The buyer sets their conditions.</Pending>
        )}
      </Section>

      <Section title='Executed by the Purchaser'>
        <ExecutionBlock
          execution={sheet.purchaserExecution}
          pending='Signed by the buyer once the letter reaches them.'
        />
      </Section>

      <Section title='Accepted by the Vendor'>
        <ExecutionBlock
          execution={sheet.vendorExecution}
          pending='Signed by the vendor last, after the second approval.'
        />
      </Section>
    </>
  );
}

function SubjectToEditor({
  value,
  errors,
  onChange,
}: {
  value: SubjectTo;
  errors: Record<string, string>;
  onChange: (value: SubjectTo) => void;
}) {
  const patch = (next: Partial<SubjectTo>) => onChange({ ...value, ...next });

  return (
    <div className='space-y-4'>
      <p className='text-xs text-muted-foreground'>
        Set the initial conditions. The buyer can change them before signing.
      </p>

      <ConditionToggle
        label='Due Diligence'
        checked={value.dueDiligenceEnabled}
        onChange={(checked) =>
          patch({
            dueDiligenceEnabled: checked,
            ...(!checked ? { dueDiligenceDays: null } : {}),
          })
        }
      />
      {value.dueDiligenceEnabled && (
        <NumberCondition
          field='subjectTo.dueDiligenceDays'
          label='Due diligence period from contract date'
          unit='days'
          value={value.dueDiligenceDays}
          max={365}
          error={errors['subjectTo.dueDiligenceDays']}
          onChange={(dueDiligenceDays) => patch({ dueDiligenceDays })}
        />
      )}

      <ConditionToggle
        label='Lease transfer approval'
        checked={value.leaseTransfer}
        onChange={(leaseTransfer) => patch({ leaseTransfer })}
      />
      <ConditionToggle
        label='Finance approval'
        checked={value.financeApproval}
        onChange={(financeApproval) => patch({ financeApproval })}
      />
      <ConditionToggle
        label='Transition & handover support'
        checked={value.transitionEnabled}
        onChange={(checked) =>
          patch({
            transitionEnabled: checked,
            ...(!checked ? { transitionWeeks: null } : {}),
          })
        }
      />
      {value.transitionEnabled && (
        <NumberCondition
          field='subjectTo.transitionWeeks'
          label='Transition & handover support'
          unit='weeks'
          value={value.transitionWeeks}
          max={260}
          error={errors['subjectTo.transitionWeeks']}
          onChange={(transitionWeeks) => patch({ transitionWeeks })}
        />
      )}

      <ConditionToggle
        label='Other'
        checked={value.otherEnabled}
        onChange={(checked) =>
          patch({
            otherEnabled: checked,
            ...(!checked ? { otherText: '' } : {}),
          })
        }
      />
      {value.otherEnabled && (
        <div data-field='subjectTo.otherText' className='space-y-1.5 pl-7'>
          <label
            htmlFor='subjectTo.otherText'
            className='block text-sm font-medium text-foreground/80'
          >
            Other condition
          </label>
          <Input
            id='subjectTo.otherText'
            value={value.otherText}
            maxLength={300}
            placeholder='Describe the condition'
            aria-invalid={!!errors['subjectTo.otherText']}
            onChange={(event) => patch({ otherText: event.target.value })}
          />
          {errors['subjectTo.otherText'] && (
            <p className='text-xs text-red-500'>{errors['subjectTo.otherText']}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ConditionToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className='flex cursor-pointer items-center gap-3 text-sm text-foreground/80'>
      <Checkbox
        checked={checked}
        onCheckedChange={(next) => onChange(next === true)}
      />
      {label}
    </label>
  );
}

function NumberCondition({
  field,
  label,
  unit,
  value,
  max,
  error,
  onChange,
}: {
  field: string;
  label: string;
  unit: string;
  value: number | null;
  max: number;
  error?: string;
  onChange: (value: number | null) => void;
}) {
  return (
    <div data-field={field} className='space-y-1.5 pl-7'>
      <label htmlFor={field} className='block text-sm font-medium text-foreground/80'>
        {label}
      </label>
      <div className='flex items-center gap-2.5'>
        <Input
          id={field}
          type='number'
          min={1}
          max={max}
          step={1}
          value={value ?? ''}
          aria-invalid={!!error}
          onChange={(event) =>
            onChange(event.target.value === '' ? null : Number(event.target.value))
          }
          className='max-w-24'
        />
        <span className='text-sm text-muted-foreground'>{unit}</span>
      </div>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}

function ExecutionBlock({
  execution,
  pending,
}: {
  execution: OfferTermSheet['purchaserExecution'];
  pending: string;
}) {
  if (!execution?.signedAt) return <Pending>{pending}</Pending>;

  return (
    <div className='space-y-3'>
      <Rows
        rows={[
          ['Full Name', execution.fullName],
          ['Email', execution.email],
          ['Phone', execution.phone],
          [
            'Date',
            execution.date ? format(new Date(execution.date), 'dd MMM yyyy') : '',
          ],
        ]}
      />
      {execution.signatureImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={execution.signatureImage}
          alt='Signature'
          className='h-16 rounded-md border border-border bg-card p-2'
        />
      )}
      <p className='text-xs text-muted-foreground/70'>
        Signed {format(new Date(execution.signedAt), 'dd MMM yyyy, h:mma')}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='border-t border-border px-6 py-5 sm:px-8'>
      <h3 className='mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground'>
        {title}
      </h3>
      {children}
    </section>
  );
}

function Rows({ rows }: { rows: [string, string | null | undefined][] }) {
  return (
    <dl className='space-y-2'>
      {rows.map(([label, value]) => (
        <div key={label} className='flex flex-col gap-0.5 sm:flex-row sm:gap-3'>
          <dt className='w-56 shrink-0 text-sm text-muted-foreground'>{label}</dt>
          <dd className='text-sm text-foreground'>{value || '-'}</dd>
        </div>
      ))}
    </dl>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className='flex items-center gap-2 text-sm text-muted-foreground/70'>
      <Clock className='h-4 w-4 shrink-0' />
      {children}
    </p>
  );
}

function stockLabel(value: OfferTermSheet['stockTreatment']) {
  return STOCK_TREATMENT_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

function settlementText(sheet: OfferTermSheet) {
  if (sheet.settlementMode === 'date' && sheet.settlementDate) {
    return format(new Date(sheet.settlementDate), 'dd MMM yyyy');
  }
  if (sheet.settlementMode === 'weeks' && sheet.settlementWeeks) {
    return `${sheet.settlementWeeks} weeks of the formal contract being signed and executed`;
  }
  return '';
}

function conditions(sheet: OfferTermSheet) {
  const { subjectTo } = sheet;
  const list: string[] = [];
  if (subjectTo?.dueDiligenceEnabled) {
    list.push(
      `Due Diligence ${subjectTo.dueDiligenceDays ?? '-'} days from contract date`,
    );
  }
  if (subjectTo?.leaseTransfer) list.push('Lease transfer approval');
  if (subjectTo?.financeApproval) list.push('Finance approval');
  if (subjectTo?.transitionEnabled) {
    list.push(
      `Transition & handover support of ${subjectTo.transitionWeeks ?? '-'} weeks`,
    );
  }
  if (subjectTo?.otherEnabled && subjectTo.otherText) {
    list.push(subjectTo.otherText);
  }
  return list;
}
