var express = require("express");
var router = express.Router();

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
router.get("/api/products", function (req, res, next) {
  res.json(TestProducts);
});

// post
router.post("/api/products", function (req, res, next) {
  TestProducts.push(req.body);
  console.log("product created");
  res.json(TestProducts);
});

// get one
router.get("/api/product/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const item = TestProducts.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      res.json(item);
    }
  }
});

// update
router.post("/api/product/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const item = TestProducts.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      const updatedItem = req.body;
      item.title = updatedItem.title;
      item.body = updatedItem.body;
      console.log("product updated");
      res.json(item);
    }
  }
});

// delete
router.delete("/api/product/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const item = TestProducts.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      TestProducts = TestProducts.filter((item) => item.id !== id);
      res.statusCode = 200;
      res.end();
    }
  }
});

module.exports = router;
