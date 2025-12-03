import { Icons } from "../constants/icons/icons.constant";
import { ATTENDANCE_STATUS } from "../enums/attendance-status";
import { NotifDetailsDisplay } from "../interfaces/notif-details-display-student.interface";

export const getNotifToDisplayStudent = (
  status: ATTENDANCE_STATUS
): NotifDetailsDisplay => {
  switch (status) {
    case ATTENDANCE_STATUS.PRESENT:
      return {
        icon: Icons.notif_present,
        message: "Good Job! Attendance Recorded",
      };
    case ATTENDANCE_STATUS.ABSENT:
      return {
        icon: Icons.notif_absent,
        message: "Hope You Recover, Be Present Next time!",
      };
    case ATTENDANCE_STATUS.LATE:
      return {
        icon: Icons.notif_late,
        message: "Be early next time! Attendance Recorded",
      };
    case ATTENDANCE_STATUS.CUTTING:
      return {
        icon: Icons.notif_cutting,
        message: "Oh no! You disappear on your class!",
      };
    default:
      return { icon: Icons.notif_present, message: "Goodjob" };
  }
};

export const getNotifToDisplayParent = (
  status: ATTENDANCE_STATUS
): NotifDetailsDisplay | undefined => {
  switch (status) {
    case ATTENDANCE_STATUS.PRESENT:
      return {
        icon: Icons.notif_present,
        message: "Your child is Present! Attendance Succesful!",
      };
    case ATTENDANCE_STATUS.ABSENT:
      return {
        icon: Icons.notif_absent,
        message: "Your child is Absent! hope he's/she's okay!",
      };
    case ATTENDANCE_STATUS.LATE:
      return {
        icon: Icons.notif_late,
        message: "Your child is late! he/she should be early next time!",
      };
    case ATTENDANCE_STATUS.CUTTING:
      return {
        icon: Icons.notif_cutting,
        message: "Your child cut classes today, Tiwasi!",
      };
    default:
      return undefined;
  }
};
