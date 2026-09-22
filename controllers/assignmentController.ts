import { Request, Response } from "express";
import {
  createAssignmentService,
  showAssignmentsService,
} from "../services/assignmentService";

export async function createAssignment(req: Request, res: Response) {
  const { courseId } = req.params;
  const studentId = res.locals.student.id;
  const { title, short_name, description, dueDate, priority, completed } =
    req.body;

  if (
    !title ||
    !short_name ||
    !dueDate ||
    !priority ||
    completed === undefined
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const assignment = await createAssignmentService({
      title,
      short_name,
      description,
      dueDate,
      priority,
      completed,
      courseId: Number(courseId),
      studentId,
    });

    res
      .status(200)
      .json({ msg: "Assignment created successfully", assignment });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    res.status(500).json({ msg: "Internal server error" });
  }
}

export async function showAssignment(req: Request, res: Response) {
  const { courseId } = req.params;
  const studentId = res.locals.student.id;

  try {
    const assignments = await showAssignmentsService({
      courseId: Number(courseId),
      studentId,
    });

    res.status(200).json(assignments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    res.status(500).json({ msg: "Internal server error" });
  }
}


export async function deleteAssignment(req: Request, res: Response) {
  const { courseId, assignmentId } = req.params;
  const studentId = res.locals.student.id;

  

  try {

  }


}