const express = require("express");
const { protect } = require("../controllers/authControllers");

const {
  createCartItem,
  createCartItems,
  getUserCart,
  updateCart,
  emptyCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.post("/addOne", protect, createCartItem);

router.post("/addMany", protect, createCartItems);

router.get("/", protect, getUserCart);

router.post("/update", protect, updateCart);

router.delete("/emptyCart", protect, emptyCart);

module.exports = router;
