/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const testUser = {
  fullName: "John Doe",
  password: "pass1234",
  passwordConfirm: "pass1234",
  email: "mr.doe@yahoo.com",
  phone: "7458-73805",
  address: "3455 Gregg allén, 86164 Kendale Lakes, Ryssland",
};

const { password, email } = testUser;
const adminEmail = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

let token;
let sampleUserId;

describe("REST API User routes", () => {
  describe("Sending a POST request to /api/users/signup with user data", () => {
    it("should respond with 201 and return json.", (done) => {
      request(app)
        .post("/api/users/signup")
        .send(testUser)
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
  });

  describe("Sending a POST request to /api/users/login with correct email and password", () => {
    it("should respond with 200 and return json and jwt.", (done) => {
      request(app)
        .post("/api/users/login")
        .send({ password, email })
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

  describe("Sending a GET request with a valid jwt as a normal user to /api/users/onlyAdmin", () => {
    it("should respond with 403 and return json.", (done) => {
      request(app)
        .get("/api/users/onlyAdmin")
        .set({ Authorization: `Bearer ${token}` })
        .expect("Content-Type", /json/)
        .expect(403, done);
    });
  });

  describe("Sending a DELETE request to /api/users/:userId", () => {
    it("should respond with 204", (done) => {
      request(app)
        .delete(`/api/users/${sampleUserId}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204, done);
    });
  });

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

  describe("Sending a GET request with a valid jwt as an admin user to /api/users/onlyAdmin", () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get("/api/users/onlyAdmin")
        .set({ Authorization: `Bearer ${token}` })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});
