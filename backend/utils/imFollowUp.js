const jwt = require('jsonwebtoken');
const Enquiry = require('../models/Enquiry');
const Listing = require('../models/Listing');
const ImTemplate = require('../models/ImTemplate');
const { sendMail } = require('./mailer');

// Post-approval IM follow-up email. Works for both IM kinds — the kind only
// changes how we resolve the broker + business name.

const FROM = process.env.SENDGRID_FROM || process.env.EMAIL_FROM || 'info@blackmontadvisory.com';
const TEAL = '#56C1BC';

function backendBase() {
  return (process.env.BACKEND_URL || 'http://localhost:5005').replace(/\/$/, '');
}
function frontendBase() {
  return (process.env.FRONTEND_URL || 'https://www.abbass.com.au/businessbrokers').replace(/\/$/, '');
}

function signInterestToken(enquiryId) {
  return jwt.sign(
    { enquiryId: String(enquiryId), kind: 'im-follow-up-interested' },
    process.env.JWT_SECRET,
    { expiresIn: '60d' },
  );
}

// Resolve broker(s) + business name for an approved enquiry. The broker(s) to
// notify are always the LISTING's assigned brokers (same recipients as the NDA
// approval flow) — for a template IM we only borrow the template's businessName.
// Returns null if it can't be resolved (no listingId / deleted listing).
async function resolveFollowUpContext(enquiry) {
  const listingId = enquiry.listingId || enquiry.additionalData?.listingId;
  if (!listingId) return null;

  const listing = await Listing.findById(listingId).lean();
  if (!listing) return null;

  let businessName = enquiry.additionalData?.businessTitle || listing.title || 'the business';
  if (listing.imTemplateId) {
    const template = await ImTemplate.findById(listing.imTemplateId).lean();
    if (template?.businessName) businessName = template.businessName;
  }

  const brokerEmails = (listing.brokers || []).map((b) => b.email).filter(Boolean);
  const brokerName = listing.brokers?.[0]?.name || '';

  return { listing, listingId: String(listingId), businessName, brokerEmails, brokerName };
}

// The check-in email sent to the prospect.
function buildFollowUpEmail({ enquiry, businessName, brokerName, interestedUrl, browseUrl }) {
  const firstName = enquiry.firstName || 'there';
  const signatureName = brokerName || 'Blackmont Advisory';
  const subject = `${firstName}, what did you think of ${businessName}?`;

  const text =
    `Hi ${firstName},\n\n` +
    `You recently enquired about a business opportunity. We're checking in to see if we can assist further.\n\n` +
    `Interested | Please provide more information:\n${interestedUrl}\n\n` +
    `Not Suitable | Help me find another business:\n${browseUrl}\n\n` +
    `${signatureName}\nBlackmont Advisory\n(03) 9103 1317\ninfo@blackmontadvisory.com\nwww.abbass.com.au/businessbrokers`;

  const btn = 'display:block;width:360px;max-width:100%;box-sizing:border-box;text-align:center;padding:11px 16px;font-size:14px;font-weight:bold;text-decoration:none;border-radius:6px';
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#333">
      <p>Hi ${firstName},</p>
      <p>You recently enquired about a business opportunity. We're checking in to see if we can assist further.</p>
      <p style="margin:20px 0 12px">
        <a href="${interestedUrl}" style="${btn};background:${TEAL};color:#fff">Interested | Please provide more information</a>
      </p>
      <p style="margin:0 0 20px">
        <a href="${browseUrl}" style="${btn};background:#fff;color:${TEAL};border:1px solid ${TEAL}">Not Suitable | Help me find another business</a>
      </p>
      <p style="margin-top:28px">${signatureName}<br/>Blackmont Advisory<br/>(03) 9103 1317<br/><a href="mailto:info@blackmontadvisory.com">info@blackmontadvisory.com</a><br/><a href="https://www.abbass.com.au/businessbrokers">www.abbass.com.au/businessbrokers</a></p>
    </div>`;

  return { to: enquiry.email, from: FROM, subject, text, html };
}

// Email to the listing broker when the prospect clicks "Interested".
function buildBrokerInterestEmail({ enquiry, businessName, brokerEmails }) {
  const firstName = enquiry.firstName || 'A prospect';
  const fullName = `${enquiry.firstName || ''} ${enquiry.lastName || ''}`.trim() || firstName;
  const subject = `${firstName} has requested more information on ${businessName}`;

  const text =
    `${firstName} has requested more information on ${businessName}.\n\n` +
    `Contact details:\nName: ${fullName}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone || '—'}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#333">
      <p><strong>${firstName}</strong> has requested more information on <strong>${businessName}</strong>.</p>
      <p>
        <strong>Contact details</strong><br/>
        Name: ${fullName}<br/>
        Email: <a href="mailto:${enquiry.email}">${enquiry.email}</a><br/>
        Phone: ${enquiry.phone || '—'}
      </p>
      <p style="color:#999;font-size:12px;margin-top:24px">Sent automatically by the Blackmont Advisory IM follow-up.</p>
    </div>`;

  return { to: brokerEmails, from: FROM, subject, text, html };
}

// Send the follow-up for one enquiry and stamp imFollowUpSentAt. Unresolvable
// enquiries are stamped without emailing so the scheduler stops retrying them.
async function sendFollowUpForEnquiry(enquiry) {
  const ctx = await resolveFollowUpContext(enquiry);
  if (!ctx || ctx.brokerEmails.length === 0) {
    enquiry.imFollowUpSentAt = new Date();
    await enquiry.save();
    console.warn('IM follow-up skipped (unresolvable) for enquiry', String(enquiry._id));
    return false;
  }

  const interestedUrl = `${backendBase()}/api/im-follow-up/interested?token=${signInterestToken(enquiry._id)}`;
  const browseUrl = `${frontendBase()}/buy-a-business`;

  const msg = buildFollowUpEmail({
    enquiry,
    businessName: ctx.businessName,
    brokerName: ctx.brokerName,
    interestedUrl,
    browseUrl,
  });

  await sendMail(msg);
  enquiry.imFollowUpSentAt = new Date();
  await enquiry.save();
  console.log('IM follow-up sent to', enquiry.email, '-', ctx.businessName);
  return true;
}

// Branded HTML confirmation page (mirrors the NDA approve/reject pages).
function actionPage(title, message, color) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head>
  <body style="font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f4f4f4">
    <div style="background:#fff;padding:48px 40px;border-radius:10px;box-shadow:0 2px 16px rgba(0,0,0,.08);text-align:center;max-width:440px">
      <div style="font-size:56px;margin-bottom:16px">${color === 'green' ? '✅' : '❌'}</div>
      <h2 style="color:${color === 'green' ? '#28a745' : '#dc3545'};margin-bottom:8px">${title}</h2>
      <p style="color:#555;font-size:15px;line-height:1.6">${message}</p>
      <p style="color:#999;font-size:12px;margin-top:32px">Blackmont Advisory</p>
    </div>
  </body></html>`;
}

module.exports = {
  resolveFollowUpContext,
  buildFollowUpEmail,
  buildBrokerInterestEmail,
  sendFollowUpForEnquiry,
  signInterestToken,
  actionPage,
};
