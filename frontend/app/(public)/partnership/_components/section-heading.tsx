interface SectionHeadingProps {
  /** Small uppercase kicker shown above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  align?: 'center' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * Shared partnership section header: optional gilt eyebrow + title.
 * `theme='dark'` switches the title to parchment for use on navy bands.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className='h-0.5 w-8 bg-accent' aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          isDark ? 'text-parchment' : 'text-secondary'
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
