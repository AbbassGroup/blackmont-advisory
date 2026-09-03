import { CONTENT_UPDATED } from '@/lib/data/industry-benchmarks';

const LABEL = new Date(CONTENT_UPDATED).toLocaleDateString('en-AU', {
  month: 'long',
  year: 'numeric',
});

export function LastUpdated() {
  return (
    <p className='mt-12 text-xs text-muted-foreground'>Last updated {LABEL}</p>
  );
}
