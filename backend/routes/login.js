import { Router } from "express";
import { passport } from "../auth/passport.js";
import jwt from "jsonwebtoken";

const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { user } = req;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Authentication failed, please log in again" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "8h" },
    );
    return res.status(200).json({ success: true, token });
  },
);

export { loginRouter };
