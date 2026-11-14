import type { SuburbEntry } from './types';

/**
 * Melbourne CBD and the inner suburbs just south and west of it.
 * Facts are limited to well-known precincts and the business character of
 * each area. No deals, prices or statistics are claimed for any suburb.
 */

const LICENCE = 'Licensed business agent, BLA 092153L';

export const MELBOURNE_A: SuburbEntry[] = [
  /* ── Melbourne CBD ───────────────────────────────────────────── */
  {
    slug: 'melbourne-cbd',
    name: 'Melbourne CBD',
    city: 'melbourne',
    nearby: ['southbank', 'docklands', 'fitzroy', 'richmond'],
    sell: {
      keyword: 'sell my business melbourne cbd',
      title: 'Sell My Business Melbourne CBD | Blackmont Advisory',
      description:
        'Asking “how do I sell my business in the Melbourne CBD?” Blackmont Advisory values, prepares and sells city businesses confidentially. Talk to us.',
      h1: 'Sell My Business in the Melbourne CBD',
      intro:
        'Selling a city business takes discretion. Staff, clients and competitors are often a few floors or a laneway away. We value your business, prepare the sale and approach serious buyers privately, one at a time.',
      points: [
        'Senior advisor from first call to settlement',
        'Buyers screened and under NDA before any detail',
        'Office in Toorak, a short trip from the city',
        LICENCE,
      ],
      imageAlt: 'City office towers representing selling a business in the Melbourne CBD',
      overviewHeading: 'Selling a business in the Melbourne CBD',
      overview: [
        'The Hoddle Grid holds a mix of businesses you will not find anywhere else in Victoria: professional practices along Collins Street, retail around the Bourke Street Mall, and cafés and bars tucked into the laneways. Each attracts a different buyer, and each needs a different pitch.',
        'Professional services firms tend to draw strategic buyers and, at larger sizes, private equity firms in the Melbourne CBD and investment firms on Collins Street. Hospitality and retail sell mostly to owner-operators, who look hard at the lease and at weekday office foot traffic.',
        'We act as your corporate advisory partner for the sale, working out who will pay most for your business and reaching them without the market knowing you are selling.',
      ],
      highlights: [
        'Strategic buyers, family offices and private equity in our network',
        'An Information Memorandum written for your type of buyer',
        'Lease and landlord issues handled early',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Melbourne CBD business for sale',
      tipsIntro: 'What city buyers look at first, and how to get ahead of it.',
      tips: [
        {
          title: 'Check your lease term and make-good',
          text: 'City leases often carry significant make-good clauses and options that buyers need explained. Know your remaining term, your options and what your landlord will need before an assignment, and raise it before a buyer does.',
        },
        {
          title: 'Show where your trade comes from',
          text: 'Buyers will ask how much revenue depends on weekday office workers, events or tourists. Break your takings down by day and season so they can see the pattern clearly rather than guess at it.',
        },
        {
          title: 'Separate client relationships from you',
          text: 'For a professional practice, buyers pay for clients who stay. Introduce senior staff to key accounts well before the sale, and record the contracts and retainers that keep revenue recurring.',
        },
        {
          title: 'Keep the sale quiet in a small market',
          text: 'In the city, word travels fast between neighbouring tenancies. Every buyer we introduce signs a confidentiality agreement first, and you approve each one before they learn your business name.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in the Melbourne CBD without staff finding out?',
          a: 'We market the business without naming it. Interested buyers sign a confidentiality agreement, and you approve each one before we share details. Meetings and site visits happen out of hours or off site, so your team and clients hear about the sale only when you decide to tell them.',
        },
        {
          q: 'Would private equity buy a CBD business?',
          a: 'Sometimes. Private equity firms in the Melbourne CBD usually look for businesses with solid, consistent earnings, a management team and room to grow. Smaller businesses are more often bought by individuals or competitors. We tell you honestly which buyers suit your business before you spend time on any of them.',
          link: { href: '/selling-a-business/melbourne', label: 'Selling a business in Melbourne' },
        },
        {
          q: 'What will a buyer pay for my city business?',
          a: 'Price comes from your earnings, how dependable they are and how much the business relies on you. Lease security matters a lot in the city. Our valuation calculator gives you a starting range, and we refine it once we have seen your accounts.',
          link: { href: '/business-valuation', label: 'Try the valuation calculator' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business melbourne cbd',
      title: 'Buy a Business Melbourne CBD | Blackmont Advisory',
      description:
        'Want to buy a business in the Melbourne CBD? Blackmont Advisory finds, values and negotiates city businesses for you. Start your search with us today.',
      h1: 'Buy a Business in the Melbourne CBD',
      intro:
        'From laneway cafés to established professional practices, the city offers plenty of choice and plenty of traps. We search, check the numbers and negotiate for you, so you buy a CBD business at a fair price on sound terms.',
      points: [
        'Advice that works only for you, the buyer',
        'Off-market approaches as well as listings',
        'Earnings checked before you make an offer',
        LICENCE,
      ],
      imageAlt: 'City office towers representing buying a business in the Melbourne CBD',
      overviewHeading: 'Buying a business in the Melbourne CBD',
      overview: [
        'Businesses in the city live and die by foot traffic and their lease. A café on a busy laneway, a retailer near Flinders Street Station and a consultancy on Collins Street each carry different risks, and the asking price rarely tells you which ones matter.',
        'Many city trades lean heavily on weekday office workers, so we look closely at how takings move across the week and the year. For service businesses, we check how loyal the clients really are once the current owner leaves.',
        'Whether you are a first time business buyer or an operator adding a second site, we help you judge what the business is really worth and negotiate terms that protect you.',
      ],
      highlights: [
        'Daily and seasonal takings tested against the asking price',
        'Lease terms, options and make-good reviewed with your lawyer',
        'Owner handover and client retention negotiated up front',
        'Help with financing a business purchase in Melbourne',
      ],
      tipsHeading: 'Tips for buying a business in the Melbourne CBD',
      tipsIntro: 'Points we check on every city purchase before our clients commit.',
      tips: [
        {
          title: 'Read the lease before the accounts',
          text: 'A short remaining term or a tough make-good clause can wipe out the value of a city business. Confirm the options, rent reviews and assignment terms first, then decide if the numbers are worth testing.',
        },
        {
          title: 'Check the weekend and holiday trade',
          text: 'Some CBD businesses go quiet on weekends and over Christmas. Ask for takings by day and by month so you can see the slow periods and plan cash flow around them.',
        },
        {
          title: 'Ask who the customers really are',
          text: 'If one office tower or a single corporate client drives a large share of sales, that relationship is a risk. Find out how concentrated revenue is and how long those arrangements are likely to last.',
        },
        {
          title: 'Plan a proper handover',
          text: 'Regulars and clients in the city often know the owner by name. Negotiate a handover period where the seller introduces you, and tie part of the price to the business holding its trade if you can.',
        },
      ],
      faqs: [
        {
          q: 'Is it a good idea to buy a business in the Melbourne CBD?',
          a: 'It can be, if the price reflects the real risks. Rent is higher, trade can depend on office attendance and events, and leases matter a great deal. A good city business with a secure lease and loyal customers can still be a strong buy. We help you tell the difference.',
        },
        {
          q: 'Can you find city businesses that are not advertised?',
          a: 'Yes. Many owners would sell but have not listed. With your brief agreed, we approach suitable businesses directly and confidentially. Off-market deals often mean less competition and a more considered negotiation.',
          link: { href: '/buying-a-business/melbourne', label: 'Buying a business in Melbourne' },
        },
        {
          q: 'I need a business for a visa. Can you help?',
          a: 'We help visa applicants find a business that fits their plans, budget and experience. The visa rules themselves come from the Department of Home Affairs, so please work with a registered migration agent on eligibility. We focus on finding and assessing the right business.',
        },
      ],
    },
  },

  /* ── Southbank ───────────────────────────────────────────────── */
  {
    slug: 'southbank',
    name: 'Southbank',
    city: 'melbourne',
    nearby: ['melbourne-cbd', 'south-melbourne', 'docklands', 'port-melbourne'],
    sell: {
      keyword: 'sell a business southbank',
      title: 'Sell a Business Southbank | Blackmont Advisory',
      description:
        'Looking to sell a business in Southbank? Blackmont Advisory prices it and sells it privately, with every buyer under NDA. Book a free first conversation.',
      h1: 'Sell a Business in Southbank',
      intro:
        'Southbank brings together residents, office workers, theatre crowds and visitors. Buyers like that mix, but they want proof of where your trade comes from. We prepare that proof and sell your business confidentially.',
      points: [
        'Free, confidential first conversation',
        'Every buyer screened, under NDA and approved by you',
        'Based at 459 Toorak Road, Toorak',
        LICENCE,
      ],
      imageAlt: 'Glass office towers representing selling a business in Southbank, Melbourne',
      overviewHeading: 'Selling a business in Southbank',
      overview: [
        'Southbank runs from the Yarra River promenade to the Arts Precinct and the apartment towers around City Road. Hospitality and retail here serve several crowds at once: residents in the high-rises, workers in the office buildings, and visitors heading to the theatres, galleries and Crown.',
        'That variety is a selling point, but buyers will ask how dependent your business is on events and tourism compared with steady local trade. Service businesses, from fitness studios to clinics, sell on how loyal their resident customer base is.',
        'As a business advisory firm working with Southbank owners, we turn those questions into clear answers in your sale documents before buyers start asking them.',
      ],
      highlights: [
        'Trade broken down by residents, workers and visitors',
        'Buyers approached privately, never by open advertising alone',
        'Valuation based on your real earnings',
        'One senior advisor running the whole sale',
      ],
      tipsHeading: 'How to prepare a Southbank business for sale',
      tipsIntro: 'The questions Southbank buyers ask most, answered before they ask.',
      tips: [
        {
          title: 'Map your trade against the events calendar',
          text: 'Shows, exhibitions and major events lift trade near the Arts Precinct. Line up your takings against those periods so buyers can see what is steady income and what is a busy week.',
        },
        {
          title: 'Know your building and your landlord',
          text: 'Many Southbank businesses sit in the base of mixed-use towers. Understand your lease, owners corporation rules and landlord consent process, because a buyer’s lawyer will check all of them.',
        },
        {
          title: 'Show the resident customer base',
          text: 'Regular local customers are worth more to a buyer than passing trade. Memberships, bookings and repeat-customer data from your systems help prove the business does not rely on tourists.',
        },
        {
          title: 'Fix small issues before the market sees them',
          text: 'Tidy the fit-out, update equipment registers and resolve any outstanding compliance items. Small problems found in due diligence become reasons to lower the price.',
        },
      ],
      faqs: [
        {
          q: 'How long does it take to sell a business in Southbank?',
          a: 'Most sales take between six and twelve months from preparation to settlement. Lease assignment and owners corporation approvals can add time in mixed-use buildings, so we start on those early. A well-prepared business with clear financials usually moves faster.',
          link: { href: '/resources/guides', label: 'Read our selling guides' },
        },
        {
          q: 'Who buys businesses in Southbank?',
          a: 'Usually owner-operators, existing hospitality and service groups adding a site, and investors who want a business with a manager in place. We match your business to the buyers most likely to pay for it, rather than waiting for enquiries.',
        },
        {
          q: 'What does it cost to sell a business in Southbank?',
          a: 'Our fees depend on the size and complexity of the business, and we agree them in writing before we start. There is no charge for the first conversation, where we tell you honestly what we think your business could sell for.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business southbank',
      title: 'Buy a Business Southbank | Blackmont Advisory',
      description:
        'Want to buy a business in Southbank? Blackmont Advisory searches, values and negotiates for you, so you pay a fair price. Start your search with us today.',
      h1: 'Buy a Business in Southbank',
      intro:
        'High-rise living, a busy arts and entertainment precinct and a riverside promenade make Southbank an appealing place to own a business. We help you find the right one, check its earnings and negotiate the deal.',
      points: [
        'Independent advice that works only for you',
        'Searches across listings and off-market owners',
        'Due diligence planned with your accountant and lawyer',
        LICENCE,
      ],
      imageAlt: 'Glass office towers representing buying a business in Southbank, Melbourne',
      overviewHeading: 'Buying a business in Southbank',
      overview: [
        'Southbank suits buyers looking at hospitality, convenience retail, fitness and health services. Tens of thousands of people live in its apartment towers, and the theatres, galleries and Crown bring visitors in at night and on weekends.',
        'The catch is that trade can swing with events, the seasons and office attendance. Before you commit, we work out how much of a business’s income is reliable local trade and how much depends on crowds that come and go.',
        'We also review the lease and building arrangements, which are often more involved in mixed-use towers than in a typical shopfront.',
      ],
      highlights: [
        'Local, visitor and event trade separated in the numbers',
        'Lease and owners corporation terms reviewed early',
        'Price negotiated on what the business really earns',
        'A planned handover from the outgoing owner',
      ],
      tipsHeading: 'Buying tips for Southbank businesses',
      tipsIntro: 'What to check before you buy a business in Southbank.',
      tips: [
        {
          title: 'Visit at different times',
          text: 'A Southbank café can look full on a show night and empty on a wet Tuesday. Watch the business at several times of day and week before you trust the figures you have been given.',
        },
        {
          title: 'Read the building rules',
          text: 'Trading hours, signage, deliveries and noise can all be limited by building or owners corporation rules. Make sure they suit how you plan to run the business before you sign.',
        },
        {
          title: 'Test the repeat customers',
          text: 'Ask for membership numbers, booking histories or loyalty data. A steady base of local residents is worth paying for. Trade that depends mostly on visitors deserves a more cautious price.',
        },
        {
          title: 'Budget for working capital',
          text: 'Allow for stock, staff costs and slower periods after settlement, not just the purchase price. If you are financing a business purchase in Melbourne, talk to your lender before you make an offer.',
        },
      ],
      faqs: [
        {
          q: 'What types of businesses can I buy in Southbank?',
          a: 'Mostly hospitality, convenience retail, fitness studios, health and beauty services, and professional practices in the office buildings. Tell us your budget and experience, and we will focus on businesses that fit rather than everything on the market.',
        },
        {
          q: 'How do I know if a Southbank business is worth the asking price?',
          a: 'We check the earnings against tax returns and BAS, adjust for owner wages and one-off costs, and compare the result with the price. Then we look at the lease and how dependable the trade is. Our valuation tools give you a feel for the numbers first.',
          link: { href: '/business-valuation', label: 'See how businesses are valued' },
        },
        {
          q: 'Should I buy an existing business in Southbank or start one?',
          a: 'An existing business gives you customers, staff and cash flow from day one, which lenders also prefer. Starting fresh costs less up front but carries more risk, especially in a precinct where fit-outs and rent are expensive. We can help you weigh both.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
    },
  },

  /* ── Docklands ───────────────────────────────────────────────── */
  {
    slug: 'docklands',
    name: 'Docklands',
    city: 'melbourne',
    nearby: ['melbourne-cbd', 'southbank', 'port-melbourne', 'south-melbourne'],
    sell: {
      keyword: 'business broker docklands',
      title: 'Business Broker Docklands | Blackmont Advisory',
      description:
        'Need a business broker in Docklands? Blackmont Advisory values, markets and sells Docklands businesses confidentially to screened buyers. Get in touch.',
      h1: 'Business Broker in Docklands',
      intro:
        'Docklands businesses serve corporate workers, waterfront residents and stadium crowds. We are a business broker and advisory firm that shows buyers how your trade really works, then sells your business privately.',
      points: [
        'One senior advisor, from valuation to settlement',
        'Confidential marketing, no name until you approve',
        'Melbourne office at 459 Toorak Road, Toorak',
        LICENCE,
      ],
      imageAlt: 'Waterfront office towers representing a business broker in Docklands, Melbourne',
      overviewHeading: 'Business broker services in Docklands',
      overview: [
        'Docklands was built around the old port, and it now holds large corporate offices, apartments around Victoria Harbour and NewQuay, and Marvel Stadium. Businesses here often depend on a few big sources of trade: office tenants, residents and event crowds.',
        'Buyers know that, so they look closely at how a Docklands business performs when offices are quiet or there is no game on. A clear picture of weekday, weekend and event trade makes the difference between a confident offer and a cautious one.',
        'As your advisory firm in Docklands, we build that picture, set a realistic price and take the business to buyers who understand the precinct.',
      ],
      highlights: [
        'Event, office and resident trade shown clearly',
        'Private buyers, operators and investors approached directly',
        'Business broker fees agreed in writing up front',
        'Due diligence managed with your accountant and lawyer',
      ],
      tipsHeading: 'Getting a Docklands business ready to sell',
      tipsIntro: 'Practical steps that help a Docklands sale go smoothly.',
      tips: [
        {
          title: 'Separate event days from normal days',
          text: 'Stadium events can transform a week’s takings. Report those days separately so buyers can see the regular trading base, then present the event income as an extra rather than the foundation.',
        },
        {
          title: 'Document your corporate accounts',
          text: 'If you supply catering, services or products to nearby offices, list those clients, how long you have served them and any agreements in place. Buyers value recurring corporate work.',
        },
        {
          title: 'Review lease terms early',
          text: 'Waterfront and precinct leases can include specific trading and maintenance obligations. Check the remaining term and the assignment process with your lawyer before the business goes to market.',
        },
        {
          title: 'Reduce reliance on yourself',
          text: 'If you open, close and manage every key supplier yourself, a buyer sees risk. Train a manager and write down how the business runs, so a new owner can step in with confidence.',
        },
      ],
      faqs: [
        {
          q: 'Why use a business broker in Docklands rather than selling myself?',
          a: 'A broker keeps the sale confidential, screens buyers, prepares the Information Memorandum and negotiates on your behalf. Selling yourself can save fees but often means more time-wasters, less buyer competition and a lower price. We explain the trade-offs honestly in a first conversation.',
          link: { href: '/business-brokers/melbourne', label: 'Business brokers in Melbourne' },
        },
        {
          q: 'How much do business brokers charge in Docklands?',
          a: 'Most brokers charge a success fee, and some add an upfront marketing fee. Ours depends on the size and complexity of the business and is agreed in writing before we start, so there are no surprises at settlement.',
        },
        {
          q: 'Will buyers worry about quiet periods in Docklands?',
          a: 'They will ask about them, so we answer the question in the sale documents. Showing your trade by month and by day, along with what you do to bring customers in during quieter times, gives buyers confidence and protects your price.',
        },
      ],
    },
    buy: {
      keyword: 'buy a business docklands',
      title: 'Buy a Business Docklands | Blackmont Advisory',
      description:
        'Looking to buy a business in Docklands? Blackmont Advisory finds, checks and negotiates the right one for you, from waterfront venues to service firms.',
      h1: 'Buy a Business in Docklands',
      intro:
        'Docklands combines a large office workforce, waterfront apartments and major sporting and entertainment events. That creates opportunities and some real trading swings. We help you find a business whose numbers hold up.',
      points: [
        'Buyer-only advice, no conflict with the seller',
        'Listed and off-market businesses in the search',
        'Trading patterns tested before any offer',
        LICENCE,
      ],
      imageAlt: 'Waterfront office towers representing buying a business in Docklands, Melbourne',
      overviewHeading: 'Buying a business in Docklands',
      overview: [
        'Common opportunities in Docklands include cafés and restaurants around Victoria Harbour and NewQuay, convenience retail at the base of office and apartment towers, and services for the corporate tenants nearby.',
        'The precinct’s trade is lumpy. Crowds arrive for events at Marvel Stadium and leave just as quickly, and office attendance shapes weekday sales. A sensible price comes from the steady trade, with event income treated as a bonus.',
        'We help you separate the two, check the lease carefully and negotiate a deal that still works in a quiet month.',
      ],
      highlights: [
        'Weekday, weekend and event takings analysed separately',
        'Corporate client contracts and catering accounts checked',
        'Lease obligations reviewed with your lawyer',
        'Terms negotiated to protect you after settlement',
      ],
      tipsHeading: 'What to check before buying in Docklands',
      tipsIntro: 'Our checklist for buyers looking at Docklands businesses.',
      tips: [
        {
          title: 'Ask for trade without events',
          text: 'Request takings with event days marked. If the business only works when the stadium is full, the price should reflect that, and so should your plans for staffing and stock.',
        },
        {
          title: 'Confirm corporate contracts',
          text: 'Catering or service agreements with nearby offices can be valuable, but check they can transfer to you and how long they run. A contract that ends with the current owner is worth far less.',
        },
        {
          title: 'Look at the wider precinct',
          text: 'Walk the surrounding blocks. Look at nearby vacancies and at new buildings opening or planned, since both can change foot traffic. Your lawyer and the landlord can help you understand what is coming.',
        },
        {
          title: 'Plan for seasonal cash flow',
          text: 'Winter and the football off-season can change trade. Keep a buffer for slower periods so your first year as owner is not a struggle.',
        },
      ],
      faqs: [
        {
          q: 'Is Docklands a good place to buy a business?',
          a: 'It can be, especially for businesses that serve the office workforce or the growing resident population. The key is paying a price based on reliable trade, not best-case event weeks. We help you test that before you commit.',
        },
        {
          q: 'Can a first-time buyer purchase a business in Docklands?',
          a: 'Yes. Many first-time buyers start with a café or service business. We explain each step, check the numbers with you and work alongside your accountant and lawyer, so you understand what you are buying and what it will take to run it.',
          link: { href: '/buying-a-business/melbourne', label: 'Buying a business in Melbourne' },
        },
        {
          q: 'Do you help with due diligence?',
          a: 'Yes. We plan due diligence with your accountant and lawyer, request the right documents from the seller and follow up anything that does not add up. Issues found here are often used to renegotiate price or terms.',
          link: { href: '/resources/guides', label: 'Read our buying guides' },
        },
      ],
    },
  },

  /* ── South Melbourne ─────────────────────────────────────────── */
  {
    slug: 'south-melbourne',
    name: 'South Melbourne',
    city: 'melbourne',
    nearby: ['southbank', 'port-melbourne', 'st-kilda', 'south-yarra'],
    sell: {
      keyword: 'sell my business south melbourne',
      title: 'Sell My Business South Melbourne | Blackmont Advisory',
      description:
        'Asking “how do I sell my business in South Melbourne?” Blackmont Advisory runs the sale confidentially, from valuation to settlement. Book a free chat.',
      h1: 'Sell My Business in South Melbourne',
      intro:
        'South Melbourne mixes market traders, design studios, showrooms and small offices within a few blocks. Whatever you run, we price it properly, prepare the paperwork and sell it quietly to buyers you approve.',
      points: [
        'Free and confidential first conversation',
        'Every buyer approved by you before they see details',
        'Advisor based nearby in Toorak',
        LICENCE,
      ],
      imageAlt: 'Commercial buildings representing selling a business in South Melbourne',
      overviewHeading: 'Selling a business in South Melbourne',
      overview: [
        'South Melbourne is one of the most varied business suburbs in the inner city. The South Melbourne Market and the Clarendon Street strip draw shoppers, while converted warehouses house creative agencies, architects, consultancies and trade showrooms.',
        'That variety means there is no single type of buyer. A market stall or café usually sells to an owner-operator. A design agency or professional firm may suit a larger competitor or a business sale advisor’s network of strategic buyers.',
        'We work out which buyers fit your business, present it clearly in an Information Memorandum and handle the negotiation, so you can keep running the business while it sells.',
      ],
      highlights: [
        'Buyer search matched to your type of business',
        'Valuation based on your earnings, not guesswork',
        'Confidentiality agreement signed by every buyer',
        'Fees agreed in writing up front',
      ],
      tipsHeading: 'Tips for selling a South Melbourne business',
      tipsIntro: 'What South Melbourne owners can do now to sell for more later.',
      tips: [
        {
          title: 'Check your market or strip lease',
          text: 'Market licences and shopfront leases each have their own transfer rules. Find out what consent and approvals a sale will need, and how long they usually take, before you agree terms with a buyer.',
        },
        {
          title: 'Show the value of your clients',
          text: 'For agencies and consultancies, buyers pay for recurring work. List your main clients, how long you have worked with them and any retainers, while keeping names confidential until the right stage.',
        },
        {
          title: 'Get the books in order',
          text: 'Three years of accounts that match your tax returns and BAS will make your earnings believable. Clearly mark personal and one-off expenses so buyers see the true profit.',
        },
        {
          title: 'Keep the team steady',
          text: 'Key staff leaving during a sale can unsettle buyers. Think about how to keep your best people through the transition, and plan when and how to tell them.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in South Melbourne?',
          a: 'Start with a confidential conversation and a realistic valuation. We then prepare the sale documents, approach screened buyers privately, negotiate offers and manage due diligence through to settlement. Most owners keep running the business day to day while we handle the process.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
        {
          q: 'Can you sell a creative or professional services firm?',
          a: 'Yes. Agencies and professional practices sell on client retention and the strength of the team. We help you show both, and we approach competitors and strategic buyers who would value your clients and people.',
        },
        {
          q: 'What is my South Melbourne business worth?',
          a: 'It depends on your earnings, how steady they are, your lease and how much the business relies on you. Start with our free calculator, then we can give you a considered range after reviewing your accounts.',
          link: { href: '/business-valuation', label: 'Use the valuation calculator' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business south melbourne',
      title: 'Buy a Business South Melbourne | Blackmont Advisory',
      description:
        'Want to buy a business in South Melbourne? Blackmont Advisory finds, values and negotiates the right business for you, at a fair price. Tell us your brief.',
      h1: 'Buy a Business in South Melbourne',
      intro:
        'From food businesses near the South Melbourne Market to agencies and showrooms in converted warehouses, the suburb offers real variety. We narrow the search, check the numbers and negotiate on your behalf.',
      points: [
        'Advice on your side of the deal only',
        'Listed and unlisted businesses considered',
        'Earnings tested against tax records',
        LICENCE,
      ],
      imageAlt: 'Commercial buildings representing buying a business in South Melbourne',
      overviewHeading: 'Buying a business in South Melbourne',
      overview: [
        'South Melbourne attracts buyers who want an established inner-city business without CBD rents. The market and Clarendon Street bring steady local shoppers, and the side streets hold service businesses, studios and small offices.',
        'Food and retail businesses depend on foot traffic and the lease. Service firms depend on clients and staff who may follow the departing owner out the door. We look at the risks that matter for the business in front of you.',
        'If you are a first time business buyer in Melbourne, we explain each step and work with your accountant and lawyer through due diligence.',
      ],
      highlights: [
        'Search matched to your budget and skills',
        'Market licence and lease terms reviewed',
        'Client and staff retention built into the deal',
        'Help preparing for finance applications',
      ],
      tipsHeading: 'Buying tips for South Melbourne',
      tipsIntro: 'Simple checks that protect you when buying in South Melbourne.',
      tips: [
        {
          title: 'Understand the market rules',
          text: 'If the business trades at the South Melbourne Market, the stall arrangement and any transfer approval matter as much as the price. Confirm the process early so settlement is not delayed.',
        },
        {
          title: 'Meet the key staff',
          text: 'In studios and service businesses, a few people often hold the client relationships. With the seller’s agreement, meet them before settlement and plan how you will keep them.',
        },
        {
          title: 'Check the numbers yourself',
          text: 'Compare the profit and loss with BAS and tax returns. Look for owner wages left out of the figures and one-off costs left in. Small differences add up when multiplied into a price.',
        },
        {
          title: 'Ask why the owner is selling',
          text: 'Retirement and a move interstate are common, sound reasons. A falling lease, a new competitor or a lost client is not. Ask directly and check the answer against the records.',
        },
      ],
      faqs: [
        {
          q: 'What kinds of businesses are for sale in South Melbourne?',
          a: 'Cafés, food retailers, specialty shops, design and marketing agencies, professional practices and trade showrooms are all common. Tell us what you are looking for, and we will focus on businesses that suit your experience and budget.',
        },
        {
          q: 'How do I finance a business purchase in South Melbourne?',
          a: 'Most buyers combine their own funds with a bank loan, and sometimes vendor finance. Lenders look at the business’s earnings and your experience. We help you present the business clearly to your lender, but we do not give credit advice.',
        },
        {
          q: 'Can you approach businesses that are not on the market?',
          a: 'Yes. Once we agree your brief, we can contact suitable owners directly and confidentially. Some are open to an offer even though they have not listed, which can mean less competition.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
    },
  },

  /* ── Port Melbourne ──────────────────────────────────────────── */
  {
    slug: 'port-melbourne',
    name: 'Port Melbourne',
    city: 'melbourne',
    nearby: ['south-melbourne', 'docklands', 'southbank', 'st-kilda'],
    sell: {
      keyword: 'sell a business port melbourne',
      title: 'Sell a Business Port Melbourne | Blackmont Advisory',
      description:
        'Planning to sell a business in Port Melbourne? From Bay Street retail to trade and industrial firms, Blackmont Advisory sells it confidentially.',
      h1: 'Sell a Business in Port Melbourne',
      intro:
        'Port Melbourne ranges from Bay Street shops and bayside cafés to warehouses, trade suppliers and light industry. We value your business on its real earnings and sell it confidentially to the buyers who suit it.',
      points: [
        'A confidential, no-cost first meeting',
        'Industrial, trade and retail buyers approached privately',
        'Office at 459 Toorak Road, Toorak',
        LICENCE,
      ],
      imageAlt: 'Commercial buildings representing selling a business in Port Melbourne',
      overviewHeading: 'Selling a business in Port Melbourne',
      overview: [
        'Port Melbourne has two quite different business markets. Bay Street and the foreshore support retail, hospitality and local services for a well-off residential community. Further inland, warehouses and industrial sites house trade suppliers, distributors, workshops and light manufacturers.',
        'Each attracts a different buyer. Retail and hospitality usually sell to owner-operators. Trade and industrial businesses can attract competitors and larger groups, and at the right size an owner may be able to sell to private equity in Melbourne.',
        'Much of the area is also part of the long-term Fishermans Bend renewal, so buyers will ask about your site and lease. We help you prepare clear answers and reach the right buyers privately.',
      ],
      highlights: [
        'Buyer list built for retail, trade or industrial businesses',
        'Plant, equipment and stock presented clearly',
        'Lease and site questions answered early',
        'Negotiation and due diligence handled for you',
      ],
      tipsHeading: 'Preparing a Port Melbourne business for sale',
      tipsIntro: 'Steps that help Port Melbourne owners sell with confidence.',
      tips: [
        {
          title: 'List your plant and equipment',
          text: 'For trade and industrial businesses, an up-to-date equipment register with age, condition and service history helps buyers price the assets and reduces arguments in due diligence.',
        },
        {
          title: 'Secure your site',
          text: 'Buyers of industrial businesses need to know they can stay put. Check your lease term and options, and understand any planning changes in the area that could affect your premises.',
        },
        {
          title: 'Show local loyalty on Bay Street',
          text: 'For shops and cafés, repeat local customers are the best evidence of value. Loyalty program data, regular accounts and steady weekday trade all support a stronger price.',
        },
        {
          title: 'Separate the property from the business',
          text: 'If you own the building, decide early whether you will sell it, lease it to the buyer or keep it. Each choice changes the buyer pool and the price, so get tax advice first.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in Port Melbourne confidentially?',
          a: 'We describe the business without naming it, ask every interested buyer to sign a confidentiality agreement and only share details with buyers you approve. For trade businesses, we take extra care with competitors, sharing sensitive information only at the final stage.',
        },
        {
          q: 'Can you sell an industrial or trade business?',
          a: 'Yes. We prepare the equipment and stock schedules buyers expect, explain the customer base and contracts, and approach operators and groups that understand the sector. Our valuation calculator gives you an early guide to price.',
          link: { href: '/business-valuation', label: 'Try the valuation calculator' },
        },
        {
          q: 'Should I plan my exit before I sell?',
          a: 'If you are a few years away, yes. Building a team, tidying the financials and reducing reliance on you all lift the value. Our exit planning guide sets out the steps in order.',
          link: { href: '/exit', label: 'Explore exit planning' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business port melbourne',
      title: 'Buy a Business Port Melbourne | Blackmont Advisory',
      description:
        'Looking to buy a business in Port Melbourne? From bayside retail to trade and industrial, Blackmont Advisory finds, checks and negotiates it for you.',
      h1: 'Buy a Business in Port Melbourne',
      intro:
        'Port Melbourne gives buyers two quite different options: bayside retail and hospitality, or trade and industrial businesses close to the city and the port. We help you choose well and buy on sound terms.',
      points: [
        'Independent buy-side advice',
        'Retail, trade and industrial opportunities searched',
        'Assets, stock and earnings checked properly',
        LICENCE,
      ],
      imageAlt: 'Commercial buildings representing buying a business in Port Melbourne',
      overviewHeading: 'Buying a business in Port Melbourne',
      overview: [
        'Bay Street and the foreshore suit buyers who want a customer-facing business with a loyal local market. The industrial streets suit buyers who want a trade, distribution or light manufacturing business close to the CBD, freeways and the Port of Melbourne.',
        'Industrial purchases come with extra questions. You need to know the condition of the equipment, the value of the stock and whether the site will remain available, especially with long-term renewal planned for Fishermans Bend.',
        'We bring those questions into the search early, so you only spend time on businesses that will still make sense after settlement.',
      ],
      highlights: [
        'Equipment and stock values tested',
        'Site and lease security checked with your lawyer',
        'Customer contracts reviewed for transfer',
        'Price and terms negotiated on your behalf',
      ],
      tipsHeading: 'Tips for buying a business in Port Melbourne',
      tipsIntro: 'Areas we focus on for Port Melbourne buyers.',
      tips: [
        {
          title: 'Have the equipment inspected',
          text: 'Ask a qualified person to inspect major plant and vehicles. Repairs or replacements you did not expect can quickly eat into the return on a trade or manufacturing business.',
        },
        {
          title: 'Agree how stock is valued',
          text: 'Stock is often added to the price at settlement. Agree in the contract how it will be counted and valued, and exclude anything old, damaged or slow-moving.',
        },
        {
          title: 'Check the planning picture',
          text: 'Parts of Port Melbourne are earmarked for long-term change. Ask your lawyer to check the zoning and any planning controls on the site, and make sure your lease gives you enough time.',
        },
        {
          title: 'Look past summer trade',
          text: 'Bayside cafés and shops can be busiest in the warmer months. Ask for monthly takings across a full year so you know what winter looks like before you pay for the business.',
        },
      ],
      faqs: [
        {
          q: 'What businesses can I buy in Port Melbourne?',
          a: 'Retail shops, cafés and restaurants around Bay Street and the beach, and trade suppliers, distributors, workshops and light manufacturers in the industrial areas. We tailor the search to your budget, skills and how hands-on you want to be.',
        },
        {
          q: 'Is buying a manufacturing business in Port Melbourne a good idea?',
          a: 'It can be, if the customers, equipment and site are secure. Manufacturing businesses for sale in Melbourne often need specialist checks on plant, staff and supply contracts. We help you plan those checks with your advisers before you commit.',
          link: { href: '/buying-a-business/melbourne', label: 'Buying a business in Melbourne' },
        },
        {
          q: 'Do you charge buyers for your help?',
          a: 'Yes. We act for you, not the seller, so our fee is agreed with you in writing before we start. That independence means our advice on price and terms is aimed at your interests alone.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
    },
  },
];
