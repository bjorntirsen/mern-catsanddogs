const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A user must have a full name"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
  },
  phone: {
    type: Number,
    required: [true, "A user must have a telefon"],
  },
  address: {
    type: String,
    required: [true, "A user must have an adress"],
  },
});

module.exports = mongoose.model("user", userSchema);
