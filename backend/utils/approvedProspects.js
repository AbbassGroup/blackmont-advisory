const Enquiry = require('../models/Enquiry');

// Nexar has no concept of NDA approval (contacts are pushed at CA submission,
// before any decision), so join its prospect list to Enquiry.ndaStatus on email.

// Emails with an approved CA for this listing, lowercased.
async function approvedProspectEmails(listingId) {
  const approved = await Enquiry.find(
    { listingId, source: 'Confidentiality Agreement', ndaStatus: 'approved' },
    { email: 1 },
  ).lean();

  return new Set(
    approved.map((e) => (e.email || '').toLowerCase().trim()).filter(Boolean),
  );
}

// Drop prospects without an approved CA. No email = no match = excluded.
async function filterApprovedProspects(listingId, prospects) {
  const allowed = await approvedProspectEmails(listingId);
  return (prospects || []).filter((p) =>
    allowed.has((p?.email || '').toLowerCase().trim()),
  );
}

module.exports = { approvedProspectEmails, filterApprovedProspects };
