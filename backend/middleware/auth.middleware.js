const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  let token = req.headers["authorization"];
  // console.log('🚀 ~ authMiddleware ~ token:', token)

  if (token && token.startsWith("Bearer ")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId);
      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = authMiddleware;
