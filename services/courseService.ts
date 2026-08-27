import { prisma } from "../lib/prisma";
import { CourseCreateInput, CourseUpdateInput } from "../types/courseTypes";

export async function getCourse(studentId: number) {
  const courses = prisma.course.findMany({
    where: {
      studentId,
    },
    include: {
      topics: true,
      sessions: true,
      assignments: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return courses;
}

export async function getCourseDetail(id: number, studentId: number) {
  const course = await prisma.course.findFirst({
    where: {
      id,
      studentId,
    },
    include: {
      topics: true,
      sessions: true,
      assignments: true,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  return course;
}

export async function createCourseService({
  title,
  description,
  studentId,
}: CourseCreateInput) {
  const course = await prisma.course.create({
    data: {
      title,
      description,
      studentId,
    },
  });

  return course;
}

export async function updateCourseService({
  title,
  description,
  courseId,
  studentId,
}: CourseUpdateInput) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const updatedCourse = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      title,
      description,
    },
  });

  return updatedCourse;
}
