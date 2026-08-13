const jwt = require('jsonwebtoken');
const Acquirer = require('../models/Acquirer');

const acquirerAuthMiddleware = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'acquirer') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const acquirer = await Acquirer.findById(decoded.acquirerId);
    if (!acquirer) {
      return res.status(401).json({ message: 'Acquirer not found' });
    }

    req.acquirer = acquirer;
    req.deal = acquirer.deal;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = acquirerAuthMiddleware;
