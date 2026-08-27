import express from "express";
import {
  createCourse,
  showCourseDetail,
  showCourses,
  updateCourse,
} from "../../controllers/courseController";
import { auth } from "../../middlewares/auth";

export const courseRouter = express.Router();

courseRouter.get("/", auth, showCourses);

courseRouter.get("/:courseId", auth, showCourseDetail);

courseRouter.patch("/:courseId", auth, updateCourse);

courseRouter.post("/", auth, createCourse);
