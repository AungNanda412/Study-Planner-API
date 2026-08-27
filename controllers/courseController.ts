import { Request, Response } from "express";
import {
  createCourseService,
  getCourse,
  getCourseDetail,
  updateCourseService,
} from "../services/courseService";

export async function showCourses(req: Request, res: Response) {
  const studentId = res.locals.student.id;
  try {
    const courses = await getCourse(studentId);

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
}

export async function showCourseDetail(req: Request, res: Response) {
  const { courseId } = req.params;
  const studentId = res.locals.student.id;

  try {
    const course = await getCourseDetail(Number(courseId), studentId);

    return res.status(200).json(course);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
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

    return res.status(201).json({ msg: "Course created successfully", course });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  const { title, description } = req.body;
  const { courseId } = req.params;
  const studentId = res.locals.student.id;

  if (!title) {
    return res.status(400).json({ msg: "Title is required" });
  }

  try {
    const updatedCourse = await updateCourseService({
      title,
      description,
      courseId: Number(courseId),
      studentId,
    });

    return res
      .status(200)
      .json({ msg: "Course updated successfully", updatedCourse });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
