import {
  Lightbulb,
  Search,
  BarChart,
  Handshake,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import Title from '@/components/global/title';

const buyingProcess = [
  {
    step: '1',
    title: 'Independent Advice',
    description:
      'We define what you want to buy, your budget, risk tolerance, and return goals.',
    icon: <Lightbulb className='w-7 h-7' />,
  },
  {
    step: '2',
    title: 'Business Search',
    description:
      'We find and qualify potential businesses through our network, databases, and off-market connections.',
    icon: <Search className='w-7 h-7' />,
  },
  {
    step: '3',
    title: 'Analysis & Valuation',
    description:
      'We review financials, performance drivers, and growth potential.',
    icon: <BarChart className='w-7 h-7' />,
  },
  {
    step: '4',
    title: 'Negotiation & Offer',
    description:
      'We negotiate directly with the broker or owner to secure the best possible deal for you.',
    icon: <Handshake className='w-7 h-7' />,
  },
  {
    step: '5',
    title: 'Due Diligence & Settlement',
    description:
      'We coordinate with accountants and lawyers to ensure a smooth and safe acquisition.',
    icon: <ShieldCheck className='w-7 h-7' />,
  },
  {
    step: '6',
    title: 'Transition & Handover',
    description:
      'We guide the transition of everything across to you and ensure you receive an adequate handover.',
    icon: <Rocket className='w-7 h-7' />,
  },
];

export function BuyingProcess() {
  return (
    <section className='bg-white py-20 lg:py-28'>
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
        <div className='text-center mb-16'>
          <Title>Our Business Buying Process</Title>
          <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto mb-6' />
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Buying a business is complex, but we make it simple.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {buyingProcess.map((step, i) => (
            <div
              key={i}
              className='relative bg-gray-50/50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center'
            >
              <div className='w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6'>
                {step.icon}
              </div>
              <h4 className='text-lg font-bold text-brand-black mb-3'>
                {step.title}
              </h4>
              <p className='text-sm text-gray-500 leading-relaxed'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
