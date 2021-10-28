const { ObjectId } = require("mongoose").Types;

const User = require("../models/userModel");
const Product = require("../models/productModel");

// (Create) Add one item to cart
const createCartItem = async (req, res, next) => {
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
};

// (Create) Add many of one item to cart
const createCartItems = async (req, res, next) => {
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
};

// Get user's cart!
const getUserCart = async (req, res, next) => {
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
};

// Helper function to see if cart is valid
const cartIsValid = async (updatedCart) => {
  const productsPromises = [];
  updatedCart.forEach((orderItem) => {
    productsPromises.push(
      ObjectId.isValid(orderItem.productId)
        ? Product.findById(orderItem.productId).exec()
        : null
    );
  });

  const arrayOfProducts = await Promise.all(productsPromises);

  return !arrayOfProducts.some((el) => el === null);
};

// Update the entire cart
const updateCart = async (req, res, next) => {
  try {
    const { updatedCart } = req.body;
    const validCart = await cartIsValid(updatedCart);
    if (!validCart) {
      return res
        .status(401)
        .json("One or more items in your cart are not valid products.");
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: { cart: updatedCart },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// (Delete) Empty the entire cart
const emptyCart = async (req, res, next) => {
  try {
    const filter = { _id: req.user._id };
    const update = {
      $set: { cart: [] },
    };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createCartItem,
  createCartItems,
  getUserCart,
  updateCart,
  emptyCart,
};
