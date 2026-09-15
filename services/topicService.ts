import { prisma } from "../lib/prisma";
import {
  TopicCreateInput,
  TopicDeleteType,
  TopicUpdateInput,
} from "../types/topicTypes";

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

export async function deleteTopicService({
  topicId,
  courseId,
  studentId,
}: TopicDeleteType) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const topic = await prisma.topic.findFirst({
    where: {
      id: topicId,
      courseId,
    },
  });

  if (!topic) {
    throw new Error("TOPIC_NOT_FOUND");
  }

  const deleteTopic = await prisma.topic.delete({
    where: {
      id: topicId,
    },
  });

  return deleteTopic;
}

export async function updateTopicService({
  name,
  completed,
  topicId,
  courseId,
  studentId,
}: TopicUpdateInput) {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      studentId,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  const topic = await prisma.topic.findFirst({
    where: {
      id: topicId,
    },
  });

  if (!topic) {
    throw new Error("Topic_NOT_FOUND");
  }

  const updateTopic = await prisma.topic.update({
    where: {
      id: topicId,
    },
    data: {
      name,
      completed,
    },
  });

  return updateTopic;
}
