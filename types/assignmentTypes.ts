export type AssignmentCreateType = {
  title: string;
  short_name: string;
  description?: string | null;
  dueDate: string | Date;
  priority: string;
  completed?: boolean;
  courseId: number;
  studentId: number;
};