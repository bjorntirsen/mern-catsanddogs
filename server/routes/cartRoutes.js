const express = require("express");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const router = express.Router();

// CREATE
router.post("/add", async (req, res) => {
  const { item, userId } = req.body;
  try {
    const product = await Product.findOne({ _id: item.id });
    if (!product) return res.status(404).send("Product not found");

    const filter = { _id: userId };
    const update = {
      $push: { cart: { productId: product._id, amount: item.amount } },
    };

    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// READ
router.get("/", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json("User not found");
    const { cart } = user;
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE
router.post("/:id", (req, res) => {});

// DELETE
router.delete("/:id", (req, res) => {});

module.exports = router;
