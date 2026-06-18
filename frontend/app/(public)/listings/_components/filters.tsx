'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'accommodation', name: "Accommodation/Tourism" },
  { id: 'automotive', name: 'Automotive' },
  { id: 'beauty', name: 'Beauty/Health' },
  { id: 'education', name: 'Education/Training' },
  { id: 'cafes', name: "Cafe's, Restaurants & Takeaway" },
  { id: 'transport', name: 'Transport & Logistics' },
  { id: 'trade', name: 'Trade' },
  { id: 'catering', name: 'Catering & Events' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'retail', name: 'Retail' },
  { id: 'healthcare', name: 'Healthcare' },
];

const LOCATIONS = [
  { id: 'melbourne', name: 'Melbourne' },
  { id: 'geelong', name: 'Geelong' },
  { id: 'ballarat', name: 'Ballarat' },
  { id: 'launceston', name: 'Launceston' },
  { id: 'brisbane', name: 'Brisbane' },
  { id: 'hobart', name: 'Hobart' },
  { id: 'sydney', name: 'Sydney' },
];

function FilterSelect({
  label,
  paramKey,
  options,
  value,
  onChange,
}: {
  label: string;
  paramKey: string;
  options: { id: string; name: string }[];
  value: string;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className='mb-5'>
      <label className='block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2'>
        {label}
      </label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(paramKey, e.target.value)}
          className='w-full appearance-none bg-background border border-secondary/15  px-4 py-3 text-sm text-secondary font-medium focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors pr-9 cursor-pointer'
        >
          <option value=''>All {label}</option>
          {options.map((o) => (
            <option key={o.id} value={o.name}>
              {o.name}
            </option>
          ))}
        </select>
        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
      </div>
    </div>
  );
}

export default function ListingFilters({
  category,
  location,
  count,
}: {
  category: string;
  location: string;
  count: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const hasFilters = !!(category || location);

  const clearAll = () => {
    router.push(pathname);
  };

  return (
    <div className='bg-background  border border-secondary/10 shadow-sm p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-sm font-bold text-secondary'>Filters</h2>
          {!hasFilters && (
            <p className='text-[11px] text-muted-foreground mt-0.5'>{count} listing{count !== 1 ? 's' : ''}</p>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className='flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors font-medium'
          >
            <X className='w-3.5 h-3.5' />
            Clear all
          </button>
        )}
      </div>

      <FilterSelect
        label='Category'
        paramKey='category'
        options={CATEGORIES}
        value={category}
        onChange={updateParam}
      />
      <FilterSelect
        label='Location'
        paramKey='location'
        options={LOCATIONS}
        value={location}
        onChange={updateParam}
      />

      {hasFilters && (
        <div className='mt-2 p-3 bg-accent-pale  border border-accent/10'>
          <p className='text-xs text-accent font-semibold'>
            {count} result{count !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
    </div>
  );
}
