import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Teacher } from "../interfaces/teacher.interface";

interface TeacherStoreState {
  loading: boolean;
  teachers: Teacher[];
  getTeachers: (query?: string) => void;
}

export const useTeacherStore = create<TeacherStoreState>((set) => ({
  loading: false,
  teachers: [],
  getTeachers: async (query) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}teachers${query}`, {
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
}));
