import Image from 'next/image';
import {
  BarChart3,
  Handshake,
  Search,
  DollarSign,
  Building2,
  Headphones,
  type LucideIcon,
} from 'lucide-react';
import { Container, Reveal } from '@/components/landing/primitives';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  details: string[];
};

export const SERVICES: Service[] = [
  {
    title: 'Business Appraisals',
    description:
      'Get an accurate assessment of your business worth with our comprehensive valuation services. We use industry-standard methods to determine the true market value.',
    icon: BarChart3,
    image: '/services.webp',
    details: [
      'Financial Analysis & Reporting',
      'Market Comparison Analysis',
      'Asset-Based Valuation',
      'Future Earnings Projection',
      'Industry Multiplier Assessment',
    ],
  },
  {
    title: 'Selling Small Businesses',
    description:
      'We handle the entire process of selling your business, from marketing to negotiations and closing. Our expertise ensures you get the best possible price.',
    icon: Handshake,
    image: '/business_sales.webp',
    details: [
      'Confidential Marketing',
      'Buyer Screening',
      'Negotiation Support',
      'Due Diligence Assistance',
      'Transaction Closing Services',
    ],
  },
  {
    title: 'Business Buyer Advisory',
    description:
      'We represent the Buyer in sourcing, analysing and negotiating the purchase of a business.',
    icon: Search,
    image: '/mergers.webp',
    details: [
      'Business Search & Matching',
      'Market Analysis',
      'Due Diligence Support',
      'Negotiation Assistance',
      'Transition Planning',
    ],
  },
  {
    title: 'Business Advisory',
    description:
      'Get advice around the structure and operations of your business to improve efficiency and the overall value of your business.',
    icon: DollarSign,
    image: '/business_advisory.webp',
    details: [
      'Tax Planning',
      'Financial Structuring',
      'Risk Assessment',
      'Growth Strategy',
      'Exit Planning',
    ],
  },
  {
    title: 'Business Exit Strategy',
    description:
      'We work close to prepare your Business exit strategy to get the best ultimate outcome for your business.',
    icon: Building2,
    image: '/exit_strategy.webp',
    details: [
      'Confidential Representation',
      'Market Analysis',
      'Buyer-Seller Matching',
      'Transaction Management',
      'Post-Sale Support',
    ],
  },
  {
    title: 'Business Consulting Services',
    description:
      'General Business Consulting Services for your every day business operations and needs.',
    icon: Headphones,
    image: '/business_consulting.webp',
    details: [
      'Operational Assessment',
      'Growth Strategy',
      'Market Analysis',
      'Business Planning',
      'Performance Optimization',
    ],
  },
];

export function ServicesGrid() {
  return (
    <section className='bg-background py-20 lg:py-28'>
      <Container>
        <Reveal className='mb-14'>
          <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
            What We Offer
          </h2>
        </Reveal>

        <Reveal className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {SERVICES.map(({ title, description, icon: Icon, image }) => (
            <article
              key={title}
              className='group flex flex-col overflow-hidden border border-secondary/10 bg-background transition-colors hover:border-accent/40'
            >
              <div className='relative h-52 overflow-hidden'>
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-secondary/45' />
                <span className='absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center bg-accent text-primary'>
                  <Icon className='h-6 w-6' strokeWidth={1.75} />
                </span>
              </div>
              <div className='flex flex-1 flex-col p-7'>
                <h3 className='mb-3 text-lg font-bold tracking-tight text-secondary'>
                  {title}
                </h3>
                <p className='text-base leading-relaxed text-muted-foreground'>
                  {description}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
