import { localStrategy } from "./localStrategy.js";
import passport from "passport";

passport.use(localStrategy);

export {passport};