import bcrypt from "bcrypt";
import { Router } from "express";
import express from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { auth } from "../../middlewares/auth";

export const studentRouter = express.Router();

studentRouter.post("/verify", auth, (req, res) => {
  const student = res.locals.student;

  res.json(student);
});

studentRouter.get("/students", auth, async (req, res) => {
  const students = await prisma.student.findMany({
    include: {
      courses: true,
    },
  });

  res.json(students);
});

studentRouter.get("/students/:id", auth, async (req, res) => {
  const { id } = req.params;

  const student = await prisma.student.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      courses: true,
      assignments: true,
      studySessions: true,
    },
  });
  res.json(student);
});

studentRouter.post("/login", async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({ msg: "email and password are required" });
  }

  const student = await prisma.student.findFirst({
    where: { email },
  });

  if (student) {
    if (await bcrypt.compare(password, student.password)) {
      const token = jwt.sign(
        { id: student.id },
        process.env.JWT_SECRET as string,
      );

      return res.json({ student, token });
    } else {
      return res.status(401).json({ msg: "Invalid password or email" });
    }
  }
  return res.status(401).json({ msg: "Unable to login" });
});
