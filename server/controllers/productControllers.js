const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//CRUD operations
//CREATE one product
// ADMIN ONLY
const createOneProduct = catchAsync(async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.price ||
    !req.body.category ||
    !req.body.description ||
    !req.body.imageUrl ||
    !req.body.weight ||
    !req.body.maker ||
    !req.body.stock
  ) {
    return next(
      new AppError(
        "You need to provide title, price, category, description, imageUrl, weight, maker and stock to add a new product.",
        401
      )
    );
  }
  const {
    title,
    price,
    category,
    description,
    imageUrl,
    weight,
    maker,
    stock,
  } = req.body;

  const product = {
    title,
    price: parseInt(price, 10),
    category,
    description,
    imageUrl,
    weight,
    maker,
    stock: parseInt(stock, 10),
  };

  const newProduct = await Product.create(product);
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

// READ get all products
const readAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  if (!products) {
    return next(new AppError("No products found.", 404));
  }
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// READ get all products in a category
const readProductsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  if (category !== "dog" && category !== "cat") {
    return next(
      new AppError("Provide either 'cat' or 'dog' as category.", 401)
    );
  }
  const products = await Product.find({ category });
  if (!products) {
    return next(new AppError("No products found.", 404));
  }
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// READ get one product by slug
const readOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return next(new AppError("No product with that slug found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// UPDATE one product by slug
// ADMIN ONLY
const updateOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return next(new AppError("No product with that slug found.", 404));
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
    return next(
      new AppError(
        "You need to provide title, price, category, description, imageUrl, weight, maker to update a product.",
        404
      )
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
});

// DELETE one product by slug
// ADMIN ONLY
const deleteOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOneAndDelete({ slug: req.params.slug });
  if (!product) {
    return next(new AppError("No product with that slug found.", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createOneProduct,
  readAllProducts,
  readProductsByCategory,
  readOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
