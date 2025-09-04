import { Roles } from "../enums/role.enum";
import { Class } from "./class.interface";
import { Course } from "./course.interface";
import { Parent } from "./parent.interface";
import { Teacher } from "./teacher.interface";

export interface Student {
  id?: string;
  rfid_tag_uid?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  phone: string;
  grade_lvl: string;
  role: Roles;
  classes: Class[];
  teachers: Teacher[];
  courses: Course[];
  parent: Parent;
}
