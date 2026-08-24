/** Fixed copy for the boilerplate proposal sections. */

export const DISCLAIMER_CONTENT = {
  title: 'Disclaimer - Business Appraisal Report',
  subtitle: 'Conditions of Acceptance',
  paragraphs: [
    'Blackmont Advisory provides this report as an appraisal of your business for information purposes only. This appraisal must not be interpreted or relied upon as a formal valuation under any professional valuation standard. We are not certified valuers.',
    'The information, insights, and estimated market price range provided in this report are based on data provided by you as well as other publicly available sources at the date of this appraisal. Blackmont Advisory endeavours to make all reasonable inquiries but it is not responsible for determining the accuracy or completeness of information provided by you. We make no warranty or representation as to the accuracy, reliability, or completeness of the information contained in this appraisal.',
    'This appraisal has been prepared as a general guide only and reflects our professional opinion at the date of this report, based on our experience, transaction history, market knowledge, and relevant sales data. Market conditions may change at any time, and this appraisal should not be relied upon as a precise, conclusive, or assured measure of value or future business performance.',
    'We strongly recommend that you seek independent professional legal, financial, and accounting advice, and obtain a valuation from a certified valuer before making your decision to sell or purchase this business.',
    'To the extent permitted by law, Blackmont Advisory and its representatives expressly disclaim all liability, whether direct or indirect, arising from or purporting to arise from reliance on the contents of this report.',
  ],
  entityName: 'Blackmont Advisory',
  abn: 'ABN: 78 674 429 255',
  license: 'License (BLA) 092153L',
} as const;

export const APPRAISAL_CONTENT = {
  /**
   * `{businessName}` and `{businessValue}` are replaced at render time with the cover's values — see `renderAppraisalBody` in `appraisal-section.tsx`.
   */
  body:
    'Based on the above data, our research, previous sales data, and market experience suggest that a fair market appraisal in the current climate for {businessName} is within the range of {businessValue}.',
} as const;

export const ABOUT_CONTENT = {
  title: 'About Blackmont Advisory',
  body: 'At Blackmont Advisory, we specialise in the sale and acquisition of businesses across Australia and beyond. As a boutique, senior-led M&A advisory, we represent business owners seeking a premium exit and act as exclusive buyer advocates for those looking to acquire. Our process is private, our network pre-qualified, and our advisors with you from first conversation to settlement.',
  servicesIntro: 'We help Business Owners with the following services:',
  services: [
    'Small Business Sales',
    'Mergers & Acquisitions',
    'Strategic Acquisitions',
    'Business Exit Strategy',
  ],
} as const;

export const CONTACT_CONTENT = {
  title: 'CONTACT US',
  backgroundImage:
    'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1920&q=80',
  email: 'info@blackmontadvisory.com',
  // Left blank deliberately — the live page has had these commented out.
  phone: '',
  address: '',
} as const;
