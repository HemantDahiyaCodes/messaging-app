import express from "express";
import "dotenv/config.js";
const app = express();
const PORT = 8000;

// Middlewares configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
import { signup } from "./routes/signup.js";

app.use("/users", signup);

app.listen(Number(process.env.PORT) || PORT, () => {
  console.log("The server is running!");
});
