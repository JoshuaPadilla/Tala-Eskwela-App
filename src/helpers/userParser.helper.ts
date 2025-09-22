// Assuming you have these interfaces defined
import { Student } from "../interfaces/student.interface";
import { Teacher } from "../interfaces/teacher.interface";
import { Parent } from "../interfaces/parent.interface";

type UserData = Student | Teacher | Parent;

export const parseUserByRole = (userData: any): UserData | null => {
  if (!userData || !userData.role) {
    return null;
  }

  switch (userData.role) {
    case "teacher":
      return userData as Teacher;
    case "student":
      return userData as Student;
    case "parent":
      return userData as Parent;
    default:
      return null;
  }
};