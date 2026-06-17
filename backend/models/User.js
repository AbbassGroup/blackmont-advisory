const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!enteredPassword || !this.password) {
        throw new Error("Password data missing");
    }
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre("save", async function (next) {
    // Only (re)hash when the password actually changed — otherwise saving a user
    // for an unrelated field change (e.g. editing username/email) would re-hash
    // the already-hashed value and break their login.
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", userSchema);
