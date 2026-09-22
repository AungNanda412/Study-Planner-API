import { showAssignment } from "../controllers/assignmentController";
import { prisma } from "../lib/prisma";
import {
  AssignmentCreateInput,
  AssignmentDeleteInput,
  AssignmentUpdateInput,
} from "../types/assignmentTypes";
import { TopicUpdateInput } from "../types/topicTypes";

export async function createAssignmentService({
  title,
  short_name,
  description,
  dueDate,
  priority,
  completed,
  courseId,
  studentId,
}: AssignmentCreateInput) {
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
      dueDate: new Date(dueDate),
      priority,
      completed,
      courseId,
    },
  });

  return assignment;
}

export async function showAssignmentsService({
  courseId,
  studentId,
}: {
  courseId: number;
  studentId: number;
}) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const assignments = await prisma.assignment.findMany({
    where: {
      courseId: courseId,
    },
    orderBy: {
      title: "asc",
    },
  });

  return assignments;
}

export async function deleteAssignmentService({
  assignmentId,
  courseId,
  studentId,
}: AssignmentDeleteInput) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const assignment = await prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      courseId,
    },
  });

  if (!assignment) {
    throw new Error("ASSIGNMENT_NOT_FOUND");
  }

  const deleteAssignment = await prisma.assignment.delete({
    where: {
      id: assignmentId,
    },
  });

  return deleteAssignment;
}

export async function updateAssignmentService({
  title,
  short_name,
  description,
  dueDate,
  priority,
  completed,
  assignmentId,
  courseId,
  studentId,
}: AssignmentUpdateInput) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const assignment = await prisma.assignment.findFirst({
    where: {
      id: assignmentId,
    },
  });

  if (!assignment) {
    throw new Error("ASSIGNMENT_NOT_FOUND");
  }

  const updateAssignment = await prisma.assignment.update({
    where: {
      id: assignmentId,
    },
    data: {
      title,
      short_name,
      description,
      dueDate,
      priority,
      completed,
    },
  });

  return updateAssignment;
}
