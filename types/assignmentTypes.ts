import { Priority } from "../generated/prisma/enums";

export type AssignmentCreateType = {
  title: string;
  short_name: string;
  description?: string | null;
  dueDate: string | Date;
  priority: Priority;
  completed?: boolean;
  courseId: number;
  studentId: number;
};