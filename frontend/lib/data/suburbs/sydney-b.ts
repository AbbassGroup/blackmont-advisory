import type { SuburbEntry } from './types';

/**
 * Greater Sydney, part B: Parramatta, Inner West, Eastern Suburbs, Northern
 * Beaches, Sutherland Shire. Our office is in Toorak, Melbourne: NSW clients
 * are served by phone and video, in person when a deal needs it. FAQs open
 * with a direct answer for search and answer engines. No invented deals,
 * figures or postcodes.
 */

const REMOTE = 'We work with NSW clients by phone and video, and meet in person when a deal needs it.';

export const SYDNEY_B: SuburbEntry[] = [
  /* ── Parramatta ───────────────────────────────────────────── */
  {
    slug: 'parramatta',
    name: 'Parramatta',
    city: 'sydney',
    nearby: ['western-sydney', 'inner-west', 'north-sydney', 'sydney-cbd'],
    sell: {
      keyword: 'sell a business parramatta',
      keywords: ['business broker parramatta', 'sell my business parramatta', 'business sale advisor western sydney', 'parramatta business for sale'],
      title: 'Sell a Business in Parramatta, Sydney | Blackmont Advisory',
      description:
        'Selling a business in Parramatta? Blackmont Advisory values and sells Parramatta businesses confidentially, with one senior advisor and buyers Australia-wide.',
      h1: 'Sell a Business in Parramatta',
      intro:
        'Thinking of selling your Parramatta business? We value your business, prepare it for buyers and run a confidential sale, with one senior advisor from first call to settlement and buyers from across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from Sydney and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in Parramatta',
      overview: [
        'Parramatta is Sydney’s second CBD and the centre of the City of Parramatta. Parramatta Square, Church Street’s dining strip and Westfield Parramatta support professional firms, hospitality, retail and services for a large and growing population.',
        'The Westmead health precinct and Western Sydney University bring medical, allied health, education and research businesses, while commercial offices hold accounting, legal, engineering and government-facing firms.',
        `We prepare your sale around the buyers most likely to pay for it, from Sydney operators to interstate groups and investors, and keep it confidential throughout. ${REMOTE}`,
      ],
      highlights: [
        'Sales of professional, health, hospitality and service businesses',
        'Private investors, family offices and private equity in our network',
        'Buyers screened and approved by you before any detail is shared',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Parramatta business for sale',
      tipsIntro: 'What buyers ask Parramatta owners most often.',
      tips: [
        {
          title: 'Show recurring revenue',
          text: 'Retainers, contracts and repeat clients are worth more than one-off sales. Break your revenue down so buyers can see what repeats each year.',
        },
        {
          title: 'Reduce reliance on you',
          text: 'Bring senior staff into key client relationships and document how the business runs, so a buyer can step in with confidence.',
        },
        {
          title: 'Check your lease early',
          text: 'Parramatta is changing fast, with new towers and redevelopment. Confirm your lease term, options and any demolition or relocation clauses before buyers ask.',
        },
        {
          title: 'Organise your financials',
          text: 'Buyers and banks want three years of accounts that match tax returns and BAS, with personal and one-off costs clearly separated.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in Parramatta?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the price and terms and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Do you have an office in Parramatta?',
          a: 'No. Our office is in Melbourne. We work with Parramatta owners by phone and video and meet in person when a deal needs it, and we bring buyers from across Australia.',
        },
        {
          q: 'Can you sell a health or allied health business near Westmead?',
          a: 'Yes. We prepare health practices for sale, plan how practitioners and patients transfer, and work alongside your legal advisers on registration and regulatory steps.',
        },
        {
          q: 'What is my Parramatta business worth?',
          a: 'Most businesses are valued on a multiple of maintainable earnings, adjusted for risk, the lease and how much depends on the owner. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
      ],
      imageAlt: 'Sydney office buildings representing sell a business in Parramatta with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business parramatta',
      keywords: ['businesses for sale parramatta', 'parramatta business for sale', 'buy a business western sydney', 'buyers advisor sydney'],
      title: 'Buy a Business in Parramatta, Sydney | Blackmont Advisory',
      description:
        'Looking to buy a business in Parramatta? Blackmont Advisory finds listed and off-market businesses, checks the figures and negotiates the deal for you only.',
      h1: 'Buy a Business in Parramatta',
      intro:
        'Looking to buy a business in Parramatta? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in Parramatta',
      overview: [
        'Parramatta gives buyers access to Sydney’s second CBD and one of its fastest-growing populations. Church Street, Parramatta Square and Westfield Parramatta support hospitality, retail, professional and service businesses.',
        'The Westmead health precinct and Western Sydney University add demand for medical, allied health, education and support services, often with steady, recurring clients.',
        `We help you check what the business really earns, how much depends on the owner, and whether the lease suits a suburb that is still being redeveloped. ${REMOTE}`,
      ],
      highlights: [
        'Advice for the buyer only, with no seller to please',
        'Recent work includes an allied health business in Sydney, bought for a first-time owner',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in Parramatta',
      tipsIntro: 'Questions we ask on every Parramatta purchase.',
      tips: [
        {
          title: 'Check redevelopment risk',
          text: 'Parts of Parramatta are being rebuilt. Ask whether the site is affected by development, and check the lease for demolition or relocation clauses.',
        },
        {
          title: 'Test owner dependence',
          text: 'Find out how much revenue the owner personally brings in, and plan a handover that keeps those clients with the business.',
        },
        {
          title: 'Verify the figures',
          text: 'Ask for three years of accounts that match tax returns and BAS, and have your accountant review them before you commit.',
        },
        {
          title: 'Look at staff and wages',
          text: 'Confirm awards, entitlements and whether key staff plan to stay after the sale.',
        },
      ],
      faqs: [
        {
          q: 'How do I buy a business in Parramatta?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate the deal for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Have you helped buyers in Sydney?',
          a: 'Yes. Recent work includes an allied health business in Sydney, acquired for a first-time business owner.',
          link: { href: '/buying-a-business#recent-acquisitions', label: 'See recent acquisitions' },
        },
        {
          q: 'What businesses are for sale in Parramatta?',
          a: 'Common opportunities include restaurants and cafes, retail, health and allied health practices, professional services and trade businesses. We also approach owners off-market on your behalf.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'It is not required, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Sydney office buildings representing buy a business in Parramatta with Blackmont Advisory',
    },
  },

  /* ── Inner West ───────────────────────────────────────────── */
  {
    slug: 'inner-west',
    name: 'Inner West',
    city: 'sydney',
    nearby: ['surry-hills', 'alexandria', 'parramatta', 'pyrmont'],
    sell: {
      keyword: 'sell a business inner west sydney',
      keywords: ['business broker inner west', 'sell my business newtown', 'sell a cafe inner west sydney', 'inner west business for sale'],
      title: 'Sell a Business in Sydney’s Inner West | Blackmont Advisory',
      description:
        'Selling a business in Sydney’s Inner West? Blackmont Advisory sells hospitality, retail, creative and trade businesses confidentially to qualified buyers.',
      h1: 'Sell a Business in Sydney’s Inner West',
      intro:
        'Ready to sell your Inner West business? We value your business, prepare it for buyers and sell it privately, with one senior advisor and no public listing showing your name.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from Sydney and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in the Inner West',
      overview: [
        'The Inner West covers suburbs such as Newtown, Enmore, Marrickville, Leichhardt and Balmain. King Street, Enmore Road, Norton Street and Darling Street are known for independent cafes, restaurants, bars, boutiques and services.',
        'Marrickville and the surrounding light industrial streets hold breweries, food producers, makers, workshops and trade businesses, while studios and creative agencies are spread across the area.',
        `Buyers here often want a business with character and a loyal local following. We prepare your sale to show that value and keep it confidential throughout. ${REMOTE}`,
      ],
      highlights: [
        'Sales of hospitality, retail, creative, food and trade businesses',
        'Buyers screened and approved by you',
        'Private investors and acquisitive operators in our network',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing an Inner West business for sale',
      tipsIntro: 'Practical steps for Inner West owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show the loyal following',
          text: 'Independent venues trade on regulars. Repeat-customer, booking or membership figures help buyers see the value beyond the fit-out.',
        },
        {
          title: 'Check licences transfer',
          text: 'Liquor licences, food registrations and council approvals may need to be transferred or applied for again. Find out early.',
        },
        {
          title: 'Keep clear records of sales',
          text: 'Buyers and lenders only pay for income that appears in your accounts, tax returns and BAS.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Good Inner West sites are in demand. Check your lease term and options and raise assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in the Inner West?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a cafe, bar or brewery in the Inner West?',
          a: 'Yes. We prepare hospitality and food businesses for sale, including figures buyers can verify and a plan for transferring licences, staff and suppliers.',
        },
        {
          q: 'Can I sell my business without regulars finding out?',
          a: 'Yes. Buyers see an anonymous summary first, sign a confidentiality agreement and are approved by you before they learn the business name.',
        },
        {
          q: 'Do you have an office in Sydney?',
          a: 'No. Our office is in Melbourne. We work with Inner West owners by phone and video and meet in person when a deal needs it.',
        },
      ],
      imageAlt: 'Sydney office buildings representing sell a business in the Inner West with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business inner west sydney',
      keywords: ['businesses for sale inner west', 'buy a cafe newtown', 'inner west business for sale', 'buyers advisor sydney'],
      title: 'Buy a Business in Sydney’s Inner West | Blackmont Advisory',
      description:
        'Want to buy a business in Sydney’s Inner West? Blackmont Advisory finds cafes, retail and trade businesses, checks the numbers and negotiates for you only.',
      h1: 'Buy a Business in Sydney’s Inner West',
      intro:
        'Looking to buy a business in the Inner West? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in the Inner West',
      overview: [
        'The Inner West suits buyers who want an independent business with a loyal local market. King Street in Newtown, Norton Street in Leichhardt and Darling Street in Balmain are lined with cafes, restaurants, bars and boutiques.',
        'Marrickville’s industrial streets add breweries, food producers, workshops and trade businesses that sell to other businesses as well as locals.',
        `We help you look past the atmosphere to the numbers, and negotiate a price that reflects what the business really earns. ${REMOTE}`,
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, retail, food production and trade businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in the Inner West',
      tipsIntro: 'Tips we share with buyers looking in Sydney’s Inner West.',
      tips: [
        {
          title: 'Only pay for verified income',
          text: 'Base the price on sales shown in the accounts, tax returns and BAS, not on cash the seller says is unrecorded.',
        },
        {
          title: 'Confirm licences and approvals',
          text: 'Check which liquor, food and council approvals you must apply for, and make the sale conditional on getting them.',
        },
        {
          title: 'Test the owner’s role',
          text: 'If regulars come for the owner or a head chef, plan a handover and find out whether key staff will stay.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Work out rent as a share of sales and compare it with similar venues before you agree a price.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale in the Inner West?',
          a: 'Common opportunities include cafes, restaurants and bars, boutiques, breweries and food producers, creative studios and trade businesses. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in the Inner West?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I take over a liquor licence when I buy a venue?',
          a: 'Usually a licence can be transferred, but it needs approval from the NSW regulator. Your lawyer handles the application and we build the timing into the deal.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Sydney office buildings representing buy a business in the Inner West with Blackmont Advisory',
    },
  },

  /* ── Eastern Suburbs ──────────────────────────────────────── */
  {
    slug: 'eastern-suburbs',
    name: 'Eastern Suburbs',
    city: 'sydney',
    nearby: ['surry-hills', 'sydney-cbd', 'sutherland-shire', 'alexandria'],
    sell: {
      keyword: 'sell a business eastern suburbs sydney',
      keywords: ['business broker eastern suburbs', 'sell my business bondi', 'sell a business double bay', 'eastern suburbs business for sale'],
      title: 'Sell a Business Eastern Suburbs Sydney | Blackmont Advisory',
      description:
        'Selling a business in Sydney’s Eastern Suburbs? Blackmont Advisory values and sells Bondi, Paddington and Double Bay businesses confidentially, end to end.',
      h1: 'Sell a Business in Sydney’s Eastern Suburbs',
      intro:
        'Thinking of selling your Eastern Suburbs business? We value your business, prepare it for buyers and run a discreet sale, with one senior advisor and buyers from across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from Sydney and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in the Eastern Suburbs',
      overview: [
        'Sydney’s Eastern Suburbs take in Bondi Junction, Bondi Beach, Paddington, Double Bay, Randwick and Coogee, across the Waverley, Woollahra and Randwick council areas. Oxford Street, Bay Street and Westfield Bondi Junction carry fashion, beauty, hospitality and lifestyle brands.',
        'The area also has a deep base of medical, dental, allied health and wellness practices, helped by the Randwick health and education precinct around UNSW and the Prince of Wales Hospital, plus boutique professional firms.',
        `Clients here are well off and loyal, and owners usually want a quiet sale. We prepare your business for the right buyers and keep the process private. ${REMOTE}`,
      ],
      highlights: [
        'Sales of health, beauty, hospitality, retail and professional businesses',
        'Private investors, family offices and private equity in our network',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing an Eastern Suburbs business for sale',
      tipsIntro: 'What we tell Eastern Suburbs owners before they go to market.',
      tips: [
        {
          title: 'Show that clients stay',
          text: 'Clinics, salons and studios sell on loyal clients. Pull together retention and repeat-booking figures, and plan how you will introduce the new owner.',
        },
        {
          title: 'Document practitioner arrangements',
          text: 'If practitioners work as contractors or under service agreements, make sure the paperwork is in order and buyers can see who will stay.',
        },
        {
          title: 'Plan for seasonality',
          text: 'Beachside trade can rise in summer. Show monthly figures for a full year so buyers see the whole cycle.',
        },
        {
          title: 'Check your lease',
          text: 'Prime Bondi, Paddington and Double Bay sites are hard to replace. Confirm your term and options and talk to your landlord early.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in the Eastern Suburbs confidentially?',
          a: 'We describe your business without its name or address. Buyers sign a confidentiality agreement and you approve each one before they see any detail.',
        },
        {
          q: 'Can you sell a medical or allied health practice in Randwick or Bondi?',
          a: 'Yes. We prepare the practice for sale, find suitable buyers and negotiate the deal. Registration and regulatory steps are handled with your own advisers.',
        },
        {
          q: 'How much does it cost to sell a business?',
          a: 'Fees depend on the size and complexity of the sale. We agree them in writing before we start, so there are no surprises at settlement.',
          link: { href: '/business-brokers#fees', label: 'Business broker fees explained' },
        },
        {
          q: 'Do you have an office in Sydney?',
          a: 'No. Our office is in Melbourne. We work with Eastern Suburbs owners by phone and video and meet in person when a deal needs it.',
        },
      ],
      imageAlt: 'Sydney office buildings representing sell a business in the Eastern Suburbs with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business eastern suburbs sydney',
      keywords: ['businesses for sale eastern suburbs', 'buy a business bondi', 'eastern suburbs business for sale', 'buyers advisor sydney'],
      title: 'Buy a Business Eastern Suburbs Sydney | Blackmont Advisory',
      description:
        'Looking to buy a business in Sydney’s Eastern Suburbs? Blackmont Advisory finds clinics, cafes and retail businesses and negotiates the deal for you only.',
      h1: 'Buy a Business in Sydney’s Eastern Suburbs',
      intro:
        'Looking to buy a business in the Eastern Suburbs? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in the Eastern Suburbs',
      overview: [
        'The Eastern Suburbs offer buyers a well-off, loyal customer base. Bondi Junction, Bondi Beach, Paddington, Double Bay and Coogee support cafes, restaurants, boutiques, beauty and wellness businesses.',
        'Health is a major sector, with clinics and allied health practices across the area and the Randwick precinct around UNSW and the Prince of Wales Hospital.',
        `Prices reflect the location, so the margin for error is small. We help you test what the business earns and how much depends on the owner. ${REMOTE}`,
      ],
      highlights: [
        'Advice for the buyer only',
        'Recent work includes an allied health business in Sydney, bought for a first-time owner',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in the Eastern Suburbs',
      tipsIntro: 'Questions we ask on every Eastern Suburbs purchase.',
      tips: [
        {
          title: 'Check practitioner commitments',
          text: 'In clinics, find out which practitioners will stay, on what terms, and how much revenue each one brings in.',
        },
        {
          title: 'Compare rent with turnover',
          text: 'Eastern Suburbs rents are high. Work out rent as a share of sales and compare it with similar businesses.',
        },
        {
          title: 'Look at a full year of trade',
          text: 'Beachside businesses can be seasonal. Ask for monthly figures across at least a year.',
        },
        {
          title: 'Plan the handover',
          text: 'If clients follow the owner, agree a handover period and consider linking part of the price to results.',
        },
      ],
      faqs: [
        {
          q: 'Can you help me buy a health practice in the Eastern Suburbs?',
          a: 'Yes. We help you assess practitioners, patient retention and the lease, and negotiate the deal. Recent work includes an allied health business in Sydney bought for a first-time owner.',
          link: { href: '/buying-a-business#recent-acquisitions', label: 'See recent acquisitions' },
        },
        {
          q: 'What businesses are for sale in the Eastern Suburbs?',
          a: 'Common opportunities include clinics and allied health practices, beauty and wellness, cafes and restaurants, boutiques and professional services. Many sell privately, so we also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in the Eastern Suburbs?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Do I need my own advisor to buy?',
          a: 'You do not have to, but the seller’s broker works for the seller. Your own advisor negotiates only in your interest.',
        },
      ],
      imageAlt: 'Sydney office buildings representing buy a business in the Eastern Suburbs with Blackmont Advisory',
    },
  },

  /* ── Northern Beaches ─────────────────────────────────────── */
  {
    slug: 'northern-beaches',
    name: 'Northern Beaches',
    city: 'sydney',
    nearby: ['north-sydney', 'sydney-cbd', 'central-coast', 'eastern-suburbs'],
    sell: {
      keyword: 'sell a business northern beaches',
      keywords: ['business broker northern beaches', 'sell my business manly', 'sell a business brookvale', 'northern beaches business for sale'],
      title: 'Sell a Business Northern Beaches Sydney | Blackmont Advisory',
      description:
        'Selling a business on Sydney’s Northern Beaches? Blackmont Advisory sells Manly, Dee Why and Brookvale businesses confidentially with one senior advisor.',
      h1: 'Sell a Business on the Northern Beaches',
      intro:
        'Planning to sell your Northern Beaches business? We value your business, prepare it for buyers and run a confidential sale, with one senior advisor and buyers from across Australia.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from Sydney and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business on the Northern Beaches',
      overview: [
        'The Northern Beaches, governed by Northern Beaches Council, run from Manly to Palm Beach. The Corso in Manly, Dee Why, Mona Vale and Warringah Mall support hospitality, retail, health, fitness and lifestyle businesses.',
        'Brookvale is the area’s main industrial and commercial hub, with trade suppliers, manufacturers, breweries, automotive and service businesses. Trades, building and marine businesses work across the peninsula.',
        `Many buyers want the Northern Beaches lifestyle as well as the business. We prepare your sale for local and interstate buyers and keep it confidential. ${REMOTE}`,
      ],
      highlights: [
        'Sales of hospitality, health, trade, marine and retail businesses',
        'Recent Australian deals in trade services and transport',
        'Buyers screened and approved by you',
        'A clear fee, agreed in writing upfront',
      ],
      tipsHeading: 'Preparing a Northern Beaches business for sale',
      tipsIntro: 'Practical steps for Northern Beaches owners before going to market.',
      tips: [
        {
          title: 'Show a full year of trade',
          text: 'Beachside hospitality and retail can peak in summer. Present monthly figures across a year so buyers see the whole picture.',
        },
        {
          title: 'Document jobs and systems',
          text: 'For trade and service businesses, a clear job pipeline, quoting process and team structure show the business runs without you on every site.',
        },
        {
          title: 'List equipment and vehicles',
          text: 'Keep a register of vans, tools, boats or machinery with their condition and finance owing.',
        },
        {
          title: 'Check your lease',
          text: 'Confirm your remaining term and options and raise assignment with your landlord before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business on the Northern Beaches?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA, negotiate the deal and manage it through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell a trade or industrial business in Brookvale?',
          a: 'Yes. We sell trade, manufacturing, automotive and supply businesses, including preparing asset registers and plans for transferring customers and staff.',
        },
        {
          q: 'What is my Northern Beaches business worth?',
          a: 'Value depends mainly on reliable earnings, seasonality, the lease and how much depends on you. We start with a realistic appraisal based on your figures.',
          link: { href: '/business-valuation', label: 'Get a business valuation' },
        },
        {
          q: 'Do you have an office on the Northern Beaches?',
          a: 'No. Our office is in Melbourne. We work with Northern Beaches owners by phone and video and meet in person when a deal needs it.',
        },
      ],
      imageAlt: 'Sydney office buildings representing sell a business on the Northern Beaches with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business northern beaches',
      keywords: ['businesses for sale northern beaches', 'buy a business manly', 'northern beaches business for sale', 'buyers advisor sydney'],
      title: 'Buy a Business Northern Beaches Sydney | Blackmont Advisory',
      description:
        'Want to buy a business on Sydney’s Northern Beaches? Blackmont Advisory finds lifestyle, trade and hospitality businesses and negotiates the deal for you.',
      h1: 'Buy a Business on the Northern Beaches',
      intro:
        'Looking to buy a business on the Northern Beaches? We act only for buyers. We find suitable businesses, review the figures with you and negotiate the price and terms through to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business on the Northern Beaches',
      overview: [
        'The Northern Beaches attract buyers who want a lifestyle as well as an income. Manly, Dee Why, Mona Vale and Warringah Mall support cafes, restaurants, fitness, health and retail businesses.',
        'Brookvale’s industrial area offers trade supply, manufacturing, automotive and brewing businesses, and trades and marine services work right across the peninsula.',
        `A great location does not guarantee profit. We help you test the figures, the seasonality and the owner’s role before you commit. ${REMOTE}`,
      ],
      highlights: [
        'Advice for the buyer only',
        'Hospitality, health, trade and marine businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy on the Northern Beaches',
      tipsIntro: 'Tips we share with buyers looking on the Northern Beaches.',
      tips: [
        {
          title: 'Look at winter as well as summer',
          text: 'Ask for monthly figures across at least a year so peak-season trade does not hide quieter months.',
        },
        {
          title: 'Inspect equipment and vehicles',
          text: 'Have vans, boats and machinery inspected, and factor upcoming replacements into your offer.',
        },
        {
          title: 'Check customer concentration',
          text: 'For trade businesses, find out how much work comes from a few builders or contracts.',
        },
        {
          title: 'Review the lease',
          text: 'Make sure the lease can be assigned and leaves enough term to recover your investment.',
        },
      ],
      faqs: [
        {
          q: 'What businesses are for sale on the Northern Beaches?',
          a: 'Common opportunities include cafes and restaurants, fitness and health, retail, trades, marine services and Brookvale industrial businesses. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business on the Northern Beaches?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Is a lifestyle business a good investment?',
          a: 'It can be, if the price matches verified earnings and the business does not depend too heavily on the current owner. We help you test both.',
        },
        {
          q: 'Why use a buyer’s advisor?',
          a: 'The seller’s broker works for the seller. A buyer’s advisor checks the figures, flags the risks and negotiates only for you.',
        },
      ],
      imageAlt: 'Sydney office buildings representing buy a business on the Northern Beaches with Blackmont Advisory',
    },
  },

  /* ── Sutherland Shire ─────────────────────────────────────── */
  {
    slug: 'sutherland-shire',
    name: 'Sutherland Shire',
    city: 'sydney',
    nearby: ['wollongong', 'eastern-suburbs', 'alexandria', 'inner-west'],
    sell: {
      keyword: 'sell a business sutherland shire',
      keywords: ['business broker sutherland shire', 'sell my business cronulla', 'sell a business caringbah', 'sutherland shire business for sale'],
      title: 'Sell a Business Sutherland Shire | Blackmont Advisory',
      description:
        'Selling a business in the Sutherland Shire? Blackmont Advisory sells Cronulla, Miranda and Caringbah businesses confidentially to buyers Australia-wide.',
      h1: 'Sell a Business in the Sutherland Shire',
      intro:
        'Thinking of selling your Sutherland Shire business? We value your business, prepare it for buyers and sell it privately, with one senior advisor and no public listing showing your name.',
      points: [
        'One senior advisor from start to settlement',
        'Buyers from Sydney and across Australia',
        'Every buyer under NDA and approved by you',
        'A confidential first conversation',
      ],
      overviewHeading: 'Selling a business in the Sutherland Shire',
      overview: [
        'The Sutherland Shire, in Sydney’s south, has a strong local identity. Cronulla’s beachfront, Westfield Miranda and the centres at Sutherland, Engadine and Menai support hospitality, retail, health and services.',
        'Caringbah, Taren Point and Kirrawee hold the Shire’s industrial and commercial businesses: trade suppliers, manufacturers, automotive, marine and building services that work across southern Sydney.',
        `Shire buyers are often local owner-operators. We prepare your sale for them and for interstate buyers, and keep it confidential throughout. ${REMOTE}`,
      ],
      highlights: [
        'Sales of trade, marine, health, hospitality and retail businesses',
        'Recent Australian deals in trade services and transport',
        'Buyers screened and approved by you',
        'Fees agreed in writing before we start',
      ],
      tipsHeading: 'Preparing a Sutherland Shire business for sale',
      tipsIntro: 'Tips for Shire owners, from the questions buyers ask most.',
      tips: [
        {
          title: 'Show it runs without you',
          text: 'Document how jobs are quoted, scheduled and completed, and who looks after key customers, so a buyer can step in.',
        },
        {
          title: 'List your equipment',
          text: 'Keep a register of vehicles, boats, tools and machinery with their condition, service history and finance owing.',
        },
        {
          title: 'Clean up the financials',
          text: 'Buyers want three years of accounts that match tax returns and BAS, with personal and one-off costs separated.',
        },
        {
          title: 'Talk to your landlord early',
          text: 'Check your lease term and options and raise assignment before buyers ask.',
        },
      ],
      faqs: [
        {
          q: 'How do I sell my business in the Sutherland Shire?',
          a: 'Start with a confidential conversation and a realistic valuation. We prepare the business, approach qualified buyers under NDA and manage the sale through to settlement.',
          link: { href: '/selling-a-business#how-we-work', label: 'See our sale process' },
        },
        {
          q: 'Can you sell an industrial business in Taren Point or Caringbah?',
          a: 'Yes. We sell trade, manufacturing, automotive and marine businesses, including asset registers and plans for transferring customers and staff.',
        },
        {
          q: 'How long does it take to sell a business?',
          a: 'Most sales take several months from preparation to settlement. The lease, the buyer’s finance and how well the business is prepared make the biggest difference.',
        },
        {
          q: 'Do you have an office in the Shire?',
          a: 'No. Our office is in Melbourne. We work with Shire owners by phone and video and meet in person when a deal needs it.',
        },
      ],
      imageAlt: 'Sydney office buildings representing sell a business in the Sutherland Shire with Blackmont Advisory',
    },
    buy: {
      keyword: 'buy a business sutherland shire',
      keywords: ['businesses for sale sutherland shire', 'buy a business cronulla', 'sutherland shire business for sale', 'buyers advisor sydney'],
      title: 'Buy a Business Sutherland Shire | Blackmont Advisory',
      description:
        'Looking to buy a business in the Sutherland Shire? Blackmont Advisory finds Cronulla, Miranda and Caringbah businesses and negotiates the deal for you only.',
      h1: 'Buy a Business in the Sutherland Shire',
      intro:
        'Looking to buy a business in the Sutherland Shire? We act only for buyers. We find suitable businesses, test the figures with you and negotiate the price and terms from first look to settlement.',
      points: [
        'Buyer’s advice only',
        'Listed and off-market businesses',
        'Figures checked before you commit',
        'One senior advisor for the whole purchase',
      ],
      overviewHeading: 'Buying a business in the Sutherland Shire',
      overview: [
        'The Sutherland Shire offers buyers a loyal, family-focused market. Cronulla, Miranda, Sutherland and Engadine support cafes, restaurants, retail, health and services.',
        'Caringbah, Taren Point and Kirrawee add trade supply, manufacturing, automotive and marine businesses that serve customers across southern Sydney.',
        `We help you check what the business really earns, how secure its customers are, and whether the price is fair. ${REMOTE}`,
      ],
      highlights: [
        'Advice for the buyer only',
        'Trade, marine, health and hospitality businesses',
        'Help with financing a business purchase',
        'Due diligence with your accountant and lawyer',
      ],
      tipsHeading: 'What to check before you buy in the Sutherland Shire',
      tipsIntro: 'Questions we ask on every Shire purchase.',
      tips: [
        {
          title: 'Check customer concentration',
          text: 'Find out how much revenue comes from a few customers or builders, and whether those relationships will stay.',
        },
        {
          title: 'Inspect assets',
          text: 'Have vehicles, boats and machinery inspected and valued, and factor upcoming replacements into your offer.',
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
          q: 'What businesses are for sale in the Sutherland Shire?',
          a: 'Common opportunities include cafes and restaurants, retail, health practices, trades, marine services and industrial businesses in Caringbah and Taren Point. We also approach owners off-market.',
        },
        {
          q: 'How do I buy a business in the Sutherland Shire?',
          a: 'Share your brief and budget. We search listed and off-market businesses, review the figures, run due diligence with your advisers and negotiate for you.',
          link: { href: '/buying-a-business', label: 'How we help buyers' },
        },
        {
          q: 'Can I get finance to buy a business?',
          a: 'Often, yes. Lenders look at verified earnings, your experience and security. We help prepare what they need and can structure vendor finance where it suits.',
        },
        {
          q: 'Do I need a buyer’s advisor?',
          a: 'No, but the seller’s broker works for the seller. Your own advisor checks the numbers and negotiates only in your interest.',
        },
      ],
      imageAlt: 'Sydney office buildings representing buy a business in the Sutherland Shire with Blackmont Advisory',
    },
  },
];
