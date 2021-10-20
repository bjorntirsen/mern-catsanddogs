const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "An order must have an id of customer."],
  },
  deliveryAddress: {
    type: String,
    required: [true, "An order must have a delivery address."],
  },
  datePlaced: {
    type: Date,
    default: new Date(),
    required: [true, "An order must have a date of placed."],
  },
  dateShipped: {
    type: Date,
  },
  shippingCost: {
    type: Number,
    required: [true, "An order must have a shipping cost."],
  },
  status: {
    type: String,
    required: [true, "An order must have a status."],
    default: "Registered",
  },
  content: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "An order must have an id of product."],
      },
      amount: {
        type: String,
        required: [true, "An order must have an amount of product."],
      },
      unitPriceAtPurchase: {
        type: Number,
        required: [true, "An order must have a price of unit at purchase."],
      },
    },
  ],
});

module.exports = mongoose.model("order", orderSchema);
