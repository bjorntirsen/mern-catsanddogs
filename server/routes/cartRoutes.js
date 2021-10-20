const express = require("express");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/userModel");
const Product = require("../models/productModel");
const { protect } = require("../controllers/authControllers");

const router = express.Router();

// Helper function
// const containsInvalidProducts = async (updateToCart) => {
//   let invalidProducts = false;
//   const productsPromises = [];
//   updateToCart.forEach((orderItem) => {
//     productsPromises.push(
//       ObjectId.isValid(orderItem.productId)
//         ? Product.findById(orderItem.productId).exec()
//         : null
//     );

//     const missingProductId =
//       orderItem.productId === "" || typeof orderItem.productId === "undefined";

//     const missingAmount = typeof orderItem.amount === "undefined";

//     invalidProducts = invalidProducts || missingAmount || missingProductId;
//   });

//   const arrayOfProducts = await Promise.all(productsPromises);
//   const isMissingProducts = arrayOfProducts.includes(null);

//   missingOrderItem = missingOrderItem || isMissingProducts;

//   return missingOrderItem;
// };

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
    // If the cart is empty
    if (user.cart.length === 0) {
      const filter = { _id: req.user };
      const update = {
        $push: { cart: { productId: product._id, amount: 1 } },
      };

      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.json(updatedUser);
    }
    // If the item is already in cart
    if (
      user.cart.filter((item) => item.productId.equals(ObjectId(req.body.id)))
        .length > 0
    ) {
      const subdocument = user.cart.find((item) =>
        item.productId.equals(ObjectId(req.body.id))
      );
      console.log(user.cart);
      console.log(subdocument._id);
      const filter = { _id: req.user, "cart._id": subdocument._id };
      const update = {
        $inc: { "cart.$.amount": 1 },
      };
      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).json({
        status: "success",
        cart: updatedUser.cart,
      });
    }
    return res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Add product + amount to user's cart
router.post("/update", protect, async (req, res) => {
  try {
    // updateToCart should be an array of objects
    const { updateToCart } = req.body;
    if (!updateToCart)
      return res.status(400).json("You need to provide an update to your cart");
    // Check if all items in updateToCart are valid products
    await Promise.all(
      updateToCart.forEach(async (item) => {
        try {
          const product = await Product.findById(item.id);
          if (!product)
            return new Error(
              "At least one of the items in updateToCart is not a valid product"
            );
        } catch (err) {
          return new Error(err);
        }
      })
    );
    res.json(updateToCart);
    // const product = await Product.findOne({ _id: item.id });
    // if (!product) return res.status(404).json("Product not found");
    // if (item.amount < 1)
    //   return res.status(404).json("Amount of product must be min 1");

    // const filter = { _id: req.user };
    // const update = {
    //   $push: { cart: { productId: product._id, amount: item.amount } },
    // };

    // const updatedUser = await User.findOneAndUpdate(filter, update, {
    //   new: true,
    // });
    // res.json(updatedUser);
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

// Update amount of product in users's cart
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

// Remove item in user's cart
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
