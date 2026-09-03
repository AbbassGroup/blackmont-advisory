import Link from 'next/link';
import { H2, SHELL } from '@/lib/seo-layout';

export interface ToolNotesProps {
  heading: string;
  paragraphs: string[];
  limits: { heading: string; body: string };
  related: { href: string; label: string; detail: string };
}

export function ToolNotes({
  heading,
  paragraphs,
  limits,
  related,
}: ToolNotesProps) {
  return (
    <section className='border-t border-secondary/10 bg-background py-14 lg:py-16'>
      <div className={SHELL}>
        <h2 className={H2}>{heading}</h2>
        {paragraphs.map((para) => (
          <p
            key={para}
            className='mt-5 max-w-3xl leading-relaxed text-muted-foreground'
          >
            {para}
          </p>
        ))}

        <h3 className='mt-10 text-lg font-bold tracking-tight text-secondary'>
          {limits.heading}
        </h3>
        <p className='mt-3 max-w-3xl leading-relaxed text-muted-foreground'>
          {limits.body}
        </p>

        <p className='mt-8 max-w-3xl leading-relaxed text-muted-foreground'>
          {related.detail}{' '}
          <Link
            href={related.href}
            className='text-accent underline underline-offset-4 transition-opacity hover:opacity-75'
          >
            {related.label}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
