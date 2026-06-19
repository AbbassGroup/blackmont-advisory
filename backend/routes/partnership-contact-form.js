const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { formatFrom } = require('../utils/emailFrom');
const router = express.Router();


const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

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

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: formatFrom(process.env.EMAIL_USER),
      to: 'mohammadjahid0007@gmail.com',
      // to: 'sadeq@blackmontadvisory.com',
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
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    // {
    //     stage: 'Enquiry', //
    //     email: form.email, //
    //     phone: form.phone,//
    //     typeOfBusiness: form.industry,
    //     location: form.location,
    //     comments: mergedComments,
    //     ...(form.name.trim() ? { name: form.name.trim() } : {}),
    //   }

    // Post submission to Nexar contacts API (best-effort)
    const prospectData = {
      stage: 'Enquiry',
      name: name,
      phone: contactNumber,
      email: email,
      industry: industryInterest,
      budget: budget,
      timeline: timeline,
      businessUnit: 'Business Buyers',
    };

    const nexarApi = process.env.NEXAR_API_URL || 'https://blackmont-api.nexartechnologies.com';

    try {
      await axios.put(`${nexarApi}/deals/update/by-email`, prospectData, {
        headers: {
          'Authorization': `Bearer businessbrokersecret`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Nexar contact created successfully');
    } catch (nexarError) {
      console.error('Nexar contact create error:', nexarError.response?.data || nexarError.message);
    }

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

    const transporter = createTransporter();

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
    await transporter.sendMail(mailOptions);

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
