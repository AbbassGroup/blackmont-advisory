import type { IndustryStateSet } from './types';

/**
 * Café and restaurant sales by state. Benchmarks (0.8×–1.5× EBITDA,
 * $150k–$500k, 90–150 days) come from the national page; this copy covers
 * each state's market and its lease, food and liquor rules.
 * No invented deals, figures or postcodes.
 */
export const CAFE_OR_RESTAURANT: IndustryStateSet = {
  victoria: {
    keyword: 'sell a cafe victoria',
    keywords: ['sell a cafe melbourne', 'sell a restaurant melbourne', 'cafe business broker melbourne', 'restaurant for sale victoria'],
    title: 'Sell a Café or Restaurant in Victoria | Blackmont Advisory',
    description:
      'Selling a café or restaurant in Victoria? See what Melbourne venues sell for, the lease, food and liquor rules, and how to sell confidentially. Talk to us.',
    h1: 'Selling a Café or Restaurant in Victoria',
    intro:
      'Cafés and restaurants in Victoria typically sell for 0.8× to 1.5× EBITDA, most often between $150,000 and $500,000, and take around 90 to 150 days to sell. In Melbourne, more than anywhere, the lease and the location decide the price.',
    points: [
      'Melbourne advisor based in Toorak',
      'Confidential sale, buyers approved by you',
      'Lease and landlord consent managed early',
      'Licensed business agent, BLA 092153L',
    ],
    imageAlt: 'Melbourne office buildings representing sell a cafe or restaurant in Victoria with Blackmont Advisory',
    marketHeading: 'The café and restaurant market in Victoria',
    market: [
      'Melbourne has one of the most competitive hospitality markets in Australia. Buyers know the difference between a laneway café that trades on office workers, a suburban strip café that trades on local families, and a destination restaurant that relies on reputation, and they price each one differently.',
      'Demand is strongest for venues with steady weekday trade, rent under 10% of revenue and a secure lease in a proven strip, such as the CBD, Chapel Street, Fitzroy, Richmond or the bayside and eastern suburbs. Regional centres like Geelong, Ballarat and Bendigo also attract buyers looking for lower rents and a change of lifestyle.',
      'Most Victorian buyers are owner-operators, often first-time buyers using a mix of savings and finance, along with small hospitality groups adding another site. Both groups want clean POS records, a stable team and a kitchen that does not depend on one person.',
    ],
    transfer: {
      heading: 'Victorian lease, food and liquor rules',
      body: [
        'Most retail and hospitality leases in Victoria are covered by the Retail Leases Act 2003 (Vic). Assigning the lease to your buyer usually needs the landlord’s consent, and the Act limits the grounds on which a landlord can refuse. Disputes go first to the Victorian Small Business Commission, but the practical answer is to speak with your landlord early.',
        'Food premises in Victoria are registered with the local council under the Food Act 1984 (Vic). Registration does not pass automatically to a new owner, so the buyer will need to register or transfer it with the council, which may inspect the premises first.',
        'If you hold a liquor licence, it is transferred through Liquor Control Victoria, and the buyer must be approved before they can trade. Start that application well before settlement, and make the sale contract conditional on approval.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Melbourne café worth?',
        a: 'Most Victorian cafés sell for 0.8× to 1.5× EBITDA, usually between $150,000 and $500,000. Where you land depends on profit, rent as a share of revenue and the lease term left. We start with a confidential appraisal based on your POS and accounts.',
      },
      {
        q: 'Can my landlord stop me selling my café in Victoria?',
        a: 'A landlord can refuse consent to assign the lease only on reasonable grounds under the Retail Leases Act 2003 (Vic), such as the buyer’s financial standing or experience. In practice, an early conversation and a well-prepared buyer avoid most problems.',
      },
      {
        q: 'How long does it take to sell a café in Victoria?',
        a: 'Usually 90 to 150 days. The landlord’s consent, council food registration and any liquor licence transfer through Liquor Control Victoria are what take time, so start them as early as possible.',
      },
      {
        q: 'Can I sell my restaurant without my staff knowing?',
        a: 'Yes. We market the venue without its name or address, every buyer signs a confidentiality agreement, and staff are usually told once a buyer is under contract.',
      },
    ],
  },

  'new-south-wales': {
    keyword: 'sell a cafe nsw',
    keywords: ['sell a cafe sydney', 'sell a restaurant sydney', 'cafe business broker sydney', 'restaurant for sale nsw'],
    title: 'Sell a Café or Restaurant in NSW | Blackmont Advisory',
    description:
      'Selling a café or restaurant in NSW? See what Sydney venues sell for, the lease, food and liquor rules buyers check, and how a confidential sale works.',
    h1: 'Selling a Café or Restaurant in New South Wales',
    intro:
      'Cafés and restaurants in NSW typically sell for 0.8× to 1.5× EBITDA, most often between $150,000 and $500,000, and take around 90 to 150 days to sell. In Sydney, high rents make the lease and rent-to-revenue ratio the first thing buyers test.',
    points: [
      'Buyers from Sydney and across Australia',
      'Confidential sale, buyers approved by you',
      'Lease and liquor transfer planned early',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Sydney office buildings representing sell a cafe or restaurant in NSW with Blackmont Advisory',
    marketHeading: 'The café and restaurant market in NSW',
    market: [
      'Sydney’s hospitality market is large and varied, from CBD and North Sydney venues that live on weekday office trade to beachside cafés in the Eastern Suburbs and Northern Beaches and neighbourhood restaurants in the Inner West. Each attracts a different buyer and a different price.',
      'Rents in Sydney are among the highest in the country, so buyers look closely at rent as a share of revenue. Venues with rent under 10%, secure tenure and consistent trading across the week sell fastest. Regional centres such as Newcastle, Wollongong and the Central Coast offer buyers lower rents and steady local trade.',
      'We work with NSW owners by phone and video and meet in person when the deal needs it. Your venue is presented to buyers across Australia, not just those searching locally, under a confidentiality agreement.',
    ],
    transfer: {
      heading: 'NSW lease, food and liquor rules',
      body: [
        'Most retail and hospitality leases in NSW fall under the Retail Leases Act 1994 (NSW). Assigning your lease needs the landlord’s consent, and the Act sets out a process and the limited grounds on which consent can be refused. The NSW Small Business Commissioner offers mediation if there is a dispute.',
        'Food businesses in NSW must notify the NSW Food Authority and are inspected by the local council. A new owner needs to update the notification in their own name, and buyers will ask to see your inspection history.',
        'Liquor licences are administered by Liquor & Gaming NSW. A licence transfer must be approved before the buyer can trade, and the buyer may need to meet training and approval requirements, so build that time into the sale contract.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Sydney café worth?',
        a: 'Most NSW cafés sell for 0.8× to 1.5× EBITDA, usually between $150,000 and $500,000. High Sydney rents mean profit after rent matters more than takings. We start with a confidential appraisal based on your figures.',
      },
      {
        q: 'Do I need my landlord’s consent to sell my café in NSW?',
        a: 'Yes, if the buyer is taking over your lease. Under the Retail Leases Act 1994 (NSW) the landlord must follow a set process and can refuse only on limited grounds. Raising it early avoids delays.',
      },
      {
        q: 'How long does a liquor licence transfer take in NSW?',
        a: 'It varies, but it must be approved by Liquor & Gaming NSW before the buyer can trade. Lodge the application early and make the contract conditional on approval.',
      },
      {
        q: 'Do you have an office in Sydney?',
        a: 'No. Our office is in Melbourne. We work with NSW owners by phone and video, meet in person when a deal needs it, and present your venue to buyers across Australia.',
      },
    ],
  },

  queensland: {
    keyword: 'sell a cafe queensland',
    keywords: ['sell a cafe brisbane', 'sell a restaurant gold coast', 'cafe business broker brisbane', 'restaurant for sale queensland'],
    title: 'Sell a Café or Restaurant in Queensland | Blackmont Advisory',
    description:
      'Selling a café or restaurant in Queensland? See what Brisbane and coastal venues sell for, the lease, food and liquor rules, and how a private sale works.',
    h1: 'Selling a Café or Restaurant in Queensland',
    intro:
      'Cafés and restaurants in Queensland typically sell for 0.8× to 1.5× EBITDA, most often between $150,000 and $500,000, and take around 90 to 150 days to sell. On the coast, buyers also look hard at how seasonal the trade is.',
    points: [
      'Buyers from Queensland and interstate',
      'Confidential sale, buyers approved by you',
      'Seasonal trade presented clearly',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Office buildings representing sell a cafe or restaurant in Queensland with Blackmont Advisory',
    marketHeading: 'The café and restaurant market in Queensland',
    market: [
      'Queensland’s hospitality market splits into two kinds of venue. In Brisbane, cafés and restaurants in areas such as the CBD, Fortitude Valley, South Brisbane and West End trade on office workers and residents. On the Gold Coast and Sunshine Coast, many venues also depend on tourists and holiday seasons.',
      'Buyers value consistent, year-round takings, so coastal venues that can show steady local trade outside school holidays sell more easily. Rent as a share of revenue and the lease term remain the first checks, just as in other states.',
      'Queensland also attracts interstate buyers looking for a lifestyle change. We work with Queensland owners by phone and video, meet in person when needed, and present your venue to buyers across Australia under a confidentiality agreement.',
    ],
    transfer: {
      heading: 'Queensland lease, food and liquor rules',
      body: [
        'Retail shop leases in Queensland are covered by the Retail Shop Leases Act 1994 (Qld). Assigning your lease to a buyer generally needs the landlord’s consent, and the Act sets out the process. The Queensland Small Business Commissioner can help if a dispute arises.',
        'Food businesses in Queensland are licensed by the local council under the Food Act 2006 (Qld). Check with your council whether the licence can be transferred or the buyer must apply for a new one, and allow time for an inspection.',
        'Liquor licences are regulated by the Office of Liquor and Gaming Regulation. The buyer must be approved before the licence can be transferred, so lodge the application early and make the sale conditional on it.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Queensland café worth?',
        a: 'Most Queensland cafés sell for 0.8× to 1.5× EBITDA, usually between $150,000 and $500,000. Year-round profit, rent and the lease term matter most. We start with a confidential appraisal based on your figures.',
      },
      {
        q: 'Does seasonal trade lower the price of a coastal café?',
        a: 'It can. Buyers price on reliable annual profit, so a venue that is busy only in holidays is seen as riskier. Showing twelve months of POS data, including quieter months, helps buyers value it fairly.',
      },
      {
        q: 'Can a Queensland food licence be transferred to a buyer?',
        a: 'It depends on the council. Some licences can be transferred and others require the buyer to apply in their own name. Check with your council early so it does not delay settlement.',
      },
      {
        q: 'Do you have an office in Queensland?',
        a: 'No. Our office is in Melbourne. We work with Queensland owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
      },
    ],
  },

  'western-australia': {
    keyword: 'sell a cafe perth',
    keywords: ['sell a cafe western australia', 'sell a restaurant perth', 'cafe business broker perth', 'restaurant for sale wa'],
    title: 'Sell a Café or Restaurant in Perth, WA | Blackmont Advisory',
    description:
      'Selling a café or restaurant in Western Australia? See what Perth venues sell for, the WA lease, food and liquor rules, and how a confidential sale works.',
    h1: 'Selling a Café or Restaurant in Western Australia',
    intro:
      'Cafés and restaurants in Western Australia typically sell for 0.8× to 1.5× EBITDA, most often between $150,000 and $500,000, and take around 90 to 150 days to sell. In Perth, buyers focus on rent, lease security and steady weekday trade.',
    points: [
      'Buyers from WA and across Australia',
      'Confidential sale, buyers approved by you',
      'Lease and liquor transfer planned early',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Office buildings representing sell a cafe or restaurant in Perth WA with Blackmont Advisory',
    marketHeading: 'The café and restaurant market in Western Australia',
    market: [
      'Perth’s hospitality market is centred on the CBD, Northbridge, Leederville, Subiaco and Fremantle, with strong suburban strips and shopping centres across the metro area. City venues depend on office workers, while suburban and coastal cafés trade on residents and weekend visitors.',
      'WA’s economy is closely tied to mining and resources, and buyers sometimes include people returning from fly-in fly-out work looking for a business of their own. They want clean records, a stable team and a venue that does not depend on the current owner being in the kitchen.',
      'We work with WA owners by phone and video and meet in person when the deal needs it. Your venue is shown to buyers across Australia, not only in Perth, under a confidentiality agreement.',
    ],
    transfer: {
      heading: 'WA lease, food and liquor rules',
      body: [
        'Retail shop leases in WA are covered by the Commercial Tenancy (Retail Shops) Agreements Act 1985 (WA). Assigning your lease to a buyer usually needs the landlord’s consent, and the Act limits when it can be refused. The Small Business Development Corporation offers advice and dispute help.',
        'Food businesses in WA are registered with the local government under the Food Act 2008 (WA). The buyer will need to register or update the registration in their own name, and the council may inspect before it is approved.',
        'Liquor licences in WA are regulated by the Department of Local Government, Sport and Cultural Industries through Racing, Gaming and Liquor. The buyer must be approved before the licence transfers, so start early and make the contract conditional on approval.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Perth café worth?',
        a: 'Most WA cafés sell for 0.8× to 1.5× EBITDA, usually between $150,000 and $500,000. Profit after rent, the lease term and staff stability have the biggest effect. We start with a confidential appraisal based on your figures.',
      },
      {
        q: 'Do I need my landlord’s consent to sell my café in WA?',
        a: 'Yes, if your buyer is taking over the lease. Under the Commercial Tenancy (Retail Shops) Agreements Act 1985 (WA), consent can be refused only on limited grounds, so speak with your landlord early.',
      },
      {
        q: 'How long does it take to sell a café in Perth?',
        a: 'Usually 90 to 150 days. The lease assignment, food registration and any liquor licence transfer are what take time, so start them as soon as you decide to sell.',
      },
      {
        q: 'Do you have an office in Perth?',
        a: 'No. Our office is in Melbourne. We work with WA owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
      },
    ],
  },
};
