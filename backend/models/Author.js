const mongoose = require('mongoose');

/**
 * A named expert who writes or reviews Resources articles.
 *
 * Exists for E-E-A-T: Google and AI answer engines weigh who wrote financial
 * advice. Each author gets a public profile at /team/<slug> on the frontend,
 * and articles credit them as a schema.org Person. `photo` is an absolute URL
 * under /uploads/authors/ (see routes/authors.js).
 */
const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    role: { type: String, trim: true, default: '' },
    // Plain text; blank lines separate paragraphs.
    bio: { type: String, trim: true, default: '' },
    // Qualifications and memberships, e.g. "AIBB Certified Business Broker".
    credentials: { type: [String], default: [] },
    photo: { type: String, default: null },
    linkedin: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', authorSchema);
