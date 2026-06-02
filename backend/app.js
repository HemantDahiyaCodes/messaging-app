import express from "express";
import "dotenv/config.js";
const app = express();

// Middlewares configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
import { signup } from "./routes/signup.js";

app.use("/users", signup);

app.listen(8000, () => {
  console.log("The server is running!");
});
