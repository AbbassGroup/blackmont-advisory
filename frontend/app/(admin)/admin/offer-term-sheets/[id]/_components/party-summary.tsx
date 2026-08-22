'use client';

import { format } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';
import {
  STOCK_TREATMENT_OPTIONS,
  formatMoney,
  type OfferTermSheet,
} from '@/components/offer-term-sheet';

export function PartySummary({ sheet }: { sheet: OfferTermSheet }) {
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
        {conditions(sheet).length ? (
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
