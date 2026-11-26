import type { SuburbEntry } from './types';

/**
 * Melbourne part E, the east: Box Hill, Blackburn, Doncaster, Doncaster East,
 * Glen Waverley, Mount Waverley, Oakleigh. Each sell and buy page is written on
 * its own. FAQs open with a direct answer so search and answer engines can
 * quote them. No invented deals, figures or postcodes.
 */

const LICENCE = 'Licensed business agent, BLA 092153L';

export const MELBOURNE_E: SuburbEntry[] = [
  /* ── Box Hill ─────────────────────────────────────────────── */
  {
    slug: 'box-hill',
    name: 'Box Hill',
    city: 'melbourne',
    nearby: ['blackburn', 'doncaster', 'glen-waverley', 'balwyn'],
    sell: {
      keyword: 'sell a business box hill',
      keywords: ['business broker box hill', 'sell my business box hill', 'business broker whitehorse', 'box hill business for sale'],
      title: 'Sell a Business in Box Hill, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Box Hill? Blackmont Advisory values and sells Box Hill businesses confidentially, from restaurants to clinics, with one senior advisor.',
      h1: 'Sell a Business in Box Hill',
      intro:
        'Thinking of selling your Box Hill business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Box Hill',
      overview: [
        'Box Hill is the commercial heart of the City of Whitehorse and one of Melbourne’s largest suburban centres. Box Hill Central, Whitehorse Road and Station Street are packed with restaurants, grocers, retail and services, many serving the area’s large Chinese and Asian communities.',
        'Box Hill Hospital, Epworth Eastern and Box Hill Institute bring thousands of workers, patients and students each day, supporting medical, allied health, education and professional businesses, along with growing office towers around the station.',
        'We prepare your sale around the buyers most likely to pay for it, including buyers from Melbourne’s Asian business community and investors, and keep it confidential from the first conversation.',
      ],
      highlights: [
        'Sales of hospitality, health, education and retail businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Box Hill business for sale',
      tipsIntro: 'Practical steps for Box Hill owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Record every sale',
          text: 'Restaurants and grocers often take cash. Buyers and lenders only pay for income that shows in your accounts, tax returns and BAS.',
        },
        {
          title: 'Show steady foot traffic',
          text: 'Trade near the station, hospital and institute is a real asset. Monthly sales across a full year help buyers see how consistent it is.',
        },
        {
          title: 'Check licences and permits',
          text: 'Food, liquor, health and education businesses need approvals that may not transfer automatically. Find out early what a buyer will need.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Sites around Box Hill Central are in demand. Confirm your lease term and options and raise assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Box Hill?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the price and terms and manage the sale to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a restaurant or food business in Box Hill?',
          a: 'Yes. We sell restaurants, cafes, grocers and food businesses, and help you present verified sales, the lease and licences so buyers can get finance.',
        },
        {
          q: 'What is my Box Hill business worth?',
          a: 'It depends mainly on verified earnings, the lease and how much depends on you. We start with a realistic appraisal based on your figures and current buyer demand.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Can I sell my business confidentially?',
          a: 'Yes. Buyers first see an anonymous summary, sign a confidentiality agreement and are approved by you before learning the business name.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Box Hill with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business box hill',
      keywords: ['businesses for sale box hill', 'box hill business for sale', 'buy a restaurant box hill', 'buyers advisor eastern suburbs melbourne'],
      title: 'Buy a Business in Box Hill, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Box Hill? Blackmont Advisory finds listed and off-market Box Hill businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Box Hill',
      intro:
        'Looking to buy a business in Box Hill? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Box Hill',
      overview: [
        'Box Hill gives buyers one of the busiest customer bases in Melbourne’s east. Box Hill Central, Whitehorse Road and Station Street support restaurants, grocers, retail and services all week.',
        'The hospital precinct and Box Hill Institute add demand for health, education, tutoring and professional services, and new office and apartment towers keep bringing people into the centre.',
        'We help you work out what a business truly earns, how much depends on the owner, and whether the lease supports the price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, health, education and retail businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Box Hill',
      tipsIntro: 'Tips we share with buyers looking in Box Hill.',
      tips: [
        {
          title: 'Only pay for recorded income',
          text: 'If a seller says some sales are not in the books, do not pay for them. Base the price on accounts that match tax returns and BAS.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Prime Box Hill rents can be high. Work out rent as a share of sales and compare it with similar businesses.',
        },
        {
          title: 'Confirm licences transfer',
          text: 'For food, liquor, health and education, check which approvals you must apply for and make the sale conditional on getting them.',
        },
        {
          title: 'Check new competition',
          text: 'Box Hill keeps growing. Look at new developments and businesses opening nearby before you agree on a price.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Box Hill?',
          a: 'Common opportunities include restaurants and food businesses, grocers, retail, tutoring and education, and health practices. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Box Hill?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I get finance to buy a restaurant?',
          a: 'Often, if the sales are verified in the accounts and you have relevant experience. We help prepare the information lenders need and can structure vendor finance where it suits.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Box Hill with Blackmont Advisory',
    },
  },

  /* ── Blackburn ────────────────────────────────────────────── */
  {
    slug: 'blackburn',
    name: 'Blackburn',
    city: 'melbourne',
    nearby: ['box-hill', 'ringwood', 'mount-waverley', 'doncaster-east'],
    sell: {
      keyword: 'sell a business blackburn',
      keywords: ['business broker blackburn', 'sell my business blackburn', 'business sale advisor whitehorse', 'blackburn business for sale'],
      title: 'Sell a Business in Blackburn, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Blackburn? Blackmont Advisory values and sells Blackburn businesses confidentially, from local services to light industrial firms.',
      h1: 'Sell a Business in Blackburn',
      intro:
        'Planning to sell your Blackburn business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and run a private sale with one senior advisor throughout.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Blackburn',
      overview: [
        'Blackburn is a leafy suburb in the City of Whitehorse, known for Blackburn Lake Sanctuary and its tree-lined streets. The village around South Parade and the station carries cafes, retail, health and local services.',
        'The suburb and its neighbours also hold light industrial and commercial areas with manufacturing, wholesale, trade and service businesses that sell to other businesses across the east.',
        'We prepare your sale around the right buyer, from a local owner-operator to a competitor or investor, and keep it confidential so customers and staff are not unsettled.',
      ],
      highlights: [
        'Sales of service, health, trade and light industrial businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Blackburn business for sale',
      tipsIntro: 'Tips for Blackburn owners before going to market.',
      tips: [
        {
          title: 'Show your key customers',
          text: 'For business-to-business firms, list major customers, how long they have stayed and how much revenue each brings. Buyers want to see it is not too concentrated.',
        },
        {
          title: 'Keep an equipment register',
          text: 'Record machinery, vehicles and tools with their age, condition and any finance owing, so buyers can value the assets.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Document how quoting, production and delivery work, and bring staff into key customer relationships before you sell.',
        },
        {
          title: 'Organise your financials',
          text: 'Three years of accounts that match tax returns and BAS help buyers secure finance and support a stronger price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Blackburn?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a manufacturing or wholesale business in Blackburn?',
          a: 'Yes. We sell manufacturing, wholesale and trade businesses, including preparing asset registers and plans for transferring customers, suppliers and staff.',
        },
        {
          q: 'How long does it take to sell a business?',
          a: 'Most sales take several months from preparation to settlement. Good records, a clear lease and realistic pricing make the biggest difference.',
        },
        {
          q: 'How much does it cost to sell a business?',
          a: 'Fees depend on the size and complexity of the sale. We agree them in writing before we start, so there are no surprises.',
          link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Blackburn with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business blackburn',
      keywords: ['businesses for sale blackburn', 'blackburn business for sale', 'buy a manufacturing business melbourne east', 'buyers advisor whitehorse'],
      title: 'Buy a Business in Blackburn, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Blackburn? Blackmont Advisory finds Blackburn businesses, checks the numbers and negotiates price and terms in your interest.',
      h1: 'Buy a Business in Blackburn',
      intro:
        'Looking to buy a business in Blackburn? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Blackburn',
      overview: [
        'Blackburn offers buyers a settled, family market around the South Parade village, with cafes, retail, health and local services.',
        'Its light industrial and commercial areas add manufacturing, wholesale and trade businesses that often have long-standing business customers and skilled staff.',
        'We help you test where revenue comes from, how secure it is, and whether equipment and the lease support the price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Service, health, trade and light industrial businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Blackburn',
      tipsIntro: 'Questions we ask on every Blackburn purchase.',
      tips: [
        {
          title: 'Check customer concentration',
          text: 'Find out how much revenue comes from the top few customers and whether those relationships will stay after the sale.',
        },
        {
          title: 'Inspect equipment',
          text: 'Have machinery and vehicles inspected and valued, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Verify the accounts',
          text: 'Ask for three years of statements that match tax returns and BAS, and have your accountant review them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and the site suits your plans, including any make-good obligations.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Blackburn?',
          a: 'Common opportunities include cafes, retail, health practices, trades, manufacturing and wholesale businesses. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Blackburn?',
          a: 'Set your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What should I check when buying a manufacturing business?',
          a: 'Review the accounts, key customers and contracts, the condition of plant and equipment, staff skills, safety compliance and the lease.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Blackburn with Blackmont Advisory',
    },
  },

  /* ── Doncaster ────────────────────────────────────────────── */
  {
    slug: 'doncaster',
    name: 'Doncaster',
    city: 'melbourne',
    nearby: ['doncaster-east', 'box-hill', 'balwyn', 'kew'],
    sell: {
      keyword: 'sell a business doncaster',
      keywords: ['business broker doncaster', 'sell my business doncaster', 'business broker manningham', 'doncaster business for sale'],
      title: 'Sell a Business in Doncaster, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Doncaster? Blackmont Advisory values and sells Doncaster and Manningham businesses confidentially, with one senior advisor throughout.',
      h1: 'Sell a Business in Doncaster',
      intro:
        'Thinking of selling your Doncaster business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Doncaster',
      overview: [
        'Doncaster is the main centre of the City of Manningham. Westfield Doncaster and the Doncaster Hill precinct along Doncaster Road draw shoppers from across the north-east, supporting retail, dining, health and services.',
        'The area’s established, well-off families also support professional practices, dental and allied health clinics, tutoring and education, and trades and home services.',
        'We prepare your sale around the buyers most likely to pay for it and keep it confidential, so customers, families and staff hear about it only when you are ready.',
      ],
      highlights: [
        'Sales of retail, health, education and professional businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Doncaster business for sale',
      tipsIntro: 'Practical steps for Doncaster owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show recurring clients',
          text: 'Repeat appointments, memberships and enrolments are worth more than one-off sales. Pull together figures that show how many clients return.',
        },
        {
          title: 'Check your centre lease',
          text: 'Shopping centre leases often have strict assignment rules and refit clauses. Review them early so they do not delay the sale.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'If clients come for you personally, bring other staff into those relationships and document how the business runs.',
        },
        {
          title: 'Get tax advice early',
          text: 'Small business CGT concessions can change what you keep. Speak to your accountant before you accept an offer.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Doncaster?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the deal and manage it to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a business inside Westfield Doncaster?',
          a: 'Yes. Centre leases usually need the landlord’s approval of the buyer and may include refit obligations, so we review the lease first and plan the sale around it.',
        },
        {
          q: 'Do you sell businesses across Manningham?',
          a: 'Yes. We act for owners in Doncaster, Doncaster East, Templestowe, Bulleen and across the City of Manningham.',
        },
        {
          q: 'What is my Doncaster business worth?',
          a: 'Value depends on reliable earnings, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Doncaster with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business doncaster',
      keywords: ['businesses for sale doncaster', 'doncaster business for sale', 'buy a business manningham', 'buyers advisor eastern suburbs melbourne'],
      title: 'Buy a Business in Doncaster, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Doncaster? Blackmont Advisory finds Doncaster and Manningham businesses, tests the figures and negotiates the deal for you only.',
      h1: 'Buy a Business in Doncaster',
      intro:
        'Looking to buy a business in Doncaster? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Doncaster',
      overview: [
        'Doncaster gives buyers a well-off, established market. Westfield Doncaster and Doncaster Road support retail, dining and services, while health, education and professional practices serve local families.',
        'Centre-based businesses benefit from strong foot traffic but carry higher rents and strict lease terms. Practices and services rely more on client loyalty and the owner’s reputation.',
        'We help you weigh those trade-offs, check the figures and negotiate a price that reflects what you are really buying.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, health, education and professional businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Doncaster',
      tipsIntro: 'Tips we share with buyers looking in Manningham.',
      tips: [
        {
          title: 'Read the centre lease closely',
          text: 'Check rent reviews, outgoings, refit obligations and how much term is left. These can change the value of a centre business.',
        },
        {
          title: 'Test owner dependence',
          text: 'If clients come for the current owner, plan a handover and consider linking part of the price to results.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them.',
        },
        {
          title: 'Check staff and wages',
          text: 'Confirm awards, entitlements and whether key staff will stay after the sale.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Doncaster?',
          a: 'Common opportunities include retail and food businesses, dental and allied health, tutoring, professional practices and home services. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Doncaster?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is buying a shopping centre business a good idea?',
          a: 'It can be, as foot traffic is reliable. But rent, outgoings and refit obligations are higher, so the business must earn enough to cover them comfortably.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Doncaster with Blackmont Advisory',
    },
  },

  /* ── Doncaster East ───────────────────────────────────────── */
  {
    slug: 'doncaster-east',
    name: 'Doncaster East',
    city: 'melbourne',
    nearby: ['doncaster', 'ringwood', 'blackburn', 'eltham'],
    sell: {
      keyword: 'sell a business doncaster east',
      keywords: ['business broker doncaster east', 'sell my business doncaster east', 'business sale advisor manningham', 'doncaster east business for sale'],
      title: 'Sell a Business in Doncaster East | Blackmont Advisory',
      description:
        'Selling a business in Doncaster East? Blackmont Advisory values and sells local businesses confidentially, from clinics to tutoring, with one senior advisor.',
      h1: 'Sell a Business in Doncaster East',
      intro:
        'Considering selling your Doncaster East business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately, one approved buyer at a time.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Doncaster East',
      overview: [
        'Doncaster East is a family suburb in the City of Manningham. Local centres such as Tunstall Square and The Pines support cafes, grocers, pharmacies, health and everyday services.',
        'Families here drive demand for tutoring, music and education businesses, childcare, dental and allied health, and trades and home services that work across the north-east.',
        'We prepare your sale around buyers who value that loyal local market, and keep it confidential so families, clients and staff are not unsettled.',
      ],
      highlights: [
        'Sales of education, health, childcare and service businesses',
        'Buyers screened and approved by you',
        'Private investors and local operators in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Doncaster East business for sale',
      tipsIntro: 'Tips for Doncaster East owners before they talk to buyers.',
      tips: [
        {
          title: 'Show term-by-term enrolments',
          text: 'For tutoring and education businesses, show student numbers and retention across several terms. Steady enrolments are what buyers pay for.',
        },
        {
          title: 'Check licences and approvals',
          text: 'Childcare, health and food businesses need approvals that may not transfer automatically. Plan for this in your timeline.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'If families come for you personally, bring in other staff and document how the business runs well before a sale.',
        },
        {
          title: 'Organise your accounts',
          text: 'Buyers want three years of accounts that match tax returns and BAS, with personal and one-off costs separated.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Doncaster East?',
          a: 'Start with a confidential chat and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a tutoring centre in Doncaster East?',
          a: 'Yes. We present enrolment history and staffing clearly and find buyers who can keep students and teachers in place after the sale.',
        },
        {
          q: 'Can I sell confidentially in a close community?',
          a: 'Yes. We market the business without its name, buyers sign a confidentiality agreement, and you approve each one before any detail is shared.',
        },
        {
          q: 'What is my Doncaster East business worth?',
          a: 'It depends on reliable earnings, how much depends on you, and the lease or licences in place. We start with a realistic appraisal.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Doncaster East with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business doncaster east',
      keywords: ['businesses for sale doncaster east', 'doncaster east business for sale', 'buy a tutoring business melbourne east', 'buyers advisor manningham'],
      title: 'Buy a Business in Doncaster East | Blackmont Advisory',
      description:
        'Looking to buy a business in Doncaster East? Blackmont Advisory finds local businesses, checks the figures and negotiates the price, acting only for you.',
      h1: 'Buy a Business in Doncaster East',
      intro:
        'Looking to buy a business in Doncaster East? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Doncaster East',
      overview: [
        'Doncaster East suits buyers looking for steady, family-based trade. Neighbourhood centres such as Tunstall Square and The Pines support food, pharmacy, health and services.',
        'Education, tutoring, childcare and allied health are strong here, offering recurring income from local families, along with trades and home services across Manningham.',
        'We help you check enrolments, client loyalty and the lease, and negotiate a price that reflects the real risks.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Education, health, childcare and service businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Doncaster East',
      tipsIntro: 'Questions we ask on every Doncaster East purchase.',
      tips: [
        {
          title: 'Check enrolment history',
          text: 'For education businesses, ask for student numbers over several terms and how many families re-enrol each year.',
        },
        {
          title: 'Find out who clients follow',
          text: 'If families come for the owner or one teacher, plan a handover and consider linking part of the price to results.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'For childcare, health and food, check which licences you must apply for and make the sale conditional on them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Doncaster East?',
          a: 'Common opportunities include tutoring and education, childcare, pharmacies, allied health, cafes and home services. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Doncaster East?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a tutoring business a good investment?',
          a: 'It can be, if enrolments are steady and students are loyal to the business rather than one teacher. We help you test both before you commit.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Doncaster East with Blackmont Advisory',
    },
  },

  /* ── Glen Waverley ────────────────────────────────────────── */
  {
    slug: 'glen-waverley',
    name: 'Glen Waverley',
    city: 'melbourne',
    nearby: ['mount-waverley', 'oakleigh', 'box-hill', 'dandenong'],
    sell: {
      keyword: 'sell a business glen waverley',
      keywords: ['business broker glen waverley', 'sell my business glen waverley', 'business broker monash', 'glen waverley business for sale'],
      title: 'Sell a Business in Glen Waverley | Blackmont Advisory',
      description:
        'Selling a business in Glen Waverley? Blackmont Advisory values and sells Glen Waverley and Monash businesses confidentially, with one senior advisor.',
      h1: 'Sell a Business in Glen Waverley',
      intro:
        'Thinking of selling your Glen Waverley business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Glen Waverley',
      overview: [
        'Glen Waverley is a major centre in the City of Monash. The Glen shopping centre and the Kingsway dining strip near the station are known across Melbourne for restaurants, food and retail, especially Asian cuisine.',
        'The suburb’s strong school zones drive demand for tutoring, education and childcare, and families support dental, allied health and professional practices. Business and technology parks nearby add commercial firms.',
        'We prepare your sale around the buyers most likely to pay for it, including buyers from Melbourne’s Asian business community and investors, and keep it confidential throughout.',
      ],
      highlights: [
        'Sales of hospitality, education, health and professional businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Glen Waverley business for sale',
      tipsIntro: 'Practical steps for Glen Waverley owners before going to market.',
      tips: [
        {
          title: 'Record every sale',
          text: 'Kingsway restaurants and food businesses often take cash. Buyers only pay for income they can verify in your accounts, tax returns and BAS.',
        },
        {
          title: 'Show enrolments and retention',
          text: 'For tutoring and education, show student numbers and re-enrolment across several terms. That is often the core of your value.',
        },
        {
          title: 'Check your lease',
          text: 'Kingsway and The Glen sites are in demand. Confirm term, options and assignment rules before buyers ask.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Document recipes, systems and supplier terms, and train staff, so a buyer can step in with confidence.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Glen Waverley?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the deal and manage it to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a restaurant on Kingsway?',
          a: 'Yes. We sell restaurants and food businesses, presenting verified sales, the lease and licences so buyers and their lenders can act with confidence.',
        },
        {
          q: 'Can you sell a tutoring business in Glen Waverley?',
          a: 'Yes. We highlight enrolment history and teaching staff, and find buyers who can keep students and teachers in place after the sale.',
        },
        {
          q: 'What is my Glen Waverley business worth?',
          a: 'It depends mainly on verified earnings, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Glen Waverley with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business glen waverley',
      keywords: ['businesses for sale glen waverley', 'glen waverley business for sale', 'buy a restaurant glen waverley', 'buyers advisor monash'],
      title: 'Buy a Business in Glen Waverley | Blackmont Advisory',
      description:
        'Want to buy a business in Glen Waverley? Blackmont Advisory finds listed and off-market businesses, checks the numbers and negotiates the deal for you.',
      h1: 'Buy a Business in Glen Waverley',
      intro:
        'Looking to buy a business in Glen Waverley? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Glen Waverley',
      overview: [
        'Glen Waverley gives buyers a busy, well-off market. The Glen and the Kingsway dining strip draw diners and shoppers from across the south-east, supporting restaurants, food and retail.',
        'Education is a major draw, with strong demand for tutoring, coaching and childcare, alongside health and professional practices serving local families.',
        'We help you work out what a business really earns, how loyal its customers are, and whether the lease supports the price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, education, health and professional businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Glen Waverley',
      tipsIntro: 'Tips we share with buyers looking in Monash.',
      tips: [
        {
          title: 'Only pay for verified income',
          text: 'If some sales are not in the books, do not pay for them. Base the price on accounts that match tax returns and BAS.',
        },
        {
          title: 'Check enrolments',
          text: 'For tutoring and education, ask for student numbers over several terms and how many families re-enrol.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Kingsway rents can be high. Work out rent as a share of sales and compare it with similar businesses.',
        },
        {
          title: 'Confirm licences transfer',
          text: 'For food, liquor and childcare, check which approvals you must apply for and make the sale conditional on getting them.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Glen Waverley?',
          a: 'Common opportunities include restaurants and food businesses, tutoring and education, childcare, health practices and retail. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Glen Waverley?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What should I check when buying a restaurant?',
          a: 'Check verified sales, food and wage costs, the lease and rent, licences, equipment condition and whether key staff such as chefs will stay.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Glen Waverley with Blackmont Advisory',
    },
  },

  /* ── Mount Waverley ───────────────────────────────────────── */
  {
    slug: 'mount-waverley',
    name: 'Mount Waverley',
    city: 'melbourne',
    nearby: ['glen-waverley', 'oakleigh', 'blackburn', 'malvern'],
    sell: {
      keyword: 'sell a business mount waverley',
      keywords: ['business broker mount waverley', 'sell my business mount waverley', 'business sale advisor monash', 'mount waverley business for sale'],
      title: 'Sell a Business in Mount Waverley | Blackmont Advisory',
      description:
        'Selling a business in Mount Waverley? Blackmont Advisory values and sells local and commercial businesses confidentially, with one senior advisor throughout.',
      h1: 'Sell a Business in Mount Waverley',
      intro:
        'Planning to sell your Mount Waverley business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and run a confidential sale from start to settlement.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Mount Waverley',
      overview: [
        'Mount Waverley is an established suburb in the City of Monash. The village around the station and the Pinewood shopping centre support cafes, retail, health and local services for a settled family market.',
        'The suburb sits close to the Monash employment and technology precinct and nearby business parks, home to technology, engineering, manufacturing, wholesale and professional firms.',
        'We prepare your sale around the right buyer, from a local operator to a competitor or investor, and keep it confidential so customers and staff are not unsettled.',
      ],
      highlights: [
        'Sales of health, professional, technology and commercial businesses',
        'Buyers screened and approved by you',
        'Private equity and trade buyers in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Mount Waverley business for sale',
      tipsIntro: 'What buyers look for in Mount Waverley businesses.',
      tips: [
        {
          title: 'Show recurring revenue',
          text: 'Service contracts, maintenance agreements and repeat clients are worth more than one-off sales. Break your revenue down so buyers can see it.',
        },
        {
          title: 'Protect your IP and systems',
          text: 'For technology and engineering firms, make sure software, designs and trademarks are owned by the business, not by you personally.',
        },
        {
          title: 'Reduce key person risk',
          text: 'Bring senior staff into client relationships and document how work is delivered before you sell.',
        },
        {
          title: 'Organise your financials',
          text: 'Three years of accounts that match tax returns and BAS make due diligence faster and support your price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Mount Waverley?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a technology or engineering firm in Mount Waverley?',
          a: 'Yes. We prepare an information memorandum, present contracts, IP and the team clearly, and approach trade buyers, investors and private equity confidentially.',
        },
        {
          q: 'Who buys businesses in Melbourne’s south-east?',
          a: 'Typical buyers are local owner-operators, competitors expanding by acquisition, and investors such as family offices and private equity, depending on size and sector.',
        },
        {
          q: 'How much does it cost to sell a business?',
          a: 'Fees depend on the size and complexity of the sale. We agree them in writing before we start, so there are no surprises.',
          link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Mount Waverley with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business mount waverley',
      keywords: ['businesses for sale mount waverley', 'mount waverley business for sale', 'buy a business monash', 'buyers advisor south east melbourne'],
      title: 'Buy a Business in Mount Waverley | Blackmont Advisory',
      description:
        'Looking to buy a business in Mount Waverley? Blackmont Advisory finds local and commercial businesses, runs due diligence and negotiates the deal for you.',
      h1: 'Buy a Business in Mount Waverley',
      intro:
        'Looking to buy a business in Mount Waverley? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Mount Waverley',
      overview: [
        'Mount Waverley offers buyers both local, family-focused businesses around the village and Pinewood, and commercial firms in the business parks and technology precinct nearby.',
        'Commercial and technology businesses can offer contracted revenue and skilled teams, but need careful checks on customers, IP and key staff.',
        'We help you find the right target, test those risks and structure the deal to protect you.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Health, professional, technology and commercial businesses',
        'Access to off-market opportunities',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Mount Waverley',
      tipsIntro: 'Questions we ask on every Mount Waverley purchase.',
      tips: [
        {
          title: 'Review customer contracts',
          text: 'Check contract terms, renewal dates and whether contracts can end when ownership changes.',
        },
        {
          title: 'Confirm IP ownership',
          text: 'Make sure software, designs and trademarks belong to the business and transfer to you.',
        },
        {
          title: 'Lock in key people',
          text: 'Agree how key staff will be retained, and consider linking part of the price to results.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Mount Waverley?',
          a: 'Common opportunities include health practices, cafes and retail, professional services, and technology, engineering and wholesale firms. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Mount Waverley?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What is an earn-out?',
          a: 'An earn-out is part of the price paid later, based on how the business performs after settlement. It protects buyers when revenue depends on the seller or key clients.',
        },
        {
          q: 'Should I use a buy-side advisor?',
          a: 'It is not required, but the seller’s advisor works for the seller. A buy-side advisor negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Mount Waverley with Blackmont Advisory',
    },
  },

  /* ── Oakleigh ─────────────────────────────────────────────── */
  {
    slug: 'oakleigh',
    name: 'Oakleigh',
    city: 'melbourne',
    nearby: ['mount-waverley', 'bentleigh-east', 'glen-waverley', 'moorabbin'],
    sell: {
      keyword: 'sell a business oakleigh',
      keywords: ['business broker oakleigh', 'sell my business oakleigh', 'business sale advisor monash', 'oakleigh business for sale'],
      title: 'Sell a Business in Oakleigh, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Oakleigh? Blackmont Advisory values and sells Oakleigh businesses confidentially, from Eaton Mall cafes to light industrial firms.',
      h1: 'Sell a Business in Oakleigh',
      intro:
        'Thinking of selling your Oakleigh business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Oakleigh',
      overview: [
        'Oakleigh is one of Melbourne’s best-known dining and shopping villages, in the City of Monash. Eaton Mall and Portman Street are lined with cafes, restaurants, delis and bakeries, many with deep roots in the local Greek community.',
        'Beyond the village, Oakleigh and its neighbours hold light industrial and commercial areas with manufacturing, wholesale, automotive and trade businesses serving the south-east.',
        'We prepare your sale around the buyers most likely to pay for it, from hospitality operators to competitors and investors, and keep it confidential throughout.',
      ],
      highlights: [
        'Sales of hospitality, food, trade and light industrial businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing an Oakleigh business for sale',
      tipsIntro: 'Practical steps for Oakleigh owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Record all sales clearly',
          text: 'Cafes, delis and restaurants often take cash. Buyers and lenders only pay for income that shows in your accounts, tax returns and BAS.',
        },
        {
          title: 'Document recipes and suppliers',
          text: 'For long-running food businesses, write down recipes, methods and supplier terms so the business does not depend on you.',
        },
        {
          title: 'List equipment and vehicles',
          text: 'For trade and industrial businesses, keep a register of equipment and vehicles with condition and service history.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Eaton Mall sites are sought after. Confirm your lease term and options and raise assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Oakleigh?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the deal and manage it to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a cafe or restaurant in Oakleigh?',
          a: 'Yes. We sell cafes, restaurants, delis and bakeries, presenting verified sales, the lease and licences so buyers can get finance and move quickly.',
        },
        {
          q: 'Can you sell an industrial business near Oakleigh?',
          a: 'Yes. We sell manufacturing, wholesale, automotive and trade businesses, including asset registers and plans for transferring customers and staff.',
        },
        {
          q: 'What is my Oakleigh business worth?',
          a: 'It depends mainly on verified earnings, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Oakleigh with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business oakleigh',
      keywords: ['businesses for sale oakleigh', 'oakleigh business for sale', 'buy a cafe oakleigh', 'buyers advisor south east melbourne'],
      title: 'Buy a Business in Oakleigh, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Oakleigh? Blackmont Advisory finds listed and off-market Oakleigh businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Oakleigh',
      intro:
        'Looking to buy a business in Oakleigh? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Oakleigh',
      overview: [
        'Oakleigh’s Eaton Mall and Portman Street draw diners and shoppers from across Melbourne, supporting cafes, restaurants, delis, bakeries and specialty retail seven days a week.',
        'Nearby light industrial areas add manufacturing, wholesale, automotive and trade businesses, often with steady business customers and experienced staff.',
        'We help you check what a business truly earns, how much depends on the owner, and whether the lease and equipment support the price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, food, trade and light industrial businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Oakleigh',
      tipsIntro: 'Tips we share with buyers looking in Oakleigh.',
      tips: [
        {
          title: 'Do not pay for unrecorded sales',
          text: 'Base the price only on income shown in the accounts, tax returns and BAS. Unrecorded cash cannot be verified or financed.',
        },
        {
          title: 'Check who holds the know-how',
          text: 'In long-running food businesses, recipes and supplier relationships may sit with the owner. Agree a proper handover.',
        },
        {
          title: 'Inspect equipment',
          text: 'Have kitchen or industrial equipment checked, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Oakleigh?',
          a: 'Common opportunities include cafes, restaurants, delis and bakeries, specialty retail, and manufacturing, wholesale and automotive businesses. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Oakleigh?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What should I check before buying a cafe?',
          a: 'Check verified sales, food and wage costs, the lease and rent, licences, equipment condition and whether key staff will stay.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Oakleigh with Blackmont Advisory',
    },
  },
];
