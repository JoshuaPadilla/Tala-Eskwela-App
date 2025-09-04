import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

export interface Course {
  id?: string;
  name: string;
  desc?: string;
  assigned_teacher: Teacher;
  teachers: Teacher[];
  students: Student[];
}
