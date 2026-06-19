import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

interface ContactTeamProps {
  businessType: string;
  setBusinessType: (v: string) => void;
  priceRange: string;
  setPriceRange: (v: string) => void;
  selectedDeal: string;
  setSelectedDeal: (v: string) => void;
  referenceId: string;
  setReferenceId: (v: string) => void;
  errors?: Record<string, string>;
}

export function External({
  businessType,
  setBusinessType,
  priceRange,
  setPriceRange,
  selectedDeal,
  setSelectedDeal,
  referenceId,
  setReferenceId,
  errors = {},
}: ContactTeamProps) {
  const [open, setOpen] = useState(false);
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await apiClient.get(
          `https://blackmont-api.nexartechnologies.com/deals/get/all/names`,
        );
        if (res.data?.success) {
          setDeals(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching deals:', err);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className='border border-border bg-card p-6 space-y-6'>
      <div className='flex items-center gap-2 border-b border-border pb-4 mb-4'>
        <h2 className='text-lg font-semibold text-secondary'>External</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='space-y-2'>
          <Label htmlFor='businessType'>
            Business Type <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='businessType'
            name='businessType'
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className={
              errors.businessType
                ? 'border-red-500 focus-visible:ring-red-500'
                : ''
            }
          />
          {errors.businessType && (
            <p className='text-sm text-red-500'>{errors.businessType}</p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='priceRange'>
            Price Range <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='priceRange'
            name='priceRange'
            type='number'
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={
              errors.priceRange
                ? 'border-red-500 focus-visible:ring-red-500'
                : ''
            }
          />
          {errors.priceRange && (
            <p className='text-sm text-red-500'>{errors.priceRange}</p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='deal' className={errors.deal ? 'text-red-500' : ''}>
            Deal <span className='text-red-500'>*</span>
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className={cn(
                  'w-full justify-between font-normal',
                  !selectedDeal && 'text-muted-foreground',
                  errors.deal ? 'border-red-500 focus:ring-red-500' : '',
                )}
              >
                {selectedDeal
                  ? deals.find((d) => d._id === selectedDeal)?.name ||
                    'Loading...'
                  : 'Select deal...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
              <Command>
                <CommandInput placeholder='Search deal...' />
                <CommandList>
                  <CommandEmpty>No deal found.</CommandEmpty>
                  <CommandGroup>
                    {deals.map((deal) => (
                      <CommandItem
                        key={deal._id}
                        value={deal.name}
                        onSelect={() => {
                          setSelectedDeal(
                            deal._id === selectedDeal ? '' : deal._id,
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedDeal === deal._id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {deal.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.deal && <p className='text-sm text-red-500'>{errors.deal}</p>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='referenceId'>Reference ID</Label>
          <Input
            id='referenceId'
            name='referenceId'
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            disabled
            className={
              errors.referenceId
                ? 'border-red-500 focus-visible:ring-red-500'
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
}
