const express = require("express");
const { ObjectId } = require("mongoose").Types;
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const router = express.Router();
const { protect, restrictToAdmin } = require("../controllers/authControllers");

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

//CRUD operations
//CREATE one order
router.post("/", protect, async (req, res, next) => {
  const missingOrderItem = await isMissingOrderItem(req.body.content);
  const customerId = req.user._id;
  try {
    if (
      !customerId ||
      !req.body.deliveryAddress ||
      !req.body.content ||
      !req.body.shippingCost ||
      missingOrderItem
    ) {
      return res
        .status(401)
        .json(
          "You need to provide price, a valid product id, amount, shipping cost and delivery address to place an order."
        );
    }
    const orderPayLoad = {
      ...req.body,
      customerId,
    };
    const newOrder = await Order.create(orderPayLoad);
    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// READ get all orders
router.get("/", protect, async (req, res, next) => {
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
});

// READ get one order by orderId
router.get("/:orderId", protect, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId });
    if (!order) {
      return res.status(404).json("No order with that id was found.");
    }
    if (order.customerId !== req.user._id && !req.user.adminUser) {
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
});

// UPDATE one order by orderId
router.post("/:orderId", protect, restrictToAdmin, async (req, res, next) => {
  const missingOrderItem = await isMissingOrderItem(req.body.content);

  try {
    const order = await Order.findOne({ _id: req.params.orderId });
    if (!order) {
      return res.status(404).json("No order with that id found.");
    }
    if (
      !req.body.customerId ||
      !req.body.deliveryAddress ||
      !req.body.status ||
      !req.body.content ||
      !req.body.shippingCost ||
      missingOrderItem
    ) {
      return res
        .status(401)
        .json(
          "You need to provide content, status and delivery address to place an order."
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
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE one order by id
router.delete("/:orderId", protect, restrictToAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.orderId });
    if (!order) {
      return res.status(404).json("No order with that orderId found.");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
