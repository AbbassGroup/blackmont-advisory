import type { Faq } from '@/components/landing/tabbed-page/faq-section';

export const PAGE_PATH = '/business-valuation';

export const FAQS: Faq[] = [
  {
    q: 'What is my business worth?',
    a: 'For most Australian small and medium businesses, the answer is normalised EBITDA multiplied by a multiple that reflects the industry, size and risk of the business. Our free calculator gives you an indicative range in a few minutes.',
    link: { href: '#calculator', label: 'Use the free calculator' },
  },
  {
    q: 'How do I calculate my business worth?',
    a: 'Work out your normalised earnings by adding back the owner’s personal and one-off expenses to EBITDA. Then multiply by a multiple for your industry and size, and adjust for risks such as owner dependency, a short lease or reliance on one customer.',
    link: { href: '#formula', label: 'See the formula step by step' },
  },
  {
    q: 'What is the business valuation formula?',
    a: 'Business value = normalised EBITDA × earnings multiple. Small businesses with under $100k in EBITDA typically sell for around 0.8× to 1.8×, while businesses earning $1M to $2.5M are more often in the 3× to 5× range.',
    link: { href: '#formula', label: 'See multiples by business size' },
  },
  {
    q: 'What is the EBIT formula?',
    a: 'EBIT = revenue − cost of goods sold − operating expenses (including depreciation and amortisation). Or, working back from the bottom line: net profit + interest + tax. Add depreciation and amortisation back to EBIT to get EBITDA.',
  },
  {
    q: 'How do you value a small business?',
    a: 'Small businesses are usually valued on earnings rather than assets. The multiple is lower than for larger businesses because more of the result depends on the owner, so making the business less reliant on you is one of the best ways to lift its value.',
    link: { href: '#value-drivers', label: 'What makes a business worth more' },
  },
  {
    q: 'How much is my café worth?',
    a: 'Cafés and restaurants in Australia typically sell for around 0.8× to 1.5× earnings, with most sales between $150k and $500k. Location, rent as a share of revenue and the strength of the lease make the biggest difference.',
    link: { href: '/selling-a/cafe-or-restaurant', label: 'Selling a café or restaurant' },
  },
  {
    q: 'How accurate is a business valuation calculator?',
    a: 'A calculator gives you a realistic starting range, not a valuation. It cannot see your customer concentration, lease, staff or the state of your records, which decide where in the range a real buyer lands. A broker’s appraisal takes those into account.',
    link: { href: '/selling-a-business#enquire', label: 'Ask for a professional appraisal' },
  },
  {
    q: 'How do I price a business to sell?',
    a: 'Price at the top of what the evidence supports, not above it. An overpriced business sits on the market and buyers start to wonder what is wrong with it, which usually ends in a lower price than a realistic asking price would have achieved.',
    link: { href: '/selling-a-business', label: 'How we sell a business' },
  },
  {
    q: 'Is my business ready to sell?',
    a: 'A business is ready to sell when buyers can verify its earnings and see that it will keep performing after you leave. Our sale readiness check shows where you stand.',
    link: { href: '/exit/sale-readiness', label: 'Take the sale readiness check' },
  },
];
