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

    // Sparse: articles without a slug are still allowed, and `null` slugs must
    // not collide with each other under the unique index.
    url: { type: String, trim: true, default: null, unique: true, sparse: true },

    category: { type: String, trim: true, default: '' },
    metaDescription: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });
blogSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
