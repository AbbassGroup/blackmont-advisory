import type { SuburbEntry } from './types';

/**
 * Inner-Brisbane suburb pages. Our office is in Melbourne (Toorak); Brisbane
 * clients are served by phone and video, with in-person meetings when a deal
 * needs it. No Brisbane deals or Queensland licence are claimed here.
 */
export const BRISBANE: SuburbEntry[] = [
  /* ── Brisbane CBD ───────────────────────────────────────────── */
  {
    slug: 'brisbane-cbd',
    name: 'Brisbane CBD',
    city: 'brisbane',
    nearby: ['fortitude-valley', 'south-brisbane', 'west-end', 'newstead'],
    sell: {
      keyword: 'sell a business brisbane cbd',
      imageAlt: 'Glass office towers, representing how to sell a business in the Brisbane CBD',
      title: 'Sell a Business Brisbane CBD | Blackmont Advisory',
      description:
        'Looking to sell a business in the Brisbane CBD? We value, prepare and confidentially market your firm to screened buyers. Book a free, private first chat.',
      h1: 'Sell a Business in the Brisbane CBD',
      intro:
        'Own a professional services firm, a city café or a specialist retailer in the Brisbane CBD? We help you price it properly, prepare it for scrutiny and put it in front of qualified buyers without your staff, clients or competitors finding out.',
      points: [
        'A private, no-cost first conversation',
        'Buyers screened and signed to an NDA',
        'Clear advice on how to price a business to sell',
        'One senior advisor from start to settlement',
      ],
      overviewHeading: 'How to sell a business in the Brisbane CBD',
      overview: [
        'The Brisbane CBD is the state’s main office market. Law and accounting practices cluster around Eagle Street, government work fills the George Street end of town, and the Queen Street Mall carries much of the city’s retail and food trade. Businesses here tend to rely on people, contracts and foot traffic rather than plant and equipment.',
        'That shapes the sale. Buyers of a city practice want to know whether clients will stay once the founder steps back. Buyers of a café or shop want to see how trade holds up between weekday peaks and quieter weekends. Your information memorandum needs to answer those questions before they are asked.',
        'We act as your business sell advisor from Melbourne, working by phone and video and meeting in Brisbane when the deal calls for it.',
      ],
      highlights: [
        'Approaches to buyers in Queensland and interstate',
        'Experience with service firms built on client relationships',
        'Your name withheld until a buyer has signed an NDA',
        'Fees agreed in writing before any work begins',
      ],
      tipsHeading: 'Getting a Brisbane CBD business ready to sell',
      tipsIntro: 'The points city buyers and their advisors focus on first.',
      tips: [
        {
          title: 'Lock in your key clients',
          text: 'If a handful of accounts drive most of your revenue, show how long they have stayed and whether contracts or retainers are in place. Concentration is the first thing a buyer of a CBD practice will test.',
        },
        {
          title: 'Review your office lease',
          text: 'City tenancies often carry make-good clauses and fixed reviews. Know your remaining term, any options and what the landlord needs to approve an assignment, so the lease does not stall a sale late in the process.',
        },
        {
          title: 'Separate weekday and weekend trade',
          text: 'For hospitality and retail near the Queen Street Mall, buyers want to see how sales split across the week. Break your figures down so the quieter days are explained rather than discovered.',
        },
        {
          title: 'Document who does what',
          text: 'A buyer pays more when senior staff, not just the owner, handle clients and pricing. Write down roles, processes and key relationships well before you go to market.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in the Brisbane CBD without staff finding out?',
          a: 'We market the business without naming it, using a short anonymous profile. Only buyers who sign a confidentiality agreement and pass our screening see the full details, and you approve each one first. Meetings and site visits are arranged outside trading hours where needed.',
        },
        {
          q: 'What is a CBD professional services firm worth?',
          a: 'It depends mostly on maintainable earnings and how much of the client base will transfer to a new owner. Firms with recurring work, a team that manages clients and a low reliance on the founder usually attract stronger offers. A valuation is the right starting point.',
          link: { href: '/business-valuation', label: 'Try our business valuation tool' },
        },
        {
          q: 'Do you meet Brisbane clients in person?',
          a: 'Our office is in Toorak, Melbourne. Most of the work with Brisbane owners happens by phone and video, which keeps things discreet, and we travel to meet you and buyers in person when the sale needs it.',
          link: { href: '/business-brokers/brisbane', label: 'Our Brisbane broker services' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business brisbane cbd',
      imageAlt: 'Glass office towers, representing the chance to buy a business in the Brisbane CBD',
      title: 'Buy a Business Brisbane CBD | Blackmont Advisory',
      description:
        'Want to buy a business in the Brisbane CBD? We search on and off market, test the numbers and negotiate for you, working only for you. Start with a free chat.',
      h1: 'Buy a Business in the Brisbane CBD',
      intro:
        'Thinking of buying an accounting practice, a city café or a niche retailer in the Brisbane CBD? We work only for you as buyer, finding opportunities, testing the earnings and negotiating a price and handover that suit you.',
      points: [
        'Independent business buy advisor on your side',
        'Off-market approaches to city owners',
        'Due diligence alongside your accountant and lawyer',
        'Help with a handover plan that protects clients',
      ],
      overviewHeading: 'Buying a business in the Brisbane CBD',
      overview: [
        'Many of the best city businesses never reach a public listing. Owners of established practices and long-running food outlets often prefer a quiet approach, which is why a targeted, off-market search matters in the CBD.',
        'The risks are different too. With a service firm you are buying relationships, so the questions are how loyal the clients are and who really holds them. With a retail or hospitality outlet near the Queen Street Mall, it is the lease, the rent and how trade moves with office occupancy across the week.',
        'We help you work out how to find a business to buy that fits your budget and skills, then check every claim in the seller’s figures before you commit.',
      ],
      highlights: [
        'We act for you, never the seller',
        'Searches beyond the usual listing sites',
        'Earnings checked against tax returns and BAS',
        'Negotiation on price, terms and handover',
      ],
      tipsHeading: 'What to check before buying in the Brisbane CBD',
      tipsIntro: 'Where city deals tend to go wrong, and how to avoid it.',
      tips: [
        {
          title: 'Test client loyalty',
          text: 'Ask how long the top clients have stayed and whether they deal with the owner or the team. Consider part of the price being tied to clients staying after settlement.',
        },
        {
          title: 'Read the lease in full',
          text: 'Check the remaining term, rent reviews, outgoings and any make-good obligations. A short or expensive CBD lease can wipe out the value of an otherwise sound business.',
        },
        {
          title: 'Watch office occupancy',
          text: 'City food and retail outlets rely on workers being in the office. Look at trade by day of the week and how it has moved in recent years, not just the annual total.',
        },
        {
          title: 'Keep key staff',
          text: 'In a city practice the senior employees often matter as much as the owner. Find out who they are early and plan how to keep them through the change of ownership.',
        },
      ],
      faqs: [
        {
          q: 'How do I find a business to buy in the Brisbane CBD?',
          a: 'Listing sites show only part of the market. We combine them with broker contacts and direct, confidential approaches to owners who may sell for the right offer. You tell us the industry, size and budget, and we bring you businesses that actually fit.',
          link: { href: '/buying-a-business/brisbane', label: 'Buying a business in Brisbane' },
        },
        {
          q: 'What does due diligence cover for a city business?',
          a: 'At minimum: financial records matched to tax returns, the lease, key contracts, staff entitlements and any licences or registrations. For a service firm we also look closely at client concentration and how work is won. Your accountant and lawyer handle the formal review with us.',
        },
        {
          q: 'Can I buy a CBD business if I live interstate?',
          a: 'Yes. We run the search and early checks remotely, and you visit once there is a business worth seeing. Plan for a handover period long enough to meet clients, suppliers and staff in person.',
        },
      ],
    },
  },

  /* ── Fortitude Valley ───────────────────────────────────────── */
  {
    slug: 'fortitude-valley',
    name: 'Fortitude Valley',
    city: 'brisbane',
    nearby: ['brisbane-cbd', 'newstead', 'south-brisbane', 'west-end'],
    sell: {
      keyword: 'sell a business fortitude valley',
      imageAlt: 'Glass office buildings, representing how to sell a business in Fortitude Valley',
      title: 'Sell a Business Fortitude Valley | Blackmont Advisory',
      description:
        'Planning to sell a business in Fortitude Valley? From bars to studios, we value it fairly and take it to screened buyers in confidence. Talk to us today.',
      h1: 'Sell a Business in Fortitude Valley',
      intro:
        'From late-night venues and restaurants to creative agencies and tech firms in converted warehouses, Fortitude Valley businesses need a buyer who understands the precinct. We help you reach them quietly and on the right terms.',
      points: [
        'Discreet marketing that protects your venue’s name',
        'Buyers screened before they see any figures',
        'Help preparing licence and lease details',
        'A senior advisor running the whole sale',
      ],
      overviewHeading: 'Selling a business in Fortitude Valley',
      overview: [
        'The Valley has two faces. After dark it is Brisbane’s best-known entertainment district, with bars, clubs and live music around Brunswick Street Mall and Chinatown. By day, James Street dining and fashion, and a growing base of offices, bring a very different crowd.',
        'For hospitality sellers, the licence, trading hours and lease are often worth as much as the fit-out, and buyers will check every condition attached to them. For agencies and studios, value sits in the team and the client list.',
        'Either way, a sale needs careful handling. Word that a venue is for sale can unsettle staff and regulars quickly. We approach buyers without naming the business and bring them in only once they have signed an NDA and you have approved them.',
      ],
      highlights: [
        'Experience with licensed venues and hospitality',
        'Buyers from Queensland and interstate',
        'Confidential from first contact to settlement',
        'Fees set out in writing up front',
      ],
      tipsHeading: 'Preparing a Fortitude Valley business for sale',
      tipsIntro: 'What buyers in the Valley look at closely.',
      tips: [
        {
          title: 'Get your licence paperwork in order',
          text: 'Have your liquor licence, approved trading hours and any conditions ready to show. Buyers and their lawyers will want to know exactly what transfers and what the approval process looks like.',
        },
        {
          title: 'Show the full trading week',
          text: 'Night-time venues often earn most of their money on a few nights. Present takings by day and by month so a buyer can see the real pattern, including quieter periods.',
        },
        {
          title: 'Check your lease covers your use',
          text: 'Make sure the permitted use, hours and any noise conditions in your lease match how you actually trade. Gaps here are a common reason Valley deals slow down.',
        },
        {
          title: 'Keep your best staff informed at the right time',
          text: 'Venue managers and head chefs carry a lot of value. Plan when and how to tell them, and consider incentives so they stay through the sale and handover.',
        },
      ],
      faqs: [
        {
          q: 'Can I sell a business in Fortitude Valley that holds a liquor licence?',
          a: 'Yes, though the licence usually needs regulator approval to transfer, so build that into the timeline. We help you prepare the documents, and the buyer’s lawyer manages the application. Conditions such as trading hours affect value, so buyers will want them clear from the start.',
        },
        {
          q: 'How do I price a bar or restaurant in the Valley?',
          a: 'Price follows the profit a new owner can expect to keep making, adjusted for the lease, licence conditions and the state of the fit-out. Owners often overvalue equipment; buyers look at earnings. A proper valuation keeps your asking price credible.',
          link: { href: '/business-valuation', label: 'Estimate what your business is worth' },
        },
        {
          q: 'How long does it take to sell a Valley business?',
          a: 'Many sales take several months from preparation to settlement, and licensed venues can take longer while approvals come through. Having your financials, lease and licence documents ready before you go to market is the best way to shorten it.',
          link: { href: '/resources/guides', label: 'Read our selling guides' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business fortitude valley',
      imageAlt: 'Glass office buildings, representing the chance to buy a business in Fortitude Valley',
      title: 'Buy a Business Fortitude Valley | Blackmont Advisory',
      description:
        'Want to buy a business in Fortitude Valley? We find venues, studios and shops, test the trading figures and negotiate for you. Book a free, private chat.',
      h1: 'Buy a Business in Fortitude Valley',
      intro:
        'Want to own a bar, restaurant, boutique or studio in Fortitude Valley? We help you find the right opportunity, check that the takings are real and negotiate a deal that accounts for the licence, the lease and the precinct.',
      points: [
        'Advice for buyers only, independent of sellers',
        'Off-market searches across the Valley',
        'Licence and lease risks flagged early',
        'Support from offer through to handover',
      ],
      overviewHeading: 'Buying a business in Fortitude Valley',
      overview: [
        'Fortitude Valley offers more variety than most Brisbane suburbs. There are licensed venues around Brunswick Street Mall, restaurants and boutiques on James Street, Asian food and grocery outlets in Chinatown, and service businesses in the offices that have spread through the area.',
        'Hospitality is where buyers need the most care. A venue’s value depends on its licence conditions, permitted trading hours and lease, as well as cash takings that can be hard to verify. A business that looks busy on a Saturday night may still struggle midweek.',
        'As your business buy advisor, we check those points before you make an offer, and help you understand what the business can earn under your ownership.',
      ],
      highlights: [
        'On your side only, from search to settlement',
        'Close review of venue takings and costs',
        'Licence transfer timing built into the deal',
        'Clear advice on what a fair price looks like',
      ],
      tipsHeading: 'Tips for buying a business in Fortitude Valley',
      tipsIntro: 'The checks that matter most for Valley businesses.',
      tips: [
        {
          title: 'Verify cash takings',
          text: 'Match point-of-sale reports against bank deposits, BAS and supplier invoices. In cash-heavy venues, the figures you are shown should line up with what the business actually buys and banks.',
        },
        {
          title: 'Understand the licence conditions',
          text: 'Find out exactly what the licence allows, from hours to capacity, and how long a transfer is likely to take. Make the contract conditional on that approval.',
        },
        {
          title: 'Visit at different times',
          text: 'Go on a weeknight, a Saturday and a weekday lunchtime. The Valley’s crowds change sharply across the week, and you need to see the quiet times as well as the busy ones.',
        },
        {
          title: 'Budget for the fit-out',
          text: 'Ask when the venue was last refurbished and what the lease requires at the end of the term. A tired fit-out can mean a large spend soon after you take over.',
        },
      ],
      faqs: [
        {
          q: 'What should I check before I buy a business in Fortitude Valley?',
          a: 'Start with the financials matched to tax records, then the lease, the licence and any council approvals. For venues, check staffing costs, supplier terms and whether takings are steady across the week. We coordinate these checks with your accountant and lawyer.',
        },
        {
          q: 'Are there Valley businesses for sale off market?',
          a: 'Often, yes. Venue and agency owners frequently prefer a private sale to avoid unsettling staff and customers. We approach owners directly and confidentially on your behalf, which can open up options you will not see on listing sites.',
          link: { href: '/buying-a-business/brisbane', label: 'Buying a business in Brisbane' },
        },
        {
          q: 'Should I buy an existing venue or start one?',
          a: 'An existing venue comes with a licence, a fit-out, staff and trading history, which removes much of the start-up risk. You pay for that in the price. We help you compare the asking price with the real cost and time of starting from scratch.',
        },
      ],
    },
  },

  /* ── South Brisbane ─────────────────────────────────────────── */
  {
    slug: 'south-brisbane',
    name: 'South Brisbane',
    city: 'brisbane',
    nearby: ['west-end', 'brisbane-cbd', 'fortitude-valley'],
    sell: {
      keyword: 'sell a business south brisbane',
      imageAlt: 'Glass office towers, representing how to sell a business in South Brisbane',
      title: 'Sell a Business South Brisbane | Blackmont Advisory',
      description:
        'Ready to sell a business in South Brisbane? We value it properly, prepare a strong information memorandum and approach buyers privately. Get in touch.',
      h1: 'Sell a Business in South Brisbane',
      intro:
        'Run a restaurant near South Bank, a health practice close to the Mater or a services firm on Grey Street? We help South Brisbane owners prepare, price and sell their business to the right buyer, without going public.',
      points: [
        'A free, confidential first discussion',
        'A professional information memorandum',
        'Buyers approved by you before they see details',
        'Guidance on timing and handover',
      ],
      overviewHeading: 'Selling a business in South Brisbane',
      overview: [
        'South Brisbane mixes tourism, culture and health. South Bank Parklands, the Queensland Performing Arts Centre, the galleries and museum, and the Brisbane Convention and Exhibition Centre draw visitors all year, while the Mater hospitals support a steady base of medical and allied health practices nearby.',
        'Those different drivers matter to buyers. A café on Grey Street may rise and fall with events and school holidays. A health practice near the hospital is more likely to be judged on referral sources, practitioner retention and its fit-out.',
        'We prepare an information memorandum that explains how your business earns its money in this precinct, then take it to qualified buyers under NDA, so you only deal with people who are serious and able to buy.',
      ],
      highlights: [
        'Experience with hospitality and health practices',
        'Buyers reached in Queensland and interstate',
        'Confidential marketing with no public listing',
        'Written fee terms before we start',
      ],
      tipsHeading: 'How to prepare a South Brisbane business for sale',
      tipsIntro: 'What buyers ask about businesses in this precinct.',
      tips: [
        {
          title: 'Explain event-driven trade',
          text: 'If concerts, conventions or school holidays lift your sales, show monthly figures and link the peaks to the events behind them. Buyers value trade they can understand and plan for.',
        },
        {
          title: 'Map your referral sources',
          text: 'For health and allied health practices, show where patients come from and how much depends on individual practitioners. Spread-out referrals make a practice easier to sell.',
        },
        {
          title: 'Secure your practitioners',
          text: 'If contractors or associates generate much of the revenue, check their agreements and find out whether they intend to stay. A buyer will ask early.',
        },
        {
          title: 'Tidy up your fit-out records',
          text: 'Keep invoices, approvals and maintenance records for kitchens, treatment rooms and equipment. They support your price and answer due diligence questions quickly.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in South Brisbane confidentially?',
          a: 'We describe your business in general terms to start with, without naming it or its exact location. Interested buyers sign a confidentiality agreement and are screened before receiving the information memorandum, and you approve every buyer who goes further.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
        {
          q: 'Can you help sell a medical or allied health practice?',
          a: 'Yes. Health practices are judged on patient numbers, referral patterns, practitioner arrangements and the fit-out. We help you present those clearly and find buyers, including other practitioners and groups, who understand how these businesses run.',
        },
        {
          q: 'What will a buyer’s due diligence look at?',
          a: 'Expect questions about your financial statements, tax returns and BAS, the lease, staff and contractor arrangements, and any registrations or approvals. Preparing these before you go to market keeps momentum once a buyer is interested.',
          link: { href: '/resources/guides', label: 'Read our guides for sellers' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business south brisbane',
      imageAlt: 'Glass office towers, representing the chance to buy a business in South Brisbane',
      title: 'Buy a Business South Brisbane | Blackmont Advisory',
      description:
        'Looking to buy a business in South Brisbane? We help you find, value and negotiate the right café, practice or service firm, working only for you.',
      h1: 'Buy a Business in South Brisbane',
      intro:
        'Interested in a café near the Cultural Centre, a practice close to the Mater or a business serving the South Bank crowds? We help you find the right South Brisbane business and buy it on terms that make sense.',
      points: [
        'Independent advice for buyers only',
        'Targeted search, including off market',
        'Seller’s figures checked before you offer',
        'Help negotiating price and terms',
      ],
      overviewHeading: 'Buying a business in South Brisbane',
      overview: [
        'South Brisbane gives buyers a mix of visitor-driven and local trade. South Bank Parklands and the cultural precinct bring tourists and event crowds, the convention centre adds business visitors, and the Mater hospitals keep a steady flow of patients, staff and families in the area.',
        'Each type of business carries its own risks. A food outlet near the parklands may depend heavily on weekends, holidays and the events calendar. A health practice depends on its practitioners staying and on referral sources that will continue after the sale.',
        'We look at how the business really earns its income before you commit, so you understand what you are buying and what a fair price is.',
      ],
      highlights: [
        'We work only for you as buyer',
        'Detailed review of seasonal and event trade',
        'Practitioner and staff risks checked early',
        'Handover planned around your needs',
      ],
      tipsHeading: 'Buying in South Brisbane: what to check',
      tipsIntro: 'Practical checks for buyers in the precinct.',
      tips: [
        {
          title: 'Look at twelve months, not one',
          text: 'Visitor numbers in South Brisbane change with the seasons and the events calendar. Review monthly sales across at least a full year before relying on any annual figure.',
        },
        {
          title: 'Confirm who earns the revenue',
          text: 'In a practice, find out how much each practitioner bills and whether they are employees or contractors. Make sure key people are willing to stay after you take over.',
        },
        {
          title: 'Check access and parking',
          text: 'Customers and patients need to get to you. Look at parking, public transport and any planned works nearby that could affect access during your first years.',
        },
        {
          title: 'Understand the lease terms',
          text: 'Check the term, options, rent reviews and permitted use. Precinct leases can include trading obligations or restrictions that matter for how you plan to run the business.',
        },
      ],
      faqs: [
        {
          q: 'Is it a good idea to buy a business in South Brisbane?',
          a: 'It can be, if the business suits your skills and its income is steady enough for your plans. The area’s visitors and health precinct support a range of businesses. The key is checking how dependent the business is on events, seasons or a few individuals.',
        },
        {
          q: 'How do I know the asking price is fair?',
          a: 'We look at the profit a new owner can expect to keep, adjust for one-off items and the owner’s own wages, and compare the result with the asking price. That gives you a sound basis for negotiation.',
          link: { href: '/business-valuation', label: 'See how businesses are valued' },
        },
        {
          q: 'Can you help if I am moving to Brisbane to buy a business?',
          a: 'Yes. Many buyers in Queensland are relocating. We do the searching and early checks while you are still interstate, then help you plan visits and a handover long enough to settle in.',
          link: { href: '/buying-a-business/brisbane', label: 'Buying a business in Brisbane' },
        },
      ],
    },
  },

  /* ── Newstead ───────────────────────────────────────────────── */
  {
    slug: 'newstead',
    name: 'Newstead',
    city: 'brisbane',
    nearby: ['fortitude-valley', 'brisbane-cbd', 'west-end'],
    sell: {
      keyword: 'sell a business newstead',
      imageAlt: 'Glass office buildings, representing how to sell a business in Newstead',
      title: 'Sell a Business Newstead | Blackmont Advisory',
      description:
        'Thinking about how to sell a business in Newstead? We price it on real earnings and take it privately to qualified buyers. Book a confidential chat today.',
      h1: 'Sell a Business in Newstead',
      intro:
        'Newstead has become one of Brisbane’s busiest inner-north business areas. Whether you run a café, a gym, a design studio or a professional firm, we help you sell it privately to a buyer who sees its value.',
      points: [
        'A no-obligation, private first conversation',
        'An honest view on price before you list',
        'Only screened, NDA-signed buyers',
        'Support right through to handover',
      ],
      overviewHeading: 'How to sell a business in Newstead',
      overview: [
        'Over the past two decades Newstead has changed from an industrial area into a dense mix of apartments, offices and lifestyle businesses. The Gasworks precinct anchors much of the retail and dining, and nearby Teneriffe’s converted woolstores add to the area’s character.',
        'Many Newstead businesses rely on locals who live in the surrounding apartments: cafés, fitness studios, health and beauty services, and convenience retail. Others are offices serving clients across the city. Buyers will want to know how much of your trade comes from regulars and whether it is growing with the area.',
        'We help you show that clearly. Our role as business sell advisor is to present your business at its best, price it on earnings a buyer can rely on and manage the sale quietly from start to finish.',
      ],
      highlights: [
        'Experience with lifestyle and service businesses',
        'Buyers from Brisbane and interstate',
        'No public listing unless you choose one',
        'Fees and scope agreed in writing',
      ],
      tipsHeading: 'Getting a Newstead business ready for buyers',
      tipsIntro: 'Steps that add value for Newstead sellers.',
      tips: [
        {
          title: 'Show your repeat customers',
          text: 'Memberships, loyalty programs and booking data are strong evidence of local demand. Pull these into simple reports that show how many customers come back and how often.',
        },
        {
          title: 'Present recurring income separately',
          text: 'If you sell memberships, packages or retainers, separate that income from one-off sales. Buyers usually value predictable income more highly.',
        },
        {
          title: 'Check your lease runway',
          text: 'Newer buildings in Newstead often have modern leases with set review dates. Confirm your term and options, and what the landlord needs before agreeing to an assignment.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'If customers come for you personally, start handing relationships and front-of-house work to your team now. The less the business depends on you, the more it is worth.',
        },
      ],
      faqs: [
        {
          q: 'What sort of buyers look to buy businesses in Newstead?',
          a: 'Often owner-operators who want a lifestyle business in an established inner-city area, people relocating to Brisbane, and existing operators adding another site. The right buyer depends on your business type and size, which shapes how we market it.',
        },
        {
          q: 'How do I price a business to sell in Newstead?',
          a: 'Start with the profit the business makes once the owner is paid a fair wage, then consider how reliable that profit is. Recurring membership income, a strong team and a long lease all support a higher price.',
          link: { href: '/business-valuation', label: 'Use our valuation calculator' },
        },
        {
          q: 'Do I need a Brisbane-based broker to sell in Newstead?',
          a: 'Not necessarily. What matters is reaching the right buyers and running the sale well. We are based in Melbourne, work with Brisbane owners by phone and video, meet in person when needed, and approach buyers in Queensland and interstate.',
          link: { href: '/business-brokers/brisbane', label: 'Our Brisbane broker services' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business newstead',
      imageAlt: 'Glass office buildings, representing the chance to buy a business in Newstead',
      title: 'Buy a Business Newstead | Blackmont Advisory',
      description:
        'Want to buy a business in Newstead? We search for cafés, studios and service firms, check the numbers and negotiate the deal for you. Start your search now.',
      h1: 'Buy a Business in Newstead',
      intro:
        'Newstead’s growing residential and office population makes it attractive for buyers looking at hospitality, fitness, health and service businesses. We help you find one that fits and buy it with the facts in front of you.',
      points: [
        'We act only for you, the buyer',
        'On- and off-market opportunities',
        'Due diligence coordinated with your advisors',
        'Clear negotiation on price and terms',
      ],
      overviewHeading: 'Buying a business in Newstead',
      overview: [
        'Newstead’s shift from warehouses to apartments and offices has created a strong local customer base. Around the Gasworks precinct and along the streets towards Teneriffe, cafés, restaurants, gyms, salons and clinics depend on residents and workers who live and work within walking distance.',
        'That is attractive, but it raises questions a careful buyer should ask. How much of the trade is from regulars? Has competition increased as new buildings opened? Are rents in newer developments sustainable for the business you are buying?',
        'We help with how to find a business to buy in Newstead that fits your goals, then test the figures and the lease so you know exactly what you are taking on.',
      ],
      highlights: [
        'Independent business buy advisor',
        'Local demand and competition reviewed',
        'Membership and booking data checked',
        'Support through settlement and handover',
      ],
      tipsHeading: 'What to know before buying in Newstead',
      tipsIntro: 'Key checks for buyers in this fast-changing suburb.',
      tips: [
        {
          title: 'Count the competition',
          text: 'New cafés, gyms and clinics open regularly in growing suburbs. Walk the surrounding streets and note similar businesses nearby, including any opening soon, before deciding on a price.',
        },
        {
          title: 'Check membership numbers',
          text: 'For fitness and wellness businesses, ask for active member counts over time, cancellation rates and any prepaid memberships you would need to honour after settlement.',
        },
        {
          title: 'Compare rent with earnings',
          text: 'Leases in newer buildings can carry higher rents. Make sure the rent and outgoings leave enough profit at the level of trade the business actually achieves.',
        },
        {
          title: 'Plan the handover',
          text: 'Regular customers often know the owner. Agree a handover period where the seller introduces you and stays involved long enough to keep that goodwill.',
        },
      ],
      faqs: [
        {
          q: 'How do I find a business to buy in Newstead?',
          a: 'Tell us what you want: the industry, budget, and how hands-on you plan to be. We search listings, talk to brokers and approach owners directly, which often surfaces businesses that are not advertised. You only see options that match your brief.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What due diligence is needed for a Newstead business?',
          a: 'Review financial statements against tax returns and BAS, the lease, staff entitlements, supplier contracts and any customer obligations such as prepaid memberships. Your accountant and lawyer complete the formal checks, and we coordinate the process.',
        },
        {
          q: 'Can I get finance for a business acquisition in Newstead?',
          a: 'Many buyers use a mix of savings and bank lending. Lenders look at the business’s profit history, your experience and the security on offer. Talk to your lender early so you know your limit before you make an offer.',
        },
      ],
    },
  },

  /* ── West End ───────────────────────────────────────────────── */
  {
    slug: 'west-end',
    name: 'West End',
    city: 'brisbane',
    nearby: ['south-brisbane', 'brisbane-cbd', 'fortitude-valley', 'newstead'],
    sell: {
      keyword: 'sell a business west end',
      imageAlt: 'Glass office towers, representing how to sell a business in West End, Brisbane',
      title: 'Sell a Business West End | Blackmont Advisory',
      description:
        'Need to sell a business in West End? We help cafés, shops and independent brands sell privately, at a fair price, to the right buyer. Talk to us today.',
      h1: 'Sell a Business in West End',
      intro:
        'West End’s independent cafés, restaurants, bars and shops have loyal customers and a strong local identity. We help owners sell to a buyer who will respect what they have built, while keeping the sale confidential.',
      points: [
        'A confidential conversation to start',
        'Realistic pricing based on earnings',
        'Buyers vetted and under NDA',
        'A senior advisor managing every step',
      ],
      overviewHeading: 'Selling a business in West End',
      overview: [
        'West End is one of Brisbane’s most distinctive inner suburbs. Boundary Street is lined with independent cafés, restaurants, bars and shops, the Saturday markets at Davies Park draw crowds from across the city, and apartments along the river have added many new residents.',
        'Businesses here often succeed because of their character and the owner’s connection with the community. That is a strength, but buyers will ask whether the loyalty belongs to the business or to you. A good sale shows that the brand, the team and the systems will carry on.',
        'We help you prepare for those questions, put a sensible price on the business and approach buyers privately, so customers and staff hear about a change only when you are ready.',
      ],
      highlights: [
        'Experience with independent hospitality and retail',
        'Buyers from Brisbane and interstate',
        'Discreet process with no public listing',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a West End business for sale',
      tipsIntro: 'What helps an independent West End business sell well.',
      tips: [
        {
          title: 'Make the brand transferable',
          text: 'Register your business name and trademarks where relevant, and make sure social media accounts, websites and supplier accounts can pass to a new owner without disruption.',
        },
        {
          title: 'Document your recipes and suppliers',
          text: 'If your menu or product range is part of the appeal, write down recipes, suppliers and standards. Buyers need to know they can deliver the same experience.',
        },
        {
          title: 'Show market and event trade',
          text: 'If the Saturday markets or local events lift your sales, show it in your weekly figures so buyers can see where trade comes from.',
        },
        {
          title: 'Keep the books clean',
          text: 'Independent businesses sometimes mix personal and business costs. Separate them clearly for at least the last three years so your true profit is easy to see.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in West End without losing its customers?',
          a: 'Keep the sale confidential until the right buyer is in place, and plan a handover where you introduce the new owner to staff, suppliers and regulars. Buyers who understand the area often keep what customers love, which protects the price you receive.',
        },
        {
          q: 'Who buys independent cafés and shops in West End?',
          a: 'Usually owner-operators who want a business with character, including hospitality professionals stepping up to ownership and people relocating to Brisbane. We screen each enquiry to make sure buyers are serious and have the funds to proceed.',
        },
        {
          q: 'Do you work with QLD brokers or replace them?',
          a: 'We run the sale ourselves as your advisor, and we are happy to work with buyers introduced by other brokers. Our office is in Melbourne; we work with Queensland owners by phone and video and meet in person when the sale needs it.',
          link: { href: '/selling-a-business/brisbane', label: 'Selling a business in Brisbane' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business west end',
      imageAlt: 'Glass office towers, representing the chance to buy a business in West End, Brisbane',
      title: 'Buy a Business West End | Blackmont Advisory',
      description:
        'Looking to buy a business in West End? We find independent cafés, bars and shops, verify the numbers and negotiate for you. Book a free chat today.',
      h1: 'Buy a Business in West End',
      intro:
        'Want a café, bar or independent shop in one of Brisbane’s most characterful suburbs? We help you find the right West End business, check what it really earns and buy it with a plan for keeping its regulars.',
      points: [
        'Independent advice for buyers',
        'Access to off-market West End businesses',
        'Thorough checks on takings and costs',
        'A handover that protects the goodwill',
      ],
      overviewHeading: 'Buying a business in West End',
      overview: [
        'Buying in West End usually means buying into a community. Boundary Street’s cafés, restaurants, bars and shops have loyal followings, the weekend markets bring in visitors, and new riverside apartments have added residents within walking distance.',
        'The risk for a buyer is that loyalty is tied to the outgoing owner. If customers come because of the person behind the counter, part of the value can walk out at settlement. You need to judge how much of the trade will stay and plan a handover that keeps it.',
        'We help you weigh that up, alongside the usual checks on the lease, the figures and the condition of the fit-out, so you pay a price that reflects what you are really buying.',
      ],
      highlights: [
        'We act for you, not the seller',
        'Owner reliance and goodwill assessed',
        'Earnings checked against bank and tax records',
        'Negotiation on price, terms and handover',
      ],
      tipsHeading: 'Tips for buying a business in West End',
      tipsIntro: 'What to look at closely before buying in West End.',
      tips: [
        {
          title: 'Spend time as a customer',
          text: 'Visit on weekdays and weekends before you make an offer. Watch who comes in, what they buy and how they interact with the owner and staff.',
        },
        {
          title: 'Check the brand comes with it',
          text: 'Confirm that the business name, website, social accounts and any trademarks are included in the sale and can be transferred into your name.',
        },
        {
          title: 'Ask for a longer handover',
          text: 'In a community-driven business, a few weeks may not be enough. Negotiate a handover in which the seller introduces you to regulars, suppliers and local partners.',
        },
        {
          title: 'Look at planned changes nearby',
          text: 'Development is ongoing in parts of West End. Find out about new buildings, roadworks or competing venues planned close by that could affect trade.',
        },
      ],
      faqs: [
        {
          q: 'What should I check before I buy a business in West End?',
          a: 'Check the financials against tax returns and BAS, the lease and its permitted use, any licences, the condition of equipment and how much trade depends on the current owner. We coordinate these checks with your accountant and lawyer.',
        },
        {
          q: 'How do I find a West End business that is not advertised?',
          a: 'Many independent owners will consider a sale but do not want to list publicly. We contact owners discreetly on your behalf, which can uncover opportunities that never reach the listing sites.',
          link: { href: '/buying-a-business/brisbane', label: 'Buying a business in Brisbane' },
        },
        {
          q: 'Is a café in West End a good first business?',
          a: 'It can be, if you are ready for long hours and the numbers stack up. Look for steady trade across the week, a fair lease and a seller willing to support the handover. We help first-time buyers judge whether a business fits their experience.',
          link: { href: '/resources/guides', label: 'Read our buying guides' },
        },
      ],
    },
  },
];
