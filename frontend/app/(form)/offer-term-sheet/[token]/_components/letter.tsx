'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  SignaturePad,
  STOCK_TREATMENT_OPTIONS,
  resolveAmounts,
  formatMoney,
  getFieldValue,
  type PublicOfferTermSheet,
} from '@/components/offer-term-sheet';
import {
  BRAND,
  DISCLAIMER,
  FOOTER_RIGHT,
  TRUST_ACCOUNT,
} from '@/components/offer-term-sheet/brand';

type Values = PublicOfferTermSheet;

interface FieldProps {
  values: Values;
  editable: (key: string) => boolean;
  errors: Record<string, string>;
  onChange: (key: string, value: unknown) => void;
}

export function Letter(props: FieldProps) {
  const { values, editable, errors, onChange } = props;
  const amounts = resolveAmounts(values.purchasePrice, values.depositAmount);

  return (
    <article className='border border-gray-200 bg-white'>
      <Letterhead />

      <div className='px-7 pb-14 sm:px-14'>
        <h1 className='py-9 text-center text-[15px] font-bold tracking-wide text-foreground'>
          Letter of Intent (Non-Binding Offer Letter)
        </h1>

        <Section title='The Business'>
          <Field label='Business Name' keyName='businessName' {...props} />
          <Field label='Business Address' keyName='businessAddress' {...props} />
        </Section>

        <Section title='Purchaser Details'>
          <Field label='Full Name' keyName='purchaserName' {...props} />
          <Field label='Email' keyName='purchaserEmail' type='email' {...props} />
        </Section>

        <Section title='Vendor Details'>
          <Field label='Name' keyName='vendorName' {...props} />
          <Field label='Email' keyName='vendorEmail' type='email' {...props} />
        </Section>

        <Section title="Vendor's Agent">
          <div className='space-y-1.5 text-[15px] leading-relaxed text-gray-700'>
            <p>
              <span className='font-semibold text-foreground'>Agent:</span>{' '}
              {BRAND.legalEntity}
            </p>
            <p>
              <span className='font-semibold text-foreground'>Address:</span>{' '}
              {BRAND.address}
            </p>
            <p>
              <span className='font-semibold text-foreground'>Phone:</span>{' '}
              {BRAND.phone}
            </p>
            <p>
              <span className='font-semibold text-foreground'>Email:</span>{' '}
              {BRAND.email}
            </p>
          </div>
        </Section>

        <Section title='Offer'>
          <div className='grid gap-6 sm:grid-cols-2'>
            <FieldShell
              label='Purchase price'
              keyName='purchasePrice'
              errors={errors}
            >
              {editable('purchasePrice') ? (
                <div className='relative'>
                  <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    $
                  </span>
                  <Input
                    inputMode='numeric'
                    placeholder='0'
                    value={values.purchasePrice ?? ''}
                    onChange={(e) =>
                      onChange(
                        'purchasePrice',
                        e.target.value === ''
                          ? null
                          : Number(e.target.value.replace(/[^0-9.]/g, '')),
                      )
                    }
                    className={inputClass(!!errors['purchasePrice'], 'pl-7')}
                  />
                </div>
              ) : (
                <Static>{formatMoney(values.purchasePrice)}</Static>
              )}
            </FieldShell>

            <FieldShell
              label='Stock'
              keyName='stockTreatment'
              errors={errors}
            >
              {editable('stockTreatment') ? (
                <select
                  value={values.stockTreatment}
                  onChange={(e) => onChange('stockTreatment', e.target.value)}
                  className={cn(
                    'h-11 w-full rounded-md border bg-white px-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/25',
                    !!errors['stockTreatment']
                      ? 'border-red-400'
                      : 'border-gray-200',
                  )}
                >
                  <option value=''>Select…</option>
                  {STOCK_TREATMENT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Static>
                  {STOCK_TREATMENT_OPTIONS.find(
                    (o) => o.value === values.stockTreatment,
                  )?.label ?? '-'}
                </Static>
              )}
            </FieldShell>

            <FieldShell label='Deposit' keyName='depositAmount' errors={errors}>
              {editable('depositAmount') ? (
                <div className='relative'>
                  <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    $
                  </span>
                  <Input
                    inputMode='numeric'
                    // Blank means the 10% default, so show it as the placeholder.
                    placeholder={
                      amounts.depositAmount === null
                        ? '0'
                        : String(amounts.depositAmount)
                    }
                    value={values.depositAmount ?? ''}
                    onChange={(e) =>
                      onChange(
                        'depositAmount',
                        e.target.value === ''
                          ? null
                          : Number(e.target.value.replace(/[^0-9.]/g, '')),
                      )
                    }
                    className={inputClass(!!errors['depositAmount'], 'pl-7')}
                  />
                </div>
              ) : (
                <Static>{formatMoney(amounts.depositAmount)}</Static>
              )}
            </FieldShell>
          </div>

          <div className='mt-7 space-y-3 border-l-2 border-accent/30 pl-5 text-[15px] leading-relaxed text-gray-700'>
            <p>
              A deposit of{' '}
              <strong className='text-foreground'>
                {formatMoney(amounts.depositAmount)}
              </strong>{' '}
              to be paid into {TRUST_ACCOUNT}.
            </p>
            <p>
              Balance of purchase price:{' '}
              <strong className='text-foreground'>
                {formatMoney(amounts.balanceAmount)}
              </strong>
            </p>
          </div>
        </Section>

        <Section title='Settlement Date'>
          {editable('settlementMode') ? (
            <div
              data-field='settlementMode'
              className='scroll-mt-28 space-y-3'
            >
              <Choice
                checked={values.settlementMode === 'date'}
                onSelect={() => onChange('settlementMode', 'date')}
                label='On a set date'
                invalid={!!errors['settlementMode']}
              >
                <div data-field='settlementDate' className='scroll-mt-28'>
                  <Input
                    type='date'
                    value={toDateInput(values.settlementDate)}
                    onChange={(e) => onChange('settlementDate', e.target.value)}
                    className={inputClass(
                      !!errors['settlementDate'],
                      'max-w-xs',
                    )}
                  />
                </div>
              </Choice>

              <Choice
                checked={values.settlementMode === 'weeks'}
                onSelect={() => onChange('settlementMode', 'weeks')}
                label='Weeks from the formal contract being signed and executed'
                invalid={!!errors['settlementMode']}
              >
                <div
                  data-field='settlementWeeks'
                  className='flex scroll-mt-28 items-center gap-2.5'
                >
                  <Input
                    inputMode='numeric'
                    value={values.settlementWeeks ?? ''}
                    onChange={(e) =>
                      onChange(
                        'settlementWeeks',
                        e.target.value === ''
                          ? null
                          : Number(e.target.value.replace(/[^0-9]/g, '')),
                      )
                    }
                    className={inputClass(
                      !!errors['settlementWeeks'],
                      'max-w-24',
                    )}
                  />
                  <span className='text-[15px] text-gray-600'>weeks</span>
                </div>
              </Choice>

              {errors['settlementMode'] && (
                <p className='text-xs font-medium text-red-500'>
                  {errors['settlementMode']}
                </p>
              )}
            </div>
          ) : (
            <Static>{settlementText(values)}</Static>
          )}
        </Section>

        <Section title='Deposit to be paid by purchaser'>
          <p className='text-[15px] leading-relaxed text-gray-700'>
            Once this offer has been accepted by both parties, the purchaser will
            be sent an Acceptance Email. Payment must be made by the purchaser
            within 24 hours of this letter being sent.
          </p>
        </Section>

        <Section title='Inclusions'>
          <Bullets
            items={inclusionList(values)}
            empty='None specified.'
          />
        </Section>

        <Section title='Subject To'>
          {editable('subjectTo.leaseTransfer') ? (
            <div className='space-y-4'>
              <Condition
                checked={values.subjectTo.dueDiligenceEnabled}
                onToggle={(v) => onChange('subjectTo.dueDiligenceEnabled', v)}
                label='Due Diligence'
              >
                <div
                  data-field='subjectTo.dueDiligenceDays'
                  className='flex scroll-mt-28 items-center gap-2.5'
                >
                  <Input
                    inputMode='numeric'
                    value={values.subjectTo.dueDiligenceDays ?? ''}
                    onChange={(e) =>
                      onChange(
                        'subjectTo.dueDiligenceDays',
                        e.target.value === ''
                          ? null
                          : Number(e.target.value.replace(/[^0-9]/g, '')),
                      )
                    }
                    className={inputClass(
                      !!errors['subjectTo.dueDiligenceDays'],
                      'max-w-24',
                    )}
                  />
                  <span className='text-[15px] text-gray-600'>
                    days from contract date
                  </span>
                </div>
              </Condition>

              <Condition
                checked={values.subjectTo.leaseTransfer}
                onToggle={(v) => onChange('subjectTo.leaseTransfer', v)}
                label='Lease transfer approval'
              />
              <Condition
                checked={values.subjectTo.financeApproval}
                onToggle={(v) => onChange('subjectTo.financeApproval', v)}
                label='Finance approval'
              />

              <Condition
                checked={values.subjectTo.transitionEnabled}
                onToggle={(v) => onChange('subjectTo.transitionEnabled', v)}
                label='Transition & handover support'
              >
                <div
                  data-field='subjectTo.transitionWeeks'
                  className='flex scroll-mt-28 items-center gap-2.5'
                >
                  <Input
                    inputMode='numeric'
                    value={values.subjectTo.transitionWeeks ?? ''}
                    onChange={(e) =>
                      onChange(
                        'subjectTo.transitionWeeks',
                        e.target.value === ''
                          ? null
                          : Number(e.target.value.replace(/[^0-9]/g, '')),
                      )
                    }
                    className={inputClass(
                      !!errors['subjectTo.transitionWeeks'],
                      'max-w-24',
                    )}
                  />
                  <span className='text-[15px] text-gray-600'>weeks</span>
                </div>
              </Condition>

              <Condition
                checked={values.subjectTo.otherEnabled}
                onToggle={(v) => onChange('subjectTo.otherEnabled', v)}
                label='Other'
              >
                <div data-field='subjectTo.otherText' className='scroll-mt-28'>
                  <Input
                    value={values.subjectTo.otherText}
                    placeholder='Describe the condition'
                    onChange={(e) =>
                      onChange('subjectTo.otherText', e.target.value)
                    }
                    className={inputClass(!!errors['subjectTo.otherText'])}
                  />
                </div>
              </Condition>
            </div>
          ) : (
            <Bullets items={conditionList(values)} empty='No conditions.' />
          )}
        </Section>

        <Section title='Assumptions'>
          <Bullets
            items={[
              'Each party bears its own legal and professional costs.',
              'This letter of intent is non-binding in nature until a formal Contract of Sale is executed. Any deposits paid are fully refundable until the execution of a Contract of Sale.',
            ]}
          />
        </Section>

        <Section title='Declaration'>
          <p className='text-[15px] leading-relaxed text-gray-700'>
            The buyer has sufficient financial capacity to complete this
            transaction (or is in the process of obtaining finance) and has
            reviewed all available information about the business, and submits
            this Letter of Intent subject to satisfactory due diligence.
          </p>
        </Section>

        <ExecutionSection
          title='Executed by the Purchaser'
          prefix='purchaserExecution'
          {...props}
        />

        <ExecutionSection
          title='Accepted by the Vendor'
          prefix='vendorExecution'
          {...props}
        />

        <div className='mt-12 border-t border-gray-200 pt-6'>
          <h2 className='mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500'>
            Disclaimer
          </h2>
          <p className='text-[13px] leading-relaxed text-gray-400'>
            {DISCLAIMER}
          </p>
        </div>
      </div>

      <footer className='flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-gray-50/70 px-7 py-4 text-[11px] text-gray-400 sm:px-14'>
        <span>{BRAND.tradingName}</span>
        <span>{FOOTER_RIGHT}</span>
      </footer>
    </article>
  );
}

function Letterhead() {
  return (
    <div className='flex flex-wrap items-center justify-between gap-6 border-b-2 border-accent px-7 py-7 sm:px-14'>
      <Image
        src={BRAND.logo}
        alt={BRAND.tradingName}
        width={BRAND.logoWidth}
        height={BRAND.logoHeight}
        className='h-11 w-auto'
        priority
      />
      <div className='text-right text-[13px] leading-relaxed text-gray-500'>
        <p>{BRAND.address}</p>
        <p>{BRAND.email}</p>
        <p>{BRAND.website}</p>
      </div>
    </div>
  );
}

function ExecutionSection({
  title,
  prefix,
  values,
  editable,
  errors,
  onChange,
}: FieldProps & {
  title: string;
  prefix: 'purchaserExecution' | 'vendorExecution';
}) {
  const block = values[prefix];
  const isEditable = editable(`${prefix}.fullName`);

  if (!isEditable && !block?.signedAt) {
    return (
      <Section title={title}>
        <Static>Not yet signed.</Static>
      </Section>
    );
  }

  const props = { values, editable, errors, onChange };

  return (
    <Section title={title}>
      <div className='space-y-7'>
        <div className='grid gap-6 sm:grid-cols-2'>
          <Field label='Full Name' keyName={`${prefix}.fullName`} {...props} />
          <Field
            label='Email'
            keyName={`${prefix}.email`}
            type='email'
            {...props}
          />
          <Field
            label='Phone'
            keyName={`${prefix}.phone`}
            type='tel'
            {...props}
          />
          <FieldShell
            label='Date'
            keyName={`${prefix}.date`}
            errors={errors}
          >
            {isEditable ? (
              <Input
                type='date'
                value={toDateInput(block?.date)}
                onChange={(e) => onChange(`${prefix}.date`, e.target.value)}
                className={inputClass(!!errors[`${prefix}.date`])}
              />
            ) : (
              <Static>
                {block?.date ? format(new Date(block.date), 'dd MMM yyyy') : '-'}
              </Static>
            )}
          </FieldShell>
        </div>

        <FieldShell
          label='Signature'
          keyName={`${prefix}.signatureImage`}
          errors={errors}
        >
          {isEditable ? (
            <SignaturePad
              onChange={(dataUrl) =>
                onChange(`${prefix}.signatureImage`, dataUrl)
              }
              invalid={!!errors[`${prefix}.signatureImage`]}
            />
          ) : block?.signatureImage ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.signatureImage}
                alt='Signature'
                className='h-20 rounded-md border border-gray-200 bg-white p-2'
              />
              {block.signedAt && (
                <p className='mt-2 text-xs text-gray-400'>
                  Signed{' '}
                  {format(new Date(block.signedAt), 'dd MMM yyyy, h:mma')}
                </p>
              )}
            </div>
          ) : (
            <Static>-</Static>
          )}
        </FieldShell>
      </div>
    </Section>
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
    <section className='mb-11'>
      <h2 className='mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground'>
        {title}
      </h2>
      <div className='space-y-6'>{children}</div>
    </section>
  );
}

function FieldShell({
  label,
  keyName,
  errors,
  children,
}: {
  label: string;
  keyName: string;
  errors: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <div data-field={keyName} className='scroll-mt-28 space-y-2'>
      <label className='block text-[13px] font-semibold text-foreground'>
        {label}
      </label>
      {children}
      {errors[keyName] && (
        <p className='text-xs font-medium text-red-500'>{errors[keyName]}</p>
      )}
    </div>
  );
}

function Field({
  label,
  keyName,
  values,
  editable,
  errors,
  onChange,
  type = 'text',
}: FieldProps & { label: string; keyName: string; type?: string }) {
  const raw = getFieldValue(values, keyName);
  const value = raw == null ? '' : String(raw);

  return (
    <FieldShell label={label} keyName={keyName} errors={errors}>
      {editable(keyName) ? (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(keyName, e.target.value)}
          className={inputClass(!!errors[keyName])}
        />
      ) : (
        <Static>{value || '-'}</Static>
      )}
    </FieldShell>
  );
}

function Static({ children }: { children: React.ReactNode }) {
  return <p className='text-[15px] text-gray-800'>{children}</p>;
}

function Bullets({ items, empty }: { items: string[]; empty?: string }) {
  if (!items.length && empty) {
    return <Static>{empty}</Static>;
  }
  return (
    <ul className='space-y-2.5 text-[15px] leading-relaxed text-gray-700'>
      {items.map((item) => (
        <li key={item} className='flex gap-3'>
          <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Choice({
  checked,
  onSelect,
  label,
  invalid = false,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  label: string;
  invalid?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-none border p-5 transition-colors',
        checked
          ? 'border-accent bg-accent/5'
          : invalid
            ? 'border-red-400'
            : 'border-gray-200 hover:border-gray-300',
      )}
    >
      <label className='flex cursor-pointer items-start gap-3 text-[15px] text-gray-700'>
        <input
          type='radio'
          checked={checked}
          onChange={onSelect}
          className='mt-1 accent-accent'
        />
        {label}
      </label>
      {checked && children && <div className='mt-4 pl-7'>{children}</div>}
    </div>
  );
}

function Condition({
  checked,
  onToggle,
  label,
  children,
}: {
  checked: boolean;
  onToggle: (value: boolean) => void;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label className='flex cursor-pointer items-center gap-3 text-[15px] text-gray-700'>
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => onToggle(v === true)}
        />
        {label}
      </label>
      {checked && children && <div className='mt-3 pl-7'>{children}</div>}
    </div>
  );
}

function inputClass(invalid: boolean, extra = '') {
  return cn(
    'h-11 rounded-md text-[15px] transition-colors focus-visible:ring-accent/25',
    invalid
      ? 'border-red-400 focus-visible:border-red-400'
      : 'border-gray-200 focus-visible:border-accent',
    extra,
  );
}

function toDateInput(value: string | null | undefined) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : format(date, 'yyyy-MM-dd');
}

function settlementText(values: Values) {
  if (values.settlementMode === 'date' && values.settlementDate) {
    return format(new Date(values.settlementDate), 'dd MMM yyyy');
  }
  if (values.settlementMode === 'weeks' && values.settlementWeeks) {
    return `${values.settlementWeeks} weeks of the formal contract being signed and executed`;
  }
  return '-';
}

function inclusionList(values: Values) {
  const { inclusions } = values;
  const list: string[] = [];
  if (inclusions?.businessName) list.push('Business Name');
  if (inclusions?.intellectualProperty) list.push('Intellectual Property');
  if (inclusions?.plantAndEquipment) list.push('All Power, Plant & Equipment');
  if (inclusions?.goodwill) list.push('Business Goodwill');
  if (inclusions?.otherEnabled && inclusions.otherText) {
    list.push(inclusions.otherText);
  }
  return list;
}

function conditionList(values: Values) {
  const { subjectTo } = values;
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
