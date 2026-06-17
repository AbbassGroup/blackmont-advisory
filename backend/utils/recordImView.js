const ImNotificationPref = require("../models/ImNotificationPref");
const ImViewLog = require("../models/ImViewLog");
const Listing = require("../models/Listing");
const { createImViewedEmail } = require("./emailTemplates");
const fetchBusinessNames = require("./fetchBusinessNames");
const sendEmail = require("./sendEmail");

// type: 'view' (default) = an actual IM open; 'grant' = an access-granted
// placeholder created at approval (shows the person in history with 0 views).
function recordImView({ listingId, enquiry, accessDenied, userAgent, type = 'view' }) {
  const prospectName = `${enquiry.firstName || ''} ${enquiry.lastName || ''}`.trim();

  ImViewLog.create({
    listingId,
    enquiryId: enquiry._id,
    email: enquiry.email,
    name: prospectName,
    userAgent,
    accessDenied,
    type,
  }).catch((err) => console.error('IM view log error:', err.message));

  // Access grants aren't views — don't send "IM viewed" notifications for them.
  if (type === 'grant') return;

  // Fire-and-forget: send IM view notification emails to opted-in brokers.
  (async () => {
    try {
      const prefs = await ImNotificationPref.find({ listingId, enabled: true }).lean();
      if (prefs.length === 0) return;

      // Resolve the exact business name — fetch listing if not already loaded.
      const listing = await Listing.findById(listingId).lean();
      let businessName = listing?.title || 'Unknown Business';
      if (listing?.deal) {
        try {
          const names = await fetchBusinessNames([listing.deal]);
          if (names.length > 0) businessName = names[0].businessName || businessName;
        } catch (e) {
          console.error('IM notification: failed to fetch business name:', e.message);
        }
      }

      for (const pref of prefs) {
        const tz = pref.timezone || 'Australia/Melbourne';
        const timeOpened = new Date().toLocaleString('en-AU', {
          timeZone: tz,
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        const emailData = createImViewedEmail({
          prospectName,
          businessName,
          timeOpened,
          brokerEmail: pref.brokerEmail,
          accessDenied,
        });

        sendEmail(emailData).catch((err) =>
          console.error(`IM notification email failed for ${pref.brokerEmail}:`, err.message)
        );
      }
    } catch (err) {
      console.error('IM notification error:', err.message);
    }
  })();
}

module.exports = recordImView;