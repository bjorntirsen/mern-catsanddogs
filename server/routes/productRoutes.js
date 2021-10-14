const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

let TestProducts = [
  {
    id: 1,
    title: "Chewi Toy",
    body: "A chewi toy for your dog to play with",
  },
  {
    id: 2,
    title: "Cat light",
    body: "Disctract your cat with this cool light",
  },
];

//CRUD routes
//CREATE one product
router.post("/", async (req, res, next) => {
  console.log("inside route handler");
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
    const { title, price, category, description, imageUrl, weight, maker } =
      req.body;
    const newProduct = await Product.create({
      title,
      price,
      category,
      description,
      imageUrl,
      weight,
      maker,
    });
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

// get all
router.get("/", (req, res, next) => {
  res.json(TestProducts);
});

// get one
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const product = TestProducts.find((doc) => doc.id === id);
    if (!product) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      res.json(product);
    }
  }
});

// update
router.post("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const product = TestProducts.find((doc) => doc.id === id);
    if (!product) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      const updatedItem = req.body;
      product.title = updatedItem.title;
      product.body = updatedItem.body;
      console.log("product updated");
      res.json(product);
    }
  }
});

// delete
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const product = TestProducts.find((doc) => doc.id === id);
    if (!product) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      TestProducts = TestProducts.filter((doc) => doc.id !== id);
      res.statusCode = 200;
      res.end();
    }
  }
});

module.exports = router;
