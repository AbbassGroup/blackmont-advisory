'use client';

const API_BASE = 'https://apibusinessbrokers.abbass.com.au';

const testimonials = [
  {
    video: 'adisha.mp4',
    author: 'Adisha',
    position: 'Business Owner',
    company: 'Successful Business Sale',
  },
  {
    video: 'jordan.mp4',
    author: 'Jordan',
    position: 'Business Owner',
    company: 'Successful Business Sale',
  },
];

export function TestimonialsSection() {
  return (
    <section className='py-20 bg-brand-offwhite'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        {/* Heading */}
        <div className='text-center mb-14'>
          <p className='text-brand-primary font-semibold text-sm uppercase tracking-widest mb-3'>
            Testimonials
          </p>
          <h2 className='text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-brand-black leading-tight mb-4'>
            What Our Clients Say
          </h2>
          <p className='text-brand-text-secondary text-[1.05rem] max-w-[520px] mx-auto'>
            Don&apos;t just take our word for it. Here&apos;s what business
            owners have to say about working with us.
          </p>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto mt-5' />
        </div>

        {/* Video Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className='bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
            >
              <video
                controls
                src={`${API_BASE}/uploads/${t.video}`}
                className='w-full aspect-video object-contain bg-black'
                preload='metadata'
              />
              <div className='p-5 flex items-center gap-4'>
                <div className='flex-1'>
                  <p className='font-semibold text-brand-black text-[1rem]'>
                    {t.author}
                  </p>
                  <p className='text-brand-text-secondary text-sm'>
                    {t.position}
                  </p>
                </div>
                <span className='text-brand-primary text-sm font-medium shrink-0'>
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
