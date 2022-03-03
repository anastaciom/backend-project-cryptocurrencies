const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const UserModel = require("../../src/models/User");
const { createToken } = require("../../src/controllers/createToken");


describe("All users - Admin", () => {
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

  it("should be admin and return status 200", async () => {
    const userDB = await UserModel.create({
      name: "admin",
      email: "admin1@gmail.com",
      password: '123123123',
      isAdmin: true,
    });

    const userlogin = {
      email: userDB.email,
      password: userDB.password,
    }
    await UserModel.find({}, { _id: 0, email: 1, name: 1 });
    await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${createToken({ id: userDB._id })}`)
      .send(userlogin)
      .expect(200);
  });

  it("should not be admin and return status 401", async () => {
    const userDB = await UserModel.create({
      name: "admin",
      email: "admin1@gmail.com",
      password: '123123123',
      isAdmin: false,
    });

    const userlogin = {
      email: userDB.email,
      password: userDB.password,
    };
    await UserModel.find({}, { _id: 0, email: 1, name: 1 });

    await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${createToken({ id: userDB._id })}`)
      .send(userlogin)
      .expect(401);
  });

});
