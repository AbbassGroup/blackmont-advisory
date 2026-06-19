'use client';

import { ArrowUpRight, ClipboardCheck, Compass, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '../section-chrome';
import { AppraisalDialog } from '../appraisal-dialog';

const BUY_A_BUSINESS_URL = 'https://www.blackmontadvisory.com/buy-a-business';

const CONTACTS = [
  {
    role: 'Commercial Lawyer',
    name: 'Lei Praytil',
    company: 'Petra Law',
    phone: '0423 162 481',
    image: '/petra-law.png',
  },
  {
    role: 'Business Loans',
    name: 'Nazar Asani',
    company: 'Fiducia Finance',
    phone: '0439 003 349',
    image: '/fiducia.jpg',
  },
  {
    role: 'Accountant',
    name: 'James Di Sebastiano',
    company: 'Costanzo Harris',
    phone: '0423 048 446',
    image: '/costanzo-harris.png',
  },
  {
    role: 'Business Insurance',
    name: 'Terry Lee',
    company: 'CGIS Insurance',
    phone: '0456 536 680',
    image: '/CGIS.png',
  },
];

export function KeyContactsSection({
  title,
  editable,
  onChange,
}: {
  title: string;
  editable?: boolean;
  onChange?: (patch: { title: string }) => void;
}) {
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
        {CONTACTS.map((c) => (
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
                    className='h-full w-full object-cover'
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
    </>
  );
}
