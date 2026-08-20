import express from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { auth } from "../../middlewares/auth";
import {
  createStudent,
  loginStudent,
  showStudent,
  showStudentDetail,
  verifyStudent,
} from "../../controllers/studentController";

export const studentRouter = express.Router();

studentRouter.post("/verify", auth, verifyStudent);

studentRouter.get("/students", auth, showStudent);

studentRouter.get("/students/:id", auth, showStudentDetail);

studentRouter.post("/login", loginStudent);

studentRouter.post("/students", auth, createStudent);
