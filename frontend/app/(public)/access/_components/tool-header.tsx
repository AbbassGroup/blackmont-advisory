import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export function ToolHeader({ eyebrow, title, subtitle }: ToolHeaderProps) {
  return (
    <section className='relative overflow-hidden bg-[#0c1218] pt-28 pb-14 lg:pt-32 lg:pb-16'>
      <div className='pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-brand-primary/15 blur-[130px]' />

      <div className='relative z-10 mx-auto max-w-[1100px] px-6 lg:px-8'>
        <Button>
          <Link
            href='/access'
            className='inline-flex items-center gap-2 text-sm  transition-colors hover:text-white'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to resources
          </Link>
        </Button>

        {eyebrow && (
          <span className='mt-7 block text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary'>
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl ${
            eyebrow ? 'mt-3' : 'mt-7'
          }`}
        >
          {title}
        </h1>
        <p className='mt-4 max-w-2xl sm:text-lg leading-relaxed text-white/65'>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
