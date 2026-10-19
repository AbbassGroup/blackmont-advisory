'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Section, INPUT_CLASS, CHECKBOX_CLASS } from './presentation';
import { cn } from '@/lib/utils';
import {
  computeAmounts,
  formatMoney,
  type Inclusions,
  type SubjectTo,
} from '@/components/offer-term-sheet';

export interface BrokerFormValues {
  businessName: string;
  businessAddress: string;
  vendorName: string;
  vendorEmail: string;
  buyerInviteEmail: string;
  // Shared with the buyer: the broker may state an opening figure, and the
  // buyer can revise it on their own form.
  purchasePrice: number | null;
  depositAmount: number | null;
  inclusions: Inclusions;
  subjectTo: SubjectTo;
}

const INCLUSION_ITEMS: { key: keyof Inclusions; label: string }[] = [
  { key: 'businessName', label: 'Business Name' },
  { key: 'intellectualProperty', label: 'Intellectual Property' },
  { key: 'plantAndEquipment', label: 'All Power, Plant & Equipment' },
  { key: 'goodwill', label: 'Business Goodwill' },
];

export function BrokerForm({
  values,
  readOnly,
  invalid,
  errors = {},
  onChange,
}: {
  values: BrokerFormValues;
  readOnly: boolean;
  invalid: Set<string>;
  errors?: Record<string, string>;
  onChange: (patch: Partial<BrokerFormValues>) => void;
}) {
  const setInclusion = (patch: Partial<Inclusions>) =>
    onChange({ inclusions: { ...values.inclusions, ...patch } });

  // What the letter will show if the deposit is left blank.
  const defaultDeposit = computeAmounts(values.purchasePrice).depositAmount;

  return (
    <>
      <Section title='The business'>
        <div className='grid gap-5 min-[681px]:grid-cols-2'>
          <Field
            keyName='businessName'
            label='Business name'
            value={values.businessName}
            readOnly={readOnly}
            invalid={invalid}
            onChange={(v) => onChange({ businessName: v })}
          />
          <Field
            keyName='businessAddress'
            label='Business address'
            value={values.businessAddress}
            readOnly={readOnly}
            invalid={invalid}
            onChange={(v) => onChange({ businessAddress: v })}
          />
        </div>
      </Section>

      <Section title='Vendor details'>
        <div className='grid gap-5 min-[681px]:grid-cols-2'>
          <Field
            keyName='vendorName'
            label='Name'
            value={values.vendorName}
            readOnly={readOnly}
            invalid={invalid}
            onChange={(v) => onChange({ vendorName: v })}
          />
          <Field
            keyName='vendorEmail'
            label='Email'
            type='email'
            value={values.vendorEmail}
            readOnly={readOnly}
            invalid={invalid}
            onChange={(v) => onChange({ vendorEmail: v })}
            hint='The letter is sent here for signature after the second approval.'
          />
        </div>
      </Section>

      <Section title='Offer'>
        <div className='grid gap-5 min-[681px]:grid-cols-2'>
          <MoneyField
            keyName='purchasePrice'
            label='Purchase price'
            value={values.purchasePrice}
            readOnly={readOnly}
            error={errors['purchasePrice']}
            onChange={(v) => onChange({ purchasePrice: v })}
            hint='Optional. The buyer can change this on their form.'
          />
          <MoneyField
            keyName='depositAmount'
            label='Deposit'
            value={values.depositAmount}
            readOnly={readOnly}
            error={errors['depositAmount']}
            onChange={(v) => onChange({ depositAmount: v })}
            placeholder={defaultDeposit === null ? '0' : String(defaultDeposit)}
            hint={
              defaultDeposit === null
                ? 'Leave blank for the standard 10% deposit.'
                : `Leave blank for the standard 10% deposit of ${formatMoney(defaultDeposit)}.`
            }
          />
        </div>
      </Section>

      <Section title='Send to buyer'>
        <Field
          keyName='buyerInviteEmail'
          label="Buyer's email address"
          type='email'
          value={values.buyerInviteEmail}
          readOnly={readOnly}
          invalid={invalid}
          onChange={(v) => onChange({ buyerInviteEmail: v })}
          hint='Where the letter is sent once approved. The buyer confirms their own details on the form.'
        />
      </Section>

      <Section title='Inclusions'>
        <div className='flex flex-col gap-3'>
          {INCLUSION_ITEMS.map((item) => (
            <label
              key={item.key}
              className='flex min-h-8 cursor-pointer items-start gap-3 py-1 text-sm leading-[1.75] text-midnight'
            >
              <Checkbox
              className={CHECKBOX_CLASS}
                checked={!!values.inclusions[item.key]}
                disabled={readOnly}
                onCheckedChange={(checked) =>
                  setInclusion({
                    [item.key]: checked === true,
                  } as Partial<Inclusions>)
                }
              />
              {item.label}
            </label>
          ))}

          <label className='flex min-h-8 cursor-pointer items-start gap-3 py-1 text-sm leading-[1.75] text-midnight'>
            <Checkbox
                className={CHECKBOX_CLASS}
              checked={values.inclusions.otherEnabled}
              disabled={readOnly}
              onCheckedChange={(checked) =>
                setInclusion({
                  otherEnabled: checked === true,
                  ...(checked === true ? {} : { otherText: '' }),
                })
              }
            />
            Other
          </label>

          {values.inclusions.otherEnabled && (
            <div
              data-field='inclusions.otherText'
              className='flex scroll-mt-28 flex-col gap-2 pl-7'
            >
              <label htmlFor='inclusions.otherText' className='text-sm font-medium text-midnight'>Other inclusion</label>
              <input
                id='inclusions.otherText'
                aria-invalid={invalid.has('inclusions.otherText')}
                value={values.inclusions.otherText}
                readOnly={readOnly}
                placeholder='Describe the other inclusion'
                onChange={(e) => setInclusion({ otherText: e.target.value })}
                className={inputClass(
                  readOnly,
                  invalid.has('inclusions.otherText'),
                )}
              />
              {invalid.has('inclusions.otherText') && (
                <ErrorText>Other inclusion is required</ErrorText>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

function Field({
  keyName,
  label,
  value,
  readOnly,
  invalid,
  onChange,
  type = 'text',
  hint,
}: {
  keyName: string;
  label: string;
  value: string;
  readOnly: boolean;
  invalid: Set<string>;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
}) {
  const isInvalid = invalid.has(keyName);

  return (
    <div data-field={keyName} className='flex min-w-0 scroll-mt-28 flex-col gap-2'>
      <label
        htmlFor={keyName}
        className='block text-sm leading-[1.6] font-medium text-midnight'
      >
        {label}
      </label>
      <input
        id={keyName}
        type={type}
        value={value}
        aria-invalid={isInvalid}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(readOnly, isInvalid)}
      />
      {isInvalid ? (
        <ErrorText>{label} is required</ErrorText>
      ) : (
        hint && <p className='m-0 text-xs leading-[1.75] text-ink'>{hint}</p>
      )}
    </div>
  );
}

function MoneyField({
  keyName,
  label,
  value,
  readOnly,
  error,
  onChange,
  hint,
  placeholder = '0',
}: {
  keyName: string;
  label: string;
  value: number | null;
  readOnly: boolean;
  error?: string;
  onChange: (value: number | null) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div data-field={keyName} className='flex min-w-0 scroll-mt-28 flex-col gap-2'>
      <label
        htmlFor={keyName}
        className='block text-sm leading-[1.6] font-medium text-midnight'
      >
        {label}
      </label>
      <div className='relative'>
        <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink'>
          $
        </span>
        <input
          id={keyName}
          inputMode='numeric'
          placeholder={placeholder}
          value={value ?? ''}
          aria-invalid={!!error}
          readOnly={readOnly}
          onChange={(e) =>
            onChange(
              e.target.value === ''
                ? null
                : Number(e.target.value.replace(/[^0-9.]/g, '')),
            )
          }
          className={cn(inputClass(readOnly, !!error), 'pl-7')}
        />
      </div>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        hint && <p className='m-0 text-xs leading-[1.75] text-ink'>{hint}</p>
      )}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p role='alert' className='m-0 text-xs leading-[1.75] font-medium text-red-800'>{children}</p>;
}

function inputClass(readOnly: boolean, invalid: boolean) {
  return cn(INPUT_CLASS, readOnly && 'cursor-default', invalid && 'border-red-700 focus:border-red-700');
}
