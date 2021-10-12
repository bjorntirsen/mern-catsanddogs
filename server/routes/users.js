var express = require("express");
var router = express.Router();
var faker = require("faker/locale/sv");

var TestUsers = [
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
    const item = TestUsers.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      res.json(item);
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
    const item = TestUsers.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      const updatedItem = req.body;
      item.title = updatedItem.title;
      item.body = updatedItem.body;
      console.log("user updated");
      res.json(item);
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
    const item = TestUsers.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Not found");
    } else {
      TestUsers = TestUsers.filter((item) => item.id !== id);
      res.statusCode = 200;
      res.end();
    }
  }
});

module.exports = router;
