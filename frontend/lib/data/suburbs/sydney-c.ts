import type { SuburbEntry } from './types';

/**
 * Sydney part C: Western Sydney and regional NSW (Newcastle, Central Coast,
 * Wollongong). Each sell and buy page is written on its own. FAQs open with a
 * direct answer so search and answer engines can quote them. Blackmont's office
 * is in Melbourne; NSW clients are served by phone, video and in person when a
 * deal needs it. No invented deals, figures or postcodes.
 */

export const SYDNEY_C: SuburbEntry[] = [
  /* ── Western Sydney ───────────────────────────────────────── */
  {
    slug: 'western-sydney',
    name: 'Western Sydney',
    city: 'sydney',
    nearby: ['parramatta', 'inner-west', 'alexandria', 'sydney-cbd'],
    sell: {
      keyword: 'sell a business western sydney',
      keywords: ['business broker western sydney', 'sell my business penrith', 'sell a manufacturing business sydney', 'western sydney business for sale'],
      title: 'Sell a Business in Western Sydney | Blackmont Advisory',
      description:
        'Selling a business in Western Sydney? Blackmont Advisory sells manufacturing, logistics, trade and service businesses confidentially to buyers Australia-wide.',
      h1: 'Sell a Business in Western Sydney',
      intro:
        'Planning to sell your Western Sydney business? We value your business, prepare it for buyers and run a confidential sale with one senior advisor, reaching trade buyers, investors and private equity across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from across Australia',
        'Every buyer under NDA and approved by you',
        'Confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Western Sydney',
      overview: [
        'Western Sydney is one of Australia’s largest economies in its own right. Centres such as Penrith, Blacktown, Liverpool and Campbelltown support retail, health, hospitality and services for a large and growing population.',
        'Industrial areas including Wetherill Park, Smithfield, Eastern Creek and Erskine Park hold manufacturers, logistics and freight operators, wholesalers and trade businesses close to the M4 and M7. The new Western Sydney International Airport and the Aerotropolis around Badgerys Creek are adding to buyer interest in the region.',
        'We work with NSW owners by phone and video and meet in person when the deal needs it. We prepare your sale around the buyers most likely to pay for it and keep the process confidential throughout.',
      ],
      highlights: [
        'Sales of manufacturing, logistics, trade and service businesses',
        'Recent deals in trade services and transport',
        'Private equity, family offices and trade buyers in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Western Sydney business for sale',
      tipsIntro: 'What buyers check first in Western Sydney businesses.',
      tips: [
        {
          title: 'Show contract and customer strength',
          text: 'List major customers, contract terms and renewal dates. Secure, recurring work is often the biggest driver of value for industrial and service businesses.',
        },
        {
          title: 'Keep a full asset register',
          text: 'Record vehicles, machinery and equipment with age, condition, finance owing and service history so buyers can value them quickly.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Document how jobs are quoted, scheduled and delivered, and bring managers into key customer relationships before you sell.',
        },
        {
          title: 'Check your industrial lease',
          text: 'Warehouse and factory leases matter to buyers. Confirm term, options, make-good obligations and assignment rules early.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Western Sydney?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the price and terms and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Western Sydney?',
          a: 'No. Our office is in Melbourne. We work with Western Sydney owners by phone and video and meet in person when a deal needs it, with buyers from across Australia.',
        },
        {
          q: 'Who buys manufacturing and logistics businesses in Western Sydney?',
          a: 'Typical buyers are competitors, larger industrial and logistics groups, private equity and experienced operators looking for a business with customers, staff and equipment in place.',
        },
        {
          q: 'How is my Western Sydney business valued?',
          a: 'Most businesses are valued on a multiple of maintainable earnings, adjusted for customer concentration, the condition of assets, the lease and how much depends on the owner.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Sydney office buildings representing sell a business in Western Sydney with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business western sydney',
      keywords: ['businesses for sale western sydney', 'buy a business penrith', 'buy a logistics business sydney', 'buyers advisor western sydney'],
      title: 'Buy a Business in Western Sydney | Blackmont Advisory',
      description:
        'Looking to buy a business in Western Sydney? Blackmont Advisory finds manufacturing, logistics and service businesses and negotiates the deal for you only.',
      h1: 'Buy a Business in Western Sydney',
      intro:
        'Looking to buy a business in Western Sydney? We act only for buyers. We find suitable businesses, including ones never advertised, test the figures with you and negotiate the price and terms.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Western Sydney',
      overview: [
        'Western Sydney gives buyers scale: a large and growing population around Penrith, Blacktown, Liverpool and Campbelltown, and some of Sydney’s biggest industrial areas in Wetherill Park, Smithfield and Eastern Creek.',
        'Opportunities range from health, childcare, food and retail businesses to manufacturers, freight operators, wholesalers and trade businesses with established business customers. Investment around the new Western Sydney International Airport is adding to demand.',
        'We help you separate real earnings from future promise, check contracts, assets and staff, and negotiate a price that reflects what you are actually buying.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Manufacturing, logistics, trade and service businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Western Sydney',
      tipsIntro: 'Questions we ask on every Western Sydney purchase.',
      tips: [
        {
          title: 'Pay for today’s earnings',
          text: 'Growth around the new airport is a bonus. Base your price on verified current earnings, not projections.',
        },
        {
          title: 'Read the key contracts',
          text: 'Check how long major customer contracts run, how they can be ended, and whether they need consent when ownership changes.',
        },
        {
          title: 'Inspect equipment and vehicles',
          text: 'Have assets inspected and valued, and factor upcoming replacements and finance owing into your offer.',
        },
        {
          title: 'Review the lease',
          text: 'Confirm the lease can be assigned, the term is long enough, and make-good obligations are understood.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Western Sydney?',
          a: 'Common opportunities include manufacturing, logistics and transport, wholesale, trades, childcare, health and food businesses. Many sell privately, so we also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Western Sydney?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you help if you are based in Melbourne?',
          a: 'Yes. We work with NSW buyers by phone and video, review documents remotely and meet in person when a deal needs it.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Sydney office buildings representing buy a business in Western Sydney with Blackmont Advisory',
    },
  },

  /* ── Newcastle ────────────────────────────────────────────── */
  {
    slug: 'newcastle',
    name: 'Newcastle',
    city: 'sydney',
    nearby: ['central-coast', 'sydney-cbd', 'northern-beaches', 'parramatta'],
    sell: {
      keyword: 'sell a business newcastle',
      keywords: ['business broker newcastle', 'sell my business newcastle nsw', 'business broker hunter valley', 'newcastle business for sale'],
      title: 'Sell a Business in Newcastle, NSW | Blackmont Advisory',
      description:
        'Selling a business in Newcastle, NSW? Blackmont Advisory sells Newcastle and Hunter businesses confidentially, with one senior advisor and national buyers.',
      h1: 'Sell a Business in Newcastle',
      intro:
        'Thinking of selling your Newcastle business? We value your business, prepare it for buyers and run a confidential sale, reaching buyers in the Hunter, Sydney and across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from across Australia',
        'Every buyer under NDA and approved by you',
        'Confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Newcastle',
      overview: [
        'Newcastle is the centre of the Hunter region and one of Australia’s largest regional cities. The Port of Newcastle, the University of Newcastle and John Hunter Hospital anchor a broad economy, while Hunter Street, Darby Street, Beaumont Street and the Honeysuckle precinct carry hospitality, retail and services.',
        'The wider Hunter adds engineering, mining services, manufacturing, defence suppliers around Williamtown, and the Hunter Valley’s wine and tourism businesses. These often have skilled teams and long-standing commercial customers.',
        'We work with Newcastle owners by phone and video and meet in person when the deal needs it. A national buyer search can widen the field beyond local buyers and support a stronger price.',
      ],
      highlights: [
        'Sales of engineering, trade, health, hospitality and service businesses',
        'Buyers in the Hunter, Sydney and nationally',
        'Private investors and acquisitive groups in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Newcastle business for sale',
      tipsIntro: 'Practical steps for Newcastle and Hunter owners.',
      tips: [
        {
          title: 'Show customer diversity',
          text: 'Businesses that serve mining, energy or a single major contractor can be seen as higher risk. Show how revenue is spread across customers and industries.',
        },
        {
          title: 'Document your team and systems',
          text: 'Engineering and trade businesses sell for more when skilled staff are staying and jobs run without the owner on every site.',
        },
        {
          title: 'Present clean financials',
          text: 'Three years of accounts that match tax returns and BAS help buyers secure finance and support a stronger price.',
        },
        {
          title: 'Check your lease early',
          text: 'Confirm your term and options and talk to your landlord about assignment before buyers start asking.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Newcastle?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers locally and nationally under NDA, and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Newcastle?',
          a: 'No. Our office is in Melbourne. We work with Newcastle and Hunter owners by phone and video and meet in person when a deal needs it.',
        },
        {
          q: 'Can you sell a mining services or engineering business in the Hunter?',
          a: 'Yes. We prepare engineering, mining services and industrial businesses for sale, including contract summaries, asset registers and plans to keep skilled staff.',
        },
        {
          q: 'What is my Newcastle business worth?',
          a: 'Value depends mainly on reliable earnings, customer concentration, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Newcastle NSW with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business newcastle',
      keywords: ['businesses for sale newcastle nsw', 'buy a business hunter valley', 'newcastle business for sale', 'buyers advisor newcastle'],
      title: 'Buy a Business in Newcastle, NSW | Blackmont Advisory',
      description:
        'Want to buy a business in Newcastle, NSW? Blackmont Advisory finds Newcastle and Hunter businesses, checks the figures and negotiates the deal for you only.',
      h1: 'Buy a Business in Newcastle',
      intro:
        'Looking to buy a business in Newcastle? We act only for buyers. We find suitable businesses in Newcastle and the Hunter, test the figures with you and negotiate the price and terms.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Newcastle',
      overview: [
        'Newcastle offers buyers a major regional city with lower prices than Sydney. Hospitality, retail and services trade along Hunter Street, Darby Street and Beaumont Street, and the university and hospitals support health and education businesses.',
        'Across the Hunter there are engineering, mining services, manufacturing and defence supply businesses, plus wine and tourism in the Hunter Valley. Many have long-standing customers and skilled teams.',
        'We help you understand how secure the revenue is, especially where it depends on one industry or contract, and negotiate a price that reflects it.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Engineering, trade, health, hospitality and tourism businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Newcastle',
      tipsIntro: 'Tips we share with buyers looking in the Hunter.',
      tips: [
        {
          title: 'Test industry exposure',
          text: 'Find out how much revenue depends on mining, energy or a single large customer, and what happens if that work slows.',
        },
        {
          title: 'Check staff retention',
          text: 'Skilled tradespeople and engineers are hard to replace. Ask who is staying and consider retention arrangements for key people.',
        },
        {
          title: 'Look at seasonality',
          text: 'Tourism and hospitality businesses can be seasonal. Review monthly figures across at least a full year.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Newcastle?',
          a: 'Common opportunities include engineering and trade businesses, mining and industrial services, hospitality, health and tourism businesses. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Newcastle?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is Newcastle a good place to buy a business?',
          a: 'It can be. Newcastle offers a large regional economy and lower prices than Sydney. The key is checking how much revenue depends on one industry or customer before you commit.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Newcastle NSW with Blackmont Advisory',
    },
  },

  /* ── Central Coast ────────────────────────────────────────── */
  {
    slug: 'central-coast',
    name: 'Central Coast',
    city: 'sydney',
    nearby: ['newcastle', 'northern-beaches', 'north-sydney', 'sydney-cbd'],
    sell: {
      keyword: 'sell a business central coast',
      keywords: ['business broker central coast', 'sell my business gosford', 'sell my business central coast nsw', 'central coast business for sale'],
      title: 'Sell a Business Central Coast NSW | Blackmont Advisory',
      description:
        'Selling a business on the Central Coast, NSW? Blackmont Advisory values and sells Gosford, Erina and Tuggerah businesses confidentially to national buyers.',
      h1: 'Sell a Business on the Central Coast',
      intro:
        'Ready to sell your Central Coast business? We value your business, prepare it for buyers and run a confidential sale, reaching buyers on the Coast, in Sydney and across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from across Australia',
        'Every buyer under NDA and approved by you',
        'Confidential first conversation',
      ],
      overviewHeading: 'Selling a business on the Central Coast',
      overview: [
        'The Central Coast sits between Sydney and Newcastle, with Gosford, Erina, Tuggerah, Wyong and Terrigal as its main centres. Erina Fair and Westfield Tuggerah anchor retail, while coastal towns support hospitality and tourism.',
        'Industrial areas at Somersby, West Gosford and Berkeley Vale hold food manufacturers, trade suppliers and service businesses. A growing population also drives demand for health, childcare, trades and home services.',
        'We work with Central Coast owners by phone and video and meet in person when the deal needs it. Many buyers are Sydney residents looking for a lifestyle change, so a wide search often pays off.',
      ],
      highlights: [
        'Sales of hospitality, trade, health and manufacturing businesses',
        'Buyers on the Coast, in Sydney and nationally',
        'Private investors and local operators in our network',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Central Coast business for sale',
      tipsIntro: 'Practical steps for Central Coast owners before going to market.',
      tips: [
        {
          title: 'Show a full year of trade',
          text: 'Coastal hospitality and tourism can be seasonal. Present monthly figures so buyers see the quiet months as well as summer.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Lifestyle buyers want a business that runs well. Document systems and build a team that can operate without you every day.',
        },
        {
          title: 'Check licences and approvals',
          text: 'Liquor, food, childcare and health businesses need approvals that may not transfer automatically. Plan for this early.',
        },
        {
          title: 'Talk to your landlord',
          text: 'Confirm your lease term and options and discuss assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business on the Central Coast?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers on the Coast, in Sydney and nationally under NDA, and manage the sale to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office on the Central Coast?',
          a: 'No. Our office is in Melbourne. We work with Central Coast owners by phone and video and meet in person when a deal needs it.',
        },
        {
          q: 'Who buys businesses on the Central Coast?',
          a: 'Buyers include local operators, Sydney residents seeking a lifestyle move, and groups expanding along the coast. A confidential national search reaches all of them.',
        },
        {
          q: 'What is my Central Coast business worth?',
          a: 'Value depends on reliable earnings, seasonality, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business on the Central Coast NSW with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business central coast',
      keywords: ['businesses for sale central coast nsw', 'buy a business gosford', 'central coast business for sale', 'buyers advisor central coast'],
      title: 'Buy a Business Central Coast NSW | Blackmont Advisory',
      description:
        'Looking to buy a business on the Central Coast? Blackmont Advisory finds Gosford, Erina and Tuggerah businesses, checks the figures and negotiates for you.',
      h1: 'Buy a Business on the Central Coast',
      intro:
        'Looking to buy a business on the Central Coast? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business on the Central Coast',
      overview: [
        'The Central Coast attracts buyers who want a coastal lifestyle within reach of Sydney. Gosford, Erina, Tuggerah and Terrigal support hospitality, retail, health and tourism businesses.',
        'Industrial areas at Somersby, West Gosford and Berkeley Vale offer manufacturing, trade supply and service businesses, and population growth supports childcare, trades and home services.',
        'A lifestyle purchase still needs to make financial sense. We help you check the real earnings, the seasonality and the owner’s role before you commit.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, tourism, trade and manufacturing businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy on the Central Coast',
      tipsIntro: 'Tips we share with buyers looking on the Coast.',
      tips: [
        {
          title: 'Check seasonal cash flow',
          text: 'Coastal businesses can swing between summer and winter. Review monthly figures and plan for the quieter months.',
        },
        {
          title: 'Test the owner’s role',
          text: 'Find out how many hours the owner works and which customers deal only with them. Build a proper handover into the deal.',
        },
        {
          title: 'Confirm approvals transfer',
          text: 'For liquor, food, childcare and health, check which licences you must apply for and make the sale conditional on getting them.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale on the Central Coast?',
          a: 'Common opportunities include cafes and restaurants, tourism and accommodation, trades, health, childcare and light manufacturing. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business on the Central Coast?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a Central Coast lifestyle business a good investment?',
          a: 'It can be, if the price matches verified earnings and the business does not depend too heavily on the current owner. We help you test both before you commit.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business on the Central Coast NSW with Blackmont Advisory',
    },
  },

  /* ── Wollongong ───────────────────────────────────────────── */
  {
    slug: 'wollongong',
    name: 'Wollongong',
    city: 'sydney',
    nearby: ['sutherland-shire', 'western-sydney', 'eastern-suburbs', 'sydney-cbd'],
    sell: {
      keyword: 'sell a business wollongong',
      keywords: ['business broker wollongong', 'sell my business illawarra', 'sell my business wollongong nsw', 'wollongong business for sale'],
      title: 'Sell a Business in Wollongong, NSW | Blackmont Advisory',
      description:
        'Selling a business in Wollongong or the Illawarra? Blackmont Advisory sells local businesses confidentially, with one senior advisor and buyers Australia-wide.',
      h1: 'Sell a Business in Wollongong',
      intro:
        'Thinking of selling your Wollongong business? We value your business, prepare it for buyers and run a confidential sale, reaching buyers in the Illawarra, Sydney and across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from across Australia',
        'Every buyer under NDA and approved by you',
        'Confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Wollongong',
      overview: [
        'Wollongong is the centre of the Illawarra. Crown Street Mall and Wollongong Central carry retail and hospitality, while the University of Wollongong and Wollongong Hospital support education, health and professional services.',
        'Port Kembla and its steelworks anchor a strong industrial base, with engineering, fabrication, maintenance, logistics and trade businesses in areas such as Unanderra. Tourism along the coast adds hospitality and accommodation businesses.',
        'We work with Illawarra owners by phone and video and meet in person when the deal needs it. A wider buyer search, including Sydney and national buyers, can support a stronger price.',
      ],
      highlights: [
        'Sales of engineering, trade, health and hospitality businesses',
        'Buyers in the Illawarra, Sydney and nationally',
        'Private investors and acquisitive groups in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Wollongong business for sale',
      tipsIntro: 'Practical steps for Illawarra owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show customer spread',
          text: 'Businesses that rely on the steelworks or one major contractor can look higher risk. Show how revenue is spread across customers.',
        },
        {
          title: 'Keep skilled staff on side',
          text: 'Engineering and trade businesses depend on qualified people. Up-to-date contracts and a clear team structure reassure buyers.',
        },
        {
          title: 'List equipment and vehicles',
          text: 'Record machinery, vehicles and tools with condition, finance owing and service history.',
        },
        {
          title: 'Check your lease',
          text: 'Confirm your term and options and talk to your landlord about assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Wollongong?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage negotiations through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Wollongong?',
          a: 'No. Our office is in Melbourne. We work with Wollongong and Illawarra owners by phone and video and meet in person when a deal needs it.',
        },
        {
          q: 'Can you sell an engineering or industrial business in the Illawarra?',
          a: 'Yes. We prepare engineering, fabrication and industrial service businesses for sale, including contract summaries, asset registers and plans to keep key staff.',
        },
        {
          q: 'What is my Wollongong business worth?',
          a: 'Value depends on reliable earnings, customer concentration, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Office buildings representing sell a business in Wollongong NSW with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business wollongong',
      keywords: ['businesses for sale wollongong', 'buy a business illawarra', 'wollongong business for sale', 'buyers advisor wollongong'],
      title: 'Buy a Business in Wollongong, NSW | Blackmont Advisory',
      description:
        'Want to buy a business in Wollongong or the Illawarra? Blackmont Advisory finds local businesses, checks the numbers and negotiates the deal in your interest.',
      h1: 'Buy a Business in Wollongong',
      intro:
        'Looking to buy a business in Wollongong? We act only for buyers. We find suitable businesses across the Illawarra, test the figures with you and negotiate the price and terms.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Wollongong',
      overview: [
        'Wollongong gives buyers a large regional city with prices below Sydney’s. Crown Street Mall and Wollongong Central support retail and hospitality, and the university and hospital support health, education and professional services.',
        'Port Kembla anchors engineering, fabrication, logistics and trade businesses, while the coast supports tourism, cafes and accommodation.',
        'We help you check how secure the revenue is, especially where it depends on a few industrial customers, and negotiate a price that reflects the risk.',
      ],
      highlights: [
        'Advice for the buyer only',
        'Engineering, trade, health and hospitality businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Wollongong',
      tipsIntro: 'Questions we ask on every Illawarra purchase.',
      tips: [
        {
          title: 'Test customer concentration',
          text: 'Find out how much work comes from the steelworks, the port or one major contractor, and whether those relationships will continue.',
        },
        {
          title: 'Check staff and licences',
          text: 'Confirm trade licences, safety records and whether key qualified staff will stay after the sale.',
        },
        {
          title: 'Inspect equipment',
          text: 'Have machinery and vehicles inspected and valued, and factor replacements into your offer.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in Wollongong?',
          a: 'Common opportunities include engineering and trade businesses, industrial services, cafes and hospitality, health and tourism businesses. We also approach owners off-market for you.',
        },
        {
          q: 'How do I buy a business in Wollongong?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is Wollongong a good place to buy a business?',
          a: 'It can be. Wollongong offers a large regional economy and lower prices than Sydney. Check how much revenue depends on a few industrial customers before you commit.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Office buildings representing buy a business in Wollongong NSW with Blackmont Advisory',
    },
  },
];
