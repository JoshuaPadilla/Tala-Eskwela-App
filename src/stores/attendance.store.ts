import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { objectJsonFormatter } from "../helpers/objectJsonFormatter";
import { Attendance } from "../interfaces/attendance.interface";

interface AttendanceStoreState {
  loading: boolean;
  attendances: Attendance[];
  addAttendance: (attendance: Attendance) => void;
  getCurrentSchedAttendance: (class_id: string) => void;
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
  getCurrentSchedAttendance: async (class_id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");

      const res = await fetch(`${BASE_URL}attendance/${class_id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const data = await res.json();

      objectJsonFormatter(data);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
