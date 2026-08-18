import { Request, Response } from "express";
import { createStudentService } from "../services/studentService";

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
