const express = require('express');
const router = express.Router();
const ValuationRequest = require('../models/ValuationRequest');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/mailer');
const { default: axios } = require('axios');

// POST /api/valuations - public
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, comments } = req.body;
    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const request = new ValuationRequest({ firstName, lastName, phone, email });
    await request.save();

    // Prepare promises for parallel execution
    const adminEmailPromise = (async () => {
      const msg = {
        to: 'info@blackmontadvisory.com',
        from: 'info@blackmontadvisory.com',
        subject: 'New Business Valuation Request',
        html: `<h2>New Business Valuation Request</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>`
      };
      try {
        await sendMail(msg);
      } catch (err) {
        console.error('Email error:', err.message || err);
      }
    })();



    const integrationPromise = (async () => {
      const nexarApi = process.env.NEXAR_API_URL || 'https://blackmont-api.nexartechnologies.com';
      try {
        await axios.post(`${nexarApi}/deals/create/integration`, {
          name: `${firstName} ${lastName}`,
          stage: 'Enquiry',
          businessUnit: 'Business Brokers',
          office: 'Head Office',
          phone,
          email,
          comments
        });
      } catch (err) {
        console.error('External API error:', err.response?.data || err.message);
      }
    })();

    // Execute all operations in parallel
    await Promise.allSettled([adminEmailPromise, integrationPromise]);

    res.status(201).json({ message: 'Request submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;