'use client';

import { format } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Section, INPUT_CLASS, CHECKBOX_CLASS } from './presentation';
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
      <Section title='Purchaser details'>
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

      <Section title='Settlement date'>
        {settlementText(sheet) ? (
          <p className='m-0 text-sm leading-[1.75] text-ink'>{settlementText(sheet)}</p>
        ) : (
          <Pending>The buyer sets a date, or a number of weeks.</Pending>
        )}
      </Section>

      <Section title='Subject to'>
        {!readOnly ? (
          <SubjectToEditor
            value={subjectTo}
            errors={errors}
            onChange={onSubjectToChange}
          />
        ) : conditions(sheet).length ? (
          <ul className='m-0 flex list-none flex-col gap-2 p-0 text-sm leading-[1.75] text-ink'>
            {conditions(sheet).map((c) => (
              <li key={c} className='flex items-start gap-2'>
                <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-midnight' />
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <Pending>The buyer sets their conditions.</Pending>
        )}
      </Section>

      <Section title='Executed by the purchaser'>
        <ExecutionBlock
          execution={sheet.purchaserExecution}
          pending='Signed by the buyer once the letter reaches them.'
        />
      </Section>

      <Section title='Accepted by the vendor'>
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
    <div className='flex flex-col gap-4'>
      <p className='m-0 text-xs leading-[1.75] text-ink'>
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
        <div data-field='subjectTo.otherText' className='flex min-w-0 flex-col gap-2 pl-7'>
          <label
            htmlFor='subjectTo.otherText'
            className='block text-sm font-medium text-ink'
          >
            Other condition
          </label>
          <input
            className={INPUT_CLASS}
            id='subjectTo.otherText'
            value={value.otherText}
            maxLength={300}
            placeholder='Describe the condition'
            aria-invalid={!!errors['subjectTo.otherText']}
            onChange={(event) => patch({ otherText: event.target.value })}
          />
          {errors['subjectTo.otherText'] && (
            <p role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>{errors['subjectTo.otherText']}</p>
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
    <label className='flex min-h-8 cursor-pointer items-start gap-3 py-1 text-sm leading-[1.75] text-midnight'>
      <Checkbox
        className={CHECKBOX_CLASS}
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
    <div data-field={field} className='flex min-w-0 flex-col gap-2 pl-7'>
      <label htmlFor={field} className='block text-sm font-medium text-ink'>
        {label}
      </label>
      <div className='flex items-center gap-2.5'>
        <input
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
          className={INPUT_CLASS + ' max-w-24'}
        />
        <span className='m-0 text-sm leading-[1.75] text-ink'>{unit}</span>
      </div>
      {error && <p role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>{error}</p>}
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
    <div className='flex flex-col gap-3'>
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
          className='h-16 w-fit max-w-full border border-advisory-rule bg-white p-2'
        />
      )}
      <p className='m-0 text-xs leading-[1.75] text-ink'>
        Signed {format(new Date(execution.signedAt), 'dd MMM yyyy, h:mma')}
      </p>
    </div>
  );
}

function Rows({ rows }: { rows: [string, string | null | undefined][] }) {
  return (
    <dl className='m-0 flex flex-col gap-3'>
      {rows.map(([label, value]) => (
        <div key={label} className='grid min-w-0 gap-1 min-[681px]:grid-cols-[minmax(0,224px)_minmax(0,1fr)] min-[681px]:gap-4'>
          <dt className='text-sm leading-[1.75] text-ink'>{label}</dt>
          <dd className='m-0 break-words text-sm leading-[1.75] text-midnight'>{value || '-'}</dd>
        </div>
      ))}
    </dl>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className='m-0 flex items-start gap-2 text-sm leading-[1.75] text-ink'>
      <Clock aria-hidden='true' className='mt-1 h-4 w-4 shrink-0' />
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
