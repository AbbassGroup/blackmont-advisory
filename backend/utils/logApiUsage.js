const ApiRequest = require('../models/ApiRequest');



function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.ip;
}
function logApiUsage({ sampleRate = 1 } = {}) {
  return async (req, res, next) => {
    try {
      // optional sampling to reduce DB writes
      if (Math.random() > sampleRate) return next();

      const origin = req.headers.origin || null;
      const referer = req.headers.referer || null;

      // If you use API keys, capture it (choose where you store it: header/query)
      const apiKey =
        req.headers["x-api-key"] ||
        req.query.api_key ||
        null;

      // If you only care about “which websites”, origin/referer is what you want
      await ApiRequest.create({
        apiKey,
        endpoint: req.originalUrl,
        method: req.method,
        origin,
        referer,
        host: req.headers.host || null,
        ip: getClientIp(req),
        userAgent: req.headers["user-agent"] || null,
      });
    } catch (e) {
      // don’t break API if logging fails
      console.error("logApiUsage error:", e.message);
    }
    next();
  };
}

module.exports = logApiUsage;