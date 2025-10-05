import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { CreateScheduleDto } from "../dto/create-schedule.dto";
import { Schedule } from "../interfaces/schedule.interface";

interface ScheduleStoreState {
  loading: boolean;
  schedules: Schedule[];
  createSchedule: (form: CreateScheduleDto) => void;
  getSchedules: () => void;
  getSchedule: (sched_id: string) => Promise<Schedule | undefined>;
  getTodaysSchedules: (class_id: string) => Promise<Schedule[] | []>;
  deleteSchedule: (id: string) => Promise<void>;
}

export const useScheduleStore = create<ScheduleStoreState>((set) => ({
  loading: false,
  schedules: [],
  createSchedule: async (form) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}schedule`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        set((state) => ({
          schedules: [...state.schedules, data],
        }));
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getSchedule: async (sched_id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}schedule/${sched_id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const data = await res.json();

      if (res.ok) {
        return data as Schedule;
      } else {
        console.log(res.status);
      }

      return undefined;
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getSchedules: async () => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}schedule`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const data = await res.json();

      if (res.ok) {
        set({ schedules: data });
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  deleteSchedule: async (id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}schedule/${id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (res.ok) {
        set((state) => {
          const updatedSchedules = state.schedules.filter(
            (sched) => sched.id !== id
          );

          return {
            schedules: updatedSchedules,
          };
        });
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getTodaysSchedules: async (class_id) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(
        `${BASE_URL}schedule/todayschedules/${class_id}`,
        {
          method: "Get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      const data = await res.json();

      if (res.ok && data) {
        return data as Schedule[];
      } else {
        console.log(res.status);
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },
}));
