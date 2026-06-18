const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const CareerApplication = require('../models/CareerApplication');
const Enquiry = require('../models/Enquiry');
const { sendMail } = require('../utils/mailer');
const fs = require('fs');
const { default: axios } = require('axios');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/cvs'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/careers/apply
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, coverLetter } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }
    const application = new CareerApplication({
      name,
      email,
      phone,
      coverLetter,
      resumeFile: `/uploads/cvs/${req.file.filename}`
    });
    await application.save();

    // Also save to general enquiry tracking
    const enquiry = new Enquiry({
      name: name,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone: phone,
      email: email,
      message: coverLetter,
      source: 'Career Application',
      additionalData: {
        resumeFile: `/uploads/cvs/${req.file.filename}`,
        originalFilename: req.file.originalname
      }
    });
    await enquiry.save();

    // Send email to admin with resume attached
    const resumePath = req.file.path;
    const resumeData = fs.readFileSync(resumePath);
    const msg = {
      to: 'info@blackmontadvisory.com',
      from: 'info@blackmontadvisory.com',
      subject: 'New Career Application Submitted',
      text: `A new career application has been submitted.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCover Letter: ${coverLetter}`,
      html: `<h2>New Career Application Submitted</h2><p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Phone:</strong> ${phone}<br/><strong>Cover Letter:</strong> ${coverLetter}</p>`,
      attachments: [
        {
          content: resumeData.toString('base64'),
          filename: req.file.originalname,
          type: req.file.mimetype,
          disposition: 'attachment',
        }
      ]
    };
    await sendMail(msg);

    const nexarApi = process.env.NEXAR_API_URL || 'https://api.nexartechnologies.com/api/v1';
    try {
      await axios.post(`${nexarApi}/deals/create/integration`, {
        name: name,
        stage: 'Enquiry',
        businessUnit: 'ABBASS Group',
        office: 'Head Office',
        phone,
        email,
        comments: `Resume: https://apibusinessbrokers.abbass.com.au/uploads/cvs/${req.file.filename} Cover Letter:${coverLetter}`,
        leadSource: 'Career Form'
      });
    } catch (err) {
      console.error('External API error:', err.response?.data || err.message);
    }

    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/careers/applications
router.get('/applications', async (req, res) => {
  try {
    const apps = await CareerApplication.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
