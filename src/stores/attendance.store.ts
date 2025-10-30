import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Attendance } from "../interfaces/attendance.interface";

interface AttendanceStoreState {
  loading: boolean;
  allAttendances: Attendance[];
  currentSchedAttendance: Attendance[];
  addAttendance: (attendance: Attendance) => void;
  getCurrentSchedAttendance: (class_id: string) => void;
  getAttendanceByCurrentSchedule: (class_id: string, sched_id: string) => void;
  updateCurrentSchedAttendance: (attendance: Attendance) => void;
}

export const useAttendanceStore = create<AttendanceStoreState>((set) => ({
  loading: false,
  allAttendances: [],
  currentSchedAttendance: [],
  addAttendance: (attendance) => {
    if (!attendance) {
      console.warn("addAttendance called with undefined data");
      return;
    }
    set((state) => {
      const safeAttendances = Array.isArray(state.allAttendances)
        ? state.allAttendances
        : [];

      const updatedAttendances = [...safeAttendances, attendance];

      return {
        allAttendances: updatedAttendances,
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

      if (res.ok) {
        set({ currentSchedAttendance: data });
      } else {
        console.log("No Attendance for this schedule");
      }
    } catch (error) {
      console.log("getCurrentSchedAttendance:", error);
    } finally {
      set({ loading: false });
    }
  },

  getAttendanceByCurrentSchedule: async (class_id, sched_id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");

      const res = await fetch(
        `${BASE_URL}attendance/bySched/${class_id}?schedule_id=${sched_id}`,
        {
          method: "Get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        set({ currentSchedAttendance: data });
      } else {
        console.log(res.status, res.ok);
        console.log("No Attendance for this schedule");
      }
    } catch (error) {
      console.log("getCurrentSchedAttendance:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateCurrentSchedAttendance(attendance) {
    set((state) => {
      const updatedCurrentSchedAttendance = [
        attendance,
        ...state.currentSchedAttendance,
      ];

      const sortedArray = updatedCurrentSchedAttendance.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
      return { currentSchedAttendance: sortedArray };
    });
  },
}));
