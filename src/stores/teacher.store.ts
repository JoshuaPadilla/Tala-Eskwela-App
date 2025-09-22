import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Teacher } from "../interfaces/teacher.interface";

interface TeacherStoreState {
  loading: boolean;
  teachers: Teacher[];
  getTeachers: (query?: string) => void;
  deleteTeacher: (id: string) => Promise<void>;
}

export const useTeacherStore = create<TeacherStoreState>((set) => ({
  loading: false,
  teachers: [],
  getTeachers: async (query) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}teachers${query ? query : ""}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ teachers: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  deleteTeacher: async (id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}teachers/${id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        set((state) => {
          const updatedTeachers = state.teachers.filter(
            (teacher) => teacher.id !== id
          );

          return {
            teachers: updatedTeachers,
          };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
