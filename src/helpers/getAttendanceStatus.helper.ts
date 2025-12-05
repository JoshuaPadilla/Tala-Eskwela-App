import { ATTENDANCE_STATUS } from "../enums/attendance-status";

export const getAttendanceColor = (status?: ATTENDANCE_STATUS) => {
  switch (status) {
    case ATTENDANCE_STATUS.PRESENT:
      return "#4ade80";
    case ATTENDANCE_STATUS.ABSENT:
      return "#facc15";
    case ATTENDANCE_STATUS.LATE:
      return "#fb923c";
    case ATTENDANCE_STATUS.CUTTING:
      return "#f87171";
    default:
      return "#f87171";
  }
};
