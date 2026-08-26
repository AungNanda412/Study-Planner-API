import express from "express";
import { authRouter } from "./prisma/routes/auth";
import cors from "cors";
import { topicRouter } from "./prisma/routes/topic";
import { courseRouter } from "./prisma/routes/course";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/courses", topicRouter);

app.get("/", (req, res) => {
  res.json({ project: "Study Planner", message: "running..." });
});

app.listen(8000, () => {
  console.log("Study planner API running at 8000...");
});
