const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');

// Authenticates a vendor and scopes the request to their listing.
// Attaches req.vendor and req.listingId so routes can't reach another deal.
const vendorAuthMiddleware = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'vendor') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(401).json({ message: 'Vendor not found' });
    }

    req.vendor = vendor;
    req.listingId = vendor.listingId.toString();
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = vendorAuthMiddleware;
