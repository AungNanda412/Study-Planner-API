import jwt from "jsonwebtoken";
import express from "express";
import { prisma } from "../lib/prisma";
export async function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authorization = req.headers?.authorization;
  const token = authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: number;
      };

      if (decoded) {
        const student = await prisma.student.findFirst({
          where: { id: decoded.id },
        });

        res.locals.student = student;
        return next();
      }
    } catch (error) {
      return res.status(401).json({
        msg: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({ msg: "Access token required" });
  }
}
