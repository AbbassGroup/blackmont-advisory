import type { ReactNode } from 'react';
import { LandingImage } from '@/components/landing/landing-image';
import {
  LandingButtonLink,
  LandingContainer,
  LandingTextLink,
} from '@/components/landing/presentation';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { cn } from '@/lib/utils';

type ListingBannerProps = {
  title: string;
  listingId: string;
  image?: string;
  summary?: string;
  price?: string;
  location?: string;
  category?: string;
  acquisitionAccess?: boolean;
  children?: ReactNode;
};

export function ListingBanner({
  title,
  listingId,
  image,
  summary,
  price,
  location,
  category,
  acquisitionAccess = false,
  children,
}: ListingBannerProps) {
  return (
    <section aria-labelledby='listing-title' className='relative isolate overflow-hidden border-b border-advisory-rule bg-canvas'>
      <LandingContainer className={cn(
        'pointer-events-none relative z-10',
        image && 'min-[931px]:flex min-[931px]:min-h-[560px] min-[931px]:items-center min-[1121px]:min-h-[600px]',
      )}>
        <div className={cn(
          'pointer-events-auto min-w-0 py-12 min-[681px]:py-14 min-[931px]:py-16 min-[1121px]:py-20',
          image ? 'min-[931px]:w-[53%] min-[1121px]:w-[51%]' : 'max-w-[1000px]',
          image && acquisitionAccess && 'min-[931px]:pr-10',
        )}>
          <Breadcrumbs
            tone='light'
            items={[
              { name: 'Home', path: '' },
              { name: 'Buying a business', path: '/buy-a-business' },
              { name: title, path: `/listings/${listingId}` },
            ]}
          />
          <h1
            id='listing-title'
            className='mt-8 mb-0 max-w-[760px] break-words font-advisory-heading text-[clamp(32px,7.5vw,44px)] leading-[1.22] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(38px,4.2vw,54px)]'
          >
            {title}
          </h1>
          {summary && (
            <p className='mt-6 mb-0 max-w-[580px] text-base leading-[1.8] text-ink min-[681px]:text-[17px]'>
              {summary}
            </p>
          )}
          {(price || location || category) && (
            <dl className='mt-7 mb-0 flex flex-wrap gap-x-9 gap-y-5'>
              {price && (
                <div>
                  <dt className='text-sm text-ink'>{acquisitionAccess ? 'Acquisition value' : 'Asking price'}</dt>
                  <dd className='mt-2 font-advisory-heading text-[27px] leading-[1.35] font-bold text-midnight min-[681px]:text-[30px]'>{price}</dd>
                </div>
              )}
              {location && (
                <div>
                  <dt className='text-sm text-ink'>Location</dt>
                  <dd className='mt-2 text-base leading-[1.6] font-medium text-midnight'>{location}</dd>
                </div>
              )}
              {category && (
                <div>
                  <dt className='text-sm text-ink'>Industry</dt>
                  <dd className='mt-2 text-base leading-[1.6] font-medium text-midnight'>{category}</dd>
                </div>
              )}
            </dl>
          )}
          <div className='mt-8'>
            {acquisitionAccess ? (
              <nav aria-label='Acquisition enquiry actions' className='flex flex-wrap items-center gap-x-6 gap-y-4'>
                <LandingButtonLink href='#register-interest'>Register your interest</LandingButtonLink>
                <LandingTextLink href='/buy-a-business' className='inline-flex min-h-11 items-center'>Buying with Blackmont</LandingTextLink>
              </nav>
            ) : children}
          </div>
        </div>
      </LandingContainer>

      {image && (
        <figure className={cn(
          'relative m-0 w-full overflow-hidden min-[931px]:absolute min-[931px]:inset-y-0 min-[931px]:right-0 min-[931px]:h-auto',
          acquisitionAccess
            ? 'aspect-[3/2] bg-midnight min-[931px]:aspect-auto min-[931px]:w-[48%]'
            : 'group/image h-[clamp(280px,65vw,440px)] min-[931px]:w-[58%]',
        )}>
          <LandingImage
            src={image}
            alt={acquisitionAccess ? 'Blackmont acquisition opportunities valued at five million dollars and above' : title}
            fill
            preload
            unoptimized
            sizes='(max-width: 930px) 100vw, 58vw'
            className={acquisitionAccess ? 'object-contain' : 'object-cover'}
          />
          {!acquisitionAccess && (
            <div aria-hidden='true' className='pointer-events-none absolute inset-0 bg-linear-to-b from-canvas via-canvas/50 via-[5%] to-canvas/0 to-[20%] min-[931px]:bg-linear-to-r min-[931px]:via-canvas/90 min-[931px]:via-[15%] min-[931px]:to-[45%]' />
          )}
        </figure>
      )}
    </section>
  );
}
