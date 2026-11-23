const express = require('express');
const { formatFrom } = require('../utils/emailFrom');
const { sendMail } = require('../utils/mailer');
const router = express.Router();

// POST route for contact form submission
router.post('/', async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      email,
      industryInterest,
      budget,
      timeline,
    } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, contact number, and email are required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    // Email content
    const mailOptions = {
      from: formatFrom(process.env.EMAIL_USER),
      // to: 'mohammadjahid0007@gmail.com',
      to: 'sadeq@blackmontadvisory.com',
      subject: 'New Business Buyers Advocacy Enquiry - Blackmont Advisory',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1b2535; margin: 0;">Blackmont Advisory</h1>
            <h2 style="color: #2c3e50; margin: 10px 0;">Business Buyers Advocacy Enquiry</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 40%;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Contact Number:</td>
                <td style="padding: 8px 0; color: #333;">${contactNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Industry Interest:</td>
                <td style="padding: 8px 0; color: #333;">${industryInterest || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Budget:</td>
                <td style="padding: 8px 0; color: #333;">${budget || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timeline To Buy:</td>
                <td style="padding: 8px 0; color: #333;">${timeline || '—'}</td>
              </tr>
            </table>
          </div>

          
     
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Submitted on: ${new Date().toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })} (Melbourne Time)
            </p>
          </div>
        </div>
      `,
      text: `
        Business Buyers Advocacy Enquiry - Blackmont Advisory

        Contact Information:
        Name: ${name}
        Contact Number: ${contactNumber}
        Email: ${email}
        Industry Interest: ${industryInterest || '—'}
        Budget: ${budget || '—'}
        Timeline To Buy: ${timeline || '—'}

        Submitted on: ${new Date().toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })} (Melbourne Time)
      `
    };

    // Send email
    await sendMail(mailOptions);
    console.log('Email sent successfully');

    // The Nexar CRM push is done by the frontend (components/landing/contact-form.tsx).

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENQUIRY_RECIPIENT = 'sadeq@blackmontadvisory.com';

/**
 * Builds a POST handler that validates name/phone/email and emails the broker a
 * table of the submitted fields. The Nexar CRM push for these forms is done by
 * the frontend, so this only sends the notification.
 *
 * @param {object} cfg
 * @param {string} cfg.title    Heading + subject line, e.g. "Business Sellers Enquiry".
 * @param {(body: object) => {name: string, phone: string, email: string}} cfg.contact
 * @param {(body: object) => Array<[string, unknown]>} cfg.rows  Label/value rows for the email.
 */
function enquiryEmailHandler({ title, contact, rows: buildRows }) {
  return async (req, res) => {
    try {
      const body = req.body || {};
      const { name, phone, email } = contact(body);

      if (!name || !phone || !email) {
        return res.status(400).json({
          success: false,
          message: 'Name, phone number, and email are required fields'
        });
      }
      if (!EMAIL_RE.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }

      const rows = buildRows(body).map(([label, value]) => [label, String(value ?? '').trim()]);
      const submittedOn = new Date().toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      await sendMail({
        from: formatFrom(process.env.EMAIL_USER),
        to: ENQUIRY_RECIPIENT,
        replyTo: email,
        subject: `New ${title} - Blackmont Advisory`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1b2535; margin: 0;">Blackmont Advisory</h1>
              <h2 style="color: #2c3e50; margin: 10px 0;">${escapeHtml(title)}</h2>
            </div>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #2c3e50; margin-top: 0;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${rows.map(([label, value]) => `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 40%; vertical-align: top;">${escapeHtml(label)}:</td>
                  <td style="padding: 8px 0; color: #333; white-space: pre-wrap;">${escapeHtml(value) || '—'}</td>
                </tr>`).join('')}
              </table>
            </div>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">Submitted on: ${submittedOn} (Melbourne Time)</p>
            </div>
          </div>
        `,
        text: [
          `${title} - Blackmont Advisory`,
          '',
          'Contact Information:',
          ...rows.map(([label, value]) => `${label}: ${value || '—'}`),
          '',
          `Submitted on: ${submittedOn} (Melbourne Time)`,
        ].join('\n'),
      });

      res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error(`Error sending ${title} email:`, error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form. Please try again later.'
      });
    }
  };
}

// POST /seller — "Sell a business" enquiry (components/landing/contact-form.tsx).
router.post('/seller', enquiryEmailHandler({
  title: 'Business Sellers Enquiry',
  contact: (b) => ({ name: b.name, phone: b.phone, email: b.email }),
  rows: (b) => [
    ['Name', b.name],
    ['Phone Number', b.phone],
    ['Email', b.email],
    ['Industry', b.industry],
    ['Location', b.location],
    ['Annual Turnover', b.turnover],
    ['Comments', b.comments],
  ],
}));

// POST /consultation — "Schedule a confidential call" (app/(public)/exit/_components/get-started.tsx).
router.post('/consultation', enquiryEmailHandler({
  title: 'Confidential Call Request',
  contact: (b) => ({ name: b.name, phone: b.phone, email: b.email }),
  rows: (b) => [
    ['Name', b.name],
    ['Phone Number', b.phone],
    ['Email', b.email],
    ['Industry', b.industry],
    ['Location', b.location],
    ['Annual Turnover', b.turnover],
    ['Comments', b.comments],
    ['Preferred Call Time', b.preferredTime],
    ['Requested From', b.resource],
  ],
}));

// POST /acquisition-interest — "Register your interest" on the $5M acquisition page
// (app/(public)/listings/_components/acquisition-interest-form.tsx).
router.post('/acquisition-interest', enquiryEmailHandler({
  title: 'Acquisition Interest Registration',
  contact: (b) => ({ name: `${b.firstName || ''} ${b.lastName || ''}`.trim(), phone: b.mobile, email: b.email }),
  rows: (b) => [
    ['Name', `${b.firstName || ''} ${b.lastName || ''}`],
    ['Mobile', b.mobile],
    ['Email', b.email],
    ['Industry Preference', b.industryPreference],
    ['Purchase Price Range', b.purchasePriceRange],
    ['EBITDA Requirements', b.ebitdaRequirements],
    ['Location Preference', b.locationPreference],
    ['Comments', b.comments],
  ],
}));

router.post('/partnership', async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      email,
      agencyName,
    } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, contact number, and email are required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    // Email content
    const mailOptions = {
      from: formatFrom(process.env.EMAIL_USER),
      // to: 'mohammadjahid0007@gmail.com',
      to: 'sadeq@blackmontadvisory.com',
      subject: 'New Partnership Inquiry - Blackmont Advisory',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1b2535; margin: 0;">Blackmont Advisory</h1>
            <h2 style="color: #2c3e50; margin: 10px 0;">New Partnership Inquiry</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 40%;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Contact Number:</td>
                <td style="padding: 8px 0; color: #333;">${contactNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Agency Name:</td>
                <td style="padding: 8px 0; color: #333;">${agencyName}</td>
              </tr>
            </table>
          </div>

          
     
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Submitted on: ${new Date().toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })} (Melbourne Time)
            </p>
          </div>
        </div>
      `,
      text: `
        New Partnership Inquiry - Blackmont Advisory
        
        Contact Information:
        Name: ${name}
        Contact Number: ${contactNumber}
        Email: ${email}
        Agency Name: ${agencyName}
        
        Submitted on: ${new Date().toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })} (Melbourne Time)
      `
    };

    // Send email
    await sendMail(mailOptions);

    console.log('Email sent successfully');
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});


module.exports = router;
