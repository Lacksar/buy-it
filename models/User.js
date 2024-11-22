const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    pincode: { type: Number, default: 0 },
    phone: { type: Number, default: 0 },
    address: { type: String, default: "" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      // Check if password is modified
      const salt = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to hash the password before updating
UserSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      // Ensure the password is being updated
      const salt = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(this._update.password, salt);
      this._update.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Directly return the promise
};

// Method to remove sensitive data from the user object before sending it to the client
UserSchema.methods.toPublicJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  return user;
};

mongoose.models = {}; // Reset mongoose model cache to prevent errors with Next.js hot reload
const User = mongoose.model("User", UserSchema);

export default User;
