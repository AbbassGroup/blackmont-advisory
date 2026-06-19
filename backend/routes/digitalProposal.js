const express = require('express');
const router = express.Router();
const DigitalProposal = require('../models/DigitalProposal');
const ProposalViewLog = require('../models/ProposalViewLog');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const { createAdminNotificationEmail, createCustomerApprovalEmail } = require('../utils/emailTemplates');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const SN_API = "https://api.signnow.com";
// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/proposals/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'proposal-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   },
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

const upload = multer({
  dest: path.join(__dirname, '../uploads/proposals/'),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Multer error handling middleware
function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum allowed size is 50MB.' });
  }
  next(err);
}


// GET all digital proposals
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', isApproved } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { brokerName: { $regex: search, $options: 'i' } },
        { brokerEmail: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by approval status
    if (isApproved !== undefined) {
      query.isApproved = isApproved === 'true';
    }

    const proposals = await DigitalProposal.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await DigitalProposal.countDocuments(query);

    res.json({
      proposals,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET digital proposal by ID
router.get('/:id', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET digital proposals by email
router.get('/email/:email/:id', async (req, res) => {
  try {
    const proposals = await DigitalProposal.find({
      customerEmail: req.params.email,
      _id: req.params.id
    }).sort({ createdAt: -1 });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new digital proposal
router.post('/', upload.single('backgroundImage'), multerErrorHandler, async (req, res) => {
  try {
    const proposalData = {
      businessName: req.body.businessName,
      businessValue: req.body.businessValue,
      brokerName: req.body.brokerName,
      brokerEmail: req.body.brokerEmail,
      financialAssumptions: req.body.financialAssumptions || '',
      customerEmail: req.body.customerEmail || '',
      customerName: req.body.customerName || '',
      agreementTerm: req.body.agreementTerm || '90',
      businessAddress: req.body.businessAddress || '',
      listingPrice: req.body.listingPrice || '',
      performanceBonus: req.body.performanceBonus || '',
      salePrice: req.body.salePrice || '',
      engagementFee: req.body.engagementFee || '0',
      createdBy: req.body.createdBy || 'Admin',
      advertisement: req.body.advertisement ? JSON.parse(req.body.advertisement) : [],
      successFee: req.body.successFee ? JSON.parse(req.body.successFee) : [],
      // expiredAt: req.body.expiredAt,
      template: req.body.template || 'business_appraisal'
    };

    // Add background image if uploaded
    if (req.file) {
      proposalData.backgroundImage = `${process.env.BACKEND_URL}/uploads/proposals/${req.file.filename}`;
    }

    const proposal = new DigitalProposal(proposalData);
    const savedProposal = await proposal.save();

    // Send email notification to owner for review
    try {
      const ownerMsg = createAdminNotificationEmail(savedProposal, 'created');
      await transporter.sendMail(ownerMsg);
      console.log('Owner notification email sent for proposal:', savedProposal._id);
    } catch (emailError) {
      console.error('Failed to send owner notification email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json(savedProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update digital proposal
router.put('/:id', upload.single('backgroundImage'), multerErrorHandler, async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    // Update fields
    const updateData = {
      businessName: req.body.businessName || proposal.businessName,
      businessValue: req.body.businessValue || proposal.businessValue,
      brokerName: req.body.brokerName || proposal.brokerName,
      brokerEmail: req.body.brokerEmail || proposal.brokerEmail,
      financialAssumptions: req.body.financialAssumptions !== undefined ? req.body.financialAssumptions : proposal.financialAssumptions,
      customerEmail: req.body.customerEmail !== undefined ? req.body.customerEmail : proposal.customerEmail,
      customerName: req.body.customerName !== undefined ? req.body.customerName : proposal.customerName,
      agreementTerm: req.body.agreementTerm !== undefined ? req.body.agreementTerm : proposal.agreementTerm,
      businessAddress: req.body.businessAddress !== undefined ? req.body.businessAddress : proposal.businessAddress,
      listingPrice: req.body.listingPrice !== undefined ? req.body.listingPrice : proposal.listingPrice,
      performanceBonus: req.body.performanceBonus !== undefined ? req.body.performanceBonus : proposal.performanceBonus,
      salePrice: req.body.salePrice !== undefined ? req.body.salePrice : proposal.salePrice,
      engagementFee: req.body.engagementFee !== undefined ? req.body.engagementFee : proposal.engagementFee,
      advertisement: req.body.advertisement ? JSON.parse(req.body.advertisement) : proposal.advertisement,
      successFee: req.body.successFee ? JSON.parse(req.body.successFee) : proposal.successFee,
      template: req.body.template !== undefined ? req.body.template : proposal.template
    };

    // Update background image if new one uploaded
    if (req.file) {
      updateData.backgroundImage = `https://api.blackmontadvisory.com/uploads/proposals/${req.file.filename}`;
    }

    const updatedProposal = await DigitalProposal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Send email notification to owner for updated proposal
    try {
      const ownerMsg = createAdminNotificationEmail(updatedProposal, 'updated');
      await transporter.sendMail(ownerMsg);
      console.log('Owner notification email sent for updated proposal:', updatedProposal._id);
    } catch (emailError) {
      console.error('Failed to send owner notification email for update:', emailError);
      // Don't fail the request if email fails
    }

    res.json(updatedProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT approve digital proposal
router.put('/:id/approve', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    const updatedProposal = await DigitalProposal.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        approvedBy: req.body.approvedBy || 'Admin',
        approvedAt: new Date()
      },
      { new: true }
    );

    // Send email notification to customer when proposal is approved
    if (updatedProposal.customerEmail) {
      try {
        const customerMsg = createCustomerApprovalEmail(updatedProposal);
        await transporter.sendMail(customerMsg);
        console.log('Customer notification email sent for approved proposal:', updatedProposal._id);
      } catch (emailError) {
        console.error('Failed to send customer notification email:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.json(updatedProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT revoke approval
router.put('/:id/revoke', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    const updatedProposal = await DigitalProposal.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
        approvedBy: '',
        approvedAt: null
      },
      { new: true }
    );

    res.json(updatedProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST record a proposal view
router.post('/:id/view', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    const log = new ProposalViewLog({
      proposalId: proposal._id,
      customerEmail: req.body.customerEmail || proposal.customerEmail || '',
      customerName: req.body.customerName || proposal.customerName || '',
      businessName: proposal.businessName || '',
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
    });

    await log.save();
    res.status(201).json({ message: 'View recorded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET proposal view history
router.get('/:id/views', async (req, res) => {
  try {
    const views = await ProposalViewLog.find({ proposalId: req.params.id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(views);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE digital proposal
router.delete('/:id', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    await DigitalProposal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Digital proposal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
