import { Roles } from "../enums/role.enum";

export interface Admin {
  id?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  phone: string;
  role: Roles;
  createdAt?: Date;
}
