import express from "express";
import { auth } from "../../middlewares/auth";
import { createAssignment } from "../../controllers/assignmentController";
export const assignmentRouter = express.Router();

assignmentRouter.post("/:courseId/assignments", auth, createAssignment);
