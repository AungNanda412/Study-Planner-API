import { AssignmentType } from "./assignmentTypes"
import { StudentType } from "./studentTypes"

export type CourseType = {
    id: number,
    name: string,
    description: string,
    students: StudentType[],
    assignments: AssignmentType[]
}