import express from "express";
import { auth } from "../../middlewares/auth";
import {
  createAssignment,
  deleteAssignment,
  showAssignment,
  updateAssignment,
} from "../../controllers/assignmentController";

export const assignmentRouter = express.Router();

assignmentRouter.post("/:courseId/assignments", auth, createAssignment);

assignmentRouter.get("/:courseId/assignments", auth, showAssignment);

assignmentRouter.delete("/:courseId/assignments/:assignmentId",auth,deleteAssignment)

assignmentRouter.patch("/:courseId/assignments/:assignmentId",auth,updateAssignment)