import express from "express";
import "dotenv/config.js";
import {passport} from "./auth/passport.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Routes
import { signup } from "./routes/signup.js";
import { loginRouter } from "./routes/login.js";

app.use("/users", signup);
app.use("/auth", loginRouter);

app.listen(PORT, () => {
  console.log("The server is running!");
});
