import { Roles } from "../enums/role.enum";
import { Course } from "./course.interface";
import { Student } from "./student.interface";

export interface Teacher {
  id?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  phone: string;
  role: Roles;
  teached_courses: Course[];
  students: Student[];
}
