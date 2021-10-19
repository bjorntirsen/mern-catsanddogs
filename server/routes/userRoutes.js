/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protect = require("../controllers/auth/protect");
const restrictToAdmin = require("../controllers/auth/restrictToAdmin");

const router = express.Router();

// HELPER FUNCTIONS
const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, req, res) => {
  const token = generateToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// CRUD OPERATIONS
// SIGNUP (CREATE user)
router.post("/signup", async (req, res, next) => {
  try {
    if (
      !req.body.fullName ||
      !req.body.password ||
      !req.body.passwordConfirm ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.address
    ) {
      return res
        .status(401)
        .json(
          "You need to provide fullName, password, passwordConfirm, email, phone, address to sign up."
        );
    }
    const {
      fullName,
      password: unencryptedPassword,
      passwordConfirm,
      email,
      phone,
      address,
    } = req.body;
    if (unencryptedPassword !== passwordConfirm) {
      return res.status(401).json("Passwords do not match.");
    }
    //Encrypt password
    //Auto-gen a salt and hash with bcryptjs
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(unencryptedPassword, saltRounds);
    const newUser = await User.create({
      fullName,
      password: hashedPassword,
      email,
      phone,
      address,
    });
    createAndSendToken(newUser, 201, req, res);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const value = Object.values(err.keyValue)[0];
      const message = `The ${field} must be unique, ${value} already exists in the Database. Please use another value.`;
      return res.status(400).json({ message, errorCode: err.code });
    }
    res.status(400).json(err);
  }
});

// LOGIN ROUTE som returnerar en JWT
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) check if email and pass are provided
    if (!email || !password) {
      return res.status(400).json("Please provide email and password.");
    }
    // 2) if user exists && pass is valid
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json("Incorrect email or password.");
    }

    // 3) if everything ok, send token
    createAndSendToken(user, 200, req, res);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GETME (READ user data)
router.get("/getMe", protect, (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

// DELETE user (for testing purposes)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("No user with that id found.");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET only for admin (for testing purposes)
router.get("/onlyAdmin", protect, restrictToAdmin, (req, res, next) => {
  res.status(200).json("You are an admin user!");
});

module.exports = router;
