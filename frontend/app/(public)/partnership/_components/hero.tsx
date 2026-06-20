import { PageBanner } from '@/components/global/page-banner';

export function PartnershipHero() {
  return (
    <PageBanner
      title={
        <>
          Partnering with{' '}
          <span className='font-light text-accent'>Blackmont</span>
        </>
      }
      image='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'
    />
  );
}
