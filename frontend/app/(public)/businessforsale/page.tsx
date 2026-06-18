import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const BusinessForSalePage = () => {
  return (
    <>
      <style>{`
        @keyframes bfs-fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#f0fdf4_0%,#f8f9fa_40%,#ecfdf5_100%)] p-4 font-['Poppins',sans-serif]">
        <div className='relative z-10 mt-[100px] flex w-full max-w-[600px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] animate-[bfs-fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both]'>
          {/* Hero image */}
          <div className="relative flex-none w-full max-h-[48vh] overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[50px] after:bg-linear-to-t after:from-white after:to-transparent after:content-['']">
            <Image
              src='/businessbrokers/abbass.jpeg'
              width={600}
              height={400}
              alt='Business opportunity'
              className='h-full w-full object-cover object-bottom'
            />
          </div>

          {/* Content */}
          <div className='shrink-0 px-6 pt-4 text-center'>
            <p className='mb-1 text-[1.1rem] font-normal text-gray-500'>
              Hello
            </p>
            <h1 className='mb-2 text-[1.65rem] font-bold leading-[1.3] text-brand-black'>
              This business is{' '}
              <span className='text-brand-primary'>for sale.</span>
            </h1>
            <p className='mb-4 text-base font-normal leading-relaxed text-gray-500'>
              Please contact Sadeq for a confidential conversation.
            </p>
          </div>

          <div className='mx-6 mb-3 h-px shrink-0 bg-[linear-gradient(90deg,transparent,#e5e7eb,transparent)]' />

          {/* Contact info */}
          <div className='shrink-0 px-6 text-center'>
            <h2 className='mb-[2px] text-[1.3rem] font-semibold text-brand-black'>
              Sadeq Abbass
            </h2>
            <p className='mb-4 text-[0.8rem] font-medium tracking-[0.06em] text-gray-400'>
              Managing Director &bull; Blackmont Advisory
            </p>
          </div>

          {/* CTA buttons */}
          <div className='flex shrink-0 flex-col gap-[10px] px-6 pb-5 sm:flex-row'>
            <a
              href='tel:0433525731'
              className='flex flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-primary px-4 py-3 text-[0.9rem] font-semibold text-white shadow-[0_3px_12px_rgba(86,193,188,0.3)] transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-brand-primary/80 hover:shadow-[0_5px_18px_rgba(86,193,188,0.4)]'
            >
              <Phone className='h-5 w-5' />
              0433 525 731
            </a>

            <a
              href='mailto:sadeq@abbass.group'
              className='flex flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border-[1.5px] border-gray-200 bg-transparent px-4 py-3 text-[0.9rem] font-semibold text-brand-black transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-brand-primary hover:text-brand-primary'
            >
              <Mail className='h-5 w-5' />
              sadeq@abbass.group
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessForSalePage;
