import { ImageSourcePropType } from "react-native";
import attendance_icon from "../../../assets/icons/teacher_icons/teacher_attendance.png";
import schedules_icon from "../../../assets/icons/teacher_icons/teacher_home_schedules.png";
import subjects_icon from "../../../assets/icons/teacher_icons/teacher_home_subjects.png";
import students_icon from "../../../assets/icons/teacher_icons/teacher_students.png";

interface IconsState {
  attendance_icon: ImageSourcePropType;
  schedules_icon: ImageSourcePropType;
  subjects_icon: ImageSourcePropType;
  students_icon: ImageSourcePropType;
}

export const TeacherIcons: IconsState = {
  attendance_icon,
  schedules_icon,
  subjects_icon,
  students_icon,
};
