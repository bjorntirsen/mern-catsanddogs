const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A product name must have less or equal then 40 characters",
    ],
    minlength: [5, "A product name must have more or equal then 5 characters"],
  },
  price: { type: Number, required: [true, "A product must have a price"] },
  category: {
    type: String,
    enum: {
      values: ["cat", "dog"],
      message: "Available categories is either: cat or dog",
    },
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
    maxlength: [
      1024,
      "A product description must have less or equal then 1024 characters",
    ],
    minlength: [
      15,
      "A product description must have more or equal then 15 characters",
    ],
  },
  imageUrl: {
    type: String,
    required: [true, "A product must have an image"],
  },
  weight: {
    type: String,
    required: [true, "A product must have a weight"],
  },
  maker: {
    type: String,
    required: [true, "A product must have a maker"],
  },
  slug: {
    type: String,
    unique: true,
  },
  stock: {
    type: Number,
    required: [true, "A product must have a stock number"],
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("product", productSchema);
