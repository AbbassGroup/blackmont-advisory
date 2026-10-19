import { Combobox, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxValue, useComboboxAnchor } from '@/components/ui/combobox';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';

export type ComboboxOption = { label: string; value: string; description?: string };

interface MultiSelectComboboxProps {
  id?: string;
  options: ComboboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  hasError?: boolean;
  placeholder?: string;
  emptyText?: string;
}

export function MultiSelectCombobox({ id, options, selectedValues, onChange, hasError, placeholder = 'Select items…', emptyText = 'No items found.' }: MultiSelectComboboxProps) {
  const anchor = useComboboxAnchor();
  return (
    <Combobox multiple autoHighlight value={selectedValues} onValueChange={(values: string[]) => onChange(values || [])} items={options.map((option) => option.value)}>
      <ComboboxChips ref={anchor} className={cn('min-h-10 w-full min-w-0 gap-2 rounded-none border-advisory-input bg-white px-3 py-2 font-advisory-body text-sm text-midnight shadow-none focus-within:border-gilt focus-within:ring-0 has-data-[slot=combobox-chip]:px-3 has-aria-invalid:ring-0', hasError && 'border-red-700 focus-within:border-red-700')}>
        <ComboboxValue>
          {(values: string[]) => <>
            {(values || []).map((value) => <ComboboxChip key={value} className='h-8 max-w-full rounded-none bg-canvas px-2 text-xs font-medium text-midnight [&_button]:rounded-none [&_button]:text-ink'>{options.find((option) => option.value === value)?.label || value}</ComboboxChip>)}
            <ComboboxChipsInput id={id} name={id} aria-required='true' aria-invalid={Boolean(hasError)} aria-describedby={hasError && id ? `${id}-hint` : undefined} placeholder={(values || []).length === 0 ? placeholder : ''} className='min-h-6 min-w-28 text-base placeholder:text-ink/65 min-[681px]:text-sm' />
          </>}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor} align='start' className={cn(landingFontVariables, 'w-(--anchor-width) min-w-0 rounded-none border border-advisory-rule bg-white font-advisory-body text-sm text-midnight shadow-none ring-0')}>
        <ComboboxEmpty className='py-4 text-sm text-ink'>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => {
            const option = options.find((entry) => entry.value === item);
            if (!option) return null;
            return <ComboboxItem key={option.value} value={option.value} className='min-h-10 cursor-pointer rounded-none px-3 py-2 data-highlighted:bg-canvas data-highlighted:text-midnight not-data-[variant=destructive]:data-highlighted:**:text-midnight'><span className='flex min-w-0 flex-col gap-1'><span className='font-medium'>{option.label}</span>{option.description && <span className='break-all text-xs leading-[1.6] text-ink'>{option.description}</span>}</span></ComboboxItem>;
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
