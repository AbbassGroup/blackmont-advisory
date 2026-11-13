'use client';

import { ArrowUpRight, ClipboardCheck, Compass, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '../section-chrome';
import { AppraisalDialog } from '../appraisal-dialog';

const BUY_A_BUSINESS_URL = 'https://blackmontadvisory.com/buy-a-business';

const COMMERCIAL_LAWYER = {
  role: 'Commercial Lawyer',
  name: 'Chloe Plavin',
  company: 'JG Tax & Legal',
  phone: '0409 411 232',
  image: '/jptl.png',
};

/** Previous Commercial Lawyer — kept ONLY for the IM templates listed below. */
const LEGACY_COMMERCIAL_LAWYER = {
  role: 'Commercial Lawyer',
  name: 'Lei Praytil',
  company: 'Petra Law',
  phone: '0423 162 481',
  image: '/petra-law.png',
};

/** IM template ids that must keep showing the legacy Commercial Lawyer.
 * (blackmontadvisory.com/information-memorandum/6a7d584ae17999e200c88af6) */
const LEGACY_LAWYER_TEMPLATE_IDS = new Set(['6a7d584ae17999e200c88af6']);

type Contact = {
  role: string;
  name: string;
  company: string;
  phone: string;
  image: string;
  /** Wide wordmark logos are shown whole (contained) instead of cropped. */
  imageFit?: 'cover' | 'contain';
};

/** Listed first on every IM. */
const ACCOUNTANT: Contact = {
  role: 'Accountant',
  name: 'Wilson Zhou',
  company: 'Rubin Partners',
  phone: '0404 377 066',
  image: '/rubin.svg',
  imageFit: 'contain',
};

const OTHER_CONTACTS: Contact[] = [
  {
    role: 'Business Loans',
    name: 'Nazar Asani',
    company: 'Fiducia Finance',
    phone: '0439 003 349',
    image: '/fiducia.jpg',
  },
  {
    role: 'Business Insurance',
    name: 'Terry Lee',
    company: 'CGIS Insurance',
    phone: '0456 536 680',
    image: '/CGIS.png',
  },
  {
    role: 'Commercial Real Estate',
    name: 'Chris Coster',
    company: 'Tsimos Commercial Property',
    phone: '0410 742 704',
    image: '/chris-coster.jpg',
  },
];

export function KeyContactsSection({
  title,
  editable,
  onChange,
  templateId,
}: {
  title: string;
  editable?: boolean;
  onChange?: (patch: { title: string }) => void;
  /** The IM template being rendered — selects the Commercial Lawyer shown. */
  templateId?: string;
}) {
  const lawyer =
    templateId && LEGACY_LAWYER_TEMPLATE_IDS.has(templateId)
      ? LEGACY_COMMERCIAL_LAWYER
      : COMMERCIAL_LAWYER;
  const contacts: Contact[] = [ACCOUNTANT, lawyer, ...OTHER_CONTACTS];
  return (
    <>
      {/* CTAs */}
      <div className='mb-10 grid gap-4 sm:grid-cols-2'>
        <div className='flex flex-col border border-border bg-card p-6 shadow-xs'>
          <div className='flex items-center gap-3'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent'>
              <ClipboardCheck className='h-5 w-5' />
            </span>
            <p className='text-lg font-semibold text-secondary'>
              Get an Appraisal
            </p>
          </div>
          <p className='mt-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
            Curious what your business is worth? Request a confidential,
            no-obligation appraisal.
          </p>
          <AppraisalDialog>
            <Button
              size='lg'
              className='mt-4 self-start rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
            >
              Get an Appraisal
            </Button>
          </AppraisalDialog>
        </div>

        <div className='flex flex-col rounded-2xl border border-accent/30 bg-accent/8 p-6'>
          <div className='flex items-center gap-3'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent'>
              <Compass className='h-5 w-5' />
            </span>
            <p className='text-lg font-semibold text-secondary'>
              Can&apos;t find the right business?
            </p>
          </div>
          <p className='mt-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
            <span className='font-semibold text-secondary'>
              Get Represented
            </span>{' '}
            with our Business Buyers Advocacy service.
          </p>
          <Button
            asChild
            size='lg'
            variant='outline'
            className='mt-4 self-start'
          >
            <a
              href={BUY_A_BUSINESS_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              Learn more <ArrowUpRight className='h-4 w-4' />
            </a>
          </Button>
        </div>
      </div>

      {/* Key contacts */}
      <SectionHeading
        title={title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder='Key Contacts'
      />
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
        {contacts.map((c) => (
          <div
            key={c.role}
            className='border border-border bg-card p-5 shadow-xs'
          >
            <div className='flex items-start gap-3'>
              <div className='flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/15 ring-2 ring-accent/20'>
                {c.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.image}
                    alt={c.role}
                    loading='lazy'
                    decoding='async'
                    className={
                      c.imageFit === 'contain'
                        ? 'h-full w-full bg-white object-contain p-1'
                        : 'h-full w-full object-cover'
                    }
                  />
                ) : (
                  <User className='h-5 w-5 text-accent' />
                )}
              </div>
              <div className='min-w-0'>
                <p className='text-xs font-semibold uppercase tracking-wide text-accent'>
                  {c.role}
                </p>
                <p className='text-sm font-semibold leading-snug text-secondary'>
                  {c.name}
                </p>
              </div>
            </div>
            <div className='mt-3 space-y-0.5 text-xs text-muted-foreground'>
              {c.company && <p>{c.company}</p>}
              <p>{c.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accreditations */}
      <div className='mt-6 grid gap-4 sm:grid-cols-2'>
        <div className='flex items-center justify-center border border-border bg-card p-10 shadow-xs'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/aibb.png'
            alt='AIBB'
            loading='lazy'
            decoding='async'
            className='max-h-20 w-auto object-contain'
          />
        </div>
        <div className='flex items-center justify-center border border-border bg-card p-10 shadow-xs'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/reiv.png'
            alt='REIV'
            loading='lazy'
            decoding='async'
            className='max-h-20 w-auto object-contain'
          />
        </div>
      </div>
    </>
  );
}
