import { Roles } from "../enums/role.enum";
import { Class } from "./class.interface";
import { Course } from "./course.interface";
import { Student } from "./student.interface";

export interface Teacher {
  id: string;
  push_token?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  role: Roles;
  teached_courses: Course[];
  students: Student[];
  advisory_class: Class;
}
