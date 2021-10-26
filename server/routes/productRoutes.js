const express = require("express");
const { protect, restrictToAdmin } = require("../controllers/authControllers");

const {
  createOneProduct,
  readAllProducts,
  readProductsByCategory,
  readOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.post("/", protect, restrictToAdmin, createOneProduct);

router.get("/", readAllProducts);

router.get("/categories/:category", readProductsByCategory);

router.get("/:slug", readOneProduct);

router.post("/:slug", protect, restrictToAdmin, updateOneProduct);

router.delete("/:slug", protect, restrictToAdmin, deleteOneProduct);

module.exports = router;
