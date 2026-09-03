export interface Phase {
  label: string;
  title: string;
  tasks: string[];
}

export const EXIT_PHASES: Phase[] = [
  {
    label: '24+ months out',
    title: 'Lay the foundation',
    tasks: [
      'Get a business appraisal from Blackmont Advisory to understand where you stand.',
      'Begin clearly separating personal and business expenses in your accounts.',
      'Start delegating key operational roles to reduce your daily involvement.',
      'Review your business structure with your accountant (Pty Ltd, trust, etc.) for optimal exit tax outcomes.',
      'Speak to your accountant about CGT concessions and small business tax planning strategies.',
      'Start documenting your key processes, even basic notes are a strong start',
      "Identify the 'story' of your business: what makes it attractive to a buyer?",
    ],
  },
  {
    label: '12–18 months out',
    title: 'Clean up and systemise',
    tasks: [
      'Get a business appraisal from Blackmont Advisory to understand where you stand.',
      'Get 3 years of clean, accountant-signed financial statements prepared.',
      'Review your commercial lease, negotiate an extension or options to renew now.',
      'Identify and develop 2–3 key staff who can run the business independently.',
      'Resolve any legal disputes, outstanding ATO debts, or compliance matters.',
      'Move key customer and supplier relationships to formal written contracts.',
      'Work to build or strengthen recurring revenue streams where possible.',
    ],
  },
  {
    label: '6–12 months out',
    title: 'Prepare for market',
    tasks: [
      'Engage Blackmont Advisory for a market appraisal.',
      'Confirm your realistic price expectation with your broker based on current market data.',
      'Begin drafting your Information Memorandum (IM) with your broker.',
      'Refresh your premises: signage, fit-out, cleanliness, and first impressions matter.',
      'Reduce customer concentration if over 40% of revenue sits with one or two clients.',
      'Speak to your financial planner about what you personally need from the sale proceeds.',
      'Review and tidy your online presence: Google reviews, website, and social media',
    ],
  },
  {
    label: '3–6 months out',
    title: 'Engage Blackmont Advisory and go to market',
    tasks: [
      'Sign your engagement agreement with Blackmont Advisory',
      'Finalise your asking price, deal structure (asset vs. share sale), and negotiation floor',
      'Prepare a vendor disclosure statement and warranties with your solicitor',
      'Set up a secure data room with all key business documents ready for buyer due diligence',
      'Ensure all licences, permits, and registrations are current and transferable to a new owner',
      'Agree on a confidentiality protocol: what do staff, suppliers, and customers know, and when?',
      'Brief your solicitor and accountant that a transaction is likely in the near term',
    ],
  },
  {
    label: 'Listed & under offer',
    title: 'Manage the sale process',
    tasks: [
      'Review and approve your final IM and all marketing materials before they go live',
      'Respond promptly to all buyer enquiries, speed signals a motivated, credible seller',
      'Prepare thoroughly for buyer inspections, first impressions significantly impact offers',
      'Review all offers carefully with your broker before responding',
      'Provide due diligence information to serious buyers promptly and professionally',
      'Negotiate through your broker, avoid direct negotiations with buyers at this stage',
      'Congratulate yourself, you have built something genuinely worth buying.',
    ],
  },
];
