'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, Loader2, Search } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import { Command, CommandEmpty, CommandGroup, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';

const NEXAR_NAMES_URL = 'https://blackmont-api.nexartechnologies.com/api/v1/deals/get/all/names';
type Deal = { _id: string; name?: string; businessName?: string };
const personLabel = (deal: Deal) => deal.name || deal.businessName || 'Unnamed deal';
const businessLabel = (deal: Deal) => deal.businessName || deal.name || '';
const ITEM_CLASS = 'flex min-h-10 cursor-pointer items-center gap-3 px-3 py-2 text-sm leading-[1.65] outline-none data-[selected=true]:bg-canvas data-[selected=true]:text-midnight';

export function DealSelect({
  id,
  businessUnit,
  value,
  valueName,
  hasError = false,
  describedBy,
  onChange,
}: {
  id?: string;
  businessUnit: string;
  value?: string;
  valueName?: string;
  hasError?: boolean;
  describedBy?: string;
  onChange: (dealId: string, personName: string, businessName: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    apiClient
      .get(`${NEXAR_NAMES_URL}?businessUnit=${encodeURIComponent(businessUnit)}`)
      .then((response) => {
        if (!active) return;
        if (response.data?.success && Array.isArray(response.data.data)) setDeals(response.data.data);
        else setError(true);
      })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [businessUnit, attempt]);

  const found = value ? deals.find((deal) => deal._id === value) : undefined;
  const selectedName = value ? (found ? personLabel(found) : valueName) || (loading ? 'Loading selected deal…' : 'Selected deal') : '';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type='button'
          role='combobox'
          aria-expanded={open}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={cn('flex h-10 w-full min-w-0 cursor-pointer items-center justify-between gap-3 rounded-none border border-advisory-input bg-white px-3 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 hover:border-midnight focus-visible:border-gilt motion-reduce:transition-none min-[681px]:text-sm', hasError && 'border-red-700')}
        >
          <span className={cn('min-w-0 truncate', !value && 'text-ink/65')}>{value ? selectedName : 'Select deal…'}</span>
          <ChevronsUpDown aria-hidden='true' className='size-4 shrink-0 text-ink/65' />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className={cn(landingFontVariables, 'w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] gap-0 overflow-hidden rounded-none border border-advisory-rule bg-white p-0 font-advisory-body text-midnight shadow-none ring-0')}
      >
        <Command className='rounded-none! bg-white p-0 text-midnight'>
          <div className='relative border-b border-advisory-rule focus-within:border-gilt'>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/65' />
            <CommandPrimitive.Input aria-label='Search linked deals' placeholder='Search deal…' className='h-10 w-full min-w-0 bg-white py-2 pr-3 pl-10 text-base outline-none placeholder:text-ink/65 min-[681px]:text-sm' />
          </div>
          <CommandList aria-busy={loading} className='max-h-72 scroll-py-1'>
            {value && (
              <CommandGroup className='p-1 text-midnight'>
                <CommandPrimitive.Item value='__clear__' onSelect={() => { onChange('', '', ''); setOpen(false); }} className={cn(ITEM_CLASS, 'text-ink')}>
                  <span aria-hidden='true' className='size-4 shrink-0' /> Clear selection
                </CommandPrimitive.Item>
              </CommandGroup>
            )}
            {loading ? (
              <div role='status' className='flex items-center gap-2 px-4 py-5 text-sm text-ink'>
                <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> Loading deals…
              </div>
            ) : error ? (
              <div role='alert' className='p-4'>
                <p className='mt-0 mb-3 text-sm leading-[1.75] text-ink'>We couldn&apos;t load the deals.</p>
                <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
              </div>
            ) : (
              <>
                <CommandEmpty className='px-4 py-5 text-sm text-ink'>No matching deals.</CommandEmpty>
                <CommandGroup className='p-1 text-midnight'>
                  {deals.map((deal) => (
                    <CommandPrimitive.Item
                      key={deal._id}
                      value={`${personLabel(deal)} ${businessLabel(deal)} ${deal._id}`}
                      onSelect={() => {
                        if (deal._id === value) onChange('', '', '');
                        else onChange(deal._id, personLabel(deal), businessLabel(deal));
                        setOpen(false);
                      }}
                      className={ITEM_CLASS}
                    >
                      <Check aria-hidden='true' className={cn('size-4 shrink-0', value === deal._id ? 'opacity-100' : 'opacity-0')} />
                      <span className='min-w-0'>
                        <span className='block break-words'>{personLabel(deal)}</span>
                        {deal.businessName && deal.businessName !== personLabel(deal) && <span className='mt-0.5 block break-words text-xs text-ink'>{deal.businessName}</span>}
                      </span>
                    </CommandPrimitive.Item>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
