import { prisma } from "../config/prismaClientConfig.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

async function addUserToDb(req, res) {
  try {
    const { username, password, email } = req.body;
    const result = validationResult(req); // Validates the request as per rules defined in validation file

    if (result.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email: email,
        },
      });

      return res.status(200).json({success: true});
    } else {
      return res.status(400).json({ errors: result.errors });
    }

  } catch (err) {
    throw new Error("Something went wrong");
  }
}
export { addUserToDb };
