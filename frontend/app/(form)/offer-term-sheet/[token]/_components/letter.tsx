'use client';

import Image from 'next/image';
import { format } from 'date-fns';
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
    <article className='min-w-0 border border-advisory-rule bg-white text-ink'>
      <Letterhead />

      <div className='flex min-w-0 flex-col gap-8 px-5 py-8 min-[681px]:px-10 min-[681px]:py-10'>
        <h1 className='m-0 text-center font-advisory-heading text-[26px] leading-[1.4] font-bold text-midnight min-[681px]:text-[30px]'>
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
          <div className='flex flex-col gap-2 text-[15px] leading-[1.8] text-ink [&>p]:m-0'>
            <p>
              <span className='font-semibold text-midnight'>Agent:</span>{' '}
              {BRAND.legalEntity}
            </p>
            <p>
              <span className='font-semibold text-midnight'>Address:</span>{' '}
              {BRAND.address}
            </p>
            <p>
              <span className='font-semibold text-midnight'>Email:</span>{' '}
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
                  <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/70'>
                    $
                  </span>
                  <input
                    inputMode='numeric'
                    id='offer-purchasePrice'
                    aria-invalid={Boolean(errors.purchasePrice)}
                    aria-describedby={errors.purchasePrice ? 'offer-error-purchasePrice' : undefined}
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
                  id='offer-stockTreatment'
                  aria-invalid={Boolean(errors.stockTreatment)}
                  aria-describedby={errors.stockTreatment ? 'offer-error-stockTreatment' : undefined}
                  className={inputClass(Boolean(errors.stockTreatment))}
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
                  <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/70'>
                    $
                  </span>
                  <input
                    inputMode='numeric'
                    id='offer-depositAmount'
                    aria-invalid={Boolean(errors.depositAmount)}
                    aria-describedby={errors.depositAmount ? 'offer-error-depositAmount' : undefined}
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

          <div className='flex flex-col gap-3 bg-canvas p-5 text-[15px] leading-[1.8] text-ink [&>p]:m-0'>
            <p>
              A deposit of{' '}
              <strong className='text-midnight'>
                {formatMoney(amounts.depositAmount)}
              </strong>{' '}
              to be paid into {TRUST_ACCOUNT}.
            </p>
            <p>
              Balance of purchase price:{' '}
              <strong className='text-midnight'>
                {formatMoney(amounts.balanceAmount)}
              </strong>
            </p>
          </div>
        </Section>

        <Section title='Settlement Date'>
          {editable('settlementMode') ? (
            <div
              data-field='settlementMode'
              className='flex scroll-mt-20 flex-col gap-3'
            >
              <Choice
                checked={values.settlementMode === 'date'}
                onSelect={() => onChange('settlementMode', 'date')}
                label='On a set date'
                invalid={!!errors['settlementMode']}
              >
                <div data-field='settlementDate' className='scroll-mt-28'>
                  <input
                    type='date'
                    aria-label='Settlement date'
                    aria-invalid={Boolean(errors.settlementDate)}
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
                  <input
                    inputMode='numeric'
                    aria-label='Settlement weeks'
                    aria-invalid={Boolean(errors.settlementWeeks)}
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
                  <span className='text-[15px] text-ink'>weeks</span>
                </div>
              </Choice>

              {errors['settlementMode'] && (
                <p className='text-xs font-medium text-red-800'>
                  {errors['settlementMode']}
                </p>
              )}
            </div>
          ) : (
            <Static>{settlementText(values)}</Static>
          )}
        </Section>

        <Section title='Deposit to be paid by purchaser'>
          <p className='m-0 text-[15px] leading-[1.8] text-ink'>
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
            <div className='flex flex-col gap-4'>
              <Condition
                checked={values.subjectTo.dueDiligenceEnabled}
                onToggle={(v) => onChange('subjectTo.dueDiligenceEnabled', v)}
                label='Due Diligence'
              >
                <div
                  data-field='subjectTo.dueDiligenceDays'
                  className='flex scroll-mt-28 items-center gap-2.5'
                >
                  <input
                    inputMode='numeric'
                    aria-label='Due diligence days'
                    aria-invalid={Boolean(errors['subjectTo.dueDiligenceDays'])}
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
                  <span className='text-[15px] text-ink'>
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
                  <input
                    inputMode='numeric'
                    aria-label='Transition and handover weeks'
                    aria-invalid={Boolean(errors['subjectTo.transitionWeeks'])}
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
                  <span className='text-[15px] text-ink'>weeks</span>
                </div>
              </Condition>

              <Condition
                checked={values.subjectTo.otherEnabled}
                onToggle={(v) => onChange('subjectTo.otherEnabled', v)}
                label='Other'
              >
                <div data-field='subjectTo.otherText' className='scroll-mt-28'>
                  <input
                    aria-label='Other condition'
                    aria-invalid={Boolean(errors['subjectTo.otherText'])}
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
          <p className='m-0 text-[15px] leading-[1.8] text-ink'>
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

        <div className='flex flex-col gap-3 border-t border-advisory-rule pt-6'>
          <h2 className='m-0 font-advisory-heading text-[21px] leading-[1.5] font-bold text-midnight'>
            Disclaimer
          </h2>
          <p className='m-0 text-sm leading-[1.8] text-ink'>
            {DISCLAIMER}
          </p>
        </div>
      </div>

      <footer className='flex flex-wrap items-center justify-between gap-2 border-t border-advisory-rule bg-canvas px-5 py-5 text-xs leading-[1.75] text-ink min-[681px]:px-10'>
        <span>{BRAND.tradingName}</span>
        <span>{FOOTER_RIGHT}</span>
      </footer>
    </article>
  );
}

function Letterhead() {
  return (
    <div className='flex flex-wrap items-center justify-between gap-5 border-b border-advisory-rule px-5 py-6 min-[681px]:px-10'>
      <Image
        unoptimized
        src={BRAND.logo}
        alt={BRAND.tradingName}
        width={BRAND.logoWidth}
        height={BRAND.logoHeight}
        className='h-auto w-[220px] max-w-full'
        priority
      />
      <div className='flex flex-col gap-1 text-xs leading-[1.75] text-ink min-[681px]:text-right [&>p]:m-0'>
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
      <div className='flex flex-col gap-6'>
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
              <input
                type='date'
                id={'offer-' + prefix + '.date'}
                aria-invalid={Boolean(errors[prefix + '.date'])}
                aria-describedby={errors[prefix + '.date'] ? 'offer-error-' + prefix + '.date' : undefined}
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
              id={'offer-' + prefix + '.signatureImage'}
              labelledBy={'offer-label-' + prefix + '.signatureImage'}
              describedBy={errors[prefix + '.signatureImage'] ? 'offer-error-' + prefix + '.signatureImage' : undefined}
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
                className='h-20 border border-advisory-rule bg-white p-2'
              />
              {block.signedAt && (
                <p className='mt-2 text-xs text-ink/70'>
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
    <section className='flex min-w-0 flex-col gap-5'>
      <h2 className='m-0 font-advisory-heading text-[21px] leading-[1.5] font-bold text-midnight'>
        {title}
      </h2>
      <div className='flex min-w-0 flex-col gap-5'>{children}</div>
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
    <div data-field={keyName} className='flex min-w-0 scroll-mt-20 flex-col gap-2'>
      <label id={'offer-label-' + keyName} htmlFor={'offer-' + keyName} className='text-sm font-medium text-midnight'>
        {label}
      </label>
      {children}
      {errors[keyName] && (
        <p id={'offer-error-' + keyName} role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>{errors[keyName]}</p>
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
        <input
          id={'offer-' + keyName}
          aria-invalid={Boolean(errors[keyName])}
          aria-describedby={errors[keyName] ? 'offer-error-' + keyName : undefined}
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
  return <p className='m-0 break-words text-[15px] leading-[1.8] text-ink'>{children}</p>;
}

function Bullets({ items, empty }: { items: string[]; empty?: string }) {
  if (!items.length && empty) {
    return <Static>{empty}</Static>;
  }
  return (
    <ul className='m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-[1.8] text-ink'>
      {items.map((item) => (
        <li key={item}>
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
        'rounded-none border p-4 transition-colors duration-150 motion-reduce:transition-none',
        checked
          ? 'border-midnight bg-canvas'
          : invalid
            ? 'border-red-800'
            : 'border-advisory-rule hover:border-advisory-input',
      )}
    >
      <label className='flex min-h-8 cursor-pointer items-start gap-3 text-sm leading-[1.75] text-ink'>
        <input
          type='radio'
          name='offer-settlement-mode'
          aria-invalid={invalid}
          checked={checked}
          onChange={onSelect}
          className='mt-1 size-4 shrink-0 accent-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt'
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
      <label className='flex min-h-10 cursor-pointer items-start gap-3 text-sm leading-[1.75] text-ink'>
        <input type='checkbox' checked={checked} onChange={(event) => onToggle(event.target.checked)} className='mt-1 size-4 shrink-0 accent-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt' />
        {label}
      </label>
      {checked && children && <div className='mt-3 pl-7'>{children}</div>}
    </div>
  );
}

function inputClass(invalid: boolean, extra = '') {
  return cn(
    'h-10 w-full min-w-0 rounded-none border bg-white px-3 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 motion-reduce:transition-none min-[681px]:text-sm',
    invalid
      ? 'border-red-800 focus:border-red-800'
      : 'border-advisory-input focus:border-gilt',
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
