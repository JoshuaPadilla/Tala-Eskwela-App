import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

export interface Class {
  class_id?: string;
  name: string;
  class_teacher: Teacher;
  students: Student[];
}
