import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import utils from "../utils";

const authRouter = Router();

// Local Sign up endpoint
authRouter.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    if (!utils.isValidEmail(email)) {
      return res.status(409).json({ message: "Email is not valid." });
    }

    if (!utils.isValidPassword(password)) {
      return res.status(409).json({
        message:
          "Password is not valid. Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter and 1 number.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ ...newUser, password: undefined });
  } catch (err) {
    return next(err);
  }
});

// Sign in endpoint
authRouter.post("/signin", passport.authenticate("local"), (req, res) => {
  const cleanUser = { ...req.user, password: undefined };
  return res.status(200).json(cleanUser);
});

// Sign out endpoint
authRouter.get("/signout", (req, res, next) => {
  req.logout((err) => {
    next(err);
  });
  return res.status(200).json("Sign out successful");
});

authRouter.get("/session", (req, res) => {
  if (!req.user) {
    return res.status(200).json(null);
  }
  const cleanUser = { ...req.user, password: undefined };
  return res.status(200).json(cleanUser);
});

export default authRouter;
