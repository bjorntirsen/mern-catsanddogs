const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

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

const createUser = catchAsync(async (req, res, next) => {
  if (
    !req.body.fullName ||
    !req.body.password ||
    !req.body.passwordConfirm ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.address
  ) {
    return next(
      new AppError(
        "You need to provide fullName, password, passwordConfirm, email, phone, address to sign up.",
        401
      )
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
    return next(new AppError("Passwords do not match.", 401));
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
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and pass are provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }
  // 2) if user exists && pass is valid
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 401));
  }

  // 3) if everything ok, send token
  createAndSendToken(user, 200, req, res);
});

const getMe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

const updateMe = catchAsync(async (req, res, next) => {
  // Do not allow password updates
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }
  // Filter out fields that are not allowed to be updated
  const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((element) => {
      if (allowedFields.includes(element)) newObj[element] = obj[element];
    });
    return newObj;
  };
  const filteredBody = filterObj(
    req.body,
    "fullName",
    "email",
    "phone",
    "address"
  );
  if (
    !req.body.fullName ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.address
  ) {
    return next(new AppError("No field shall be left empty!", 400));
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

module.exports = {
  createUser,
  loginUser,
  getMe,
  updateMe,
};
