import { prisma } from "../lib/prisma";
import { CourseCreateInput } from "../types/courseTypes";

export async function getCourse() {
  const courses = prisma.course.findMany({
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

export async function createCourseService({
  title,
  description,
  studentId,
}: CourseCreateInput) {

    const course = await prisma.course.create({
        data:{
            title,
            description,
            studentId
        }
    })

    return course
}
