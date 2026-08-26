import express from "express";
import { auth } from "../../middlewares/auth";
import { createTopic, showTopic } from "../../controllers/topicController";

export const topicRouter = express.Router();

topicRouter.get("/:courseId/topics", auth, showTopic);

topicRouter.post("/:courseId/topics", auth, createTopic);
