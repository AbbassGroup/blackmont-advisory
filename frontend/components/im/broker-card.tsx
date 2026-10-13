'use client';

import { Phone, Smartphone, Mail, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Broker } from '@/lib/data/brokers';

/** Photo + contact details card for a broker, shared by Welcome and Process. */
export function BrokerCard({ broker, className }: { broker: Broker; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden border border-border bg-card shadow-xs sm:flex-row',
        className,
      )}
    >
      <div className="w-full shrink-0 bg-muted sm:w-44">
        {/* Broker photos live under the public basePath → a plain <img> is correct. */}
        {/* On mobile show the full portrait (natural height, no crop); on desktop
            it fills the side column as before. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={broker.image}
          alt={broker.name}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover object-top sm:h-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5 p-6">
        <div>
          <p className="font-semibold text-secondary">{broker.name}</p>
          <p className="text-sm text-muted-foreground">{broker.title}</p>
        </div>
        <ContactRow icon={<Phone className="h-3.5 w-3.5" />} value={broker.phone} href={phoneHref(broker.phone)} />
        {broker.mobile && (
          <ContactRow icon={<Smartphone className="h-3.5 w-3.5" />} value={broker.mobile} href={phoneHref(broker.mobile)} />
        )}
        <ContactRow icon={<Mail className="h-3.5 w-3.5" />} value={broker.email} href={emailHref(broker.email)} />
        <ContactRow icon={<Globe className="h-3.5 w-3.5" />} value={broker.website} />
      </div>
    </div>
  );
}

function phoneHref(value: string): string | undefined {
  if (value.replace(/\D/g, '').length < 6) return undefined;
  return `tel:${value.replace(/[^\d+]/g, '')}`;
}

function emailHref(value: string): string | undefined {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? `mailto:${value}`
    : undefined;
}

function ContactRow({ icon, value, href }: { icon: React.ReactNode; value: string; href?: string }) {
  const content = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
        {icon}
      </span>
      <span className="break-words">{value}</span>
    </>
  );
  const rowClass = 'flex items-center gap-2.5 text-sm text-muted-foreground';

  return href ? (
    <a
      href={href}
      className={`${rowClass} w-fit rounded-sm hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}
    >
      {content}
    </a>
  ) : (
    <div className={rowClass}>{content}</div>
  );
}
