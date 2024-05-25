import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

jest.mock("../nats-wrapper");

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  //&  Build a JWT payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //& Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //& Build session Oject.{jwt: MY_JWT}
  const session = { jwt: token };
  //& Turn that session into
  const sessionJson = JSON.stringify(session);
  //& Take JSON and encode to base64
  const base64 = Buffer.from(sessionJson).toString("base64");
  //& return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
