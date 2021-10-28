/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const adminEmail = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

let token;

describe("REST API User routes", () => {
  describe("Sending a POST request to /api/users/login with correct admin email and password", () => {
    it("should respond with 200 and return json and jwt.", (done) => {
      request(app)
        .post("/api/users/login")
        .send({
          password: adminPassword,
          email: adminEmail,
        })
        .expect("Content-Type", /json/)
        .expect((res) => {
          // eslint-disable-next-line prefer-destructuring
          token = res.body.token;
        })
        .expect(200, done);
    });
  });

  describe("Sending a GET request with a valid jwt to /api/users/getMe", () => {
    it("should respond with 200 and return json and user id.", (done) => {
      request(app)
        .get("/api/users/getMe")
        .set({ Authorization: `Bearer ${token}` })
        .expect("Content-Type", /json/)
        .expect((res) => {
          // eslint-disable-next-line prefer-destructuring
          sampleUserId = res.body.data.user._id;
        })
        .expect(200, done);
    });
  });
});
