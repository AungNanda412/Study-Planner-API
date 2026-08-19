import express from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { auth } from "../../middlewares/auth";
import { createStudent, loginStudent } from "../../controllers/studentController";

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

studentRouter.post("/login", loginStudent );


studentRouter.post("/students", auth, createStudent);
