import { Roles } from "../enums/role.enum";
import { Student } from "./student.interface";

export interface Parent {
  id?: string;
  push_token: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  profileUrl?: string;
  email: string;
  password: string;
  phone: string;
  role: Roles;
  students?: Student[];
}
