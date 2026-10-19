import type { ReactNode } from 'react';
import type { SheetStatus } from '@/components/offer-term-sheet';

export const INPUT_CLASS = 'block h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt read-only:bg-canvas read-only:text-ink disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-700 motion-reduce:transition-none min-[681px]:text-sm';
export const TEXTAREA_CLASS = 'block w-full min-w-0 resize-y rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base leading-[1.75] text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm';
export const CHECKBOX_CLASS = 'mt-0.5 shrink-0 rounded-none border-advisory-input shadow-none data-checked:border-midnight data-checked:bg-midnight data-checked:text-white focus-visible:border-gilt focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt';
export const STATUS_STYLE: Record<SheetStatus, string> = {
  draft: 'bg-canvas text-ink',
  changes_requested: 'bg-amber-50 text-amber-900',
  pending_approval_buyer: 'bg-gilt/15 text-midnight',
  pending_approval_vendor: 'bg-gilt/15 text-midnight',
  sent_to_buyer: 'bg-sky-50 text-sky-900',
  sent_to_vendor: 'bg-sky-50 text-sky-900',
  completed: 'bg-emerald-50 text-emerald-800',
  declined: 'bg-red-50 text-red-800',
  cancelled: 'bg-canvas text-ink',
};

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='flex min-w-0 flex-col gap-5 border-t border-advisory-rule px-5 py-6 min-[681px]:px-8 min-[681px]:py-8'>
      <h2 className='m-0 font-advisory-heading text-xl leading-[1.4] font-bold tracking-normal text-midnight'>{title}</h2>
      {children}
    </section>
  );
}
