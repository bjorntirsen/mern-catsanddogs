var express = require("express");
var router = express.Router();
const Product = require('../models/productModel');

router.post("/add-product", (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const weight = req.body.weight;
  const maker = req.body.maker;
  const product = new Product({
    title: title, price: price, description: description,
    imageUrl: imageUrl, weight: weight, maker: maker
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
module.exports = router;