import  bcrypt  from 'bcrypt';
import { prisma } from '../lib/prisma';
import { StudentType } from '../types/studentTypes';


export async function createStudentService({ name, email, password} : StudentType){
    const hash = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    return student 
}