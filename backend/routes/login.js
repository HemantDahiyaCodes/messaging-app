import { Router } from "express";
import { passport } from "../auth/passport.js";
import jwt from "jsonwebtoken";

const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { user } = req;

    try {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed, please log in again" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username }, // Creates a payload with payload.id, payload.username
        process.env.SECRET_KEY,
        { expiresIn: "8h" },
      );

      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json("Server error");
    }
  },
);

export { loginRouter };
