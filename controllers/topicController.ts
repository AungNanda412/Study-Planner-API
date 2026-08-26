import { Request, Response } from "express";
import { createTopicService, getTopic } from "../services/topicService";
import { prisma } from "../lib/prisma";

export async function showTopic(req: Request, res: Response) {
  try {
    const topics = await getTopic();
    return res.status(209).json(topics);
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
}

export async function createTopic(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    const { name } = req.body;
    const studentId = res.locals.student.id;

    if (!name) {
      res.status(400).json({
        msg: "Name is required",
      });
    }

    const topic = await createTopicService({
      name,
      courseId: Number(courseId),
      studentId,
    });

    return res.status(201).json({ msg: "Topic created successfully", topic });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Unable to create course" });
  }
}
