import type { IndustryStateSet } from './types';

/**
 * Trades business sales by state. Benchmarks (2×–4.5× EBITDA, $200k–$1m,
 * 60–90 days) come from the national page; this copy covers each state's
 * market and its trade licensing and transfer rules.
 * No invented deals, figures or postcodes.
 */
export const TRADES_BUSINESS: IndustryStateSet = {
  victoria: {
    keyword: 'sell a trades business victoria',
    keywords: ['sell a plumbing business melbourne', 'sell an electrical business melbourne', 'trade business broker melbourne', 'trades business for sale victoria'],
    title: 'Sell a Trades Business in Victoria | Blackmont Advisory',
    description:
      'Selling a plumbing, electrical or HVAC business in Victoria? See what Melbourne trades businesses sell for, the licensing rules and how to sell privately.',
    h1: 'Selling a Trades Business in Victoria',
    intro:
      'Trades businesses in Victoria typically sell for 2× to 4.5× EBITDA, most often between $200,000 and $1 million, and take around 60 to 90 days to sell. In Melbourne, licensed staff and recurring commercial work are what lift a business to the top of that range.',
    points: [
      'Melbourne advisor based in Toorak',
      'Recent Melbourne deals in trade services and fencing',
      'Confidential sale, buyers approved by you',
      'Licensed business agent, BLA 092153L',
    ],
    imageAlt: 'Melbourne office buildings representing sell a trades business in Victoria with Blackmont Advisory',
    marketHeading: 'The trades business market in Victoria',
    market: [
      'Melbourne’s growing population, steady housing construction and large stock of older homes keep demand high for plumbing, electrical, HVAC, roofing and maintenance services. Buyers range from tradespeople ready to run their own business to established operators buying a competitor to add territory and staff.',
      'Businesses with recurring commercial work, such as maintenance contracts with property managers, schools, body corporates or retailers, sell fastest. Buyers also look closely at the spread of work across Melbourne’s growth corridors in the west, north and south-east, where new estates create ongoing demand.',
      'Regional Victoria, including Geelong, Ballarat and Bendigo, has strong trade demand and less competition for good businesses. Wherever you operate, buyers want to see that jobs, quoting and scheduling can run without you on every site.',
    ],
    transfer: {
      heading: 'Victorian trade licensing and transfer rules',
      body: [
        'In Victoria, most trade licences and registrations are held by individuals, not by the business. Plumbers and builders are registered with the Building and Plumbing Commission (formerly the Victorian Building Authority), and electricians are licensed by Energy Safe Victoria. A buyer cannot simply inherit your licence.',
        'That means your buyer must hold the right licence or registration themselves, or employ someone who does to supervise the work. Businesses with several licensed employees who are staying on attract more buyers and sell faster, because the licensing question is already solved.',
        'Other approvals may also need attention, such as refrigerant handling licences for HVAC work, domestic building insurance and any council or government contractor registrations. Check with the relevant regulator early so nothing delays settlement.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Victorian trades business worth?',
        a: 'Most Victorian trades businesses sell for 2× to 4.5× EBITDA, usually between $200,000 and $1 million. Recurring commercial contracts, licensed staff who stay and modern vehicles push the price higher. We start with a confidential appraisal based on your figures.',
      },
      {
        q: 'Can I sell my plumbing business if the licence is in my name?',
        a: 'Yes, but the licence does not transfer with the business. Your buyer must be registered with the Building and Plumbing Commission or employ a registered plumber, so plan who will hold the licence after settlement.',
      },
      {
        q: 'How long does it take to sell a trades business in Melbourne?',
        a: 'Usually 60 to 90 days, which is faster than most sectors. Licensing, vehicle and equipment finance, and handing over key commercial clients are the steps that most often add time.',
      },
      {
        q: 'Will my staff and clients find out I am selling?',
        a: 'Not until you are ready. We market the business without its name, every buyer signs a confidentiality agreement, and you approve each buyer before they see any detail.',
      },
    ],
  },

  'new-south-wales': {
    keyword: 'sell a trades business nsw',
    keywords: ['sell a plumbing business sydney', 'sell an electrical business sydney', 'trade business broker sydney', 'trades business for sale nsw'],
    title: 'Sell a Trades Business in NSW | Blackmont Advisory',
    description:
      'Selling a plumbing, electrical or HVAC business in NSW? See what Sydney trades businesses sell for, the NSW licensing rules and how a confidential sale works.',
    h1: 'Selling a Trades Business in New South Wales',
    intro:
      'Trades businesses in NSW typically sell for 2× to 4.5× EBITDA, most often between $200,000 and $1 million, and take around 60 to 90 days to sell. In Sydney, buyers pay most for licensed teams and recurring commercial maintenance work.',
    points: [
      'Buyers from Sydney and across Australia',
      'Confidential sale, buyers approved by you',
      'Licensing and handover planned early',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Sydney office buildings representing sell a trades business in NSW with Blackmont Advisory',
    marketHeading: 'The trades business market in NSW',
    market: [
      'Sydney is Australia’s largest trades market. Apartment towers, commercial buildings and a vast stock of older homes create steady work for plumbers, electricians, HVAC technicians, fire services and maintenance businesses across the city.',
      'Buyers favour businesses with maintenance contracts for strata, property managers, retailers and commercial sites, as this work repeats regardless of the building cycle. Businesses covering Western Sydney and the growth areas around Parramatta and the new airport also attract strong interest.',
      'We work with NSW owners by phone and video and meet in person when the deal needs it. Your business is presented to buyers across Australia, including interstate operators looking to expand into Sydney, under a confidentiality agreement.',
    ],
    transfer: {
      heading: 'NSW trade licensing and transfer rules',
      body: [
        'In NSW, contractor licences and qualified supervisor certificates for building, plumbing and electrical work are issued by NSW Fair Trading. A licence held by you personally does not pass to a buyer with the business.',
        'A company can hold a contractor licence, but it must nominate a qualified supervisor. If you are that supervisor, your buyer will need to hold the right qualification or employ someone who does, so agree who will take on the role before settlement.',
        'Home Building Compensation Fund cover, workers compensation and any government contractor registrations also need attention. Check the current requirements with NSW Fair Trading and the relevant insurers early so they do not delay the sale.',
      ],
    },
    faqs: [
      {
        q: 'How much is my NSW trades business worth?',
        a: 'Most NSW trades businesses sell for 2× to 4.5× EBITDA, usually between $200,000 and $1 million. Recurring commercial work, licensed staff who stay and the condition of vehicles and equipment have the biggest effect.',
      },
      {
        q: 'Does my NSW contractor licence transfer to the buyer?',
        a: 'No. Licences issued by NSW Fair Trading belong to the holder. The buyer needs their own licence or a qualified supervisor on staff, so plan the licensing handover early.',
      },
      {
        q: 'Who buys trades businesses in Sydney?',
        a: 'Typical buyers are qualified tradespeople ready to run their own business, established operators buying competitors to grow, and investors who keep the existing licensed team in place.',
      },
      {
        q: 'Do you have an office in Sydney?',
        a: 'No. Our office is in Melbourne. We work with NSW owners by phone and video, meet in person when a deal needs it, and present your business to buyers across Australia.',
      },
    ],
  },

  queensland: {
    keyword: 'sell a trades business queensland',
    keywords: ['sell a plumbing business brisbane', 'sell an electrical business brisbane', 'trade business broker brisbane', 'trades business for sale queensland'],
    title: 'Sell a Trades Business in Queensland | Blackmont Advisory',
    description:
      'Selling a trades business in Queensland? See what Brisbane and coastal trades businesses sell for, QBCC and electrical licensing rules, and how to sell.',
    h1: 'Selling a Trades Business in Queensland',
    intro:
      'Trades businesses in Queensland typically sell for 2× to 4.5× EBITDA, most often between $200,000 and $1 million, and take around 60 to 90 days to sell. Population growth across South East Queensland keeps buyer demand strong.',
    points: [
      'Buyers from Queensland and interstate',
      'Confidential sale, buyers approved by you',
      'QBCC licensing handover planned early',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Office buildings representing sell a trades business in Queensland with Blackmont Advisory',
    marketHeading: 'The trades business market in Queensland',
    market: [
      'South East Queensland is one of Australia’s fastest-growing regions. New housing, apartments and infrastructure across Brisbane, Logan, Ipswich, the Gold Coast and the Sunshine Coast create steady demand for plumbing, electrical, air conditioning, roofing and maintenance services.',
      'Air conditioning and electrical businesses benefit from the climate, with installation, servicing and maintenance work running all year. Buyers pay more for businesses with commercial and strata maintenance contracts than for those reliant on one-off domestic jobs.',
      'Queensland also attracts interstate tradespeople and operators looking to relocate or expand. We work with Queensland owners by phone and video, meet in person when needed, and present your business to buyers across Australia.',
    ],
    transfer: {
      heading: 'Queensland trade licensing and transfer rules',
      body: [
        'Most building and plumbing work in Queensland is licensed by the Queensland Building and Construction Commission (QBCC). A company can hold a QBCC contractor licence through a nominee supervisor, but individual licences do not transfer to a buyer.',
        'QBCC company licences also carry financial requirements, so a buyer taking over a licensed entity, or applying for a new licence, needs to meet them. Check the current rules with the QBCC before you agree the deal structure.',
        'Electrical contractors are licensed through the Electrical Safety Office and need a qualified technical person. If that person is you, your buyer must hold the qualification or employ someone who does after settlement.',
      ],
    },
    faqs: [
      {
        q: 'How much is my Queensland trades business worth?',
        a: 'Most Queensland trades businesses sell for 2× to 4.5× EBITDA, usually between $200,000 and $1 million. Recurring contracts, licensed staff and reliable vehicles and equipment increase the price.',
      },
      {
        q: 'Does my QBCC licence transfer when I sell?',
        a: 'Not personally. Individual licences stay with the holder. If the business is sold as a company with a QBCC licence, the buyer must keep a qualified nominee and meet the financial requirements, so check with the QBCC early.',
      },
      {
        q: 'How long does it take to sell a trades business in Brisbane?',
        a: 'Usually 60 to 90 days. Licensing changes, vehicle finance and introducing the buyer to key clients are the steps most likely to add time.',
      },
      {
        q: 'Do you have an office in Queensland?',
        a: 'No. Our office is in Melbourne. We work with Queensland owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
      },
    ],
  },

  'western-australia': {
    keyword: 'sell a trades business perth',
    keywords: ['sell a trades business western australia', 'sell an electrical business perth', 'trade business broker perth', 'trades business for sale wa'],
    title: 'Sell a Trades Business in Perth, WA | Blackmont Advisory',
    description:
      'Selling a trades business in Western Australia? See what Perth trades businesses sell for, WA licensing rules buyers check, and how a confidential sale works.',
    h1: 'Selling a Trades Business in Western Australia',
    intro:
      'Trades businesses in Western Australia typically sell for 2× to 4.5× EBITDA, most often between $200,000 and $1 million, and take around 60 to 90 days to sell. In Perth, licensed staff and commercial or resources-sector work add the most value.',
    points: [
      'Buyers from WA and across Australia',
      'Confidential sale, buyers approved by you',
      'Licensing handover planned early',
      'One senior advisor from start to settlement',
    ],
    imageAlt: 'Office buildings representing sell a trades business in Perth WA with Blackmont Advisory',
    marketHeading: 'The trades business market in Western Australia',
    market: [
      'Perth’s trades market is shaped by housing growth in the northern and southern corridors, a large commercial and industrial base, and the resources sector. Plumbing, electrical, air conditioning and maintenance businesses all have steady demand.',
      'Businesses that service commercial, industrial or mining-related clients can attract a premium, but buyers check how dependent the business is on a few large contracts. A broad mix of domestic, strata and commercial work is seen as lower risk.',
      'Skilled labour can be tight in WA, so a stable team of licensed staff is one of the most valuable things you can offer a buyer. We work with WA owners by phone and video, meet in person when needed, and reach buyers across Australia.',
    ],
    transfer: {
      heading: 'WA trade licensing and transfer rules',
      body: [
        'In Western Australia, building, plumbing and electrical licensing is administered by Building and Energy. Individual licences stay with the person who holds them and do not pass to a buyer with the business.',
        'Many WA trade businesses operate under a contractor licence that relies on a nominated licensed person. If that is you, your buyer will need the right licence or must employ someone who has it, so agree the arrangement before settlement.',
        'Site access inductions, safety accreditations and contractor registrations with major clients can also be tied to individuals or the entity. Check what needs to be renewed or transferred early, and confirm current licensing rules with Building and Energy.',
      ],
    },
    faqs: [
      {
        q: 'How much is my WA trades business worth?',
        a: 'Most WA trades businesses sell for 2× to 4.5× EBITDA, usually between $200,000 and $1 million. Licensed staff who stay, recurring commercial work and the spread of clients matter most.',
      },
      {
        q: 'Do WA trade licences transfer with the business?',
        a: 'No. Licences issued through Building and Energy belong to individuals. Your buyer must be licensed or employ a licensed person, so plan the licensing handover early.',
      },
      {
        q: 'Does mining work increase the value of my trades business?',
        a: 'It can, if the contracts are secure and not too concentrated. Buyers discount heavily when a large share of revenue depends on one or two resources clients.',
      },
      {
        q: 'Do you have an office in Perth?',
        a: 'No. Our office is in Melbourne. We work with WA owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
      },
    ],
  },
};
