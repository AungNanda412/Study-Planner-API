import express from "express";
import { auth } from "../../middlewares/auth";
import {
  createAssignment,
  showAssignment,
} from "../../controllers/assignmentController";
export const assignmentRouter = express.Router();

assignmentRouter.post("/:courseId/assignments", auth, createAssignment);

assignmentRouter.get("/:courseId/assignments", auth, showAssignment);
