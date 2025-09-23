import { create } from "zustand";
import { Attendance } from "../interfaces/attendance.interface";

interface AttendanceStoreState {
  loading: boolean;
  attendances: Attendance[];
  addAttendance: (attendance: Attendance) => void;
}

export const useAttendanceStore = create<AttendanceStoreState>((set) => ({
  loading: false,
  attendances: [],
  addAttendance: (attendance) => {
    set((state) => {
      const updatedAttendances = [...state.attendances, attendance];

      return {
        attendances: updatedAttendances,
      };
    });
  },
}));
