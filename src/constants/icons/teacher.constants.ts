import { ImageSourcePropType } from "react-native";
import attendance_icon from "../../../assets/icons/teacher_icons/teacher_attendance.png";
import schedules_icon from "../../../assets/icons/teacher_icons/teacher_home_schedules.png";
import subjects_icon from "../../../assets/icons/teacher_icons/teacher_home_subjects.png";
import students_icon from "../../../assets/icons/teacher_icons/teacher_students.png";

import tab_home from "../../../assets/icons/teacher_icons/tab_icons/tab_teacher_home.png";
import tab_insights from "../../../assets/icons/teacher_icons/tab_icons/tab_teacher_insights.png";
import tab_attendance from "../../../assets/icons/teacher_icons/tab_icons/tab_teacher_sattendance.png";
import tab_students from "../../../assets/icons/teacher_icons/tab_icons/tab_teacher_students.png";
import tab_subjects from "../../../assets/icons/teacher_icons/tab_icons/tab_teacher_subjects.png";

interface IconsState {
  attendance_icon: ImageSourcePropType;
  schedules_icon: ImageSourcePropType;
  subjects_icon: ImageSourcePropType;
  students_icon: ImageSourcePropType;
}

interface TeacherTabIconsState {
  tab_home: ImageSourcePropType;
  tab_insights: ImageSourcePropType;
  tab_attendance: ImageSourcePropType;
  tab_students: ImageSourcePropType;
  tab_subjects: ImageSourcePropType;
}

export const TeacherIcons: IconsState = {
  attendance_icon,
  schedules_icon,
  subjects_icon,
  students_icon,
};

export const TeacherTabIcons: TeacherTabIconsState = {
  tab_home,
  tab_insights,
  tab_attendance,
  tab_students,
  tab_subjects,
};
