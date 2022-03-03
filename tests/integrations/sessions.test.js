const request = require("supertest");
const mongoose = require("mongoose");
const { createToken } = require("../../src/controllers/createToken");
const UserModel = require("../../src/models/User");
const app = require("../../src/app");

describe("private routes", () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should check if user has access token and return status 200", async () => {
    const user = await UserModel.create({
      name: 'Test123',
      email: 'test123@gmail.com',
      password: '12345678'
  });
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${createToken({ id: user._id })}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes with invalid JWT token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123123123`);
    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes when not authenticated", async () => {
    const response = await request(app).get("/dashboard");
    expect(response.status).toBe(401);
  });

  it('should check if before the token has "Bearer"', async () => {
    const user = await UserModel.create({
      name: 'Test123',
      email: 'test123@gmail.com',
      password: '12345678'
  });
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `${createToken({ id: user._id })}`);
    expect(response.status).toBe(401);
  });

  it('should check if before the token there is "Bearer" + token', async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "");
    expect(response.status).toBe(401);
  });

  it("should have invalid token creation, return status 500", async () => {
    const userDB = await UserModel.create({
      name: "test2",
      email: "test2@gmail.com",
      password: "asdsadsad",
      isAdmin: true,
    });

    const userlogin = {
      email: userDB.email,
      password: userDB.password,
    };
    await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${createToken({ id: "1213123" })}`)
      .send(userlogin)
      .expect(500);
  });

  it("should have invalid id, return status 404", async () => {
    const userDB = await UserModel.create({
      name: "test2",
      email: "test2@gmail.com",
      password: "asdsadsad",
    });
    const userlogin = {
      email: userDB.email,
      password: userDB.password,
    };
    const token = createToken({ id: userDB._idInvalid });

    return request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${token}`)
      .send(userlogin)
      .expect(404);
  });

});
