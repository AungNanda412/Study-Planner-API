import { prisma } from "../lib/prisma";
import { AssignmentCreateType } from "../types/assignmentTypes";

export async function createAssignmentService({
  title,
  short_name,
  description,
  dueDate,
  priority,
  completed,
  courseId,
  studentId,
}: AssignmentCreateType) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const assignment = await prisma.assignment.create({
    data: {
      title,
      short_name,
      description,
      dueDate,
      priority,
      completed,
      courseId,
    },
  });

  return assignment
}
