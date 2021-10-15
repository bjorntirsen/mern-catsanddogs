const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: [true, "An order must have a delivery address"],
  },
  datePlaced: {
    type: Date,
    default: new Date(),
    required: [true, "An order must have a date of placed"],
  },
  dateShipped: {
    type: Date,
  },
  status: {
    type: String,
    required: [true, "An order must have a status"],
    default: "Registered",
  },
  content: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      amount: {
        type: String,
        required: [true, "An product must have an amount"],
      },
      unitPriceAtPurchase: {
        type: Number,
        required: [true, "An product must have a price at purchase"],
      },
    },
  ],
});

module.exports = mongoose.model("order", orderSchema);
