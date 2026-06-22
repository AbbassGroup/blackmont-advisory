const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// The business owner attached to a single deal. One vendor per listing.
const vendorSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
      unique: true,
      index: true,
    },
    // Logs in with email or username; both stored lowercased.
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

vendorSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) {
    throw new Error('Password data missing');
  }
  return bcrypt.compare(enteredPassword, this.password);
};

// Hash only when the password actually changes.
vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Vendor', vendorSchema);
