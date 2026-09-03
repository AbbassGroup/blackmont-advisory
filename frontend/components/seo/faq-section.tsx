import { H2 } from '@/lib/seo-layout';

export type Faq = { q: string; a: string };

export function FaqSection({ items }: { items: Faq[] }) {
  return (
    <section className='mt-14'>
      <h2 className={H2}>Common questions</h2>
      <dl className='mt-8 space-y-7'>
        {items.map(({ q, a }) => (
          <div key={q}>
            <dt className='text-lg font-bold tracking-tight text-secondary'>
              {q}
            </dt>
            <dd className='mt-2 leading-relaxed text-muted-foreground'>{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
