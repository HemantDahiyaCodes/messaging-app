import { body } from "express-validator";
import { prisma } from "../config/prismaClientConfig.js";

export const validationRules = [
  body("username")
    .notEmpty()
    .isLength({ min: 5, max: 25 })
    .custom(async (value) => {
      // checks whether a username already exists in the database and throws an error to avoid duplicate usernames
      const user = await prisma.user.findUnique({ where: { username: value } });

      if (user) {
        throw new Error(`username ${user.username} already exists`);
      }

      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, contain letters and at least 1 number",
    ),
  body("email")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Invalid email entered")
    .custom(async (value) => {
      const email = await prisma.user.findUnique({ where: { email: value } });

      if (email) {
        throw new Error(`Email is already in use`);
      }
    })
];
