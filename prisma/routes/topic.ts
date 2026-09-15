import express from "express";
import { auth } from "../../middlewares/auth";
import {
  createTopic,
  deleteTopic,
  showTopic,
  updateTopic,
} from "../../controllers/topicController";

export const topicRouter = express.Router();

topicRouter.get("/:courseId/topics", auth, showTopic);

topicRouter.post("/:courseId/topics", auth, createTopic);

topicRouter.delete("/:courseId/topics/:topicId", auth, deleteTopic);

topicRouter.patch("/:courseId/topics/:topicId", auth, updateTopic);
