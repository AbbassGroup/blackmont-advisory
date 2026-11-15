import type { SuburbEntry } from './types';

/**
 * Inner Melbourne suburbs, part B: Richmond, South Yarra, St Kilda, Fitzroy, Brunswick.
 * Each sell and buy page is written on its own. No invented deals, figures or postcodes.
 */

const LICENCE = 'Licensed business agent, BLA 092153L';

export const MELBOURNE_B: SuburbEntry[] = [
  /* ── Richmond ─────────────────────────────────────────────── */
  {
    slug: 'richmond',
    name: 'Richmond',
    city: 'melbourne',
    nearby: ['south-yarra', 'fitzroy', 'melbourne-cbd', 'southbank'],
    sell: {
      keyword: 'sell my business richmond',
      title: 'Sell My Business Richmond | Blackmont Advisory',
      description:
        'Asking “how do I sell my business in Richmond?” Blackmont Advisory values, prepares and sells Richmond businesses to qualified buyers, confidentially.',
      h1: 'Sell My Business in Richmond',
      intro:
        'Ready to sell your Richmond business? We are a Melbourne business sale advisor ten minutes away in Toorak. We work out what it is worth, get it ready for buyers and sell it quietly, without the street finding out.',
      points: [
        'Office ten minutes away in Toorak',
        'A free, confidential first meeting',
        'Buyers sign an NDA before they see a name',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Richmond',
      overview: [
        'Richmond packs several business districts into one suburb. Swan Street runs on hospitality and the crowds from the sporting precinct. Bridge Road mixes retail, furniture and food. Church Street is known for design and homewares showrooms, and Victoria Street for its Vietnamese restaurants and grocers. Next door, Cremorne has filled with tech and creative offices.',
        'Each of these strips attracts a different buyer. A Swan Street bar draws hospitality operators who know event-day trade. A Church Street showroom suits a brand looking for a Melbourne shopfront. A services firm near Cremorne may interest a larger group buying for its team and clients.',
        'We match the sale to the buyer most likely to pay for what you have built, and we keep it confidential the whole way.',
      ],
      highlights: [
        'Business advisory services Richmond owners can use before and during a sale',
        'Hospitality, retail, showroom and professional services sales',
        'Private buyers, trade buyers and investors in our network',
        'Fees agreed in writing before any work starts',
      ],
      tipsHeading: 'Getting a Richmond business ready to sell',
      tipsIntro: 'What Richmond owners can do now to make the sale smoother and the price stronger.',
      tips: [
        {
          title: 'Separate event trade from everyday trade',
          text: 'If you sit near the MCG or Swan Street, game days can lift your takings. Show buyers what a normal week looks like as well, so they trust the numbers rather than discount them.',
        },
        {
          title: 'Check your lease and fit-out',
          text: 'Bridge Road and Church Street rents can be high. Make sure the remaining lease term and options cover a buyer’s plans, and that your fit-out is in a condition you can stand behind.',
        },
        {
          title: 'Write down your supplier terms',
          text: 'Many Richmond retailers and showrooms rely on import or brand agreements. Confirm which ones transfer to a new owner, because buyers will ask before they make a firm offer.',
        },
        {
          title: 'Keep staff news under control',
          text: 'Richmond is close-knit and hospitality staff move between venues often. Tell your team at the right moment, with a plan, so word of the sale does not reach competitors first.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Richmond without staff or customers knowing?',
          a: 'We market the business without its name or address. Buyers sign a confidentiality agreement and you approve each one before they receive the information memorandum. Inspections happen out of hours or off-site where needed, so your team and regulars hear about it only when you decide.',
        },
        {
          q: 'What will a Richmond buyer want to see first?',
          a: 'Usually three years of financials, the lease, and a clear picture of weekly trade. For hospitality, buyers also want liquor licence details and staff arrangements. Having these ready shortens due diligence and keeps the price you agreed from being chipped away late.',
        },
        {
          q: 'How much is my Richmond cafe or restaurant worth?',
          a: 'It depends on profit after a fair wage for the owner, the lease, and how much of the trade relies on you personally. Our free calculator gives a starting range, and we can then look at your figures in detail.',
          link: { href: '/business-valuation', label: 'Try the business valuation calculator' },
        },
      ],
      imageAlt: 'Glass office towers representing sell my business Richmond with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business richmond',
      title: 'Buy a Business Richmond | Blackmont Advisory',
      description:
        'Want to buy a business in Richmond? Blackmont Advisory finds, checks and negotiates Richmond businesses for buyers, working only for you. Share your brief.',
      h1: 'Buy a Business in Richmond',
      intro:
        'Want to buy a business in Richmond? We act only for you, the buyer. We search listed and unlisted businesses, check the numbers behind the asking price and negotiate the deal, so you can buy with confidence.',
      points: [
        'We work for the buyer, never the seller',
        'Off-market businesses as well as listings',
        'Earnings checked before you make an offer',
        'Based close by in Toorak',
      ],
      overviewHeading: 'Buying a business in Richmond',
      overview: [
        'Richmond gives buyers plenty of choice in a small area. You will find bars and restaurants on Swan Street, retailers and food businesses along Bridge Road, design showrooms on Church Street and long-running eateries on Victoria Street. The offices around Cremorne add a market of workers who want lunch, coffee and services close by.',
        'That variety cuts both ways. Rents differ sharply from one block to the next, and some venues depend heavily on events at the nearby stadiums. A business that looks strong on a busy weekend can look different on a quiet Tuesday.',
        'We help you see the real trading pattern, the true cost of the lease and what the owner actually takes home, before you commit.',
      ],
      highlights: [
        'Independent advice for buyers only',
        'Hospitality, retail and service businesses across Richmond',
        'Help comparing buying an existing business vs starting one',
        'Support from first look to settlement',
      ],
      tipsHeading: 'Tips for buying a business in Richmond',
      tipsIntro: 'Points we check for every buyer looking at a Richmond business.',
      tips: [
        {
          title: 'Ask for weekly figures, not just annual ones',
          text: 'Event days around Swan Street can hide slow weeks. Weekly or monthly sales show whether the business pays its rent all year or only during the football season.',
        },
        {
          title: 'Read the lease before the menu',
          text: 'In Richmond the lease often matters more than the fit-out. Check rent reviews, the term left, the options and who pays for repairs before you agree a price.',
        },
        {
          title: 'Confirm the licences move with you',
          text: 'Liquor, food and outdoor dining permits can carry conditions. Make sure they transfer to you, and that trading hours match what the seller says the business does now.',
        },
        {
          title: 'Plan your finance early',
          text: 'Financing a business purchase in Melbourne usually means a bank wants clean records and a solid lease. Talk to your lender before you make an offer, not after.',
        },
      ],
      faqs: [
        {
          q: 'How do I find a business to buy in Richmond that is not advertised?',
          a: 'Many owners would sell for the right offer but have never listed. We approach suitable businesses directly on your behalf, without naming you, and bring you the ones that fit your brief and budget.',
        },
        {
          q: 'Is it better to buy a business in Richmond or start one?',
          a: 'Buying gives you customers, staff and income from day one, which can matter in a suburb with high rents. Starting costs less upfront but takes longer to earn. We can help you compare both for your situation.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'I am a first-time business buyer. Can you still help?',
          a: 'Yes. Many of our clients are buying their first business. We explain each step, check the financials with your accountant, and make sure you understand the lease and the handover before you sign anything.',
        },
      ],
      imageAlt: 'Glass office towers representing buy a business Richmond with Blackmont Advisory',
    },
  },

  /* ── South Yarra ──────────────────────────────────────────── */
  {
    slug: 'south-yarra',
    name: 'South Yarra',
    city: 'melbourne',
    nearby: ['richmond', 'st-kilda', 'south-melbourne', 'melbourne-cbd'],
    sell: {
      keyword: 'sell a business south yarra',
      title: 'Sell a Business South Yarra | Blackmont Advisory',
      description:
        'Looking to sell a business in South Yarra discreetly? Blackmont Advisory is just over the border on Toorak Road and sells local businesses. Book a chat.',
      h1: 'Sell a Business in South Yarra',
      intro:
        'Thinking of selling your South Yarra business? Our office is on Toorak Road, just over the boundary in Toorak. We value your business, prepare it for buyers and run the sale privately, from first meeting to settlement.',
      points: [
        'Office on Toorak Road, next to South Yarra',
        'Meet in person, at short notice',
        'No public listing with your name on it',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in South Yarra',
      overview: [
        'South Yarra is our local market. Chapel Street and Toorak Road carry fashion, beauty, hospitality and lifestyle brands, while the side streets hold clinics, studios and professional firms. Many customers live nearby, so a good business here often has loyal clients and strong repeat trade.',
        'The suburb is also home to investment firms, financial advisers and other professional practices. Owners of these firms often want a discreet sale to a buyer who will look after long-standing clients. We are a business sale advisor, not a financial planner, and we focus on getting that sale right.',
        'Because we are close by, we can meet you at short notice, walk through the business with you and keep every step out of public view.',
      ],
      highlights: [
        'Our office is a short walk from South Yarra',
        'Retail, beauty, clinic, hospitality and professional practice sales',
        'Buyers screened and approved by you before any detail is shared',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a South Yarra business for sale',
      tipsIntro: 'Practical steps for South Yarra owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show that clients stay',
          text: 'In clinics, salons and advisory practices, buyers pay for clients who keep coming back. Pull together repeat-booking or retention figures, and plan how you will introduce the new owner.',
        },
        {
          title: 'Know your brand and stock position',
          text: 'Chapel Street retailers often rely on brand agreements and seasonal stock. Confirm which agreements transfer and agree how stock will be valued at settlement before buyers start asking.',
        },
        {
          title: 'Review your lease options',
          text: 'Prime South Yarra sites are hard to replace. A buyer will want enough lease term to recover their investment, so check your options and talk to your landlord early.',
        },
        {
          title: 'Get your tax advice in place',
          text: 'Capital gains tax when selling a business in Australia can change how you structure the deal. Speak with your accountant before you accept an offer, not after.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in South Yarra quietly?',
          a: 'We describe your business without its name or exact location. Interested buyers sign a confidentiality agreement, and you approve each one before they see the details. Your clients, staff and neighbours should not learn about the sale until you are ready to tell them.',
        },
        {
          q: 'Can you sell an investment firm or advisory practice in South Yarra?',
          a: 'Yes. We act as the business sale advisor on the transaction, finding and negotiating with the buyer. Licensing, client consent and transfer requirements for financial services firms sit with your compliance and legal advisers, and we work alongside them.',
        },
        {
          q: 'What does it cost to sell my business with you?',
          a: 'Fees depend on the size and complexity of the sale. We agree them in writing before we start, so there are no surprises. Our selling page explains how business broker fees in Melbourne usually work.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
      ],
      imageAlt: 'Glass office towers representing sell a business South Yarra with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business south yarra',
      title: 'Buy a Business South Yarra | Blackmont Advisory',
      description:
        'Want to buy a business in South Yarra? Blackmont Advisory, on Toorak Road, finds and negotiates businesses for buyers, with advice on your side only.',
      h1: 'Buy a Business in South Yarra',
      intro:
        'Looking to buy a business in South Yarra? We are buyer’s advisors based on Toorak Road, right next door. We find suitable businesses, test the figures and negotiate the price and terms for you.',
      points: [
        'Local advisors on Toorak Road',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in South Yarra',
      overview: [
        'South Yarra suits buyers who want an established customer base with money to spend. Chapel Street and Toorak Road are lined with boutiques, cafes, bars and beauty businesses, and there are medical, allied health and professional practices throughout the suburb.',
        'Prices here reflect the location, so the margin for error is smaller. High rents, staff costs and owner involvement can make two similar-looking businesses very different investments.',
        'We help you work out what the business really earns, how much depends on the current owner, and whether the lease gives you time to get your money back.',
      ],
      highlights: [
        'Advice for the buyer only, with no seller to please',
        'Clinics, salons, retail and hospitality businesses',
        'Help with financing a business purchase in Melbourne',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in South Yarra',
      tipsIntro: 'Tips we share with every buyer weighing up a South Yarra business.',
      tips: [
        {
          title: 'Find out how much the owner does',
          text: 'Many South Yarra clinics and salons rely on the owner’s own clients. Ask how much revenue they personally generate, and how the handover will keep those clients with the business.',
        },
        {
          title: 'Compare rent to turnover',
          text: 'Chapel Street rents can be steep. Work out rent as a share of sales and compare it with similar businesses, so you know whether the site is an asset or a burden.',
        },
        {
          title: 'Check stock and supplier deals',
          text: 'Fashion and beauty businesses often depend on brand agreements. Make sure they will continue under new ownership and that stock is counted and valued properly at settlement.',
        },
        {
          title: 'Look at the online side too',
          text: 'Many South Yarra retailers sell online as well as in store. Ask for website and marketplace sales separately and confirm that domains, accounts and customer lists are included.',
        },
      ],
      faqs: [
        {
          q: 'Why buy a business in South Yarra rather than further out?',
          a: 'South Yarra offers a dense, well-off local market and steady foot traffic. The trade-off is higher rent and prices. We help you weigh that against similar businesses in other suburbs so you buy where the numbers work.',
        },
        {
          q: 'Can you help me buy a clinic or practice in South Yarra?',
          a: 'Yes. We help buyers assess allied health, beauty and professional practices, including how much revenue is tied to the current practitioners. Registration and licensing questions go to the relevant body and your lawyer.',
        },
        {
          q: 'Do I need an advisor to buy a small business?',
          a: 'You do not have to have one, but the seller’s broker works for the seller. Having your own advisor means someone is checking the numbers and negotiating only in your interest.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Glass office towers representing buy a business South Yarra with Blackmont Advisory',
    },
  },

  /* ── St Kilda ─────────────────────────────────────────────── */
  {
    slug: 'st-kilda',
    name: 'St Kilda',
    city: 'melbourne',
    nearby: ['south-yarra', 'port-melbourne', 'south-melbourne', 'richmond'],
    sell: {
      keyword: 'sell my business st kilda',
      title: 'Sell My Business St Kilda | Blackmont Advisory',
      description:
        'Asking “how do I sell my business in St Kilda?” Blackmont Advisory values and sells St Kilda cafés, venues and shops to serious buyers, confidentially.',
      h1: 'Sell My Business in St Kilda',
      intro:
        'Ready to sell your St Kilda business? We value it properly, prepare the figures buyers need and take it privately to serious buyers. Our Toorak office is a short drive away, and every sale is handled by one senior advisor.',
      points: [
        'Office a short drive away in Toorak',
        'A free first conversation, kept private',
        'You approve every buyer before they see details',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in St Kilda',
      overview: [
        'St Kilda runs on visitors as much as locals. Acland Street’s cake shops and cafes, the bars and restaurants on Fitzroy Street, the foreshore, Luna Park and the Palais Theatre all bring people in. Summer and event weekends can be very busy, and winter quieter.',
        'Buyers know this, and they will look closely at how steady your trade is through the year. A business with strong local regulars and good winter figures will usually attract more interest than one that relies on summer crowds alone.',
        'We present your business honestly, show buyers the full year, and focus on those who understand a beachside, tourist-driven market.',
      ],
      highlights: [
        'Cafes, bars, restaurants, retail and accommodation sales',
        'Buyers who understand seasonal trade',
        'Every buyer under a confidentiality agreement',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Tips for selling a St Kilda business',
      tipsIntro: 'Tips for selling a small business in Victoria, tailored to St Kilda’s seasonal market.',
      tips: [
        {
          title: 'Show the whole year',
          text: 'Give buyers month-by-month sales for at least two years. It shows how summer peaks and winter lows balance out, and stops buyers guessing at the worst case.',
        },
        {
          title: 'Prove your local trade',
          text: 'Loyalty data, regular bookings or local accounts show that your business does not live on tourists alone. That steadiness is worth money to a buyer.',
        },
        {
          title: 'Sort out permits and licences',
          text: 'Outdoor dining, liquor and late trading permits are a big part of value on Fitzroy Street and Acland Street. Check they are current and can transfer to a new owner.',
        },
        {
          title: 'Choose your timing',
          text: 'Buyers inspecting in late spring see the business warming up. Starting the sale before summer often means stronger recent figures and more confidence from buyers.',
        },
      ],
      faqs: [
        {
          q: 'When is the best time to sell my business in St Kilda?',
          a: 'Many owners start in spring, so buyers see strong trade and the latest figures look good. The right time also depends on your lease, your plans and the market, so we look at your situation before suggesting a timeline.',
        },
        {
          q: 'How much is my St Kilda cafe worth?',
          a: 'Value is based on reliable profit after paying a manager or the owner a fair wage, along with the lease and how seasonal the trade is. Start with our free calculator, then we can review your accounts.',
          link: { href: '/business-valuation', label: 'Use the valuation calculator' },
        },
        {
          q: 'Will buyers see my business name straight away?',
          a: 'No. We describe the business in general terms first. Buyers must sign a confidentiality agreement and be approved by you before they receive the information memorandum with your name, address and figures.',
        },
      ],
      imageAlt: 'Glass office towers representing sell my business St Kilda with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business st kilda',
      title: 'Buy a Business St Kilda | Blackmont Advisory',
      description:
        'Looking to buy a business in St Kilda? Blackmont Advisory checks seasonal trade, leases and permits, then negotiates for you. Tell us what you want.',
      h1: 'Buy a Business in St Kilda',
      intro:
        'Want to buy a business in St Kilda? We act for buyers only. We look past the busy summer weekends, test the trading figures and leases, and negotiate a fair price for you.',
      points: [
        'Buyer-only advice, no conflicts',
        'Seasonal trade tested, not assumed',
        'Off-market and listed businesses',
        'Support through to handover',
      ],
      overviewHeading: 'Buying a business in St Kilda',
      overview: [
        'St Kilda is one of Melbourne’s best-known hospitality and leisure areas. Acland Street, Fitzroy Street, Carlisle Street and the foreshore are full of cafes, bakeries, bars, restaurants and shops that serve locals, day-trippers and tourists.',
        'That mix brings opportunity, but also risk. Summer trade can be excellent, while winter can be slow. Some venues lean heavily on events and late-night trade, which come with their own permits and costs.',
        'We help you understand the true yearly picture and whether the business can carry its rent and wages through the quiet months, before you sign.',
      ],
      highlights: [
        'Advice that protects the buyer',
        'Hospitality, retail and leisure businesses',
        'Help for first time business buyers in Melbourne',
        'Due diligence alongside your accountant and lawyer',
      ],
      tipsHeading: 'Buying tips for St Kilda',
      tipsIntro: 'What we check with buyers before they commit to a St Kilda business.',
      tips: [
        {
          title: 'Ask for winter figures',
          text: 'A seller will happily show you January. Ask for the June and July numbers too, and make sure the business still covers rent and wages in those months.',
        },
        {
          title: 'Check outdoor and late-night permits',
          text: 'Footpath dining and late trading can make a big difference to takings. Confirm the permits are current, what conditions apply and whether they transfer to you.',
        },
        {
          title: 'Visit at different times',
          text: 'Walk past on a weekday morning, a wet afternoon and a summer Saturday. You will learn more about the real trade than from any sales report.',
        },
        {
          title: 'Look at staff and rosters',
          text: 'Seasonal businesses often rely on casual staff. Check award compliance, rosters and who will stay after settlement, so you are not short-staffed when summer comes.',
        },
      ],
      faqs: [
        {
          q: 'Is it a good idea to buy a business in St Kilda?',
          a: 'It can be, if the business has steady local trade as well as seasonal peaks, and the lease is fair. We help you judge both, so you are not paying for a summer that will not carry the whole year.',
        },
        {
          q: 'Can you help with financing a business purchase in Melbourne?',
          a: 'We are not lenders, but we prepare the information banks ask for and can introduce you to finance brokers. A clear valuation and solid due diligence usually make lending conversations easier.',
        },
        {
          q: 'How do you find St Kilda businesses that are not for sale?',
          a: 'We approach owners directly, without naming you, to ask whether they would consider an offer. Many good businesses change hands this way and never appear on a public listing.',
          link: { href: '/buying-a-business/melbourne', label: 'Buying a business in Melbourne' },
        },
      ],
      imageAlt: 'Glass office towers representing buy a business St Kilda with Blackmont Advisory',
    },
  },

  /* ── Fitzroy ──────────────────────────────────────────────── */
  {
    slug: 'fitzroy',
    name: 'Fitzroy',
    city: 'melbourne',
    nearby: ['brunswick', 'richmond', 'melbourne-cbd', 'docklands'],
    sell: {
      keyword: 'sell a business fitzroy',
      title: 'Sell a Business Fitzroy | Blackmont Advisory',
      description:
        'Ready to sell a business in Fitzroy? Blackmont Advisory sells Fitzroy cafés, bars, shops and studios to screened buyers, in full confidence. Talk to us.',
      h1: 'Sell a Business in Fitzroy',
      intro:
        'Selling a business in Fitzroy takes buyers who understand its character. We value your business, prepare clear figures and find buyers who will pay for what makes it different, all without going public.',
      points: [
        'Melbourne advisors, based in Toorak',
        'A private, no-cost first meeting',
        'Buyers vetted and under NDA',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Fitzroy',
      overview: [
        'Fitzroy is one of Melbourne’s oldest suburbs and one of its most distinctive places to trade. Brunswick Street, Gertrude Street and Smith Street are known for independent cafes, bars, restaurants, vintage and design stores, galleries and live music.',
        'Fitzroy businesses often sell on personality as much as profit. A strong brand, loyal locals and a good name in the street can be worth a lot, but only if a buyer can see that value will stay after you leave.',
        'We help you show buyers what drives your trade, document how the business runs, and reach people who want to keep its character rather than replace it.',
      ],
      highlights: [
        'Hospitality, retail, creative and design businesses',
        'Brand and reputation presented properly to buyers',
        'A business sale advisor Melbourne owners can trust',
        'Clear, written fees from day one',
      ],
      tipsHeading: 'Preparing a Fitzroy business for sale',
      tipsIntro: 'How Fitzroy owners can protect value before they go to market.',
      tips: [
        {
          title: 'Protect your brand',
          text: 'Make sure your trading name, logo, website and social accounts are owned by the business and can transfer. In Fitzroy the brand is often a big part of what a buyer pays for.',
        },
        {
          title: 'Write down the recipes and systems',
          text: 'Buyers worry that the magic leaves with the owner. Recipes, supplier lists, opening routines and staff guides show that the business can keep running the same way.',
        },
        {
          title: 'Check heritage and building issues',
          text: 'Many Fitzroy shops sit in older buildings. Know who is responsible for repairs under your lease, and flag any building or permit issues before a buyer finds them.',
        },
        {
          title: 'Show your live music or events income',
          text: 'If gigs, exhibitions or events bring in revenue, record it separately and show any permits that allow it. Buyers will want proof that this income can continue.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell a business in Fitzroy confidentially?',
          a: 'We advertise without your name or address, ask every buyer to sign a confidentiality agreement and let you approve each one before details are shared. In a small, connected suburb like Fitzroy, that control really matters.',
        },
        {
          q: 'Is my brand worth anything when I sell?',
          a: 'Often, yes. A recognised name, a loyal following and good reviews can support a higher price, as long as buyers can see the trade does not depend only on you. We help you present that value with evidence.',
        },
        {
          q: 'What are the steps to sell a small business?',
          a: 'A confidential first chat, a valuation, preparing the information memorandum, approaching buyers, negotiating offers and managing due diligence through to settlement. Our selling page walks through each step.',
          link: { href: '/selling-a-business', label: 'How we sell a business' },
        },
      ],
      imageAlt: 'Glass office towers representing sell a business Fitzroy with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business fitzroy',
      title: 'Buy a Business Fitzroy | Blackmont Advisory',
      description:
        'Want to buy a business in Fitzroy at a fair price? Blackmont Advisory finds and checks cafés, bars and shops, then negotiates for you. Send us your brief.',
      h1: 'Buy a Business in Fitzroy',
      intro:
        'Want to buy a business in Fitzroy? We work only for buyers. We find businesses that suit you, check whether the reputation is backed by real profit, and negotiate the terms on your behalf.',
      points: [
        'Advice for buyers only',
        'Off-market approaches to owners',
        'Profit tested, not just reputation',
        'One senior advisor throughout',
      ],
      overviewHeading: 'Buying a business in Fitzroy',
      overview: [
        'Fitzroy attracts buyers who want a business with a story. Brunswick Street, Gertrude Street and Smith Street offer cafes, wine bars, restaurants, record and vintage shops, galleries and design studios, many with a loyal local following.',
        'The challenge is separating a great reputation from a great business. Some well-loved venues run on thin margins or depend on an owner who is the face of the place. Others have solid systems and a team that will stay.',
        'We help you tell the difference, so you pay for income you can keep, not just a name you like.',
      ],
      highlights: [
        'Buyer-side checks on profit and owner reliance',
        'Hospitality, retail and creative businesses',
        'Advice on buying an existing business vs starting one',
        'Negotiation and due diligence managed for you',
      ],
      tipsHeading: 'Tips for buying a business in Fitzroy',
      tipsIntro: 'What we look for when a buyer is weighing up a Fitzroy business.',
      tips: [
        {
          title: 'Ask who the customers come for',
          text: 'If regulars come to see the owner, plan a longer handover or a staged payment. If they come for the product and the team, the business is easier to take over.',
        },
        {
          title: 'Check the brand is included',
          text: 'Make sure the name, website, social accounts and any trademarks are part of the sale. Without them, you may be buying a fit-out rather than a business.',
        },
        {
          title: 'Look closely at the building',
          text: 'Older Fitzroy buildings can bring repair costs. Read the lease to see who pays for what, and get advice if the premises need work to stay compliant.',
        },
        {
          title: 'Test the margins',
          text: 'Small, independent venues can be busy and still earn little. Check food, drink and wage costs against sales, so you know what you will actually take home.',
        },
      ],
      faqs: [
        {
          q: 'How do I buy a business in Fitzroy that is not listed?',
          a: 'Plenty of Fitzroy owners have never thought about selling until someone asks. We approach suitable businesses on your behalf, keep your identity private and bring you the owners who are open to a conversation.',
        },
        {
          q: 'Should I buy an existing business or start one in Fitzroy?',
          a: 'Buying gives you an established name and customers in a competitive area. Starting is cheaper but slower, and it takes time to win locals over. We help you compare the two with real numbers.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'What does due diligence involve for a small business?',
          a: 'Checking the financials, lease, licences, staff, suppliers and any legal issues before you commit. We coordinate it with your accountant and lawyer so nothing important is missed.',
        },
      ],
      imageAlt: 'Glass office towers representing buy a business Fitzroy with Blackmont Advisory',
    },
  },

  /* ── Brunswick ────────────────────────────────────────────── */
  {
    slug: 'brunswick',
    name: 'Brunswick',
    city: 'melbourne',
    nearby: ['fitzroy', 'melbourne-cbd', 'docklands', 'richmond'],
    sell: {
      keyword: 'sell my business brunswick',
      title: 'Sell My Business Brunswick | Blackmont Advisory',
      description:
        'Asking “how do I sell my business in Brunswick?” Blackmont Advisory values and sells Brunswick shops, makers and venues privately. Book a free chat.',
      h1: 'Sell My Business in Brunswick',
      intro:
        'Planning to sell your Brunswick business? We give you a realistic value, prepare it for buyers and take it to market privately. From Sydney Road shops to warehouse workshops, one senior advisor runs your sale from start to finish.',
      points: [
        'Melbourne-based, with an office in Toorak',
        'A confidential, no-cost first talk',
        'No buyer sees details without your approval',
        LICENCE,
      ],
      overviewHeading: 'Selling a business in Brunswick',
      overview: [
        'Brunswick mixes busy retail strips with working warehouses. Sydney Road is lined with grocers, bakeries, cafes, bridal and fashion shops, many reflecting the suburb’s Middle Eastern, Greek and Italian communities. Lygon Street in East Brunswick and the side streets add bars, venues and food businesses.',
        'Behind the main roads, old factories now house small manufacturers, makers, breweries, studios and trade businesses. These often appeal to different buyers from a Sydney Road shop, including operators looking to add production space or capability.',
        'We work out who your best buyers are and present your business in the terms they care about, whether that is foot traffic, equipment or contracts.',
      ],
      highlights: [
        'Retail, hospitality, maker and light industrial sales',
        'Equipment and premises presented clearly to buyers',
        'Trade buyers, operators and investors in our network',
        'Fees set out in writing before any work starts',
      ],
      tipsHeading: 'Getting your Brunswick business sale-ready',
      tipsIntro: 'Steps that help Brunswick owners get a cleaner sale and a better price.',
      tips: [
        {
          title: 'List your equipment',
          text: 'For workshops, breweries and makers, a clear list of plant and equipment, with age and condition, helps buyers value what they are getting and reduces haggling later.',
        },
        {
          title: 'Check zoning and permits',
          text: 'Brunswick has seen a lot of change as warehouses turn into homes. Make sure your use of the site is permitted and that your lease protects it for a new owner.',
        },
        {
          title: 'Separate wholesale and retail sales',
          text: 'Many Brunswick makers sell to shops and direct to customers. Show each income stream on its own, so buyers can see which parts of the business are growing.',
        },
        {
          title: 'Prepare for questions about change',
          text: 'Buyers may ask about new apartments, parking or roadworks on Sydney Road. Have honest answers ready about how these affect your trade and customers.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Brunswick if it is a small manufacturer?',
          a: 'We look at your equipment, contracts, customers and premises, then approach buyers who need what you make or the capability you have. That may be a competitor, a supplier or an investor rather than a first-time owner.',
        },
        {
          q: 'How long does it take to sell a business?',
          a: 'Many small business sales take several months from preparation to settlement. Time depends on how ready your records are, the type of buyer, and how long due diligence takes. Our guides explain the usual stages.',
          link: { href: '/resources/guides', label: 'Read our guides' },
        },
        {
          q: 'What will it cost me to sell my Brunswick business?',
          a: 'Our fee depends on the size and complexity of the sale and is agreed in writing before we start. You will know exactly what you are paying and when, before any marketing begins.',
        },
      ],
      imageAlt: 'Glass office towers representing sell my business Brunswick with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business brunswick',
      title: 'Buy a Business Brunswick | Blackmont Advisory',
      description:
        'Looking to buy a business in Brunswick? Blackmont Advisory searches, values and negotiates Brunswick shops, venues and workshops for you. Start today.',
      h1: 'Buy a Business in Brunswick',
      intro:
        'Want to buy a business in Brunswick? We act for you, not the seller. We search shops, venues and workshops across the suburb, check the earnings and the premises, and handle the negotiation through to settlement.',
      points: [
        'Independent buyer’s advisors',
        'Retail, hospitality and workshop businesses',
        'Premises and equipment checked',
        'Your accountant and lawyer kept in the loop',
      ],
      overviewHeading: 'Buying a business in Brunswick',
      overview: [
        'Brunswick gives buyers a wide range to choose from. Sydney Road has long-running grocers, bakeries, cafes and specialist retailers, while Lygon Street and the side streets add bars, music venues and food businesses with a younger crowd.',
        'In the converted warehouses and industrial pockets you will also find breweries, small manufacturers, makers and trade businesses. These can offer steadier customers and contracts, but they bring equipment, compliance and premises questions of their own.',
        'We help you understand what you are buying, what it will cost to keep running and whether the price is fair for the income it produces.',
      ],
      highlights: [
        'Advice that works only for the buyer',
        'Shops, venues, makers and light industrial businesses',
        'Help for first time business buyers in Melbourne',
        'Price and terms negotiated on your behalf',
      ],
      tipsHeading: 'Buying tips for Brunswick',
      tipsIntro: 'Points to check before you commit to a Brunswick business.',
      tips: [
        {
          title: 'Inspect the equipment',
          text: 'Old machines can be expensive to fix or replace. Get the equipment checked, ask for service records and factor any upgrades into your offer.',
        },
        {
          title: 'Confirm the site can keep operating',
          text: 'Brunswick’s industrial areas are changing. Check the zoning, permits and lease terms so you know the business can stay where it is for years to come.',
        },
        {
          title: 'Understand the customer mix',
          text: 'A maker that sells to a handful of shops carries more risk than one with many customers. Ask how much revenue comes from the top few accounts.',
        },
        {
          title: 'Talk to your lender early',
          text: 'Financing a business purchase in Melbourne is easier with clean records and a clear valuation. Line up your finance before you make an offer, so you can move quickly.',
        },
      ],
      faqs: [
        {
          q: 'What kinds of businesses can I buy in Brunswick?',
          a: 'Common options include cafes, bakeries, grocers, specialist retailers, bars and venues, plus breweries, makers and small manufacturers in the warehouse areas. We help you narrow the list to what suits your skills and budget.',
        },
        {
          q: 'Can you help me buy a business for an Australian business visa?',
          a: 'We can help you find and assess a business that fits your plans. Visa rules and requirements come from the Department of Home Affairs, so please confirm them with a registered migration agent before you commit.',
        },
        {
          q: 'How do you check a business before I buy it?',
          a: 'We review the financials, the lease, equipment, staff, suppliers and licences, and test whether the earnings support the price. We work with your accountant and lawyer so the checks are thorough.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
      ],
      imageAlt: 'Glass office towers representing buy a business Brunswick with Blackmont Advisory',
    },
  },
];
