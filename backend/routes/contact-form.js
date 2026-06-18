const express = require('express');
const { sendMail } = require('../utils/mailer');
const router = express.Router();


// POST route for contact form submission
router.post('/', async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      email,
      budget,
      industryPreference,
      timelineToBuy
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
      from: process.env.EMAIL_USER,
      // to: 'mohammadjahid0007@gmail.com',
      to: 'sadeq@abbass.group',
      subject: 'New Business Buying Inquiry - Blackmont Advisory',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #56C1BC; margin: 0;">Blackmont Advisory</h1>
            <h2 style="color: #2c3e50; margin: 10px 0;">New Business Buying Inquiry</h2>
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
            </table>
          </div>

          <div style="background-color: #f0fffe; padding: 20px; border-radius: 8px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Business Requirements</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 40%;">Budget:</td>
                <td style="padding: 8px 0; color: #333;">${budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Industry Preference:</td>
                <td style="padding: 8px 0; color: #333;">${industryPreference || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timeline to Buy:</td>
                <td style="padding: 8px 0; color: #333;">${timelineToBuy || 'Not specified'}</td>
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
        New Business Buying Inquiry - Blackmont Advisory
        
        Contact Information:
        Name: ${name}
        Contact Number: ${contactNumber}
        Email: ${email}
        
        Business Requirements:
        Budget: ${budget || 'Not specified'}
        Industry Preference: ${industryPreference || 'Not specified'}
        Timeline to Buy: ${timelineToBuy || 'Not specified'}
        
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
