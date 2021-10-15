/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

const testProduct = {
  title: "Test title",
  price: 2.62,
  category: "cat",
  description: "This is a test description.",
  imageUrl:
    "https://img.chewy.com/is/image/catalog/161199_MAIN._AC_SL400_V1568240232_.jpg",
  weight: "100g",
  maker: "Frisco",
};

const updatedTestProduct = {
  title: "Updated test title",
  price: 2.62,
  category: "cat",
  description: "This is a test description.",
  imageUrl:
    "https://img.chewy.com/is/image/catalog/161199_MAIN._AC_SL400_V1568240232_.jpg",
  weight: "100g",
  maker: "Frisco",
};

const sampleProductSlug = "test-title";

describe("REST API Product routes", () => {
  describe("Sending a POST request to /api/products with product details", () => {
    it("should respond with 201 and return json.", (done) => {
      request(app)
        .post("/api/products")
        .send(testProduct)
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
  });

  describe("Sending a GET request to /api/products", () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get("/api/products")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a GET request to /api/products/${sampleProductSlug}`, () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get(`/api/products/${sampleProductSlug}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a POST request to /api/products/${sampleProductSlug} with user data`, () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .post(`/api/products/${sampleProductSlug}`)
        .send(updatedTestProduct)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a DELETE request to /api/products/${sampleProductSlug}`, () => {
    it("should respond with 204", (done) => {
      request(app)
        .delete(`/api/products/${sampleProductSlug}`)
        .expect(204, done);
    });
  });
});
