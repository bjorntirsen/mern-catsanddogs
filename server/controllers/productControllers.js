const Product = require("../models/productModel");

//CRUD operations
//CREATE one product
// ADMIN ONLY
const createOneProduct = async (req, res, next) => {
  try {
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
      return res
        .status(401)
        .json(
          "You need to provide title, price, category, description, imageUrl, weight, maker and stock to add a new product."
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
  } catch (err) {
    res.status(400).json(err);
  }
};

// READ get all products
const readAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json("No products found.");
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
};

// READ get all products in a category
const readProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    if (category !== "dog" && category !== "cat") {
      return res.status(401).json("Provide either 'cat' or 'dog' as category.");
    }
    const products = await Product.find({ category });
    if (!products) {
      return res.status(404).json("No products found.");
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
};

// READ get one product by slug
const readOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json("No product with that slug found.");
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
};

// UPDATE one product by slug
// ADMIN ONLY
const updateOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json("No product with that slug found.");
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
      return res
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
};

// DELETE one product by slug
// ADMIN ONLY
const deleteOneProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const product = await Product.findOneAndDelete({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json("No product with that slug found.");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createOneProduct,
  readAllProducts,
  readProductsByCategory,
  readOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
