const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const ValuationRequest = require('../models/ValuationRequest');
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/auth.middleware");


// GET /api/enquiries - admin only, get all enquiries from all sources
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get all unified enquiries
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    // Get existing valuation requests and convert them to unified format
    const valuationRequests = await ValuationRequest.find().sort({ createdAt: -1 });
    const convertedValuations = valuationRequests.map(v => ({
      _id: v._id,
      firstName: v.firstName,
      lastName: v.lastName,
      phone: v.phone,
      email: v.email,
      source: v.source || 'Valuations Form',
      formCompleted: v.formCompleted || false,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt
    }));
    
    // Combine and sort all enquiries
    const allEnquiries = [...enquiries, ...convertedValuations].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    res.json(allEnquiries);
  } catch (err) {
    console.error('Error fetching enquiries:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/enquiries/:id - admin only, update formCompleted status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { formCompleted } = req.body;
    
    // Try to update in Enquiry model first
    let updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id, 
      { formCompleted }, 
      { new: true }
    );
    
    // If not found, try ValuationRequest model (for backward compatibility)
    if (!updatedEnquiry) {
      updatedEnquiry = await ValuationRequest.findByIdAndUpdate(
        req.params.id, 
        { formCompleted }, 
        { new: true }
      );
    }
    
    if (!updatedEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    
    res.json(updatedEnquiry);
  } catch (err) {
    console.error('Error updating enquiry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 