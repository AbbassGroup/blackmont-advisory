import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { LandingImage } from '@/components/landing/landing-image';
import { landingImages } from '@/components/landing/images';
import { LandingTheme } from '@/components/landing/landing-theme';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';

type Action = { href: string; label: string };

/**
 * The building photo, faded into the canvas background exactly like the
 * Resources / About / Valuation banners (from the left on desktop, from the
 * top on mobile), so the banner reads as one piece rather than two halves.
 */
function BuildingBackdrop({ fade, alt = '' }: { fade: 'left' | 'top'; alt?: string }) {
  return (
    <>
      <LandingImage
        src={landingImages.network.src}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        fill
        unoptimized
        preload
        sizes='(max-width: 930px) 100vw, 60vw'
        className='pointer-events-none object-cover object-center'
      />
      <div
        aria-hidden='true'
        className={
          fade === 'left'
            ? 'pointer-events-none absolute inset-0 bg-linear-to-r from-canvas via-canvas/90 via-[22%] to-canvas/0 to-[55%]'
            : 'pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[8%] to-canvas/0 to-[35%]'
        }
      />
    </>
  );
}

/**
 * Banner in the same light style as the Resources, About and Valuation pages:
 * text on the left, a photo fading in from the right, and here an enquiry
 * form sitting on top of the photo.
 */
export function FormBanner({
  titleId,
  crumbs,
  title,
  intro,
  points,
  primary,
  secondary,
  form,
  imageAlt,
}: {
  titleId: string;
  crumbs: Crumb[];
  title: string;
  intro: string;
  points: string[];
  primary: Action;
  secondary: Action;
  form: ReactNode;
  /** Describes the banner photo; leave out to treat it as decoration. */
  imageAlt?: string;
}) {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby={titleId} className='relative isolate overflow-hidden'>
        <figure className='absolute inset-y-0 right-0 -z-10 m-0 hidden w-[60%] min-[931px]:block'>
          <BuildingBackdrop fade='left' alt={imageAlt} />
        </figure>

        <LandingContainer className='grid items-center gap-0 min-[931px]:grid-cols-[1.1fr_0.9fr] min-[931px]:gap-16'>
          <div className='min-w-0 py-10 min-[681px]:py-12 min-[931px]:py-12 min-[1121px]:py-14'>
            <Breadcrumbs items={crumbs} tone='light' />
            <h1
              id={titleId}
              className='m-0 mt-6 mb-5 max-w-[620px] font-advisory-heading text-[clamp(34px,8.5vw,46px)] leading-[1.18] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(38px,4.6vw,50px)] min-[1121px]:text-[clamp(44px,4vw,56px)]'
            >
              {title}
            </h1>
            <p className='m-0 mb-5 max-w-[560px] text-[17px] leading-[1.7] text-ink min-[1121px]:text-lg'>
              {intro}
            </p>
            <ul className='m-0 mb-7 max-w-[560px] list-none space-y-2.5 p-0'>
              {points.map((point) => (
                <li key={point} className='flex items-start gap-3 text-[15px] leading-[1.6] text-ink'>
                  <Check size={18} strokeWidth={2.25} aria-hidden='true' className='mt-[3px] shrink-0 text-gilt' />
                  {point}
                </li>
              ))}
            </ul>
            <nav aria-label='Page actions' className='flex flex-wrap items-center gap-x-6 gap-y-3'>
              <LandingButtonLink href={primary.href}>{primary.label}</LandingButtonLink>
              <LandingTextLink href={secondary.href} className='inline-flex min-h-11 items-center'>
                {secondary.label}
              </LandingTextLink>
            </nav>
          </div>

          {/* Mobile: the photo sits under the text, fading in from the top, with the form on it.
              Desktop: the section-level photo shows through. */}
          <div className='relative isolate -mx-5 px-5 pt-12 pb-8 min-[681px]:-mx-9 min-[681px]:px-9 min-[931px]:mx-0 min-[931px]:px-0 min-[931px]:py-12 min-[1121px]:py-14'>
            <div className='absolute inset-0 -z-10 min-[931px]:hidden'>
              <BuildingBackdrop fade='top' />
            </div>
            <div id='enquire' className='min-w-0 scroll-mt-6'>
              {form}
            </div>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
