import { Schedule } from "./schedule.interface";
import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

export interface Class {
  id?: string;
  section: string;
  grade_lvl: number | string;
  createdAt?: Date;
  class_teacher: Teacher | string;
  students?: Student[];
  attendance_records?: string;
  schedules?: Schedule[];
}
