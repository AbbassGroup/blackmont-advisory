import type { SuburbEntry } from './types';

/**
 * Melbourne part F, east and south-east: Ringwood, Bentleigh East, Dandenong,
 * Moorabbin, Frankston, Cranbourne, Berwick. Each sell and buy page is written
 * on its own. FAQs open with a direct answer so search and answer engines can
 * quote them. No invented deals, figures or postcodes.
 */

const LICENCE = 'Licensed business agent, BLA 092153L';

export const MELBOURNE_F: SuburbEntry[] = [
  /* ── Ringwood ─────────────────────────────────────────────── */
  {
    slug: 'ringwood',
    name: 'Ringwood',
    city: 'melbourne',
    nearby: ['blackburn', 'box-hill', 'doncaster-east', 'glen-waverley'],
    sell: {
      keyword: 'sell a business ringwood',
      keywords: ['business broker ringwood', 'sell my business ringwood', 'business broker maroondah', 'ringwood business for sale'],
      title: 'Sell a Business in Ringwood, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Ringwood? Blackmont Advisory values and sells Ringwood and Maroondah businesses confidentially, with one senior advisor to settlement.',
      h1: 'Sell a Business in Ringwood',
      intro:
        'Thinking of selling your Ringwood business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately, with no public listing showing your name.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Ringwood',
      overview: [
        'Ringwood is the main centre of the City of Maroondah and one of the outer east’s busiest hubs. Eastland, the Ringwood Station precinct and Maroondah Highway support retail, hospitality, health and professional services.',
        'The area also has a strong base of trade, construction, automotive and light industrial businesses serving the eastern suburbs, the Dandenong Ranges and the Yarra Valley.',
        'We prepare your sale around the buyers most likely to pay for it, from local owner-operators to groups expanding across the east, and keep the process confidential throughout.',
      ],
      highlights: [
        'Sales of retail, health, trade and service businesses',
        'Recent Melbourne deals in trade services and fencing',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Ringwood business for sale',
      tipsIntro: 'Practical steps for Ringwood and Maroondah owners before going to market.',
      tips: [
        {
          title: 'Show the work pipeline',
          text: 'For trade and construction businesses, a clear list of booked jobs, repeat builders and maintenance contracts shows buyers that revenue will continue.',
        },
        {
          title: 'Keep an equipment register',
          text: 'Record vehicles, tools and machinery with their age, condition and any finance owing. Buyers value what they can see clearly.',
        },
        {
          title: 'Check your centre lease',
          text: 'Shopping centre leases often have special assignment and refit rules. Read yours early and talk to centre management before buyers ask.',
        },
        {
          title: 'Organise your financials',
          text: 'Three years of accounts that match your tax returns and BAS help buyers secure finance and support a stronger price.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Ringwood?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA, negotiate the price and terms and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you sell businesses across Maroondah and the outer east?',
          a: 'Yes. We act for owners in Ringwood, Croydon, Bayswater and across Maroondah, Knox and the outer eastern suburbs.',
        },
        {
          q: 'Can I sell a business in Eastland or another shopping centre?',
          a: 'Yes. Centre leases usually need the landlord’s approval to assign and may require a refit. We review the lease early and build those steps into the sale timeline.',
        },
        {
          q: 'What is my Ringwood business worth?',
          a: 'Most businesses are valued on a multiple of verified earnings, adjusted for the lease, risk and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Ringwood with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business ringwood',
      keywords: ['businesses for sale ringwood', 'ringwood business for sale', 'buy a business outer east melbourne', 'buyers advisor maroondah'],
      title: 'Buy a Business in Ringwood, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Ringwood? Blackmont Advisory finds listed and off-market Ringwood businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Ringwood',
      intro:
        'Looking to buy a business in Ringwood? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Ringwood',
      overview: [
        'Ringwood gives buyers a large outer-east catchment, with Eastland, the station precinct and Maroondah Highway drawing shoppers from across Maroondah and beyond.',
        'Alongside retail and hospitality, the area offers trade, automotive and light industrial businesses that serve homes and builders across the eastern suburbs and the Yarra Valley.',
        'We help you understand where the revenue comes from, how much relies on the owner, and whether the price is fair for what you are buying.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Retail, hospitality, trade and automotive businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Ringwood',
      tipsIntro: 'Tips we share with buyers looking in Melbourne’s outer east.',
      tips: [
        {
          title: 'Read the centre lease closely',
          text: 'Shopping centre leases can include refit obligations, turnover rent and strict assignment rules. Know the costs before you agree a price.',
        },
        {
          title: 'Check who wins the work',
          text: 'In trade businesses, find out whether jobs come from the owner’s contacts or from systems and marketing that will stay with the business.',
        },
        {
          title: 'Inspect vehicles and equipment',
          text: 'Have assets inspected and valued, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them before you commit.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Ringwood?',
          a: 'Common opportunities include retail, cafes and food, health and allied health, trades, automotive and light industrial businesses. Many sell privately, so we also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Ringwood?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I get finance to buy a business?',
          a: 'Often, yes. Lenders look at verified earnings, your experience and security. We help prepare the information they need and can structure vendor finance where it suits.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Ringwood with Blackmont Advisory',
    },
  },

  /* ── Bentleigh East ───────────────────────────────────────── */
  {
    slug: 'bentleigh-east',
    name: 'Bentleigh East',
    city: 'melbourne',
    nearby: ['moorabbin', 'oakleigh', 'brighton', 'frankston'],
    sell: {
      keyword: 'sell a business bentleigh east',
      keywords: ['business broker bentleigh east', 'sell my business bentleigh', 'business broker glen eira', 'bentleigh east business for sale'],
      title: 'Sell a Business in Bentleigh East | Blackmont Advisory',
      description:
        'Selling a business in Bentleigh East? Blackmont Advisory values and sells Bentleigh East and Glen Eira businesses confidentially, from cafes to trades.',
      h1: 'Sell a Business in Bentleigh East',
      intro:
        'Planning to sell your Bentleigh East business? We are a Melbourne business sale advisor based in Toorak. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Bentleigh East',
      overview: [
        'Bentleigh East is a family suburb in the City of Glen Eira, with local shopping strips along Centre Road and Tucker Road and easy access to Chadstone and Southland.',
        'Its businesses lean towards everyday services for local families: cafes, grocers, pharmacies, childcare, tutoring, allied health and beauty. Trades and home services also work across the suburb and into nearby Moorabbin’s industrial areas.',
        'We prepare your sale around the buyers most likely to pay for it, often local families or operators looking for steady neighbourhood trade, and keep it confidential.',
      ],
      highlights: [
        'Sales of food, health, childcare and trade businesses',
        'Buyers screened and approved by you',
        'Private investors and local operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Bentleigh East business for sale',
      tipsIntro: 'Tips for Bentleigh East owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show steady local trade',
          text: 'Neighbourhood businesses sell on reliability. Show monthly sales and repeat customers across at least a year so buyers see consistent trade.',
        },
        {
          title: 'Record all takings',
          text: 'Cafes and grocers often take cash. Buyers and lenders only pay for income that appears in your accounts, tax returns and BAS.',
        },
        {
          title: 'Check licences and approvals',
          text: 'Childcare, food and health businesses need approvals that may not transfer automatically. Find out early what a buyer will need.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Leases in Victoria usually need the landlord’s consent to assign. Check your term and options before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Bentleigh East?',
          a: 'Start with a confidential chat and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you sell businesses across Glen Eira?',
          a: 'Yes. We act for owners in Bentleigh East, Bentleigh, McKinnon, Ormond and across the City of Glen Eira and Melbourne’s south-east.',
        },
        {
          q: 'Can I sell my local business without customers finding out?',
          a: 'Yes. Buyers first see an anonymous summary, sign a confidentiality agreement and are approved by you before learning the business name.',
        },
        {
          q: 'What is my Bentleigh East business worth?',
          a: 'It depends mainly on verified earnings, the lease and how much depends on you. We start with a realistic appraisal based on your figures and current buyer demand.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Bentleigh East with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business bentleigh east',
      keywords: ['businesses for sale bentleigh east', 'bentleigh east business for sale', 'buy a cafe bentleigh', 'buyers advisor glen eira'],
      title: 'Buy a Business in Bentleigh East | Blackmont Advisory',
      description:
        'Looking to buy a business in Bentleigh East? Blackmont Advisory finds Glen Eira businesses, checks the numbers and negotiates price and terms for you only.',
      h1: 'Buy a Business in Bentleigh East',
      intro:
        'Looking to buy a business in Bentleigh East? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Bentleigh East',
      overview: [
        'Bentleigh East suits buyers looking for steady neighbourhood trade. Centre Road and local strips support cafes, grocers, pharmacies and services for a settled family population.',
        'Childcare, tutoring, allied health and home services are in steady demand, and the suburb sits close to Moorabbin’s industrial areas for trade businesses.',
        'We help you check what the business really earns, how loyal its customers are, and whether the price reflects the risks.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Food, health, childcare and trade businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Bentleigh East',
      tipsIntro: 'Questions we ask on every Bentleigh East purchase.',
      tips: [
        {
          title: 'Only pay for recorded income',
          text: 'Base the price on sales shown in the accounts, tax returns and BAS. Unrecorded cash cannot be verified or financed.',
        },
        {
          title: 'Look at nearby competition',
          text: 'Check how close the nearest competitors are, including Chadstone and Southland, and whether new ones are planned.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'For childcare, food and health businesses, check which licences you must apply for and make the sale conditional on getting them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned, the rent suits turnover, and the term gives you time to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Bentleigh East?',
          a: 'Common opportunities include cafes, grocers, pharmacies, childcare, tutoring, allied health, beauty and home services. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Bentleigh East?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What should I check before buying a cafe?',
          a: 'Check verified sales, wages as a share of revenue, rent against turnover, the lease term, equipment condition and whether key staff will stay.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Bentleigh East with Blackmont Advisory',
    },
  },

  /* ── Dandenong ────────────────────────────────────────────── */
  {
    slug: 'dandenong',
    name: 'Dandenong',
    city: 'melbourne',
    nearby: ['cranbourne', 'berwick', 'glen-waverley', 'frankston'],
    sell: {
      keyword: 'sell a business dandenong',
      keywords: ['business broker dandenong', 'sell a manufacturing business melbourne', 'business broker dandenong south', 'dandenong business for sale'],
      title: 'Sell a Business in Dandenong, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Dandenong? Blackmont Advisory sells manufacturing, logistics, trade and retail businesses confidentially to qualified buyers.',
      h1: 'Sell a Business in Dandenong',
      intro:
        'Ready to sell your Dandenong business? We are a Melbourne business sale and M&A advisor. We value your business, prepare it for buyers and run a confidential sale to trade buyers, investors and private equity.',
      points: [
        'Senior advisor from start to settlement',
        'Trade buyers, investors and private equity',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Dandenong',
      overview: [
        'Dandenong is the centre of the City of Greater Dandenong and one of Victoria’s most important manufacturing and industrial areas. Dandenong South holds manufacturers, engineering firms, food processors, logistics and wholesale businesses, with fast access to EastLink and the Monash Freeway.',
        'The town centre around Lonsdale Street and the Dandenong Market supports food, grocery, retail and services, reflecting one of Melbourne’s most culturally diverse communities.',
        'We prepare your sale around the right buyer group, from competitors and larger groups to investors and family businesses, and keep it confidential so staff, customers and suppliers are not unsettled.',
      ],
      highlights: [
        'Sales of manufacturing, engineering, logistics and trade businesses',
        'Recent Melbourne deals in transport and trade services',
        'Private equity and trade buyers in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Dandenong business for sale',
      tipsIntro: 'What trade and investor buyers check in Dandenong businesses.',
      tips: [
        {
          title: 'Show customer and contract strength',
          text: 'List your major customers, contract terms and how long they have traded with you. Spread-out, long-term customers support a higher price.',
        },
        {
          title: 'Keep a full plant and equipment register',
          text: 'Record machinery, vehicles and tooling with age, condition, service history and finance owing.',
        },
        {
          title: 'Have safety and compliance in order',
          text: 'Workplace safety records, environmental permits and quality certifications should be current and easy for buyers to review.',
        },
        {
          title: 'Review your factory lease',
          text: 'Confirm term, options, make-good obligations and assignment rules early. Industrial sites can be hard to replace.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a manufacturing business in Dandenong?',
          a: 'Start with a confidential valuation, then prepare clear records of customers, plant and compliance. We approach trade buyers, investors and private equity under NDA and negotiate the deal through to completion.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Who buys businesses in Dandenong South?',
          a: 'Typical buyers are competitors, larger manufacturing and logistics groups, private equity and experienced operators looking for an established business with customers, plant and staff in place.',
        },
        {
          q: 'How are industrial businesses valued?',
          a: 'Usually on a multiple of maintainable earnings, adjusted for customer concentration, the condition of plant and equipment, the lease and how much depends on the owner.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Can you also sell retail and food businesses in central Dandenong?',
          a: 'Yes. We sell food, grocery, retail and service businesses in the town centre as well as industrial businesses in Dandenong South.',
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Dandenong with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business dandenong',
      keywords: ['businesses for sale dandenong', 'buy a manufacturing business melbourne', 'dandenong south business for sale', 'industrial businesses for sale melbourne'],
      title: 'Buy a Business in Dandenong, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Dandenong? Blackmont Advisory finds manufacturing, logistics and retail businesses and negotiates the deal in your interest.',
      h1: 'Buy a Business in Dandenong',
      intro:
        'Looking to acquire a business in Dandenong? We act only for buyers. We find suitable manufacturing, industrial and retail businesses, run due diligence with you and negotiate the price and terms.',
      points: [
        'Buy-side advice only',
        'Listed and off-market targets',
        'Due diligence before you commit',
        'One senior advisor for the whole acquisition',
      ],
      overviewHeading: 'Buying a business in Dandenong',
      overview: [
        'Dandenong South is one of Victoria’s largest industrial precincts, home to manufacturers, engineering firms, food processors, logistics and wholesale businesses with established customers and plant.',
        'Central Dandenong adds food, grocery and retail businesses serving a large and diverse community around the Dandenong Market and Lonsdale Street.',
        'We help you find the right business, test its customers, assets and compliance, and structure the deal to protect you.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Manufacturing, engineering, logistics and retail businesses',
        'Access to off-market industrial opportunities',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Dandenong',
      tipsIntro: 'Questions we ask on every Dandenong acquisition.',
      tips: [
        {
          title: 'Test customer concentration',
          text: 'Find out how much revenue comes from the top few customers and whether those relationships will survive a change of owner.',
        },
        {
          title: 'Inspect plant and equipment',
          text: 'Have machinery inspected and valued. Factor upcoming replacements and finance owing into your offer.',
        },
        {
          title: 'Check compliance and permits',
          text: 'Review safety records, environmental permits and certifications the business needs to keep operating.',
        },
        {
          title: 'Understand the lease',
          text: 'Confirm the lease term, options and make-good obligations, and whether the site suits your growth plans.',
        },
      ],
      faqs: [
        {
          q: 'How do I buy a manufacturing business in Melbourne?',
          a: 'Define the size, sector and budget you want. We search listed and off-market businesses, review customers and plant, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you find off-market businesses in Dandenong South?',
          a: 'Yes. Many owners of established industrial businesses sell privately. We approach suitable owners confidentially on your behalf.',
        },
        {
          q: 'What due diligence is needed for an industrial business?',
          a: 'Review financial accounts, customer contracts, plant condition and finance, safety and environmental compliance, staff and the lease. Your accountant and lawyer should be involved.',
        },
        {
          q: 'Should I use a buy-side advisor?',
          a: 'It is not required, but the seller’s advisor works for the seller. A buy-side advisor tests the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Dandenong with Blackmont Advisory',
    },
  },

  /* ── Moorabbin ────────────────────────────────────────────── */
  {
    slug: 'moorabbin',
    name: 'Moorabbin',
    city: 'melbourne',
    nearby: ['bentleigh-east', 'brighton', 'oakleigh', 'frankston'],
    sell: {
      keyword: 'sell a business moorabbin',
      keywords: ['business broker moorabbin', 'sell my business moorabbin', 'business broker kingston', 'moorabbin business for sale'],
      title: 'Sell a Business in Moorabbin, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Moorabbin? Blackmont Advisory sells Moorabbin manufacturing, trade and service businesses confidentially, with one senior advisor.',
      h1: 'Sell a Business in Moorabbin',
      intro:
        'Thinking of selling your Moorabbin business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and run a private sale through to settlement.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Moorabbin',
      overview: [
        'Moorabbin, in the City of Kingston, is one of the south-east’s established industrial and commercial areas. Its estates around South Road and the Nepean Highway hold manufacturers, engineering and fabrication firms, wholesalers and trade suppliers.',
        'Moorabbin Airport adds aviation, flight training and related businesses, while retail and services trade along the highway and towards Southland.',
        'We prepare each sale around the buyers most likely to pay for it, from competitors to investors, and keep it confidential so staff and customers are not unsettled.',
      ],
      highlights: [
        'Sales of manufacturing, trade, wholesale and service businesses',
        'Recent Melbourne deals in trade services and fencing',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Moorabbin business for sale',
      tipsIntro: 'Practical steps for Moorabbin and Kingston owners.',
      tips: [
        {
          title: 'Show repeat trade customers',
          text: 'Many Moorabbin businesses supply builders and other businesses. Show how long key customers have traded with you and how much revenue repeats.',
        },
        {
          title: 'Keep an asset register',
          text: 'Record machinery, vehicles and stock with condition, value and any finance owing so buyers can see what they are buying.',
        },
        {
          title: 'Document how the business runs',
          text: 'Written processes for quoting, production and delivery show buyers the business can run without you on the floor every day.',
        },
        {
          title: 'Review your industrial lease',
          text: 'Check term, options, make-good obligations and assignment rules early so they do not delay the sale.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Moorabbin?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the price and terms and manage the sale to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell an engineering or fabrication business in Moorabbin?',
          a: 'Yes. We sell manufacturing, engineering and fabrication businesses, including preparing plant registers and plans for transferring customers and skilled staff.',
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
      imageAlt: 'Melbourne office towers representing sell a business in Moorabbin with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business moorabbin',
      keywords: ['businesses for sale moorabbin', 'moorabbin business for sale', 'buy an engineering business melbourne', 'buyers advisor south east melbourne'],
      title: 'Buy a Business in Moorabbin, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Moorabbin? Blackmont Advisory finds listed and off-market Moorabbin businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Moorabbin',
      intro:
        'Looking to buy a business in Moorabbin? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Moorabbin',
      overview: [
        'Moorabbin offers buyers established manufacturing, engineering, wholesale and trade supply businesses in long-running industrial estates close to the Nepean Highway and South Road.',
        'Many of these businesses have loyal trade customers, skilled staff and equipment already in place, making them a faster route to an operating business than starting from scratch.',
        'We help you test customers, assets and staff, and negotiate a price that reflects what you are actually buying.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Manufacturing, engineering, wholesale and trade businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Moorabbin',
      tipsIntro: 'Tips we share with buyers looking at south-east industrial businesses.',
      tips: [
        {
          title: 'Check who the customers are',
          text: 'Find out how much revenue comes from a few builders or contracts, and whether those relationships will stay after the sale.',
        },
        {
          title: 'Inspect plant and stock',
          text: 'Have machinery inspected and stock counted and valued at settlement, so you pay only for what is usable.',
        },
        {
          title: 'Keep the skilled staff',
          text: 'Skilled tradespeople are hard to replace. Confirm awards and entitlements, and talk about retention for key staff.',
        },
        {
          title: 'Review the lease',
          text: 'Confirm term, options and make-good obligations, and whether the site suits how you plan to run the business.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Moorabbin?',
          a: 'Common opportunities include manufacturing, engineering and fabrication, wholesale, trade supply, automotive and service businesses. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Moorabbin?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What due diligence should I do before buying?',
          a: 'At a minimum, review three years of accounts, tax returns and BAS, the lease, key customers, plant, staff and entitlements, and any licences. Your accountant and lawyer should be involved.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Moorabbin with Blackmont Advisory',
    },
  },

  /* ── Frankston ────────────────────────────────────────────── */
  {
    slug: 'frankston',
    name: 'Frankston',
    city: 'melbourne',
    nearby: ['moorabbin', 'cranbourne', 'dandenong', 'bentleigh-east'],
    sell: {
      keyword: 'sell a business frankston',
      keywords: ['business broker frankston', 'sell my business frankston', 'business broker mornington peninsula', 'frankston business for sale'],
      title: 'Sell a Business in Frankston, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Frankston? Blackmont Advisory values and sells Frankston and Mornington Peninsula businesses confidentially, from cafes to trades.',
      h1: 'Sell a Business in Frankston',
      intro:
        'Planning to sell your Frankston business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately to qualified buyers, one at a time.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Frankston',
      overview: [
        'Frankston is the main centre of Frankston City and the gateway to the Mornington Peninsula. Bayside Shopping Centre, Wells Street and the foreshore support retail, hospitality and services, while Frankston Hospital and the Monash Peninsula campus bring health and education activity.',
        'Nearby Carrum Downs and Seaford hold manufacturing, trade, transport and building supply businesses serving the bayside and peninsula.',
        'We prepare your sale around the buyers most likely to pay for it, from local operators and sea-change buyers to groups expanding across the south-east, and keep it confidential.',
      ],
      highlights: [
        'Sales of hospitality, health, trade and industrial businesses',
        'Recent Melbourne deals in trade services and transport',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Frankston business for sale',
      tipsIntro: 'Practical steps for Frankston and peninsula owners.',
      tips: [
        {
          title: 'Show the full seasonal cycle',
          text: 'Bayside and peninsula trade can rise in summer. Show monthly figures for a full year so buyers see how the business performs in every season.',
        },
        {
          title: 'Document jobs and systems',
          text: 'For trade businesses in Carrum Downs and Seaford, a clear job pipeline and written procedures show the business runs without you on every site.',
        },
        {
          title: 'Record all takings',
          text: 'Buyers and lenders only pay for income that appears in your accounts, tax returns and BAS.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Check your lease term and options and raise assignment with your landlord before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Frankston?',
          a: 'Start with a confidential chat and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you sell businesses on the Mornington Peninsula?',
          a: 'Yes. We act for owners in Frankston, Carrum Downs, Seaford and across the Mornington Peninsula and Melbourne’s south-east.',
        },
        {
          q: 'Can I sell my business without staff or customers knowing?',
          a: 'Yes. Buyers first see an anonymous summary, sign a confidentiality agreement and are approved by you before learning the business name.',
        },
        {
          q: 'What is my Frankston business worth?',
          a: 'Value depends on verified earnings, seasonality, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Frankston with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business frankston',
      keywords: ['businesses for sale frankston', 'frankston business for sale', 'buy a business mornington peninsula', 'buyers advisor south east melbourne'],
      title: 'Buy a Business in Frankston, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Frankston? Blackmont Advisory finds bayside and peninsula businesses, checks the numbers and negotiates the deal for you only.',
      h1: 'Buy a Business in Frankston',
      intro:
        'Looking to buy a business in Frankston? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Frankston',
      overview: [
        'Frankston offers buyers a large bayside catchment and the gateway to the Mornington Peninsula, with retail, hospitality and services around Bayside Shopping Centre and the foreshore.',
        'Health and education activity around Frankston Hospital and the Monash campus supports clinics and services, while Carrum Downs and Seaford offer trade, manufacturing and transport businesses.',
        'We help you look past the headline figures, check seasonality and owner dependence, and negotiate a fair price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, health, trade and industrial businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Frankston',
      tipsIntro: 'Questions we ask on every Frankston purchase.',
      tips: [
        {
          title: 'Look at a full year of trade',
          text: 'Bayside businesses can be seasonal. Ask for monthly figures across at least a year so a strong summer does not hide a slow winter.',
        },
        {
          title: 'Check who holds the customers',
          text: 'In trade and service businesses, find out whether work comes from the owner’s contacts or from systems that will stay.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Frankston?',
          a: 'Common opportunities include cafes and restaurants, retail, health and allied health, trades, building supply, manufacturing and transport. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Frankston?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a seasonal business a risky purchase?',
          a: 'Not if you plan for it. Check a full year of monthly figures, make sure cash flow covers the quiet months, and base the price on annual earnings, not the peak.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Frankston with Blackmont Advisory',
    },
  },

  /* ── Cranbourne ───────────────────────────────────────────── */
  {
    slug: 'cranbourne',
    name: 'Cranbourne',
    city: 'melbourne',
    nearby: ['berwick', 'dandenong', 'frankston', 'moorabbin'],
    sell: {
      keyword: 'sell a business cranbourne',
      keywords: ['business broker cranbourne', 'sell my business cranbourne', 'business broker city of casey', 'cranbourne business for sale'],
      title: 'Sell a Business Cranbourne, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Cranbourne? Blackmont Advisory values and sells Cranbourne and City of Casey businesses confidentially, with one senior advisor.',
      h1: 'Sell a Business in Cranbourne',
      intro:
        'Thinking of selling your Cranbourne business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately to qualified buyers.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Cranbourne',
      overview: [
        'Cranbourne is a major centre in the City of Casey, one of Melbourne’s fastest-growing municipalities. High Street and Cranbourne Park support retail, food and services for a young and growing population.',
        'Growth drives demand for childcare, education, health, trades, construction and home services, while industrial areas in Cranbourne West hold manufacturing, transport and building supply businesses. The town also has a long equine and racing tradition.',
        'We prepare your sale to show buyers both current earnings and the growth around you, and keep the process confidential from start to finish.',
      ],
      highlights: [
        'Sales of childcare, health, trade and transport businesses',
        'Recent Melbourne deals in trade services and fencing',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Cranbourne business for sale',
      tipsIntro: 'Practical steps for Cranbourne and City of Casey owners.',
      tips: [
        {
          title: 'Show your growth trend',
          text: 'In a growing area, buyers want to see rising revenue and customer numbers. Present three years of figures so the trend is clear.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Trade and service businesses sell for more when quoting, scheduling and customer contact run without the owner on every job.',
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
          q: 'How do I sell my business in Cranbourne?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you sell businesses across the City of Casey?',
          a: 'Yes. We act for owners in Cranbourne, Clyde, Narre Warren, Berwick and across the City of Casey and Melbourne’s south-east.',
        },
        {
          q: 'Can you sell a trade or construction business in Cranbourne?',
          a: 'Yes. We sell trade, construction and building supply businesses, including preparing equipment registers and plans for transferring builders, customers and staff.',
        },
        {
          q: 'What is my Cranbourne business worth?',
          a: 'Value depends on verified earnings, growth, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Cranbourne with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business cranbourne',
      keywords: ['businesses for sale cranbourne', 'cranbourne business for sale', 'buy a business city of casey', 'buyers advisor south east melbourne'],
      title: 'Buy a Business in Cranbourne, Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in Cranbourne? Blackmont Advisory finds Cranbourne and City of Casey businesses, checks the figures and negotiates the deal for you.',
      h1: 'Buy a Business in Cranbourne',
      intro:
        'Looking to buy a business in Cranbourne? We act only for buyers. We find suitable businesses in a fast-growing area, test the figures with you and negotiate the price and terms.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Cranbourne',
      overview: [
        'Cranbourne and the wider City of Casey are among Melbourne’s fastest-growing areas, creating demand for childcare, health, food, retail, trades and home services.',
        'Cranbourne West and nearby industrial areas also offer manufacturing, transport and building supply businesses for buyers with the right experience.',
        'Growth is attractive, but you should only pay for earnings the business already makes. We help you test the figures and negotiate a fair price.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Childcare, health, trade and transport businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Cranbourne',
      tipsIntro: 'Questions we ask on every purchase in Melbourne’s south-east growth corridor.',
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
          q: 'What businesses are for sale in Cranbourne?',
          a: 'Common opportunities include childcare, health practices, cafes and food, retail, trades, building supply and transport. We also approach owners off-market for you.',
        },
        {
          q: 'Is Cranbourne a good place to buy a business?',
          a: 'Strong population growth supports demand for local services. The key is to buy a business with proven earnings at a fair price, not to pay upfront for growth that has not happened yet.',
        },
        {
          q: 'How do I buy a business in Cranbourne?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Cranbourne with Blackmont Advisory',
    },
  },

  /* ── Berwick ──────────────────────────────────────────────── */
  {
    slug: 'berwick',
    name: 'Berwick',
    city: 'melbourne',
    nearby: ['cranbourne', 'dandenong', 'frankston', 'ringwood'],
    sell: {
      keyword: 'sell a business berwick',
      keywords: ['business broker berwick', 'sell my business berwick', 'business sale advisor casey', 'berwick business for sale'],
      title: 'Sell a Business in Berwick, Melbourne | Blackmont Advisory',
      description:
        'Selling a business in Berwick? Blackmont Advisory values and sells Berwick businesses confidentially to qualified buyers, with one senior advisor throughout.',
      h1: 'Sell a Business in Berwick',
      intro:
        'Considering selling your Berwick business? We are a Melbourne business sale advisor. We value your business, prepare it for buyers and sell it privately, without a public listing.',
      points: [
        'Senior advisor from start to settlement',
        'Confidential first conversation',
        'Every buyer under NDA and approved by you',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Berwick',
      overview: [
        'Berwick is one of the City of Casey’s most established suburbs, with a historic village along High Street lined with cafes, restaurants, boutiques and services.',
        'Casey Hospital and the Berwick education precinct support health, allied health, childcare and education businesses, while trades and home services work across Berwick, Beaconsfield and the growth areas to the east.',
        'We prepare your sale around the buyers most likely to pay for it, often local families or operators wanting a well-located business, and keep it confidential throughout.',
      ],
      highlights: [
        'Sales of hospitality, health, childcare and trade businesses',
        'Buyers screened and approved by you',
        'Private investors and local operators in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Berwick business for sale',
      tipsIntro: 'Tips for Berwick owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show repeat customers',
          text: 'Berwick buyers pay for loyal local trade. Pull together repeat-booking, enrolment or client retention figures.',
        },
        {
          title: 'Show referral sources',
          text: 'Health practices near Casey Hospital may rely on referrals. Show where clients come from and how those relationships will continue.',
        },
        {
          title: 'Organise your financials',
          text: 'Three years of accounts that match your tax returns and BAS make due diligence faster and support a stronger price.',
        },
        {
          title: 'Check your lease',
          text: 'High Street village sites are in demand. Confirm your term and options and raise assignment with your landlord early.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Berwick?',
          a: 'Start with a confidential chat and a realistic valuation. We prepare the business, approach qualified buyers privately under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a health or allied health practice in Berwick?',
          a: 'Yes. We prepare the practice for sale, find suitable buyers and negotiate the deal. Registration and regulatory steps are handled with your own legal and compliance advisers.',
        },
        {
          q: 'Can I sell my business confidentially?',
          a: 'Yes. We market the business without its name or address, every buyer signs a confidentiality agreement, and you approve each one before any detail is shared.',
        },
        {
          q: 'What is my Berwick business worth?',
          a: 'It depends mainly on verified earnings, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Melbourne office towers representing sell a business in Berwick with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business berwick',
      keywords: ['businesses for sale berwick', 'berwick business for sale', 'buy a business city of casey', 'buyers advisor south east melbourne'],
      title: 'Buy a Business in Berwick, Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Berwick? Blackmont Advisory finds Berwick businesses, checks the figures and negotiates a fair price, acting in your interest.',
      h1: 'Buy a Business in Berwick',
      intro:
        'Looking to buy a business in Berwick? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Berwick',
      overview: [
        'Berwick suits buyers looking for an established, family-focused market. The High Street village supports cafes, restaurants, boutiques and services, with steady local spending.',
        'Health, childcare and education businesses benefit from Casey Hospital and the local schools and campus, while trades and home services draw on growth across the City of Casey.',
        'We help you understand what the business really earns, how much depends on the owner, and whether the price is fair.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, health, childcare and trade businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Berwick',
      tipsIntro: 'Tips we share with buyers looking at Berwick businesses.',
      tips: [
        {
          title: 'Test owner dependence',
          text: 'If clients come for the current owner, plan a handover and consider linking part of the price to results.',
        },
        {
          title: 'Check practitioner and staff commitments',
          text: 'In health and childcare, confirm which practitioners and educators will stay, and on what terms.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'Check which licences you must apply for and make the sale conditional on getting them where needed.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned, the rent suits turnover, and the term gives you time to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Berwick?',
          a: 'Common opportunities include cafes and restaurants, boutiques, health and allied health practices, childcare, education and home services. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in Berwick?',
          a: 'Tell us your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you help me buy a childcare centre in Berwick?',
          a: 'Yes. We help you assess occupancy, staffing and the lease, and negotiate the deal. Approvals and regulatory requirements are confirmed with your lawyer and the relevant authority.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Melbourne office towers representing buy a business in Berwick with Blackmont Advisory',
    },
  },
];
