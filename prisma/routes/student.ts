import { Router } from 'express';
import  express  from 'express';
import { prisma } from '../../lib/prisma';

export const studentRouter = express.Router();

studentRouter.get("/students", async(req,res) => {
    const students = await prisma.student.findMany({
        include: {
            courses: true
        }
    })

    res.json(students)
})

