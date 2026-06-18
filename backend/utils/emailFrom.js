// Single source of truth for the email "From" display name across the site.
// Wraps a bare address (e.g. info@blackmontadvisory.com) as "ABBASS Group <info@blackmontadvisory.com>".
// Idempotent: if the address already has a display name ("Name <email>"), it's left as-is.

const FROM_NAME = process.env.EMAIL_FROM_NAME || 'ABBASS Group';
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'info@blackmontadvisory.com';

function formatFrom(addr) {
  const raw = (addr && String(addr).trim()) || FROM_EMAIL;
  if (raw.includes('<')) return raw;
  return `${FROM_NAME} <${raw}>`;
}

module.exports = { formatFrom, FROM_NAME, FROM_EMAIL };
