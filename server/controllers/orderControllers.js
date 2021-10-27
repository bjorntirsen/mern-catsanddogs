const { ObjectId } = require("mongoose").Types;
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Helper function to see if cart is valid
const cartIsValid = async (updatedCart) => {
  // console.log("DEBUG", updatedCart);
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

// Helper function to see if we have enough stock
const checkEnoughStock = async (validOrder) => {
  console.log("DEBUG2", validOrder);
  const productsPromises = [];
  validOrder.forEach(async (orderItem) => {
    let enoughStock = true;
    const product = await Product.findById(orderItem.productId);
    if (orderItem.amount > product.stock) enoughStock = false;
    productsPromises.push(enoughStock);
  });

  const arrayOfProducts = await Promise.all(productsPromises);
  console.log("DEBUG3", arrayOfProducts);

  // return !arrayOfProducts.some((el) => el === null);
  return arrayOfProducts;
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

const createOrder = async (req, res, next) => {
  // const missingOrderItem = await isMissingOrderItem(req.body.content);
  try {
    const validCart = await cartIsValid(req.body.content);
    const customerId = req.user._id;
    if (!req.body.content || !validCart) {
      return res
        .status(401)
        .json(
          "You need to provide price, a valid product id, amount, shipping cost and delivery address to place an order."
        );
    }
    const enoughStock = await checkEnoughStock(req.body.content);
    return res.status(200).json(enoughStock);
    // if (!enoughStock)
    //   return res
    //     .status(401)
    //     .json("We do not have enough stock to cover that order.");
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
    if (!updatedUser) return res.status(500).json("Could not empty array");
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
  } catch (err) {
    res.status(400).json(err);
  }
};

const getOrders = async (req, res, next) => {
  const customerId = req.user._id;
  try {
    //Will only limit query by customerId for non-admins
    const limitQuery = req.user.adminUser ? {} : { customerId: customerId };
    const orders = await Order.find(limitQuery);
    if (!orders) {
      return res.status(404).json("No orders found.");
    }
    res.status(200).json({
      status: "success",
      ordersPlaced: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId });
    if (!order) {
      return res.status(404).json("No order with that id was found.");
    }
    if (
      !order.customerId.equals(ObjectId(req.user._id)) &&
      !req.user.adminUser
    ) {
      return res
        .status(403)
        .json("You don't have permission to access this resource");
    }
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createOrder, getOrders, getOrderById };
