'use client';

import { Phone, Smartphone, Mail, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Broker } from '@/lib/data/brokers';

/** Photo + contact details card for a broker, shared by Welcome and Process. */
export function BrokerCard({ broker, className }: { broker: Broker; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs sm:flex-row',
        className,
      )}
    >
      <div className="w-full shrink-0 bg-gray-200 sm:w-44">
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
          <p className="font-semibold text-brand-black">{broker.name}</p>
          <p className="text-sm text-gray-500">{broker.title}</p>
        </div>
        <ContactRow icon={<Phone className="h-3.5 w-3.5" />} value={broker.phone} />
        {broker.mobile && (
          <ContactRow icon={<Smartphone className="h-3.5 w-3.5" />} value={broker.mobile} />
        )}
        <ContactRow icon={<Mail className="h-3.5 w-3.5" />} value={broker.email} />
        <ContactRow icon={<Globe className="h-3.5 w-3.5" />} value={broker.website} />
      </div>
    </div>
  );
}

function ContactRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-gray-600">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
        {icon}
      </span>
      <span className="break-words">{value}</span>
    </div>
  );
}
