const request = require("supertest");
const app = require("../app");

const sampleUser = {
  fullName: "John Doe",
  password: "iqx086ylvAXoVxZ",
  email: "Kellie.Olsson92@yahoo.com",
  phoneNumber: "7458-73805",
  address: "3455 Gregg allén, 86164 Kendale Lakes, Ryssland",
};

const sampleUserId = 1;

describe("REST API User routes", () => {
  describe("Sending a GET request to /api/users", () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get("/api/users")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a GET request to /api/users/${sampleUserId}`, () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .get(`/api/users/${sampleUserId}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a POST request to /api/users/${sampleUserId} with user data`, () => {
    it("should respond with 200 and return json.", (done) => {
      request(app)
        .post(`/api/users/${sampleUserId}`)
        .send(sampleUser)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`Sending a DELETE request to /api/users/${sampleUserId}`, () => {
    it("should respond with 200", (done) => {
      request(app)
        .delete(`/api/users/${sampleUserId}`)
        .expect(200, done);
    });
  });
});
