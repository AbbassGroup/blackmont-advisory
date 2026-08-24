// Every Blackmont detail that appears on a Letter of Intent. The PDF and the
// notification emails read from here so they cannot drift apart.
//
// frontend/components/offer-term-sheet/brand.ts is the client mirror used by the
// web letter — the two apps deploy separately and share no package, so change
// them together.

// TODO(blackmont): confirm the office address and the estate agent licence
// number. Both are carried over from the Abbass Advocacy trading entity and are
// not published anywhere on the Blackmont site.
const OFFICE_ADDRESS = '1/459 Toorak Road, Toorak, VIC 3142';
const LICENCE = '(BLA) 092153L';

const BRAND = {
  tradingName: 'Blackmont Advisory',
  // The party named on the letter as the Vendor's Agent.
  legalEntity: 'Abbass Advocacy Pty Ltd T/A Blackmont Advisory',
  acn: '674 429 255',
  abn: '78 674 429 255',
  licence: LICENCE,
  address: OFFICE_ADDRESS,
  phone: '(03) 9103 1317',
  email: 'info@blackmontadvisory.com',
  website: 'www.blackmontadvisory.com',
};

// The trust account the deposit is paid into.
BRAND.trustAccount = `${BRAND.legalEntity} Trust Account`;

// Footer strip on every page of the PDF.
BRAND.footerLeft = BRAND.tradingName;
BRAND.footerRight = `ABN: ${BRAND.abn} - License ${BRAND.licence}`;

BRAND.disclaimer =
  `The parties to this Letter of Intent acknowledge that ${BRAND.legalEntity} ` +
  '(including its directors, agents, agent representatives or employees) does not make any claim or ' +
  'accept any liability to any person or entity arising howsoever out of these figures and details, nor ' +
  'does it warrant or represent that the said figures and information are correct. All documents, figures ' +
  'and information are supplied by the Vendor. The Purchaser acknowledges that it has not relied on any ' +
  'representation or statement made except those contained in this contract, and any queries should be ' +
  'raised with the Vendor.';

module.exports = BRAND;
