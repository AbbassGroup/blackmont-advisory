const Listing = require('../models/Listing');

const PREFIX = 'ABB';
const PAD = 3;

/**
 * Generate the next sequential reference ID (ABB001, ABB002, ABB003, ...).
 * Looks up the highest existing ABB-numbered referenceId in the database and
 * increments it. Falls back to ABB001 when none exist yet.
 */
const generateReferenceId = async () => {
  const listings = await Listing.find(
    { referenceId: { $regex: /^ABB\d+$/i } },
    { referenceId: 1, _id: 0 }
  ).lean();

  let maxNum = 0;
  for (const { referenceId } of listings) {
    const num = parseInt(referenceId.slice(PREFIX.length), 10);
    if (Number.isFinite(num) && num > maxNum) maxNum = num;
  }

  const next = maxNum + 1;
  return `${PREFIX}${String(next).padStart(PAD, '0')}`;
};

module.exports = generateReferenceId;
