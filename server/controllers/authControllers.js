const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// MIDDLEWARE
const protect = async (req, res, next) => {
  try {
    // 1) Check if token exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json("You are not logged in. Log in to access.");
    }

    // 2) Validate token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res
        .status(401)
        .json("The user belonging to the token does no longer exist.");
    }
    // Grant access
    req.user = currentUser;
    //res.locals.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};

// Must have protect before it in stack
const restrictToAdmin = async (req, res, next) => {
  try {
    if (!req.user.adminUser) {
      return res
        .status(403)
        .json("You do not have permission to perform this action");
    }
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { protect, restrictToAdmin };
