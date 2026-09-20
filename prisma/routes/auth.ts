import express from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { auth } from "../../middlewares/auth";
import {
  login,
  register,
  verify,
} from "../../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/verify", auth, verify);

authRouter.post("/login", login);

authRouter.post("/register", register);



