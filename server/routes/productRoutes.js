const express = require("express");

const router = express.Router();
const Product = require('../models/productModel');

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

// get all
router.get("/", (req, res, next) => {
  res.json(TestProducts);
});

// post
router.post("/", (req, res, next) => {
  TestProducts.push(req.body);
  console.log("product created");
  res.json(TestProducts);
});

//add one
router.post("/add-product", (req, res, next) => {
  const { title, price, description, imageUrl, weight, maker } = req.body;
  const product = new Product({
    title, price, description, imageUrl, weight, maker
  });
  product
    .save()
    .then( result => {
      console.log('Product created');
      res.redirect('/products');
    })
    .catch(err => {
      console.log(err);
    })
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
