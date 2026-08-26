import { prisma } from "../lib/prisma";
import { TopicCreateInput } from "../types/topicTypes";

export async function getTopic() {
  const topics = await prisma.topic.findMany({
    orderBy: { name: "asc" },
  });

  return topics;
}

export async function createTopicService({
  name,
  courseId,
  studentId,
}: TopicCreateInput) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const topic = await prisma.topic.create({
    data: {
      name,
      courseId: course.id,
    },
  });

  return topic;
}
