import { ATTENDANCE_STATUS } from "../enums/attendance-status";
import { Class } from "./class.interface";
import { Student } from "./student.interface";

export interface Attendance {
  attendance_id: string;
  status: ATTENDANCE_STATUS;
  timestamp: Date;
  student: Student;
  class: Class;
}
