import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface Listing {
  _id: string;
  title: string;
  price: string;
  about: string;
  image: string;
  featured: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(`${API_BASE}/api/listings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return [];
  }
}

function getImageUrl(img: string) {
  if (!img)
    return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80';
  return img.startsWith('/uploads') ? `${API_BASE}${img}` : img;
}

function formatPrice(price: string) {
  if (!price) return 'Contact for price';
  return price.startsWith('$') ? price : `$${price}`;
}

export async function FeaturedListings() {
  const data = await getListings();
  const listings = data.filter((l) => l?.featured).slice(0, 4);

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        {/* Heading */}
        <div className='text-center mb-14'>
          <h2 className='text-[clamp(1.8rem,4vw,2.75rem)] font-bold text-brand-black leading-tight mb-4'>
            Featured Business Opportunities
          </h2>
          <p className='text-brand-text-secondary text-[1.05rem] max-w-[650px] mx-auto'>
            Discover our handpicked selection of premium businesses for sale
          </p>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto mt-5' />
        </div>

        {/* Grid */}
        {listings.length === 0 ? (
          <p className='text-center text-brand-text-secondary'>
            No featured listings available at the moment.
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {listings.map((l) => (
              <div
                key={l._id}
                className='group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col'
              >
                {/* Image */}
                <div className='relative h-48 overflow-hidden'>
                  <Image
                    src={getImageUrl(l.image)}
                    alt={l.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <Badge className='absolute top-3 left-3 bg-brand-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full'>
                    Featured
                  </Badge>
                </div>

                {/* Content */}
                <div className='p-5 flex flex-col flex-1'>
                  <h3 className='text-brand-black font-semibold text-[1rem] leading-snug mb-2 line-clamp-2 h-12'>
                    {l.title}
                  </h3>
                  <p className='text-brand-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1'>
                    {l.about?.replace(/<[^>]+>/g, '').slice(0, 120) ||
                      'No description available.'}
                  </p>
                  <div className='mt-auto'>
                    {/* <p className='text-brand-primary font-bold text-[1.2rem] mb-3'>
                      {formatPrice(l.price)}
                    </p> */}
                    <Link
                      href={`/listings/${l._id}`}
                      className='block w-full text-center py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors text-sm'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View all CTA */}
        {listings.length > 0 && (
          <div className='text-center mt-10'>
            <Link
              href='/listings'
              className='inline-block px-8 py-3.5 border-2 border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-colors'
            >
              View All Listings →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
