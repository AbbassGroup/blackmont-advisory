import type { SuburbEntry } from './types';

/**
 * Sydney CBD and inner-city suburb pages. Our office is in Melbourne; Sydney
 * clients are served by phone and video, with in-person meetings when a deal
 * needs them. No suburb-level deals are claimed.
 */
export const SYDNEY: SuburbEntry[] = [
  /* ── Sydney CBD ─────────────────────────────────────────────── */
  {
    slug: 'sydney-cbd',
    name: 'Sydney CBD',
    city: 'sydney',
    nearby: ['north-sydney', 'pyrmont', 'surry-hills', 'alexandria'],
    sell: {
      keyword: 'sell a business sydney cbd',
      imageAlt: 'Sell a business Sydney CBD: commercial office buildings',
      title: 'Sell a Business Sydney CBD | Blackmont Advisory',
      description:
        'Looking to sell a business in the Sydney CBD? Get a realistic valuation and a confidential sale run by one senior advisor. Book a free, private first call.',
      h1: 'Sell a Business in the Sydney CBD',
      intro:
        'For owners of professional services firms, specialist practices and city hospitality venues who want to sell a business in the Sydney CBD quietly, at a price the numbers support, with one senior advisor running the process from start to finish.',
      points: [
        'Confidential sale, buyers approved by you',
        'Valuation based on your real earnings',
        'Buyers from Sydney and across Australia',
        'A free first conversation',
      ],
      overviewHeading: 'How to sell a business in the Sydney CBD',
      overview: [
        'The CBD is the centre of Australia’s finance, legal and corporate services, so many of the businesses we see there are people businesses: accounting and advisory practices, consultancies, recruiters and specialist clinics, alongside the cafés and bars that serve the office workforce.',
        'For a business like that, buyers are paying for client relationships and the team that holds them. The sale has to show those relationships will stay after you leave, and it has to stay confidential, because in a tight city market clients and staff hear things quickly.',
        'We prepare the numbers, write the information memorandum and approach buyers privately, including trade buyers, family offices and private equity looking for a foothold in the city.',
      ],
      highlights: [
        'A business sell advisor focused on your outcome',
        'Trade buyers, family offices and private equity in our network',
        'Every buyer signs a confidentiality agreement first',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Sydney CBD business for sale',
      tipsIntro: 'What buyers of city-based businesses look at hardest.',
      tips: [
        {
          title: 'Show the client book is transferable',
          text: 'Buyers discount a practice where every key client relationship runs through the owner. Introduce senior staff to major clients well before a sale so the relationships do not leave with you.',
        },
        {
          title: 'Review your office lease',
          text: 'CBD leases are often expensive and long. Know the remaining term, the make-good obligations and whether the landlord must consent to an assignment, because a buyer’s lawyer will ask on day one.',
        },
        {
          title: 'Lock in key staff',
          text: 'In a professional services sale, the team is the asset. Consider retention arrangements for the people clients rely on, so a buyer can see the business will hold together after settlement.',
        },
        {
          title: 'Separate recurring from one-off work',
          text: 'Retainers and repeat engagements are worth more to a buyer than project fees. Break your revenue down by type so the recurring part is easy to see and value.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in the Sydney CBD without staff or clients finding out?',
          a: 'We describe the business without naming it, and only share identifying details once a buyer has signed a confidentiality agreement and you have approved them. Meetings are arranged outside business hours or away from your office where needed.',
        },
        {
          q: 'Who buys professional services businesses in the city?',
          a: 'Usually larger firms buying clients and staff, individuals stepping into ownership, and sometimes private equity building a group of similar practices. Each values the business differently, which is why we approach more than one type of buyer.',
          link: { href: '/selling-a-business/sydney', label: 'Selling a business in Sydney' },
        },
        {
          q: 'How do you price a business to sell in the CBD?',
          a: 'We start from the business’s adjusted earnings, then weigh how dependent it is on you, how secure the lease and client contracts are, and what comparable businesses have sold for. You get a realistic range before anything goes to market.',
          link: { href: '/business-valuation', label: 'Try our business valuation calculator' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business sydney cbd',
      imageAlt: 'Buy a business Sydney CBD: commercial office buildings',
      title: 'Buy a Business Sydney CBD | Blackmont Advisory',
      description:
        'Want to buy a business in the Sydney CBD? Independent buy-side advice on search, valuation, negotiation and due diligence, working only for you. Talk to us.',
      h1: 'Buy a Business in the Sydney CBD',
      intro:
        'Buying into the city is a big commitment, with high rents and businesses that often depend on a few key people. We help you buy a business in the Sydney CBD with independent advice from the first search to settlement.',
      points: [
        'Advice for the buyer, not the seller',
        'We check the earnings behind the price',
        'Off-market and listed opportunities',
        'Due diligence with your accountant and lawyer',
      ],
      overviewHeading: 'What to know before you buy a business in the Sydney CBD',
      overview: [
        'Most CBD businesses for sale fall into two groups: services firms such as accounting, advisory and recruitment practices, and businesses that live off the weekday office crowd, like cafés, lunch venues and convenience retail.',
        'Both can be good buys, but the risks are different. A services firm is only worth what transfers with it, so you need to know which clients and staff will stay. A food or retail business depends heavily on foot traffic and on a lease that can be very expensive in the city.',
        'As your business buy advisor, we test both: the people and relationships behind the revenue, and the lease and trading pattern behind the profit.',
      ],
      highlights: [
        'We work for you, never the seller',
        'Earnings tested before you make an offer',
        'Lease and key-person risk reviewed early',
        'One senior advisor from brief to handover',
      ],
      tipsHeading: 'Buying tips for the Sydney CBD',
      tipsIntro: 'Where city purchases most often go wrong, and how to avoid it.',
      tips: [
        {
          title: 'Check trading across the whole week',
          text: 'Many city businesses trade strongly Monday to Friday and very little on weekends or holidays. Look at sales by day and by month, not just the annual total.',
        },
        {
          title: 'Ask who the clients follow',
          text: 'In a practice or agency, find out whether clients deal with the owner or the team. A business whose clients follow the owner needs a longer handover or a price that reflects the risk.',
        },
        {
          title: 'Read the lease closely',
          text: 'Check the rent reviews, the remaining term and the make-good clause. A CBD lease can be the largest cost in the business, and a bank will want enough term to cover your loan.',
        },
        {
          title: 'Structure part of the price',
          text: 'Where revenue depends on relationships, consider holding back part of the price until clients and staff have stayed for an agreed period. It shares the risk fairly with the seller.',
        },
      ],
      faqs: [
        {
          q: 'Is it a good idea to buy a business in the Sydney CBD?',
          a: 'It can be, if the price reflects the real risks. City businesses benefit from a large workforce and corporate clients nearby, but carry high rents and can depend on a few people. Good due diligence tells you which kind you are looking at.',
        },
        {
          q: 'Can you find CBD businesses that are not advertised?',
          a: 'Yes. Part of our search is approaching owners directly about businesses that match your brief, and many sales happen privately rather than through public listings.',
          link: { href: '/buying-a-business/sydney', label: 'Buying a business in Sydney' },
        },
        {
          q: 'What does due diligence cover for a city business?',
          a: 'Financial statements matched to tax returns, the lease, client and supplier contracts, staff entitlements and any licences the business needs. We coordinate it with your accountant and lawyer so nothing important is missed.',
        },
      ],
    },
  },

  /* ── North Sydney ───────────────────────────────────────────── */
  {
    slug: 'north-sydney',
    name: 'North Sydney',
    city: 'sydney',
    nearby: ['sydney-cbd', 'pyrmont', 'surry-hills'],
    sell: {
      keyword: 'sell a business north sydney',
      imageAlt: 'Sell a business North Sydney: commercial office buildings',
      title: 'Sell a Business North Sydney | Blackmont Advisory',
      description:
        'Planning to sell a business in North Sydney? We value it on real earnings and take it privately to qualified buyers. Start with a confidential conversation.',
      h1: 'Sell a Business in North Sydney',
      intro:
        'North Sydney’s office towers are home to a large number of established firms. If you are ready to sell a business in North Sydney, we help you prepare it, value it realistically and find the right buyer without making the sale public.',
      points: [
        'Senior-led from first call to settlement',
        'Discreet approach to qualified buyers',
        'Realistic price range up front',
        'Phone and video, in person when needed',
      ],
      overviewHeading: 'Selling a business in North Sydney',
      overview: [
        'Across the Harbour Bridge from the city, North Sydney is one of Sydney’s major commercial centres. Its towers house technology, advertising, insurance and professional services firms, and many owner-run businesses that have built a loyal client base over years.',
        'Those firms often attract buyers who want an established presence on the lower north shore without paying city rents. They will look closely at contracts, the team and how much of the business depends on you.',
        'We help you get ahead of those questions: preparing clean financials, a clear information memorandum and a plan for handing over relationships, so buyers see a business worth paying for.',
      ],
      highlights: [
        'Valuation built from your actual numbers',
        'Buyers screened before they see any detail',
        'Information memorandum prepared for you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Tips for selling a North Sydney business',
      tipsIntro: 'The preparation that tends to lift price and speed up a North Sydney sale.',
      tips: [
        {
          title: 'Put client contracts in writing',
          text: 'Many established firms run on handshake arrangements. Written agreements with your main clients, ideally with terms that survive a change of ownership, give a buyer far more confidence.',
        },
        {
          title: 'Reduce reliance on yourself',
          text: 'If you still win most of the work and sign off every job, start delegating now. A buyer will pay more for a business where a manager or senior team already runs the day to day.',
        },
        {
          title: 'Tidy up the technology',
          text: 'Buyers of tech and services firms will ask who owns the software, domains, licences and data. Make sure they are held by the business, not by you personally or a former contractor.',
        },
        {
          title: 'Decide what you want after the sale',
          text: 'Some buyers want the owner to stay on for a period; others want a clean exit. Knowing your preference early helps us target the right buyers and structure the deal.',
        },
      ],
      faqs: [
        {
          q: 'What is the best way to sell a business in North Sydney?',
          a: 'Prepare first, then go to a targeted group of buyers rather than advertising widely. That protects confidentiality and usually produces better offers, because the buyers you approach have already been screened for interest and the ability to pay.',
        },
        {
          q: 'Should I use a business broker or sell it myself?',
          a: 'Selling yourself saves the fee, but you handle valuation, buyer screening, negotiation and due diligence while still running the business. An advisor manages all of that and often reaches more buyers. We explain the trade-offs honestly in a first conversation.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
        {
          q: 'Do you work with North Sydney owners in person?',
          a: 'Our office is in Melbourne. We work with North Sydney clients by phone and video and meet in person when a deal needs it, such as key negotiations or meetings with serious buyers.',
          link: { href: '/business-brokers/sydney', label: 'Business brokers in Sydney' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business north sydney',
      imageAlt: 'Buy a business North Sydney: commercial office buildings',
      title: 'Buy a Business North Sydney | Blackmont Advisory',
      description:
        'Looking to buy a business in North Sydney? We search, value and negotiate for you, then manage due diligence so you buy with confidence. Tell us your brief.',
      h1: 'Buy a Business in North Sydney',
      intro:
        'Whether you want an established services firm or a business serving North Sydney’s office workers, we help you buy a business in North Sydney at a fair price, with a buy-side advisor checking every number for you.',
      points: [
        'Independent buy-side advice',
        'Search beyond the public listings',
        'Valuation before you negotiate',
        'Support through to handover',
      ],
      overviewHeading: 'Buying a business in North Sydney',
      overview: [
        'North Sydney offers established commercial businesses close to the city, often with lower overheads than equivalent firms south of the bridge. Agencies, consultancies, IT services and allied professional practices change hands regularly, as do the cafés and services that support the office precinct.',
        'The risk in buying a firm like this is paying for goodwill that leaves with the seller. Before you commit, you need to know which clients are contracted, which staff are staying and how the business performs when the owner is not in the room.',
        'We act only for you, testing those points before you make an offer and negotiating terms that protect you if things change after settlement.',
      ],
      highlights: [
        'A business buy advisor on your side only',
        'Goodwill and client risk tested early',
        'Price and terms negotiated for you',
        'Coordinated due diligence',
      ],
      tipsHeading: 'Buying tips for North Sydney',
      tipsIntro: 'Practical checks before buying into North Sydney’s commercial market.',
      tips: [
        {
          title: 'Meet the team before you sign',
          text: 'In a services business the staff carry the knowledge. Ask to meet senior people under a confidentiality agreement before you commit, and find out whether they plan to stay.',
        },
        {
          title: 'Check client concentration',
          text: 'If one or two clients make up a large share of revenue, the business is more fragile than it looks. Ask for revenue by client over at least three years.',
        },
        {
          title: 'Plan the handover period',
          text: 'Agree in the contract how long the seller will stay and what they will do, such as introducing you to key clients. A clear handover protects the goodwill you are paying for.',
        },
        {
          title: 'Talk to your bank early',
          text: 'Lenders will want to see the financials, the lease and your experience. Getting finance conversations started before you find the business saves time when it matters.',
        },
      ],
      faqs: [
        {
          q: 'What types of businesses can I buy in North Sydney?',
          a: 'Commonly professional services, technology and marketing firms, along with hospitality and personal services that serve the local workforce and residents. We help you work out which suits your skills, budget and how hands-on you want to be.',
        },
        {
          q: 'How do I know if the asking price is fair?',
          a: 'We rebuild the earnings from the financial records, remove one-off and personal items, and compare the result with what similar businesses sell for. That gives you a defensible view of value before you negotiate.',
          link: { href: '/business-valuation', label: 'How business valuation works' },
        },
        {
          q: 'Why use an advisor to buy a business in North Sydney?',
          a: 'The seller’s broker works for the seller. A buy-side advisor works for you, searches more widely, tests the numbers and negotiates terms in your interest, which usually more than covers the cost.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
    },
  },

  /* ── Surry Hills ────────────────────────────────────────────── */
  {
    slug: 'surry-hills',
    name: 'Surry Hills',
    city: 'sydney',
    nearby: ['sydney-cbd', 'alexandria', 'pyrmont'],
    sell: {
      keyword: 'sell a business surry hills',
      imageAlt: 'Sell a business Surry Hills: commercial office buildings',
      title: 'Sell a Business Surry Hills | Blackmont Advisory',
      description:
        'Want to sell a business in Surry Hills? From agencies to cafés and restaurants, we value it fairly and find buyers privately. Book a free, confidential chat.',
      h1: 'Sell a Business in Surry Hills',
      intro:
        'Surry Hills is full of creative agencies, studios, cafés and restaurants built around their owners. We help you sell a business in Surry Hills in a way that protects your reputation, your team and the price.',
      points: [
        'Quiet, confidential sale process',
        'Buyers screened and approved by you',
        'A clear price range before you list',
        'Help with the lease and handover',
      ],
      overviewHeading: 'How to sell a business in Surry Hills',
      overview: [
        'Just south of the CBD, Surry Hills mixes converted warehouses and terraces with some of Sydney’s best-known cafés, bars and restaurants. It is also home to many design, advertising and media studios that have grown from a founder and a few clients.',
        'Businesses like these are personal. Customers come for the owner’s style or the chef’s menu; clients hire the creative director. A good sale shows a buyer that the brand, the team and the systems will carry on after you step away.',
        'We prepare the business with that in mind, price it on its real earnings and approach buyers privately, so regulars and staff are not unsettled by a public listing.',
      ],
      highlights: [
        'Hospitality and creative services understood',
        'No public listing unless you want one',
        'A business sell advisor, start to finish',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Surry Hills business for sale',
      tipsIntro: 'What matters most when selling a hospitality venue or creative studio in Surry Hills.',
      tips: [
        {
          title: 'Get your licences in order',
          text: 'A venue’s liquor licence, outdoor dining approval or council permits can make or break a sale. Check they are current and transferable, and that the business operates within their conditions.',
        },
        {
          title: 'Document your recipes and processes',
          text: 'A buyer needs to deliver the same experience your customers expect. Written recipes, supplier lists and service standards make the business less dependent on you or one key chef.',
        },
        {
          title: 'Protect the brand',
          text: 'Make sure the business name, logo, website and social accounts belong to the business and can transfer. Registered trade marks add certainty for a buyer paying for a well-known name.',
        },
        {
          title: 'Show clean, consistent takings',
          text: 'Hospitality buyers want sales records that match the bank statements and tax returns. Cash that is not recorded cannot be counted in the price.',
        },
      ],
      faqs: [
        {
          q: 'Can I sell a business in Surry Hills without my regulars knowing?',
          a: 'Yes. We market the business without naming it, share details only with buyers who have signed a confidentiality agreement, and arrange visits so they look like normal customers. Your staff and regulars find out when you choose to tell them.',
        },
        {
          q: 'How is a café or restaurant valued?',
          a: 'Usually on its adjusted profit, with weight given to the lease, the fit-out, the licence and how much of the trade depends on the owner. A strong lease with good term remaining can add real value.',
          link: { href: '/business-valuation', label: 'Estimate your business’s value' },
        },
        {
          q: 'Who buys creative agencies?',
          a: 'Often larger agencies adding capabilities or clients, and sometimes senior staff or individual buyers. Most will want the founder to stay for a handover period, which we help you plan and negotiate.',
        },
      ],
    },
    buy: {
      keyword: 'buy a business surry hills',
      imageAlt: 'Buy a business Surry Hills: commercial office buildings',
      title: 'Buy a Business Surry Hills | Blackmont Advisory',
      description:
        'Planning to buy a business in Surry Hills? Get independent advice on cafés, venues and studios, from valuation to due diligence and settlement. Contact us.',
      h1: 'Buy a Business in Surry Hills',
      intro:
        'A Surry Hills café, bar or creative studio can be a rewarding purchase, but much of the value sits with the outgoing owner. We help you buy a business in Surry Hills with clear eyes and a fair price.',
      points: [
        'Advice that works only for you',
        'Takings and lease checked properly',
        'Help negotiating price and handover',
        'One senior advisor throughout',
      ],
      overviewHeading: 'Buying a business in Surry Hills',
      overview: [
        'Surry Hills has a strong local following and steady foot traffic from workers, residents and visitors. That makes its hospitality, retail and creative businesses attractive, and also means good ones are often sold quietly to people who already know the area.',
        'The main risks are personal goodwill, licences and the lease. A café that relies on the owner’s relationships with regulars, or an agency built on the founder’s reputation, may lose customers after a sale unless the handover is well planned.',
        'As your business buy advisor, we test the takings against the records, review the lease and licences, and help you negotiate a handover that keeps customers and staff in place.',
      ],
      highlights: [
        'Independent, buy-side only',
        'Hospitality takings tested against records',
        'Licences and lease reviewed early',
        'Off-market opportunities through direct approaches',
      ],
      tipsHeading: 'Tips for buying a business in Surry Hills',
      tipsIntro: 'Checks that protect you when buying hospitality or creative businesses in the area.',
      tips: [
        {
          title: 'Sit in the venue more than once',
          text: 'Visit at different times and days, as a customer, before you make an offer. Watch the trade, the staff and the regulars, then compare what you see with the sales records.',
        },
        {
          title: 'Confirm the licence will transfer',
          text: 'Liquor licences and other approvals have their own transfer process and conditions. Your lawyer should confirm they will transfer to you before settlement, not after.',
        },
        {
          title: 'Understand the fit-out’s condition',
          text: 'Kitchen equipment and fit-outs are expensive to replace. Ask how old the main items are and whether the lease requires you to refit or restore the premises later.',
        },
        {
          title: 'Keep the key people',
          text: 'Head chefs, managers and senior creatives often matter more than the equipment. Find out their plans early and, where it makes sense, agree how you will keep them on.',
        },
      ],
      faqs: [
        {
          q: 'How do I find a business to buy in Surry Hills?',
          a: 'Through public listings, broker networks and direct approaches to owners. Many good businesses never reach the open market, so we approach owners whose businesses match your brief and ask whether they would consider selling.',
          link: { href: '/buying-a-business/sydney', label: 'Buying a business in Sydney' },
        },
        {
          q: 'What due diligence should I do on a café or bar?',
          a: 'Check the sales records against bank statements and tax returns, review the lease, licences and staff arrangements, and confirm supplier terms. Your accountant and lawyer handle their parts; we coordinate so the findings feed into the final price.',
        },
        {
          q: 'Should I buy an existing business or start one in Surry Hills?',
          a: 'Buying gives you customers, staff and cash flow from day one, which matters in an area where fit-outs and rents are costly. Starting can cost less up front but carries more risk while you build trade.',
        },
      ],
    },
  },

  /* ── Pyrmont ────────────────────────────────────────────────── */
  {
    slug: 'pyrmont',
    name: 'Pyrmont',
    city: 'sydney',
    nearby: ['sydney-cbd', 'surry-hills', 'alexandria', 'north-sydney'],
    sell: {
      keyword: 'sell a business pyrmont',
      imageAlt: 'Sell a business Pyrmont: commercial office buildings',
      title: 'Sell a Business Pyrmont | Blackmont Advisory',
      description:
        'Ready to sell a business in Pyrmont? We prepare tech, media and hospitality businesses for sale and approach buyers in confidence. Arrange a free first call.',
      h1: 'Sell a Business in Pyrmont',
      intro:
        'From tech and media firms to harbourside hospitality, Pyrmont businesses attract buyers from across Sydney and beyond. We help you sell a business in Pyrmont confidentially, with a realistic price and a well-prepared story for buyers.',
      points: [
        'Prepared for buyer scrutiny',
        'Every buyer under confidentiality first',
        'Realistic valuation from real earnings',
        'Senior advisor throughout the sale',
      ],
      overviewHeading: 'Selling a business in Pyrmont',
      overview: [
        'Once a working harbourside suburb, Pyrmont is now a mix of offices, apartments and waterfront venues next to Darling Harbour. Technology, media and digital businesses sit alongside restaurants and tourism operators that depend on visitors to the harbour.',
        'Buyers for these businesses vary widely. A software or digital services firm may attract strategic buyers and private equity interested in recurring revenue. A visitor-facing venue will be judged on its lease, location and seasonal trading.',
        'We tailor the preparation and the buyer list to your business, so the information memorandum answers the questions your likely buyer will ask before they ask them.',
      ],
      highlights: [
        'Strategic buyers and private equity reached privately',
        'Recurring revenue presented clearly',
        'Information memorandum prepared for you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Pyrmont business for sale',
      tipsIntro: 'The points that most affect value for Pyrmont’s tech, media and hospitality businesses.',
      tips: [
        {
          title: 'Report your recurring revenue',
          text: 'For software, subscription or retainer businesses, buyers focus on recurring revenue, client churn and contract length. Report these consistently over at least two to three years.',
        },
        {
          title: 'Secure your intellectual property',
          text: 'Make sure code, content and designs created by staff and contractors are owned by the business under written agreements. Gaps here are a common reason deals slow down.',
        },
        {
          title: 'Explain the seasonality',
          text: 'Visitor-facing businesses near the harbour may trade differently across the year. Show monthly results so buyers understand the pattern rather than guessing.',
        },
        {
          title: 'Know your lease position',
          text: 'Waterfront and precinct leases can carry special conditions. Check the term, options and assignment rules early, because a buyer’s lender will need certainty there.',
        },
      ],
      faqs: [
        {
          q: 'How long does it take to sell a business in Pyrmont?',
          a: 'It depends on the business, the price and how prepared it is. Many sales take several months once on the market, and preparation beforehand often shortens that and improves the result.',
          link: { href: '/resources/guides', label: 'Read our selling guides' },
        },
        {
          q: 'Can I sell a tech business in Pyrmont to private equity?',
          a: 'Possibly, if it has the scale, recurring revenue and management depth private equity looks for. Smaller firms more often sell to trade buyers or individuals. We tell you honestly which buyers are realistic for your business.',
        },
        {
          q: 'What does it cost to sell a business?',
          a: 'Budget for the advisor’s fee, legal and accounting costs and any tax on the sale, such as capital gains tax. Small business CGT concessions may reduce the tax, so speak to your accountant early.',
          link: { href: '/exit', label: 'Plan your exit' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business pyrmont',
      imageAlt: 'Buy a business Pyrmont: commercial office buildings',
      title: 'Buy a Business Pyrmont | Blackmont Advisory',
      description:
        'Looking to buy a business in Pyrmont? We find, value and negotiate tech, media and hospitality businesses for you, then manage due diligence. Get in touch.',
      h1: 'Buy a Business in Pyrmont',
      intro:
        'Pyrmont offers digital businesses with recurring revenue and harbourside venues with strong visitor trade. We help you buy a business in Pyrmont with independent advice, careful due diligence and terms that protect you if revenue, staff or trade change after settlement.',
      points: [
        'Buy-side advice, never the seller’s',
        'Recurring revenue and churn checked',
        'Lease and trading pattern reviewed',
        'Negotiation and settlement support',
      ],
      overviewHeading: 'Buying a business in Pyrmont',
      overview: [
        'Pyrmont’s business mix is unusually broad for a small suburb: software and digital agencies in converted wharf buildings and offices, plus cafés, restaurants and tourism businesses serving the Darling Harbour crowds.',
        'For a digital business, the questions are how reliable the revenue is, who owns the technology and whether key developers or account managers will stay. For a hospitality or tourism business, they are the lease, the seasons and how much the trade depends on events and visitors.',
        'We work through those questions with you, so you know what you are buying and pay a price that reflects it.',
      ],
      highlights: [
        'A business buy advisor working only for you',
        'Technology ownership and staff risk checked',
        'Seasonal trading analysed month by month',
        'One senior advisor from brief to handover',
      ],
      tipsHeading: 'Buying tips for Pyrmont',
      tipsIntro: 'What to check before you buy into Pyrmont’s digital or hospitality market.',
      tips: [
        {
          title: 'Check who owns the code',
          text: 'Confirm that software, platforms and content are owned by the business and not licensed from the founder or a contractor. Ask your lawyer to review the agreements.',
        },
        {
          title: 'Look at churn, not just revenue',
          text: 'Recurring revenue is only valuable if clients stay. Ask for client numbers, cancellations and contract terms over time, not just the current monthly figure.',
        },
        {
          title: 'Map the busy and quiet months',
          text: 'For venues and tourism businesses, compare monthly sales across several years. Make sure your finance and working capital can carry you through the quieter periods.',
        },
        {
          title: 'Agree a proper handover',
          text: 'Founders of digital businesses often hold key client and technical knowledge. Agree in writing how long they will stay and what they will hand over.',
        },
      ],
      faqs: [
        {
          q: 'Is Pyrmont a good place to buy a business?',
          a: 'It can be, especially for digital services or hospitality with a strong position near the harbour. The right choice depends on your experience, budget and appetite for seasonal or key-person risk.',
        },
        {
          q: 'How do I value a digital business before buying it?',
          a: 'We rebuild the earnings, then weigh recurring revenue, churn, customer concentration and technology ownership. Those factors can move value significantly, so they need checking before any offer.',
          link: { href: '/business-valuation', label: 'How we value a business' },
        },
        {
          q: 'Can you help me buy a business in Pyrmont from Melbourne?',
          a: 'Yes. We work with Sydney buyers by phone and video and meet in person when a deal needs it. Our search and due diligence process is the same wherever the business is.',
          link: { href: '/buying-a-business/sydney', label: 'Buying a business in Sydney' },
        },
      ],
    },
  },

  /* ── Alexandria ─────────────────────────────────────────────── */
  {
    slug: 'alexandria',
    name: 'Alexandria',
    city: 'sydney',
    nearby: ['surry-hills', 'sydney-cbd', 'pyrmont'],
    sell: {
      keyword: 'sell a business alexandria',
      imageAlt: 'Sell a business Alexandria: commercial office buildings',
      title: 'Sell a Business Alexandria | Blackmont Advisory',
      description:
        'Need to sell a business in Alexandria? We value warehouses, showrooms and light industrial firms on real earnings and find buyers privately. Talk to us today.',
      h1: 'Sell a Business in Alexandria',
      intro:
        'Alexandria’s warehouses and showrooms hold a wide range of distribution, trade and light industrial businesses. We help you sell a business in Alexandria with a realistic valuation, a clear treatment of stock and equipment, and a confidential approach to serious buyers.',
      points: [
        'Experience with trade and industrial sales',
        'Confidential approach to buyers',
        'Equipment, stock and property considered',
        'One senior advisor throughout',
      ],
      overviewHeading: 'How to sell a business in Alexandria',
      overview: [
        'In Sydney’s inner south, close to the airport and Port Botany, Alexandria has long been a base for warehousing, wholesale, trade services and light industry. More recently it has added showrooms, gyms, breweries and creative studios in converted industrial buildings.',
        'For buyers, the attraction is location: inner-city access with the space to store, make and distribute. That means your sale has to account for more than profit, including the equipment, stock, vehicles and the lease on the site you trade from.',
        'We help you separate those elements clearly, value the business fairly and take it to buyers such as competitors, suppliers and investors looking for a well-located operation.',
      ],
      highlights: [
        'Trade and private equity buyers in our network',
        'Stock and plant handled clearly in the deal',
        'Every buyer under a confidentiality agreement',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing an Alexandria business for sale',
      tipsIntro: 'Preparation that helps an industrial or distribution business sell for full value.',
      tips: [
        {
          title: 'Schedule your plant and equipment',
          text: 'List the key equipment, vehicles and machinery with age, condition and whether they are owned or financed. Buyers need this to understand what they are paying for.',
        },
        {
          title: 'Agree how stock will be treated',
          text: 'Stock is usually valued separately at settlement. Clear stock records and a fair counting method avoid arguments late in the deal.',
        },
        {
          title: 'Check the site lease and zoning',
          text: 'Industrial leases often include conditions on use, hours and make-good. Make sure the lease allows the business to continue as it operates now, with enough term for a buyer.',
        },
        {
          title: 'Spread your customer base',
          text: 'Distribution and trade businesses can rely on a few large accounts. Show customer spread, and where possible, written supply agreements that continue under a new owner.',
        },
      ],
      faqs: [
        {
          q: 'Who buys an industrial business in Alexandria?',
          a: 'Often competitors and suppliers wanting a well-located site, owner-operators stepping up from a trade, and sometimes private equity or family offices assembling larger groups. We approach the buyer types most likely to value your business.',
        },
        {
          q: 'How is an Alexandria business valued if I own the property?',
          a: 'The business and the property are usually valued separately. You might sell both, sell the business and lease the property to the buyer, or keep the property for income. Each choice affects the price and tax.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Do you work with NSW business brokers or replace them?',
          a: 'We run the sale ourselves as your advisor, from valuation to settlement. We can work alongside other advisors you already use, such as your accountant and lawyer.',
          link: { href: '/business-brokers/sydney', label: 'Business brokers in Sydney' },
        },
      ],
    },
    buy: {
      keyword: 'buy a business alexandria',
      imageAlt: 'Buy a business Alexandria: commercial office buildings',
      title: 'Buy a Business Alexandria | Blackmont Advisory',
      description:
        'Want to buy a business in Alexandria? Get independent help finding and checking warehouse, trade and light industrial businesses before you buy. Contact us.',
      h1: 'Buy a Business in Alexandria',
      intro:
        'Alexandria gives you inner-Sydney access with room to store, make and distribute. We help you buy a business in Alexandria, checking the equipment, stock, lease and customer base before you commit, and negotiating a price that reflects what we find.',
      points: [
        'Search on and off the market',
        'Plant, stock and lease checked',
        'Price negotiated on your behalf',
        'Due diligence coordinated for you',
      ],
      overviewHeading: 'Buying a business in Alexandria',
      overview: [
        'Alexandria’s mix of warehouses, workshops and showrooms makes it one of the best places in inner Sydney to buy an operating business with real assets: wholesale and distribution, trade services, manufacturing, fitness and food production.',
        'With that comes more to check. Equipment can be old or financed, stock can be overvalued, and an industrial lease can restrict how you use the site. A large customer can also make up more of the revenue than it first appears.',
        'As your business buy advisor, we work through each of those with your accountant and lawyer, so the price reflects the business you are actually getting.',
      ],
      highlights: [
        'A buy-side advisor on your side only',
        'Equipment and finance checked',
        'Customer concentration analysed',
        'One senior advisor from brief to handover',
      ],
      tipsHeading: 'Buying tips for Alexandria',
      tipsIntro: 'Checks that matter most when buying an industrial or trade business in Alexandria.',
      tips: [
        {
          title: 'Inspect the equipment',
          text: 'Have key machinery and vehicles inspected, and check for finance or security interests on the register. Replacing major equipment soon after buying can wipe out your first year’s profit.',
        },
        {
          title: 'Value stock at settlement',
          text: 'Agree in the contract how stock will be counted and valued on the day, and exclude old or slow-moving items. Do not pay full price for stock you cannot sell.',
        },
        {
          title: 'Read the industrial lease',
          text: 'Check permitted use, operating hours, access for trucks and make-good obligations. Make sure the site works for the way you plan to run and grow the business.',
        },
        {
          title: 'Test the supply chain',
          text: 'Find out whether supplier terms and any exclusive agreements will continue under you. A key supplier walking away can change the economics of a distribution business quickly.',
        },
      ],
      faqs: [
        {
          q: 'What businesses can I buy in Alexandria?',
          a: 'Commonly wholesale and distribution, trade services, light manufacturing, food production, fitness and showroom-based retail. We help you narrow the search to what suits your skills and budget.',
        },
        {
          q: 'What are common mistakes when buying an industrial business?',
          a: 'Paying for worn-out equipment, overvaluing stock, missing finance owed on assets, and underestimating how much revenue sits with one customer. Each is avoidable with proper due diligence before you sign.',
          link: { href: '/resources/guides', label: 'Read our guides' },
        },
        {
          q: 'Should I buy the property as well as the business?',
          a: 'Sometimes the owner will sell both. Buying the property gives security of tenure but needs more capital and different finance. We help you weigh it against leasing, with your accountant’s input.',
          link: { href: '/buying-a-business/sydney', label: 'Buying a business in Sydney' },
        },
      ],
    },
  },
];
