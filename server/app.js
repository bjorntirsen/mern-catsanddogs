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
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.on("open", () => {
  console.log("MongoDB database connection established successfully!");
});
connection.on("error", (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
