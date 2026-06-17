import * as React from 'react';
import { 
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/ui/combobox';

export type ComboboxOption = {
  label: string;
  value: string;
  description?: string;
};

interface MultiSelectComboboxProps {
  options: ComboboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  hasError?: boolean;
  placeholder?: string;
  emptyText?: string;
}

export function MultiSelectCombobox({ 
  options, 
  selectedValues, 
  onChange, 
  hasError, 
  placeholder = "Select items...", 
  emptyText = "No items found." 
}: MultiSelectComboboxProps) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      autoHighlight
      value={selectedValues}
      onValueChange={(val: string[]) => onChange(val || [])}
      items={options.map(o => o.value)}
    >
      <ComboboxChips ref={anchor} className={`w-full text-sm min-h-11 py-2 max-w-lg ${hasError ? 'border-red-500 focus-within:ring-red-500 ring-1 ring-red-500' : ''}`}>
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {(values || []).map((val: string) => {
                const option = options.find((o) => o.value === val);
                return (
                  <ComboboxChip key={val}>
                    {option?.label || val}
                  </ComboboxChip>
                );
              })}
              <ComboboxChipsInput placeholder={(values || []).length === 0 ? placeholder : ""} />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      
      <ComboboxContent anchor={anchor} align='start' className='w-(--anchor-width) min-w-[300px]'>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => {
             const option = options.find((o) => o.value === item);
             if (!option) return null;
             return (
              <ComboboxItem key={option.value} value={option.value}>
                <div className='flex flex-col'>
                  <span className='font-medium'>{option.label}</span>
                  {option.description && (
                    <span className='text-xs text-muted-foreground'>{option.description}</span>
                  )}
                </div>
              </ComboboxItem>
             );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
