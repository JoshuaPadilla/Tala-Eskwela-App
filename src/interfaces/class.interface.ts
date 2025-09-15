import { Schedule } from "./schedule.interface";
import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

export interface Class {
  class_id?: string;
  section: string;
  grade_lvl: number;
  createdAt: Date;
  class_teacher: Teacher;
  students: Student[];
  attendance_records: string;
  schedules: Schedule[];
}
