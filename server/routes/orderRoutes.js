const express = require("express");
const { ObjectId } = require("mongoose").Types;
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderControllers");

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
router.post("/", protect, createOrder);

// READ get all orders
router.get("/", protect, getOrders);

// READ get one order by orderId
router.get("/:orderId", protect, getOrderById);

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

// UPDATE status of order by orderId
router.patch(
  "/status/:id",
  protect,
  restrictToAdmin,
  async (req, res, next) => {
    try {
      if (!req.body.status) {
        return res
          .status(400)
          .json("You need to provide the status of the order.");
      }
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json("No order with that id found.");
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
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

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
