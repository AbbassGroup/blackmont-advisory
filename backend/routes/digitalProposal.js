const express = require('express');
const router = express.Router();
const DigitalProposal = require('../models/DigitalProposal');
const ProposalViewLog = require('../models/ProposalViewLog');
const multer = require('multer');
const path = require('path');
const { sendMail } = require('../utils/mailer');
const {
  createAdminNotificationEmail,
  createCustomerApprovalEmail,
  createProposalAcceptanceEmail,
} = require('../utils/emailTemplates');
const jwt = require('jsonwebtoken');
const { renderProposalPdf } = require('../utils/proposalPdf');
const {
  makeDefaultSections,
  deriveFlatFields,
  enforceLockedSections,
  ensureSections,
} = require('../utils/proposalSections');

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

const uploadUrl = (filename) =>
  `${process.env.BACKEND_URL || 'https://api.blackmontadvisory.com'}/uploads/proposals/${filename}`;

// Settings-drawer fields: contract inputs, not document text.
const SETTINGS_FIELDS = [
  'brokerName',
  'brokerEmail',
  'customerEmail',
  'customerName',
  'agreementTerm',
  'businessAddress',
  'listingPrice',
  'performanceBonus',
  'salePrice',
  'template',
];

function applySectionUpdate(proposal, body) {
  const settings = {};
  for (const key of SETTINGS_FIELDS) {
    if (body[key] !== undefined) settings[key] = body[key];
  }

  Object.assign(proposal, settings);

  // No `sections` means a partial update, not an empty document.
  if (Array.isArray(body.sections)) {
    const flatContext = { ...proposal.toObject(), ...settings };
    const sections = enforceLockedSections(body.sections, flatContext);
    proposal.sections = sections;
    Object.assign(proposal, deriveFlatFields(sections));
  }

  if (body.lastEditedBy) proposal.lastEditedBy = body.lastEditedBy;
  return proposal;
}

// Uploads happen here so autosave can stay a plain JSON PUT.
router.post('/upload', upload.single('image'), multerErrorHandler, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: uploadUrl(req.file.filename) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// The render page runs in a headless browser with no session, so it fetches its
// data with a short-lived token instead of a login.
const RENDER_PURPOSE = 'proposal-pdf';

const mintRenderToken = (id) =>
  jwt.sign({ proposalId: String(id), purpose: RENDER_PURPOSE }, process.env.JWT_SECRET, {
    expiresIn: '3m',
  });

router.get('/:id/render', async (req, res) => {
  try {
    const decoded = jwt.verify(String(req.query.token || ''), process.env.JWT_SECRET);
    if (decoded.purpose !== RENDER_PURPOSE || decoded.proposalId !== req.params.id) {
      return res.status(403).json({ message: 'Invalid render token' });
    }
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'Digital proposal not found' });
    if (ensureSections(proposal)) await proposal.save();
    res.json(proposal);
  } catch {
    res.status(403).json({ message: 'Invalid or expired render token' });
  }
});

router.get('/:id/pdf', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'Digital proposal not found' });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const pdf = await renderProposalPdf({
      id: String(proposal._id),
      token: mintRenderToken(proposal._id),
      frontendUrl,
      title:
        proposal.template === 'franchise_proposal' ? 'Franchise Proposal' : 'Business Appraisal',
    });

    const safeName = (proposal.businessName || 'Proposal')
      .replace(/[^a-z0-9\- ]/gi, '')
      .trim()
      .replace(/\s+/g, '-');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `${req.query.inline === 'true' ? 'inline' : 'attachment'}; filename="${safeName}-Appraisal.pdf"`,
    );
    res.send(pdf);
  } catch (error) {
    console.error('Failed to render proposal PDF:', error);
    res.status(500).json({
      message: 'Failed to generate the PDF.',
      reason: error.message,
    });
  }
});


// GET all digital proposals
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', isApproved, archived } = req.query;

    let query = { archived: archived === 'true' ? true : { $ne: true } };

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

    // `sections` can be large and the list only needs the summary fields.
    const proposals = await DigitalProposal.find(query)
      .select('-sections')
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
    if (ensureSections(proposal)) await proposal.save();
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
      _id: req.params.id,
      archived: { $ne: true }
    }).sort({ createdAt: -1 });

    for (const proposal of proposals) {
      if (ensureSections(proposal)) await proposal.save();
    }

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Creates a draft. The owner is notified on submit, not here — autosave would
// otherwise email on every keystroke.
router.post('/', async (req, res) => {
  try {
    const flat = {
      businessName: req.body.businessName || '',
      businessValue: req.body.businessValue || '',
      brokerName: req.body.brokerName || '',
      brokerEmail: req.body.brokerEmail || '',
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
      advertisement: Array.isArray(req.body.advertisement) ? req.body.advertisement : [],
      successFee: Array.isArray(req.body.successFee) ? req.body.successFee : [],
      template: req.body.template || 'business_appraisal',
    };

    const proposal = new DigitalProposal({
      ...flat,
      sections: makeDefaultSections(flat),
    });
    Object.assign(proposal, deriveFlatFields(proposal.sections));

    const savedProposal = await proposal.save();
    res.status(201).json(savedProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Autosave target. JSON only; files go through POST /upload first.
router.put('/:id', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    applySectionUpdate(proposal, req.body);
    const updatedProposal = await proposal.save();

    res.json(updatedProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/submit', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    const resubmitting = !!proposal.submittedForApprovalAt;
    proposal.submittedForApprovalAt = new Date();
    const savedProposal = await proposal.save();

    try {
      const ownerMsg = createAdminNotificationEmail(savedProposal, resubmitting ? 'updated' : 'created');
      await sendMail(ownerMsg);
      console.log('Owner notification email sent for proposal:', savedProposal._id);
    } catch (emailError) {
      console.error('Failed to send owner notification email:', emailError);
      // Don't fail the request if email fails
    }

    res.json(savedProposal);
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
        await sendMail(customerMsg);
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

// Notifies the owner and broker; the agreement is then prepared by hand.
async function acceptProposal(req, res) {
  try {
    const { selectedAdvertisement, selectedSuccessFee, customerEmail } = req.body;
    const proposalId = req.params.id;

    if (!proposalId || !selectedAdvertisement || !selectedSuccessFee || !customerEmail) {
      return res.status(400).json({
        message:
          'Missing required fields: proposalId, selectedAdvertisement, selectedSuccessFee, customerEmail',
      });
    }

    const proposal = await DigitalProposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    try {
      const emailMsg = createProposalAcceptanceEmail(
        proposal,
        selectedAdvertisement,
        selectedSuccessFee,
      );
      await sendMail(emailMsg);
      console.log('Proposal acceptance notification email sent for proposal:', proposal._id);
    } catch (emailError) {
      console.error('Failed to send proposal acceptance email:', emailError);
    }

    res.json({
      success: true,
      message: 'Thank you, your agreement will be prepared shortly',
      customerEmail: proposal.customerEmail,
    });
  } catch (error) {
    console.error('Error processing proposal acceptance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process proposal acceptance',
    });
  }
}

router.post('/:id/accept', acceptProposal);

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

router.patch('/:id/restore', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findByIdAndUpdate(
      req.params.id,
      { archived: false, archivedAt: null },
      { new: true }
    );
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }
    res.json(proposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Soft delete: an accepted proposal's record has to survive.
router.delete('/:id', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findByIdAndUpdate(
      req.params.id,
      { archived: true, archivedAt: new Date() },
      { new: true }
    );
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    res.json({ message: 'Digital proposal archived successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id/permanent', async (req, res) => {
  try {
    const proposal = await DigitalProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Digital proposal not found' });
    }

    await DigitalProposal.findByIdAndDelete(req.params.id);
    await ProposalViewLog.deleteMany({ proposalId: req.params.id });
    res.json({ message: 'Digital proposal deleted permanently' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
