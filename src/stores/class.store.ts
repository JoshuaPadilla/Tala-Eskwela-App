import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Class } from "../interfaces/class.interface";

interface ClassStoreState {
  loading: boolean;
  classes: Class[];
  createClass: (form: Omit<Class, "class_id">) => Promise<void>;
  getClasses: () => void;
  getClass: (class_id: string) => Promise<Class>;
}

export const useClassStore = create<ClassStoreState>((set) => ({
  loading: false,
  classes: [],
  createClass: async (form) => {
    console.log(form);
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}class`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ ...form, grade_lvl: Number(form.grade_lvl) }),
      });

      const data = await res.json();

      if (res.status === 201) {
        set((state) => ({
          classes: [...state.classes, data],
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
  getClasses: async () => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}class`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ classes: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getClass: async (class_id): Class => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}class/${class_id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        return data as Class;
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
