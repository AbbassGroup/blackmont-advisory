import { Container, Eyebrow, Reveal } from '@/components/landing/primitives';

type PageBannerProps = {
  /** Heading text. Wrap a word in a <span className='font-light text-accent'> for the gilt accent. */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional gilt eyebrow label above the title. */
  eyebrow?: string;
  /** Optional background image path, shown faintly behind a cream overlay. */
  image?: string;
};

/**
 * Reusable page banner styled like the home hero — a faint background photo
 * behind a cream overlay, with a large heading and supporting description.
 * Intended for interior pages (Services, About, etc.); the home page keeps
 * its own bespoke hero.
 */
export function PageBanner({
  title,
  description,
  eyebrow,
  image,
}: PageBannerProps) {
  return (
    <section className='relative overflow-hidden border-b border-secondary/10 bg-background'>
      {image && (
        <>
          <div
            aria-hidden
            className='absolute inset-0 z-0 bg-cover bg-[center_30%] opacity-45'
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div
            aria-hidden
            className='absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/75 to-background/45'
          />
        </>
      )}

      <Container className='relative z-[2] pb-20 pt-36 lg:pb-24 lg:pt-44'>
        <Reveal className='max-w-3xl'>
          {eyebrow && (
            <Eyebrow withRule className='mb-7'>
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className='text-4xl font-bold leading-[1.08] tracking-tight text-secondary sm:text-5xl lg:text-6xl'>
            {title}
          </h1>
          {description && (
            <p className='mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground'>
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
