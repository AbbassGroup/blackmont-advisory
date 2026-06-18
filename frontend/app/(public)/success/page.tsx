import { Check } from 'lucide-react';

export default function SuccessPage() {
  return (
    <section className='relative min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50 overflow-hidden'>
      <div className='absolute -top-20 -left-20 h-64 w-64 rounded-full bg-brand-primary/15 blur-3xl' />
      <div className='absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl' />

      <div className='relative w-full max-w-3xl'>
        <div className='rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm  p-8 md:p-12 text-center'>
          <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white shadow'>
            <Check />
          </div>

          <h1 className='text-3xl md:text-4xl font-bold text-slate-900 mb-5 tracking-tight'>
            Thank You! We&apos;ve received your details.
          </h1>
          <p className='text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto'>
            Thank you for choosing Blackmont Advisory. A broker will be in touch
            shortly to discuss your business goals
          </p>
        </div>
      </div>
    </section>
  );
}
