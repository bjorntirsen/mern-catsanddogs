const { ObjectId } = require("mongoose").Types;
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

async function isMissingOrderItem(order) {
  let missingOrderItem = false;
  const productsPromises = [];
  order.forEach((orderItem) => {
    productsPromises.push(
      ObjectId.isValid(orderItem.productId)
        ? Product.findById(orderItem.productId).exec()
        : null
    );

    const missingProductId =
      orderItem.productId === "" || typeof orderItem.productId === "undefined";

    const missingAmount =
      orderItem.amount <= 0 || typeof orderItem.amount === "undefined";

    const missingPrice =
      orderItem.unitPriceAtPurchase <= 0 ||
      typeof orderItem.unitPriceAtPurchase === "undefined";

    missingOrderItem =
      missingOrderItem || missingPrice || missingAmount || missingProductId;
  });

  const arrayOfProducts = await Promise.all(productsPromises);
  const isMissingProducts = arrayOfProducts.includes(null);

  missingOrderItem = missingOrderItem || isMissingProducts;

  return missingOrderItem;
}

// Helper function to see if cart is valid & enough stock
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
  //If any product in cart is not valid
  if (arrayOfProducts.some((el) => el === null)) return "invalid products";
  //If there is not enough stock to cover order
  let notEnoughStock = false;
  arrayOfProducts.forEach((item, index) => {
    if (item.stock < updatedCart[index].amount) {
      notEnoughStock = true;
    }
  });
  if (notEnoughStock) return "not enough stock";
  return true;
};

// Helper function to update Stock
const updateStock = async (order) => {
  const productsPromises = [];
  order.forEach((orderItem) => {
    const update = {
      $inc: { stock: -orderItem.amount },
    };
    productsPromises.push(
      Product.findOneAndUpdate({ _id: orderItem.productId }, update, {
        new: true,
      })
    );
  });

  await Promise.all(productsPromises);
  return true;
};

const createOrder = catchAsync(async (req, res, next) => {
  const validCart = await cartIsValid(req.body.content);
  const customerId = req.user._id;
  if (!req.body.content || validCart === "invalid products") {
    return next(
      new AppError(
        "You need to provide price, a valid product id, amount, shipping cost and delivery address to place an order.",
        401
      )
    );
  }
  if (validCart === "not enough stock") {
    return next(
      new AppError("We do not have enough stock to cover that order.", 401)
    );
  }
  const { content } = req.body;
  const orderPayLoad = {
    content,
    customerId,
    deliveryAddress: req.user.address,
    shippingCost: 15,
  };
  const newOrder = await Order.create(orderPayLoad);
  // Empty cart array in User
  const filter = { _id: customerId };
  const update = {
    $set: { cart: [] },
  };
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (!updatedUser) return next(new AppError("Could not empty array", 500));
  // Update Stock according to order
  const stockWasUpdated = await updateStock(content);
  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
      order: newOrder,
      stockWasUpdated,
    },
  });
});

const getOrders = catchAsync(async (req, res, next) => {
  const customerId = req.user._id;
  //Will only limit query by customerId for non-admins
  const limitQuery = req.user.adminUser ? {} : { customerId: customerId };
  const orders = await Order.find(limitQuery);
  if (!orders) {
    return next(new AppError("No orders found.", 404));
  }
  res.status(200).json({
    status: "success",
    ordersPlaced: orders.length,
    data: {
      orders,
    },
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.orderId });
  if (!order) {
    return res.status(404).json("No order with that id was found.");
  }
  if (!order.customerId.equals(ObjectId(req.user._id)) && !req.user.adminUser) {
    return next(
      new AppError("You don't have permission to access this resource", 403)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

const updateOrderById = catchAsync(async (req, res, next) => {
  const missingOrderItem = await isMissingOrderItem(req.body.content);
  const order = await Order.findOne({ _id: req.params.orderId });
  if (!order) {
    return next(new AppError("No order with that id found.", 404));
  }
  if (
    !req.body.customerId ||
    !req.body.deliveryAddress ||
    !req.body.status ||
    !req.body.content ||
    !req.body.shippingCost ||
    missingOrderItem
  ) {
    return next(
      new AppError(
        "You need to provide content, status and delivery address to place an order.",
        401
      )
    );
  }
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: order._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      order: updatedOrder,
    },
  });
});

const updateStatusById = catchAsync(async (req, res, next) => {
  if (!req.body.status) {
    return next(
      new AppError("You need to provide the status of the order.", 400)
    );
  }
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("No order with that id found.", 404));
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      order: updatedOrder,
    },
  });
});

const deleteOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findOneAndDelete({ _id: req.params.orderId });
  if (!order) {
    return next(new AppError("No order with that orderId found.", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  updateStatusById,
  deleteOrderById,
};
