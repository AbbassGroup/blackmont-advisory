/**
 * One-time migration script to backfill imSharedAt for old approved enquiries.
 * 
 * Option A: Reset all to today (gives everyone a fresh 30 days)
 * Option B: Set to updatedAt (preserves original timeline)
 * 
 * Run from the backend directory: node scripts/backfill-imSharedAt.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Find all approved enquiries without imSharedAt
  const enquiries = await Enquiry.find({
    ndaStatus: 'approved',
    imSharedAt: { $exists: false }
  });

  console.log(`Found ${enquiries.length} approved enquiries without imSharedAt`);

  for (const eq of enquiries) {
    // Option A: Use updatedAt (preserves original timeline — some may already be expired)
    // const sharedAt = eq.updatedAt;

    // Option B: Use today's date (gives everyone a fresh 30 days from now)
    const sharedAt = new Date();

    await Enquiry.findByIdAndUpdate(eq._id, { imSharedAt: sharedAt });
    console.log(`  Updated ${eq.firstName} ${eq.lastName} (${eq.email}) → imSharedAt: ${sharedAt.toISOString()}`);
  }

  console.log('Migration complete');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
