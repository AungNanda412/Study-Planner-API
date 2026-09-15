import { AssignmentType } from "./assignmentTypes";

export type CourseCreateInput = {
  title: string;
  description: string;
  studentId: number;
};

export type CourseType = {
  id: number;
};

export type CourseUpdateInput = {
  title?: string;
  description?: string;
  courseId: number;
  studentId: number;
};
