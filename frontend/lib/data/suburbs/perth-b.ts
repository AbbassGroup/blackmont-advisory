import type { SuburbEntry } from './types';

/**
 * Greater Perth and surrounds: Osborne Park, Fremantle, Joondalup, Midland,
 * Rockingham, Mandurah. Each sell and buy page is written on its own. FAQs
 * open with a direct answer so search and answer engines can quote them.
 * Our office is in Melbourne; WA clients are served by phone and video.
 * No invented deals, figures or postcodes.
 */

const REMOTE =
  'Our office is in Melbourne. We work with Western Australian clients by phone and video, meet in person when a deal needs it, and bring buyers from across Australia.';

export const PERTH_B: SuburbEntry[] = [
  /* ── Osborne Park ─────────────────────────────────────────── */
  {
    slug: 'osborne-park',
    name: 'Osborne Park',
    city: 'perth',
    nearby: ['west-perth', 'subiaco', 'joondalup', 'perth-cbd'],
    sell: {
      keyword: 'sell a business osborne park',
      keywords: ['business broker osborne park', 'sell my business osborne park', 'sell a business perth', 'osborne park business for sale'],
      title: 'Sell a Business Osborne Park, Perth | Blackmont Advisory',
      description:
        'Selling a business in Osborne Park? Blackmont Advisory sells trade, wholesale, automotive and service businesses confidentially to buyers across Australia.',
      h1: 'Sell a Business in Osborne Park',
      intro:
        'Thinking of selling your Osborne Park business? We are a business sale advisor working with owners across Perth. We value your business, prepare it for buyers and run a confidential sale with one senior advisor.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Perth and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Osborne Park',
      overview: [
        'Osborne Park, in the City of Stirling, is one of Perth’s largest commercial and light industrial areas outside the CBD. Scarborough Beach Road is lined with car yards and showrooms, and the Herdsman business area holds offices, technology firms and professional services.',
        'The suburb is also home to trade suppliers, wholesalers, automotive workshops, printers and service businesses that sell to other businesses across the metro area. These often have steady accounts and experienced staff that buyers value.',
        REMOTE,
      ],
      highlights: [
        'Sales of trade, wholesale, automotive and service businesses',
        'Private investors and acquisitive operators in our network',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing an Osborne Park business for sale',
      tipsIntro: 'What buyers check first in commercial and light industrial businesses.',
      tips: [
        {
          title: 'Show your trade accounts',
          text: 'List your main customers, how long they have bought from you and what share of revenue each one brings. A broad, loyal customer base supports a stronger price.',
        },
        {
          title: 'Keep an asset register',
          text: 'Record vehicles, equipment and stock with their age, condition and any finance owing, so buyers can see exactly what is included.',
        },
        {
          title: 'Review your lease',
          text: 'Check your term, options and assignment rules. A secure lease on a well-located site is a real asset for a buyer.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Document how quoting, ordering and key accounts are handled, so the business can run without you making every call.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Perth?',
          a: 'No. Our office is in Melbourne. We work with Osborne Park and Perth owners by phone and video, and meet in person when a deal needs it.',
        },
        {
          q: 'How do I sell my business in Osborne Park?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the price and terms and manage the sale to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Who buys trade and wholesale businesses in Perth?',
          a: 'Typical buyers are competitors, suppliers looking to integrate, private investors and experienced operators, including buyers from interstate looking to enter WA.',
        },
        {
          q: 'What is my Osborne Park business worth?',
          a: 'Most businesses are valued on a multiple of verified earnings, adjusted for customer concentration, the lease and how much depends on you. We start with a realistic appraisal.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Osborne Park Perth with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business osborne park',
      keywords: ['businesses for sale osborne park', 'osborne park business for sale', 'buy a business perth', 'buyers advisor perth'],
      title: 'Buy a Business Osborne Park, Perth | Blackmont Advisory',
      description:
        'Looking to buy a business in Osborne Park? Blackmont Advisory finds trade, wholesale and service businesses, checks the figures and negotiates for you only.',
      h1: 'Buy a Business in Osborne Park',
      intro:
        'Looking to buy a business in Osborne Park? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Osborne Park',
      overview: [
        'Osborne Park offers buyers established commercial businesses close to the Perth CBD: trade suppliers, wholesalers, automotive businesses, printers, technology and professional service firms.',
        'Many of these businesses sell to other businesses on account, which can mean steady, repeat revenue. It also means checking how secure those accounts are once the current owner steps away.',
        'We work with Perth buyers by phone and video and meet in person when a deal needs it, testing the figures and negotiating only in your interest.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Trade, wholesale, automotive and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Osborne Park',
      tipsIntro: 'Questions we ask on every commercial purchase.',
      tips: [
        {
          title: 'Test customer concentration',
          text: 'Find out how much revenue comes from the top few accounts and whether those customers will stay with a new owner.',
        },
        {
          title: 'Inspect stock and equipment',
          text: 'Have stock counted and valued at settlement, and equipment and vehicles inspected before you agree a price.',
        },
        {
          title: 'Check supplier terms',
          text: 'Make sure key supplier accounts, pricing and any distribution rights will transfer to you.',
        },
        {
          title: 'Review the lease',
          text: 'Confirm the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Osborne Park?',
          a: 'Common opportunities include trade suppliers, wholesalers, automotive workshops, printers and business service firms. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Osborne Park?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you help if I am buying from interstate?',
          a: 'Yes. We work by phone and video, coordinate site visits when needed, and manage due diligence with your accountant and lawyer wherever they are.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Osborne Park Perth with Blackmont Advisory',
    },
  },

  /* ── Fremantle ────────────────────────────────────────────── */
  {
    slug: 'fremantle',
    name: 'Fremantle',
    city: 'perth',
    nearby: ['rockingham', 'perth-cbd', 'subiaco', 'mandurah'],
    sell: {
      keyword: 'sell a business fremantle',
      keywords: ['business broker fremantle', 'sell my business fremantle', 'sell a hospitality business fremantle', 'fremantle business for sale'],
      title: 'Sell a Business in Fremantle, WA | Blackmont Advisory',
      description:
        'Selling a business in Fremantle? Blackmont Advisory sells hospitality, tourism, retail and marine businesses confidentially, with one senior advisor.',
      h1: 'Sell a Business in Fremantle',
      intro:
        'Planning to sell your Fremantle business? We are a business sale advisor working with owners across Perth and WA. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Perth and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Fremantle',
      overview: [
        'Fremantle is Perth’s historic port city. The Fremantle Markets, South Terrace’s cafe strip, the West End and the Fishing Boat Harbour draw locals and visitors, supporting hospitality, retail, tourism and creative businesses. The University of Notre Dame Australia adds students and staff to the city centre.',
        'Fremantle Port, WA’s main container port, and the marine and industrial areas nearby support freight, logistics, maritime services, boat building and trade businesses.',
        REMOTE,
      ],
      highlights: [
        'Sales of hospitality, tourism, retail, marine and trade businesses',
        'Private investors and acquisitive operators in our network',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Fremantle business for sale',
      tipsIntro: 'Practical steps for Fremantle owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show a full year of trade',
          text: 'Tourism and hospitality in Fremantle can rise in summer and around events. Monthly figures for at least a year show buyers the real pattern.',
        },
        {
          title: 'Check heritage and lease conditions',
          text: 'Many Fremantle venues sit in heritage buildings. Confirm lease terms, any building restrictions and who pays for maintenance before buyers ask.',
        },
        {
          title: 'Sort liquor and food licences',
          text: 'Hospitality licences need to be transferred or applied for by a buyer. Find out early what is required so it does not delay settlement.',
        },
        {
          title: 'Record all sales clearly',
          text: 'Buyers and lenders only pay for income that appears in your accounts, tax returns and BAS.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Fremantle?',
          a: 'No. Our office is in Melbourne. We work with Fremantle owners by phone and video, and meet in person when a deal needs it.',
        },
        {
          q: 'How do I sell a hospitality business in Fremantle?',
          a: 'Start with a confidential valuation and a check of your lease and licences. We then prepare the business, approach qualified buyers under NDA and negotiate the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a marine or port-related business?',
          a: 'Yes. We sell freight, logistics, marine services and trade businesses, including preparing asset registers and plans for transferring contracts and staff.',
        },
        {
          q: 'What is my Fremantle business worth?',
          a: 'Value depends on verified earnings, seasonality, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Fremantle WA with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business fremantle',
      keywords: ['businesses for sale fremantle', 'fremantle business for sale', 'buy a cafe fremantle', 'buyers advisor perth'],
      title: 'Buy a Business in Fremantle, WA | Blackmont Advisory',
      description:
        'Want to buy a business in Fremantle? Blackmont Advisory finds hospitality, tourism, retail and marine businesses and negotiates the deal in your interest.',
      h1: 'Buy a Business in Fremantle',
      intro:
        'Looking to buy a business in Fremantle? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Fremantle',
      overview: [
        'Fremantle attracts buyers who want a business with character. Cafes, bars, restaurants, boutiques and tourism operators trade around the markets, South Terrace and the harbour.',
        'The port and nearby industrial areas also offer freight, maritime and trade businesses with business customers and contracts.',
        'Seasonal trade, heritage buildings and licences all affect value here. We help you test those risks and negotiate a price that reflects them.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, tourism, retail, marine and trade businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Fremantle',
      tipsIntro: 'Tips we share with buyers looking at Fremantle businesses.',
      tips: [
        {
          title: 'Look at monthly figures',
          text: 'Ask for at least a year of monthly sales so a strong summer or festival season does not hide quieter months.',
        },
        {
          title: 'Confirm licences transfer',
          text: 'Make the sale conditional on liquor, food and other licences being transferred or granted to you.',
        },
        {
          title: 'Check the building',
          text: 'Heritage buildings can bring maintenance costs and limits on changes. Read the lease carefully and know who pays for what.',
        },
        {
          title: 'Review staff and wages',
          text: 'Confirm awards, penalty rates and entitlements, and whether key staff will stay after the sale.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Fremantle?',
          a: 'Common opportunities include cafes, bars and restaurants, retail, tourism operators, marine services and trade businesses. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Fremantle?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a seasonal business a good buy?',
          a: 'It can be, if the price reflects a full year of verified earnings and you plan cash flow for the quieter months. We help you test both.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Fremantle WA with Blackmont Advisory',
    },
  },

  /* ── Joondalup ────────────────────────────────────────────── */
  {
    slug: 'joondalup',
    name: 'Joondalup',
    city: 'perth',
    nearby: ['osborne-park', 'midland', 'perth-cbd', 'west-perth'],
    sell: {
      keyword: 'sell a business joondalup',
      keywords: ['business broker joondalup', 'sell my business joondalup', 'business broker northern suburbs perth', 'joondalup business for sale'],
      title: 'Sell a Business in Joondalup, Perth | Blackmont Advisory',
      description:
        'Selling a business in Joondalup? Blackmont Advisory values and sells businesses in Perth’s northern suburbs confidentially, with one senior advisor throughout.',
      h1: 'Sell a Business in Joondalup',
      intro:
        'Ready to sell your Joondalup business? We are a business sale advisor working with owners across Perth. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Perth and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Joondalup',
      overview: [
        'Joondalup is the regional centre of Perth’s northern suburbs and the heart of the City of Joondalup. Lakeside Joondalup, the city centre and nearby business areas support retail, hospitality, health and professional services.',
        'Edith Cowan University and Joondalup Health Campus bring students, staff and patients, while the growing northern corridor drives demand for trades, construction, childcare and home services.',
        REMOTE,
      ],
      highlights: [
        'Sales of health, childcare, trade, retail and service businesses',
        'Private investors and acquisitive operators in our network',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Joondalup business for sale',
      tipsIntro: 'Practical steps for owners in Perth’s northern suburbs.',
      tips: [
        {
          title: 'Show your growth',
          text: 'Present three years of figures so buyers can see rising revenue and customers in a growing area.',
        },
        {
          title: 'Document your team and systems',
          text: 'Trade and service businesses sell for more when quoting, scheduling and delivery run without the owner on every job.',
        },
        {
          title: 'Check licences and approvals',
          text: 'Childcare, health and food businesses need approvals that may not transfer automatically. Plan for this in your timeline.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Confirm your lease term and options and discuss assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Joondalup?',
          a: 'No. Our office is in Melbourne. We work with Joondalup and northern suburbs owners by phone and video, and meet in person when a deal needs it.',
        },
        {
          q: 'How do I sell my business in Joondalup?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a childcare or health business in Joondalup?',
          a: 'Yes. We prepare the sale, present occupancy, staffing and revenue clearly, and find suitable buyers. Approvals and registrations are handled with your lawyer and the relevant authority.',
        },
        {
          q: 'What is my Joondalup business worth?',
          a: 'Value depends on verified earnings, growth, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Joondalup Perth with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business joondalup',
      keywords: ['businesses for sale joondalup', 'joondalup business for sale', 'buy a business northern suburbs perth', 'buyers advisor perth'],
      title: 'Buy a Business in Joondalup, Perth | Blackmont Advisory',
      description:
        'Want to buy a business in Joondalup? Blackmont Advisory finds businesses in Perth’s northern suburbs, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Joondalup',
      intro:
        'Looking to buy a business in Joondalup? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Joondalup',
      overview: [
        'Joondalup gives buyers a large and growing customer base across Perth’s northern suburbs. Lakeside Joondalup and the city centre support retail, food and services, and the university and hospital support health and education businesses.',
        'Population growth along the northern corridor also creates demand for childcare, trades, construction and home services.',
        'Growth is a bonus, but you should only pay for earnings the business already makes. We help you test the figures and negotiate a fair price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Health, childcare, trade, retail and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Joondalup',
      tipsIntro: 'Questions we ask on every northern suburbs purchase.',
      tips: [
        {
          title: 'Pay for today, not the forecast',
          text: 'Base your price on verified current earnings, not the seller’s projections for a growing area.',
        },
        {
          title: 'Check new competition',
          text: 'Growth corridors attract new competitors. Look at planned centres and businesses opening nearby.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'For childcare, health and food businesses, check which licences you need and make the sale conditional on getting them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Joondalup?',
          a: 'Common opportunities include retail and food, health practices, childcare, trades and home services. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Joondalup?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is Joondalup a good place to buy a business?',
          a: 'A growing population supports demand for local services. The key is buying a business with proven earnings at a fair price, not paying upfront for future growth.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Joondalup Perth with Blackmont Advisory',
    },
  },

  /* ── Midland ──────────────────────────────────────────────── */
  {
    slug: 'midland',
    name: 'Midland',
    city: 'perth',
    nearby: ['east-perth', 'joondalup', 'perth-cbd', 'osborne-park'],
    sell: {
      keyword: 'sell a business midland',
      keywords: ['business broker midland wa', 'sell my business midland', 'business broker perth eastern suburbs', 'midland business for sale'],
      title: 'Sell a Business in Midland, Perth | Blackmont Advisory',
      description:
        'Selling a business in Midland, WA? Blackmont Advisory sells retail, health, transport and Swan Valley businesses confidentially, with one senior advisor.',
      h1: 'Sell a Business in Midland',
      intro:
        'Thinking of selling your Midland business? We are a business sale advisor working with owners across Perth. We value your business, prepare it for buyers and run a confidential sale from start to settlement.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Perth and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Midland',
      overview: [
        'Midland is the main centre of the City of Swan and the gateway to Perth’s eastern suburbs. Midland Gate and the town centre support retail, food and services, and St John of God Midland Public and Private Hospitals anchor a growing health precinct.',
        'Nearby industrial areas such as Hazelmere, close to Perth Airport and the Great Eastern and Roe Highways, hold transport, logistics, manufacturing and trade businesses. The Swan Valley adds wineries, breweries, food producers and tourism.',
        REMOTE,
      ],
      highlights: [
        'Sales of retail, health, transport, trade and tourism businesses',
        'Private investors and acquisitive operators in our network',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Midland business for sale',
      tipsIntro: 'Practical steps for owners in Midland and the Swan Valley.',
      tips: [
        {
          title: 'List equipment and vehicles',
          text: 'For transport and trade businesses, keep a register of vehicles and equipment with condition, service history and finance owing.',
        },
        {
          title: 'Show contract strength',
          text: 'List major customers and contract terms. Secure, long-term contracts are often the biggest driver of value.',
        },
        {
          title: 'Plan for seasonality',
          text: 'Swan Valley tourism and hospitality can be seasonal. Monthly figures for a full year show buyers the real pattern.',
        },
        {
          title: 'Check licences and land',
          text: 'Wineries, breweries and food businesses rely on licences, and sometimes on land or water rights. Confirm what is included and what transfers.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Midland or Perth?',
          a: 'No. Our office is in Melbourne. We work with Midland and Perth owners by phone and video, and meet in person when a deal needs it.',
        },
        {
          q: 'How do I sell my business in Midland?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and negotiate the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a Swan Valley winery or tourism business?',
          a: 'Yes. We prepare the business, clarify what land, licences and stock are included, and find buyers suited to hospitality and tourism. Licence transfers are handled with your lawyer.',
        },
        {
          q: 'How are transport businesses valued?',
          a: 'Usually on a multiple of maintainable earnings, adjusted for customer concentration, contract terms and the condition of the fleet.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Midland Perth with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business midland',
      keywords: ['businesses for sale midland wa', 'midland business for sale', 'buy a business swan valley', 'buyers advisor perth'],
      title: 'Buy a Business in Midland, Perth | Blackmont Advisory',
      description:
        'Looking to buy a business in Midland, WA? Blackmont Advisory finds retail, health, transport and Swan Valley businesses and negotiates the deal for you.',
      h1: 'Buy a Business in Midland',
      intro:
        'Looking to buy a business in Midland? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Midland',
      overview: [
        'Midland offers buyers a busy regional centre in Perth’s east, with retail and services around Midland Gate and a growing health precinct around the hospitals.',
        'Industrial areas near Perth Airport hold transport, logistics and manufacturing businesses, and the Swan Valley offers wineries, breweries and tourism businesses for buyers wanting a lifestyle as well as an income.',
        'We help you test the figures, the assets and the risks, and negotiate a price that reflects what the business really earns.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, health, transport and tourism businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Midland',
      tipsIntro: 'Tips we share with buyers in Perth’s east.',
      tips: [
        {
          title: 'Inspect fleet and equipment',
          text: 'Have vehicles and machinery inspected, and factor upcoming replacements and finance owing into your offer.',
        },
        {
          title: 'Read the key contracts',
          text: 'Check how long major contracts run and whether they need consent when ownership changes.',
        },
        {
          title: 'Know what land is included',
          text: 'For Swan Valley businesses, confirm whether land, buildings and water rights are part of the sale or leased.',
        },
        {
          title: 'Confirm licences transfer',
          text: 'Make the sale conditional on liquor, food and other licences being transferred or granted to you.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Midland?',
          a: 'Common opportunities include retail, food, health practices, transport and logistics, trades, and Swan Valley hospitality and tourism. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Midland?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I buy a winery or brewery in the Swan Valley?',
          a: 'Yes. We help you assess earnings, stock, land and licences, and negotiate the deal. Liquor licensing and land questions are confirmed with your lawyer.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Midland Perth with Blackmont Advisory',
    },
  },

  /* ── Rockingham ───────────────────────────────────────────── */
  {
    slug: 'rockingham',
    name: 'Rockingham',
    city: 'perth',
    nearby: ['mandurah', 'fremantle', 'perth-cbd', 'midland'],
    sell: {
      keyword: 'sell a business rockingham',
      keywords: ['business broker rockingham', 'sell my business rockingham', 'business broker kwinana', 'rockingham business for sale'],
      title: 'Sell a Business in Rockingham, WA | Blackmont Advisory',
      description:
        'Selling a business in Rockingham, WA? Blackmont Advisory sells trade, industrial, retail and service businesses confidentially to buyers across Australia.',
      h1: 'Sell a Business in Rockingham',
      intro:
        'Planning to sell your Rockingham business? We are a business sale advisor working with owners across Perth and WA. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Perth and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Rockingham',
      overview: [
        'Rockingham is the main centre of the City of Rockingham, south of Fremantle. Rockingham Centre and the foreshore support retail, hospitality and services for a large and growing coastal population.',
        'The Kwinana Industrial Area and the defence and marine businesses linked to HMAS Stirling on Garden Island create strong demand for trades, engineering, maintenance, labour hire and industrial services.',
        REMOTE,
      ],
      highlights: [
        'Sales of trade, engineering, industrial and service businesses',
        'Private investors and acquisitive operators in our network',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Rockingham business for sale',
      tipsIntro: 'What buyers check in trade and industrial service businesses.',
      tips: [
        {
          title: 'Show contract and customer spread',
          text: 'List your main industrial and commercial customers and contract terms. Reliance on one or two clients will concern buyers.',
        },
        {
          title: 'Keep safety and compliance records',
          text: 'Industrial clients demand strong safety systems. Up-to-date accreditations, inductions and records make your business easier to sell.',
        },
        {
          title: 'Keep an asset register',
          text: 'Record vehicles, plant and equipment with condition, service history and finance owing.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Bring supervisors into client relationships and document how jobs are won and delivered.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Rockingham?',
          a: 'No. Our office is in Melbourne. We work with Rockingham and Kwinana owners by phone and video, and meet in person when a deal needs it.',
        },
        {
          q: 'How do I sell an industrial services business in Rockingham?',
          a: 'Start with a confidential valuation and clear records of contracts, assets and safety systems. We approach suitable buyers under NDA and negotiate the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Who buys trade businesses near Kwinana?',
          a: 'Typical buyers are competitors, larger service groups, private investors and experienced operators, including interstate buyers wanting a foothold in WA.',
        },
        {
          q: 'What is my Rockingham business worth?',
          a: 'Value depends on verified earnings, contract security, assets and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Rockingham WA with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business rockingham',
      keywords: ['businesses for sale rockingham', 'rockingham business for sale', 'buy a business kwinana', 'buyers advisor perth'],
      title: 'Buy a Business in Rockingham, WA | Blackmont Advisory',
      description:
        'Want to buy a business in Rockingham, WA? Blackmont Advisory finds trade, industrial and local service businesses, checks the figures and negotiates for you.',
      h1: 'Buy a Business in Rockingham',
      intro:
        'Looking to buy a business in Rockingham? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Rockingham',
      overview: [
        'Rockingham gives buyers a growing coastal population, with retail, food and services around Rockingham Centre and the foreshore.',
        'Nearby, the Kwinana Industrial Area and defence and marine activity support trade, engineering and industrial service businesses, often with business customers and ongoing work.',
        'We help you understand how secure that work is, what the assets are worth, and whether the price is fair.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Trade, engineering, industrial and local service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Rockingham',
      tipsIntro: 'Questions we ask on every Rockingham purchase.',
      tips: [
        {
          title: 'Test client concentration',
          text: 'Find out how much work comes from a few industrial clients and whether contracts can end when ownership changes.',
        },
        {
          title: 'Check safety accreditations',
          text: 'Make sure the accreditations clients require will stay with the business under your ownership.',
        },
        {
          title: 'Inspect plant and vehicles',
          text: 'Have assets inspected and valued, and allow for upcoming replacements in your offer.',
        },
        {
          title: 'Review the lease',
          text: 'Confirm the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Rockingham?',
          a: 'Common opportunities include trades, engineering and industrial services, retail, food and local services. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Rockingham?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What due diligence is needed for an industrial services business?',
          a: 'Review financial accounts, client contracts, safety records and accreditations, plant and vehicles, staff and entitlements, and the lease. Your accountant and lawyer should be involved.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Rockingham WA with Blackmont Advisory',
    },
  },

  /* ── Mandurah ─────────────────────────────────────────────── */
  {
    slug: 'mandurah',
    name: 'Mandurah',
    city: 'perth',
    nearby: ['rockingham', 'fremantle', 'perth-cbd', 'joondalup'],
    sell: {
      keyword: 'sell a business mandurah',
      keywords: ['business broker mandurah', 'sell my business mandurah', 'business broker peel region', 'mandurah business for sale'],
      title: 'Sell a Business in Mandurah, WA | Blackmont Advisory',
      description:
        'Selling a business in Mandurah? Blackmont Advisory values and sells Mandurah and Peel businesses confidentially, from tourism and retail to trades.',
      h1: 'Sell a Business in Mandurah',
      intro:
        'Thinking of selling your Mandurah business? We are a business sale advisor working with owners across Perth and WA. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Perth and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Mandurah',
      overview: [
        'Mandurah is WA’s largest regional city and the centre of the Peel region. Mandurah Forum, the city centre and the foreshore along the estuary support retail, hospitality and services, and tourism draws visitors to the waterways, canals and beaches.',
        'A growing population, including many retirees and families, drives demand for health, aged care, childcare, building, trades and home services. The Mandurah rail line links the city to Perth.',
        REMOTE,
      ],
      highlights: [
        'Sales of tourism, retail, health, trade and service businesses',
        'Private investors and lifestyle buyers in our network',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Mandurah business for sale',
      tipsIntro: 'Practical steps for Mandurah and Peel owners.',
      tips: [
        {
          title: 'Show a full year of trade',
          text: 'Tourism and hospitality can peak in summer and school holidays. Monthly figures for a full year show buyers the real pattern.',
        },
        {
          title: 'Show repeat customers',
          text: 'Health, trade and service businesses with loyal local clients are worth more. Pull together repeat-customer or booking figures.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Lifestyle buyers want a business they can step into. Document systems and bring staff into key relationships.',
        },
        {
          title: 'Check your lease and licences',
          text: 'Confirm your lease term and options, and any licences a buyer will need to apply for.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Mandurah?',
          a: 'No. Our office is in Melbourne. We work with Mandurah and Peel owners by phone and video, and meet in person when a deal needs it.',
        },
        {
          q: 'How do I sell my business in Mandurah?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Who buys businesses in Mandurah?',
          a: 'Buyers include local operators, people relocating from Perth or interstate for a coastal lifestyle, and businesses expanding across the Peel region.',
        },
        {
          q: 'What is my Mandurah business worth?',
          a: 'Value depends on verified earnings, seasonality, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Mandurah WA with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business mandurah',
      keywords: ['businesses for sale mandurah', 'mandurah business for sale', 'buy a business peel region', 'buyers advisor perth'],
      title: 'Buy a Business in Mandurah, WA | Blackmont Advisory',
      description:
        'Looking to buy a business in Mandurah? Blackmont Advisory finds tourism, retail, health and trade businesses in the Peel region and negotiates for you only.',
      h1: 'Buy a Business in Mandurah',
      intro:
        'Looking to buy a business in Mandurah? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Mandurah',
      overview: [
        'Mandurah attracts buyers who want a coastal lifestyle with a solid local market. Retail, cafes, restaurants and tourism operators trade around the foreshore, the estuary and Mandurah Forum.',
        'A growing population of families and retirees also supports health, aged care, childcare, trades and home services across the Peel region.',
        'Seasonal trade and owner involvement can change the numbers. We help you test them and negotiate a price that reflects the real earnings.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Tourism, retail, health, trade and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Mandurah',
      tipsIntro: 'Tips we share with buyers looking at the Peel region.',
      tips: [
        {
          title: 'Look at monthly figures',
          text: 'Ask for at least a year of monthly sales so a strong summer does not hide quieter winter months.',
        },
        {
          title: 'Test owner dependence',
          text: 'If customers come for the owner, plan a handover period and consider linking part of the price to results.',
        },
        {
          title: 'Check staff availability',
          text: 'Find out whether key staff will stay and how easy it is to recruit locally in peak season.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Mandurah?',
          a: 'Common opportunities include cafes and restaurants, tourism operators, retail, health and aged care services, childcare and trades. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Mandurah?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a lifestyle business in Mandurah a good investment?',
          a: 'It can be, if the price matches a full year of verified earnings and the business does not rely too heavily on the current owner. We help you test both.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Mandurah WA with Blackmont Advisory',
    },
  },
];
