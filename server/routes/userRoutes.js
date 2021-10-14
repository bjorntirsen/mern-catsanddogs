/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const faker = require("faker/locale/sv");
const User = require("../models/userModel");

const router = express.Router();

//SIGNUP
//skapa user i databas utan krypterat lösen
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
    const { fullName, password, passwordConfirm, email, phone, address } =
      req.body;
    if (password !== passwordConfirm) {
      return res.status(401).json("Passwords do not match");
    }
    const newUser = await User.create({
      fullName,
      password,
      email,
      phone,
      address,
    });
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    res.status(400).json(err);
  }
});

let TestUsers = [
  {
    id: 1,
    fullName: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    address: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.cityName()}, ${faker.address.country()}`,
  },
  {
    id: 2,
    fullName: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    address: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.cityName()}, ${faker.address.country()}`,
  },
  {
    id: 3,
    fullName: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    address: `${faker.address.streetAddress()}, ${faker.address.zipCode()} ${faker.address.cityName()}, ${faker.address.country()}`,
  },
];

// get all
router.get("/", (req, res, next) => {
  res.json(TestUsers);
});

// post
router.post("/", (req, res, next) => {
  TestUsers.push(req.body);
  console.log("user created");
  res.json(TestUsers);
});

// get one
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const user = TestUsers.find((doc) => doc.id === id);
    if (!user) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      res.json(user);
    }
  }
});

// update
router.post("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const user = TestUsers.find((doc) => doc.id === id);
    if (!user) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      const { fullName, password, email, phoneNumber, address } = req.body;
      user.fullName = fullName;
      user.password = password;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.address = address;
      console.log("user updated");
      res.json(user);
    }
  }
});

// delete
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const user = TestUsers.find((doc) => doc.id === id);
    if (!user) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      TestUsers = TestUsers.filter((doc) => doc.id !== id);
      res.statusCode = 200;
      res.end();
    }
  }
});

module.exports = router;
