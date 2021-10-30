const { ObjectId } = require("mongoose").Types;

const User = require("../models/userModel");
const Product = require("../models/productModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// (Create) Add one item to cart
const createCartItem = catchAsync(async (req, res, next) => {
  if (!req.body.id) {
    return next(
      new AppError(
        "You need to provide the id of the product you wish to add to cart.",
        400
      )
    );
  }
  const product = await Product.findById(req.body.id);
  if (!product) return next(new AppError("Invalid product id.", 400));
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
});

// (Create) Add many of one item to cart
const createCartItems = catchAsync(async (req, res, next) => {
  if (!req.body.id || !req.body.amount) {
    return next(
      new AppError(
        "You need to provide the id of the product and the amount you wish to add to cart.",
        400
      )
    );
  }
  const product = await Product.findById(req.body.id);
  if (!product) return next(new AppError("Invalid product id.", 400));

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
});

// Get user's cart!
const getUserCart = catchAsync(async (req, res, next) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  if (!user) return next(new AppError("User not found.", 404));
  const { cart } = user;
  res.status(200).json({
    status: "success",
    cart,
  });
});

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
const updateCart = catchAsync(async (req, res, next) => {
  const { updatedCart } = req.body;
  const validCart = await cartIsValid(updatedCart);
  if (!validCart) {
    return next(
      new AppError(
        "One or more items in your cart are not valid products.",
        400
      )
    );
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
});

// (Delete) Empty the entire cart
const emptyCart = catchAsync(async (req, res, next) => {
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
});

module.exports = {
  createCartItem,
  createCartItems,
  getUserCart,
  updateCart,
  emptyCart,
};
