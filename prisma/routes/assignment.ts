import express from "express";
import { auth } from "../../middlewares/auth";
export const assignmentRouter = express.Router();

assignmentRouter.get("/",auth,)