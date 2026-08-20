import { Request, Response } from "express";
import { getTopic } from "../services/topicService";

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

export async function createTopicService(req: Request, res: Response) {
    

}
