import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { CreateClassDto } from "../dto/create-class.dto";
import { Class } from "../interfaces/class.interface";

interface ClassStoreState {
  loading: boolean;
  classes: Class[];
  createClass: (form: CreateClassDto) => Promise<void>;
  getClasses: () => void;
  getClass: (class_id: string) => Promise<Class | undefined>;
  deleteClass: (class_id: string) => Promise<void>;
  addStudents: (class_id: string, student_ids: string[]) => void;
}

export const useClassStore = create<ClassStoreState>((set) => ({
  loading: false,
  classes: [],
  createClass: async (form) => {
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
  getClass: async (class_id): Promise<Class | undefined> => {
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

      const parsedClass = data as Class;

      if (res.ok) {
        return parsedClass;
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  deleteClass: async (class_id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}class/${class_id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        set((state) => {
          const updatedClasses = state.classes.filter(
            (sched) => sched.id !== class_id
          );

          return {
            classes: updatedClasses,
          };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  addStudents: async (class_id: string, student_ids: string[]) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}class/add/${class_id}`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ student_ids }),
      });

      const data = await res.json();

      if (res.status === 201) {
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
