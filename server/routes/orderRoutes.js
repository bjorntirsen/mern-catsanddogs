const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  updateStatusById,
  deleteOrderById,
} = require("../controllers/orderControllers");

const router = express.Router();
const { protect, restrictToAdmin } = require("../controllers/authControllers");

//CRUD operations
router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

router.get("/:orderId", protect, getOrderById);

router.post("/:orderId", protect, restrictToAdmin, updateOrderById);

router.patch("/status/:id", protect, restrictToAdmin, updateStatusById);

router.delete("/:orderId", protect, restrictToAdmin, deleteOrderById);

module.exports = router;
