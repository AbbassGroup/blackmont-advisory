import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type Cta = { href: string; title: string; detail: React.ReactNode };

export function CtaPair({ items }: { items: [Cta, Cta] }) {
  return (
    <section className='mt-16 grid gap-px border-[1.5px] border-secondary/10 bg-secondary/10 sm:grid-cols-2'>
      {items.map(({ href, title, detail }) => (
        <Link
          key={href}
          href={href}
          className='group bg-muted px-8 py-9 transition-colors hover:bg-accent-pale'
        >
          <span className='flex items-center justify-between text-lg font-bold tracking-tight text-secondary'>
            {title}
            <ArrowUpRight className='h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </span>
          <span className='mt-2 block text-sm text-muted-foreground'>
            {detail}
          </span>
        </Link>
      ))}
    </section>
  );
}
