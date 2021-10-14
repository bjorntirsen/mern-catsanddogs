/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

const sampleProduct = {
  title: "Bird Teaser with Feathers",
  price: 2.62,
  category: "cat",
  description:
    "This is no angry bird, but the perfect play buddy for your kitty.",
  imageUrl:
    "https://img.chewy.com/is/image/catalog/161199_MAIN._AC_SL400_V1568240232_.jpg",
  weight: "100g",
  maker: "Frisco",
};

const sampleProductId = 1;

describe("REST API Product routes", () => {
  describe("Sending a GET request to /api/products", () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get("/api/products")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a GET request to /api/products/${sampleProductId}`, () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get(`/api/products/${sampleProductId}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a POST request to /api/products/${sampleProductId} with user data`, () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .post(`/api/products/${sampleProductId}`)
        .send(sampleProduct)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a DELETE request to /api/products/${sampleProductId}`, () => {
    it("should respond with 200", (done) => {
      request(app).delete(`/api/products/${sampleProductId}`).expect(200, done);
    });
  });
});
