const express = require('express');
const multer = require('multer');
const SeekEmail = require('../models/seekEmail');
const router = express.Router();

const upload = multer();


router.post('/create', upload.none(), async (req, res) => {
  try {
    const mailData = req.body;
    console.log(`New email received from: ${mailData.from}`);

    const newLead = new SeekEmail({
      sender: mailData.from,
      recipient: mailData.recipients,
      subject: mailData.subject,
      textContent: mailData['body-plain'],
      htmlContent: mailData['body-html']
    });

    await newLead.save();

    res.status(200).send('Email received and saved to database');

  } catch (error) {
    console.error('Error saving Mailgun webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/get/all', async (req, res) => {
  try {
    const emails = await SeekEmail.find().sort({ createdAt: -1 });
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/get/by/:id', async (req, res) => {
  try {
    const email = await SeekEmail.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json(email);
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.delete('/delete/by/:id', async (req, res) => {
  try {
    const deletedEmail = await SeekEmail.findByIdAndDelete(req.params.id);

    if (!deletedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;