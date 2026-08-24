const { sendMail } = require('./mailer');
const {
  partyLink,
  actionLink,
  TOKEN_TTL_DAYS,
} = require('./offerTermSheetToken');



const APPROVERS = ['sadeq@blackmontadvisory.com'];

const BRAND = '#1b2535';
const ACCENT = '#c9a84c';

// Reads from the token's own lifetime, so the promise matches what is enforced.
const LINK_NOTE = `This link is personal to you and stays active for ${TOKEN_TTL_DAYS} days.`;

const frontendBase = () =>
  (process.env.FRONTEND_URL || 'https://www.blackmontadvisory.com').replace(/\/$/, '');

const adminLink = (sheet) => `${frontendBase()}/admin/offer-term-sheets/${sheet._id}`;

const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const money = (value) =>
  typeof value === 'number' && Number.isFinite(value) ? AUD.format(value) : '-';

const businessOf = (sheet) => sheet.businessName || 'a business';

const uniqueEmails = (...values) => [
  ...new Set(values.flat().filter(Boolean).map((e) => String(e).toLowerCase())),
];

function settlementText(sheet) {
  if (sheet.settlementMode === 'date' && sheet.settlementDate) {
    return new Date(sheet.settlementDate).toLocaleDateString('en-AU');
  }
  if (sheet.settlementMode === 'weeks' && sheet.settlementWeeks) {
    return `${sheet.settlementWeeks} weeks after the contract is signed`;
  }
  return '-';
}

function offerRows(sheet) {
  return [
    ['Business', sheet.businessName],
    ['Purchase price', money(sheet.purchasePrice)],
    ['Deposit', money(sheet.depositAmount)],
    ['Balance', money(sheet.balanceAmount)],
    ['Settlement', settlementText(sheet)],
  ];
}


const stockText = (sheet) =>
  ({
    plus_sav: '+ Stock at Valuation',
    including_sav: 'Including Stock at Valuation',
  })[sheet.stockTreatment] || '-';

function inclusionsText(sheet) {
  const i = sheet.inclusions || {};
  const list = [];
  if (i.businessName) list.push('Business Name');
  if (i.intellectualProperty) list.push('Intellectual Property');
  if (i.plantAndEquipment) list.push('All Power, Plant & Equipment');
  if (i.goodwill) list.push('Business Goodwill');
  if (i.otherEnabled && i.otherText) list.push(i.otherText);
  return list.length ? list.join(', ') : 'None specified';
}

function subjectToText(sheet) {
  const c = sheet.subjectTo || {};
  const list = [];
  if (c.dueDiligenceEnabled) {
    list.push(`Due Diligence ${c.dueDiligenceDays ?? '-'} days from contract date`);
  }
  if (c.leaseTransfer) list.push('Lease transfer approval');
  if (c.financeApproval) list.push('Finance approval');
  if (c.transitionEnabled) {
    list.push(`Transition & handover support of ${c.transitionWeeks ?? '-'} weeks`);
  }
  if (c.otherEnabled && c.otherText) list.push(c.otherText);
  return list.length ? list.join(' Â· ') : 'No conditions';
}

const signedText = (execution) =>
  execution?.signedAt
    ? `Yes, ${execution.fullName || 'signed'} on ${new Date(execution.signedAt).toLocaleString('en-AU')}`
    : 'Not yet';

// Every field on the letter, so the approver can decide from the email alone.
function fullLetterRows(sheet) {
  return [
    ['Business name', sheet.businessName],
    ['Business address', sheet.businessAddress],
    ['Purchaser name', sheet.purchaserName],
    ['Purchaser email', sheet.purchaserEmail || sheet.buyerInviteEmail],
    ['Vendor name', sheet.vendorName],
    ['Vendor email', sheet.vendorEmail],
    ['Purchase price', money(sheet.purchasePrice)],
    ['Stock', stockText(sheet)],
    ['Deposit', money(sheet.depositAmount)],
    ['Balance', money(sheet.balanceAmount)],
    ['Settlement', settlementText(sheet)],
    ['Inclusions', inclusionsText(sheet)],
    ['Subject to', subjectToText(sheet)],
    ['Purchaser signed', signedText(sheet.purchaserExecution)],
    ['Vendor signed', signedText(sheet.vendorExecution)],
    ['Broker', sheet.brokerEmail],
  ];
}

// Approve / reject straight from the inbox, with no sign-in, no dashboard.
function decisionButtons(sheet) {
  return `
    <div style="margin:28px 0">
      <a href="${actionLink(sheet, 'approve')}" style="display:inline-block;padding:14px 34px;background:${BRAND};color:#fff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:6px;margin-right:10px">Approve</a>
      <a href="${actionLink(sheet, 'reject')}" style="display:inline-block;padding:14px 34px;background:#dc3545;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:6px">Reject</a>
    </div>`;
}

function layout({ heading, intro, rows = [], cta, buttons = '', note }) {
  const rowsHtml = rows.length
    ? `<table style="border-collapse:collapse;width:100%;font-size:14px;margin:20px 0">${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;color:#555;white-space:nowrap">${esc(
            label,
          )}</td><td style="padding:8px 12px;border:1px solid #eee;color:#333">${esc(
            value || '-',
          )}</td></tr>`,
      )
      .join('')}</table>`
    : '';

  const ctaHtml = cta
    ? `<div style="margin:28px 0"><a href="${cta.url}" style="display:inline-block;padding:14px 34px;background:${BRAND};color:#fff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:6px">${esc(
      cta.label,
    )}</a></div>`
    : '';

  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;color:#333">
      <h2 style="color:${BRAND};margin:0 0 12px">${esc(heading)}</h2>
      <p style="margin:0 0 8px;line-height:1.6">${intro}</p>
      ${rowsHtml}
      ${buttons}
      ${ctaHtml}
      ${note ? `<p style="color:#666;font-size:13px;line-height:1.6">${note}</p>` : ''}
      <p style="margin-top:32px;color:#555;font-size:13px;line-height:1.6">
        Regards,<br/>Blackmont Advisory<br/>
        <a href="mailto:info@blackmontadvisory.com" style="color:${ACCENT}">info@blackmontadvisory.com</a><br/>
        <a href="https://www.blackmontadvisory.com" style="color:${ACCENT}">www.blackmontadvisory.com</a>
      </p>
    </div>`;
}

const plain = (intro, rows, ctaUrl) =>
  [
    intro,
    '',
    ...rows.map(([label, value]) => `${label}: ${value || '-'}`),
    ctaUrl ? `\n${ctaUrl}` : '',
    '',
    'Regards,',
    'Blackmont Advisory',
    'info@blackmontadvisory.com',
    'www.blackmontadvisory.com',
  ].join('\n');

// Email must never fail the request that triggered it.
async function dispatch(message) {
  if (!message.to || (Array.isArray(message.to) && !message.to.length)) return;
  try {
    await sendMail(message);
  } catch (error) {
    console.error('Offer term sheet email failed:', message.subject, error.message);
  }
}

// The broker has submitted their part; the approver decides whether it goes out.
function submittedForApproval(sheet) {
  const rows = fullLetterRows(sheet);
  const intro = `A Letter of Intent for <strong>${esc(businessOf(sheet))}</strong> is ready for your approval. Everything on the letter is below. Approve and it is emailed to the buyer straight away.`;

  return dispatch({
    to: APPROVERS,
    subject: `Approval needed: Letter of Intent for ${businessOf(sheet)}`,
    text: plain('A Letter of Intent is ready for your approval.', rows, adminLink(sheet)),
    html: layout({
      heading: 'Approval needed',
      intro,
      rows,
      buttons: decisionButtons(sheet),
      note: `Rejecting sends it back to the broker. You can also <a href="${adminLink(sheet)}" style="color:${BRAND}">open it in the portal</a>.`,
    }),
  });
}

// Approved at the first gate, the buyer states their terms and signs.
function sentToBuyer(sheet) {
  const url = partyLink(sheet, 'buyer');
  const rows = [
    ['Business', sheet.businessName],
    ['Address', sheet.businessAddress],
  ];
  const intro = `You have been invited to submit a Letter of Intent for <strong>${esc(businessOf(sheet))}</strong>. Please complete your offer terms and sign below.`;

  return dispatch({
    to: sheet.buyerInviteEmail,
    subject: `Letter of Intent for ${businessOf(sheet)}`,
    text: plain('You have been invited to submit a Letter of Intent.', rows, url),
    html: layout({
      heading: 'Letter of Intent',
      intro,
      rows,
      cta: { url, label: 'Complete & sign' },
      note: LINK_NOTE,
    }),
  });
}

// The buyer has signed; the approver reviews the terms before the vendor sees them.
function buyerSigned(sheet) {
  const rows = fullLetterRows(sheet);
  const intro = `<strong>${esc(sheet.purchaserName || 'The buyer')}</strong> has signed the Letter of Intent for <strong>${esc(businessOf(sheet))}</strong>. The full terms are below. Approve and it goes to the vendor.`;

  return dispatch({
    to: APPROVERS,
    cc: uniqueEmails(sheet.brokerEmail),
    subject: `Buyer signed: Letter of Intent for ${businessOf(sheet)}`,
    text: plain('The buyer has signed the Letter of Intent.', rows, adminLink(sheet)),
    html: layout({
      heading: 'Buyer has signed',
      intro,
      rows,
      buttons: decisionButtons(sheet),
      note: `Rejecting sends it back to the broker and clears the buyer's signature. You can also <a href="${adminLink(sheet)}" style="color:${BRAND}">open it in the portal</a>.`,
    }),
  });
}

// Approved at the second gate, the vendor accepts and signs.
function sentToVendor(sheet) {
  const url = partyLink(sheet, 'vendor');
  const rows = offerRows(sheet);
  const intro = `An offer has been made for <strong>${esc(businessOf(sheet))}</strong>. Please review the Letter of Intent and, if you accept, sign it below.`;

  return dispatch({
    to: sheet.vendorEmail,
    cc: uniqueEmails(APPROVERS),
    subject: `Offer received: Letter of Intent for ${businessOf(sheet)}`,
    text: plain('An offer has been made for your business.', rows, url),
    html: layout({
      heading: 'Offer received',
      intro,
      rows,
      cta: { url, label: 'Review & sign' },
      note: LINK_NOTE,
    }),
  });
}

// Both parties have signed. `pdf` is attached once PDF generation lands.
function completed(sheet, pdf = null) {
  const rows = offerRows(sheet);
  const intro = `The Letter of Intent for <strong>${esc(businessOf(sheet))}</strong> has been signed by both parties. A copy is attached for your records.`;

  return dispatch({
    to: uniqueEmails(sheet.purchaserEmail, sheet.vendorEmail),
    cc: uniqueEmails(APPROVERS, sheet.brokerEmail),
    subject: `Signed Letter of Intent: ${businessOf(sheet)}`,
    text: plain('The Letter of Intent has been signed by both parties.', rows),
    html: layout({
      heading: 'Letter of Intent signed',
      intro: pdf
        ? intro
        : intro.replace(' A copy is attached for your records.', ''),
      rows,
      note: 'This letter is non-binding until a formal Contract of Sale is executed.',
    }),
    ...(pdf
      ? {
        attachments: [
          {
            filename: pdf.filename || 'Letter-of-Intent.pdf',
            content: Buffer.isBuffer(pdf.content)
              ? pdf.content.toString('base64')
              : pdf.content,
            type: 'application/pdf',
          },
        ],
      }
      : {}),
  });
}

// Sent back to the broker; the note is their only instruction.
function changesRequested(sheet, note) {
  const rows = [
    ['Business', sheet.businessName],
    ['Requested changes', note],
  ];
  const intro = `The Letter of Intent for <strong>${esc(businessOf(sheet))}</strong> has been sent back to you for changes.`;

  return dispatch({
    to: sheet.brokerEmail,
    cc: uniqueEmails(APPROVERS),
    subject: `Changes requested: Letter of Intent for ${businessOf(sheet)}`,
    text: plain('The Letter of Intent has been sent back for changes.', rows, adminLink(sheet)),
    html: layout({
      heading: 'Changes requested',
      intro,
      rows,
      cta: { url: adminLink(sheet), label: 'Open term sheet' },
    }),
  });
}

// A party refused to sign.
function declined(sheet) {
  const who = sheet.declinedBy === 'vendor' ? 'The vendor' : 'The buyer';
  const rows = [
    ['Business', sheet.businessName],
    ['Declined by', sheet.declinedBy === 'vendor' ? sheet.vendorName : sheet.purchaserName],
    ['Reason', sheet.declineReason || 'No reason given'],
  ];
  const intro = `${who} has declined the Letter of Intent for <strong>${esc(businessOf(sheet))}</strong>.`;

  return dispatch({
    to: uniqueEmails(sheet.brokerEmail, APPROVERS),
    subject: `Declined: Letter of Intent for ${businessOf(sheet)}`,
    text: plain(`${who} has declined the Letter of Intent.`, rows, adminLink(sheet)),
    html: layout({
      heading: 'Letter of Intent declined',
      intro,
      rows,
      cta: { url: adminLink(sheet), label: 'Open term sheet' },
    }),
  });
}

// A fault while assembling a message is logged, never thrown into the workflow.
const safe = (name, fn) => (...args) => {
  try {
    return fn(...args);
  } catch (error) {
    console.error(`Offer term sheet email "${name}" failed to build:`, error);
    return Promise.resolve();
  }
};

module.exports = {
  APPROVERS,
  adminLink,
  submittedForApproval: safe('submittedForApproval', submittedForApproval),
  sentToBuyer: safe('sentToBuyer', sentToBuyer),
  buyerSigned: safe('buyerSigned', buyerSigned),
  sentToVendor: safe('sentToVendor', sentToVendor),
  completed: safe('completed', completed),
  changesRequested: safe('changesRequested', changesRequested),
  declined: safe('declined', declined),
};
