


const OFFICE_ADDRESS = '1/459 Toorak Road, Toorak, VIC 3142';
const LICENCE = '(BLA) 092153L';

export const BRAND = {
  tradingName: 'Blackmont Advisory',
  /** The party named on the letter as the Vendor's Agent. */
  legalEntity: 'Abbass Advocacy Pty Ltd T/A Blackmont Advisory',
  acn: '674 429 255',
  abn: '78 674 429 255',
  licence: LICENCE,
  address: OFFICE_ADDRESS,
  // Blackmont has no phone number; email is the only contact point.
  email: 'info@blackmontadvisory.com',
  website: 'www.blackmontadvisory.com',
  /** Dark wordmark, for the letterhead on a light page. */
  logo: '/assets/blackmont.png',
  logoWidth: 2332,
  logoHeight: 414,
} as const;

/** The trust account the deposit is paid into. */
export const TRUST_ACCOUNT = `${BRAND.legalEntity} Trust Account`;

/** Footer strip beneath the letter. */
export const FOOTER_RIGHT = `ABN: ${BRAND.abn} · License ${BRAND.licence}`;

export const DISCLAIMER =
  `The parties to this Letter of Intent acknowledge that ${BRAND.legalEntity} ` +
  '(including its directors, agents, agent representatives or employees) does not make any claim or ' +
  'accept any liability to any person or entity arising howsoever out of these figures and details, nor ' +
  'does it warrant or represent that the said figures and information are correct. All documents, figures ' +
  'and information are supplied by the Vendor. The Purchaser acknowledges that it has not relied on any ' +
  'representation or statement made except those contained in this contract, and any queries should be ' +
  'raised with the Vendor.';
