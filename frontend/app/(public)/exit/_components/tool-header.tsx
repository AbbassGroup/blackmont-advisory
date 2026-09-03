import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';
import { SHELL } from '@/lib/seo-layout';

interface ToolHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  crumbs: Crumb[];
}

export function ToolHeader({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: ToolHeaderProps) {
  return (
    <section className='relative overflow-hidden border-b border-accent/15 bg-secondary pb-14 pt-28 lg:pb-16 lg:pt-32'>
      <span
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent'
      />

      <div className={`relative z-10 ${SHELL}`}>
        <Breadcrumbs items={crumbs} />

        {eyebrow && (
          <span className='mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-accent'>
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-3xl font-bold leading-[1.1] tracking-tight text-parchment md:text-4xl lg:text-5xl ${
            eyebrow ? 'mt-3' : 'mt-6'
          }`}
        >
          {title}
        </h1>
        <p className='mt-5 max-w-2xl text-lg font-light leading-relaxed text-parchment/60'>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
