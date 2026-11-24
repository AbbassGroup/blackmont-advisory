import type { SuburbEntry } from './types';

/**
 * Inner south and east Melbourne, part C: Toorak, Brighton, Hawthorn, Kew,
 * Camberwell, Malvern, Balwyn. Each sell and buy page is written on its own.
 * No invented deals, figures or postcodes.
 */

const LICENCE = 'Licensed business agent, BLA 092153L';

export const MELBOURNE_C: SuburbEntry[] = [
  /* ── Toorak ───────────────────────────────────────────────── */
  {
    slug: 'toorak',
    name: 'Toorak',
    city: 'melbourne',
    nearby: ['south-yarra', 'malvern', 'hawthorn', 'brighton'],
    sell: {
      keyword: 'sell a business toorak',
      keywords: ['business broker toorak', 'sell my business toorak', 'business sale advisor toorak', 'toorak business for sale'],
      title: 'Sell a Business in Toorak, Melbourne | Blackmont Advisory',
      description:
        'Sell a business in Toorak with a local advisor. Blackmont Advisory is based on Toorak Road and runs confidential, senior-led sales. Book a private chat today.',
      h1: 'Sell a Business in Toorak',
      intro:
        'Selling a Toorak business? Our office is at 1/459 Toorak Road, in the heart of the suburb. We value your business, prepare it for buyers and run a private sale, with one senior advisor from first meeting to settlement.',
      points: [
        'Office at 1/459 Toorak Road, Toorak',
        'Meet in person, often the same week',
        'No public listing with your name on it',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Toorak',
      overview: [
        'Toorak is our home suburb. Toorak Village and the Toorak Road strip carry boutiques, galleries, cafes, beauty and wellness businesses, while the offices above and around them hold wealth managers, accountants, lawyers and family offices.',
        'Businesses here often serve a small, loyal and well-off client base. That loyalty is valuable, but it can also sit with the owner personally. A good Toorak sale plans the handover of those relationships as carefully as the price.',
        'Because we are a short walk away, we can meet you at the business or at our office, and keep every step out of view of staff, clients and neighbours.',
      ],
      highlights: [
        'A business sale advisor based in Toorak, not a call centre',
        'Private investors, family offices and private equity in our network',
        'Buyers screened and approved by you before any detail is shared',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Toorak business for sale',
      tipsIntro: 'What we tell Toorak owners before they go to market.',
      tips: [
        {
          title: 'Map the client relationships',
          text: 'In Toorak, clients often buy from you, not the business name. List your key accounts and plan a staged introduction to the new owner so revenue stays after settlement.',
        },
        {
          title: 'Keep the sale confidential',
          text: 'Toorak is a small, connected community. A sign in the window or a public listing can unsettle staff and clients. A confidential, buyer-by-buyer process protects the value of your business.',
        },
        {
          title: 'Check the lease on your site',
          text: 'Toorak Village sites are scarce and rents are high. Confirm your remaining term and options, and speak to your landlord about assignment before buyers ask.',
        },
        {
          title: 'Get tax and structure advice early',
          text: 'Small business CGT concessions and the way the sale is structured can change what you keep. Talk to your accountant before you accept an offer.',
        },
      ],
      faqs: [
        {
          q: 'Do you have an office in Toorak?',
          a: 'Yes. Our office is at 1/459 Toorak Road, Toorak. We meet Toorak business owners at our office or at their business, whichever is more discreet.',
        },
        {
          q: 'How do I sell my Toorak business without staff or clients finding out?',
          a: 'We market the business without its name or exact address. Each buyer signs a confidentiality agreement and you approve them before they see any detail. You decide when to tell staff and clients.',
        },
        {
          q: 'Can you sell a wealth management or professional practice in Toorak?',
          a: 'Yes. We act as the business sale advisor, finding and negotiating with the buyer. Licensing, client consent and regulatory transfer steps sit with your compliance and legal advisers, and we work alongside them.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Toorak with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business toorak',
      keywords: ['businesses for sale toorak', 'toorak business for sale', 'buyers advisor toorak', 'buy a business melbourne'],
      title: 'Buy a Business in Toorak, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Toorak? Blackmont Advisory, based on Toorak Road, finds listed and off-market businesses and negotiates the deal for you only.',
      h1: 'Buy a Business in Toorak',
      intro:
        'Looking to buy a business in Toorak? We are buyer’s advisors with an office on Toorak Road. We find suitable businesses, including ones never advertised, test the figures and negotiate the price and terms for you.',
      points: [
        'Local advisors on Toorak Road',
        'Listed and off-market opportunities',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Toorak',
      overview: [
        'Good Toorak businesses rarely reach the open market. Many owners prefer a quiet sale to a buyer introduced privately, which is why local knowledge and relationships matter when you are searching here.',
        'The suburb suits buyers looking for premium retail, hospitality, beauty and wellness, and professional services with a loyal, high-spending client base. Prices reflect that, so the room for error is small.',
        'We help you work out what the business really earns, how much depends on the current owner, and whether the lease gives you enough time to earn back your investment.',
      ],
      highlights: [
        'Advice for the buyer only, with no seller to please',
        'Access to off-market Toorak and inner-east businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence alongside your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Toorak',
      tipsIntro: 'Questions we ask on every Toorak purchase.',
      tips: [
        {
          title: 'Test how personal the goodwill is',
          text: 'Ask how much revenue comes from clients who deal only with the owner. Build a handover period and, where it suits, part of the price paid on results into the deal.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Toorak rents are among the highest in Melbourne. Work out rent as a share of sales and compare it with similar businesses before you agree on a price.',
        },
        {
          title: 'Check the lease term and options',
          text: 'A short lease on a prime site is a risk. Make sure the lease can be assigned to you and leaves enough term to recover what you pay.',
        },
        {
          title: 'Look past the presentation',
          text: 'A beautiful fit-out does not guarantee profit. Ask for three years of accounts that match tax returns and BAS, and have your accountant review them.',
        },
      ],
      faqs: [
        {
          q: 'How do I find off-market businesses for sale in Toorak?',
          a: 'Many Toorak owners sell privately through advisors rather than listing publicly. Tell us what you are looking for and we will approach suitable businesses on your behalf, confidentially.',
        },
        {
          q: 'Is Toorak a good place to buy a business?',
          a: 'It offers a well-off, loyal customer base and strong local spending. The trade-off is high rent and higher prices. We help you compare the numbers with similar businesses elsewhere in Melbourne.',
        },
        {
          q: 'Do I need my own advisor to buy a business?',
          a: 'You do not have to, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Toorak with Blackmont Advisory',
    },
  },

  /* ── Brighton ─────────────────────────────────────────────── */
  {
    slug: 'brighton',
    name: 'Brighton',
    city: 'melbourne',
    nearby: ['st-kilda', 'malvern', 'toorak', 'south-melbourne'],
    sell: {
      keyword: 'sell a business brighton',
      keywords: ['business broker brighton', 'sell my business brighton vic', 'bayside business broker', 'brighton business for sale'],
      title: 'Sell a Business in Brighton, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Brighton, VIC? Blackmont Advisory values and sells bayside businesses confidentially, with one senior advisor from start to settlement.',
      h1: 'Sell a Business in Brighton',
      intro:
        'Thinking of selling your Brighton business? We are a Melbourne business sale advisor based in nearby Toorak. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Office in Toorak, a short drive from Brighton',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Brighton',
      overview: [
        'Brighton is one of Melbourne’s most established bayside suburbs. Church Street and Bay Street carry fashion, homewares, cafes, restaurants and beauty businesses, while clinics, allied health and professional firms serve families across the area.',
        'Many Brighton businesses also work in the homes of local residents: builders, landscapers, pool and maintenance services, and interior and design studios. Their value often lies in repeat clients and a strong local name.',
        'We prepare each sale around the buyers most likely to pay for your business, from local owner-operators to groups expanding across bayside Melbourne, and keep it confidential throughout.',
      ],
      highlights: [
        'Sales of retail, hospitality, clinic and trade businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Brighton business for sale',
      tipsIntro: 'Practical steps for bayside owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show your repeat customers',
          text: 'Brighton buyers pay for loyal local trade. Pull together repeat-booking, membership or client retention figures to show the business does not rely on passing traffic alone.',
        },
        {
          title: 'Plan for seasonality',
          text: 'Bayside trade can rise in summer and slow in winter. Show twelve months of figures by month so buyers see the full cycle, not just the best quarter.',
        },
        {
          title: 'Document jobs and systems',
          text: 'For trade and home services, a clear job pipeline, booking system and written procedures show a buyer the business can run without you on every site.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Church Street and Bay Street sites are in demand. Check your lease term and options and raise assignment with your landlord before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Brighton confidentially?',
          a: 'We describe your business without its name or address. Interested buyers sign a confidentiality agreement and you approve each one before they see any detail.',
        },
        {
          q: 'How long does it take to sell a business in Brighton?',
          a: 'Most sales take several months from preparation to settlement, depending on the business, the buyer’s finance and the lease. Good preparation is the best way to shorten it.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'What is my Brighton business worth?',
          a: 'Value depends mainly on reliable earnings, how much the business depends on you, and the lease. We start with a realistic appraisal based on your figures and what buyers are paying.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Brighton with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business brighton',
      keywords: ['businesses for sale brighton vic', 'brighton business for sale', 'bayside businesses for sale', 'buyers advisor melbourne'],
      title: 'Buy a Business in Brighton, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Brighton, VIC? Blackmont Advisory finds bayside businesses, checks the numbers and negotiates price and terms in your interest only.',
      h1: 'Buy a Business in Brighton',
      intro:
        'Looking to buy a business in Brighton? We act for buyers only. We find suitable bayside businesses, check the figures with you and negotiate the price and terms, from first look to settlement.',
      points: [
        'Advisors based in nearby Toorak',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Brighton',
      overview: [
        'Brighton offers buyers a stable, well-off customer base and busy shopping strips on Church Street and Bay Street. Cafes, boutiques, beauty and wellness, clinics and childcare are all common here.',
        'There is also steady demand for services that work in local homes, such as building, landscaping, cleaning and maintenance. These can be strong businesses, but much depends on the owner’s reputation and team.',
        'We help you separate a good business from a good location, and make sure the price reflects what the business earns, not just where it sits.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, hospitality, clinic and home services businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Brighton',
      tipsIntro: 'Tips we share with buyers looking at bayside businesses.',
      tips: [
        {
          title: 'Look at a full year of trade',
          text: 'Bayside businesses can be seasonal. Ask for monthly figures across at least a year so a strong summer does not hide a slow winter.',
        },
        {
          title: 'Check who holds the relationships',
          text: 'In home services and clinics, clients often follow a person. Ask how work is won and how the handover will keep clients with the business.',
        },
        {
          title: 'Review staff and wages',
          text: 'Check that staff are paid under the right award, that entitlements are up to date, and whether key people plan to stay after the sale.',
        },
        {
          title: 'Confirm the lease',
          text: 'Make sure the lease can be assigned to you, the rent is sustainable against turnover, and there is enough term left to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What kinds of businesses are for sale in Brighton?',
          a: 'Common opportunities include cafes and restaurants, retail, beauty and wellness, allied health, childcare and home services. Many are sold privately, so we also approach owners off-market on your behalf.',
        },
        {
          q: 'Can you help me finance a business purchase?',
          a: 'We help you prepare the information lenders ask for and structure the deal, including vendor finance or earn-outs where they suit. Your bank or broker provides the loan itself.',
        },
        {
          q: 'Why use a buyer’s advisor in Brighton?',
          a: 'The selling agent works for the seller. A buyer’s advisor tests the figures, spots the risks and negotiates only for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Brighton with Blackmont Advisory',
    },
  },

  /* ── Hawthorn ─────────────────────────────────────────────── */
  {
    slug: 'hawthorn',
    name: 'Hawthorn',
    city: 'melbourne',
    nearby: ['kew', 'camberwell', 'richmond', 'toorak'],
    sell: {
      keyword: 'sell a business hawthorn',
      keywords: ['business broker hawthorn', 'sell my business hawthorn', 'business sale advisor hawthorn', 'hawthorn business for sale'],
      title: 'Sell a Business in Hawthorn, Melbourne | Blackmont Advisory',
      description:
        'Sell a business in Hawthorn with a Melbourne advisor who keeps it private. Blackmont Advisory values, prepares and sells Hawthorn businesses. Talk to us today.',
      h1: 'Sell a Business in Hawthorn',
      intro:
        'Ready to sell your Hawthorn business? We are a Melbourne business sale advisor based in Toorak, a short drive away. We value your business, prepare it and take it privately to qualified buyers.',
      points: [
        'Office in Toorak, close to Hawthorn',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Hawthorn',
      overview: [
        'Hawthorn mixes busy shopping strips on Glenferrie Road and Burwood Road with a large student population around Swinburne University. Cafes, food, fitness and retail benefit from that steady foot traffic.',
        'The suburb is also home to many professional firms, medical and allied health practices, and technology and consulting businesses in offices along the main roads. These firms often have long-standing clients and a skilled team that buyers value.',
        'We prepare each sale around the right buyer group, whether a local operator, a firm looking to merge, or an investor, and keep the process confidential to protect your staff and clients.',
      ],
      highlights: [
        'Sales of professional, health, hospitality and retail businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive firms in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Hawthorn business for sale',
      tipsIntro: 'Practical steps for Hawthorn owners before they talk to buyers.',
      tips: [
        {
          title: 'Show trade outside semester',
          text: 'Businesses near Swinburne can slow during university breaks. Show monthly figures for a full year so buyers can see how the business performs all year round.',
        },
        {
          title: 'Keep your team in place',
          text: 'For professional and health practices, buyers pay for skilled staff who stay. Up-to-date employment contracts and a clear structure make a big difference.',
        },
        {
          title: 'Clean up the financials',
          text: 'Buyers and their banks want three years of accounts that match tax returns and BAS, with personal and one-off costs clearly separated.',
        },
        {
          title: 'Plan the client handover',
          text: 'Decide how you will introduce the new owner to key clients and how long you will stay on. A clear plan gives buyers confidence and supports your price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Hawthorn?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA, negotiate price and terms, and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a professional services firm in Hawthorn?',
          a: 'Yes. We regularly prepare accounting, consulting, IT and health practices for sale, including planning how clients and staff transfer to the new owner.',
        },
        {
          q: 'How much does it cost to sell a business?',
          a: 'Fees depend on the size and complexity of the sale. We agree them in writing before we start, so there are no surprises at settlement.',
          link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Hawthorn with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business hawthorn',
      keywords: ['businesses for sale hawthorn', 'hawthorn business for sale', 'buy a cafe hawthorn', 'buyers advisor melbourne'],
      title: 'Buy a Business in Hawthorn, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Hawthorn? Blackmont Advisory finds listed and off-market Hawthorn businesses, checks the figures and negotiates the deal for you only.',
      h1: 'Buy a Business in Hawthorn',
      intro:
        'Looking to buy a business in Hawthorn? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Advisors based in nearby Toorak',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Hawthorn',
      overview: [
        'Hawthorn gives buyers a mix of local residents, office workers and students. Glenferrie Road and Burwood Road carry cafes, food, fitness and retail, while clinics and professional firms are spread through the suburb.',
        'That mix creates good opportunities, but it also means trade can vary through the year and between streets. Two similar businesses can perform very differently depending on location and customer base.',
        'We help you understand where the revenue comes from, how much depends on the owner, and whether the price is fair for what you are buying.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, retail, health and professional businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Hawthorn',
      tipsIntro: 'Tips we share with buyers weighing up a Hawthorn business.',
      tips: [
        {
          title: 'Ask about student trade',
          text: 'Near the university, trade can fall in semester breaks. Check monthly sales across a full year and plan your cash flow for the quieter months.',
        },
        {
          title: 'Check the client base',
          text: 'For professional and health practices, ask how many clients are active, how long they stay and how much revenue sits with the current owner.',
        },
        {
          title: 'Look at staffing',
          text: 'Confirm wages, awards and entitlements, and find out whether key staff will stay after the sale. Losing one senior person can change the numbers.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned, the rent is reasonable against turnover, and there is enough term left for you to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Hawthorn?',
          a: 'Common opportunities include cafes and food businesses, fitness studios, retail, allied health and professional practices. We also approach owners off-market on your behalf.',
        },
        {
          q: 'Can you help me buy a practice in Hawthorn?',
          a: 'Yes. We help buyers assess health and professional practices, including how much revenue is tied to current practitioners. Registration and licensing questions go to the relevant body and your lawyer.',
        },
        {
          q: 'Do I need an advisor to buy a small business?',
          a: 'You do not have to have one, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Hawthorn with Blackmont Advisory',
    },
  },

  /* ── Kew ──────────────────────────────────────────────────── */
  {
    slug: 'kew',
    name: 'Kew',
    city: 'melbourne',
    nearby: ['hawthorn', 'balwyn', 'camberwell', 'richmond'],
    sell: {
      keyword: 'sell a business kew',
      keywords: ['business broker kew', 'sell my business kew', 'business sale advisor kew', 'kew business for sale'],
      title: 'Sell a Business in Kew, Melbourne VIC | Blackmont Advisory',
      description:
        'Selling a business in Kew? Blackmont Advisory, a Toorak-based business sale advisor, values and sells Kew businesses confidentially to qualified buyers today.',
      h1: 'Sell a Business in Kew',
      intro:
        'Thinking of selling your Kew business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for sale and approach qualified buyers privately, one at a time.',
      points: [
        'Office in Toorak, a short drive from Kew',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Kew',
      overview: [
        'Kew is a leafy, established suburb with a strong family market. High Street and Kew Junction carry cafes, restaurants, specialty retail and services, while medical, dental, allied health and professional practices serve a loyal local client base.',
        'Education is also a large part of the local economy, which supports tutoring, childcare, music and enrichment businesses. These businesses often have steady, recurring enrolments that buyers value.',
        'We prepare your sale around the buyers most likely to pay for it, and keep it confidential so clients, families and staff are not unsettled before you are ready.',
      ],
      highlights: [
        'Sales of health, education, hospitality and professional businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Kew business for sale',
      tipsIntro: 'Tips for Kew owners, based on the questions buyers ask most.',
      tips: [
        {
          title: 'Show recurring revenue',
          text: 'Enrolments, memberships and repeat appointments are worth more than one-off sales. Pull together figures that show how many clients return each term or year.',
        },
        {
          title: 'Check licences and registrations',
          text: 'Childcare, health and education businesses often need approvals that do not transfer automatically. Find out early what the buyer will need to apply for.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'If families or patients come to see you personally, start bringing in other staff and documenting how the business runs before you sell.',
        },
        {
          title: 'Organise your financials',
          text: 'Three years of accounts that match your tax returns and BAS make a buyer’s due diligence faster and support a stronger price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my Kew business confidentially?',
          a: 'We market the business without its name or exact location. Buyers sign a confidentiality agreement and you approve each one before they see any detail.',
        },
        {
          q: 'Can you sell a childcare or education business in Kew?',
          a: 'Yes. We prepare the sale and find the buyer. Approvals, registrations and regulatory transfers are handled with your lawyer and the relevant authority, and we plan the timeline around them.',
        },
        {
          q: 'What is my Kew business worth?',
          a: 'Value depends on reliable earnings, how much depends on you, and the lease or licences in place. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Kew with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business kew',
      keywords: ['businesses for sale kew', 'kew business for sale', 'buy a childcare business kew', 'buyers advisor melbourne'],
      title: 'Buy a Business in Kew, Melbourne VIC | Blackmont Advisory',
      description:
        'Looking to buy a business in Kew? Blackmont Advisory helps buyers find Kew businesses, test the figures and negotiate the right price, acting for you alone.',
      h1: 'Buy a Business in Kew',
      intro:
        'Looking to buy a business in Kew? We are buyer’s advisors based in nearby Toorak. We find suitable businesses, check the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Advisors based in nearby Toorak',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Kew',
      overview: [
        'Kew suits buyers looking for steady, family-focused trade. High Street and Kew Junction offer cafes, specialty retail and services, and the suburb has a strong market for health, childcare and education businesses.',
        'Businesses with recurring clients, such as practices, tutoring centres and childcare, can offer reliable income. They also come with registrations, staffing ratios and owner relationships that need careful checking.',
        'We help you understand what you are really buying and negotiate a price that reflects it.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Health, education, childcare and retail businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Kew',
      tipsIntro: 'Questions we ask on every Kew purchase.',
      tips: [
        {
          title: 'Check enrolments and retention',
          text: 'For education and childcare, ask for enrolment numbers over several terms and how many families stay year to year.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'Some licences and registrations must be applied for again by a new owner. Make the sale conditional on getting them where needed.',
        },
        {
          title: 'Test owner dependence',
          text: 'If clients come to see the current owner, plan a handover period and consider linking part of the price to results.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned, rent is sustainable against turnover, and the term gives you time to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What types of businesses are for sale in Kew?',
          a: 'Common opportunities include cafes, specialty retail, health and dental practices, tutoring and childcare. Many sell privately, so we also approach owners off-market for you.',
        },
        {
          q: 'Can you help me buy a childcare centre in Kew?',
          a: 'Yes. We help you assess occupancy, staffing and the lease, and negotiate the deal. Approvals and regulatory requirements are confirmed with your lawyer and the relevant authority.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor tests the figures, spots the risks and negotiates only in your interest.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Kew with Blackmont Advisory',
    },
  },

  /* ── Camberwell ───────────────────────────────────────────── */
  {
    slug: 'camberwell',
    name: 'Camberwell',
    city: 'melbourne',
    nearby: ['hawthorn', 'balwyn', 'kew', 'malvern'],
    sell: {
      keyword: 'sell a business camberwell',
      keywords: ['business broker camberwell', 'sell my business camberwell', 'business sale advisor camberwell', 'camberwell business for sale'],
      title: 'Sell a Business Camberwell, Melbourne | Blackmont Advisory',
      description:
        'Sell a business in Camberwell, VIC, without going public. Blackmont Advisory values and sells Camberwell businesses confidentially, with one senior advisor.',
      h1: 'Sell a Business in Camberwell',
      intro:
        'Planning to sell your Camberwell business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and run a confidential sale from start to settlement.',
      points: [
        'Office in Toorak, close to Camberwell',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Camberwell',
      overview: [
        'Camberwell Junction, where Burke Road meets Camberwell Road and Riversdale Road, is one of the east’s busiest shopping centres. Fashion, homewares, cafes, restaurants and services trade alongside medical and professional offices.',
        'The suburb also has many accounting, legal, financial and allied health practices serving established local families. Practices with long client histories and a stable team are attractive to buyers and merging firms.',
        'We prepare each sale around the buyers most likely to pay for your business, and keep the process private so staff and clients hear about it only when you are ready.',
      ],
      highlights: [
        'Sales of retail, hospitality, professional and health businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive firms in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Camberwell business for sale',
      tipsIntro: 'Practical steps for Camberwell owners before going to market.',
      tips: [
        {
          title: 'Show the client history',
          text: 'For practices and service businesses, show how long clients have stayed and how much revenue repeats each year. This is often the core of your value.',
        },
        {
          title: 'Check your lease early',
          text: 'Sites around Camberwell Junction are sought after. Confirm your term and options and talk to your landlord about assignment before buyers ask.',
        },
        {
          title: 'Separate personal costs',
          text: 'Buyers look at what the business earns for an owner. Clearly identify personal, family and one-off expenses in your accounts so profit is shown fairly.',
        },
        {
          title: 'Plan your exit timeline',
          text: 'Decide how long you are willing to stay to hand over clients and staff. A clear handover plan makes buyers more comfortable and can improve the price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my Camberwell business?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell an accounting or legal practice in Camberwell?',
          a: 'Yes. We act as the business sale advisor, finding and negotiating with the buyer, and plan how clients and staff transfer. Professional and regulatory requirements are handled with your own advisers.',
        },
        {
          q: 'Will I pay capital gains tax when I sell?',
          a: 'Usually, yes, although small business CGT concessions can reduce or remove it. Speak to your accountant before you sell.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Camberwell with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business camberwell',
      keywords: ['businesses for sale camberwell', 'camberwell business for sale', 'buy a practice camberwell', 'buyers advisor melbourne'],
      title: 'Buy a Business Camberwell, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Camberwell? Blackmont Advisory finds listed and off-market businesses, checks the numbers and negotiates price and terms for you.',
      h1: 'Buy a Business in Camberwell',
      intro:
        'Looking to buy a business in Camberwell? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Advisors based in nearby Toorak',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Camberwell',
      overview: [
        'Camberwell Junction draws shoppers from across the eastern suburbs, supporting retail, cafes, restaurants and services. Around it sit many professional and health practices with long-standing local clients.',
        'For buyers, that means a choice between busy retail sites and steady, relationship-based practices. Each carries different risks, from rent and foot traffic to client loyalty and owner dependence.',
        'We help you weigh those risks, test the figures and negotiate a price that reflects what the business really earns.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, hospitality, professional and health businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Camberwell',
      tipsIntro: 'Tips we share with buyers looking at Camberwell businesses.',
      tips: [
        {
          title: 'Compare rent with sales',
          text: 'Junction rents can be high. Work out rent as a share of turnover and compare it with similar businesses before you agree a price.',
        },
        {
          title: 'Check client retention',
          text: 'For practices, ask how many active clients there are, how long they stay, and how much revenue depends on the current owner.',
        },
        {
          title: 'Verify the accounts',
          text: 'Ask for three years of financial statements that match tax returns and BAS, and have your accountant review them before you commit.',
        },
        {
          title: 'Plan the handover',
          text: 'Agree how long the seller will stay, how clients will be introduced, and whether part of the price will depend on results.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Camberwell?',
          a: 'Common opportunities include retail, cafes and restaurants, beauty and wellness, and accounting, legal and health practices. We also approach owners off-market on your behalf.',
        },
        {
          q: 'Can you help me buy a professional practice?',
          a: 'Yes. We help you assess client retention, staff and owner dependence, and negotiate the deal. Professional registration questions go to the relevant body and your lawyer.',
        },
        {
          q: 'Do I need my own advisor to buy?',
          a: 'You do not have to, but the seller’s broker works for the seller. Your own advisor checks the figures and negotiates only in your interest.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Camberwell with Blackmont Advisory',
    },
  },

  /* ── Malvern ──────────────────────────────────────────────── */
  {
    slug: 'malvern',
    name: 'Malvern',
    city: 'melbourne',
    nearby: ['toorak', 'south-yarra', 'camberwell', 'brighton'],
    sell: {
      keyword: 'sell a business malvern',
      keywords: ['business broker malvern', 'sell my business malvern', 'business sale advisor malvern', 'malvern business for sale'],
      title: 'Sell a Business in Malvern, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Malvern? Blackmont Advisory is just up the road in Toorak and sells Malvern businesses confidentially, from valuation to settlement.',
      h1: 'Sell a Business in Malvern',
      intro:
        'Thinking about selling your Malvern business? Our office is in neighbouring Toorak. We value your business, prepare it for buyers and run a private sale with one senior advisor throughout.',
      points: [
        'Office in neighbouring Toorak',
        'Meet in person, at short notice',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Malvern',
      overview: [
        'Malvern sits right next to our Toorak office. Glenferrie Road, High Street and Malvern Road carry boutiques, homewares, cafes, restaurants and beauty businesses serving a well-off local market.',
        'The suburb is also a health hub, with Cabrini Malvern and many specialist, dental, allied health and imaging practices nearby. Professional firms and design studios add to a strong base of service businesses.',
        'Being close by, we can meet you quickly, understand how the business works and plan a confidential sale that protects your clients, patients and staff.',
      ],
      highlights: [
        'Our office is a short drive from Malvern',
        'Sales of health, retail, hospitality and professional businesses',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Malvern business for sale',
      tipsIntro: 'What we suggest to Malvern owners before they go to market.',
      tips: [
        {
          title: 'Show referral sources',
          text: 'Health practices near Cabrini often rely on referrals. Show where patients come from and how those referral relationships will continue after the sale.',
        },
        {
          title: 'Document practitioner arrangements',
          text: 'If practitioners work under service agreements or as contractors, make sure the paperwork is in order and buyers can see who is likely to stay.',
        },
        {
          title: 'Check your lease',
          text: 'Prime Glenferrie Road and High Street sites are hard to replace. Confirm your term and options and raise assignment with your landlord early.',
        },
        {
          title: 'Keep it confidential',
          text: 'Malvern is close-knit. Selling quietly, buyer by buyer, avoids unsettling patients, clients and staff before a deal is agreed.',
        },
      ],
      faqs: [
        {
          q: 'Can you sell a medical or allied health practice in Malvern?',
          a: 'Yes. We prepare the practice for sale, find suitable buyers and negotiate the deal. Registration, Medicare and regulatory steps are handled with your own legal and compliance advisers.',
        },
        {
          q: 'How do I keep the sale of my Malvern business private?',
          a: 'We describe the business without its name or address, and buyers sign a confidentiality agreement before seeing any detail. You approve every buyer.',
        },
        {
          q: 'What does it cost to sell my business with you?',
          a: 'Fees depend on the size and complexity of the sale. We agree them in writing before we start, so there are no surprises.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Malvern with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business malvern',
      keywords: ['businesses for sale malvern', 'malvern business for sale', 'buy a medical practice malvern', 'buyers advisor melbourne'],
      title: 'Buy a Business in Malvern, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Malvern? Blackmont Advisory, next door in Toorak, finds Malvern businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Malvern',
      intro:
        'Looking to buy a business in Malvern? We are buyer’s advisors based next door in Toorak. We find suitable businesses, test the figures and negotiate the price and terms for you only.',
      points: [
        'Local advisors in neighbouring Toorak',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Malvern',
      overview: [
        'Malvern offers buyers a well-off local market and busy strips along Glenferrie Road, High Street and Malvern Road. Boutiques, cafes, beauty and wellness businesses do well here.',
        'Health is a major part of the local economy, with Cabrini Malvern and many specialist and allied health practices nearby. These businesses can offer steady income, but depend heavily on practitioners and referrals.',
        'We help you understand where revenue really comes from and negotiate terms that protect you if key people or referrals change after the sale.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Health, beauty, retail and hospitality businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Malvern',
      tipsIntro: 'Questions we ask on every Malvern purchase.',
      tips: [
        {
          title: 'Check practitioner commitments',
          text: 'In health practices, find out which practitioners will stay, on what terms, and how much revenue each one brings in.',
        },
        {
          title: 'Look at referral patterns',
          text: 'Ask where patients and clients come from. A business that relies on a few referrers carries more risk than one with a broad base.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Malvern rents reflect the location. Work out rent as a share of sales and compare it with similar businesses before agreeing a price.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them with you.',
        },
      ],
      faqs: [
        {
          q: 'Can you help me buy a health practice in Malvern?',
          a: 'Yes. We help you assess practitioners, referrals and the lease, and negotiate the deal. Registration and regulatory questions are confirmed with your lawyer and the relevant body.',
        },
        {
          q: 'What businesses are for sale in Malvern?',
          a: 'Common opportunities include health and allied health practices, beauty and wellness, cafes, boutiques and homewares. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Malvern with Blackmont Advisory',
    },
  },

  /* ── Balwyn ───────────────────────────────────────────────── */
  {
    slug: 'balwyn',
    name: 'Balwyn',
    city: 'melbourne',
    nearby: ['kew', 'camberwell', 'hawthorn', 'malvern'],
    sell: {
      keyword: 'sell a business balwyn',
      keywords: ['business broker balwyn', 'sell my business balwyn', 'business sale advisor balwyn', 'balwyn business for sale'],
      title: 'Sell a Business in Balwyn, Melbourne | Blackmont Advisory',
      description:
        'Sell a business in Balwyn with a confidential, senior-led process. Blackmont Advisory values and sells Balwyn businesses to qualified buyers. Book a chat today.',
      h1: 'Sell a Business in Balwyn',
      intro:
        'Considering selling your Balwyn business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Office in Toorak, serving the eastern suburbs',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Balwyn',
      overview: [
        'Balwyn is a family suburb with a busy village along Whitehorse Road. Cafes, restaurants, grocers, pharmacies and services trade here, serving residents of Balwyn and Balwyn North.',
        'Education and health businesses are especially strong. Tutoring and coaching centres, music schools, childcare, dental and allied health practices often have steady, recurring clients that buyers value.',
        'We prepare your sale around the buyers most likely to pay for it, including buyers from the local community, and keep the process confidential from the first conversation.',
      ],
      highlights: [
        'Sales of education, health, food and service businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Balwyn business for sale',
      tipsIntro: 'Tips for Balwyn owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show term-by-term enrolments',
          text: 'For tutoring and education businesses, show student numbers and retention across several terms. Steady enrolments are often what buyers pay for.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'If families come for you personally, bring in other teachers or practitioners and document how the business runs well before you sell.',
        },
        {
          title: 'Organise your accounts',
          text: 'Buyers want three years of accounts that match your tax returns and BAS. Cash-heavy businesses need especially clear records.',
        },
        {
          title: 'Check the lease and approvals',
          text: 'Confirm your lease term and options, and any licences or registrations the buyer will need, before you go to market.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my Balwyn business privately?',
          a: 'We market the business without its name or exact location. Buyers sign a confidentiality agreement and you approve each one before they see any detail.',
        },
        {
          q: 'Can you sell a tutoring or education business in Balwyn?',
          a: 'Yes. We prepare the business for sale, highlight its enrolment history, and find buyers who can keep students and staff in place after the sale.',
        },
        {
          q: 'What is my Balwyn business worth?',
          a: 'Value depends on reliable earnings, how much depends on you, and the lease. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Balwyn with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business balwyn',
      keywords: ['businesses for sale balwyn', 'balwyn business for sale', 'buy a tutoring business balwyn', 'buyers advisor melbourne'],
      title: 'Buy a Business in Balwyn, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Balwyn? Blackmont Advisory helps you find Balwyn businesses, check the figures and negotiate a fair price, acting in your interest.',
      h1: 'Buy a Business in Balwyn',
      intro:
        'Looking to buy a business in Balwyn? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Advisors based in Toorak',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Balwyn',
      overview: [
        'Balwyn suits buyers looking for steady, community-based trade. The Whitehorse Road village supports cafes, food, pharmacy and services, and the area has strong demand for education, childcare and health businesses.',
        'Tutoring centres, music schools and practices can offer recurring income from local families. Their value depends on enrolments, staff and how much clients are tied to the current owner.',
        'We help you look past the headline figures, understand those risks and negotiate a price that reflects them.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Education, health, food and service businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Balwyn',
      tipsIntro: 'Tips we share with buyers looking at Balwyn businesses.',
      tips: [
        {
          title: 'Check enrolment history',
          text: 'For education businesses, ask for student numbers over several terms and how many families re-enrol each year.',
        },
        {
          title: 'Find out who the clients follow',
          text: 'If students or patients come for the owner or one teacher, plan a handover and consider linking part of the price to results.',
        },
        {
          title: 'Verify cash takings',
          text: 'Some local businesses take a lot of cash. Make sure the accounts, tax returns and BAS match and are reviewed by your accountant.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned, the rent is sustainable against turnover, and the term gives you time to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Balwyn?',
          a: 'Common opportunities include tutoring and education centres, childcare, cafes and food businesses, pharmacies and allied health. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'Can you help me buy a tutoring business in Balwyn?',
          a: 'Yes. We help you assess enrolments, staff and the lease, and negotiate the deal so you are protected if students or key teachers do not stay.',
        },
        {
          q: 'Do I need an advisor to buy a small business?',
          a: 'You do not have to have one, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Balwyn with Blackmont Advisory',
    },
  },
];
