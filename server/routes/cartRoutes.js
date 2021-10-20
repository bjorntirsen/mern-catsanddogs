const express = require("express");
const { ObjectId } = require("mongoose").Types;

const User = require("../models/userModel");
const Product = require("../models/productModel");
const { protect } = require("../controllers/authControllers");

const router = express.Router();

// CRUD operations
// (Create) Add one item to cart
router.post("/addOne", protect, async (req, res, next) => {
  try {
    if (!req.body.id) {
      return res
        .status(401)
        .json(
          "You need to provide the id of the product you wish to add to cart."
        );
    }
    const product = await Product.findById(req.body.id);
    if (!product) return res.status(400).json("Invalid product id.");
    const user = await User.findById(req.user._id);
    // If the cart is empty or item is not in cart
    if (
      user.cart.length === 0 ||
      user.cart.filter((item) => item.productId.equals(ObjectId(req.body.id)))
        .length === 0
    ) {
      const filter = { _id: req.user };
      const update = {
        $push: { cart: { productId: product._id, amount: 1 } },
      };

      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    }
    // If the item is already in cart
    if (
      user.cart.filter((item) => item.productId.equals(ObjectId(req.body.id)))
        .length > 0
    ) {
      const subdocument = user.cart.find((item) =>
        item.productId.equals(ObjectId(req.body.id))
      );
      const filter = { _id: req.user, "cart._id": subdocument._id };
      const update = {
        $inc: { "cart.$.amount": 1 },
      };
      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// (Create) Add many of one item to cart
router.post("/addMany", protect, async (req, res, next) => {
  try {
    if (!req.body.id || !req.body.amount) {
      return res
        .status(401)
        .json(
          "You need to provide the id of the product and the amount you wish to add to cart."
        );
    }
    const product = await Product.findById(req.body.id);
    if (!product) return res.status(400).json("Invalid product id.");
    const user = await User.findById(req.user._id);
    // If the cart is empty or item is not in cart
    if (
      user.cart.length === 0 ||
      user.cart.filter((item) => item.productId.equals(ObjectId(req.body.id)))
        .length === 0
    ) {
      const filter = { _id: req.user };
      const update = {
        $push: { cart: { productId: product._id, amount: +req.body.amount } },
      };

      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    }
    // If the item is already in cart
    if (
      user.cart.filter((item) => item.productId.equals(ObjectId(req.body.id)))
        .length > 0
    ) {
      const subdocument = user.cart.find((item) =>
        item.productId.equals(ObjectId(req.body.id))
      );
      const filter = { _id: req.user, "cart._id": subdocument._id };
      const update = {
        $inc: { "cart.$.amount": +req.body.amount },
      };
      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get user's cart!
router.get("/", protect, async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json("User not found");
    const { cart } = user;
    res.status(200).json({
      status: "success",
      cart,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update the entire cart
// TODO:
// router.post("/update/:cartItemId", protect, async (req, res) => {
//   const { amount } = req.body;
//   try {
//     if (amount < 1)
//       return res.status(404).json("Amount of product must be min 1");
//     const filter = { _id: req.user, "cart._id": req.params.cartItemId };
//     const update = {
//       $set: { "cart.$.amount": amount },
//     };
//     const updatedUser = await User.findOneAndUpdate(filter, update, {
//       new: true,
//     });
//     res.status(200).json({
//       status: "success",
//       cart: updatedUser.cart,
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Empty the entire cart
// TODO:
// router.delete("/delete/:cartItemId", protect, async (req, res) => {
//   try {
//     const filter = { _id: req.user };
//     const update = {
//       $pull: { cart: { _id: req.params.cartItemId } },
//     };
//     const updatedUser = await User.findOneAndUpdate(filter, update, {
//       new: true,
//     });
//     res.status(200).json({
//       status: "success",
//       cart: updatedUser.cart,
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
