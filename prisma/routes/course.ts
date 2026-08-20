import express from "express";
import { createCourse, showCourse } from "../../controllers/courseController";
import { auth } from "../../middlewares/auth";

export const courseRouter = express.Router();

courseRouter.get("/courses", auth, showCourse);

courseRouter.post("/courses", auth, createCourse); 
