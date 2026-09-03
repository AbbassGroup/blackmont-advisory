export const CONTENT_UPDATED = '2026-09-01';

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface BuyerCheck {
  label: string;
  detail: string;
}

export interface IndustryPage {
  slug: string;
  h1: string;
  pageTitle: string;
  metaDescription: string;
  covers: string;
  heroNote: string;
  intro: string;
  insightAside: string;
  timing: string;
  driverDetail: string[];
  transfer: { heading: string; body: string[] };
  buyerChecks: BuyerCheck[];
  faqs: IndustryFaq[];
  reviewed: boolean;
}

export interface IndustryBenchmark {
  name: string;
  multi: string;
  price: string;
  days: string;
  demand: string;
  demandCol: string;
  drivers: string[];
  insight: string;
  page?: IndustryPage;
}

export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  {
    name: 'Café / Restaurant',
    multi: '0.8× - 1.5×',
    price: '$150k–$500k',
    days: '90–150 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Location & foot traffic',
      'Rent as % of revenue',
      'Weekly trading turnover',
      'Chef / staff dependency',
      'Lease terms & length',
    ],
    insight:
      'Cafés sell quickly when located in high-foot-traffic areas. Buyers scrutinise rent as a percentage of revenue, ideally under 10%. Owner-operated venues with well-trained staff and no single chef dependency command a meaningful premium.',
    page: {
      slug: 'cafe-or-restaurant',
      h1: 'Selling a Café or Restaurant in Australia',
      pageTitle: 'Selling a Café or Restaurant in Australia',
      metaDescription:
        'What do cafés and restaurants sell for in Australia? Typical multiples, price ranges, time to sell, and what buyers check before making an offer.',
      covers: 'café and restaurant',
      heroNote:
        'If you run a café, restaurant, bar or similar hospitality venue, this page covers what yours is likely worth, what buyers check before making an offer, and what tends to move the number up or down.',
      intro:
        'Cafés and restaurants typically sell for 0.8× to 1.5× EBITDA, most often between $150,000 and $500,000, and take around 90 to 150 days to find a buyer. More than in any other sector, the lease decides the outcome.',
      insightAside:
        'Two cafés with identical takings can sell for very different numbers. The one with six years of secure tenure and rent at 8% of revenue will find a buyer quickly. The one on a month-to-month arrangement at 15% may not sell at all.',
      timing:
        'Ninety to one hundred and fifty days is slower than trades but faster than manufacturing. The delay is rarely the buyer. It is usually the landlord, because the lease has to be assigned or a new one negotiated before settlement, and that sits outside the control of both parties. Starting the landlord conversation early is the single best thing you can do for your timeline.',
      driverDetail: [
        'Passing trade is the asset. Buyers will sit outside and count people, look at the surrounding tenancies, and note what is opening or closing nearby. A venue that depends on destination customers rather than foot traffic is a harder sell, because the buyer is betting they can hold on to a following that may belong to you personally.',
        'This is the number buyers calculate first. Under 10% of revenue is healthy and supports your price. Between 10% and 15% narrows the buyer pool. Above 15% and most buyers walk, because there is nothing left for a wage or a profit once the landlord is paid.',
        'Buyers want consistent weekly takings backed by POS reports, not one good month. They will look at the split between weekday and weekend, morning and evening, dine-in and takeaway. Revenue concentrated into two busy days is treated as more fragile than the same total spread evenly.',
        'A venue that only works because of one chef is a risk rather than a business. If the menu, the prep and the quality all sit with a single person who may not stay, buyers discount heavily. Documented recipes, a trained second and a stable team are worth real money here.',
        'The lease is usually worth more than the equipment. Buyers want three to five years of secure tenure at minimum, either remaining term or options to renew. A lease expiring within twelve months with no option is the most common reason a profitable café fails to sell.',
      ],
      transfer: {
        heading: 'Lease assignment, registration and licences',
        body: [
          'The lease is the transaction. Most café sales are structured as an assignment of the existing lease, and that assignment needs the landlord to consent. A landlord can ask for financial information about the buyer, personal guarantees or a bank guarantee, and in practice holds a veto over your sale.',
          'Food businesses must be registered with the local council, and that registration does not automatically pass to a new owner. The buyer generally applies in their own name, which is also the point at which any unresolved issues from your last inspection surface.',
          'If you hold a liquor licence it transfers through the state regulator rather than with the business, and the buyer has to be approved before they can trade. That process takes time and should be started well ahead of settlement. Requirements differ by state, administered by bodies such as Liquor Control Victoria and Liquor & Gaming NSW.',
        ],
      },
      buyerChecks: [
        {
          label: 'Lease term and options',
          detail:
            'How many years are secure, and whether the landlord will consent to an assignment. Buyers often ask this before they ask about profit.',
        },
        {
          label: 'Rent as a percentage of revenue',
          detail:
            'Calculated from your own figures on the spot. Under 10% supports your price; above 15% usually ends the conversation.',
        },
        {
          label: 'POS and accounting records that reconcile',
          detail:
            'Takings described verbally but not visible in the numbers are worth nothing to a buyer. Cash-heavy operations sell at a discount for exactly this reason.',
        },
        {
          label: 'Staff and chef retention',
          detail:
            'Who is staying, what they are paid, and whether the kitchen can run without you or your head chef.',
        },
        {
          label: 'Equipment condition and food safety history',
          detail:
            'Age and service history of refrigeration and cooking equipment, plus your council inspection record.',
        },
      ],
      faqs: [
        {
          q: 'Is my café worth a multiple of weekly takings?',
          a: 'It is a rule of thumb the market still uses, but buyers and their financiers price on profit. A venue with strong takings and no margin left after rent and wages will not attract the price a takings multiple suggests.',
        },
        {
          q: 'My lease expires in a year. Should I renew before selling?',
          a: 'Almost always yes. Negotiating a renewal or an option before going to market usually adds more to the sale price than it costs in rent, and it removes the single biggest reason café sales collapse.',
        },
        {
          q: 'Do I have to tell my staff we are selling?',
          a: 'Not at the outset. Café sales are run confidentially, and staff are generally told once a buyer is under contract and the conditions are close to satisfied.',
        },
        {
          q: 'Should I renovate before I sell?',
          a: 'A deep clean, working equipment and tidy presentation pay for themselves. A full refit rarely does. Buyers price on profit and lease first, then adjust for what they expect to spend.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Trade Services',
    multi: '2× - 4.5×',
    price: '$200k–$1m',
    days: '60–90 days',
    demand: 'Very High',
    demandCol: '#166534',
    drivers: [
      'Licenced staff & subcontractors',
      'Recurring commercial clients',
      'Equipment & vehicle value',
      'Online reputation & reviews',
      'Geographic territory',
    ],
    insight:
      'Trade businesses (plumbing, electrical, HVAC, pest control) are among the most sought-after SMEs in Australia. Recurring commercial maintenance contracts and licenced employees dramatically increase both value and the speed of sale.',
    page: {
      slug: 'trades-business',
      h1: 'Selling a Trades Business in Australia',
      pageTitle: 'Selling a Trades Business in Australia',
      metaDescription:
        'What do plumbing, electrical and HVAC businesses sell for in Australia? Typical multiples, price ranges, time to sell, and what buyers pay a premium for.',
      covers: 'plumbing, electrical, HVAC, pest control and similar',
      heroNote:
        'If you own a plumbing, electrical, HVAC or pest control business, this page covers what yours is likely worth, what buyers will scrutinise, and what tends to move the number up or down.',
      intro:
        'Trades businesses are among the most in-demand SMEs in Australia. Most sell for 2× to 4.5× EBITDA, typically landing between $200,000 and $1 million, and they move faster than almost any other sector, usually 60 to 90 days from listing to offer.',
      insightAside:
        'A plumbing business doing $300,000 EBITDA is a different proposition to one doing $1.5 million. It is not simply five times bigger, it sits in a genuinely different multiple band. This is the single thing owners most often underestimate.',
      timing:
        'Sixty to ninety days is fast. Manufacturing businesses average 120–240 days and childcare centres similar. Trades move quickly because the buyer pool is deep: other trade businesses acquiring for growth, licenced tradespeople stepping up to ownership, and increasingly private equity rolling up multiple operators across a region. Add three to six months of preparation ahead of that if your financials are not already clean.',
      driverDetail: [
        'This is the first question a buyer asks. A business where the owner holds the only licence is a materially harder sale than one with licenced employees who intend to stay on. Subcontractor arrangements are scrutinised too. Buyers want to know whether the people doing the work are genuinely contractors or effectively employees.',
        'Maintenance contracts with strata managers, facility managers or commercial landlords are worth far more than the same revenue earned one job at a time. Contracted, repeatable revenue is the strongest single lever on your multiple, and the difference between the bottom and the top of the 2×–4.5× range is usually found here.',
        'Vehicles, plant and tooling form a real asset base underneath the sale price. Buyers will want a current asset register with ages, condition and any finance still owing against them. Well-maintained, recently replaced fleet supports the price; ageing vehicles become a negotiating point.',
        'For trades specifically, Google reviews function as the marketing asset. A long history of strong reviews attached to the business name transfers to a buyer. Reviews attached to your personal name do not, and neither does a referral network that lives only in your phone.',
        'A defined, defensible service area with established referral relationships is worth more than the same revenue scattered thinly across a metro area. Buyers are assessing how efficiently the work can be run and whether the territory can absorb more volume without more overhead.',
      ],
      transfer: {
        heading: 'Licences and transfer',
        body: [
          'In Australia, trade licences are generally held by individuals rather than businesses. A buyer cannot simply purchase your company and inherit your plumbing or electrical licence.',
          'That means a buyer must either hold the relevant licence themselves or employ someone who does as nominated supervisor. It narrows the buyer pool, and it is precisely why businesses with licenced employees already on staff sell faster and for more. The buyer does not need to solve that problem before they can trade.',
          'Requirements differ by state, administered by bodies such as the VBA in Victoria, NSW Fair Trading and the QBCC in Queensland. It is worth confirming your own licensing position early, because it shapes who can realistically buy you.',
        ],
      },
      buyerChecks: [
        {
          label: 'Three years of accountant-prepared financials',
          detail:
            'Cash-based or informal records will cost you a discount, or end the deal outright.',
        },
        {
          label: 'Customer concentration',
          detail:
            'If one commercial client is more than 40% of revenue, buyers treat that as a serious risk. Under 20% is where you want to be.',
        },
        {
          label: 'Owner dependency',
          detail:
            'Can the business run without you for a month? If every quote and every key relationship goes through you, the buyer is purchasing a job rather than a business.',
        },
        {
          label: 'Team stability',
          detail:
            'Licenced staff intending to stay after the sale is a major value driver, and buyers will ask them directly.',
        },
        {
          label: 'Documented processes',
          detail:
            'Job workflows, quoting, safety and compliance, written down rather than held in your head.',
        },
      ],
      faqs: [
        {
          q: "Can I sell if I'm the only licenced person?",
          a: 'Yes, but it narrows your buyer pool to licence holders and usually means a longer handover. Bringing a licenced employee in ahead of a sale materially improves both price and speed.',
        },
        {
          q: 'Do my vehicles and tools count on top of the sale price?',
          a: 'Usually they sit inside it rather than on top. How that is structured is negotiable and worth settling early, particularly where finance is still owing.',
        },
        {
          q: 'Should I sell before or after winning a big contract?',
          a: 'After, and once it has had time to show in the numbers. A signed maintenance contract with trading history behind it is worth considerably more than one just won.',
        },
        {
          q: 'What if I want to stay on for a while?',
          a: 'Common in trades and often welcomed. A three to twelve month handover, sometimes with a small earn-out, reassures buyers and can lift the price.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Retail (Non-food)',
    multi: '1× - 2×',
    price: '$80k–$400k',
    days: '60–120 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Lease length & location quality',
      'Stock value at completion',
      'Gross margin percentage',
      'E-commerce presence',
      'Branded vs. generic product range',
    ],
    insight:
      'Retail businesses face ongoing headwinds from online competition. Businesses with a strong e-commerce channel, niche positioning, or premium brand alignment command higher multiples. Lease length is the single most critical factor for buyers.',
    page: {
      slug: 'retail-business',
      h1: 'Selling a Retail Business in Australia',
      pageTitle: 'Selling a Retail Business in Australia',
      metaDescription:
        'What do Australian retail shops sell for? Typical multiples, price ranges, time to sell, and how your lease and stock affect what a buyer will pay.',
      covers: 'retail',
      heroNote:
        'If you own a retail shop, this page covers what yours is likely worth, how your lease and stock affect the number, and what buyers examine before they make an offer.',
      intro:
        'Retail businesses sell for 1× to 2× EBITDA, most often between $80,000 and $400,000, and take around 60 to 120 days. The multiples are the lowest of any sector we cover, and the lease is the single largest factor in whether a sale happens at all.',
      insightAside:
        'The reason retail sits at the bottom of the multiple range is that buyers are pricing in structural pressure from online competition. Retailers who have built a genuine online channel, or who hold a niche that is difficult to replicate, are valued differently to those depending purely on passing trade.',
      timing:
        'Sixty to one hundred and twenty days, and as with hospitality the constraint is usually the landlord rather than the buyer. Lease assignment requires consent, and shopping centre landlords in particular run their own approval process with their own timeframes. Starting that conversation before you go to market is worth more than any other preparation step.',
      driverDetail: [
        'Buyers want three to five years of secure tenure, either remaining term or options to renew. A short lease with no option is the most common reason a profitable shop does not sell, because the buyer cannot recover their investment inside the term they are certain of. Location quality is assessed alongside it: neighbouring tenants, centre performance and what is opening or closing nearby.',
        'Stock is normally paid for on top of the sale price and counted at settlement, which means the basis for valuing it needs to be agreed early. Aged, damaged or unsellable stock is discounted or excluded, and disagreement about what qualifies is the most common late dispute in retail transactions.',
        'Gross margin says more about the business than turnover does. Buyers examine your margin against the category norm, how much of your revenue comes from marked down goods, and whether margin has been sacrificed to hold volume. A shop discounting its way to its revenue figure is worth less than a smaller one holding full margin.',
        'An established online channel widens the buyer pool and lifts the multiple, because it demonstrates the business is not wholly dependent on foot traffic. Buyers look at what share of revenue it represents, whether it is genuinely profitable after fulfilment costs, and whether it is your own store or a marketplace presence.',
        'Exclusive brand agencies and distribution rights can be the most valuable thing you hold, or the most fragile. Where you carry brands under an agency arrangement, those rights are often personal to you as the operator and may require the supplier to approve a new owner. That should be confirmed before the business is marketed.',
      ],
      transfer: {
        heading: 'Lease, stock and supply agreements',
        body: [
          'Most retail sales are an assignment of the existing lease, which requires the landlord to consent. Retail leases are governed by state legislation that imposes disclosure obligations and, in some states, minimum terms, so the process has formal steps rather than being a private arrangement. Shopping centre landlords typically require financial information about the buyer and run a longer approval process than a private landlord.',
          'Make-good obligations sit inside most retail leases and are frequently overlooked until late in a sale. Where the lease requires the premises to be restored at the end of the term, that liability affects what a buyer is prepared to pay, so it is better to quantify it early than to have it raised as a price reduction during negotiation.',
          'Stock at valuation is paid separately from the business price and counted at settlement, usually by an independent stocktaker. Supply and agency agreements need separate attention, because distribution rights commonly require supplier consent to continue under new ownership and are not simply part of the business you are selling.',
        ],
      },
      buyerChecks: [
        {
          label: 'Lease term, options and make-good',
          detail:
            'Years of secure tenure, whether the landlord will consent to an assignment, and what restoration obligation sits at the end of the term.',
        },
        {
          label: 'Stock ageing and turn',
          detail:
            'How quickly stock moves, what has been sitting unsold, and the basis on which it will be valued at settlement.',
        },
        {
          label: 'Gross margin and discounting',
          detail:
            'Margin against the category norm and how much revenue depends on marked down goods.',
        },
        {
          label: 'Supplier and agency agreements',
          detail:
            'Which brands you carry, on what terms, and whether those rights survive a change of ownership.',
        },
        {
          label: 'Online revenue share',
          detail:
            'What proportion of sales comes from online, and whether it is profitable once fulfilment is accounted for.',
        },
      ],
      faqs: [
        {
          q: 'Is stock included in the sale price?',
          a: 'Normally not. Stock is valued and paid for separately at settlement, usually by an independent stocktaker, with aged or unsellable items discounted or excluded. Agreeing the basis up front prevents the most common late argument.',
        },
        {
          q: 'What if my shop is in a shopping centre?',
          a: 'Centre landlords run a formal approval process for assignments and generally require financial information and guarantees from the buyer. It takes longer than a private landlord and is worth starting early, because it sits entirely outside your control.',
        },
        {
          q: 'What is make-good and does it affect my sale?',
          a: 'It is the obligation to restore the premises at the end of the lease, often to base condition. It can be a substantial cost, and buyers will factor it into what they pay. Knowing the figure before you market the business puts you in a better position than discovering it in negotiation.',
        },
        {
          q: 'Do my brand agencies transfer with the business?',
          a: 'Not automatically. Agency and distribution rights are often granted to you personally as the operator and commonly need the supplier to approve a new owner. Where those brands drive your revenue, confirm the position before going to market.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Professional Services',
    multi: '2×–4×',
    price: '$300k–$1.5m',
    days: '90–180 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Recurring & retainer revenue',
      'Client retention rate',
      'Staff qualifications & tenure',
      'Owner-dependency level',
      'CRM, systems & documented workflows',
    ],
    insight:
      'Accountancies, financial planning, law, IT services, and consulting firms sell well when revenue is recurring and not founder-dependent. Documented workflows, strong staff culture, and a healthy client pipeline are the primary value multipliers.',
    page: {
      slug: 'professional-services-firm',
      h1: 'Selling a Professional Services Firm in Australia',
      pageTitle: 'Selling a Professional Services Firm in Australia',
      metaDescription:
        'What do accounting, financial planning, law, IT and consulting firms sell for in Australia? Typical multiples, price ranges and what buyers examine.',
      covers: 'professional services',
      heroNote:
        'If you own an accounting practice, financial planning business, law firm, IT services company or consultancy, this page covers what yours is likely worth and what buyers examine before committing.',
      intro:
        'Professional services firms sell for 2× to 4× EBITDA, most often between $300,000 and $1.5 million, and take around 90 to 180 days. The number turns almost entirely on one question: how much of the revenue continues if you stop turning up.',
      insightAside:
        'Two firms with the same profit sell for very different multiples depending on the shape of their revenue. Recurring compliance work or retainers under written agreements sit at the top of the range. Project work won personally by the founder, repeated year to year on goodwill alone, sits at the bottom.',
      timing:
        'Ninety to one hundred and eighty days is typical. Most of that time goes on two things: verifying that the client base is genuinely transferable, and agreeing what happens if it is not. Deals in this sector very often carry a retention or clawback mechanism, and negotiating that fairly takes longer than agreeing the headline price.',
      driverDetail: [
        'Recurring revenue under a written agreement is the most valuable thing you own. Annual compliance work, managed service contracts and retainers give a buyer visibility of next year before they pay for it. Revenue that has to be won again every year is discounted heavily, even where it has recurred reliably for a decade.',
        'Buyers want retention history rather than a client list. How many clients have you had for more than five years, what has your annual attrition been, and did the ones who left take a fee that mattered. A stable base at modest growth is generally worth more than a growing base with churn underneath it.',
        'Qualified, tenured staff who hold client relationships are an asset, provided they stay. Buyers will ask about employment agreements, restraints, notice periods and remuneration against market. A firm where the technical capability is concentrated in one senior person carries the same risk as a firm concentrated in its owner.',
        'This is the number that decides the multiple. If you personally deliver the work, hold the client relationships and sign every piece of advice, the buyer is acquiring your calendar. Firms where the owner has moved into oversight, with client relationships genuinely shared across the team, sell at a different level entirely.',
        'Documented workflows, a maintained CRM and consistent file management matter more here than owners expect. They demonstrate that the work can be performed to the same standard by someone else, which is the entire proposition a buyer is testing.',
      ],
      transfer: {
        heading: 'Licensing, client consent and professional obligations',
        body: [
          'What has to transfer depends on the discipline. Financial planning requires the buyer to hold an Australian Financial Services Licence or operate as an authorised representative. Legal practice requires a current practising certificate and brings trust account obligations with it. Accounting carries professional body requirements. In every case the buyer needs the relevant authorisation in their own right, which narrows the buyer pool to people already in the profession.',
          'Clients are not property and do not transfer with the business. Engagements generally need to be novated or re-signed, and clients can decline. This is why professional services deals so often include deferred consideration tied to retained fees, and why the handover period is usually longer than in other sectors.',
          'Professional indemnity obligations continue after settlement for work already performed, so run-off cover needs to be arranged rather than assumed. Work in progress and outstanding debtors are normally dealt with separately from the sale price, and how they are treated should be settled early because the amounts are rarely small.',
        ],
      },
      buyerChecks: [
        {
          label: 'Recurring versus project revenue',
          detail:
            'What proportion is contracted or genuinely annual, and what has to be won again each year.',
        },
        {
          label: 'Client concentration and retention history',
          detail:
            'Your largest clients as a share of fees, and your actual attrition rate over three years rather than an estimate.',
        },
        {
          label: 'Staff tenure, agreements and restraints',
          detail:
            'Who holds the client relationships, whether they are staying, and whether existing agreements would survive a challenge.',
        },
        {
          label: 'Work in progress and debtors',
          detail:
            'Ageing of both, and your write-off history. Poor WIP discipline reads as a firm that does not price or collect well.',
        },
        {
          label: 'Professional indemnity claims history',
          detail:
            'Past claims, current cover and what run-off arrangements will be needed at settlement.',
        },
      ],
      faqs: [
        {
          q: 'Are accounting practices really valued on cents in the dollar of fees?',
          a: 'It remains common market shorthand and you will hear it quoted. But buyers and their financiers price on profit, so a practice with a large fee base and thin margins will not achieve what the fee multiple implies. Treat it as a rule of thumb rather than a valuation.',
        },
        {
          q: 'What happens if clients leave after the sale?',
          a: 'That risk is usually shared through the deal structure. Part of the price is commonly deferred and adjusted against retained fees at twelve or twenty four months. The fairness of that mechanism matters as much as the headline number.',
        },
        {
          q: 'Do I have to stay on after settlement?',
          a: 'In most cases yes, typically six to twelve months. In this sector the handover is the product, because what the buyer is really acquiring is the transfer of trust from you to them.',
        },
        {
          q: 'Can I sell if I am a sole practitioner?',
          a: 'Yes, and there is a real market for it, but expect a lower multiple and a longer handover. Buyers are pricing the risk that the relationships do not survive your departure.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Allied Health',
    multi: '3×–5×',
    price: '$400k–$2m',
    days: '90–180 days',
    demand: 'Very High',
    demandCol: '#166534',
    drivers: [
      'Provider registration numbers',
      'Referral network quality',
      'Medicare / NDIS billing mi×',
      'Multi-practitioner structure',
      'Location & accessibility',
    ],
    insight:
      "Allied health is one of Australia's highest-demand acquisition sectors. Businesses with multiple registered practitioners, diversified referral networks, and NDIS registration attract strong multiples from corporate acquirers and PE-backed roll-ups.",
    page: {
      slug: 'allied-health-practice',
      h1: 'Selling an Allied Health Practice in Australia',
      pageTitle: 'Selling an Allied Health Practice in Australia',
      metaDescription:
        'What do physiotherapy, dental, psychology and other allied health practices sell for in Australia? Typical multiples, price ranges, and what buyers examine.',
      covers: 'allied health',
      heroNote:
        'If you own a physiotherapy, dental, psychology, podiatry, optometry or similar practice, this page covers what yours is likely worth, what buyers examine, and what tends to move the number up or down.',
      intro:
        'Allied health practices sell for 3× to 5× EBITDA, most often between $400,000 and $2 million, and typically take 90 to 180 days. Demand is as strong as any sector in the Australian market, driven by corporate groups and private equity backed acquirers building multi-site networks.',
      insightAside:
        'The gap between the bottom and the top of that range is usually one thing: how much of the clinical work you personally do. A practice where the owner sees most of the patients is a job with equipment attached. A practice with several practitioners and an owner who mostly manages is an asset, and it is priced like one.',
      timing:
        'Ninety to one hundred and eighty days is typical, and the variable is rarely buyer interest. It is practitioner retention. Buyers will not commit until they understand which clinicians are staying and on what terms, and those conversations take time to have properly and confidentially. Practices that have restraints and employment agreements already in order move considerably faster.',
      driverDetail: [
        'Provider numbers sit with the individual practitioner and are tied to a practice location, not with the business. A buyer cannot inherit yours. What they are really assessing is how much billing runs through your number personally, because that is the portion of revenue most at risk when you leave.',
        'Where referrals come from matters more than how many there are. A practice fed by a broad base of local GPs is durable. One where most referrals come from two doctors, or from personal relationships you built, carries concentration risk that buyers price for directly.',
        'The split across Medicare, NDIS, DVA, workers compensation and private fees shapes both the multiple and the buyer pool. Diversified billing is valued for its stability. Heavy reliance on any single funding stream, particularly one subject to policy change, is treated as a risk to future earnings.',
        'A single practitioner practice and a four practitioner practice at the same profit do not sell for the same multiple. Multiple clinicians spread the key person risk, prove the model works with people other than you, and make the practice viable for buyers who are not clinicians themselves.',
        'Buyers assess catchment, parking, accessibility and proximity to referring practices the way an operator would. For practices treating older or less mobile patients, ground floor access and parking are not cosmetic details, they are part of the revenue.',
      ],
      transfer: {
        heading: 'Registration, provider numbers and patient records',
        body: [
          'Professional registration belongs to the practitioner, not the practice. A buyer must either be registered in the relevant profession themselves or employ practitioners who are. This is why corporate and private equity buyers are so active in the sector: they already have the clinical structure and are buying patient flow.',
          'Medicare provider numbers are issued to an individual practitioner for a specific location, so incoming practitioners apply for their own. NDIS registration is held by the provider entity and involves an audit process, which means it does not simply pass across with the business. Both need to be sequenced so the practice can keep billing from day one under new ownership.',
          'Patient health records carry retention and privacy obligations that continue after the sale. How records transfer, who holds them and how patients are notified all need to be dealt with in the contract rather than left to settlement. Handled poorly, this is a genuine compliance exposure for both parties.',
        ],
      },
      buyerChecks: [
        {
          label: 'Practitioner retention and restraints',
          detail:
            'Who is staying, on what terms, and whether existing agreements include enforceable restraints. Buyers frequently make this a condition.',
        },
        {
          label: 'Billing mix by funding source',
          detail:
            'The split across Medicare, NDIS, DVA, workers compensation and private fees, and how that split has moved over three years.',
        },
        {
          label: 'Referral concentration',
          detail:
            'How much of your new patient flow comes from a small number of referrers, and whether those relationships are with the practice or with you.',
        },
        {
          label: 'Your own clinical hours',
          detail:
            'How much of the revenue you personally generate, and what happens to it when you leave. This single figure often decides the multiple.',
        },
        {
          label: 'Compliance and audit history',
          detail:
            'Billing compliance, any audit correspondence, and your records management practices.',
        },
      ],
      faqs: [
        {
          q: 'What happens if I am the main practitioner?',
          a: 'It reduces the multiple, because a large share of revenue leaves with you. The usual answer is a handover period of twelve months or more, often with part of the price tied to retained revenue, or recruiting a second practitioner before going to market.',
        },
        {
          q: 'Do my patients transfer with the sale?',
          a: 'Patients are not property and cannot be assigned. What transfers is the practice, its records and its referral relationships. In practice retention is high where the clinical team stays and patients are notified properly.',
        },
        {
          q: 'Does NDIS registration pass to the buyer?',
          a: 'Not automatically. Registration sits with the provider entity and involves audit, so the buyer generally needs their own. Where a share sale keeps the entity intact the position differs, which is one reason deal structure matters here more than in most sectors.',
        },
        {
          q: 'Will a corporate group pay more than an individual buyer?',
          a: 'Often, particularly above roughly $1 million in EBITDA where a practice fits an existing network. Corporates also run longer due diligence and more structured terms, so the headline number and the net outcome are not always the same thing.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Manufacturing',
    multi: '2× - 4×',
    price: '$500k–$5m',
    days: '120–240 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Long-term supply contracts',
      'Plant & equipment condition',
      'Proprietary products or IP',
      'Skilled and retained workforce',
      'Export market potential',
    ],
    insight:
      'Manufacturing businesses with proprietary products, long-term supply contracts, or export capability attract the strongest multiples. Equipment condition and workforce skill depth are scrutinised closely. These transactions typically take longer to complete due to due diligence complexity.',
    page: {
      slug: 'manufacturing-business',
      h1: 'Selling a Manufacturing Business in Australia',
      pageTitle: 'Selling a Manufacturing Business in Australia',
      metaDescription:
        'What do Australian manufacturing businesses sell for? Typical EBITDA multiples, price ranges, time to sell, and what buyers examine during due diligence.',
      covers: 'manufacturing',
      heroNote:
        'If you own a manufacturing business, this page covers what yours is likely worth, why these sales take longer than most, and what buyers examine before they commit.',
      intro:
        'Manufacturing businesses sell for 2× to 4× EBITDA, most often between $500,000 and $5 million. They take 120 to 240 days, among the longest of any sector, because due diligence covers plant, contracts, workforce and the site itself rather than the accounts alone.',
      insightAside:
        'Manufacturing is where the gap between an asset-heavy business and a profitable one shows up most clearly. A factory full of equipment is not the same as a business, and buyers price on earnings. What the plant does is set a floor under the value, not lift the multiple.',
      timing:
        'One hundred and twenty to two hundred and forty days reflects the breadth of due diligence rather than any shortage of buyers. An acquirer is examining supply contracts, an independent plant valuation, workforce entitlements, safety history and often an environmental report on the site. Each of those can surface something that needs resolving, and several run sequentially rather than in parallel.',
      driverDetail: [
        'Long-term supply agreements are the strongest single lever, because they convert a manufacturer from a job shop into a business with visible forward revenue. Buyers read the terms closely, particularly the notice periods, pricing mechanisms and whether the agreement survives a change of ownership.',
        'Buyers commission an independent valuation rather than accepting your book value. What they assess is remaining useful life, maintenance history and whether the plant can meet current volumes without immediate capital expenditure. Well-maintained older equipment with complete service records often prices better than newer equipment with none.',
        'Proprietary products, patents, registered designs and tooling are what separate a manufacturer from a contract producer, and they support the top of the multiple range. One thing that surprises sellers regularly: where customers supplied the tooling or moulds, those often belong to the customer rather than to you, and that becomes clear during due diligence.',
        'Skilled trades are scarce and expensive to replace. A buyer is assessing whether the workforce stays, what your enterprise agreement or award obligations are, and what accrued entitlements sit on the balance sheet. Long service leave provisions in a long-established business can be substantial and are adjusted for at settlement.',
        'Export capability broadens the buyer pool considerably, particularly to overseas acquirers seeking an Australian manufacturing base. Buyers look at certifications, freight arrangements and how concentrated the overseas revenue is across customers and countries.',
      ],
      transfer: {
        heading: 'Contracts, plant and site obligations',
        body: [
          'Customer contracts are the first thing an acquirer examines, because many contain change of control provisions. A supply agreement that allows the customer to terminate or renegotiate when the business changes hands is worth far less than one that transfers cleanly, and it can reshape the entire deal. Reviewing your own agreements before going to market is worth doing early.',
          'Plant and equipment need a current asset register showing age, condition, service history and any finance owing. Chattel mortgages and equipment leases are common in this sector and have to be discharged or assumed at settlement. Where tooling belongs to a customer, that should be identified up front rather than discovered.',
          'Site and environmental obligations carry more weight in manufacturing than anywhere else. Long-occupied industrial sites can involve contamination questions, and buyers frequently require an environmental assessment before proceeding. Any licences relating to emissions, discharge or waste need to be current and transferable. This is the issue most likely to delay or reprice a manufacturing deal.',
        ],
      },
      buyerChecks: [
        {
          label: 'Supply contracts and change of control terms',
          detail:
            'Length, pricing mechanism, notice periods, and whether each agreement survives a change of ownership.',
        },
        {
          label: 'Asset register and maintenance records',
          detail:
            'Age, condition and service history of major plant, plus any finance still owing against it.',
        },
        {
          label: 'Environmental and site condition',
          detail:
            'Contamination history, current licences, and whether an environmental assessment has been carried out.',
        },
        {
          label: 'Workforce, agreements and entitlements',
          detail:
            'Skilled staff retention, award or enterprise agreement obligations, and accrued long service leave.',
        },
        {
          label: 'Inventory and work in progress',
          detail:
            'How raw materials and finished goods are valued at settlement, and what obsolete stock is carried.',
        },
      ],
      faqs: [
        {
          q: 'Do my customer contracts automatically transfer to a buyer?',
          a: 'Not necessarily. It depends on the assignment and change of control clauses in each agreement, and some require customer consent. This is worth reviewing before you go to market, because it materially affects both price and structure.',
        },
        {
          q: 'Is the factory included in the sale?',
          a: 'Often not. Where the owner holds the property personally or in a separate entity, the business and the premises are usually treated as two transactions with a lease put in place between them. Some buyers want both, others prefer to lease.',
        },
        {
          q: 'Why does manufacturing take so much longer to sell?',
          a: 'The due diligence is simply broader. Plant valuation, contract review, workforce entitlements and environmental assessment all take real time, and several of them cannot run in parallel.',
        },
        {
          q: 'What happens to employee entitlements at settlement?',
          a: 'Accrued leave and long service leave are normally accounted for through a price adjustment, with the buyer recognising the transferred entitlements. In a long-established manufacturer these figures can be significant, so they should be quantified early.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'E-commerce',
    multi: '2.5× - 4×',
    price: '$200k–$1.5m',
    days: '60–120 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Revenue quality & consistency',
      'Gross margin trends',
      'Customer acquisition cost',
      'Platform diversification',
      'Repeat purchase & LTV rates',
    ],
    insight:
      'eCommerce businesses are valued on Proprietors Earnings Before Interest Tax Depreciation and Amortisation (PEBITDA). Buyers focus heavily on margin trends, repeat purchase rates, and whether the business is over-reliant on a single platform (e.g. Amazon or a single social channel). Diversified traffic and supply chains attract premiums.',
    page: {
      slug: 'ecommerce-business',
      h1: 'Selling an Ecommerce Business in Australia',
      pageTitle: 'Selling an Ecommerce Business in Australia',
      metaDescription:
        'What do Australian ecommerce businesses sell for? Typical multiples, price ranges, time to sell, and how platform concentration and margin trends affect the price.',
      covers: 'ecommerce',
      heroNote:
        'If you run an online store, marketplace business or direct to consumer brand, this page covers what yours is likely worth, what buyers examine, and what tends to move the number up or down.',
      intro:
        'Ecommerce businesses sell for 2.5× to 4× EBITDA, most often between $200,000 and $1.5 million, and move quickly at around 60 to 120 days. What separates the top of that range from the bottom is almost always concentration: how much of the business depends on one platform, one supplier or one traffic source.',
      insightAside:
        'Ecommerce is usually priced on proprietor earnings rather than a straight EBITDA figure, which means the add-backs matter. Owner wages, one-off costs and personal expenses run through the business all get examined line by line, and a buyer will only accept the ones they can substantiate.',
      timing:
        'Sixty to one hundred and twenty days is among the fastest of any sector, because the business has no premises, no fleet and usually no staff to speak of. What does take time is verification. Buyers want direct access to analytics, ad accounts and merchant dashboards rather than exported screenshots, and arranging that properly while keeping the sale confidential is the main scheduling constraint.',
      driverDetail: [
        'Buyers want consistency more than growth. Two or three years of steady trading with visible seasonality is easier to price than a single breakout year, because a spike raises the question of whether it was a product cycle, a platform algorithm or a one-off promotion that will not repeat.',
        'The direction of your gross margin matters more than its level. Margin that has held or improved while you scaled suggests genuine pricing power. Margin eroding as revenue grows suggests you are buying growth through discounting or rising freight and input costs, and buyers price that trajectory forward rather than assuming it stops.',
        'Customer acquisition cost against lifetime value is the core economic question. Buyers examine the split between paid and organic traffic, because a business dependent on paid acquisition is only as profitable as its current ad performance. Organic search, direct traffic and an owned email list are worth materially more than the same revenue bought through advertising.',
        'Platform concentration is the single largest risk buyers price for in this sector. A business earning most of its revenue through one marketplace or one social channel is exposed to policy and algorithm changes it has no control over. Revenue spread across your own store, marketplaces and multiple traffic sources attracts a meaningfully higher multiple.',
        'Repeat purchase rate tells a buyer whether you have customers or transactions. A high proportion of returning buyers, particularly with an engaged email or SMS list, means future revenue does not have to be bought again. Consumables and replenishable products naturally do better here than one-time purchases.',
      ],
      transfer: {
        heading: 'Accounts, suppliers and brand assets',
        body: [
          'Digital assets transfer as an itemised list rather than automatically, and the list is longer than most sellers expect: domain, store platform, marketplace seller accounts, advertising accounts, analytics, email platform, social handles and any apps or subscriptions the store depends on. Marketplace seller accounts in particular often cannot be transferred freely under platform policy, which is one reason ecommerce deals are sometimes structured as a share sale so the account stays with the entity.',
          'Supplier arrangements are frequently informal, and that becomes a problem at due diligence. Where pricing, exclusivity or lead times rest on a relationship rather than an agreement, a buyer has no assurance the terms continue after you leave. Getting key supplier terms documented before going to market is one of the highest return preparation steps in this sector.',
          'Registered trade marks, brand registry enrolments and product listings with accumulated reviews carry real value and need to be identified explicitly in the contract. Inventory is normally handled separately from the sale price and counted at settlement, with aged or unsellable stock discounted or excluded.',
        ],
      },
      buyerChecks: [
        {
          label: 'Revenue split by channel',
          detail:
            'How much comes from your own store against each marketplace, and how that mix has shifted over time.',
        },
        {
          label: 'Traffic sources and acquisition cost',
          detail:
            'Paid against organic, current cost per acquisition, and whether ad performance has been deteriorating.',
        },
        {
          label: 'Gross margin trend and add-backs',
          detail:
            'Three years of margin direction, plus every add-back claimed in the proprietor earnings figure with evidence for each.',
        },
        {
          label: 'Supplier terms and lead times',
          detail:
            'Whether arrangements are documented, how concentrated your sourcing is, and what happens to pricing under new ownership.',
        },
        {
          label: 'Inventory ageing and returns rate',
          detail:
            'Stock turn, what is sitting unsold, and your returns and refunds history by product.',
        },
      ],
      faqs: [
        {
          q: 'Can I transfer my marketplace seller account to a buyer?',
          a: 'Often not directly, because platform policies restrict it. This is one of the main reasons ecommerce deals are structured as share sales, where the entity holding the account changes hands rather than the account itself. It should be resolved before terms are agreed.',
        },
        {
          q: 'Is my stock included in the sale price?',
          a: 'Usually not. Inventory is normally valued and paid for separately at settlement, with aged or unsellable stock discounted or excluded. Agreeing the basis for that valuation early avoids the most common late dispute in these deals.',
        },
        {
          q: 'Why do buyers use proprietor earnings rather than EBITDA?',
          a: 'Owner operated online businesses commonly run personal costs through the accounts and pay the owner irregularly. Proprietor earnings normalises for that, but every add-back has to be substantiated. Unsupported add-backs are simply removed, which lowers the price.',
        },
        {
          q: 'Does it matter that most of my traffic is paid?',
          a: 'Yes. Paid traffic can be bought by anyone, so it contributes less to the multiple than organic search, direct traffic or an owned email list. Businesses that have built durable acquisition channels sell for more at the same profit.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Childcare / OSHC',
    multi: '3× - 5×',
    price: '$500k–$3m',
    days: '120–240 days',
    demand: 'High',
    demandCol: '#16a34a',
    drivers: [
      'Occupancy rate (80%+ ideal)',
      'Licences, approvals & ratings',
      'Qualified educator ratios',
      'Waitlist length',
      'Location & catchment demographics',
    ],
    insight:
      'Childcare and OSHC services command the highest multiples in the SME market due to significant regulatory barriers to entry. High occupancy (above 80%), and active waitlist are powerful drivers. Corporate operators are often active buyers in this space.',
    page: {
      slug: 'childcare-centre',
      h1: 'Selling a Childcare Centre in Australia',
      pageTitle: 'Selling a Childcare Centre in Australia',
      metaDescription:
        'What do childcare centres and OSHC services sell for in Australia? Typical multiples, price ranges, time to sell, and how occupancy and your rating affect the price.',
      covers: 'childcare and OSHC',
      heroNote:
        'If you own a long day care centre, preschool or OSHC service, this page covers what yours is likely worth, how occupancy and your rating change the number, and what buyers examine before they commit.',
      intro:
        'Childcare centres attract the highest multiples in the Australian SME market, typically 3× to 5× EBITDA and most often between $500,000 and $3 million. They also take the longest to sell, around 120 to 240 days, because the regulatory transfer cannot be rushed.',
      insightAside:
        'The reason childcare sits at the top of the multiple range is the barrier to entry. A buyer cannot simply open a competing centre down the road: they need approvals, a compliant premises and staff who are already scarce. That difficulty is what you are selling, and it is why corporate operators pay well for established services.',
      timing:
        'One hundred and twenty to two hundred and forty days is the longest range of any sector we cover, and almost none of it is finding a buyer. Demand is strong. The time goes on regulatory transfer, because the incoming operator needs their own provider approval and the service approval has to be formally transferred, with notice to the regulator. Subsidy approval for the new operator runs alongside it. None of this can be compressed by motivated parties, so it should start early.',
      driverDetail: [
        'Occupancy is the number every buyer opens with. Above 80% sustained across the year supports the top of the range. Buyers look at the trend rather than a single snapshot, and they will read a recent dip as either a seasonal pattern or a warning depending on what the previous twelve months show. Low occupancy is not fatal, but it moves you into a turnaround conversation and prices accordingly.',
        'Your provider and service approvals, and your rating against the National Quality Standard, are public and permanent. A buyer looks these up before they contact you. An Exceeding rating is a genuine asset. Working Towards is a discount, because the incoming operator inherits the improvement plan and the regulator attention that comes with it.',
        'Qualified educators are the scarcest resource in the sector. A centre that meets ratios with a stable, qualified team is worth materially more than one carrying vacancies or leaning on agency staff. Buyers will want to know who is staying, particularly the nominated supervisor and the educational leader.',
        'A waitlist is proof of demand that occupancy alone cannot show, because it says the centre could fill more places if it had them. Buyers treat a genuine, current waitlist as evidence the revenue is durable rather than dependent on marketing spend.',
        'Buyers assess the catchment the way an operator would: the number of families with young children, what is being built nearby, and how many competing services sit within a few kilometres. A strong centre in a saturated catchment is valued differently to the same centre in a growing one.',
      ],
      transfer: {
        heading: 'Approvals, ratings and regulatory transfer',
        body: [
          'Childcare operates under the National Quality Framework, and two separate approvals matter. Provider approval belongs to the operator. Service approval attaches to the service itself. A buyer needs their own provider approval, and the service approval has to be formally transferred with notice to the state regulator. This is the main reason childcare sales take longer than other sectors.',
          'Your rating against the National Quality Standard travels with the service and is published. Every serious buyer will have seen it before your first conversation, along with any compliance history. Where a rating is sitting at Working Towards, it is usually better to address the improvement plan before going to market than to negotiate against it afterwards.',
          'Child Care Subsidy approval also needs to be in place for the incoming operator. If it is not, families lose their subsidy at settlement, which is the fastest way to lose occupancy in the first month of new ownership. Sequencing this properly is part of structuring the deal, not an afterthought.',
        ],
      },
      buyerChecks: [
        {
          label: 'Occupancy across the last twelve months',
          detail:
            'Month by month, not an average. Buyers are looking for the trend and for how the centre handles the quieter part of the year.',
        },
        {
          label: 'Your current rating and compliance history',
          detail:
            'Public information, so assume the buyer already has it. Any breaches, conditions or improvement notices will be raised.',
        },
        {
          label: 'Staffing, ratios and qualifications',
          detail:
            'Whether ratios are met with permanent qualified staff, and which key people intend to stay after the sale.',
        },
        {
          label: 'Lease or freehold, and the terms',
          detail:
            'Whether the property is included, and if leased, how long is secure. Purpose-built premises with a long lease support the price.',
        },
        {
          label: 'Fee structure and subsidy mix',
          detail:
            'Daily rates against the local market, how much revenue is subsidised, and your family debt position.',
        },
      ],
      faqs: [
        {
          q: 'Does my rating really affect the sale price?',
          a: 'Yes, and more than owners expect. It is public, it is the first thing a buyer checks, and Working Towards signals inherited regulatory work. Lifting a rating before going to market is usually worth more than any presentation improvement.',
        },
        {
          q: 'Can I sell if occupancy is below 80%?',
          a: 'Yes. It changes who buys and at what price, because you move from a stable-asset conversation to a turnaround one. Buyers who specialise in lifting occupancy are active, but they price for the work involved.',
        },
        {
          q: 'Is the building included in the sale?',
          a: 'Often not. Many centres trade as a business with the premises leased, and where the owner also holds the freehold the two are usually handled as separate transactions with a lease put in place between them.',
        },
        {
          q: 'How long does the regulatory side actually take?',
          a: 'It is the main driver of the 120 to 240 day range. Provider approval for the buyer, transfer of service approval and subsidy approval all sit outside the control of either party, so the practical answer is to start them as early as the deal allows.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Transport / Logistics',
    multi: '2.5× - 3.5×',
    price: '$300k–$2m',
    days: '90–180 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Long-term client contracts',
      'Fleet condition & age',
      'Driver licences & compliance',
      'Geographic routes & territories',
      'Fuel costs & efficiency',
    ],
    insight:
      'Fleet condition and long-term client supply agreements (government, retail, FMCG) are the dominant value factors. Owner-drivers scaling to managed fleet businesses attract interest from aggregators. Heavy vehicle compliance history is scrutinised carefully.',
    page: {
      slug: 'transport-logistics-business',
      h1: 'Selling a Transport or Logistics Business in Australia',
      pageTitle: 'Selling a Transport or Logistics Business in Australia',
      metaDescription:
        'What do Australian transport and logistics businesses sell for? Typical multiples, price ranges, time to sell, and how compliance history affects the price.',
      covers: 'transport and logistics',
      heroNote:
        'If you own a transport, freight or logistics business, this page covers what yours is likely worth, how compliance history affects the price, and what buyers examine before committing.',
      intro:
        'Transport and logistics businesses sell for 2.5× to 3.5× EBITDA, most often between $300,000 and $2 million, and take around 90 to 180 days. Two things decide where you land: the quality of your customer contracts and the state of your compliance record.',
      insightAside:
        'The multiple range here is narrower than most sectors, and that is telling. Buyers treat transport as a margin business with real regulatory exposure, so they are less willing to pay up for growth and more focused on whether the earnings are defensible and the compliance history is clean.',
      timing:
        'Ninety to one hundred and eighty days. The time typically goes on two areas: confirming that major customer contracts will survive the change of ownership, and working through compliance and fleet condition. Where accreditation or a customer approval process is involved, that sits outside the control of either party and should be started early.',
      driverDetail: [
        'Contracted work for government, national retailers or FMCG clients is the difference between the top and the bottom of the range. Buyers examine term, rate review mechanisms, volume commitments and change of control provisions. Spot work at good margins is worth considerably less than contracted work at similar margins, because it has to be won again continuously.',
        'Fleet age, service history and remaining useful life are assessed directly, and most fleets carry finance. Buyers want the asset register alongside the payout figures, because what looks like a substantial asset base can be heavily encumbered. Consistent maintenance records also stand as evidence of your compliance culture, which matters beyond the vehicles themselves.',
        'Driver licences are held by individuals, and experienced heavy vehicle drivers are genuinely scarce. Buyers will want to know who is staying and how drivers are engaged, because the distinction between employees and owner-drivers carries real consequences for the acquirer if it has been drawn incorrectly.',
        'A defined route network or territory with established backloading is worth more than the same revenue run inefficiently. Buyers assess empty running, route density and whether additional volume could be absorbed without proportionally more vehicles and drivers.',
        'Fuel is one of your largest variable costs, so buyers look at whether rates include a fuel adjustment mechanism. Contracts with no ability to pass on fuel movements expose the buyer to margin compression they cannot control, and they are priced accordingly.',
      ],
      transfer: {
        heading: 'Compliance, accreditation and fleet',
        body: [
          'Heavy vehicle compliance is the first thing a serious acquirer examines, and for good reason. Chain of Responsibility obligations under the Heavy Vehicle National Law extend to directors and executives personally, so a buyer is taking on exposure for how the operation is run. Breach history, fatigue and work diary records, mass and dimension compliance and load restraint practices are all reviewed.',
          'Accreditation does not simply follow the business. Where you operate under a scheme covering maintenance, mass or fatigue management, the incoming operator generally needs accreditation in their own right, and customer-specific approvals often have to be re-established. Both take time and should be sequenced into the deal rather than left to settlement.',
          'Insurance history matters more than owners expect. Your claims record follows the operation and directly affects what the buyer will pay in premiums, which feeds straight into the earnings they are acquiring. A poor claims history reduces the price whether or not anything else about the business has changed.',
        ],
      },
      buyerChecks: [
        {
          label: 'Compliance and breach history',
          detail:
            'Infringements, fatigue and work diary records, mass and load restraint practices, and any regulator correspondence.',
        },
        {
          label: 'Fleet register and finance owing',
          detail:
            'Age, condition and service history of each vehicle, with payout figures on any chattel mortgages or leases.',
        },
        {
          label: 'Customer contracts and change of control',
          detail:
            'Term, rates, volume commitments, fuel adjustment mechanisms, and whether contracts survive a sale.',
        },
        {
          label: 'Driver retention and engagement',
          detail:
            'Who is staying, licence classes held, and whether owner-drivers are correctly classified as contractors.',
        },
        {
          label: 'Insurance claims history',
          detail:
            'Claims over recent years and current premiums, since both transfer into the buyer cost base.',
        },
      ],
      faqs: [
        {
          q: 'Does my accreditation transfer with the business?',
          a: 'Generally not. The incoming operator usually needs accreditation in their own name, and customer-specific approvals often have to be re-established. It is one of the main reasons to start the regulatory side of a transport deal early.',
        },
        {
          q: 'What happens to trucks that are still financed?',
          a: 'Finance is either discharged at settlement from the proceeds or assumed by the buyer where the financier agrees. Either way the payout figures need to be on the table early, because they determine what you actually walk away with.',
        },
        {
          q: 'Are owner-drivers a problem in a sale?',
          a: 'Only where the arrangements do not hold up. Buyers examine whether contractors are genuinely independent, because misclassification carries liability that transfers to them. Properly documented arrangements are common and cause no difficulty.',
        },
        {
          q: 'Do my customers have to agree to the sale?',
          a: 'It depends on each contract. Many major customer agreements include change of control provisions requiring consent or allowing termination, so knowing where you stand before going to market is important.',
        },
      ],
      reviewed: true,
    },
  },
  {
    name: 'Hair & Beauty',
    multi: ' 1.5× - 2.5×',
    price: '$50k–$300k',
    days: '60–120 days',
    demand: 'Moderate',
    demandCol: '#d97706',
    drivers: [
      'Client database quality',
      'Rent as % of revenue',
      'Stylist / therapist retention',
      'Social media following',
      'Equipment & fit-out condition',
    ],
    insight:
      "Hair and beauty businesses are highly personal, value is closely tied to client loyalty and staff relationships. Sellers who have built systems, a strong client database, and genuine independence from the owner's personal following attract meaningfully better offers from buyers.",
    page: {
      slug: 'hair-and-beauty-salon',
      h1: 'Selling a Hair or Beauty Salon in Australia',
      pageTitle: 'Selling a Hair or Beauty Salon in Australia',
      metaDescription:
        'What do Australian hair and beauty salons sell for? Typical multiples, price ranges, time to sell, and why your client database and staff decide the price.',
      covers: 'hair and beauty',
      heroNote:
        'If you own a hair salon, beauty clinic or day spa, this page covers what yours is likely worth, why staff and client retention decide the number, and what buyers examine.',
      intro:
        'Hair and beauty businesses sell for 1.5× to 2.5× EBITDA, most often between $50,000 and $300,000, and take around 60 to 120 days. More than in almost any other sector, what a buyer is really assessing is whether the clients belong to the salon or to the people who work in it.',
      insightAside:
        'The uncomfortable question in every salon sale is how much of the revenue is yours personally. If you hold the busiest column and your clients book with you by name, a large part of what you are selling walks out the door when you do. Salons where the owner has stepped back from the floor sell for meaningfully more at the same profit.',
      timing:
        'Sixty to one hundred and twenty days. The pace is set by two things: landlord consent to assign the lease, and confidential conversations with key staff. The second is the delicate one, because telling stylists too early risks them leaving and telling them too late risks the buyer walking. That sequencing is usually managed through the broker rather than directly.',
      driverDetail: [
        'A client database is only worth something if it is current, held in a booking system and genuinely active. Buyers look at how many clients have visited in the last twelve months rather than the total record count, and at your rebooking rate, because a client who books their next appointment before leaving is a far better indicator of future revenue than one who has simply been in once.',
        'Rent as a share of revenue is scrutinised the same way it is in hospitality. Salons carry fixed costs against income that varies week to week, so a high rent leaves no room to absorb a quiet period. Buyers calculate this early and it can end the conversation on its own.',
        'Stylists and therapists carry clients with them, which makes retention the central question in the deal. Buyers want to know who is staying, how they are engaged and what agreements exist. Restraints on junior staff are rarely worth much in practice, so what matters more is whether the team is settled and whether clients book by service or by individual.',
        'A strong social presence helps, but the important question is who owns it. Where the following sits on a business account with content about the salon, it transfers. Where it is your personal handle built around you as a stylist, it does not, and buyers discount accordingly.',
        'Fit-out age and equipment condition set the buyer expectation of near term capital expenditure. A salon needing a refresh within a year is priced with that cost deducted, and the same applies to ageing treatment equipment that will need replacing or servicing.',
      ],
      transfer: {
        heading: 'Lease, staff and the client database',
        body: [
          'The client database is your principal asset and it is also personal information, which means it cannot simply be handed across. Transfer needs to be handled consistently with your privacy obligations and clients are generally notified of the change of ownership. A database held in a booking system transfers cleanly; one that lives in an appointment book or in a stylist personal phone effectively does not transfer at all.',
          'Staff arrangements need to be clear before the business is marketed. Where stylists rent chairs or rooms they are contractors with their own client relationships and can leave without notice, which changes what the buyer is acquiring. Where they are employees, accrued entitlements are adjusted at settlement. Buyers routinely make key staff staying a condition of the deal.',
          'The lease is assigned with landlord consent in the same way as retail or hospitality, and the same considerations apply: remaining term, options to renew, and any make-good obligation at the end. Salon fit-outs are expensive to remove, so make-good in this sector is worth quantifying rather than assuming.',
        ],
      },
      buyerChecks: [
        {
          label: 'Active clients and rebooking rate',
          detail:
            'How many clients have visited in the last twelve months, and what proportion rebook before they leave.',
        },
        {
          label: 'Your own column as a share of revenue',
          detail:
            'How much of the takings you personally generate, and what is expected to happen to it after settlement.',
        },
        {
          label: 'Staff engagement model and retention',
          detail:
            'Employees or chair renters, what agreements are in place, and who has indicated they are staying.',
        },
        {
          label: 'Rent as a percentage of revenue',
          detail:
            'Calculated from your figures, alongside remaining lease term and any make-good obligation.',
        },
        {
          label: 'Retail product sales and stock',
          detail:
            'What share of revenue comes from product, your margin on it, and what stock is sitting unsold.',
        },
      ],
      faqs: [
        {
          q: 'What if I am the main stylist?',
          a: 'It lowers the price, because a share of the revenue is tied to you personally. The usual answers are a longer handover, part of the price deferred against retained clients, or reducing your own column before going to market so the business can show it holds up without you.',
        },
        {
          q: 'Do my clients transfer with the sale?',
          a: 'The database transfers, subject to privacy obligations, but clients choose for themselves. Retention is strongest where the team stays and the change is communicated well, which is why staff retention and client retention are really the same question here.',
        },
        {
          q: 'Are chair renters a problem when selling?',
          a: 'They complicate it. Chair renters are contractors with their own client relationships and can leave at short notice, so a buyer treats that revenue as less secure than the same amount generated by employed staff.',
        },
        {
          q: 'Is my Instagram following worth anything?',
          a: 'Only if it transfers. A business account with a following built around the salon carries value. A personal account built around you as an individual stylist does not, because it leaves with you.',
        },
      ],
      reviewed: true,
    },
  },
];

export function publishedIndustryPages(): (IndustryBenchmark & {
  page: IndustryPage;
})[] {
  return INDUSTRY_BENCHMARKS.filter(
    (industry): industry is IndustryBenchmark & { page: IndustryPage } =>
      !!industry.page,
  );
}

export function indexableIndustryPages() {
  return publishedIndustryPages().filter(({ page }) => page.reviewed);
}

export function industryBySlug(slug: string) {
  return publishedIndustryPages().find(({ page }) => page.slug === slug);
}
