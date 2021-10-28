const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productsRouter = require("./routes/productRoutes");
const usersRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartsRouter = require("./routes/cartRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://mern-catsanddogs.netlify.app",
    ],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/carts", cartsRouter);

// Global error handler
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];
    const message = `The ${field} must be unique, ${value} already exists in the Database. Please use another value.`;
    return res.status(400).json({ message, errorCode: err.code });
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port);

module.exports = app;
