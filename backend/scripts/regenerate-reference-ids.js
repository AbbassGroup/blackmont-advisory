/**
 * One-off backfill: regenerate every listing's `referenceId` as a random,
 * unique 6-digit value (e.g. ABB482917), replacing the old sequential
 * ABB001/ABB002 IDs.
 *
 * Usage (from the backend/ folder):
 *   node scripts/regenerate-reference-ids.js          # apply changes
 *   node scripts/regenerate-reference-ids.js --dry    # preview only, no writes
 *
 * Reads MONGODB_URI from backend/.env (same as the server).
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/Listing');

const PREFIX = 'ABB';
const DIGITS = 6;
const MIN = 10 ** (DIGITS - 1); // 100000
const MAX = 10 ** DIGITS - 1; // 999999

const DRY_RUN = process.argv.includes('--dry');

/** A random ABB###### not present in `used`. */
function uniqueRef(used) {
  for (let i = 0; i < 50; i++) {
    const num = Math.floor(MIN + Math.random() * (MAX - MIN + 1));
    const candidate = `${PREFIX}${num}`;
    if (!used.has(candidate)) return candidate;
  }
  // Fallback — guaranteed-unique timestamp-based suffix.
  return `${PREFIX}${Date.now().toString().slice(-8)}`;
}

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set (check backend/.env)');
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');

  const listings = await Listing.find({}, { _id: 1, referenceId: 1, title: 1 }).lean();
  console.log(`Found ${listings.length} listing(s).`);

  const used = new Set();
  let updated = 0;

  for (const listing of listings) {
    const next = uniqueRef(used);
    used.add(next);

    const label = listing.title || '(untitled)';
    console.log(`${listing.referenceId || '—'}  ->  ${next}   ${label}`);

    if (!DRY_RUN) {
      await Listing.updateOne({ _id: listing._id }, { $set: { referenceId: next } });
    }
    updated += 1;
  }

  console.log(
    DRY_RUN
      ? `\nDry run complete — ${updated} listing(s) would be updated. No changes written.`
      : `\nDone — regenerated reference IDs for ${updated} listing(s).`,
  );

  await mongoose.disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Backfill failed:', err);
    process.exit(1);
  });
