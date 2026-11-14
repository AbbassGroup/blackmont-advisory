'use client';

import { BookOpen, BriefcaseBusiness, Newspaper, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RESOURCE_TYPES, resourceTypeInfo, type ResourceType } from '@/lib/blogs';

const ICONS: Record<ResourceType, LucideIcon> = {
  blog: Newspaper,
  guide: BookOpen,
  'case-study': BriefcaseBusiness,
};

/**
 * Which Resources tab the article is published under. A native radio group
 * (visually a segmented control), so arrow keys and screen readers just work.
 */
export default function ResourceTypeField({
  value,
  onChange,
  disabled,
}: {
  value: ResourceType;
  onChange: (value: ResourceType) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className='m-0 flex min-w-0 flex-col gap-2 border-0 p-0'>
      <legend className='mb-2 p-0 text-sm font-medium text-midnight'>
        Type <span aria-hidden='true'>*</span>
      </legend>
      <div className='grid grid-cols-3 gap-2'>
        {RESOURCE_TYPES.map(({ value: option, label }) => {
          const Icon = ICONS[option];
          const checked = value === option;
          return (
            <label
              key={option}
              className={cn(
                'flex min-h-11 cursor-pointer items-center justify-center gap-2 border px-3 text-sm font-medium transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gilt motion-reduce:transition-none',
                checked
                  ? 'border-gilt bg-gilt/15 text-midnight'
                  : 'border-advisory-input bg-white text-ink hover:border-midnight',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <input
                type='radio'
                name='blog-resource-type'
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className='sr-only'
              />
              <Icon size={16} strokeWidth={1.75} aria-hidden='true' className={checked ? 'text-gilt' : undefined} />
              {label}
            </label>
          );
        })}
      </div>
      <p className='m-0 text-xs leading-[1.75] text-ink'>
        Appears under Resources › {resourceTypeInfo(value).plural} ({resourceTypeInfo(value).tabPath}).
      </p>
    </fieldset>
  );
}
