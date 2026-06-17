const express = require('express');
const router = express.Router();
const { sendMail } = require('../utils/mailer');
const Enquiry = require('../models/Enquiry');
const { default: axios } = require('axios');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const adminEmail = 'info@abbass.group';
  const fromEmail = 'info@abbass.group';

  const mailOptions = {
    to: adminEmail,
    from: fromEmail,
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nSubject: ${subject}\nMessage: ${message}`,
    html: `<h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || ''}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
  };

  try {
    // Save to enquiry database
    const enquiry = new Enquiry({
      name: name,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone: phone || null,
      email: email,
      subject: subject,
      message: message,
      source: 'Contact Form'
    });
    await enquiry.save();

    // Send email
    await sendMail(mailOptions);

    const nexarApi = process.env.NEXAR_API_URL || 'https://api.nexartechnologies.com/api/v1';
    try {
      await axios.post(`${nexarApi}/deals/create/integration`, {
        name: name,
        stage: 'Enquiry',
        businessUnit: 'Business Brokers',
        office: 'Head Office',
        phone,
        email,
        comments: `Subject: ${subject} Message:${message}`,
        leadSource: 'Contact Form'
      });
    } catch (err) {
      console.error('External API error:', err.response?.data || err.message);
    }

    res.json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error('Contact form error:', err.response?.body?.errors || err);
    res.status(500).json({ error: 'Failed to send email', details: err.response?.body?.errors || err.message });
  }
});

module.exports = router; 
