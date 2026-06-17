import Link from 'next/link';
import {
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  Wrench,
} from 'lucide-react';

const categories = [
  { icon: ShoppingBag, title: 'Retail', href: '/listings?category=Retail' },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    href: `/listings?category=${encodeURIComponent("Cafe's, Restaurants & Takeaway")}`,
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    href: '/listings?category=Healthcare',
  },
  { icon: Wrench, title: 'Trade', href: '/listings?category=Trade' },
];

export function BusinessCategories() {
  return (
    <section className='py-16 bg-[#f0f2f5]'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        {/* Heading */}
        <div className='text-center mb-10'>
          <h2 className='text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-brand-black leading-tight'>
            What Are You <span className='text-brand-primary'>Looking For</span>
          </h2>
          <p className='text-brand-text-secondary text-[1rem] mt-3'>
            Explore our diverse range of business opportunities
          </p>
        </div>

        {/* 4 Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
          {categories.map(({ icon: Icon, title, href }) => (
            <Link
              key={title}
              href={href}
              className='flex flex-col items-center gap-3 py-10 px-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 text-center no-underline'
            >
              <Icon
                className='w-14 h-14 text-brand-primary'
                strokeWidth={1.5}
              />
              <span className='text-brand-black font-bold text-[1.05rem]'>
                {title}
              </span>
              <span className='text-brand-text-secondary text-[0.85rem]'>
                Available Listings
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
