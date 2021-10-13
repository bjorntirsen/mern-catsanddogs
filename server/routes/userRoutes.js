const express = require("express");
const router = express.Router();
const faker = require("faker/locale/sv");

const TestUsers = [
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
router.get("/", function (req, res, next) {
  res.json(TestUsers);
});

// post
router.post("/", function (req, res, next) {
  TestUsers.push(req.body);
  console.log("user created");
  res.json(TestUsers);
});

// get one
router.get("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const user = TestUsers.find((user) => user.id === id);
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
router.post("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const user = TestUsers.find((user) => user.id === id);
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
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = "Invalid id";
    res.end("Invalid id");
  } else {
    const user = TestUsers.find((user) => user.id === id);
    if (!user) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      TestUsers = TestUsers.filter((user) => user.id !== id);
      res.statusCode = 200;
      res.end();
    }
  }
});

module.exports = router;
