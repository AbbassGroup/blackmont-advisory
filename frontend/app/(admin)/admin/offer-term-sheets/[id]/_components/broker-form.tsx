'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  computeAmounts,
  formatMoney,
  type Inclusions,
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
      <Section title='The Business'>
        <Field
          keyName='businessName'
          label='Business Name'
          value={values.businessName}
          readOnly={readOnly}
          invalid={invalid}
          onChange={(v) => onChange({ businessName: v })}
        />
        <Field
          keyName='businessAddress'
          label='Business Address'
          value={values.businessAddress}
          readOnly={readOnly}
          invalid={invalid}
          onChange={(v) => onChange({ businessAddress: v })}
        />
      </Section>

      <Section title='Vendor Details'>
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
      </Section>

      <Section title='Offer'>
        <div className='grid gap-5 sm:grid-cols-2'>
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
        <div className='space-y-3'>
          {INCLUSION_ITEMS.map((item) => (
            <label
              key={item.key}
              className='flex cursor-pointer items-center gap-3 text-sm text-foreground/80'
            >
              <Checkbox
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

          <label className='flex cursor-pointer items-center gap-3 text-sm text-foreground/80'>
            <Checkbox
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
              className='scroll-mt-28 space-y-1.5 pl-7'
            >
              <Input
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='border-t border-border px-6 py-6 sm:px-8'>
      <h3 className='mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground'>
        {title}
      </h3>
      <div className='space-y-5'>{children}</div>
    </section>
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
    <div data-field={keyName} className='scroll-mt-28 space-y-1.5'>
      <label
        htmlFor={keyName}
        className='block text-sm font-medium text-foreground/80'
      >
        {label}
      </label>
      <Input
        id={keyName}
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(readOnly, isInvalid)}
      />
      {isInvalid ? (
        <ErrorText>{label} is required</ErrorText>
      ) : (
        hint && <p className='text-xs text-muted-foreground/70'>{hint}</p>
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
    <div data-field={keyName} className='scroll-mt-28 space-y-1.5'>
      <label
        htmlFor={keyName}
        className='block text-sm font-medium text-foreground/80'
      >
        {label}
      </label>
      <div className='relative'>
        <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70'>
          $
        </span>
        <Input
          id={keyName}
          inputMode='numeric'
          placeholder={placeholder}
          value={value ?? ''}
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
        hint && <p className='text-xs text-muted-foreground/70'>{hint}</p>
      )}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className='text-xs font-medium text-red-500'>{children}</p>;
}

function inputClass(readOnly: boolean, invalid: boolean) {
  return cn(
    'transition-colors',
    readOnly ? 'bg-muted text-muted-foreground' : 'bg-card',
    invalid
      ? 'border-red-400 focus-visible:border-red-400'
      : 'border-border focus-visible:border-accent',
  );
}
