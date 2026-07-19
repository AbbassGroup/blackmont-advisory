'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';

const NEXAR_NAMES_URL =
  'https://blackmont-api.nexartechnologies.com/api/v1/deals/get/all/names';

// `name` is the deal contact/person; `businessName` is their business. The
// dropdown lists deals by the person name, but selecting one reports both so the
// report's customer name can be prefilled from the business name.
type Deal = { _id: string; name?: string; businessName?: string };

const personLabel = (d: Deal) => d.name || d.businessName || 'Unnamed deal';
const businessLabel = (d: Deal) => d.businessName || d.name || '';

export function DealSelect({
  businessUnit,
  value,
  valueName,
  onChange,
}: {
  businessUnit: string;
  value?: string;
  /** Cached person name so the trigger shows a label before the list loads. */
  valueName?: string;
  onChange: (dealId: string, personName: string, businessName: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    let active = true;
    apiClient
      .get(
        `${NEXAR_NAMES_URL}?businessUnit=${encodeURIComponent(businessUnit)}`,
      )
      .then((res) => {
        if (active && res.data?.success) setDeals(res.data.data || []);
      })
      .catch((err) => console.error('Error fetching deals:', err));
    return () => {
      active = false;
    };
  }, [businessUnit]);

  const found = value ? deals.find((d) => d._id === value) : undefined;
  const selectedName = value
    ? (found ? personLabel(found) : valueName) || 'Loading...'
    : '';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between rounded-none font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          {value ? selectedName : 'Select deal...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
        <Command>
          <CommandInput placeholder='Search deal...' />
          <CommandList>
            <CommandEmpty>No deal found.</CommandEmpty>
            <CommandGroup>
              {value && (
                <CommandItem
                  value='__clear__'
                  onSelect={() => {
                    onChange('', '', '');
                    setOpen(false);
                  }}
                  className='text-muted-foreground'
                >
                  <Check className='mr-2 h-4 w-4 opacity-0' />
                  Clear selection
                </CommandItem>
              )}
              {deals.map((deal) => (
                <CommandItem
                  key={deal._id}
                  value={`${personLabel(deal)} ${businessLabel(deal)} ${deal._id}`}
                  onSelect={() => {
                    if (deal._id === value) onChange('', '', '');
                    else onChange(deal._id, personLabel(deal), businessLabel(deal));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === deal._id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {personLabel(deal)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
