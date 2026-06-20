import {
  User,
  TrendingUp,
  Briefcase,
  Users,
  Building,
  BarChart,
} from 'lucide-react';

const clientTypes = [
  {
    title: 'First-time business buyers',
    description:
      'New entrepreneurs looking to enter the business world with confidence',
    icon: <User className='w-7 h-7' />,
  },
  {
    title: 'Experienced operators expanding portfolios',
    description:
      'Seasoned business owners seeking to grow their investment portfolio',
    icon: <TrendingUp className='w-7 h-7' />,
  },
  {
    title: 'Corporate professionals seeking lifestyle businesses',
    description:
      'Professionals transitioning to business ownership for lifestyle change',
    icon: <Briefcase className='w-7 h-7' />,
  },
  {
    title: 'Investors and migration buyers',
    description:
      'Investment-focused buyers and those seeking migration pathways',
    icon: <Users className='w-7 h-7' />,
  },
  {
    title: 'Private equity & high-net-worth clients',
    description:
      'Sophisticated investors looking for strategic business acquisitions',
    icon: <Building className='w-7 h-7' />,
  },
  {
    title: 'Expansion Operators',
    description:
      'Business owners looking to rollup or expand their existing operations',
    icon: <BarChart className='w-7 h-7' />,
  },
];

export function WhoWeWorkWith() {
  return (
    <section className='bg-muted py-20 lg:py-28 relative overflow-hidden'>
      <div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,rgba(201,168,76,0.03)_0%,transparent_50%)] pointer-events-none' />
      <div className='max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            Who We Work With
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {clientTypes.map((client, i) => (
            <div
              key={i}
              className='bg-background  p-8 border border-secondary/10 transition-colors hover:border-accent/40 flex flex-col items-center text-center'
            >
              <div className='w-16 h-16 border-[1.5px] border-accent/30 text-accent flex items-center justify-center mb-6'>
                {client.icon}
              </div>
              <h4 className='text-lg font-bold text-secondary mb-3'>
                {client.title}
              </h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {client.description}
              </p>
            </div>
          ))}
        </div>

        <div className='text-center max-w-2xl mx-auto'>
          <p className='text-lg text-secondary font-medium leading-relaxed'>
            No matter your background, we tailor our approach to your goals,
            budget, and risk profile.
          </p>
        </div>
      </div>
    </section>
  );
}
