import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { LoginType, StudentType } from "../types/studentTypes";

export async function createStudentService({
  name,
  email,
  password,
}: StudentType) {
  const hash = await bcrypt.hash(password, 10);
  const student = await prisma.student.create({
    data: {
      name,
      email,
      password: hash,
    },
  });

  return student;
}

export async function loginStudentService({ email, password }: LoginType) {
  const student = await prisma.student.findFirst({
    where: { email },
  });

  if (student) {
    if (await bcrypt.compare(password, student.password)) {
      const token = jwt.sign(
        { id: student.id },
        process.env.JWT_SECRET as string,
      );

      return { student, token };
    } else {
      throw new Error("Invalid password");
    }
  } else {
    throw new Error("Unable to login");
  }
}

export async function getStudentById(id: string) {
  const student = await prisma.student.findFirst({
    where: { id: Number(id) },
    include: {
      courses: true,
      assignments: true,
      studySessions: true,
    },
  });
  return student;
}

export async function getStudent() {
  const students = await prisma.student.findMany({
    include: {
      courses: true,
    },
  });

  return students
}
