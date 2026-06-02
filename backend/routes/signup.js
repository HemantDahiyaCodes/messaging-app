import { Router } from "express";
import { addUserToDb } from "../controllers/signupController.js";
import { validationRules } from "../validator/signUpValidation.js";

const signup = Router();

signup.post("/", validationRules, addUserToDb);

export {signup};