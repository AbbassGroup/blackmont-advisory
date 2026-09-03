export interface Option {
  label: string;
  pts: number;
  na?: boolean;
}
export interface Question {
  cat: string;
  text: string;
  opts: Option[];
}

export const READINESS_QUESTIONS: Question[] = [
  {
    cat: 'Financial records',
    text: 'Do you have 3 years of clean, accountant-prepared financial statements?',
    opts: [
      { label: 'No, mainly informal or cash-based records', pts: 0 },
      { label: 'Some years are incomplete or unreconciled', pts: 3 },
      { label: 'Yes, mostly clean with minor gaps', pts: 7 },
      {
        label: 'Yes, 3+ years of fully prepared, signed-off financials',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Revenue trend',
    text: 'How has your business revenue trended over the last 3 years?',
    opts: [
      { label: 'Declining significantly', pts: 0 },
      { label: 'Flat or inconsistent year to year', pts: 3 },
      { label: 'Modest, steady growth each year', pts: 7 },
      { label: 'Strong, consistent growth, clear upward trajectory', pts: 10 },
    ],
  },
  {
    cat: 'Owner dependency',
    text: 'Can your business operate normally without you for 4+ weeks?',
    opts: [
      { label: "No, I'm involved in nearly everything day to day", pts: 0 },
      {
        label: "Basic operations could continue but I'd be needed remotely",
        pts: 3,
      },
      { label: 'Yes, mostly. I might need to check in occasionally', pts: 7 },
      { label: 'Yes, completely independently with no input from me', pts: 10 },
    ],
  },
  {
    cat: 'Documented processes',
    text: 'Do you have documented procedures (SOPs) for key operational tasks?',
    opts: [
      { label: "Nothing is documented. It's all in my head", pts: 0 },
      { label: 'A few informal notes or checklists exist', pts: 3 },
      { label: 'Key processes are documented and followed', pts: 7 },
      {
        label: 'A full operations manual or digital SOP system exists',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Customer concentration',
    text: 'What percentage of your revenue comes from your top 3 customers?',
    opts: [
      { label: 'Over 60%, highly concentrated', pts: 0 },
      { label: '40–60%', pts: 3 },
      { label: '20–40%', pts: 7 },
      { label: 'Under 20%, well diversified across many clients', pts: 10 },
    ],
  },
  {
    cat: 'Lease security',
    text: 'What is the current situation with your business premises lease?',
    opts: [
      {
        label: 'Month-to-month or expiring in under 12 months with no options',
        pts: 0,
      },
      { label: 'Less than 2 years remaining, no option to renew', pts: 3 },
      {
        label: '2–5 years remaining or options to renew are available',
        pts: 7,
      },
      {
        label: 'Long-term secure lease in place, or no lease required',
        pts: 10,
      },
      { label: 'N/A', pts: 0, na: true },
    ],
  },
  {
    cat: 'Staff stability',
    text: 'How stable and capable is your current team?',
    opts: [
      { label: 'High turnover, key roles are vacant or unreliable', pts: 0 },
      { label: 'Some instability, a few key people could leave', pts: 3 },
      { label: 'Mostly stable with a reliable, experienced core team', pts: 7 },
      {
        label:
          'Strong, experienced team that can run the business independently',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Profitability',
    text: 'How consistently profitable has your business been in recent years?',
    opts: [
      { label: 'Currently loss-making', pts: 0 },
      { label: 'Break-even or profits are inconsistent year to year', pts: 3 },
      { label: 'Profitable most years with reasonable margins', pts: 7 },
      {
        label: 'Strong, consistent EBITDA with healthy and improving margins',
        pts: 10,
      },
    ],
  },
  {
    cat: 'Legal & compliance',
    text: 'Is your business free of legal disputes, ATO debts, or compliance issues?',
    opts: [
      { label: 'Major unresolved issues exist', pts: 0 },
      { label: 'Minor issues that are being worked through', pts: 3 },
      {
        label: 'Mostly clean, just some minor administrative tidying needed',
        pts: 7,
      },
      { label: 'Completely clean, no issues of any kind', pts: 10 },
    ],
  },
  {
    cat: 'Reason for selling',
    text: 'What best describes your reason for wanting to sell?',
    opts: [
      { label: 'The business is struggling and I need to exit', pts: 0 },
      { label: 'Burnout, health, or unexpected personal pressure', pts: 4 },
      { label: 'Ready for retirement or the next chapter in life', pts: 7 },
      {
        label:
          "The business is performing well. It's simply the right time to exit",
        pts: 10,
      },
    ],
  },
];
