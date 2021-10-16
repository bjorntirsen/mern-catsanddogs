const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

//CRUD operations
//CREATE one product
router.post("/", async (req, res, next) => {
  try {
    if (
      !req.body.title ||
      !req.body.price ||
      !req.body.category ||
      !req.body.description ||
      !req.body.imageUrl ||
      !req.body.weight ||
      !req.body.maker
    ) {
      res
        .status(401)
        .json(
          "You need to provide title, price, category, description, imageUrl, weight, maker to add a new product."
        );
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// READ get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404).json("No products found.");
    }
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// READ get all products in a category
router.get("/categories/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    if (category !== "dog" && category !== "cat") {
      res.status(401).json("Provide either 'cat' or 'dog' as category.");
    }
    const products = await Product.find({ category });
    if (!products) {
      res.status(404).json("No products found.");
    }
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// READ get one product by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json("No product with that slug found.");
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE one product by slug
router.post("/:slug", async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json("No product with that slug found.");
    }
    if (
      !req.body.title ||
      !req.body.price ||
      !req.body.category ||
      !req.body.description ||
      !req.body.imageUrl ||
      !req.body.weight ||
      !req.body.maker
    ) {
      res
        .status(401)
        .json(
          "You need to provide title, price, category, description, imageUrl, weight, maker to update a product."
        );
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: product.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE one product by slug
router.delete("/:slug", async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ slug: req.params.slug });
    if (!product) {
      res.status(404).json("No product with that slug found.");
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
