const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
