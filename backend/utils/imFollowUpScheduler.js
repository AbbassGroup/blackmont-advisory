const Enquiry = require('../models/Enquiry');
const { sendFollowUpForEnquiry } = require('./imFollowUp');

// Delay before the follow-up is sent after IM approval. 7 days = 10080 minutes.
const DELAY_MINUTES = 10080; // testing: 2
const TICK_MS = 60 * 1000;
const BATCH = 50;

let running = false;

async function processDueFollowUps() {
  if (running) return;
  running = true;
  try {
    const cutoff = new Date(Date.now() - DELAY_MINUTES * 60 * 1000);
    const due = await Enquiry.find({
      ndaStatus: 'approved',
      imRevoked: { $ne: true },
      imSharedAt: { $ne: null, $lte: cutoff },
      imFollowUpSentAt: null,
    })
      .limit(BATCH)
      .exec();

    if (due.length === 0) return;
    console.log(`IM follow-up: processing ${due.length} due enquiry(ies)`);

    for (const enquiry of due) {
      try {
        await sendFollowUpForEnquiry(enquiry);
      } catch (err) {
        // Leave imFollowUpSentAt unset so a transient failure retries next tick.
        console.error('IM follow-up send failed for', String(enquiry._id), '-', err.message);
      }
    }
  } catch (err) {
    console.error('IM follow-up scheduler tick error:', err.message);
  } finally {
    running = false;
  }
}

function startImFollowUpScheduler() {
  console.log(`IM follow-up scheduler started — delay ${DELAY_MINUTES} min, checking every ${TICK_MS / 1000}s`);
  setTimeout(() => processDueFollowUps(), 10 * 1000);
  setInterval(() => processDueFollowUps(), TICK_MS);
}

module.exports = { startImFollowUpScheduler, processDueFollowUps };
