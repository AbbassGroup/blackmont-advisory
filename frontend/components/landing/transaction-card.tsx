import { LandingImage } from './landing-image';
import { LandingLink } from './landing-link';
import type { RecentAcquisition } from '@/lib/data/recent-acquisitions';
import { landingImages } from './images';

const IMAGE_SIZES =
  '(max-width: 600px) calc(100vw - 38px), (max-width: 680px) calc(50vw - 28px), (max-width: 930px) calc(50vw - 50px), (max-width: 1120px) calc(25vw - 33px), (max-width: 1344px) calc(25vw - 44px), 292px';

export function TransactionCard({ deal }: { deal: RecentAcquisition }) {
  const image = landingImages[deal.id];
  const headingId = `acquisition-${deal.id}`;

  return (
    <LandingLink
      href='/buy-a-business'
      aria-labelledby={headingId}
      className='block h-full w-full min-w-0 no-underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'
    >
      <article aria-labelledby={headingId} className='flex h-full w-full min-w-0 flex-col'>
        <div className='group/image shrink-0 overflow-hidden'>
          <LandingImage
            src={image.src}
            alt={image.alt}
            quality={85}
            loading='lazy'
            sizes={IMAGE_SIZES}
            className='block h-[225px] w-full object-cover min-[601px]:h-[165px] min-[681px]:h-[210px] min-[931px]:h-[clamp(160px,14vw,195px)]'
          />
        </div>
        <h3
          id={headingId}
          className='m-0 mt-[17px] mb-px font-advisory-heading text-lg leading-[1.35] font-bold tracking-normal text-midnight min-[681px]:text-xl'
        >
          {deal.title}
        </h3>
        <p className='m-0 mb-[13px] text-[13px] leading-[1.65] min-[681px]:text-[15px]'>
          {deal.location}, {deal.state}
        </p>
        <p className='m-0 mb-[17px] text-sm leading-[1.65] min-[601px]:min-h-[74px] min-[681px]:min-h-[50px] min-[681px]:text-[15px] min-[931px]:min-h-[75px]'>
          {deal.description}
        </p>
        <dl className='m-0 mt-auto flex items-start justify-between gap-3 border-t border-advisory-rule pt-[13px]'>
          <div>
            <dt className='text-xs leading-[1.5]'>Deal size</dt>
            <dd className='m-0 font-advisory-heading text-xl leading-[1.4] font-bold text-midnight min-[681px]:text-[22px]'>
              {deal.dealSize}
            </dd>
          </div>
          {deal.sde && (
            <div className='text-right'>
              <dt className='text-xs leading-[1.5]'>SDE</dt>
              <dd className='m-0 font-advisory-heading text-xl leading-[1.4] font-bold text-midnight min-[681px]:text-[22px]'>
                {deal.sde}
              </dd>
            </div>
          )}
        </dl>
      </article>
    </LandingLink>
  );
}
