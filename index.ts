import express from "express";
import { studentRouter } from "./prisma/routes/student";

const app = express();

app.use(studentRouter)

app.get("/", (req, res) => {
  res.json({ project: "Study Planner", message: "running..." });
});


app.listen(8000,() => {
    console.log("Study planner API running at 8000...")
})