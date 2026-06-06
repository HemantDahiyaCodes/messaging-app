import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prismaClientConfig.js";

export const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });

    // NOTE: Return generic error messages to prevent emuration attacks
    if (!user) {
      return done(null, false, { message: "Username or password is incorrect" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword) {
        return done(null, false, {message: "Username or password is incorrect"});
    }
    return done(null, user);
  }

  catch (err) {
    return done(err);
  }
});
