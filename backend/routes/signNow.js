const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const DigitalProposal = require('../models/DigitalProposal');
const { createProposalAcceptanceEmail } = require('../utils/emailTemplates');

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

// SignNow API configuration
// const SIGNNOW_CONFIG = {
//   baseUrl: process.env.SIGNNOW_BASE_URL,
//   templateId: process.env.SIGNNOW_TEMPLATE_ID,
//   bearerToken: process.env.SIGNNOW_BEARER_TOKEN,
//   fixedApproverEmail: process.env.SIGNNOW_FROM_EMAIL
// };
// console.log('🚀 ~ SIGNNOW_CONFIG:', SIGNNOW_CONFIG)

// SignNow API functions
// const signNowAPI = {
//   // Step 1: Copy template
//   copyTemplate: async (documentName) => {
//     console.log('🚀 ~ documentName:', documentName)
//     const response = await fetch(
//       `${SIGNNOW_CONFIG.baseUrl}/template/${SIGNNOW_CONFIG.templateId}/copy`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${SIGNNOW_CONFIG.bearerToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           document_name: documentName,
//         }),
//       }
//     );
//     // console.log('🚀 ~ response:', response)

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Failed to copy template: ${response.status} ${response.statusText} - ${errorText}`
//       );
//     }

//     return await response.json();
//   },

//   // Step 2: Fill smart fields
//   fillSmartFields: async (documentId, data) => {
//     const response = await fetch(
//       `${SIGNNOW_CONFIG.baseUrl}/document/${documentId}/integration/object/smartfields`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${SIGNNOW_CONFIG.bearerToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           data: data,
//           client_timestamp: new Date().toISOString(),
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Failed to fill smart fields: ${response.status} ${response.statusText} - ${errorText}`
//       );
//     }

//     return await response.json();
//   },

//   // Step 3: Send invitation
//   sendInvitation: async (documentId, customerEmail) => {
//     const response = await fetch(
//       `${SIGNNOW_CONFIG.baseUrl}/document/${documentId}/invite`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${SIGNNOW_CONFIG.bearerToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           document_id: documentId,
//           to: [
//             {
//               email: customerEmail,
//               role: 'Recipient 1',
//               order: 1,
//             },
//             {
//               email: 'sadeq@abbass.group',
//               role: 'Recipient 2',
//               order: 2,
//             },
//           ],
//           from: SIGNNOW_CONFIG.fixedApproverEmail,
//           // approvers: [
//           //   {
//           //     email: SIGNNOW_CONFIG.fixedApproverEmail,
//           //     order: 3,
//           //     role: 'Recipient 3',
//           //     expiration_days: 30,
//           //   },
//           // ],
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Failed to send invitation: ${response.status} ${response.statusText} - ${errorText}`
//       );
//     }

//     return await response.json();
//   },
// };

// Helper function to format amount with unit
const formatAmount = (amount, unit) => {
  if (!amount) return '';
  const symbol = unit === 'Dollar' ? '$' : '';
  const suffix = unit === 'Percentage' ? '%' : '';
  return `${symbol}${amount}${suffix}`;
};

// POST /api/signnow/accept-proposal
router.post('/accept-proposal', async (req, res) => {
  try {
    const {
      proposalId,
      selectedAdvertisement,
      selectedSuccessFee,
      customerEmail
    } = req.body;

    // console.log('🚀 ~ req.body:', req.body)
    // Validate required fields
    if (!proposalId || !selectedAdvertisement || !selectedSuccessFee || !customerEmail) {
      return res.status(400).json({
        message: 'Missing required fields: proposalId, selectedAdvertisement, selectedSuccessFee, customerEmail'
      });
    }

    // Get proposal from database
    const proposal = await DigitalProposal.findById(proposalId);
    console.log('🚀 ~ proposal:', proposal)
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    // Send notification email to sadeq@abbass.group and the broker
    try {
      const emailMsg = createProposalAcceptanceEmail(proposal, selectedAdvertisement, selectedSuccessFee);
      await transporter.sendMail(emailMsg);
      console.log('Proposal acceptance notification email sent for proposal:', proposal._id);
    } catch (emailError) {
      console.error('Failed to send proposal acceptance email:', emailError);
      // Don't fail the request if email fails, but log it
    }

    // Return success response
    res.json({
      success: true,
      message: 'Thank you, your agreement will be prepared shortly',
      customerEmail: proposal.customerEmail
    });

    /* 
    // ============================================
    // SIGNNOW INTEGRATION CODE - KEPT FOR FUTURE USE
    // ============================================
    
    // Calculate dates
    const initiateDate = new Date().toLocaleDateString('en-GB');
    const agreementTerm = parseInt(proposal.agreementTerm);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + agreementTerm);
    const endDateFormatted = endDate.toLocaleDateString('en-GB');

    // Format selected fees
    const advertisementFee = formatAmount(selectedAdvertisement.amount, selectedAdvertisement.unit);
    const successFee = formatAmount(selectedSuccessFee.amount, selectedSuccessFee.unit);
    const performanceBonus = proposal.performanceBonus ? `${proposal.performanceBonus}% + GST` : '$0'
    const successFeeText = selectedSuccessFee.unit === 'Percentage'
      ? 'Of total sale price (including Stock At Valuation)'
      : '';

    // Step 1: Copy template
    const documentName = `${proposal.businessName}_Agreement_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`;
    console.log('Step 1: Copying template...');
    const copyResult = await signNowAPI.copyTemplate(documentName);
    const documentId = copyResult.id;


    // Step 2: Prepare smart fields data
    console.log('Step 2: Filling smart fields...');
    const smartFieldsData = [
      { InitiateDate: initiateDate },
      { EndDate: endDateFormatted },
      { CustomerName: proposal.customerName },
      { CustomerEmail: proposal.customerEmail },
      { BusinessName: proposal.businessName },
      { BusinessAddress: proposal.businessAddress },
      { AdvertisingFee: `${advertisementFee} + GST` },
      { SuccessFee: `${successFee} + GST` },
      { ListingPrice: `$${proposal.listingPrice}` },
      { PerformanceBonus: performanceBonus },
      { SalePrice: proposal.salePrice ? `$${proposal.salePrice}` : '$0' },
    ];

    // Add SuccessFeeText only if it has a value
    if (successFeeText && successFeeText.trim()) {
      smartFieldsData.push({ SuccessFeeText: successFeeText });
    }

    await signNowAPI.fillSmartFields(documentId, smartFieldsData);

    // Step 3: Send invitation
    console.log('Step 3: Sending invitation...');
    await signNowAPI.sendInvitation(documentId, proposal.customerEmail);

    // Return success response
    res.json({
      success: true,
      message: 'Proposal accepted and signing invitation sent successfully',
      documentId: documentId,
      customerEmail: proposal.customerEmail
    });
    */

  } catch (error) {
    console.error('Error processing proposal acceptance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process proposal acceptance'
    });
  }
});

module.exports = router;
