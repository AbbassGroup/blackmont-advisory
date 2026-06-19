'use client';

import { resolveBroker } from '@/lib/data/brokers';
import { SectionHeading } from '../section-chrome';
import { BrokerCard } from '../broker-card';

export function WelcomeSection({
  brokerEmail,
  title,
  editable,
  onChange,
}: {
  brokerEmail?: string;
  title: string;
  editable?: boolean;
  onChange?: (patch: { title: string }) => void;
}) {
  const broker = resolveBroker(brokerEmail);

  return (
    <>
      <SectionHeading
        title={title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder='Welcome Message'
      />

      <div className='max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground'>
        {broker.welcome.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className='mt-6'>
        <p className='text-base font-semibold text-secondary'>
          {broker.name}
        </p>
        <p className='text-sm text-muted-foreground'>{broker.title}</p>
      </div>

      <BrokerCard broker={broker} className='mt-8' />
    </>
  );
}
