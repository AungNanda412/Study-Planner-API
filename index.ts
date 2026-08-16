import express from "express";
import { studentRouter } from "./prisma/routes/student";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(studentRouter)


app.get("/", (req, res) => {
  res.json({ project: "Study Planner", message: "running..." });
});


app.listen(8000,() => {
    console.log("Study planner API running at 8000...")
})