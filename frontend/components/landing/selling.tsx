import { LandingImage } from './landing-image';
import { landingImages } from './images';
import { LandingTheme } from './landing-theme';
import {
  LandingContainer,
  LandingSectionIntro,
  LandingTextLink,
} from './presentation';

const PHOTO_SIZES =
  '(max-width: 680px) calc(100vw - 40px), (max-width: 1120px) calc(50vw - 36px), (max-width: 1444px) calc(50vw - 52px), 670px';

export function Selling() {
  return (
    <LandingTheme>
      <section
        id='selling'
        aria-labelledby='selling-title'
        className='py-14 min-[681px]:py-16 min-[1121px]:py-20'
      >
        <LandingContainer>
          <LandingSectionIntro
            headingId='selling-title'
            heading='A well-run sale starts before the first buyer is approached.'
          />
          <div className='grid min-[681px]:grid-cols-2'>
            <article className='flex min-w-0 flex-col items-start justify-center bg-canvas p-6 min-[681px]:p-8 min-[681px]:min-h-[355px]'>
              <div className='flex min-w-0 flex-col items-start'>
                <h3 className='m-0 mb-4 font-advisory-heading text-[25px] leading-[1.3] font-bold tracking-normal text-midnight min-[681px]:mb-[24px] min-[681px]:text-[clamp(25px,2.4vw,31px)]'>
                  First, we listen.
                </h3>
                <p className='m-0 mb-[16px] max-w-[450px] text-[15px] leading-[1.75] min-[681px]:text-base'>
                  What you’ve built, what it is worth to you and what you want to do
                  next. We begin with a private conversation and an honest view of
                  your options.
                </p>
                <p className='m-0 max-w-[450px] text-[15px] leading-[1.75] min-[681px]:text-base'>
                  The process is managed around your business and your
                  circumstances, not a standard listing timetable.
                </p>
              </div>
            </article>
            <figure className='group/image relative m-0 min-h-[310px] min-w-0 overflow-hidden min-[681px]:min-h-[440px]'>
              <LandingImage
                src={landingImages.sellingConversation.src}
                alt={landingImages.sellingConversation.alt}
                quality={85}
                fill
                loading='lazy'
                sizes={PHOTO_SIZES}
                className='object-cover object-[center_46%]'
              />
            </figure>
            <article className='flex min-w-0 flex-col items-start justify-center bg-deep-navy p-6 min-[681px]:p-8 text-white min-[681px]:col-start-2 min-[681px]:row-start-2 min-[681px]:min-h-[355px]'>
              <div className='flex min-w-0 flex-col items-start'>
                <h3 className='m-0 mb-4 font-advisory-heading text-[25px] leading-[1.3] font-bold tracking-normal text-white min-[681px]:mb-[24px] min-[681px]:text-[clamp(25px,2.4vw,31px)]'>
                  Then, we do the work.
                </h3>
                <p className='m-0 mb-[16px] max-w-[450px] text-[15px] leading-[1.75] min-[681px]:text-base'>
                  Valuation guidance, a properly prepared Information Memorandum,
                  private buyer outreach and negotiation through to settlement.
                </p>
                <p className='m-0 mb-[16px] max-w-[450px] text-[15px] leading-[1.75] min-[681px]:text-base'>
                  Nothing is disclosed without your approval. Your advisor stays
                  involved from start to finish.
                </p>
                <LandingTextLink href='#contact' tone='gilt' className='mt-1.5'>
                  Talk through your options
                </LandingTextLink>
              </div>
            </article>
            <figure className='group/image relative m-0 min-h-[310px] min-w-0 overflow-hidden min-[681px]:col-start-1 min-[681px]:row-start-2 min-[681px]:min-h-[440px]'>
              <LandingImage
                src={landingImages.sellingWork.src}
                alt={landingImages.sellingWork.alt}
                quality={85}
                fill
                loading='lazy'
                sizes={PHOTO_SIZES}
                className='object-cover object-center'
              />
            </figure>
          </div>
        </LandingContainer>
      </section>
    </LandingTheme>
  );
}
