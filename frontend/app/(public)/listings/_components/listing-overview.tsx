import { LandingContainer } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';

type ListingOverviewProps = {
  title: string;
  about?: string;
  location?: string;
  mapLink?: string;
};

const heading = 'm-0 font-advisory-heading text-[28px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:text-[34px]';

export function ListingOverview({ title, about, location, mapLink }: ListingOverviewProps) {
  return (
    <section aria-label='Business details' className='bg-white text-ink py-14 min-[681px]:py-16 min-[1121px]:py-20'>
      <LandingContainer>
        <div className={cn(
          'grid items-start gap-8 min-[681px]:gap-10 min-[1121px]:gap-16',
          about && 'min-[981px]:grid-cols-[1.15fr_0.85fr]',
        )}>
          {about && (
            <section aria-labelledby='listing-about-title' className='min-w-0'>
              <h2 id='listing-about-title' className={heading}>About the business</h2>
              <div
                className='mt-6 max-w-[75ch] text-base leading-[1.85] wrap-break-word min-[681px]:text-[17px] [&_a]:text-midnight [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-gilt [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-3 [&_a:focus-visible]:outline-gilt [&_blockquote]:my-6 [&_blockquote]:border-l [&_blockquote]:border-advisory-rule [&_blockquote]:pl-5 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:font-advisory-heading [&_h2]:text-[26px] [&_h2]:leading-[1.4] [&_h2]:font-bold [&_h2]:tracking-normal [&_h2]:text-midnight [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:font-advisory-heading [&_h3]:text-[23px] [&_h3]:leading-[1.45] [&_h3]:font-bold [&_h3]:tracking-normal [&_h3]:text-midnight [&_img]:h-auto [&_img]:max-w-full [&_li]:my-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-0 [&_p+p]:mt-5 [&_strong]:font-semibold [&_strong]:text-midnight [&_table]:my-6 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_td]:border [&_td]:border-advisory-rule [&_td]:p-3 [&_th]:border [&_th]:border-advisory-rule [&_th]:bg-canvas [&_th]:p-3 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&>:first-child]:mt-0'
                dangerouslySetInnerHTML={{ __html: about }}
              />
            </section>
          )}

          <section aria-labelledby='listing-location-title' className='min-w-0'>
            <h2 id='listing-location-title' className={heading}>Location</h2>
            {location && (
              <p className='mt-4 mb-0 text-base leading-[1.7] text-ink min-[681px]:text-[17px]'>{location}</p>
            )}
            {mapLink ? (
              <div className='mt-6 overflow-hidden bg-canvas'>
                <iframe
                  src={mapLink}
                  title={`Location map for ${title}`}
                  width='100%'
                  height='380'
                  loading='lazy'
                  className='block h-[300px] w-full border-0 min-[681px]:h-[380px]'
                />
              </div>
            ) : (
              <p className='mt-6 mb-0 bg-canvas p-6 text-[15px] leading-[1.8] text-ink'>
                No map available
              </p>
            )}
          </section>
        </div>
      </LandingContainer>
    </section>
  );
}
