import type { SuburbEntry } from './types';

/**
 * Melbourne part D: Collins Street (CBD) and the north and west: Preston,
 * Eltham, Essendon, Footscray, Werribee, Tullamarine. Each sell and buy page
 * is written on its own. FAQs open with a direct answer so search and answer
 * engines can quote them. No invented deals, figures or postcodes.
 */

const LICENCE = 'Licensed business agent, BLA 092153L';

export const MELBOURNE_D: SuburbEntry[] = [
  /* ── Collins Street ───────────────────────────────────────── */
  {
    slug: 'collins-street',
    name: 'Collins Street',
    city: 'melbourne',
    nearby: ['melbourne-cbd', 'southbank', 'docklands', 'south-melbourne'],
    sell: {
      keyword: 'sell a business collins street',
      keywords: ['business broker collins street melbourne', 'sell a professional services firm melbourne', 'sell my business melbourne cbd', 'm&a advisor collins street'],
      title: 'Sell a Business on Collins Street | Blackmont Advisory',
      description:
        'Selling a business on Collins Street, Melbourne? Blackmont Advisory sells professional, financial and retail businesses confidentially to qualified buyers.',
      h1: 'Sell a Business on Collins Street',
      intro:
        'Selling a firm or business on Collins Street? We are a Melbourne business sale and M&A advisor based in Toorak. We value your business, prepare it for buyers and run a confidential sale, with one senior advisor from start to finish.',
      points: [
        'Senior-led, confidential sale process',
        'Private equity, family offices and trade buyers',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business on Collins Street',
      overview: [
        'Collins Street is Melbourne’s best-known business address. The east end, often called the Paris end, holds luxury retail, medical specialists and boutique advisory firms, while the middle and west end carry banks, law firms, accountants, consultancies and technology businesses up to Collins Square and Docklands.',
        'Businesses here are often sold to other firms, private equity or strategic buyers rather than first-time owners. Those buyers look closely at client contracts, recurring fees, the team and how much depends on the founders.',
        'We prepare your firm for that level of scrutiny, approach suitable buyers one by one under NDA, and keep the sale quiet so clients and staff hear about it only when you decide.',
      ],
      highlights: [
        'Sales of professional, financial, technology and retail businesses',
        'Private investors, family offices and private equity in our network',
        'Information memorandum and data room prepared for you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Collins Street business for sale',
      tipsIntro: 'What corporate and strategic buyers expect to see from a CBD firm.',
      tips: [
        {
          title: 'Show recurring revenue',
          text: 'Retainers, subscriptions and long-term client contracts are worth more than one-off project fees. Break revenue down so buyers can see what repeats each year.',
        },
        {
          title: 'Reduce key person risk',
          text: 'If clients deal only with the founders, buyers will discount the price or ask for a long earn-out. Bring senior staff into client relationships well before a sale.',
        },
        {
          title: 'Check change of control clauses',
          text: 'Client contracts, leases and finance agreements can require consent if the business changes hands. Review them early so they do not delay the deal.',
        },
        {
          title: 'Get your data room ready',
          text: 'Corporate buyers run detailed due diligence. Organised financials, contracts, employment records and IP ownership make the process faster and protect your price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a professional services firm on Collins Street?',
          a: 'Start with a confidential valuation and a plan for how clients and staff will transfer. We then prepare an information memorandum, approach strategic buyers, firms and investors under NDA, and negotiate the deal through to completion.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Who buys businesses in the Melbourne CBD?',
          a: 'Typical buyers are larger firms looking to grow by acquisition, private equity and family offices, and experienced operators. The best buyer depends on your size, sector and how much the business relies on its owners.',
        },
        {
          q: 'Can I sell my business without clients or staff finding out?',
          a: 'Yes. We describe the business without its name, every buyer signs a confidentiality agreement, and you approve each buyer before any detail is shared.',
        },
        {
          q: 'How is a Collins Street business valued?',
          a: 'Most are valued on a multiple of maintainable earnings, adjusted for recurring revenue, client concentration, growth and owner dependence. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers on Collins Street representing sell a business with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business collins street',
      keywords: ['buy a business melbourne cbd', 'acquire a professional services firm melbourne', 'buy side advisor melbourne', 'businesses for sale melbourne cbd'],
      title: 'Buy a Business on Collins Street | Blackmont Advisory',
      description:
        'Looking to buy a business on Collins Street? Blackmont Advisory finds CBD firms and businesses, runs due diligence and negotiates the deal in your interest.',
      h1: 'Buy a Business on Collins Street',
      intro:
        'Looking to acquire a firm or business on Collins Street? We act only for buyers. We find suitable targets, including ones never advertised, test the figures and negotiate the price and terms through to completion.',
      points: [
        'Buy-side advice only',
        'Listed and off-market targets',
        'Due diligence before you commit',
        'One senior advisor for the whole acquisition',
      ],
      overviewHeading: 'Buying a business on Collins Street',
      overview: [
        'Collins Street offers buyers established professional, financial, technology and premium retail businesses at Melbourne’s most recognised address. Many of the best are sold privately, firm to firm, and never appear on a listing site.',
        'For acquirers, the key questions are how much revenue repeats, how loyal clients are to the firm rather than its partners, and whether the team will stay after the sale.',
        'We help you find the right target, test those risks, and structure the price so you pay for the business you actually receive.',
      ],
      highlights: [
        'Advice for the buyer only, with no seller to please',
        'Access to off-market CBD opportunities',
        'Earn-outs and deal structures that share the risk',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy on Collins Street',
      tipsIntro: 'Questions we ask on every CBD acquisition.',
      tips: [
        {
          title: 'Test client concentration',
          text: 'Find out how much revenue comes from the top five clients and whether their contracts can be ended on a change of ownership.',
        },
        {
          title: 'Lock in key people',
          text: 'In professional firms, value walks out the door with senior staff. Agree retention arrangements for key people as part of the deal.',
        },
        {
          title: 'Use an earn-out where it fits',
          text: 'If revenue depends on the sellers, link part of the price to results after settlement so you share the risk.',
        },
        {
          title: 'Review the lease and fit-out',
          text: 'CBD leases can be long and expensive. Check the term, make-good obligations and whether the space suits your plans.',
        },
      ],
      faqs: [
        {
          q: 'How do I buy a business on Collins Street?',
          a: 'Define what you want to buy and your budget, then let us search listed and off-market firms. We review the figures, run due diligence with your advisers and negotiate the price and terms for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you find off-market businesses in the Melbourne CBD?',
          a: 'Yes. Many CBD firms sell privately. We approach owners confidentially on your behalf when they match your brief.',
        },
        {
          q: 'What is an earn-out when buying a business?',
          a: 'An earn-out is part of the purchase price paid later, based on how the business performs after settlement. It protects the buyer when revenue depends on the seller or key clients.',
        },
        {
          q: 'Do I need a buy-side advisor for an acquisition?',
          a: 'It is not required, but the seller’s advisor works for the seller. A buy-side advisor tests the numbers, finds the risks and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers on Collins Street representing buy a business with Blackmont Advisory',
    },
  },

  /* ── Preston ──────────────────────────────────────────────── */
  {
    slug: 'preston',
    name: 'Preston',
    city: 'melbourne',
    nearby: ['brunswick', 'fitzroy', 'eltham', 'essendon'],
    sell: {
      keyword: 'sell a business preston',
      keywords: ['business broker preston', 'sell my business preston vic', 'business sale advisor northern suburbs', 'preston business for sale'],
      title: 'Sell a Business in Preston, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Preston, VIC? Blackmont Advisory values and sells Preston businesses confidentially, from cafes to trades, with one senior advisor.',
      h1: 'Sell a Business in Preston',
      intro:
        'Thinking of selling your Preston business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately, with no public listing showing your name.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Preston',
      overview: [
        'Preston is one of the north’s busiest centres. High Street, the Preston Market precinct and Northland Shopping Centre support food, hospitality, retail and services, with a diverse local community behind them.',
        'The suburb and its neighbours also hold trade, construction, automotive and light industrial businesses. These often have loyal customers, skilled staff and equipment that buyers value.',
        'We prepare your sale around the buyers most likely to pay for it, from local owner-operators to groups expanding across the northern suburbs, and keep it confidential throughout.',
      ],
      highlights: [
        'Sales of hospitality, retail, trade and service businesses',
        'Buyers screened and approved by you',
        'Recent Melbourne deals in trade services and transport',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Preston business for sale',
      tipsIntro: 'Practical steps for Preston owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Keep clear records of cash sales',
          text: 'Food and retail businesses often take cash. Buyers and lenders only pay for income they can verify in your accounts, tax returns and BAS.',
        },
        {
          title: 'List your equipment and vehicles',
          text: 'For trade and industrial businesses, a clear register of equipment, vehicles and their condition helps buyers value what they are getting.',
        },
        {
          title: 'Show it runs without you',
          text: 'Document how jobs are quoted, scheduled and completed, and who handles key customers, so a buyer can step in with confidence.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Leases in Victoria usually need the landlord’s consent to assign. Check your term and options before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Preston?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA, negotiate the price and terms and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'How much is my Preston business worth?',
          a: 'Most small businesses are valued on a multiple of what they earn for an owner, adjusted for risk, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Can you sell a trade or industrial business in Preston?',
          a: 'Yes. We sell trade, construction, automotive and light industrial businesses, including preparing equipment registers and plans for transferring customers and staff.',
        },
        {
          q: 'How long does it take to sell a business?',
          a: 'Most sales take several months from preparation to settlement. The lease, the buyer’s finance and how well the business is prepared make the biggest difference.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Preston with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business preston',
      keywords: ['businesses for sale preston', 'preston business for sale', 'buy a cafe preston', 'buyers advisor northern suburbs melbourne'],
      title: 'Buy a Business in Preston, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Preston, VIC? Blackmont Advisory finds listed and off-market Preston businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Preston',
      intro:
        'Looking to buy a business in Preston? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Preston',
      overview: [
        'Preston gives buyers a large, diverse customer base and more affordable entry prices than the inner city. High Street, the Preston Market precinct and Northland support food, hospitality, retail and services.',
        'There are also trade, automotive and light industrial businesses across Preston and its neighbours, often with steady customers and long-serving staff.',
        'We help you work out what the business really earns, how much relies on the owner, and whether the lease and equipment support the price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, retail, trade and industrial businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Preston',
      tipsIntro: 'Tips we share with buyers looking in Melbourne’s north.',
      tips: [
        {
          title: 'Only pay for verified income',
          text: 'If the seller says some sales are not in the books, do not pay for them. Base the price on accounts that match tax returns and BAS.',
        },
        {
          title: 'Inspect equipment and vehicles',
          text: 'Have equipment and vehicles checked and valued. Replacing worn assets soon after you buy can wipe out your first year’s profit.',
        },
        {
          title: 'Check customer concentration',
          text: 'For trade businesses, find out how much work comes from a few builders or contracts, and whether those relationships will stay.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned to you and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Preston?',
          a: 'Common opportunities include cafes, restaurants and food businesses, retail, trades, automotive and light industrial businesses. Many sell privately, so we also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Preston?',
          a: 'Set your brief and budget, then we search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I get finance to buy a business?',
          a: 'Often, yes. Lenders look at the business’s verified earnings, your experience and security. We help prepare the information they need and can structure vendor finance where it suits.',
        },
        {
          q: 'Do I need an advisor to buy a small business?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Preston with Blackmont Advisory',
    },
  },

  /* ── Eltham ───────────────────────────────────────────────── */
  {
    slug: 'eltham',
    name: 'Eltham',
    city: 'melbourne',
    nearby: ['preston', 'balwyn', 'kew', 'fitzroy'],
    sell: {
      keyword: 'sell a business eltham',
      keywords: ['business broker eltham', 'sell my business eltham', 'business sale advisor nillumbik', 'eltham business for sale'],
      title: 'Sell a Business in Eltham, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Eltham? Blackmont Advisory values and sells Eltham and Nillumbik businesses confidentially, with one senior advisor to settlement.',
      h1: 'Sell a Business in Eltham',
      intro:
        'Planning to sell your Eltham business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately to qualified buyers, one at a time.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Eltham',
      overview: [
        'Eltham is a green, family-focused suburb on the edge of Melbourne’s north-east, and the main centre of the Shire of Nillumbik. Main Road and the town centre carry cafes, restaurants, retail, health and services.',
        'The area has a strong local identity and loyal customers, along with trade, landscaping, building and home services businesses that work across the north-east, plus childcare, education and allied health practices.',
        'We prepare each sale around the right buyer, often someone who wants a lifestyle business in the area, and keep the process private so your community hears about it only when you are ready.',
      ],
      highlights: [
        'Sales of hospitality, health, childcare and trade businesses',
        'Buyers screened and approved by you',
        'Private investors and local operators in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing an Eltham business for sale',
      tipsIntro: 'Tips for Eltham owners before they talk to buyers.',
      tips: [
        {
          title: 'Show your local loyalty',
          text: 'Eltham customers are loyal. Repeat-customer, membership or booking figures show buyers the business does not rely on passing trade.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'In a close community, customers may come for you. Bring staff into key relationships and document how the business runs before you sell.',
        },
        {
          title: 'Check licences and permits',
          text: 'Childcare, food and health businesses need approvals that may not transfer automatically. Find out early what a buyer will need.',
        },
        {
          title: 'Organise your financials',
          text: 'Three years of accounts that match tax returns and BAS help buyers secure finance and support a stronger price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Eltham?',
          a: 'Start with a confidential chat and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you sell businesses across Nillumbik?',
          a: 'Yes. We act for owners in Eltham and across the Shire of Nillumbik and Melbourne’s north-east.',
        },
        {
          q: 'Can I sell my business confidentially in a small community?',
          a: 'Yes. We market the business without its name or address, every buyer signs a confidentiality agreement, and you approve each one before any detail is shared.',
        },
        {
          q: 'What is my Eltham business worth?',
          a: 'It depends mainly on reliable earnings, how much depends on you, and the lease. We start with a realistic appraisal based on your figures and current buyer demand.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Eltham with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business eltham',
      keywords: ['businesses for sale eltham', 'eltham business for sale', 'buy a business nillumbik', 'buyers advisor melbourne north east'],
      title: 'Buy a Business in Eltham, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Eltham? Blackmont Advisory finds Eltham and Nillumbik businesses, checks the numbers and negotiates the deal in your interest.',
      h1: 'Buy a Business in Eltham',
      intro:
        'Looking to buy a business in Eltham? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Eltham',
      overview: [
        'Eltham suits buyers looking for a lifestyle business with a loyal local market. The town centre supports cafes, retail, health and services, and the wider area needs trades, landscaping and home services.',
        'Childcare, education and allied health also do well with local families. These can offer steady income but come with approvals, staffing rules and owner relationships to check.',
        'We help you understand what you are buying and negotiate a price that reflects the real risks.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, health, childcare and trade businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Eltham',
      tipsIntro: 'Questions we ask on every Eltham purchase.',
      tips: [
        {
          title: 'Test owner dependence',
          text: 'In a close community, customers may follow the owner. Plan a handover and consider linking part of the price to results.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'For childcare, food and health businesses, check which licences you must apply for and make the sale conditional on getting them.',
        },
        {
          title: 'Look at a full year of trade',
          text: 'Ask for monthly figures across at least a year so seasonal peaks do not hide quieter months.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned, the rent suits turnover, and the term gives you time to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Eltham?',
          a: 'Common opportunities include cafes, retail, childcare, allied health, trades and home services. Many sell privately, so we also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Eltham?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a lifestyle business a good investment?',
          a: 'It can be, if the price matches verified earnings and the business does not rely too heavily on the current owner. We help you test both before you commit.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Eltham with Blackmont Advisory',
    },
  },

  /* ── Essendon ─────────────────────────────────────────────── */
  {
    slug: 'essendon',
    name: 'Essendon',
    city: 'melbourne',
    nearby: ['tullamarine', 'brunswick', 'footscray', 'preston'],
    sell: {
      keyword: 'sell a business essendon',
      keywords: ['business broker essendon', 'sell my business essendon', 'business sale advisor essendon fields', 'essendon business for sale'],
      title: 'Sell a Business in Essendon, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Essendon? Blackmont Advisory values and sells Essendon businesses confidentially, from local retail to aviation and services firms.',
      h1: 'Sell a Business in Essendon',
      intro:
        'Thinking of selling your Essendon business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and run a private sale with one senior advisor throughout.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Essendon',
      overview: [
        'Essendon combines established residential streets with busy shopping strips along Mount Alexander Road and Keilor Road, close to Moonee Ponds. Cafes, retail, health and professional services serve a loyal local market.',
        'Essendon Fields adds a business precinct with aviation, automotive, office and commercial businesses, while trade and service businesses work across the north-west and the airport corridor.',
        'We prepare your sale around the buyers most likely to pay for it, from local operators to groups expanding in Melbourne’s north-west, and keep it confidential from the first conversation.',
      ],
      highlights: [
        'Sales of retail, health, professional and trade businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing an Essendon business for sale',
      tipsIntro: 'Practical steps for Essendon owners before going to market.',
      tips: [
        {
          title: 'Show repeat customers and contracts',
          text: 'Recurring clients and service contracts are worth more than one-off sales. Pull together figures that show how much revenue repeats.',
        },
        {
          title: 'Check any site-specific leases',
          text: 'Businesses in commercial precincts may have leases with special conditions. Confirm term, options and assignment rules early.',
        },
        {
          title: 'Clean up the financials',
          text: 'Buyers want three years of accounts that match tax returns and BAS, with personal and one-off costs clearly separated.',
        },
        {
          title: 'Plan the handover',
          text: 'Decide how long you will stay to introduce the buyer to customers and staff. A clear plan gives buyers confidence.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Essendon?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the deal and manage it through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a business at Essendon Fields?',
          a: 'Yes. We sell commercial, automotive and service businesses, including those in business precincts. We review the lease and any site conditions early so they do not delay the sale.',
        },
        {
          q: 'How much does it cost to sell a business in Melbourne?',
          a: 'Most advisors charge a success fee, and some charge an upfront fee. Ours are agreed in writing before we start, so there are no surprises at settlement.',
          link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
        },
        {
          q: 'Will I pay capital gains tax when I sell?',
          a: 'Usually, yes, although small business CGT concessions can reduce or remove it. Speak to your accountant before you sell.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Essendon with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business essendon',
      keywords: ['businesses for sale essendon', 'essendon business for sale', 'buy a business moonee valley', 'buyers advisor melbourne north west'],
      title: 'Buy a Business in Essendon, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Essendon? Blackmont Advisory finds listed and off-market Essendon businesses, checks the figures and negotiates price and terms.',
      h1: 'Buy a Business in Essendon',
      intro:
        'Looking to buy a business in Essendon? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Essendon',
      overview: [
        'Essendon offers buyers a stable, established customer base, with shopping strips on Mount Alexander Road and Keilor Road and the Moonee Ponds centre close by.',
        'Essendon Fields and the airport corridor add commercial, automotive and service businesses that trade with other businesses, often under ongoing contracts.',
        'We help you understand where revenue comes from, how secure it is, and whether the price is fair for what you are buying.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, health, commercial and trade businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Essendon',
      tipsIntro: 'Tips we share with buyers looking in Melbourne’s north-west.',
      tips: [
        {
          title: 'Review customer contracts',
          text: 'For business-to-business services, check contract terms, renewal dates and whether contracts can end when ownership changes.',
        },
        {
          title: 'Check the lease conditions',
          text: 'Commercial precinct leases can include special rules. Make sure the lease can be assigned and suits how you plan to run the business.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them before you commit.',
        },
        {
          title: 'Look at staff and wages',
          text: 'Confirm awards, entitlements and whether key staff will stay after the sale.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Essendon?',
          a: 'Common opportunities include cafes and retail, health and professional services, automotive, trades and commercial service businesses. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Essendon?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What due diligence should I do before buying?',
          a: 'At a minimum, review three years of accounts, tax returns and BAS, the lease, key contracts, staff and entitlements, and any licences. Your accountant and lawyer should be involved.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Essendon with Blackmont Advisory',
    },
  },

  /* ── Footscray ────────────────────────────────────────────── */
  {
    slug: 'footscray',
    name: 'Footscray',
    city: 'melbourne',
    nearby: ['werribee', 'essendon', 'docklands', 'port-melbourne'],
    sell: {
      keyword: 'sell a business footscray',
      keywords: ['business broker footscray', 'sell my business footscray', 'business broker western suburbs melbourne', 'footscray business for sale'],
      title: 'Sell a Business in Footscray, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Footscray? Blackmont Advisory values and sells Footscray and inner west businesses confidentially, with one senior advisor throughout.',
      h1: 'Sell a Business in Footscray',
      intro:
        'Ready to sell your Footscray business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately to qualified buyers, without a public listing.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Footscray',
      overview: [
        'Footscray is the hub of Melbourne’s inner west. The Footscray Market, Barkly Street and Nicholson Street carry food, grocery, hospitality and retail businesses that reflect one of the city’s most diverse communities.',
        'Victoria University and the hospital bring students, staff and visitors, while the nearby port and industrial areas support logistics, wholesale, trade and transport businesses.',
        'We prepare your sale around the right buyer, whether a local operator, a migrant family business looking to grow, or a group expanding across the west, and keep it confidential throughout.',
      ],
      highlights: [
        'Sales of food, retail, wholesale, transport and trade businesses',
        'Recent Melbourne deals in transport and trade services',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Footscray business for sale',
      tipsIntro: 'Practical steps for inner west owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Record all sales clearly',
          text: 'Food and grocery businesses often take cash. Buyers and lenders only pay for income that appears in your accounts, tax returns and BAS.',
        },
        {
          title: 'Document supplier relationships',
          text: 'Importers, wholesalers and grocers often rely on long-standing supplier terms. Show that these will continue for a new owner.',
        },
        {
          title: 'List equipment and vehicles',
          text: 'For transport and trade businesses, keep a register of vehicles and equipment with their condition and service history.',
        },
        {
          title: 'Check your lease',
          text: 'Confirm your remaining term and options, and talk to your landlord about assignment before buyers start asking.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Footscray?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the price and terms and manage the sale to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a transport or wholesale business in the inner west?',
          a: 'Yes. We sell transport, logistics, wholesale and trade businesses, including preparing asset registers and plans for transferring contracts, customers and staff.',
        },
        {
          q: 'How much is my Footscray business worth?',
          a: 'Most businesses are valued on a multiple of verified earnings, adjusted for risk, the lease and how much depends on the owner. We start with a realistic appraisal.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Can I sell my business without staff knowing?',
          a: 'Yes. Buyers see an anonymous summary first, sign a confidentiality agreement, and are approved by you before learning the business name.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Footscray with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business footscray',
      keywords: ['businesses for sale footscray', 'footscray business for sale', 'buy a business inner west melbourne', 'buyers advisor western suburbs'],
      title: 'Buy a Business in Footscray, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Footscray? Blackmont Advisory finds inner west businesses, checks the numbers and negotiates price and terms in your interest.',
      h1: 'Buy a Business in Footscray',
      intro:
        'Looking to buy a business in Footscray? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Footscray',
      overview: [
        'Footscray gives buyers a busy, diverse market at lower prices than much of inner Melbourne. Food, grocery, hospitality and retail businesses trade around the market and along Barkly and Nicholson Streets.',
        'The inner west also offers transport, logistics, wholesale and trade businesses close to the port and freeways, often with steady business customers.',
        'We help you check what the business truly earns, how secure its customers and suppliers are, and whether the price is fair.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Food, retail, transport, wholesale and trade businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Footscray',
      tipsIntro: 'Tips we share with buyers looking in the inner west.',
      tips: [
        {
          title: 'Do not pay for unrecorded sales',
          text: 'Base the price only on income shown in the accounts, tax returns and BAS. Unrecorded cash cannot be verified or financed.',
        },
        {
          title: 'Check supplier terms',
          text: 'Confirm that key supplier accounts and pricing will continue under new ownership.',
        },
        {
          title: 'Inspect vehicles and equipment',
          text: 'Have assets inspected and valued, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Footscray?',
          a: 'Common opportunities include restaurants and food businesses, grocers, retail, wholesale, transport and trade businesses. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Footscray?',
          a: 'Set your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I buy a transport business with vendor finance?',
          a: 'Sometimes. Vendor finance means the seller is paid part of the price over time. It can help with funding and shows the seller’s confidence in the business.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Footscray with Blackmont Advisory',
    },
  },

  /* ── Werribee ─────────────────────────────────────────────── */
  {
    slug: 'werribee',
    name: 'Werribee',
    city: 'melbourne',
    nearby: ['footscray', 'tullamarine', 'essendon', 'port-melbourne'],
    sell: {
      keyword: 'sell a business werribee',
      keywords: ['business broker werribee', 'sell my business werribee', 'business broker wyndham', 'werribee business for sale'],
      title: 'Sell a Business in Werribee, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Werribee? Blackmont Advisory values and sells Werribee and Wyndham businesses confidentially, with one senior advisor to settlement.',
      h1: 'Sell a Business in Werribee',
      intro:
        'Thinking of selling your Werribee business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Werribee',
      overview: [
        'Werribee is the main centre of the City of Wyndham, one of Melbourne’s fastest-growing areas. Watton Street, Pacific Werribee and surrounding centres support retail, hospitality, health and services for a growing population.',
        'Population growth also drives demand for childcare, education, trades, construction and home services, while industrial areas hold manufacturing, transport and agricultural businesses.',
        'We prepare your sale to show buyers both current earnings and the growth around you, and keep the process confidential from start to finish.',
      ],
      highlights: [
        'Sales of childcare, health, trade, transport and retail businesses',
        'Recent Melbourne deals in transport and trade services',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Werribee business for sale',
      tipsIntro: 'Practical steps for Werribee and Wyndham owners.',
      tips: [
        {
          title: 'Show your growth trend',
          text: 'In a growing area, buyers want to see rising revenue and customer numbers. Present three years of figures so the trend is clear.',
        },
        {
          title: 'Document your team and systems',
          text: 'Trade and service businesses sell for more when jobs, scheduling and quoting run without the owner on every site.',
        },
        {
          title: 'Check licences and approvals',
          text: 'Childcare, food and health businesses need approvals that may not transfer automatically. Plan for this in your timeline.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Confirm your lease term and options and discuss assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Werribee?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you sell businesses across Wyndham?',
          a: 'Yes. We act for owners in Werribee, Hoppers Crossing, Point Cook, Tarneit and across the City of Wyndham and Melbourne’s west.',
        },
        {
          q: 'Can you sell a childcare business in Werribee?',
          a: 'Yes. We prepare the sale, show occupancy and staffing clearly, and find suitable buyers. Approvals and regulatory transfers are handled with your lawyer and the relevant authority.',
        },
        {
          q: 'What is my Werribee business worth?',
          a: 'Value depends on reliable earnings, growth, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Werribee with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business werribee',
      keywords: ['businesses for sale werribee', 'werribee business for sale', 'buy a business wyndham', 'buyers advisor western suburbs melbourne'],
      title: 'Buy a Business in Werribee, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Werribee? Blackmont Advisory finds Werribee and Wyndham businesses, checks the figures and negotiates the deal for you only.',
      h1: 'Buy a Business in Werribee',
      intro:
        'Looking to buy a business in Werribee? We act only for buyers. We find suitable businesses in a fast-growing area, test the figures with you and negotiate the price and terms.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Werribee',
      overview: [
        'Werribee and the wider City of Wyndham are among Melbourne’s fastest-growing areas, creating demand for childcare, health, retail, food, trades and home services.',
        'Industrial and rural areas nearby also offer manufacturing, transport and agricultural businesses for buyers with the right experience.',
        'Growth is attractive, but you should only pay for earnings the business already makes. We help you test the figures and negotiate a fair price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Childcare, health, trade, transport and retail businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Werribee',
      tipsIntro: 'Questions we ask on every purchase in Melbourne’s west.',
      tips: [
        {
          title: 'Pay for today, not the forecast',
          text: 'Growth in the area is a bonus for you. Base your price on verified current earnings, not the seller’s projections.',
        },
        {
          title: 'Check new competition',
          text: 'Growing suburbs attract new competitors. Look at planned shopping centres and new businesses nearby.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'For childcare, food and health, check which licences you must apply for and make the sale conditional on getting them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Werribee?',
          a: 'Common opportunities include childcare, health practices, cafes and food, retail, trades, transport and manufacturing. We also approach owners off-market for you.',
        },
        {
          q: 'Is Werribee a good place to buy a business?',
          a: 'Strong population growth supports demand for local services. The key is to buy a business with proven earnings at a fair price, not to pay upfront for growth that has not happened yet.',
        },
        {
          q: 'How do I buy a business in Werribee?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Werribee with Blackmont Advisory',
    },
  },

  /* ── Tullamarine ──────────────────────────────────────────── */
  {
    slug: 'tullamarine',
    name: 'Tullamarine',
    city: 'melbourne',
    nearby: ['essendon', 'footscray', 'werribee', 'brunswick'],
    sell: {
      keyword: 'sell a business tullamarine',
      keywords: ['business broker tullamarine', 'sell a logistics business melbourne', 'sell a transport business melbourne', 'tullamarine business for sale'],
      title: 'Sell a Business Tullamarine, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Tullamarine? Blackmont Advisory sells logistics, transport, manufacturing and industrial businesses confidentially to qualified buyers.',
      h1: 'Sell a Business in Tullamarine',
      intro:
        'Planning to sell your Tullamarine business? We are a Melbourne business sale and M&A advisor. We value your business, prepare it for buyers and run a confidential sale to trade buyers, investors and private equity.',
      points: [
        'Senior advisor from start to settlement',
        'Trade buyers, investors and private equity',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Tullamarine',
      overview: [
        'Tullamarine sits beside Melbourne Airport and is one of the city’s key industrial and freight areas. Its estates hold logistics, freight forwarding, warehousing, transport, manufacturing and wholesale businesses.',
        'Businesses here often trade with other businesses under contracts, run fleets and equipment, and employ skilled teams. That makes them attractive to competitors, larger logistics groups and investors.',
        'We prepare your sale around those buyers, present your contracts, assets and team clearly, and keep the process confidential so customers and staff are not unsettled.',
      ],
      highlights: [
        'Sales of logistics, transport, manufacturing and wholesale businesses',
        'Recent Melbourne deals in transport',
        'Private equity and trade buyers in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Tullamarine business for sale',
      tipsIntro: 'What trade and investor buyers check in industrial businesses.',
      tips: [
        {
          title: 'Show contract strength',
          text: 'List your major customers, contract terms and renewal dates. Long, secure contracts are often the biggest driver of value.',
        },
        {
          title: 'Keep a full asset register',
          text: 'Record every vehicle, forklift and machine with age, condition, finance owing and service history.',
        },
        {
          title: 'Check compliance records',
          text: 'Chain of responsibility, workplace safety and any customs or freight licences should be up to date and easy for buyers to review.',
        },
        {
          title: 'Review your warehouse lease',
          text: 'Industrial leases are critical to these businesses. Confirm term, options, make-good obligations and assignment rules early.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a logistics or transport business in Melbourne?',
          a: 'Start with a confidential valuation, then prepare clear records of contracts, assets and compliance. We approach trade buyers, investors and private equity under NDA and negotiate the deal through to completion.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Who buys industrial businesses in Tullamarine?',
          a: 'Typical buyers are competitors, larger logistics and manufacturing groups, private equity and experienced operators looking for a business with contracts and assets in place.',
        },
        {
          q: 'How are transport and logistics businesses valued?',
          a: 'Usually on a multiple of maintainable earnings, with adjustments for customer concentration, contract terms and the condition of the fleet and equipment.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Can I sell without my customers finding out?',
          a: 'Yes. Buyers first see an anonymous summary, then sign a confidentiality agreement and are approved by you before any detail is shared.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Tullamarine with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business tullamarine',
      keywords: ['businesses for sale tullamarine', 'buy a logistics business melbourne', 'buy a transport business melbourne', 'industrial businesses for sale melbourne'],
      title: 'Buy a Business Tullamarine, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Tullamarine? Blackmont Advisory finds logistics, transport and industrial businesses and negotiates the deal in your interest.',
      h1: 'Buy a Business in Tullamarine',
      intro:
        'Looking to acquire a business in Tullamarine? We act only for buyers. We find suitable logistics, transport and industrial businesses, run due diligence with you and negotiate the price and terms.',
      points: [
        'Buy-side advice only',
        'Listed and off-market targets',
        'Due diligence before you commit',
        'One senior advisor for the whole acquisition',
      ],
      overviewHeading: 'Buying a business in Tullamarine',
      overview: [
        'Tullamarine, next to Melbourne Airport, is a hub for freight, logistics, warehousing, transport and manufacturing. Many businesses here have contracts, fleets and skilled teams already in place.',
        'For buyers, that can mean a faster route to scale than starting from scratch. It also means checking contracts, assets and compliance carefully before you commit.',
        'We help you find the right target, test those risks and structure the deal to protect you.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Logistics, transport, manufacturing and wholesale businesses',
        'Access to off-market industrial opportunities',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Tullamarine',
      tipsIntro: 'Questions we ask on every industrial acquisition.',
      tips: [
        {
          title: 'Read the key contracts',
          text: 'Check how long major contracts run, how they can be ended and whether they need consent when ownership changes.',
        },
        {
          title: 'Inspect the fleet and equipment',
          text: 'Have vehicles and machinery inspected. Factor upcoming replacements and finance owing into your offer.',
        },
        {
          title: 'Review compliance',
          text: 'Check chain of responsibility, safety records and any licences the business needs to operate.',
        },
        {
          title: 'Understand the lease',
          text: 'Confirm the lease term, options and make-good obligations on the site, and whether it suits your growth plans.',
        },
      ],
      faqs: [
        {
          q: 'How do I buy a logistics business in Melbourne?',
          a: 'Define your target size, services and budget. We search listed and off-market businesses, review contracts and assets, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you find off-market industrial businesses?',
          a: 'Yes. Many owners of established industrial businesses sell privately. We approach suitable owners confidentially on your behalf.',
        },
        {
          q: 'What due diligence is needed for a transport business?',
          a: 'Review financial accounts, customer contracts, the fleet and its finance, driver and safety compliance, licences and the lease. Your accountant and lawyer should be involved.',
        },
        {
          q: 'Should I use a buy-side advisor?',
          a: 'It is not required, but the seller’s advisor works for the seller. A buy-side advisor tests the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Tullamarine with Blackmont Advisory',
    },
  },
];
