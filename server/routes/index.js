var express = require('express');
var router = express.Router();

const TestProducts = [
  {
    id: 1,
    title: 'Chewi Toy',
    body: 'A chewi toy for your dog to play with'
  },
  {
    id: 2,
    title: 'Cat light',
    body: 'Disctract your cat with this cool light'
  },
]

// get all
router.get('/api/products', function (req, res, next) {
  res.json(TestProducts);
});

// post
router.post('/api/products', function (req, res, next) {
  TestProducts.push(req.body);
  console.log('product created');
  res.json(TestProducts);
});

// get one
router.get('/api/product/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = TestProducts.find((item) => {
    return item.id === itemId
  });
  res.json(item);
});

// delete
router.delete('/api/product/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const removeIndex = TestProducts.findIndex(item => item.id === itemId);
  TestProducts.splice(removeIndex, 1);
  console.log('product deleted');
  res.json(TestProducts);
});

// update
router.post('/api/product/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = TestProducts.find((item) => {
    return item.id === itemId
  });

  const updatedItem = req.body;
  item.title = updatedItem.title;
  item.body = updatedItem.body;
  console.log('product updated')
  res.json(item);
})

module.exports = router;