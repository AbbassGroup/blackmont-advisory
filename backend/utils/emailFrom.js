
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Blackmont Advisory';
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'info@blackmontadvisory.com';

function formatFrom(addr) {
  const raw = (addr && String(addr).trim()) || FROM_EMAIL;
  if (raw.includes('<')) return raw;
  return `${FROM_NAME} <${raw}>`;
}

module.exports = { formatFrom, FROM_NAME, FROM_EMAIL };
