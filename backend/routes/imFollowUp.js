const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Enquiry = require('../models/Enquiry');
const { sendMail } = require('../utils/mailer');
const {
  resolveFollowUpContext,
  buildBrokerInterestEmail,
  actionPage,
} = require('../utils/imFollowUp');

// GET /api/im-follow-up/interested?token=... — prospect clicked "Interested".
// Emails the listing broker and shows a confirmation page; repeat clicks don't
// re-email. ("Not suitable" is a plain link to /buy-a-business, no route needed.)
router.get('/interested', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send(actionPage('Invalid Link', 'No token provided.', 'red'));

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).send(actionPage('Link Expired', 'This link has expired or is no longer valid.', 'red'));
    }
    if (payload.kind !== 'im-follow-up-interested' || !payload.enquiryId) {
      return res.status(400).send(actionPage('Invalid Link', 'This link is not valid.', 'red'));
    }

    const enquiry = await Enquiry.findById(payload.enquiryId);
    if (!enquiry) return res.status(404).send(actionPage('Not Found', 'We could not find your enquiry.', 'red'));

    const ctx = await resolveFollowUpContext(enquiry);
    const businessName = ctx?.businessName || 'this business';
    const name = enquiry.firstName ? `${enquiry.firstName}, ` : '';

    // Already requested — don't email the broker again.
    if (enquiry.imFollowUpInterestedAt) {
      return res.send(actionPage(
        'Request Received',
        `Thanks ${name}your request for more information on <strong>${businessName}</strong> has already been sent to the broker. They'll be in touch soon.`,
        'green',
      ));
    }

    if (ctx && ctx.brokerEmails.length) {
      const msg = buildBrokerInterestEmail({ enquiry, businessName, brokerEmails: ctx.brokerEmails });
      await sendMail(msg);
    } else {
      console.warn('IM follow-up "interested": no broker to notify for enquiry', String(enquiry._id));
    }

    enquiry.imFollowUpInterestedAt = new Date();
    await enquiry.save();

    return res.send(actionPage(
      'Request Received',
      `Thanks ${name}we've let the broker know you'd like more information on <strong>${businessName}</strong>. They'll be in touch soon.`,
      'green',
    ));
  } catch (err) {
    console.error('IM follow-up interested error:', err.message);
    return res.status(500).send(actionPage('Error', 'Something went wrong. Please try again.', 'red'));
  }
});

module.exports = router;
