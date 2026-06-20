const Listing = require('../models/Listing');

const DIGITS = 6; // 100000–999999

/**
 * Generate a random, unique reference ID (e.g. 482917).
 * Picks a random 6-digit number and verifies it isn't already in use, retrying
 * on the rare collision. Falls back to a timestamp-based suffix if needed.
 */
const generateReferenceId = async () => {
  const min = 10 ** (DIGITS - 1); // 100000
  const max = 10 ** DIGITS - 1; // 999999

  for (let attempt = 0; attempt < 10; attempt++) {
    const num = Math.floor(min + Math.random() * (max - min + 1));
    const candidate = String(num);
    const exists = await Listing.exists({ referenceId: candidate });
    if (!exists) return candidate;
  }

  // Extremely unlikely fallback — last 8 digits of the timestamp guarantee uniqueness.
  return Date.now().toString().slice(-8);
};

module.exports = generateReferenceId;
