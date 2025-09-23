import { Roles } from "../enums/role.enum";
import { Class } from "./class.interface";
import { Parent } from "./parent.interface";
import { Teacher } from "./teacher.interface";

export interface Student {
  id: string;
  rfid_tag_uid?: string;
  push_token?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  grade_lvl: string;
  role: Roles;
  class: Class;
  teachers: Teacher[];
  parent: Parent;
}
