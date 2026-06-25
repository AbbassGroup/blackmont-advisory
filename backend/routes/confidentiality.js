const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendMail } = require('../utils/mailer');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const Enquiry = require('../models/Enquiry');
const Listing = require('../models/Listing');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const recordImView = require('../utils/recordImView');
const { stampCaBranding } = require('../utils/caPdfBranding');


// In-memory upload for the purchaser's $1,000 deposit screenshot (emailed to broker).
const depositUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only image or PDF files are allowed.'), false);
  },
});

// Middleware to check admin auth
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// POST /api/confidentiality
router.post('/', depositUpload.single('deposit'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, country, address, suburb, state, postalCode, businessTitle, listingId, accountName, bsb, accountNumber } = req.body;
    if (!firstName || !lastName || !email || !phone || !businessTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const listing = await Listing.findById(listingId);


    const price = listing.price;
    const priceRange = listing.priceRange;
    const businessType = listing.businessType;
    const deal = listing.deal;
    const category = listing.category;
    const about = listing.about;
    const listingSuburb = listing.suburb;
    const location = listing.location;
    const brokers = listing.brokers;
    const brokersEmails = brokers.map((broker) => broker.email);


    // Save to enquiry database
    const enquiry = new Enquiry({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      source: 'Confidentiality Agreement',
      additionalData: {
        businessTitle,
        country,
        address,
        suburb,
        state,
        postalCode,
        accountName,
        bsb,
        accountNumber
      }
    });
    const savedEnquiry = await enquiry.save();



    // Generate PDF for user
    const templatePath = path.resolve(__dirname, '../../frontend/public/CA.pdf');
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    // Remove the last page (the info table page)
    pdfDoc.removePage(pdfDoc.getPageCount() - 1);
    // Add a new page for the user's info
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const { headerH, footerH } = await stampCaBranding(pdfDoc, page);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = height - headerH - 40;
    page.drawText('Information submitted', { x: 50, y, size: 16, font, color: rgb(0, 0, 0) });
    y -= 40;

    // Create clean information display
    const infoRows = [
      { left: `First name: ${firstName}`, right: `Surname: ${lastName}` },
      { left: `Mobile: ${phone}`, right: `Email: ${email}` },
      { left: `Address: ${address || ''}`, right: '' },
      { left: `Suburb: ${suburb || ''}`, right: `Postcode: ${postalCode || ''}` },
      { left: `State: ${state || ''}`, right: `Country: ${country || ''}` }
    ];

    infoRows.forEach(row => {
      if (row.left) {
        page.drawText(row.left, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });
      }
      if (row.right) {
        page.drawText(row.right, { x: 300, y, size: 12, font, color: rgb(0, 0, 0) });
      }
      y -= 30;
    });

    // Add a new page for the listing information
    if (listing) {
      let listingPage = pdfDoc.addPage();
      let lWidth = listingPage.getWidth();
      let lHeight = listingPage.getHeight();
      const { headerH: listingHeaderH, footerH: listingFooterH } = await stampCaBranding(pdfDoc, listingPage);
      let lY = lHeight - listingHeaderH - 40;

      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      function wrapText(text, maxWidth, font, fontSize) {
        if (!text) return [];
        const lines = [];
        const textLines = String(text).split('\n');
        for (const p of textLines) {
          if (p.length === 0) {
            lines.push('');
            continue;
          }
          const words = p.split(' ').filter(w => w.length > 0);
          if (words.length === 0) {
            lines.push('');
            continue;
          }
          let currentLine = words[0];
          for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
            if (width < maxWidth) {
              currentLine += ' ' + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);
        }
        return lines;
      }

      // Title
      const titleText = (listing.title || businessTitle || '')
        .replace(/\u2192/g, '->').replace(/[\u2013\u2014]/g, '-').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
        .replace(/[\u2022\u25cf\u25cb\u25a0\u25aa]/g, '-')
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ''); // strip emojis
      if (titleText) {
        const titleLines = wrapText(titleText, lWidth - 100, boldFont, 18);
        for (const line of titleLines) {
          listingPage.drawText(line, { x: 50, y: lY, size: 18, font: boldFont, color: rgb(0.1, 0.2, 0.3) });
          lY -= 22;
        }
        lY -= 10;
      }

      // Price
      if (price) {
        listingPage.drawText(price, { x: 50, y: lY, size: 14, font: boldFont, color: rgb(0.2, 0.6, 0.5) });
        lY -= 20;
      }

      // Location
      const locText = (listingSuburb || location || '')
        .replace(/\u2192/g, '->').replace(/[\u2013\u2014]/g, '-').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
        .replace(/[\u2022\u25cf\u25cb\u25a0\u25aa]/g, '-')
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
      if (locText) {
        listingPage.drawText(locText, { x: 50, y: lY, size: 12, font: regularFont, color: rgb(0.4, 0.4, 0.4) });
        lY -= 30;
      }

      // About the Business Section Header
      listingPage.drawText("About the Business", { x: 50, y: lY, size: 16, font: boldFont, color: rgb(0, 0, 0) });
      lY -= 24;

      // Clean HTML content
      const cleanAbout = (about || '')
        .replace(/\u2192/g, '->')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201c\u201d]/g, '"')
        .replace(/[\u2022\u25cf\u25cb\u25a0\u25aa]/g, '-') // Map common bullets to hyphens
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')    // Strip emojis
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<h[1-6][^>]*>/gi, '\n\n')
        .replace(/<\/h[1-6]>/gi, '\n\n')
        .replace(/<ul[^>]*>/gi, '\n')
        .replace(/<\/ul>/gi, '\n')
        .replace(/<li[^>]*>/gi, '\n- ')
        .replace(/<\/li>/gi, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/<[^>]+>/g, '')
        .replace(/[^\x20-\x7E\n\r\t\xA0-\xFF]/g, '') // Aggressive strip of remaining unsupported chars to prevent crashes
        .replace(/(?:\r?\n\s*){3,}/g, '\n\n')
        .trim();

      if (cleanAbout) {
        const aboutLines = wrapText(cleanAbout, lWidth - 100, regularFont, 12);
        for (const line of aboutLines) {
          if (lY < listingFooterH + 50) {
            listingPage = pdfDoc.addPage();
            lWidth = listingPage.getWidth();
            const nextBranding = await stampCaBranding(pdfDoc, listingPage);
            lY = listingPage.getHeight() - nextBranding.headerH - 40;
          }
          if (line.trim() !== '') {
            listingPage.drawText(line, { x: 50, y: lY, size: 12, font: regularFont, color: rgb(0, 0, 0) });
          }
          lY -= 16;
        }
      }
    }

    const pdfBytes = await pdfDoc.save();

    // Save PDF to uploads/confidentiality folder
    const confidentialityDir = path.resolve(__dirname, '../uploads/confidentiality');
    if (!fs.existsSync(confidentialityDir)) {
      fs.mkdirSync(confidentialityDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const pdfFilename = `CA_${firstName}_${lastName}_${timestamp}.pdf`;
    const pdfPath = path.join(confidentialityDir, pdfFilename);
    fs.writeFileSync(pdfPath, pdfBytes);

    // Generate a signed token for broker approve/reject actions
    const actionToken = jwt.sign(
      {
        enquiryId: savedEnquiry._id.toString(),
        listingId: listingId,
        clientEmail: email,
        clientName: `${firstName} ${lastName}`,
        brokersEmails,
        businessTitle,
        pdfFilename,
      },
      process.env.JWT_SECRET,
      { expiresIn: '365d' }
    );

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5005';
    const approveUrl = `${backendUrl}/api/confidentiality/approve?token=${actionToken}`;
    const rejectUrl = `${backendUrl}/api/confidentiality/reject?token=${actionToken}`;

    // Send admin notification with Approve / Reject buttons
    const adminMsg = {
      // to: ['jahid.dev8@gmail.com'],
      to: brokersEmails,
      from: process.env.SENDGRID_FROM || 'info@blackmontadvisory.com',
      subject: `NDA Completed – ${firstName} ${lastName} – ${businessTitle}`,
      text: `NDA Submitted\n\nClient: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nBusiness: ${businessTitle}\n\nPurchaser Refund Details\nAccount Name: ${accountName || '—'}\nBSB: ${bsb || '—'}\nAccount Number: ${accountNumber || '—'}\n\nApprove NDA: ${approveUrl}\nReject NDA: ${rejectUrl}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <p>A client has completed a Confidentiality Agreement and is awaiting your response.</p>
          <p>
            <strong>Client:</strong> ${firstName} ${lastName}<br/>
            <strong>Email:</strong> ${email}<br/>
            <strong>Phone:</strong> ${phone}<br/>
            <strong>Country:</strong> ${country || '—'}<br/>
            <strong>Address:</strong> ${address || '—'}, ${suburb || ''} ${state || ''} ${postalCode || ''}<br/>
            <strong>Business:</strong> ${businessTitle}
          </p>
          <p style="margin-top:16px">
            <strong>Purchaser Refund Details</strong><br/>
            <strong>Account Name:</strong> ${accountName || '—'}<br/>
            <strong>BSB:</strong> ${bsb || '—'}<br/>
            <strong>Account Number:</strong> ${accountNumber || '—'}
          </p>
          ${req.file ? '<p style="margin-top:8px;color:#666;font-size:13px">A $1,000 deposit screenshot is attached.</p>' : ''}
          <p>Please review the NDA and take action:</p>
          <p>
            <a href="${rejectUrl}" style="display:inline-block;padding:12px 28px;background:#dc3545;color:#fff;font-weight:bold;text-decoration:none;border-radius:6px">Reject</a>
            <a href="${approveUrl}" style="display:inline-block;padding:12px 28px;background:#28a745;color:#fff;font-weight:bold;text-decoration:none;border-radius:6px;margin-right:12px">Approve</a>
          </p>
          <p style="font-size:12px;color:#999;">These links are valid for 30 days and can only be used once.</p>
        </div>
      `,
      attachments: [
        {
          content: Buffer.from(pdfBytes).toString('base64'),
          filename: 'Confidentiality-Agreement.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
        ...(req.file
          ? [
            {
              content: req.file.buffer.toString('base64'),
              filename: req.file.originalname || 'deposit',
              type: req.file.mimetype,
              disposition: 'attachment',
            },
          ]
          : []),
      ]
    };

    // Send email to user
    const userMsg = {
      to: email,
      from: process.env.SENDGRID_FROM || 'info@blackmontadvisory.com',
      subject: 'Your Confidentiality Agreement with Blackmont Advisory',
      text: `Hi ${firstName} ${lastName},\n\nThank you for your enquiry on one of our listings. See attached a copy of the Confidentiality Agreement you have just signed for your records.\n\nYou have entered into an important and legally binding agreement. Please seek legal advice if you have any questions in relation to this agreement to ensure you read and understand the terms of Confidentiality.\n\nWe will be in touch, to provide you with more information regarding this business.\n\nRegards,\nBlackmont Advisory\nhttp://www.blackmontadvisory.com\ninfo@blackmontadvisory.com`,
      html: `<p>Hi ${firstName} ${lastName},</p><p>Thank you for your enquiry on one of our listings. See attached a copy of the Confidentiality Agreement you have just signed for your records.</p><p>You have entered into an important and legally binding agreement. Please seek legal advice if you have any questions in relation to this agreement to ensure you read and understand the terms of Confidentiality.</p><p>We will be in touch, to provide you with more information regarding this business.</p><p>Regards,<br/>Blackmont Advisory<br/><a href="http://www.blackmontadvisory.com">www.blackmontadvisory.com</a><br/>info@blackmontadvisory.com</p>`,
      attachments: [
        {
          content: Buffer.from(pdfBytes).toString('base64'),
          filename: 'Confidentiality-Agreement.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        }
      ]
    };


    // const priceNumber = parseInt(price.replace(/[^0-9]/g, ''));

    const prospectData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      industry: category,
      location: listingSuburb,
      priceRange: priceRange,
      businessType: businessType,
      city: location,
      businesses: [deal],
      source: "Business_Brokers"
    };

    // console.log({ prospectData });


    const nexarApi = process.env.NEXAR_API_URL || 'https://blackmont-api.nexartechnologies.com';


    await sendMail(adminMsg);


    res.json({ message: 'NDA received. Broker notification sent.' });

    Promise.all([
      Enquiry.findOneAndUpdate(
        { _id: savedEnquiry._id },
        {
          $set: {
            'additionalData.pdfFilename': pdfFilename,
            'additionalData.pdfPath': `/uploads/confidentiality/${pdfFilename}`
          }
        }
      ),
      axios.post(`${nexarApi}/contacts/create`, prospectData, {
        headers: {
          'Authorization': `Bearer businessbrokersecret`,
          'Content-Type': 'application/json',
        },
      }),
      sendMail(userMsg), // Send PDF copy to client immediately on submission
    ]).catch((bgErr) => {
      console.error('Confidentiality post-response error:', bgErr.response?.body?.errors || bgErr.message);
    });
  } catch (err) {
    console.error('Confidentiality POST error:', err.response?.body?.errors || err);
    res.status(500).json({ error: 'Failed to send email', details: err.response?.body?.errors || err.message });
  }
});

// Helper: HTML confirmation response page
function actionPage(title, message, color) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title></head>
  <body style="font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f4f4f4">
    <div style="background:#fff;padding:48px 40px;border-radius:10px;box-shadow:0 2px 16px rgba(0,0,0,.08);text-align:center;max-width:440px">
      <div style="font-size:56px;margin-bottom:16px">${color === 'green' ? '✅' : '❌'}</div>
      <h2 style="color:${color === 'green' ? '#28a745' : '#dc3545'};margin-bottom:8px">${title}</h2>
      <p style="color:#555;font-size:15px">${message}</p>
      <p style="color:#999;font-size:12px;margin-top:32px">Blackmont Advisory</p>
    </div>
  </body></html>`;
}

// GET /api/confidentiality/approve?token=...
router.get('/approve', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send(actionPage('Invalid Link', 'No token provided.', 'red'));

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).send(actionPage('Link Expired', 'This link has expired or is invalid.', 'red'));
    }

    const { enquiryId, listingId, clientEmail, clientName, brokersEmails, businessTitle, pdfFilename } = payload;

    // Check if already actioned
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) return res.status(404).send(actionPage('Not Found', 'Enquiry record not found.', 'red'));

    if (enquiry.ndaStatus === 'approved') {
      return res.send(actionPage('Already Approved', `This NDA for <strong>${clientName}</strong> has already been approved. No further action is required.`, 'green'));
    } else if (enquiry.ndaStatus === 'rejected') {
      return res.send(actionPage('Already Rejected', `This NDA for <strong>${clientName}</strong> was previously rejected and cannot be approved now.`, 'red'));
    }

    // Approve + record share time; persist listingId for the follow-up.
    await Enquiry.findByIdAndUpdate(enquiryId, {
      ndaStatus: 'approved',
      imSharedAt: new Date(),
      ...(listingId ? { listingId } : {}),
    });


    const backendUrl = process.env.BACKEND_URL;
    const viewerToken = jwt.sign({ enquiryId }, process.env.JWT_SECRET);
    const imUrl = listingId
      ? `${backendUrl}/api/listings/${listingId}/im?token=${viewerToken}`
      : 'https://www.blackmontadvisory.com';
    const approvedMsg = {
      to: clientEmail,
      cc: brokersEmails,
      // to: "jahid.dev8@gmail.com",
      from: process.env.SENDGRID_FROM || 'info@blackmontadvisory.com',
      subject: 'Information Memorandum | Blackmont Advisory',
      text: `Hi ${clientName},\n\nThank you for completing the NDA. Please see the Information Memorandum at the link below:\n${imUrl}\n\nIf you have any questions, please feel free to contact the broker directly.\n\nRegards,\nBlackmont Advisory\ninfo@blackmontadvisory.com\nwww.blackmontadvisory.com`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <p>Hi ${clientName},</p>
          <p>Thank you for completing the NDA. Please see below the Information Memorandum:</p>
          <div style="margin:32px 0">
            <a href="${imUrl}"
              style="display:inline-block;padding:14px 36px;background:#1b2535;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:6px">
              View IM
            </a>
          </div>
          <p>If you have any questions, please feel free to contact the broker directly.</p>
          <p style="margin-top:32px">Regards,<br/>Blackmont Advisory<br/><a href="mailto:info@blackmontadvisory.com">info@blackmontadvisory.com</a><br/><a href="https://www.blackmontadvisory.com">www.blackmontadvisory.com</a></p>
        </div>
      `,
    };
    console.log('🚀 ~ approvedMsg:', approvedMsg)

    await sendMail(approvedMsg);
    const [firstName = '', ...rest] = String(clientName || '').trim().split(/\s+/);
    // Record an access-grant placeholder so the person appears in the IM history
    // immediately with 0 views; the count increases only when they actually view.
    recordImView({
      listingId,
      enquiry: { _id: enquiryId, email: clientEmail, firstName, lastName: rest.join(' ') },
      accessDenied: false,
      userAgent: req.get('User-Agent'),
      type: 'grant',
    });

    return res.send(actionPage(
      'NDA Approved',
      `You have approved the NDA for <strong>${clientName}</strong>. The Information Memorandum email has been sent to the client.`,
      'green'
    ));
  } catch (err) {
    // console.error('Approve NDA error:', err);
    console.error('Approve NDA error:', err.response?.body?.errors || err.message);
    return res.status(500).send(actionPage('Error', 'Something went wrong. Please try again.', 'red'));
  }
});

// GET /api/confidentiality/reject?token=...
router.get('/reject', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send(actionPage('Invalid Link', 'No token provided.', 'red'));

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).send(actionPage('Link Expired', 'This link has expired or is invalid.', 'red'));
    }

    const { enquiryId, clientEmail, clientName, brokersEmails, businessTitle } = payload;

    // Check if already actioned
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) return res.status(404).send(actionPage('Not Found', 'Enquiry record not found.', 'red'));

    if (enquiry.ndaStatus === 'rejected') {
      return res.send(actionPage('Already Rejected', `This NDA for <strong>${clientName}</strong> has already been rejected. No further action is required.`, 'red'));
    } else if (enquiry.ndaStatus === 'approved') {
      return res.send(actionPage('Already Approved', `This NDA for <strong>${clientName}</strong> was previously approved and cannot be rejected now.`, 'green'));
    }


    // Update status
    await Enquiry.findByIdAndUpdate(enquiryId, { ndaStatus: 'rejected' });

    // Email Template 2 – Rejected (NDA Not Accepted)
    const rejectedMsg = {
      to: clientEmail,
      cc: brokersEmails,
      from: process.env.SENDGRID_FROM || 'info@blackmontadvisory.com',
      subject: 'NDA Not Accepted | Blackmont Advisory',
      text: `Hi ${clientName},\n\nThank you for completing the NDA. Unfortunately the NDA you completed was not accepted. This may be due to the fact that your legal name or full residential address was not used. Note we do not accept PO Box addresses.\n\nRegards,\nBlackmont Advisory\ninfo@blackmontadvisory.com\nwww.blackmontadvisory.com`,
      html: `
        <div style="font-family:Arial,sans-serif;">
          <p>Hi ${clientName},</p>
          <p>Thank you for completing the NDA. Unfortunately the NDA you completed was not accepted. This may be due to the fact that your legal name or full residential address was not used. Note we do not accept PO Box addresses.</p>
          <p style="margin-top:32px">Regards,<br/>Blackmont Advisory<br/><a href="mailto:info@blackmontadvisory.com">info@blackmontadvisory.com</a><br/><a href="https://www.blackmontadvisory.com">www.blackmontadvisory.com</a></p>
        </div>
      `,
    };

    await sendMail(rejectedMsg);

    return res.send(actionPage(
      'NDA Rejected',
      `You have rejected the NDA for <strong>${clientName}</strong>. The client has been notified by email.`,
      'green'
    ));
  } catch (err) {
    console.error('Reject NDA error:', err);
    return res.status(500).send(actionPage('Error', 'Something went wrong. Please try again.', 'red'));
  }
});


// GET /api/confidentiality/download/:filename - download a specific PDF (admin only)
router.get('/download/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const pdfPath = path.resolve(__dirname, '../uploads/confidentiality', filename);
    console.log('🚀 ~ pdfPath:', pdfPath)

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.sendFile(pdfPath);
  } catch (err) {
    console.error('PDF download error:', err);
    res.status(500).json({ error: 'Failed to download PDF' });
  }
});

// GET /api/confidentiality/list - list all stored PDFs with user details (admin only)
router.get('/list', adminAuth, async (req, res) => {
  try {
    const confidentialityDir = path.resolve(__dirname, '../uploads/confidentiality');

    if (!fs.existsSync(confidentialityDir)) {
      return res.json([]);
    }

    // Get all enquiries with confidentiality agreements
    const enquiries = await Enquiry.find({
      source: 'Confidentiality Agreement'
    }).sort({ createdAt: -1 });
    console.log('🚀 ~ enquiries:', enquiries)

    // Get all PDF files from filesystem
    const allPdfFiles = fs.readdirSync(confidentialityDir)
      .filter(file => file.endsWith('.pdf'));

    const files = [];

    // First, add files that have corresponding enquiry records
    for (const enquiry of enquiries) {
      const pdfFilename = enquiry.additionalData?.pdfFilename;
      if (pdfFilename && allPdfFiles.includes(pdfFilename)) {
        const filePath = path.join(confidentialityDir, pdfFilename);
        const stats = fs.statSync(filePath);

        files.push({
          filename: pdfFilename,
          size: stats.size,
          createdAt: enquiry.createdAt,
          downloadUrl: `/api/confidentiality/download/${pdfFilename}`,
          firstName: enquiry.firstName || '',
          lastName: enquiry.lastName || '',
          email: enquiry.email || '',
          phone: enquiry.phone || '',
          businessTitle: enquiry.additionalData?.businessTitle || '',
          hasEnquiryData: true
        });
      }
    }

    // Then, add orphaned PDF files (no corresponding enquiry record)
    const processedFilenames = files.map(f => f.filename);
    for (const pdfFile of allPdfFiles) {
      if (!processedFilenames.includes(pdfFile)) {
        const filePath = path.join(confidentialityDir, pdfFile);
        const stats = fs.statSync(filePath);

        // Try to extract name from filename (format: CA_FirstName_LastName_timestamp.pdf)
        let extractedFirstName = '';
        let extractedLastName = '';
        const nameMatch = pdfFile.match(/^CA_([^_]+)_([^_]+)_/);
        if (nameMatch) {
          extractedFirstName = nameMatch[1];
          extractedLastName = nameMatch[2];
        }

        files.push({
          filename: pdfFile,
          size: stats.size,
          createdAt: stats.birthtime,
          downloadUrl: `/api/confidentiality/download/${pdfFile}`,
          firstName: extractedFirstName,
          lastName: extractedLastName,
          email: '',
          phone: '',
          businessTitle: '',
          hasEnquiryData: false
        });
      }
    }

    // Sort by creation date (newest first)
    files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // console.log('🚀 ~ files:', files)

    res.json(files);
  } catch (err) {
    console.error('PDF list error:', err);
    res.status(500).json({ error: 'Failed to list PDFs' });
  }
});

module.exports = router; 
