const reviews = [
  {
    name: 'HUSS KHOSRAVI',
    text: 'Abbass and his team are highly professional and knowledgeable. He genuinely care about his clients. He provides clear, honest advice and goes the extra mile to help people achieve their property and business goals. His expertise, integrity and dedication make him a trusted advisor in the industry. Highly recommended!',
    rating: 5,
  },
  {
    name: 'NIK TRIBHUVAN',
    text: 'Sadeq and his team are incredible. They are quite knowledgeable and diligent. Their service is incredible. All my communication were promptly responded to. All my questions and queries were satisfactorily addressed. Made the entire process smooth and assuring. Great team to have by your corner regardless what your needs are. Highly recommend Sadeq and his team.',
    rating: 5,
  },
  {
    name: 'KIRAN DHAWAN',
    text: 'I wanted to express my gratitude to Asif for his exceptional assistance. He worked diligently to provide me with all the necessary information, answering my questions thoroughly and professionally. His dedication and expertise were truly impressive. Thank you, Asif, for your outstanding support!',
    rating: 5,
  },
  {
    name: 'DAN LAKI',
    text: 'My experience with Abbass Group was exceptional. As someone new to the process of purchasing a business, Sadeq made everything smooth and seamless. He was informative, responsive, and took the time to answer all of my questions in detail. I would definitely work with them again.',
    rating: 5,
  },
  {
    name: 'AGUST RYAN',
    text: 'I had a great experience with the Abbass Group. The team was outstanding! very professional, friendly, and welcoming from the start. They were always willing to help, offering clear advice and support whenever I needed it. I was impressed by how knowledgeable and approachable everyone was, making it easy to learn and feel comfortable. Abbass Group has a fantastic team that truly stands out for their dedication and teamwork. I highly recommend them!',
    rating: 5,
  },
  {
    name: 'ADISHA FERNANDO',
    text: 'Abbass Brokers was instrumental in helping us find the perfect buyer. Their market knowledge and negotiation skills are on another level. Highly Recommended..!!',
    rating: 5,
  },
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-xl ${index < rating ? 'text-[#FFD700]' : 'text-gray-300'} mx-0.5`}
    >
      ★
    </span>
  ));
};

export function MediaReviews() {
  return (
    <div className='mt-16 mb-12 bg-transparent'>
      <div className='mb-8 pb-4 border-b border-gray-200'>
        <h2 className='text-2xl font-bold text-brand-black'>Media & Reviews</h2>
      </div>

      <div className='mb-20'>
        {/* Videos and Logos Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
          <div className='text-center flex flex-col items-center justify-start'>
            <h3 className='text-xl font-bold text-brand-primary mb-8 leading-snug'>
              Seek Business
              <br />
              Media Release
            </h3>
            <div className='relative bg-gray-100 rounded-xl overflow-hidden aspect-video w-full shadow-sm'>
              <iframe
                src='https://www.youtube.com/embed/gEGLob3o4WA?si=XepVgCkic6GBoYWv'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className='absolute top-0 left-0 w-full h-full border-0'
              />
            </div>
          </div>

          <div className='text-center flex flex-col items-center justify-start'>
            <h3 className='text-xl font-bold text-brand-primary mb-8 leading-snug'>
              Top 5 Business
              <br />
              Brokerage (Melbourne)
            </h3>
            <div
              className='cursor-pointer w-full flex justify-center items-center py-4 hover:opacity-90 transition-opacity'
              onClick={() =>
                window.open(
                  'https://www.thebestmelbourne.com/best-business-brokers-melbourne/',
                  '_blank',
                )
              }
            >
              <img
                src='/businessbrokers/tbm.webp'
                alt='Top Best Melbourne'
                className='max-w-[200px] h-[200px] object-contain'
              />
            </div>
          </div>
        </div>

        {/* Client Testimonials Pitch */}
        <div className='text-center mb-10'>
          <h3 className='text-2xl font-bold text-brand-primary'>
            Hear From Our Clients
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          <div className='relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
            <div className='pt-[177.78%] relative w-full'>
              <iframe
                src='https://player.vimeo.com/video/1093724146?h=835db114fb&badge=0&autopause=0&player_id=0&app_id=58479'
                allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
                className='absolute top-0 left-0 w-full h-full border-0 rounded-xl bg-gray-100'
                title='Business Brokers Client Testimonial 1'
              />
            </div>
          </div>

          <div className='relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
            <div className='pt-[177.78%] relative w-full'>
              <iframe
                src='https://player.vimeo.com/video/1093724240?h=0a52261870&badge=0&autopause=0&player_id=0&app_id=58479'
                allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
                className='absolute top-0 left-0 w-full h-full border-0 rounded-xl bg-gray-100'
                title='Business Brokers Client Testimonial'
              />
            </div>
          </div>
        </div>

        {/* Association Badges */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <div className='bg-[#333] text-white p-6 rounded-xl flex flex-col justify-center items-start shadow-sm h-full'>
            <h4 className='font-bold text-lg mb-2'>ABBASS Group</h4>
            <div className='flex items-center mb-2'>
              <span className='mr-2 font-semibold'>5.0</span>
              <div className='flex'>{renderStars(5)}</div>
            </div>
            <p className='text-sm text-gray-300'>
              Business Broker in South Melbourne, Victoria
            </p>
          </div>

          <div className='bg-white border text-center border-gray-100 rounded-xl p-6 flex items-center justify-center shadow-sm h-full'>
            <img
              src='/businessbrokers/aibb.png'
              alt='AIBB Logo'
              className='max-w-full max-h-[80px] object-contain'
            />
          </div>

          <div className='bg-white border text-center border-gray-100 rounded-xl p-6 flex items-center justify-center shadow-sm h-full'>
            <img
              src='/businessbrokers/reiv.png'
              alt='REIV Logo'
              className='max-w-full max-h-[80px] object-contain'
            />
          </div>
        </div>
      </div>

      <div className='mb-10'>
        <h3 className='text-2xl font-bold text-brand-primary mb-8 text-center'>
          Reviews
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {reviews.map((review, index) => (
            <div
              key={index}
              className='bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 flex flex-col h-full hover:shadow-md transition-shadow'
            >
              <p className='text-gray-800 text-[15px] leading-relaxed mb-6 italic flex-1'>
                {review.text}
              </p>

              <div className='flex justify-center mb-4'>
                {renderStars(review.rating)}
              </div>

              <p className='font-bold text-center text-gray-600 text-sm tracking-wide uppercase'>
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
