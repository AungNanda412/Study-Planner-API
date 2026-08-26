import { Request, Response } from "express";
import { createCourseService, getCourse } from "../services/courseService";

export async function showCourse(req: Request, res: Response) {
  try {
    const courses = await getCourse();

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
}

export async function createCourse(req: Request, res: Response) {
  const studentId = res.locals.student.id;
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ msg: "title is required" });
  }

  try {
    const course = await createCourseService({
      title,
      description,
      studentId,
    });

    return res.status(201).json(course);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
