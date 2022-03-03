const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const UserModel = require("../../src/models/User");
const { createToken } = require("../../src/controllers/createToken");
const {
  decryptedPassword,
  passEncryption,
} = require("../../src/controllers/passwordEncryption");

describe("Sign in - Admin", () => {
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
    const userCreated = await UserModel.create({
      name: "usertesting",
      email: "usertesting@net.com",
      password: await passEncryption("555555"),
      isAdmin: true,
    });

    const signIn = {
      email: userCreated.email,
      password: "555555",
    };

    await decryptedPassword(userCreated.password, signIn.password);
    createToken({ id: userCreated._id });
    
    return request(app).post("/admin").send(signIn).expect(200);
  });


  it("shouldn't be admin and return status 401", async () => {
    const userCreated = await UserModel.create({
      name: "usertesting12",
      email: "usertesting12@net.com",
      password: await passEncryption("555555"),
      isAdmin: false,
    });

    const signIn = {
      email: userCreated.email,
      password: "555555",
    };

    await decryptedPassword(userCreated.password, signIn.password);
    createToken({ id: userCreated._id });
    
    return request(app).post("/admin").send(signIn).expect(401);
  });

  it("should have incorrect password and return, status 404", async () => {
    const userCreated = await UserModel.create({
      name: "usertesting55",
      email: "usertesting55@net.com",
      password: await passEncryption("555555"),
      isAdmin: true,
    });

    const signIn = {
      email: userCreated.email,
      password: "22222222222",
    };

    await decryptedPassword(userCreated.password, signIn.password);

    createToken({ id: userCreated._id });

    return request(app).post("/admin").send(signIn).expect(404);
  });


it("the user should not exist and should return status 500", async () => {
    const userCreated = await UserModel.create({
      name: "usertesting",
      email: "usertesting@net.com",
      password: await passEncryption("555555"),
    });

    const signIn = {
      email: 'test23101@hotmail.com',
      password: "22222222222",
    };

    await decryptedPassword(userCreated.password, signIn.password);

    createToken({ id: userCreated._id });
    
    return request(app).post("/admin").send(signIn).expect(500);
  });


});
