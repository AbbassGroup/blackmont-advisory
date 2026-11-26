import type { IndustryStateSet } from './types';

/**
 * Hair and beauty salon sales by state. Benchmarks (1.5×–2.5× EBITDA,
 * $50k–$300k, 60–120 days) come from the national page; this copy covers
 * each state's market, lease rules and council registration for beauty and
 * skin penetration services. No invented deals, figures or postcodes.
 */
export const HAIR_AND_BEAUTY_SALON: IndustryStateSet = {
  victoria: {
    keyword: 'sell a hair salon victoria',
    keywords: ['sell a hair salon melbourne', 'sell a beauty salon melbourne', 'salon business broker melbourne', 'beauty salon for sale victoria'],
    title: 'Sell a Hair or Beauty Salon in Victoria | Blackmont Advisory',
    description:
      'Selling a hair or beauty salon in Victoria? See what Melbourne salons sell for, the lease and council rules, and how to keep staff and clients through a sale.',
    h1: 'Selling a Hair or Beauty Salon in Victoria',
    intro:
      'Hair and beauty salons in Victoria typically sell for 1.5× to 2.5× EBITDA, most often between $50,000 and $300,000, and take around 60 to 120 days to sell. In Melbourne, staff retention and an owner-independent client base set the price.',
    points: [
      'Melbourne advisor based in Toorak',
      'Confidential sale, buyers approved by you',
      'Staff conversations timed carefully',
      'Licensed business agent, BLA 092153L',
    ],
    imageAlt: 'Melbourne office buildings representing sell a hair or beauty salon in Victoria with Blackmont Advisory',
    marketHeading: 'The hair and beauty market in Victoria',
    market: [
      'Melbourne has a dense, competitive salon market, from inner-city hair studios in South Yarra, Richmond and Fitzroy to suburban salons, beauty clinics and day spas in shopping strips and centres across the city. Regional centres such as Geelong, Ballarat and Bendigo also have active markets.',
      'Buyers are often experienced stylists or therapists ready to own their own salon, along with existing owners adding a second site. They look for an active client base held in a booking system, a settled team and rent that leaves room for profit.',
      'Salons where the owner has stepped back from the floor sell for noticeably more, because the clients belong to the business rather than to one person.',
    ],
    transfer: {
      heading: 'Victorian lease and council rules for salons',
      body: [
        'Most salon leases in Victoria are covered by the Retail Leases Act 2003 (Vic). Assigning your lease to a buyer usually needs the landlord’s consent, which can be refused only on limited grounds. Start that conversation early, because it often sets the timeline.',
        'Businesses offering skin penetration and some beauty treatments must be registered with the local council under the Public Health and Wellbeing Act 2008 (Vic). Registration does not transfer automatically, so the buyer may need to apply. Check with your council what applies to your services.',
        'Staff are usually employed under the Hair and Beauty Industry Award, and buyers will review wages and entitlements. Product supplier and franchise agreements, if any, should be checked for transfer and consent requirements.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Melbourne salon worth?',
        a: 'Most Victorian hair and beauty salons sell for 1.5× to 2.5× EBITDA, usually between $50,000 and $300,000. Active clients, staff retention, rent and how much revenue sits with you personally decide the price.',
      },
      {
        q: 'Does my salon need council registration in Victoria?',
        a: 'It depends on your services. Skin penetration and some beauty treatments require registration with the local council under the Public Health and Wellbeing Act 2008. Check with your council, as the buyer may need to apply in their own name.',
      },
      {
        q: 'When should I tell my staff I am selling?',
        a: 'Usually once a buyer is serious and the deal is close. Telling stylists too early risks them leaving; too late can unsettle the buyer. We help plan the timing.',
      },
      {
        q: 'Can I sell my salon if most clients book with me?',
        a: 'Yes, but the price will reflect that risk. Bringing other staff into your clients’ bookings before you sell, and offering a handover period, helps protect your value.',
      },
    ],
  },

  'new-south-wales': {
    keyword: 'sell a hair salon nsw',
    keywords: ['sell a hair salon sydney', 'sell a beauty salon sydney', 'salon business broker sydney', 'beauty salon for sale nsw'],
    title: 'Sell a Hair or Beauty Salon in NSW | Blackmont Advisory',
    description:
      'Selling a hair or beauty salon in NSW? See what Sydney salons sell for, the lease and council rules that apply, and how to keep staff and clients on board.',
    h1: 'Selling a Hair or Beauty Salon in New South Wales',
    intro:
      'Hair and beauty salons in NSW typically sell for 1.5× to 2.5× EBITDA, most often between $50,000 and $300,000, and take around 60 to 120 days to sell. In Sydney, high rents make profit after rent the first thing buyers check.',
    points: [
      'Buyers from Sydney and across Australia',
      'Confidential sale, buyers approved by you',
      'Staff conversations timed carefully',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Sydney office buildings representing sell a hair or beauty salon in NSW with Blackmont Advisory',
    marketHeading: 'The hair and beauty market in NSW',
    market: [
      'Sydney’s salon market ranges from premium hair studios and beauty clinics in the Eastern Suburbs, North Shore and Inner West to busy suburban salons in Western Sydney and shopping centres. Regional centres such as Newcastle, Wollongong and the Central Coast also trade actively.',
      'Rents in Sydney can be high, so buyers focus on rent as a share of revenue as well as staff stability and active clients. Salons with strong rebooking rates and a team that will stay sell fastest.',
      'We work with NSW owners by phone and video and meet in person when the deal needs it. Your salon is presented confidentially to buyers across Australia.',
    ],
    transfer: {
      heading: 'NSW lease and council rules for salons',
      body: [
        'Most salon leases in NSW fall under the Retail Leases Act 1994 (NSW). Assigning your lease needs the landlord’s consent, following the process set out in the Act. The NSW Small Business Commissioner can help if a dispute arises.',
        'Premises offering skin penetration procedures, such as some beauty, cosmetic or tattoo services, must notify the local council under NSW public health regulations. Check with your council what applies, as the buyer may need to update the notification.',
        'Staff are usually employed under the Hair and Beauty Industry Award, and buyers will check wages and entitlements. Review any product supplier or franchise agreements for consent requirements on a sale.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Sydney salon worth?',
        a: 'Most NSW hair and beauty salons sell for 1.5× to 2.5× EBITDA, usually between $50,000 and $300,000. Active clients, staff retention, rent and owner dependence decide the price.',
      },
      {
        q: 'Do I need landlord consent to sell my salon in NSW?',
        a: 'Yes, if the buyer is taking over your lease. Under the Retail Leases Act 1994 (NSW), the landlord must follow a set process and can refuse only on limited grounds.',
      },
      {
        q: 'Does my client database add value?',
        a: 'Yes, if it is current and active. Buyers look at clients seen in the last twelve months and your rebooking rate, not the total number of records.',
      },
      {
        q: 'Do you have an office in Sydney?',
        a: 'No. Our office is in Melbourne. We work with NSW owners by phone and video, meet in person when a deal needs it, and present your salon to buyers across Australia.',
      },
    ],
  },

  queensland: {
    keyword: 'sell a hair salon queensland',
    keywords: ['sell a hair salon brisbane', 'sell a beauty salon gold coast', 'salon business broker brisbane', 'beauty salon for sale queensland'],
    title: 'Sell a Hair or Beauty Salon in QLD | Blackmont Advisory',
    description:
      'Selling a hair or beauty salon in Queensland? See what Brisbane and coastal salons sell for, the lease and council rules, and how a confidential sale works.',
    h1: 'Selling a Hair or Beauty Salon in Queensland',
    intro:
      'Hair and beauty salons in Queensland typically sell for 1.5× to 2.5× EBITDA, most often between $50,000 and $300,000, and take around 60 to 120 days to sell. On the coast, steady local clients matter as much as tourist trade.',
    points: [
      'Buyers from Queensland and interstate',
      'Confidential sale, buyers approved by you',
      'Staff conversations timed carefully',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Office buildings representing sell a hair or beauty salon in Queensland with Blackmont Advisory',
    marketHeading: 'The hair and beauty market in Queensland',
    market: [
      'Queensland’s salon market covers Brisbane’s inner suburbs and shopping centres, the Gold Coast and Sunshine Coast, and regional centres such as Toowoomba. Beauty, cosmetic and wellness services are especially popular in coastal areas.',
      'Buyers want a salon with loyal, repeat local clients rather than one that relies on holiday trade. Rebooking rates, staff retention and rent as a share of revenue are the key figures.',
      'Queensland also attracts interstate buyers wanting a lifestyle change. We work with Queensland owners by phone and video and meet in person when needed, presenting your salon confidentially to buyers across Australia.',
    ],
    transfer: {
      heading: 'Queensland lease and council rules for salons',
      body: [
        'Retail shop leases in Queensland are covered by the Retail Shop Leases Act 1994 (Qld). Assigning your lease generally needs the landlord’s consent, and the Queensland Small Business Commissioner can help with disputes.',
        'Higher-risk personal appearance services, such as skin penetration, are licensed by local councils under Queensland’s public health laws for personal appearance services. Check with your council whether your licence transfers or the buyer must apply.',
        'Staff are usually employed under the Hair and Beauty Industry Award, and buyers will review wages and entitlements. Check any supplier or franchise agreements for consent requirements on a change of ownership.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Queensland salon worth?',
        a: 'Most Queensland hair and beauty salons sell for 1.5× to 2.5× EBITDA, usually between $50,000 and $300,000. Active local clients, staff, rent and owner dependence decide the price.',
      },
      {
        q: 'Does my beauty clinic need a council licence in Queensland?',
        a: 'Some services do. Higher-risk personal appearance services such as skin penetration need a council licence. Check with your council whether it can be transferred to a buyer.',
      },
      {
        q: 'Do interstate buyers purchase salons in Queensland?',
        a: 'Yes. Queensland attracts buyers moving for lifestyle reasons. Presenting your salon to buyers across Australia widens the pool and can improve the result.',
      },
      {
        q: 'Do you have an office in Queensland?',
        a: 'No. Our office is in Melbourne. We work with Queensland owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
      },
    ],
  },

  'western-australia': {
    keyword: 'sell a hair salon perth',
    keywords: ['sell a hair salon western australia', 'sell a beauty salon perth', 'salon business broker perth', 'beauty salon for sale wa'],
    title: 'Sell a Hair or Beauty Salon in WA | Blackmont Advisory',
    description:
      'Selling a hair or beauty salon in Western Australia? See what Perth salons sell for, the WA lease and council rules, and how to keep staff through a sale.',
    h1: 'Selling a Hair or Beauty Salon in Western Australia',
    intro:
      'Hair and beauty salons in Western Australia typically sell for 1.5× to 2.5× EBITDA, most often between $50,000 and $300,000, and take around 60 to 120 days to sell. In Perth, staff retention and active clients drive buyer interest.',
    points: [
      'Buyers from WA and across Australia',
      'Confidential sale, buyers approved by you',
      'Staff conversations timed carefully',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Office buildings representing sell a hair or beauty salon in Perth WA with Blackmont Advisory',
    marketHeading: 'The hair and beauty market in Western Australia',
    market: [
      'Perth’s salon market includes hair studios and beauty clinics in suburbs such as Subiaco, Leederville, Mount Lawley and Claremont, along with salons in shopping centres across the metro area and in growing areas such as Joondalup, Rockingham and Mandurah.',
      'Skilled stylists and therapists can be hard to find in WA, so buyers look carefully at who is staying and how clients book. A settled team and a strong rebooking rate make a salon much easier to sell.',
      'We work with WA owners by phone and video and meet in person when the deal needs it. Your salon is presented confidentially to buyers across Australia.',
    ],
    transfer: {
      heading: 'WA lease and council rules for salons',
      body: [
        'Retail shop leases in WA are covered by the Commercial Tenancy (Retail Shops) Agreements Act 1985 (WA). Assigning your lease usually needs the landlord’s consent, and the Small Business Development Corporation offers advice and dispute help.',
        'Premises carrying out skin penetration procedures must be registered with the local government under WA health regulations. Check with your council what applies to your services and whether the buyer needs to register in their own name.',
        'Staff are usually employed under the Hair and Beauty Industry Award, and buyers will review wages and entitlements. Review any product supplier or franchise agreements for consent requirements.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Perth salon worth?',
        a: 'Most WA hair and beauty salons sell for 1.5× to 2.5× EBITDA, usually between $50,000 and $300,000. Active clients, staff retention, rent and owner dependence decide the price.',
      },
      {
        q: 'Do I need council registration for my beauty salon in WA?',
        a: 'If you offer skin penetration procedures, yes. These premises must be registered with the local government. Check with your council what applies and how registration passes to a buyer.',
      },
      {
        q: 'How long does it take to sell a salon in Perth?',
        a: 'Usually 60 to 120 days. Landlord consent and timing staff conversations carefully are what set the pace.',
      },
      {
        q: 'Do you have an office in Perth?',
        a: 'No. Our office is in Melbourne. We work with WA owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
      },
    ],
  },
};
