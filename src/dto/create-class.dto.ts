import { Schedule } from "../interfaces/schedule.interface";
import { Student } from "../interfaces/student.interface";

export interface CreateClassDto {
  section: string;
  grade_lvl: number | string;
  createdAt?: Date;
  class_teacher: string;
  students?: Student[];
  attendance_records?: string;
  schedules?: Schedule[];
}
