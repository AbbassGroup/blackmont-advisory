const mongoose = require("mongoose");

const ApiRequestLogSchema = new mongoose.Schema(
  {
    apiKey: { type: String, index: true },      // optional if you use API keys
    endpoint: { type: String, index: true },    // req.originalUrl
    method: String,
    origin: { type: String, index: true },      // req.headers.origin
    referer: { type: String, index: true },     // req.headers.referer
    host: String,                               // req.headers.host (your domain)
    ip: { type: String, index: true },
    userAgent: String,
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("ApiRequest", ApiRequestLogSchema);
