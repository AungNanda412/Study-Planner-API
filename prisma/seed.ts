import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function seedStudent() {
  console.log("Seeding student data...");

  const student = await prisma.student.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: await bcrypt.hash("asdffdsa", 10),
    },
  });
  console.log("Student seeding completed");
}

seedStudent()
