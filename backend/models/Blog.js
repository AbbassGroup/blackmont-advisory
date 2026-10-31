const mongoose = require('mongoose');

/**
 * A resources/blog article.
 *
 * `content` is rich HTML produced by the admin editor. `image` is the cover
 * image — an absolute URL pointing at a file under /uploads/blogs/ (see
 * routes/blogs.js). `url` is the public slug the article is served under
 * (/resources/<url> on the frontend); it is unique so two articles can never
 * fight over the same public path.
 */
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: null },
    // Describes the cover for screen readers and image search. Empty means the
    // frontend falls back to the title.
    imageAlt: { type: String, trim: true, default: '' },

    // Sparse: articles without a slug are still allowed, and `null` slugs must
    // not collide with each other under the unique index.
    url: { type: String, trim: true, default: null, unique: true, sparse: true },

    category: { type: String, trim: true, default: '' },
    metaDescription: { type: String, trim: true, default: '' },
    // Who wrote it. Null credits the firm. Populated on single-article reads.
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', default: null },

    // ── SEO / answer-engine fields — all optional ───────────────────────────
    // Replaces `title` in the <title> tag only; the on-page heading stays `title`.
    seoTitle: { type: String, trim: true, default: '' },
    // The one phrase the article targets. Drives the admin's on-page checks.
    focusKeyword: { type: String, trim: true, default: '' },
    // Lowercased, de-duplicated topics. Used for related articles and the
    // `keywords` JSON-LD property — not for a <meta name="keywords"> tag.
    keywords: { type: [String], default: [] },
    // Short summary bullets shown above the body: the answer-first block AI
    // answer engines tend to quote.
    keyTakeaways: { type: [String], default: [] },
    // Rendered on the page and as FAQPage structured data.
    faqs: {
      type: [
        new mongoose.Schema(
          {
            question: { type: String, trim: true, required: true },
            answer: { type: String, trim: true, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });
blogSchema.index({ category: 1, createdAt: -1 });
blogSchema.index({ keywords: 1 });
blogSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
