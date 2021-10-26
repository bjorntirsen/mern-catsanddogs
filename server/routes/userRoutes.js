/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const { protect, restrictToAdmin } = require("../controllers/authControllers");
const {
  createUser,
  loginUser,
  getMe,
  updateMe,
  deleteUser,
  getAdmin,
} = require("../controllers/userControllers");

const router = express.Router();

// CRUD OPERATIONS
// SIGNUP (CREATE user)
router.post("/signup", createUser);

// LOGIN ROUTE som returnerar en JWT
router.post("/login", loginUser);

// GETME (READ user data)
router.get("/getMe", protect, getMe);

// UPDATE user
router.patch("/updateMe", protect, updateMe);

// DELETE user (for testing purposes)
router.delete("/:id", protect, deleteUser);

// GET only for admin (for testing purposes)
router.get("/onlyAdmin", protect, restrictToAdmin, getAdmin);

module.exports = router;
