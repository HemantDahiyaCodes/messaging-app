import express from "express";
import "dotenv/config";

// Initalizing the app
const app = express();

// File imports
import { index } from "./routes/signup.js";

app.use(express.urlencoded({extended: true}));


app.use("/", index);

app.listen(Number(process.env.PORT), () => {
    console.log(`Server is running at ${process.env.PORT}`)
})