const mongoose = require("mongoose");
const request = require("supertest");
const UserModel = require("../../src/models/User");
const app = require("../../src/app");
const crypto = require("crypto");

describe("Reset Password", () => {
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

  it("should send email with token and new password and return status 200", async () => {
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    const user = await UserModel.create({
      name: "Test123123123",
      email: "testtesttest123@gmail.com",
      password: "12345678",
    });
    const userCreate = await UserModel.findOne({ email: user.email });
    if (userCreate) {
      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });
    }

    const userResetPassword = {
      email: "testtesttest123@gmail.com",
      password: "123123123123",
      token: token,
    };

    const searchUser = await UserModel.findOne({
      email: userResetPassword.email,
    }).select("+passwordResetToken passwordResetExpires");

    if (
      searchUser &&
      token === searchUser.passwordResetToken &&
      new Date() < user.passwordResetExpires
    ) {
      searchUser.password = await passEncryption(userResetPassword.password);
    }
    await searchUser.save();

    const response = await request(app)
      .post("/signin/reset_password")
      .send(userResetPassword);
    expect(response.status).toBe(200);
  });

  it("should have invalid email and return status 400", async () => {
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    const user = await UserModel.create({
      name: "Test1010",
      email: "test1010@gmail.com",
      password: "12345678",
    });
    const userCreate = await UserModel.findOne({ email: user.email });
    if (userCreate) {
      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });
    }

    const userResetPassword = {
      email: "test12212@gmail.com",
      password: "123123123123",
      token: token,
    };

    const searchUser = await UserModel.findOne({
      email: userResetPassword.email,
    }).select("+passwordResetToken passwordResetExpires");

    if (
      searchUser &&
      token === searchUser.passwordResetToken &&
      new Date() < user.passwordResetExpires
    ) {
      searchUser.password = await passEncryption(userResetPassword.password);
    }

    const response = await request(app)
      .post("/signin/reset_password")
      .send(userResetPassword);
    expect(response.status).toBe(400);
  });

  it("should return invalid token and give status 401", async () => {
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    const user = await UserModel.create({
      name: "Test123",
      email: "testtest123@gmail.com",
      password: "12345678",
    });
    const userCreate = await UserModel.findOne({ email: user.email });
    if (userCreate) {
      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });
    }

    const userResetPassword = {
      email: "testtest123@gmail.com",
      password: "123123123123",
      token: "abc123123",
    };

    const searchUser = await UserModel.findOne({
      email: userResetPassword.email,
    }).select("+passwordResetToken passwordResetExpires");

    if (
      searchUser &&
      token === searchUser.passwordResetToken &&
      new Date() < user.passwordResetExpires
    ) {
      searchUser.password = await passEncryption(userResetPassword.password);
    }
    await searchUser.save();

    const response = await request(app)
      .post("/signin/reset_password")
      .send(userResetPassword);
    expect(response.status).toBe(401);
  });

  it("token time should end and return status 401", async () => {
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours());

    const user = await UserModel.create({
      name: "test99",
      email: "test99@gmail.com",
      password: "12345678",
    });
    const userCreate = await UserModel.findOne({ email: user.email });
    if (userCreate) {
      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });
    }

    const userResetPassword = {
      email: "test99@gmail.com",
      password: "123123456",
      token: token,
    };

    const searchUser = await UserModel.findOne({
      email: userResetPassword.email,
    }).select("+passwordResetToken passwordResetExpires");

    if (
      searchUser &&
      token === searchUser.passwordResetToken &&
      new Date() > user.passwordResetExpires
    ) {
      searchUser.password = await passEncryption(userResetPassword.password);
    }
    await searchUser.save();

    const response = await request(app)
      .post("/signin/reset_password")
      .send(userResetPassword);
    expect(response.status).toBe(401);
  });

  it("should send password less than 6 characters and return status 404", async () => {
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    const user = await UserModel.create({
      name: "Test123123123",
      email: "testtesttest123@gmail.com",
      password: "12345678",
    });
    const userCreate = await UserModel.findOne({ email: user.email });
    if (userCreate) {
      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });
    }

    const userResetPassword = {
      email: user.email,
      password: "123",
      token: token,
    };

    const searchUser = await UserModel.findOne({
      email: userResetPassword.email,
    }).select("+passwordResetToken passwordResetExpires");

    if (
      searchUser &&
      token === searchUser.passwordResetToken &&
      new Date() < user.passwordResetExpires
    ) {
      searchUser.password = await passEncryption(userResetPassword.password);
    }
    await searchUser.save();

    const response = await request(app)
      .post("/signin/reset_password")
      .send(userResetPassword);
    expect(response.status).toBe(404);
  });
});
