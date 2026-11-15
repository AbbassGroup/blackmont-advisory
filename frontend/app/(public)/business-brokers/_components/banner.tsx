import type { StaticImageData } from 'next/image';
import { LandingTheme } from '@/components/landing/landing-theme';
import { LandingImage } from '@/components/landing/landing-image';
import defaultImage from '@/public/landing/industry-owner-review.jpeg';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs, type Crumb } from '@/components/seo/breadcrumbs';

const DEFAULT_ALT =
  'Illustrative photograph of a business advisor reviewing documents at a desk';

/**
 * Same layout as the Resources, About and Valuation banners: text left,
 * photo fading in from the right. Used by the hub and every location page.
 */
export function BrokersBanner({
  crumbs,
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  image,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  image?: { src: StaticImageData; alt: string };
}) {
  return (
    <LandingTheme className='bg-canvas'>
      <section aria-labelledby='brokers-page-title' className='relative isolate overflow-hidden'>
        <LandingContainer className='pointer-events-none relative z-10 min-[931px]:flex min-[931px]:min-h-[520px] min-[931px]:items-center min-[1121px]:min-h-[560px]'>
          <div className='pointer-events-auto min-w-0 motion-safe:animate-advisory-hero focus-within:animate-none min-[931px]:w-[55%] min-[1121px]:w-[54%] py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20'>
            <Breadcrumbs items={crumbs} tone='light' />
            {eyebrow && (
              <p className='m-0 mt-8 flex items-center gap-3 text-xs font-bold tracking-[0.14em] text-gilt uppercase'>
                <span aria-hidden='true' className='h-px w-8 bg-gilt' />
                {eyebrow}
              </p>
            )}
            <h1
              id='brokers-page-title'
              className={`m-0 mb-6 max-w-[650px] font-advisory-heading text-[clamp(36px,9vw,52px)] leading-[1.14] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(37px,5vw,50px)] min-[931px]:text-[clamp(42px,4.8vw,56px)] min-[1121px]:text-[clamp(46px,4.5vw,62px)] ${eyebrow ? 'mt-4' : 'mt-8'}`}
            >
              {title}
            </h1>
            <p className='m-0 mb-[28px] max-w-[540px] text-[17px] leading-[1.7] text-ink min-[681px]:mb-[32px] min-[1121px]:text-lg'>
              {intro}
            </p>
            <nav aria-label='Page actions' className='flex flex-wrap items-center gap-x-6 gap-y-3'>
              <LandingButtonLink href={primary.href}>{primary.label}</LandingButtonLink>
              <LandingTextLink href={secondary.href} className='inline-flex min-h-11 items-center'>
                {secondary.label}
              </LandingTextLink>
            </nav>
          </div>
        </LandingContainer>
        <figure className='group/image relative m-0 h-[clamp(260px,65vw,400px)] w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto min-[931px]:w-[60%]'>
          <LandingImage
            src={image?.src ?? defaultImage}
            alt={image?.alt ?? DEFAULT_ALT}
            preload
            fill
            sizes='(max-width: 930px) 100vw, 60vw'
            className='object-cover object-[65%_center]'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/60 via-[8%] to-canvas/0 to-[35%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[22%] min-[931px]:to-[55%]'
          />
        </figure>
      </section>
    </LandingTheme>
  );
}
