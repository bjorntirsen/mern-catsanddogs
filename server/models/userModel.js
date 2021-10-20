const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A user must have a full name"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    select: false,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "A user must have a telephone number."],
  },
  address: {
    type: String,
    required: [true, "A user must have an adress"],
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "An product in cart must have an id"],
      },
      amount: {
        type: Number,
        required: [true, "An product in cart must have an amount"],
        min: 1,
      },
    },
  ],
  adminUser: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
