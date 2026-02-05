import express from "express";

// Initalizing the app
const app = express();
const port = 3000;

// File imports
import "dotenv/config";
import { index } from "./routes/indexRoute.js";

app.use(express.urlencoded({extended: true}));


app.use("/", index);

app.listen(Number(process.env.PORT) || port, () => {
    console.log(`Server is running at ${process.env.PORT || port }`)
})