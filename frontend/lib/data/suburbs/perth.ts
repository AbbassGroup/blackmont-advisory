import type { SuburbEntry } from './types';

/**
 * Inner-city Perth suburb pages. Our office is in Melbourne: Perth clients are
 * served by phone and video, with in-person meetings when a deal needs them.
 * No WA licence, Perth office or Perth deals are claimed here.
 */
export const PERTH: SuburbEntry[] = [
  /* ── Perth CBD ─────────────────────────────────────────────── */
  {
    slug: 'perth-cbd',
    name: 'Perth CBD',
    city: 'perth',
    nearby: ['west-perth', 'northbridge', 'east-perth'],
    sell: {
      keyword: 'sell a business perth cbd',
      title: 'Sell a Business Perth CBD | Blackmont Advisory',
      description:
        'Looking to sell a business in the Perth CBD? Get a realistic price range and a confidential sale to qualified buyers in WA and nationally. Talk to us.',
      h1: 'Sell a Business in the Perth CBD',
      intro:
        'From St Georges Terrace consultancies to lunchtime trade around the Hay and Murray Street malls, we help Perth CBD owners sell quietly, with a valuation you can rely on and buyers screened before they see a single number.',
      points: [
        'Private sale, no public listing unless you want one',
        'Buyers vetted and under NDA before details are shared',
        'A realistic price range before you commit',
        'Senior advisor from first call to settlement',
      ],
      overviewHeading: 'How to sell a business in the Perth CBD',
      overview: [
        'The city centre is where many of Western Australia’s resources companies, banks, law firms and accounting practices keep their head offices. That shapes the businesses around them: consultancies, recruitment firms, IT providers and the food and retail outlets that live on weekday office trade.',
        'Buyers look closely at how dependent a CBD business is on that weekday crowd, on one or two corporate clients, or on a lease in a particular tower. If those risks are understood and documented before the sale, they are far easier to price.',
        'As a business sell advisor, we prepare the numbers, write an information memorandum that answers buyers’ questions upfront, and take the business to serious buyers in WA and on the east coast without telling the market you are selling.',
      ],
      highlights: [
        'Confidential approaches, not a public advertisement',
        'East coast buyers as well as WA buyers',
        'Information memorandum prepared for you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Selling tips for Perth CBD business owners',
      tipsIntro: 'What city-centre buyers tend to check first, and how to get ahead of it.',
      tips: [
        {
          title: 'Spread your client base',
          text: 'Many CBD service firms rely on a handful of corporate accounts, often in mining or energy. Show how long those relationships have run and what contracts sit behind them, so a buyer sees continuity rather than risk.',
        },
        {
          title: 'Check the lease before buyers do',
          text: 'Office and retail leases in the city often carry make-good clauses and landlord consent for assignment. Know your remaining term, options and obligations so a lease question does not stall a signed deal.',
        },
        {
          title: 'Separate weekday and weekend trade',
          text: 'For food and retail businesses, buyers want to see how sales move between workdays, weekends and holiday periods. Clear monthly figures show the pattern honestly and support your asking price.',
        },
        {
          title: 'Keep the sale quiet in the office',
          text: 'In a tight CBD market, word travels fast between staff, clients and competitors. Agree early who knows about the sale and when, and let us handle buyer enquiries away from your premises.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in the Perth CBD without staff finding out?',
          a: 'We approach buyers privately rather than advertising, and every buyer signs a confidentiality agreement before learning the name of your business. Meetings and site visits are arranged outside trading hours or away from your premises, so your team hears about the sale when you decide to tell them.',
        },
        {
          q: 'How do you price a business to sell in the city?',
          a: 'We start from normalised earnings, adjusting for owner wages and one-off costs, then consider how much of the profit depends on you, key clients and the lease. That gives a range buyers can test in due diligence. Our calculator gives you a first indication.',
          link: { href: '/business-valuation', label: 'Try the valuation calculator' },
        },
        {
          q: 'Will you meet me in Perth?',
          a: 'Our office is in Melbourne, at Toorak. Most of the work with Perth CBD owners happens by phone and video, and we meet in person when the deal needs it, for example to meet a preferred buyer or work through final negotiations.',
        },
      ],
      imageAlt: 'Glass office towers representing a decision to sell a business in the Perth CBD',
    },
    buy: {
      keyword: 'buy a business perth cbd',
      title: 'Buy a Business Perth CBD | Blackmont Advisory',
      description:
        'Want to buy a business in the Perth CBD? We search listings and off-market owners, test the earnings and negotiate a fair price for you. Start now.',
      h1: 'Buy a Business in the Perth CBD',
      intro:
        'Thinking of buying into the city centre, whether a professional services firm near St Georges Terrace or a café that runs on office workers? We act only for you, finding the right business, testing the price and negotiating the deal.',
      points: [
        'We work for the buyer, not the seller',
        'Listed and off-market opportunities',
        'Earnings checked before you make an offer',
        'Support through due diligence and settlement',
      ],
      overviewHeading: 'Buying a business in the Perth CBD',
      overview: [
        'Businesses in central Perth are tied closely to the people who work there. A consultancy may win most of its work from resources and energy companies, while a lunch bar or newsagency depends on how many office workers walk past each weekday.',
        'That makes the questions you ask before buying especially important. How concentrated is the client list? How did trade hold up when office attendance dropped? What does the lease allow, and how long does it have to run?',
        'As your business buy advisor, we help you answer those questions before you commit. We search listings and approach owners directly, check the earnings behind the asking price and negotiate terms that reflect the real risks of a city-centre business acquisition.',
      ],
      highlights: [
        'Advice that is independent of the vendor',
        'Off-market approaches to CBD owners',
        'Clear view of earnings and lease risks',
        'Working with your accountant and lawyer',
      ],
      tipsHeading: 'Tips for buying a business in the Perth CBD',
      tipsIntro: 'Points to check before you put an offer on a city-centre business.',
      tips: [
        {
          title: 'Test the foot traffic yourself',
          text: 'For retail and hospitality, visit at different times: early morning, lunch, mid-afternoon and Friday evening. Compare what you see with the figures in the information memorandum before you rely on them.',
        },
        {
          title: 'Look at who the clients are',
          text: 'If a service business earns a large share of revenue from one resources company or government agency, ask how secure that work is and whether the relationship belongs to the business or to the owner.',
        },
        {
          title: 'Read the building rules',
          text: 'Some CBD towers limit trading hours, signage, deliveries or fit-out changes. Check these conditions in the lease and building rules so you know what you can change after you buy.',
        },
        {
          title: 'Plan the owner’s exit',
          text: 'City-centre clients often deal with the owner personally. Negotiate a handover period, introductions to key contacts and, where suitable, part of the price tied to results after settlement.',
        },
      ],
      faqs: [
        {
          q: 'How do I find a business to buy in the Perth CBD?',
          a: 'Advertised listings are only part of the market. We start with your brief, search listings and broker networks, and approach suitable CBD owners directly about whether they would consider selling. That often turns up businesses that never appear on public sites.',
        },
        {
          q: 'What are common mistakes buying a business in the city?',
          a: 'The most common are trusting adjusted profit figures without checking them, overlooking how much trade depends on office workers or one client, and signing before the lease terms are clear. Careful due diligence with your accountant and lawyer avoids most of these.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can you act for me if you are based in Melbourne?',
          a: 'Yes. Our office is in Toorak, Melbourne, and we work with Perth buyers by phone and video. Documents are reviewed in a secure data room, and we meet in person when a deal needs it.',
        },
      ],
      imageAlt: 'City office towers for buyers looking to buy a business in the Perth CBD',
    },
  },

  /* ── West Perth ────────────────────────────────────────────── */
  {
    slug: 'west-perth',
    name: 'West Perth',
    city: 'perth',
    nearby: ['perth-cbd', 'subiaco', 'northbridge'],
    sell: {
      keyword: 'sell a business west perth',
      title: 'Sell a Business West Perth | Blackmont Advisory',
      description:
        'Planning to sell a business in West Perth? We value it, prepare it and introduce qualified buyers from WA and beyond, confidentially. Enquire now.',
      h1: 'Sell a Business in West Perth',
      intro:
        'West Perth is home to accountants, lawyers, engineers, medical practices and the many exploration and mining companies that base themselves near Kings Park. We help owners here sell privately and on terms that suit them.',
      points: [
        'Valuation built on your normalised earnings',
        'Buyers screened before they learn your name',
        'Sale structured around your exit plans',
        'One senior advisor throughout',
      ],
      overviewHeading: 'Selling a business in West Perth',
      overview: [
        'Just west of the city centre, West Perth is a working precinct of smaller office buildings and converted houses. It suits professional firms and the corporate services that grow up around resources companies: geology and engineering consultancies, company secretarial and accounting practices, and specialist recruiters.',
        'Many of these firms are built on the reputation of one or two principals. Buyers, whether a larger firm, a management team or an investor, will want to know how clients and staff will stay once you step back.',
        'We help you plan that transition, prepare an information memorandum and approach buyers confidentially, including firms on the east coast that want a foothold in Western Australia.',
      ],
      highlights: [
        'Experience with professional services sales',
        'Buyers from WA and interstate',
        'Handover and earn-out structures explained',
        'No public listing unless you choose one',
      ],
      tipsHeading: 'Preparing a West Perth business for sale',
      tipsIntro: 'Steps that make a professional or resources-linked firm easier to buy.',
      tips: [
        {
          title: 'Share client relationships',
          text: 'If clients only ever deal with you, introduce other senior people to them well before the sale. A buyer pays more when relationships already sit with the team rather than one partner.',
        },
        {
          title: 'Explain the resources cycle',
          text: 'Firms that serve mining and exploration companies often see work rise and fall with commodity markets. Several years of results, with notes on what drove each year, help buyers judge the business fairly.',
        },
        {
          title: 'Tidy up work in progress',
          text: 'Unbilled time, retainers and long-running projects can make accounts hard to read. Clear reports on WIP and debtors make it easier to agree a price and settlement adjustments.',
        },
        {
          title: 'Keep key staff on side',
          text: 'Senior employees are often what a buyer is really paying for. Consider retention arrangements and when to tell them about the sale, with advice from your lawyer.',
        },
      ],
      faqs: [
        {
          q: 'Who buys businesses in West Perth?',
          a: 'Typical buyers include larger professional firms looking to grow, east coast groups wanting a presence in Perth, management teams and private investors. For a resources-linked service business, an industry buyer may value your client list and expertise more highly than a general investor would.',
        },
        {
          q: 'Should I sell a business in West Perth on an earn-out?',
          a: 'An earn-out ties part of the price to results after settlement. It can bridge a gap on price when a firm depends on its principal, but it carries risk for you. We explain the options and help negotiate terms that protect you.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
        {
          q: 'Are you WA brokers?',
          a: 'We are based in Toorak, Melbourne, and work with Western Australian owners by phone and video, meeting in person when a deal needs it. Our role is to run a confidential, senior-led sale and reach buyers in WA and nationally.',
          link: { href: '/business-brokers/perth', label: 'Our Perth business broker page' },
        },
      ],
      imageAlt: 'Office buildings for owners ready to sell a business in West Perth',
    },
    buy: {
      keyword: 'buy a business west perth',
      title: 'Buy a Business West Perth | Blackmont Advisory',
      description:
        'Looking to buy a business in West Perth? We find practices and service firms, test the earnings and negotiate for you. Book a confidential chat.',
      h1: 'Buy a Business in West Perth',
      intro:
        'Buying an accounting practice, an engineering consultancy or a service firm that works for the resources sector? We help buyers find the right West Perth business, understand what they are really paying for and agree a fair deal.',
      points: [
        'Independent buy-side advice',
        'Access to practices that are not advertised',
        'Due diligence planned with your advisers',
        'Handover terms negotiated for you',
      ],
      overviewHeading: 'How to buy a business in West Perth',
      overview: [
        'West Perth offers buyers a concentration of established professional and technical firms, many sitting close to the resources companies and listed explorers they serve. Few of these businesses are openly advertised. Owners usually prefer to sell quietly to a buyer they trust.',
        'The value of a firm like this lies in its people, its clients and its reputation. Before buying, you need to know which clients will stay, which staff are critical and how much of the work depends on the market cycle.',
        'We find suitable firms, approach owners directly and help you test the business before you commit, so the business acquisition you make is one you understand.',
      ],
      highlights: [
        'Search across listings and direct approaches',
        'Earnings, WIP and client mix reviewed',
        'Retention and handover terms negotiated',
        'Phone and video meetings, in person when needed',
      ],
      tipsHeading: 'What to check when buying in West Perth',
      tipsIntro: 'Questions worth answering before you buy a professional or technical firm here.',
      tips: [
        {
          title: 'Meet the people who matter',
          text: 'Ask to meet senior staff before you finalise the deal, under a confidentiality agreement. Their plans after the sale can make a bigger difference to the business than any line in the accounts.',
        },
        {
          title: 'Look at more than one good year',
          text: 'A strong year in mining services may reflect a busy exploration market. Review results over several years and ask what pipeline of work exists today.',
        },
        {
          title: 'Check professional obligations',
          text: 'Practices in accounting, law, health and engineering may have registration, insurance or ownership rules. Your lawyer should confirm what applies to you as the new owner.',
        },
        {
          title: 'Agree how the seller exits',
          text: 'A gradual handover, with the seller introducing you to clients over months, often protects value. Spell out the time involved and any payments tied to retention.',
        },
      ],
      faqs: [
        {
          q: 'Can I buy a business in West Perth that isn’t listed for sale?',
          a: 'Often, yes. Many owners of professional and technical firms have not advertised but would consider the right offer. With your brief agreed, we approach suitable owners confidentially and only introduce you once both sides want to talk.',
        },
        {
          q: 'How do you value a professional services firm?',
          a: 'We look at normalised earnings, how secure the client base is, the strength of the team and how much depends on the current owner. Recurring fees and broad client relationships usually support a stronger price than one-off project work.',
          link: { href: '/business-valuation', label: 'See how business valuation works' },
        },
        {
          q: 'What does a business buy advisor do for me?',
          a: 'We act only for you. That means searching for the right business, checking whether the price is supported by the earnings, negotiating price and terms, and coordinating due diligence with your accountant and lawyer through to settlement.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Commercial towers for buyers who want to buy a business in West Perth',
    },
  },

  /* ── Northbridge ───────────────────────────────────────────── */
  {
    slug: 'northbridge',
    name: 'Northbridge',
    city: 'perth',
    nearby: ['perth-cbd', 'east-perth', 'west-perth'],
    sell: {
      keyword: 'sell a business northbridge',
      title: 'Sell a Business Northbridge | Blackmont Advisory',
      description:
        'Ready to sell a business in Northbridge? We value bars, restaurants and venues fairly and find serious buyers, confidentially. Start with a private chat.',
      h1: 'Sell a Business in Northbridge',
      intro:
        'Northbridge is Perth’s busiest after-dark precinct, packed with restaurants, bars, small venues and late-night food. We help hospitality and entertainment owners here sell their business confidentially, at a price backed by clear figures.',
      points: [
        'Hospitality buyers screened before any visit',
        'Liquor licence and lease issues planned early',
        'Valuation based on real trading figures',
        'Your staff told only when you are ready',
      ],
      overviewHeading: 'Selling a business in Northbridge',
      overview: [
        'Across the railway from the city centre, Northbridge combines a dense mix of restaurants, bars, nightclubs and cafés with the Perth Cultural Centre, home to the State Library, the Art Gallery of Western Australia and the WA Museum Boola Bardip.',
        'Hospitality buyers here are experienced and cautious. They will ask about the lease, the liquor licence, staffing costs and how trade moves between weeknights, weekends and event periods. A venue with honest, well-kept figures sells faster and at a better price than one that relies on the owner’s word.',
        'We prepare those figures with you, plan for the licence and lease transfer, and approach buyers privately so regulars and staff are not unsettled before the deal is done.',
      ],
      highlights: [
        'Confidential sale for hospitality and venues',
        'Buyers asked for proof of funds early',
        'Licence and lease steps mapped out',
        'Senior advisor managing every buyer',
      ],
      tipsHeading: 'Tips for selling a Northbridge venue or restaurant',
      tipsIntro: 'How hospitality owners can protect the price of their business before going to market.',
      tips: [
        {
          title: 'Match the POS to the accounts',
          text: 'Buyers will compare point-of-sale reports with your profit and loss and BAS. When the numbers agree, there is little to argue over. Gaps between them are where prices fall.',
        },
        {
          title: 'Start the licence conversation',
          text: 'Transferring a liquor licence to a new owner involves the WA licensing authority and takes time. Ask your lawyer about the process early so it does not hold up settlement.',
        },
        {
          title: 'Show your wage costs clearly',
          text: 'Late trading means penalty rates and rosters that change through the week. A clear breakdown of wages by day and season helps buyers understand what profit is achievable.',
        },
        {
          title: 'Present the fit-out honestly',
          text: 'List the equipment included in the sale and its condition, and flag anything due for replacement. Buyers trust a seller who is upfront about the kitchen and cool room.',
        },
      ],
      faqs: [
        {
          q: 'How long does it take to sell a business in Northbridge?',
          a: 'It depends on the venue, the price and how ready the records are, but hospitality sales commonly run over several months. Preparing figures, the lease position and the licence transfer before you go to market keeps the timeline as short as possible.',
          link: { href: '/resources/guides', label: 'Read our selling guides' },
        },
        {
          q: 'How do you price a hospitality business to sell?',
          a: 'We look at normalised profit after a market wage for the owner, the lease terms and the condition of the fit-out. A venue with a long lease and steady trade across the week is usually worth more than one relying on a few busy nights.',
          link: { href: '/business-valuation', label: 'Try the valuation calculator' },
        },
        {
          q: 'Can I sell without my regulars knowing?',
          a: 'Yes. We do not put signs in the window or name your venue in public listings. Buyers sign a confidentiality agreement before receiving details, and visits are arranged as ordinary customer visits or outside trading hours.',
        },
      ],
      imageAlt: 'City buildings for a hospitality owner planning to sell a business in Northbridge',
    },
    buy: {
      keyword: 'buy a business northbridge',
      title: 'Buy a Business Northbridge | Blackmont Advisory',
      description:
        'Want to buy a business in Northbridge? We find venues, check the trading figures and negotiate the price and terms, with advice on your side only.',
      h1: 'Buy a Business in Northbridge',
      intro:
        'Want to own a restaurant, small bar or late-night food business in Perth’s hospitality heart? We help buyers find the right Northbridge venue, check whether the trade is real and negotiate a deal that reflects the risks.',
      points: [
        'Advice for the buyer, never the seller',
        'Trading figures tested before you offer',
        'Lease and licence questions raised early',
        'Negotiation through to handover',
      ],
      overviewHeading: 'Buying a business in Northbridge',
      overview: [
        'Northbridge gives buyers a wide choice of hospitality businesses, from cafés near the Perth Cultural Centre to bars and restaurants that come alive in the evening. Busy streets can make almost any venue look successful on a Saturday night.',
        'The real test is in the figures. How does trade look on a Tuesday? What share of revenue comes from events or holiday periods? What does the lease cost as a share of sales, and how long does it run?',
        'We help you look past the atmosphere to the numbers. We review point-of-sale and accounting records, check the lease and licence position and negotiate a price that reflects what the business actually earns.',
      ],
      highlights: [
        'Independent review of venue trading',
        'Lease, licence and fit-out checked',
        'Price negotiated against real profit',
        'Help planning your first months as owner',
      ],
      tipsHeading: 'Buying tips for Northbridge hospitality',
      tipsIntro: 'Common mistakes buying a business in a nightlife precinct, and how to avoid them.',
      tips: [
        {
          title: 'Visit on quiet nights',
          text: 'Anyone can be busy on a Friday. Go on a wet Monday or a mid-week afternoon too, and compare what you see with the sales the seller has reported for those days.',
        },
        {
          title: 'Price in the fit-out',
          text: 'Kitchens, cool rooms and bar equipment wear hard in late-night venues. Get an independent check on their condition and factor any replacements into what you are willing to pay.',
        },
        {
          title: 'Confirm the licence can move',
          text: 'Your purchase should be conditional on the liquor licence transferring to you, or on a new one being granted. Your lawyer will advise on timing and the conditions attached.',
        },
        {
          title: 'Keep the good staff',
          text: 'A strong chef or venue manager can be the difference between a good and a bad purchase. Talk to them, with the seller’s agreement, before settlement.',
        },
      ],
      faqs: [
        {
          q: 'What should I check before I buy a business in Northbridge?',
          a: 'At minimum: trading figures checked against point-of-sale data and BAS, the lease term and rent review terms, the liquor licence position, wage costs and the condition of equipment. We coordinate these checks with your accountant and lawyer as part of due diligence.',
        },
        {
          q: 'Is a hospitality business a good first purchase?',
          a: 'It can be, but it is demanding. Hours are long and margins depend on tight control of wages and food costs. We help first-time buyers weigh up whether a venue suits their skills, or whether a different kind of business would be a better fit.',
          link: { href: '/buying-a-business', label: 'How we help first-time buyers' },
        },
        {
          q: 'Do you only look at advertised venues?',
          a: 'No. We search listings, but we also approach owners directly when their venue matches your brief. Some of the better hospitality businesses change hands quietly between people in the industry.',
        },
      ],
      imageAlt: 'Commercial skyline for buyers aiming to buy a business in Northbridge',
    },
  },

  /* ── Subiaco ───────────────────────────────────────────────── */
  {
    slug: 'subiaco',
    name: 'Subiaco',
    city: 'perth',
    nearby: ['west-perth', 'perth-cbd', 'northbridge'],
    sell: {
      keyword: 'sell a business subiaco',
      title: 'Sell a Business Subiaco | Blackmont Advisory',
      description:
        'Need to sell a business in Subiaco? Get a fair valuation and a confidential sale, with every buyer screened before they see your details. Book a chat.',
      h1: 'Sell a Business in Subiaco',
      intro:
        'Whether you run a café on Rokeby Road, a boutique, a clinic near the hospital precinct or a professional practice, we help Subiaco owners sell privately, with a clear valuation and buyers who are ready to proceed.',
      points: [
        'Confidential first conversation',
        'Valuation explained in plain terms',
        'Every buyer under NDA',
        'Guidance from offer to settlement',
      ],
      overviewHeading: 'How to sell a business in Subiaco',
      overview: [
        'Subiaco blends a strong local shopping and dining strip with a significant health presence, including King Edward Memorial Hospital and the medical, allied health and specialist practices that cluster around it.',
        'Since AFL football moved from Subiaco Oval to Optus Stadium, local businesses have leaned more on residents, health workers and office tenants than on match-day crowds. Buyers will want to understand where your customers come from today, not years ago.',
        'We help you tell that story with clear figures, prepare an information memorandum and introduce the business to buyers, whether a local operator, a health group or an investor from interstate.',
      ],
      highlights: [
        'Sales for retail, hospitality and health businesses',
        'Interstate and local buyers approached',
        'Information memorandum written for you',
        'Fees agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Subiaco business for sale',
      tipsIntro: 'Practical steps that help Subiaco owners get a better result.',
      tips: [
        {
          title: 'Show today’s customer base',
          text: 'Buyers will ask how much trade depends on residents, hospital staff and office workers. Break down sales by time of day and customer type where you can.',
        },
        {
          title: 'Separate the practice from the practitioner',
          text: 'In clinics and allied health, patients may follow one clinician. Show how many patients see others in the team, and how referrals reach the practice.',
        },
        {
          title: 'Review your lease terms',
          text: 'Strip shop leases can include rent reviews, options and permitted-use clauses. Make sure the lease allows a buyer to keep trading as you do, with time left to run.',
        },
        {
          title: 'Clean up the books',
          text: 'Remove personal expenses, record owner wages at a market rate and keep three years of accounts in order. It makes due diligence quicker and supports your price.',
        },
      ],
      faqs: [
        {
          q: 'Can you help me sell a business in Subiaco if it is a medical practice?',
          a: 'Yes. Health businesses need care around patient records, registrations and how patients will move to a new owner. We work alongside your lawyer and accountant to plan these steps and find buyers who understand the sector.',
        },
        {
          q: 'How much does it cost to sell a business?',
          a: 'Costs usually include the advisor’s fee, legal fees and your accountant’s work on the figures. We agree our fees with you in writing before we start, so you know where you stand from day one.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
        {
          q: 'Is my Subiaco business ready to sell?',
          a: 'A business is usually ready when its accounts are clean, the lease has enough term, and it can run without you every day. If any of these are missing, a few months of preparation can make a noticeable difference to the price.',
          link: { href: '/exit', label: 'Plan your exit' },
        },
      ],
      imageAlt: 'Glass office buildings for owners who want to sell a business in Subiaco',
    },
    buy: {
      keyword: 'buy a business subiaco',
      title: 'Buy a Business Subiaco | Blackmont Advisory',
      description:
        'Looking to buy a business in Subiaco? We find cafés, retail, clinics and practices, check the numbers and negotiate for you. Share your buying brief.',
      h1: 'Buy a Business in Subiaco',
      intro:
        'Subiaco appeals to buyers who want an established, local business: a café or boutique on the main strip, a clinic close to the hospital precinct or a professional practice. We help you find the right one and buy it on fair terms.',
      points: [
        'Search shaped around your brief',
        'Numbers checked before you commit',
        'Due diligence coordinated for you',
        'Independent of the seller',
      ],
      overviewHeading: 'Buying a business in Subiaco',
      overview: [
        'Subiaco’s mix of residents, hospital staff and office workers supports cafés, specialty retail, health clinics and service firms. Many of these businesses have loyal customers built up over years, which is a large part of what you are buying.',
        'The challenge is knowing how much of that loyalty will stay after the owner leaves, and whether the trade has adjusted since the football moved to Optus Stadium. Some businesses have found new customers; others still feel the change.',
        'We help you look at the figures, the lease and the customer base with clear eyes. We search widely, approach owners directly and negotiate a price that matches what the business earns now.',
      ],
      highlights: [
        'Local and off-market opportunities',
        'Customer and lease risks reviewed',
        'Fair price negotiated on your behalf',
        'Support through settlement and handover',
      ],
      tipsHeading: 'Business buying tips for Subiaco',
      tipsIntro: 'What to look at before buying an established Subiaco business.',
      tips: [
        {
          title: 'Ask where trade has come from',
          text: 'Compare recent years to understand how the business has adapted to Subiaco’s changing customer base. Steady or growing sales from locals are a good sign.',
        },
        {
          title: 'Check registrations for health businesses',
          text: 'Clinics and practices can have rules about who may own or operate them. Confirm with your lawyer what applies before you sign anything.',
        },
        {
          title: 'Look at the lease and options',
          text: 'A good business on a short lease is a risk. Check the remaining term, any options to renew and how rent reviews will affect profit.',
        },
        {
          title: 'Plan the introduction to customers',
          text: 'In a community-focused suburb, how the seller introduces you matters. Agree a handover period where they stay involved and introduce you personally.',
        },
      ],
      faqs: [
        {
          q: 'How do I find the right business to buy in Subiaco?',
          a: 'Start with a clear brief covering industry, budget and how involved you want to be. We then search listings and approach suitable owners directly. Some Subiaco owners prefer to sell quietly to the right person rather than advertise.',
        },
        {
          q: 'How much do I need to buy a business in Subiaco?',
          a: 'It depends on the business. Beyond the price, allow for stock, working capital, legal and accounting fees and any fit-out updates. Your bank or broker can tell you how much you can borrow; we help you check the business supports it.',
          link: { href: '/business-valuation', label: 'Understand business valuation' },
        },
        {
          q: 'Can I buy a business in Subiaco with your help from Melbourne?',
          a: 'Yes. Our office is in Toorak, Melbourne. We work with Perth buyers by phone and video, review documents online and meet in person when a deal needs it.',
        },
      ],
      imageAlt: 'Commercial towers for buyers who plan to buy a business in Subiaco',
    },
  },

  /* ── East Perth ────────────────────────────────────────────── */
  {
    slug: 'east-perth',
    name: 'East Perth',
    city: 'perth',
    nearby: ['perth-cbd', 'northbridge', 'west-perth'],
    sell: {
      keyword: 'sell a business east perth',
      title: 'Sell a Business East Perth | Blackmont Advisory',
      description:
        'Thinking about how to sell a business in East Perth? We prepare it, price it fairly and reach buyers in WA and interstate, in a private, senior-led sale.',
      h1: 'Sell a Business in East Perth',
      intro:
        'From cafés around Claisebrook Cove to offices near Adelaide Terrace and businesses that trade on WACA and stadium crowds, we help East Perth owners sell their business quietly and on the right terms.',
      points: [
        'Discreet approaches to qualified buyers',
        'Valuation that explains the event-day trade',
        'NDA signed before any details are shared',
        'One advisor managing the whole sale',
      ],
      overviewHeading: 'Selling a business in East Perth',
      overview: [
        'East Perth mixes apartments, offices and waterfront hospitality around Claisebrook Cove. It sits beside the WACA Ground, and the Matagarup Bridge links it to Optus Stadium across the Swan River, so event days can bring large crowds through the area.',
        'For a hospitality or retail business, that creates peaks buyers need to understand. They will ask how much of your profit comes from events and how the business performs on ordinary weekdays. Office-based service businesses face a different question: how secure are the main clients and the lease?',
        'We help you separate the event trade from the everyday trade, present it honestly and take the business privately to buyers who can see its value.',
      ],
      highlights: [
        'Event and everyday trade shown clearly',
        'Buyers from Perth and the east coast',
        'Confidential from first call to settlement',
        'Fees agreed before we start',
      ],
      tipsHeading: 'Tips for selling an East Perth business',
      tipsIntro: 'How to present an East Perth business so buyers see its real earnings.',
      tips: [
        {
          title: 'Track event days separately',
          text: 'Mark stadium and cricket days in your sales records. Buyers can then see what the business makes on a normal week and what events add on top.',
        },
        {
          title: 'Show your local customer base',
          text: 'Apartment residents and nearby office workers provide regular trade. Evidence of loyal repeat customers reassures buyers that the business does not depend on events alone.',
        },
        {
          title: 'Check strata and lease conditions',
          text: 'Many East Perth premises sit within mixed-use buildings with strata rules. Make sure trading hours, signage and outdoor seating are permitted under your lease and building conditions.',
        },
        {
          title: 'Know your number before going out',
          text: 'Understanding how to price a business to sell starts with normalised profit. Get a realistic range before talking to buyers so you can recognise a good offer.',
        },
      ],
      faqs: [
        {
          q: 'How do buyers value event-day trade when I sell a business in East Perth?',
          a: 'Buyers usually value steady, everyday profit more highly than profit from events, because event schedules can change. Showing both clearly lets them price each part fairly, rather than discounting the whole business for uncertainty.',
          link: { href: '/business-valuation', label: 'Try the valuation calculator' },
        },
        {
          q: 'What is an information memorandum?',
          a: 'It is the document buyers receive after signing a confidentiality agreement. It describes the business, its history, its customers and its financial results. A good one answers buyers’ main questions early and helps you get firmer offers.',
          link: { href: '/resources/guides', label: 'Read our selling guides' },
        },
        {
          q: 'Do you work with businesses in East Perth from Melbourne?',
          a: 'Yes. Our office is at Toorak in Melbourne. We work with East Perth owners by phone and video and meet in person when a deal needs it, such as final negotiations.',
          link: { href: '/selling-a-business/perth', label: 'Selling a business in Perth' },
        },
      ],
      imageAlt: 'Office towers representing owners looking to sell a business in East Perth',
    },
    buy: {
      keyword: 'buy a business east perth',
      title: 'Buy a Business East Perth | Blackmont Advisory',
      description:
        'Want to buy a business in East Perth? We search, check the earnings and negotiate for you, so you understand both event-day and everyday trade.',
      h1: 'Buy a Business in East Perth',
      intro:
        'Interested in a waterfront café at Claisebrook, a business that serves stadium and cricket crowds, or an office-based service firm? We help buyers find the right East Perth business and understand what they are paying for.',
      points: [
        'We act only for you',
        'Event trade separated from daily trade',
        'Off-market opportunities explored',
        'Due diligence planned with your advisers',
      ],
      overviewHeading: 'How to buy a business in East Perth',
      overview: [
        'East Perth offers buyers a mix of hospitality, retail and office-based businesses set among apartments and offices, with the WACA Ground nearby and Optus Stadium just across the river via the Matagarup Bridge.',
        'That location can be a real advantage, but it can also make a business look stronger than it is. A busy match day is very different from a rainy Wednesday. Before you buy, you need to know what the business earns on an ordinary week and how reliable its event income is.',
        'We help you get those answers. We review sales records, the lease and any strata conditions, check the profit behind the price and negotiate terms that reflect the real trade.',
      ],
      highlights: [
        'Trading figures reviewed for event peaks',
        'Lease and strata conditions checked',
        'Negotiation on price and handover',
        'Independent buy-side advice',
      ],
      tipsHeading: 'What to check when buying in East Perth',
      tipsIntro: 'Due diligence points that matter for East Perth businesses.',
      tips: [
        {
          title: 'Ask for weekly sales data',
          text: 'Monthly totals can hide the effect of big events. Weekly or daily figures show what the business earns without them, which is the safer basis for your price.',
        },
        {
          title: 'Check the building rules',
          text: 'Mixed-use buildings may limit noise, trading hours or outdoor dining. Confirm what is allowed before you plan any changes to how the business runs.',
        },
        {
          title: 'Think about seasonality',
          text: 'Sporting seasons, school holidays and summer weather all affect trade near the river and stadium precincts. Plan your cash flow for quieter months.',
        },
        {
          title: 'Talk through the transition',
          text: 'Agree how long the seller will stay to show you supplier arrangements, rosters and event preparation. A planned handover reduces the risk of a slow start.',
        },
      ],
      faqs: [
        {
          q: 'Is it a good idea to buy a business in East Perth near the stadium?',
          a: 'It can be, if the business is profitable without relying on events. Event days add income, but schedules change and crowds vary. We help you check the everyday trade so your price is based on reliable earnings.',
        },
        {
          q: 'What does due diligence involve when buying a business?',
          a: 'It means checking the financial records, tax position, lease, contracts, staff arrangements and any licences before you are committed. We coordinate the process with your accountant and lawyer so nothing important is missed.',
          link: { href: '/resources/guides', label: 'Read our buying guides' },
        },
        {
          q: 'Can you help with a business acquisition in East Perth from interstate?',
          a: 'Yes. Our office is in Toorak, Melbourne. We work with buyers by phone and video, use secure online data rooms for documents and meet in person when a deal needs it.',
          link: { href: '/buying-a-business/perth', label: 'Buying a business in Perth' },
        },
      ],
      imageAlt: 'City office towers for buyers looking to buy a business in East Perth',
    },
  },
];
