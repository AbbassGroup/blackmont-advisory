interface SectionHeadingProps {
  /** Small uppercase kicker shown above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  align?: 'center' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * Shared partnership section header: eyebrow + title + gradient underline.
 * `theme='dark'` switches the title to white for use on navy bands.
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
        <span className='inline-block mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-primary'>
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-extrabold leading-[1.15] ${
          isDark ? 'text-white' : 'text-brand-black'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1.5 w-20 rounded-full bg-linear-to-r from-brand-primary to-brand-primary-dark ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
