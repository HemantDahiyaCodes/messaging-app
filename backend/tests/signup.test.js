import express from "express";
import supertest from "supertest";
import { index } from "../routes/indexRoute.js";

const app = express();
app.use("/", index);

const request = supertest(app);

test("Index route works", async () => {
  const res = await request.get("/");
  expect(res.text).toBe("This is working!");
});