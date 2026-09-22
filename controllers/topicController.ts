import { Request, Response } from "express";
import {
  createTopicService,
  deleteTopicService,
  showTopicService,
  updateTopicService,
} from "../services/topicService";

export async function showTopic(req: Request, res: Response) {
  const { courseId } = req.params;
  const studentId = res.locals.student.id;
  try {
    const topics = await showTopicService({
      courseId: Number(courseId),
      studentId,
    });
    return res.status(200).json(topics);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
}

export async function createTopic(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    const { name, completed } = req.body;
    const studentId = res.locals.student.id;

    if (!name) {
      res.status(400).json({
        msg: "Name is required",
      });
    }

    const topic = await createTopicService({
      name,
      completed,
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

export async function deleteTopic(req: Request, res: Response) {
  const { courseId, topicId } = req.params;
  const studentId = res.locals.student.id;

  try {
    const deleteTopic = await deleteTopicService({
      topicId: Number(topicId),
      courseId: Number(courseId),
      studentId,
    });
    return res.status(200).json({ msg: "Topic deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function updateTopic(req: Request, res: Response) {
  const { name, completed } = req.body;
  const { courseId, topicId } = req.params;
  const studentId = res.locals.student.id;

  try {
    const updateTopic = await updateTopicService({
      name,
      completed,
      topicId: Number(topicId),
      courseId: Number(courseId),
      studentId,
    });

    return res
      .status(200)
      .json({ msg: "Topic updated successfully", updateTopic });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
