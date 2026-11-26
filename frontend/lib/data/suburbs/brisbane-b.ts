import type { SuburbEntry } from './types';

/**
 * Greater Brisbane and south-east / regional Queensland: Chermside, Ipswich,
 * Logan, Gold Coast, Sunshine Coast, Toowoomba. Each sell and buy page is
 * written on its own. Blackmont's office is in Melbourne, so these pages never
 * claim a Queensland office. FAQs open with a direct answer for answer engines.
 * No invented deals, figures or postcodes.
 */

const REMOTE =
  'Our office is in Melbourne. We work with Queensland clients by phone and video, meet in person when a deal needs it, and bring buyers from across Australia.';

export const BRISBANE_B: SuburbEntry[] = [
  /* ── Chermside ────────────────────────────────────────────── */
  {
    slug: 'chermside',
    name: 'Chermside',
    city: 'brisbane',
    nearby: ['brisbane-cbd', 'fortitude-valley', 'newstead', 'sunshine-coast'],
    sell: {
      keyword: 'sell a business chermside',
      keywords: ['business broker chermside', 'sell my business brisbane north', 'business sale advisor north brisbane', 'chermside business for sale'],
      title: 'Sell a Business in Chermside, Brisbane | Blackmont Advisory',
      description:
        'Selling a business in Chermside or Brisbane’s north? Blackmont Advisory values and sells businesses confidentially, with one senior advisor to settlement.',
      h1: 'Sell a Business in Chermside',
      intro:
        'Thinking of selling your Chermside business? We are a business sale advisor working with owners across Brisbane. We value your business, prepare it for buyers and sell it privately, with one senior advisor throughout.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Brisbane and across Australia',
        'Every buyer under NDA and approved by you',
        'Fees agreed in writing upfront',
      ],
      overviewHeading: 'Selling a business in Chermside',
      overview: [
        'Chermside is the commercial centre of Brisbane’s north. Westfield Chermside, one of the largest shopping centres in Australia, and the Gympie Road corridor support retail, food, fitness, health and services for a large residential catchment.',
        'The Prince Charles Hospital and the medical and allied health practices around it make health a major local employer, alongside professional services, childcare and trade businesses that work across the northern suburbs.',
        REMOTE,
      ],
      highlights: [
        'Sales of retail, health, childcare and service businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A confidential process from first call to settlement',
      ],
      tipsHeading: 'Preparing a Chermside business for sale',
      tipsIntro: 'Practical steps for owners in Brisbane’s north before going to market.',
      tips: [
        {
          title: 'Check your shopping centre lease',
          text: 'Leases in large centres often have strict assignment, fit-out and relocation clauses. Review yours early and talk to centre management before buyers ask.',
        },
        {
          title: 'Show recurring clients',
          text: 'For health, fitness and childcare businesses, memberships, repeat bookings and enrolments are what buyers pay for. Present them clearly.',
        },
        {
          title: 'Clean up the financials',
          text: 'Buyers and lenders want three years of accounts that match tax returns and BAS, with personal and one-off costs separated.',
        },
        {
          title: 'Make it run without you',
          text: 'Document systems and bring staff into key relationships so a buyer can see the business will keep trading after you leave.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Chermside?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA, negotiate the price and terms and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Chermside or Brisbane?',
          a: 'No. Our office is in Melbourne. We work with Brisbane owners by phone and video, meet in person when a deal needs it, and market your business to buyers across Australia.',
        },
        {
          q: 'Can you sell a business inside Westfield Chermside?',
          a: 'Yes. We plan the sale around the centre lease, including landlord consent to assignment and any refit obligations, so it does not hold up settlement.',
        },
        {
          q: 'What is my Chermside business worth?',
          a: 'Most businesses are valued on a multiple of verified earnings, adjusted for the lease, risk and how much depends on you. We start with a realistic appraisal.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Chermside Brisbane with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business chermside',
      keywords: ['businesses for sale chermside', 'chermside business for sale', 'buy a business north brisbane', 'buyers advisor brisbane'],
      title: 'Buy a Business in Chermside, Brisbane | Blackmont Advisory',
      description:
        'Want to buy a business in Chermside or Brisbane’s north? Blackmont Advisory finds businesses, checks the figures and negotiates the deal in your interest.',
      h1: 'Buy a Business in Chermside',
      intro:
        'Looking to buy a business in Chermside? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Chermside',
      overview: [
        'Chermside gives buyers one of Brisbane’s busiest suburban catchments. Westfield Chermside and Gympie Road draw shoppers from across the north, supporting retail, food, fitness and services.',
        'The Prince Charles Hospital anchors a strong health sector, and childcare, education and trade businesses serve the surrounding family suburbs.',
        'We work with Brisbane buyers by phone and video, meet in person when a deal needs it, and help you test what the business really earns before you commit.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, health, childcare and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Chermside',
      tipsIntro: 'Questions we ask on every purchase in Brisbane’s north.',
      tips: [
        {
          title: 'Read the centre lease',
          text: 'Shopping centre leases can include refit and relocation clauses. Check the term, outgoings and assignment rules before you agree on a price.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Work out rent and outgoings as a share of sales and compare them with similar businesses.',
        },
        {
          title: 'Check practitioner and staff commitments',
          text: 'In health and childcare, find out which key staff will stay and on what terms.',
        },
        {
          title: 'Verify the accounts',
          text: 'Ask for three years of accounts that match tax returns and BAS, reviewed by your accountant.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Chermside?',
          a: 'Common opportunities include retail and food outlets, fitness studios, health and allied health practices, childcare and trade services. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Brisbane’s north?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you help if I am buying from interstate?',
          a: 'Yes. We work by phone and video, coordinate inspections, and manage the process so you can buy a Brisbane business with confidence.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Chermside Brisbane with Blackmont Advisory',
    },
  },

  /* ── Ipswich ──────────────────────────────────────────────── */
  {
    slug: 'ipswich',
    name: 'Ipswich',
    city: 'brisbane',
    nearby: ['logan', 'toowoomba', 'south-brisbane', 'brisbane-cbd'],
    sell: {
      keyword: 'sell a business ipswich',
      keywords: ['business broker ipswich', 'sell my business ipswich qld', 'sell a manufacturing business qld', 'ipswich business for sale'],
      title: 'Sell a Business in Ipswich, QLD | Blackmont Advisory',
      description:
        'Selling a business in Ipswich, QLD? Blackmont Advisory values and sells Ipswich businesses confidentially, from trades to manufacturing and logistics firms.',
      h1: 'Sell a Business in Ipswich',
      intro:
        'Planning to sell your Ipswich business? We are a business sale advisor working with Queensland owners. We value your business, prepare it for buyers and run a confidential sale with one senior advisor.',
      points: [
        'Senior advisor from start to settlement',
        'Trade buyers, investors and owner-operators',
        'Every buyer under NDA and approved by you',
        'Fees agreed in writing upfront',
      ],
      overviewHeading: 'Selling a business in Ipswich',
      overview: [
        'Ipswich is one of Queensland’s oldest cities and one of its fastest growing. The City of Ipswich takes in the historic centre and Riverlink, the growing Springfield precinct with Orion Springfield Central, and established suburbs such as Brassall and Redbank.',
        'Its industrial areas, including Bundamba, Wulkuraka and Redbank, hold manufacturing, engineering, logistics and transport businesses, while RAAF Base Amberley supports defence-related suppliers and services.',
        REMOTE,
      ],
      highlights: [
        'Sales of manufacturing, logistics, trade and service businesses',
        'Buyers screened and approved by you',
        'Private equity and trade buyers in our network',
        'A confidential process from first call to settlement',
      ],
      tipsHeading: 'Preparing an Ipswich business for sale',
      tipsIntro: 'What buyers check first in Ipswich industrial and service businesses.',
      tips: [
        {
          title: 'Keep a full asset register',
          text: 'List vehicles, plant and equipment with age, condition, finance owing and service history. Buyers value what they can see.',
        },
        {
          title: 'Show contract strength',
          text: 'Major customer contracts, including any defence or government supply, should be documented with terms and renewal dates.',
        },
        {
          title: 'Check compliance records',
          text: 'Workplace safety, environmental and any industry licences should be current and easy for a buyer to review.',
        },
        {
          title: 'Review your lease or property',
          text: 'Confirm the industrial lease term and options, or decide whether you will sell or lease the property to the buyer.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Ipswich?',
          a: 'Start with a confidential valuation. We prepare the business, approach qualified buyers privately under NDA, negotiate the deal and manage it through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Ipswich?',
          a: 'No. Our office is in Melbourne. We work with Ipswich owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
        },
        {
          q: 'Who buys industrial businesses in Ipswich?',
          a: 'Typical buyers are competitors, larger manufacturing and logistics groups, private equity and experienced operators who want contracts and assets already in place.',
        },
        {
          q: 'How is a manufacturing business valued?',
          a: 'Usually on a multiple of maintainable earnings, adjusted for customer concentration, the condition of plant and equipment, and the lease.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Ipswich QLD with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business ipswich',
      keywords: ['businesses for sale ipswich', 'ipswich business for sale', 'buy a business springfield qld', 'industrial businesses for sale qld'],
      title: 'Buy a Business in Ipswich, QLD | Blackmont Advisory',
      description:
        'Looking to buy a business in Ipswich, QLD? Blackmont Advisory finds Ipswich and Springfield businesses, checks the numbers and negotiates the deal for you.',
      h1: 'Buy a Business in Ipswich',
      intro:
        'Looking to buy a business in Ipswich? We act only for buyers. We find suitable businesses, run due diligence with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Due diligence before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Ipswich',
      overview: [
        'Ipswich offers buyers a growing population and prices below inner Brisbane. Springfield, Riverlink and the established suburbs support retail, food, childcare, health and services.',
        'The city’s industrial areas hold manufacturing, engineering, logistics and transport businesses, and RAAF Base Amberley supports a defence supply chain.',
        'We work with buyers by phone and video, meet in person when a deal needs it, and help you check contracts, assets and earnings before you commit.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Manufacturing, logistics, trade and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Ipswich',
      tipsIntro: 'Questions we ask on every Ipswich purchase.',
      tips: [
        {
          title: 'Inspect plant and vehicles',
          text: 'Have equipment and vehicles inspected and valued, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Read key contracts',
          text: 'Check how long major contracts run and whether they need consent when ownership changes.',
        },
        {
          title: 'Pay for today, not the forecast',
          text: 'Ipswich is growing, but base your price on verified current earnings, not the seller’s projections.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Ipswich?',
          a: 'Common opportunities include manufacturing, engineering, transport and logistics, trades, childcare, health and retail. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Ipswich?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is Springfield a good place to buy a business?',
          a: 'Springfield is one of the fastest-growing parts of Ipswich, which supports demand for local services. The key is to buy proven earnings at a fair price.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Ipswich QLD with Blackmont Advisory',
    },
  },

  /* ── Logan ────────────────────────────────────────────────── */
  {
    slug: 'logan',
    name: 'Logan',
    city: 'brisbane',
    nearby: ['ipswich', 'gold-coast', 'south-brisbane', 'brisbane-cbd'],
    sell: {
      keyword: 'sell a business logan',
      keywords: ['business broker logan', 'sell my business logan qld', 'sell a business beenleigh', 'logan business for sale'],
      title: 'Sell a Business in Logan City, QLD | Blackmont Advisory',
      description:
        'Selling a business in Logan, QLD? Blackmont Advisory values and sells Logan businesses confidentially, from trades and transport to retail and childcare.',
      h1: 'Sell a Business in Logan',
      intro:
        'Thinking of selling your Logan business? We are a business sale advisor working with Queensland owners. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Queensland and across Australia',
        'Every buyer under NDA and approved by you',
        'Fees agreed in writing upfront',
      ],
      overviewHeading: 'Selling a business in Logan',
      overview: [
        'The City of Logan sits between Brisbane and the Gold Coast along the M1 and Logan Motorway. Centres such as Logan Hyperdome, Springwood, Logan Central and Beenleigh support retail, food, health and services for a large and diverse population.',
        'Industrial areas in Crestmead, Loganholme and Slacks Creek hold manufacturing, transport, logistics, wholesale and trade businesses, while Meadowbrook, home to Logan Hospital and Griffith University’s Logan campus, anchors health and education.',
        REMOTE,
      ],
      highlights: [
        'Sales of trade, transport, retail and childcare businesses',
        'Trade, transport and industrial buyers in our network',
        'Buyers screened and approved by you',
        'A confidential process from first call to settlement',
      ],
      tipsHeading: 'Preparing a Logan business for sale',
      tipsIntro: 'Practical steps for Logan owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Document jobs and systems',
          text: 'For trade and transport businesses, a clear job pipeline, scheduling system and written procedures show a buyer the business runs without you.',
        },
        {
          title: 'List equipment and vehicles',
          text: 'Keep a register of vehicles and equipment with condition, finance owing and service history.',
        },
        {
          title: 'Record all sales clearly',
          text: 'Buyers and lenders only pay for income they can verify in your accounts, tax returns and BAS.',
        },
        {
          title: 'Check licences and approvals',
          text: 'Childcare, food and some trade businesses need approvals that may not transfer automatically. Plan for this in your timeline.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Logan?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Logan?',
          a: 'No. Our office is in Melbourne. We work with Logan owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
        },
        {
          q: 'Can you sell a transport or trade business in Logan?',
          a: 'Yes. We sell transport, logistics and trade businesses, including preparing asset registers and plans for transferring customers, contracts and staff.',
        },
        {
          q: 'What is my Logan business worth?',
          a: 'Value depends on verified earnings, the lease, assets and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Logan QLD with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business logan',
      keywords: ['businesses for sale logan', 'logan business for sale', 'buy a business beenleigh', 'buyers advisor south east queensland'],
      title: 'Buy a Business in Logan City, QLD | Blackmont Advisory',
      description:
        'Want to buy a business in Logan, QLD? Blackmont Advisory finds listed and off-market Logan businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Logan',
      intro:
        'Looking to buy a business in Logan? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Logan',
      overview: [
        'Logan gives buyers a large, growing population between Brisbane and the Gold Coast. Logan Hyperdome, Springwood and Beenleigh support retail, food, health and services.',
        'Industrial estates in Crestmead, Loganholme and Slacks Creek offer manufacturing, transport, wholesale and trade businesses with good motorway access.',
        'We work with buyers by phone and video, meet in person when a deal needs it, and help you check what the business truly earns.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Trade, transport, retail and childcare businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Logan',
      tipsIntro: 'Tips we share with buyers looking in Logan.',
      tips: [
        {
          title: 'Only pay for verified income',
          text: 'Base the price on income shown in the accounts, tax returns and BAS. Unrecorded cash cannot be verified or financed.',
        },
        {
          title: 'Check customer concentration',
          text: 'Find out how much work comes from a few customers or contracts, and whether those relationships will stay.',
        },
        {
          title: 'Inspect vehicles and equipment',
          text: 'Have assets inspected and valued, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned to you and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Logan?',
          a: 'Common opportunities include trades, transport and logistics, manufacturing, childcare, food and retail. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Logan?',
          a: 'Set your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I get finance to buy a business in Logan?',
          a: 'Often, yes. Lenders look at verified earnings, your experience and security. We help prepare what they need and can structure vendor finance where it suits.',
        },
        {
          q: 'Do I need an advisor to buy a small business?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Logan QLD with Blackmont Advisory',
    },
  },

  /* ── Gold Coast ───────────────────────────────────────────── */
  {
    slug: 'gold-coast',
    name: 'Gold Coast',
    city: 'brisbane',
    nearby: ['logan', 'brisbane-cbd', 'south-brisbane', 'sunshine-coast'],
    sell: {
      keyword: 'sell a business gold coast',
      keywords: ['business broker gold coast', 'sell my business gold coast', 'sell a tourism business gold coast', 'gold coast business for sale'],
      title: 'Sell a Business on the Gold Coast, QLD | Blackmont Advisory',
      description:
        'Selling a business on the Gold Coast? Blackmont Advisory values and sells Gold Coast businesses confidentially to buyers across Australia. Book a chat today.',
      h1: 'Sell a Business on the Gold Coast',
      intro:
        'Ready to sell your Gold Coast business? We are a business sale advisor working with Queensland owners. We value your business, prepare it for buyers and run a confidential sale with one senior advisor.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Queensland and across Australia',
        'Every buyer under NDA and approved by you',
        'Fees agreed in writing upfront',
      ],
      overviewHeading: 'Selling a business on the Gold Coast',
      overview: [
        'The Gold Coast is Australia’s largest non-capital city. Tourism and hospitality are concentrated in Surfers Paradise, Broadbeach and Coolangatta, while Southport, Robina and Pacific Fair support retail, professional and health services for a fast-growing population.',
        'Griffith University, Bond University and Gold Coast University Hospital anchor education and health, and the city has strong construction, trade and marine industries, including the boat-building precinct at Coomera.',
        REMOTE,
      ],
      highlights: [
        'Sales of hospitality, tourism, health, trade and marine businesses',
        'Buyers from interstate as well as Queensland',
        'Buyers screened and approved by you',
        'A confidential process from first call to settlement',
      ],
      tipsHeading: 'Preparing a Gold Coast business for sale',
      tipsIntro: 'What we tell Gold Coast owners before they go to market.',
      tips: [
        {
          title: 'Show a full year of trade',
          text: 'Tourism and hospitality businesses are seasonal. Present monthly figures for at least a year so buyers see the whole cycle, not just school holidays.',
        },
        {
          title: 'Reach interstate buyers',
          text: 'Many Gold Coast buyers are relocating from Sydney, Melbourne and overseas. A well-prepared information pack helps them commit from a distance.',
        },
        {
          title: 'Check your lease and body corporate',
          text: 'Businesses in mixed-use and resort buildings may face body corporate rules and management rights issues. Clarify them early.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Document systems and train a manager so the business can run without the owner on the floor every day.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business on the Gold Coast?',
          a: 'Start with a confidential valuation. We prepare the business, approach qualified local and interstate buyers under NDA, negotiate the deal and manage it to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office on the Gold Coast?',
          a: 'No. Our office is in Melbourne. We work with Gold Coast owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
        },
        {
          q: 'Can you sell a tourism or hospitality business on the Gold Coast?',
          a: 'Yes. We present seasonal trading clearly, plan around the lease and licences, and approach buyers who understand tourism businesses.',
        },
        {
          q: 'What is my Gold Coast business worth?',
          a: 'Most businesses are valued on a multiple of verified earnings, adjusted for seasonality, the lease and owner involvement. We start with a realistic appraisal.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business on the Gold Coast QLD with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business gold coast',
      keywords: ['businesses for sale gold coast', 'gold coast business for sale', 'buy a cafe gold coast', 'buyers advisor gold coast'],
      title: 'Buy a Business on the Gold Coast, QLD | Blackmont Advisory',
      description:
        'Looking to buy a business on the Gold Coast? Blackmont Advisory finds businesses, tests seasonal figures and negotiates price and terms in your interest.',
      h1: 'Buy a Business on the Gold Coast',
      intro:
        'Looking to buy a business on the Gold Coast? We act only for buyers, including those relocating from interstate. We find suitable businesses, test the figures and negotiate the price and terms for you.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Help for interstate buyers',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business on the Gold Coast',
      overview: [
        'The Gold Coast attracts buyers who want a lifestyle as well as an income. Surfers Paradise, Broadbeach, Burleigh Heads and Coolangatta support cafes, restaurants and tourism, while Southport and Robina carry professional and health services.',
        'There are also strong construction, trade and marine businesses, including around Coomera, serving one of Australia’s fastest-growing cities.',
        'We work with buyers by phone and video, coordinate inspections, and help you separate a good business from a good location.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, tourism, health, trade and marine businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy on the Gold Coast',
      tipsIntro: 'Tips we share with every Gold Coast buyer.',
      tips: [
        {
          title: 'Look at monthly figures',
          text: 'Tourism trade can swing with seasons and events. Ask for at least twelve months of monthly sales so a strong summer does not hide a slow winter.',
        },
        {
          title: 'Check who runs the business',
          text: 'Many lifestyle businesses depend on the owner working long hours. Work out what it would cost to replace them with a manager.',
        },
        {
          title: 'Review lease and building rules',
          text: 'In resort and mixed-use buildings, check body corporate rules, trading hours and the lease before you commit.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale on the Gold Coast?',
          a: 'Common opportunities include cafes and restaurants, tourism operators, health and beauty, trades, construction services and marine businesses. We also approach owners off-market.',
        },
        {
          q: 'Can I buy a Gold Coast business from interstate?',
          a: 'Yes. We work by phone and video, coordinate inspections and manage due diligence so you can buy with confidence before you relocate.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a seasonal business a good investment?',
          a: 'It can be, if the price reflects a full year of verified trade and you plan cash flow for quieter months. We help you test both.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor negotiates only in your interest.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business on the Gold Coast QLD with Blackmont Advisory',
    },
  },

  /* ── Sunshine Coast ───────────────────────────────────────── */
  {
    slug: 'sunshine-coast',
    name: 'Sunshine Coast',
    city: 'brisbane',
    nearby: ['chermside', 'brisbane-cbd', 'gold-coast', 'fortitude-valley'],
    sell: {
      keyword: 'sell a business sunshine coast',
      keywords: ['business broker sunshine coast', 'sell my business sunshine coast', 'sell a business noosa', 'sunshine coast business for sale'],
      title: 'Sell a Business Sunshine Coast, QLD | Blackmont Advisory',
      description:
        'Selling a business on the Sunshine Coast? Blackmont Advisory values and sells businesses from Caloundra to Noosa confidentially, with one senior advisor.',
      h1: 'Sell a Business on the Sunshine Coast',
      intro:
        'Thinking of selling your Sunshine Coast business? We are a business sale advisor working with Queensland owners. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Queensland and across Australia',
        'Every buyer under NDA and approved by you',
        'Fees agreed in writing upfront',
      ],
      overviewHeading: 'Selling a business on the Sunshine Coast',
      overview: [
        'The Sunshine Coast runs from Caloundra to Noosa, with Maroochydore’s new city centre, Mooloolaba and Sunshine Plaza as its commercial heart. Tourism, hospitality and retail are strong along the coast, and Nambour and the hinterland add rural and food businesses.',
        'The University of the Sunshine Coast and Sunshine Coast University Hospital support education and health, and population growth drives demand for construction, trades, childcare and professional services.',
        REMOTE,
      ],
      highlights: [
        'Sales of hospitality, tourism, health, trade and service businesses',
        'Buyers relocating from interstate as well as locals',
        'Buyers screened and approved by you',
        'A confidential process from first call to settlement',
      ],
      tipsHeading: 'Preparing a Sunshine Coast business for sale',
      tipsIntro: 'Practical steps for Sunshine Coast owners before going to market.',
      tips: [
        {
          title: 'Present seasonal trade honestly',
          text: 'Coastal businesses can peak in holidays. Monthly figures across a full year help buyers trust the numbers.',
        },
        {
          title: 'Prepare for lifestyle buyers',
          text: 'Many buyers are moving from capital cities. A clear information pack and well-documented systems help them commit from a distance.',
        },
        {
          title: 'Show your growth',
          text: 'In a growing region, rising revenue and customer numbers support your price. Present three years of figures so the trend is clear.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Confirm your lease term and options and discuss assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business on the Sunshine Coast?',
          a: 'Start with a confidential valuation. We prepare the business, approach local and interstate buyers under NDA, negotiate the deal and manage it to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office on the Sunshine Coast?',
          a: 'No. Our office is in Melbourne. We work with Sunshine Coast owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
        },
        {
          q: 'Do you sell businesses in Noosa?',
          a: 'Yes. We act for owners across the Sunshine Coast and Noosa, including tourism, hospitality and retail businesses.',
        },
        {
          q: 'What is my Sunshine Coast business worth?',
          a: 'Value depends on verified earnings, seasonality, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business on the Sunshine Coast QLD with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business sunshine coast',
      keywords: ['businesses for sale sunshine coast', 'sunshine coast business for sale', 'buy a business noosa', 'buyers advisor sunshine coast'],
      title: 'Buy a Business Sunshine Coast, QLD | Blackmont Advisory',
      description:
        'Want to buy a business on the Sunshine Coast? Blackmont Advisory finds businesses from Caloundra to Noosa, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business on the Sunshine Coast',
      intro:
        'Looking to buy a business on the Sunshine Coast? We act only for buyers, including those relocating from interstate. We find suitable businesses, test the figures and negotiate the price and terms.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Help for interstate buyers',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business on the Sunshine Coast',
      overview: [
        'The Sunshine Coast attracts buyers looking for a coastal lifestyle with a growing market. Maroochydore, Mooloolaba, Caloundra and Noosa support cafes, restaurants, tourism and retail.',
        'Health, education, construction and trades are also strong, supported by the university, the hospital at Birtinya and steady population growth.',
        'We work with buyers by phone and video, coordinate inspections, and help you make sure the price reflects what the business earns all year round.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, tourism, health and trade businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy on the Sunshine Coast',
      tipsIntro: 'Questions we ask on every Sunshine Coast purchase.',
      tips: [
        {
          title: 'Check the quiet months',
          text: 'Ask for monthly sales across a full year and make sure the business covers its costs outside peak season.',
        },
        {
          title: 'Test owner dependence',
          text: 'Find out how much the business relies on the current owner and plan a proper handover.',
        },
        {
          title: 'Pay for today, not the forecast',
          text: 'Population growth is a bonus. Base your price on verified current earnings, not projections.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale on the Sunshine Coast?',
          a: 'Common opportunities include cafes and restaurants, tourism operators, retail, health, childcare and trades. We also approach owners off-market for you.',
        },
        {
          q: 'Can I buy a Sunshine Coast business from interstate?',
          a: 'Yes. We work by phone and video, coordinate inspections and manage due diligence so you can buy before you relocate.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is the Sunshine Coast a good place to buy a business?',
          a: 'It offers population growth and strong lifestyle appeal. The key is buying proven, year-round earnings at a fair price.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business on the Sunshine Coast QLD with Blackmont Advisory',
    },
  },

  /* ── Toowoomba ────────────────────────────────────────────── */
  {
    slug: 'toowoomba',
    name: 'Toowoomba',
    city: 'brisbane',
    nearby: ['ipswich', 'logan', 'brisbane-cbd', 'chermside'],
    sell: {
      keyword: 'sell a business toowoomba',
      keywords: ['business broker toowoomba', 'sell my business toowoomba', 'sell an agribusiness queensland', 'toowoomba business for sale'],
      title: 'Sell a Business in Toowoomba, QLD | Blackmont Advisory',
      description:
        'Selling a business in Toowoomba? Blackmont Advisory values and sells Toowoomba and Darling Downs businesses confidentially to buyers across Australia.',
      h1: 'Sell a Business in Toowoomba',
      intro:
        'Planning to sell your Toowoomba business? We are a business sale advisor working with Queensland owners. We value your business, prepare it for buyers and run a confidential sale with one senior advisor.',
      points: [
        'Senior advisor from start to settlement',
        'Buyers from Queensland and across Australia',
        'Every buyer under NDA and approved by you',
        'Fees agreed in writing upfront',
      ],
      overviewHeading: 'Selling a business in Toowoomba',
      overview: [
        'Toowoomba is the regional capital of the Darling Downs and one of Australia’s largest inland cities. Ruthven Street, Margaret Street and Grand Central support retail, hospitality and services for the city and a wide rural catchment.',
        'Agriculture drives much of the local economy, supporting agribusiness, machinery, transport, food processing and rural services. The University of Southern Queensland, the city’s hospitals and Toowoomba Wellcamp Airport add education, health and freight.',
        REMOTE,
      ],
      highlights: [
        'Sales of agribusiness, transport, retail and service businesses',
        'Buyers screened and approved by you',
        'Trade buyers and investors in our network',
        'A confidential process from first call to settlement',
      ],
      tipsHeading: 'Preparing a Toowoomba business for sale',
      tipsIntro: 'What buyers look for in regional Queensland businesses.',
      tips: [
        {
          title: 'Explain seasonal and drought cycles',
          text: 'Agribusiness and rural services can swing with seasons and conditions. Several years of figures help buyers see the long-term picture.',
        },
        {
          title: 'Keep an asset register',
          text: 'For machinery, transport and food businesses, list equipment and vehicles with condition, finance owing and service history.',
        },
        {
          title: 'Plan for a smaller buyer pool',
          text: 'Regional businesses often sell to local operators or interstate buyers moving to the area. Good preparation widens your market.',
        },
        {
          title: 'Show it runs without you',
          text: 'Regional buyers value a stable team. Document systems and bring staff into key customer relationships before you sell.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Toowoomba?',
          a: 'Start with a confidential valuation. We prepare the business, approach qualified buyers under NDA, negotiate the deal and manage it through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Toowoomba?',
          a: 'No. Our office is in Melbourne. We work with Toowoomba owners by phone and video, meet in person when a deal needs it, and reach buyers across Australia.',
        },
        {
          q: 'Can you sell an agribusiness or rural services business?',
          a: 'Yes. We present several years of trading to show performance across seasons, and approach trade buyers, investors and operators who understand the sector.',
        },
        {
          q: 'What is my Toowoomba business worth?',
          a: 'Value depends on verified earnings over time, assets, the lease and how much depends on you. We start with a realistic appraisal.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Toowoomba QLD with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business toowoomba',
      keywords: ['businesses for sale toowoomba', 'toowoomba business for sale', 'buy an agribusiness queensland', 'regional businesses for sale qld'],
      title: 'Buy a Business in Toowoomba, QLD | Blackmont Advisory',
      description:
        'Looking to buy a business in Toowoomba? Blackmont Advisory finds Toowoomba and Darling Downs businesses, checks the numbers and negotiates the deal for you.',
      h1: 'Buy a Business in Toowoomba',
      intro:
        'Looking to buy a business in Toowoomba? We act only for buyers. We find suitable businesses, run due diligence with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Due diligence before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Toowoomba',
      overview: [
        'Toowoomba offers buyers a large regional city with lower prices than Brisbane. The CBD and Grand Central support retail, hospitality and services for the city and the Darling Downs.',
        'Agribusiness, machinery, transport and food processing are major sectors, supported by the region’s farms, the university and freight links through Wellcamp.',
        'We work with buyers by phone and video, meet in person when a deal needs it, and help you check earnings across good and lean seasons.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Agribusiness, transport, retail and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Toowoomba',
      tipsIntro: 'Questions we ask on every regional Queensland purchase.',
      tips: [
        {
          title: 'Look at several years of trade',
          text: 'Rural-linked businesses can swing with seasons. Ask for at least three years of figures to see how the business handles lean years.',
        },
        {
          title: 'Inspect machinery and vehicles',
          text: 'Have assets inspected and valued, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Check key customer relationships',
          text: 'In regional towns, customers often deal with the owner personally. Plan a handover and consider linking part of the price to results.',
        },
        {
          title: 'Review the lease or property',
          text: 'Confirm the lease term and options, or whether the property is available to buy or lease.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Toowoomba?',
          a: 'Common opportunities include agribusiness and rural services, machinery and transport, food processing, retail, hospitality and health. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Toowoomba?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is buying a regional business a good idea?',
          a: 'It can be. Regional businesses often sell at lower multiples with loyal customers. The key is testing earnings across seasons and planning the handover.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Toowoomba QLD with Blackmont Advisory',
    },
  },
];
