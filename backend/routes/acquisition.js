const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Acquirer = require('../models/Acquirer');
const AcquisitionReport = require('../models/AcquisitionReport');
const acquirerAuth = require('../middleware/acquirerAuth.middleware');

const signAcquirerToken = (acquirer) =>
  jwt.sign(
    { acquirerId: acquirer._id, deal: acquirer.deal, role: 'acquirer' },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );


// POST /api/acquisition/login — identifier may be an email or a username.
router.post('/login', async (req, res) => {
  try {
    const { identifier, email, password } = req.body;
    const id = String(identifier ?? email ?? '').toLowerCase().trim();
    if (!id || !password) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    const acquirer = await Acquirer.findOne({ $or: [{ email: id }, { username: id }] });
    if (!acquirer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    let matched = false;
    try {
      matched = await acquirer.matchPassword(password);
    } catch {
      return res.status(500).json({ message: 'Error while verifying password' });
    }
    if (!matched) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    acquirer.lastLoginAt = new Date();
    await acquirer.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully logged in',
      token: signAcquirerToken(acquirer),
      acquirer: {
        _id: acquirer._id,
        email: acquirer.email,
        username: acquirer.username,
        deal: acquirer.deal,
      },
    });
  } catch (err) {
    console.error('[Acquirer Login Error]', err.message);
    return res.status(500).json({ message: 'An error occurred while logging in' });
  }
});

// GET /api/acquisition/me — validate token, return acquirer profile.
router.get('/me', acquirerAuth, async (req, res) => {
  return res.status(200).json({
    success: true,
    token: (req.headers['authorization'] || '').split(' ')[1] || null,
    acquirer: {
      _id: req.acquirer._id,
      email: req.acquirer.email,
      username: req.acquirer.username,
      deal: req.acquirer.deal,
    },
  });
});

// POST /api/acquisition/change-password
router.post('/change-password', acquirerAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const matched = await req.acquirer.matchPassword(currentPassword);
    if (!matched) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    req.acquirer.password = newPassword; // hashed by pre-save hook
    await req.acquirer.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('[Acquirer Change Password Error]', err.message);
    return res.status(500).json({ message: 'An error occurred while updating the password' });
  }
});


router.get('/reports', acquirerAuth, async (req, res) => {
  try {
    const reports = await AcquisitionReport.find({ deal: req.deal, archived: { $ne: true } })
      .sort({ updatedAt: -1 })
      .select('_id businessName sections updatedAt')
      .lean();

    const cards = reports.map((r) => {
      const banner = (r.sections || []).find((s) => s.type === 'banner');
      return {
        _id: r._id,
        businessName: r.businessName || 'Acquisition Report',
        bannerImage: (banner && banner.data && banner.data.backgroundImage) || null,
        updatedAt: r.updatedAt,
      };
    });

    return res.json(cards);
  } catch (err) {
    console.error('[Acquirer Reports Error]', err.message);
    return res.status(500).json({ message: 'Failed to load reports' });
  }
});

module.exports = router;
