const express = require('express');
const router = express.Router();
const { sendMail } = require('../utils/mailer');
const Enquiry = require('../models/Enquiry');


router.post('/', async (req, res) => {
  try {
    const {
      purchaserName, purchaserEmail, purchaserPhone, purchaserAddress, purchaserCity, purchaserState, purchaserPostcode, purchaserCountry,
      businessName, businessCity, businessState,
      purchasePrice, depositValue, balanceOfPurchase,
      settlementDate, weeksFromContract, subjectTo,
      solicitorName, solicitorEmail, solicitorPhone, solicitorAddress, solicitorCity, solicitorState, solicitorPostcode
    } = req.body;

    // Save to enquiry database
    const enquiry = new Enquiry({
      name: purchaserName,
      firstName: purchaserName?.split(' ')[0] || '',
      lastName: purchaserName?.split(' ').slice(1).join(' ') || '',
      phone: purchaserPhone || '',
      email: purchaserEmail || '',
      source: 'Listing EOI',
      additionalData: {
        businessName,
        businessCity,
        businessState,
        purchasePrice,
        depositValue,
        balanceOfPurchase,
        settlementDate,
        weeksFromContract,
        subjectTo,
        solicitor: {
          name: solicitorName,
          email: solicitorEmail,
          phone: solicitorPhone,
          address: solicitorAddress,
          city: solicitorCity,
          state: solicitorState,
          postcode: solicitorPostcode
        },
        purchaserAddress: {
          address: purchaserAddress,
          city: purchaserCity,
          state: purchaserState,
          postcode: purchaserPostcode,
          country: purchaserCountry
        }
      }
    });
    await enquiry.save();

    // Send email
    const msg = {
      to: 'info@abbass.group',
      from: 'info@abbass.group',
      subject: 'New EOI Form Submission',
      html: `<h1>New EOI Form Submission</h1><h2>Purchaser Details:</h2><p>Name: ${purchaserName}<br>Email: ${purchaserEmail}<br>Phone: ${purchaserPhone}<br>Address: ${purchaserAddress}<br>City: ${purchaserCity}<br>State: ${purchaserState}<br>Postcode: ${purchaserPostcode}<br>Country: ${purchaserCountry}</p><h2>Business Details:</h2><p>Name: ${businessName}<br>City: ${businessCity}<br>State: ${businessState}</p><h2>Price Details:</h2><p>Purchase Price: ${purchasePrice}<br>Deposit Value: ${depositValue}<br>Balance Of Purchase: ${balanceOfPurchase}</p><h2>Settlement Date:</h2><p>Date: ${settlementDate}<br>Weeks From Contract: ${weeksFromContract}</p><h2>Subject To:</h2><p>${subjectTo}</p><h2>Solicitor Details:</h2><p>Name: ${solicitorName}<br>Email: ${solicitorEmail}<br>Phone: ${solicitorPhone}<br>Address: ${solicitorAddress}<br>City: ${solicitorCity}<br>State: ${solicitorState}<br>Postcode: ${solicitorPostcode}</p>`
    };

    await sendMail(msg);
   

    res.status(200).json({ message: 'EOI form submitted successfully' });
  } catch (error) {
    console.error('Error submitting EOI form:', error);
    res.status(500).json({ error: 'Failed to submit EOI form' });
  }
});

module.exports = router; 