import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  createStudentService,
  loginStudentService,
} from "../services/studentService";
import { prisma } from "../lib/prisma";

export async function createStudent(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ msg: "name, email and password are required" });
  }

  try {
    const student = await createStudentService({
      name,
      email,
      password,
    });

    return res.status(201).json(student);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function loginStudent(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "email and password are required" });
  }

  try {
    const result = await loginStudentService({ email, password });

    return res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(401).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
