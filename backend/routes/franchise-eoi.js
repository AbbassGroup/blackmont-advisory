const express = require('express');
const router = express.Router();
const { sendMail } = require('../utils/mailer');
const Enquiry = require('../models/Enquiry');
const { default: axios } = require('axios');


// POST /api/franchise-eoi
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    // Save to enquiry database
    const enquiry = new Enquiry({
      name: name,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone: phone,
      email: email,
      message: message,
      source: 'Franchise Form',
      additionalData: {
        submittedVia: 'JoinABBASS page'
      }
    });
    await enquiry.save();

    // Send email to admin team
    const adminMsg = {
      to: [
        'Sadeq@abbass.group',
        'Asif.ahammed@abbass.group',
        'Hicham.nahas@abbass.group',
        'Freddie.wong@abbass.group',
        'Christine.lamani@abbass.group',
        'igor.vasiliev@abbass.group'
      ],
      from: process.env.SENDGRID_FROM || 'info@abbass.group',
      subject: 'New Franchise EOI Submission',
      text: `New Franchise Expression of Interest\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message || 'No message provided'}`,
      html: `
        <h2>New Franchise Expression of Interest</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, '<br/>') : 'No message provided'}</p>
        <hr/>
        <p><em>Submitted via JoinABBASS page</em></p>
      `
    };

    await sendMail(adminMsg);

    // Send confirmation email to applicant
    const confirmationMsg = {
      to: email,
      from: process.env.SENDGRID_FROM || 'info@abbass.group',
      subject: 'Thank you for your EOI - ABBASS Business Brokers',
      text: `Hi ${name},\n\nThank you for your Expression of Interest in becoming an ABBASS Business Broker.\n\nWe have received your application and will review it carefully. One of our team members will be in touch with you soon to discuss the next steps.\n\nIn the meantime, feel free to explore our website to learn more about our business brokerage services.\n\nBest regards,\nThe ABBASS Team\n\nABBASS Business Brokers\ninfo@abbass.group\n(03) 9103 1317`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your Expression of Interest in becoming an ABBASS Business Broker.</p>
        <p>We have received your application and will review it carefully. One of our team members will be in touch with you soon to discuss the next steps.</p>
        <p>In the meantime, feel free to explore our website to learn more about our business brokerage services.</p>
        <p>Best regards,<br/>
        The ABBASS Team</p>
        <hr/>
        <p><strong>ABBASS Business Brokers</strong><br/>
        <a href="mailto:info@abbass.group">info@abbass.group</a><br/>
        (03) 9103 1317</p>
      `
    };

    await sendMail(confirmationMsg);

    const nexarApi = process.env.NEXAR_API_URL || 'https://api.nexartechnologies.com/api/v1';
    try {
      await axios.post(`${nexarApi}/deals/create/integration`, {
        name: name,
        stage: 'Enquiry',
        businessUnit: 'ABBASS Group',
        office: 'Head Office',
        phone,
        email,
        comments: `Message:${message}`,
        leadSource: 'Franchise Form'
      });
    } catch (err) {
      console.error('External API error:', err.response?.data || err.message);
    }

    res.json({ message: 'EOI submitted successfully' });
  } catch (err) {
    console.error('Franchise EOI submission error:', err.response?.body?.errors || err);
    res.status(500).json({
      error: 'Failed to submit EOI',
      details: err.response?.body?.errors || err.message
    });
  }
});

module.exports = router; 
