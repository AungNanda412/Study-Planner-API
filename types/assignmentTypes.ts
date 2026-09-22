import { Priority } from "../generated/prisma/enums";

export type AssignmentCreateInput = {
  title: string;
  short_name: string;
  description?: string | null;
  dueDate: string | Date;
  priority: Priority;
  completed?: boolean;
  courseId: number;
  studentId: number;
};

export type AssignmentDeleteInput = {
  assignmentId: number;
  courseId: number;
  studentId: number;
};

export type AssignmentUpdateInput = {
  assignmentId: number;
  title?: string;
  short_name?: string;
  description?: string | null;
  dueDate?: string | Date;
  priority?: Priority;
  completed?: boolean;
  courseId: number;
  studentId: number;
};