import {
  SectionShell,
  bodyText,
  cardTitle,
} from '@/components/landing/tabbed-page/section-shell';

const BUYERS = [
  {
    title: 'First-time business buyers',
    text: 'People buying their first business who want an experienced advisor beside them from search to handover.',
  },
  {
    title: 'Operators expanding through acquisition',
    text: 'Business owners buying a competitor or a complementary business to grow, add capability or enter a new area.',
  },
  {
    title: 'Professionals seeking a lifestyle business',
    text: 'Corporate professionals looking to buy a business that suits the way they want to live and work.',
  },
  {
    title: 'Investors and migration buyers',
    text: 'Investment-focused buyers, including those buying a business as part of a migration pathway.',
  },
  {
    title: 'Private equity and high-net-worth clients',
    text: 'Sophisticated investors looking for strategic, often off-market, acquisitions.',
  },
];

export function WhoWeHelp() {
  return (
    <SectionShell
      id='who-we-help'
      heading='Who we help buy a business'
      // intro='Whatever your background, we shape the search around your goals, your budget and how much risk you are comfortable with.'
    >
      <ul className='m-0 grid list-none gap-px border border-advisory-rule bg-advisory-rule p-0 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3'>
        {BUYERS.map(({ title, text }) => (
          <li key={title} className='bg-white p-6 min-[681px]:p-8'>
            <h3 className={cardTitle}>{title}</h3>
            <p className={bodyText}>{text}</p>
          </li>
        ))}
        <li className='flex flex-col justify-center bg-midnight p-6 text-white min-[681px]:p-8'>
          <p className='m-0 mb-2 font-advisory-heading text-xl leading-[1.35] font-bold'>
            Looking to buy a business?
          </p>
          <p className='m-0 text-[15px] leading-[1.7] text-white/80'>
            Tell us what you are after and we will tell you honestly whether we
            can help.{' '}
            <a href='#enquire' className='font-bold text-gilt underline underline-offset-4 hover:text-white'>
              Get in touch
            </a>
          </p>
        </li>
      </ul>
    </SectionShell>
  );
}
