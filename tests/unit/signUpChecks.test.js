const app = require("../../src/app");
const request = require("supertest");

describe("Checks - sign Up", () => {
  it("should have name less than 3 characters and return status 404", async () => {
    const user = {
      name: "a",
      email: "testinvalid22@gmail.com",
      password: "123advasdd",
    };

    const response = await request(app).post("/signup").send(user);
    expect(response.status).toBe(404);
  });

  it("should have password shorter than 6 characters, and return status 404", async () => {
    const user = {
      name: "test1022102",
      email: "test1012220@test1022210",
      password: "123",
    };

    const response = await request(app).post("/signup").send(user);
    expect(response.status).toBe(404);
  });

  it("should have the email with less than 4 characters, and return the status 404", async () => {
    const user = {
      name: "test12102",
      email: "a@a",
      password: "123advasdd",
    };

    const response = await request(app).post("/signup").send(user);
    expect(response.status).toBe(404);
  });
});
