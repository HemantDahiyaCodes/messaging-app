import { Router } from "express";
const index = Router();

index.get("/", (req, res) => {
    res.send("This is working!");
    console.log("index route works")
})

export {index};